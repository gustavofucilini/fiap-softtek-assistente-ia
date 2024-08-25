import React from "react";
import "../../scss/HomePage.scss"; // Mantemos os estilos consistentes com a HomePage
import { Container, Row, Col, Card } from "react-bootstrap";

function AboutPage() {
  const teamMembers = [
    { name: 'Gustavo Gabriel Fucilini', role: 'Front-End', imgSrc: 'https://avatars.githubusercontent.com/u/63610589?v=4', rm: 'rm555788' },
    { name: 'Gabriel Araujo Almeida Barros', role: 'Front-End', imgSrc: 'https://avatars.githubusercontent.com/u/143835878?v=4', rm: 'rm557769' },
    { name: 'Bruno Lopes de Mello', role: 'Front-End', imgSrc: 'https://avatars.githubusercontent.com/u/10541956?v=4', rm: 'rm557343' },
    { name: 'Mikhael Groschitz Costa', role: 'Front-End', imgSrc: 'https://avatars.githubusercontent.com/u/161988867?v=4', rm: 'rm555814' },
  ];

  return (
    <div>
      <div className="hero-section p-0" >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img src="/src/assets/NebulaTeam-BG_OFF.png"  alt="Equipe Nebula" className="img-fluid"/>
            </Col>
            <Col md={6} >
              <h1 className="hero-title">
                Equipe Nebula
              </h1>
              <p className="hero-subtitle">
                Conheça os membros da nossa equipe e as tecnologias que utilizamos para desenvolver o Assistente de Suporte Técnico com IA Generativa.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <section className="technologies-section py-5 bg-light">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">Tecnologias Utilizadas</h2>
              <br />
              <p className="section-text">
                Durante o desenvolvimento deste projeto, utilizamos diversas tecnologias e ferramentas. Estas incluem:
              </p>
              <ul>
                <li><strong>HTML/CSS/JavaScript:</strong> Para construção da interface e lógica do frontend.</li>
                <li><strong>React:</strong> Framework para criação de componentes reutilizáveis e gestão do estado da aplicação.</li>
                <li><strong>Bootstrap:</strong> Framework de CSS utilizado para estilizar a aplicação e garantir responsividade.</li>
                <li><strong>Node.js:</strong> Ambiente de execução JavaScript utilizado para o backend.</li>
                <li><strong>Google Gemini:</strong> Utilizado para geração das menssagens da assistente</li>
                <li><strong>Git e GitHub:</strong> Controle de versão e colaboração entre os membros da equipe.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="team-section py-5 my-4">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="section-title">Integrantes do Grupo</h2>
              <br />
            </Col>
          </Row>
          <Row>
            {teamMembers.map((member, index) => (
              <Col md={3} key={index} className="mb-4">
                <Card className="team-card">
                  <Card.Img variant="top" roundedCircle src={member.imgSrc} alt={`Foto de ${member.name}`} />
                  <Card.Body>
                    <Card.Title>{member.name}</Card.Title>
                    <Card.Text>
                      {member.role}<br />
                      RM: {member.rm}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default AboutPage;
