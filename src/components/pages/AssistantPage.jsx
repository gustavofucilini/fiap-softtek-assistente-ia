import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Card, Image, Spinner } from "react-bootstrap";

async function sendMessageToGemini(conversations) {
  const response = await fetch('http://localhost:3000/sendMessageToGemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ conversations }),
  });
  const data = await response.json();
  return data.response;
}

function AssistantPage() {
  const [query, setQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('...');

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots(prev => {
          if (prev === '...') return '';
          if (prev === '..') return '...';
          if (prev === '.') return '..';
          return '.';
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleQuerySubmit = async () => {
    if (query) {
      const newConversations = [
        ...conversations,
        { user: "Você", message: query, time: "Agora mesmo" },
      ];

      setConversations(newConversations);
      setQuery('');
      setLoading(true);

      // Adiciona a mensagem de carregando ("...")
      const loadingMessage = {
        user: "Assistente IA",
        message: "...",
        time: "" // Mantém o tempo vazio enquanto carrega
      };
      setConversations([...newConversations, loadingMessage]);

      const geminiResponse = await sendMessageToGemini(newConversations);
      
      setLoading(false);
      if (geminiResponse) {
        const newResponse = {
          user: "Assistente IA",
          message: geminiResponse,
          time: "Agora mesmo"
        };
        setConversations(prevConversations => [
          ...prevConversations.slice(0, -1), // Remove a mensagem de carregamento
          newResponse
        ]);
      }
    }
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column p-0" style={{marginTop: "40px"}}>
      <Row className="flex-grow-1" style={{maxWidth: '100%'}}>
        <Col md={3} className="bg-light p-0 border-right" style={{marginLeft: "70px"}}>
          <Card className="h-100 text-center">
            <Card.Header className="bg-primary text-white">
            </Card.Header>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Image src="/src/assets/Chatbot_img.png" roundedCircle width={80} height={80} />
              <h6 className="mt-3">Chatbot</h6>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} className="d-flex flex-column p-0" style={{marginRight: "10px"}}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column p-3">
              <div className="flex-grow-1" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                <h6 className="text-center">Assistente de Suporte</h6>
                <div className="overflow-auto" style={{ maxHeight: '95%' }}>
                  {conversations.map((conv, index) => (
                    <div key={index} className={`d-flex mb-3 ${conv.user === "Você" ? "justify-content-end" : "justify-content-start"}`}>
                      <div className={`p-2 ${conv.user === "Você" ? "bg-primary text-white" : "bg-light text-dark"}`} style={{ borderRadius: '12px', maxWidth: '75%' }}>
                        <p className="mb-0" dangerouslySetInnerHTML={{ __html: conv.message === '...' && loading ? loadingDots : conv.message.replace(/\n/g, '<br />')}}></p>
                        {conv.time && <small className="text-muted">{conv.time}</small>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Form onSubmit={(e) => { e.preventDefault(); handleQuerySubmit(); }}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={loading}
                  />
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Enviar"}
                  </Button>
                </InputGroup>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AssistantPage;
