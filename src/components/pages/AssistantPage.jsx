import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';

function AssistantPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [conversations, setConversations] = useState([
    {
      user: "Sofia Eames",
      message: "Hi, I just ordered a sofa in the wrong color. Am I able to get this fixed?",
      time: "Less than a minute ago"
    },
    {
      user: "Alexa Stahl",
      message: "Hi Sofia! No problem at all, I can help you with that.",
      time: "Just now"
    }
  ]);

  const handleQuerySubmit = () => {
    // Simulação de resposta da IA
    const newResponse = {
      user: "Alexa Stahl",
      message: "Here is the solution to your problem.",
      time: "Just now"
    };
    setConversations([...conversations, { user: "Você", message: query, time: "Just now" }, newResponse]);
    setResponse(newResponse.message);
    setQuery('');
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <Row className="flex-grow-1">
        <Col md={3} className="bg-light p-3">
          <h5>Conversations</h5>
          <ListGroup variant="flush">
            {conversations.map((conv, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                <div>
                  <strong>{conv.user}</strong>
                  <p className="mb-1">{conv.message}</p>
                </div>
                <small>{conv.time}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9} className="p-3">
          <Card className="h-100">
            <Card.Header className="bg-primary text-white">Conversation with Sofia Eames</Card.Header>
            <Card.Body className="d-flex flex-column">
              <div className="flex-grow-1 overflow-auto">
                {conversations.map((conv, index) => (
                  <div key={index} className={`mb-3 ${conv.user === "Você" ? "text-end" : ""}`}>
                    <strong>{conv.user}</strong>
                    <p className="mb-1">{conv.message}</p>
                    <small className="text-muted">{conv.time}</small>
                  </div>
                ))}
              </div>
              <Form className="mt-3" onSubmit={(e) => { e.preventDefault(); handleQuerySubmit(); }}>
                <Form.Group controlId="query">
                  <Form.Control
                    type="text"
                    placeholder="Digite sua pergunta aqui..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2 float-end">
                  Enviar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AssistantPage;
