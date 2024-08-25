import React from "react";
import { Container, Row, Col, Button, Form, Table, Card, Modal, Alert } from "react-bootstrap";

function AboutPage() {
  const teamMembers = [
    { name: 'Nome 1', role: 'Função 1', imgSrc: 'link-para-imagem1.jpg' },
    { name: 'Nome 2', role: 'Função 2', imgSrc: 'link-para-imagem2.jpg' },
    // Adicione mais membros aqui
  ];

  return (
    <Container>
      <header className="my-5 text-center">
        <h2>Sobre o Projeto</h2>
        <p>Informações sobre a equipe e as tecnologias utilizadas.</p>
      </header>
      <Row>
        {teamMembers.map((member, index) => (
          <Col md={4} key={index} className="my-3">
            <Card>
              <Card.Img variant="top" src={member.imgSrc} />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Text>{member.role}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="my-5">
        <Col>
          <h3>Tecnologias Utilizadas</h3>
          <p>Aqui você pode descrever as tecnologias e ferramentas que foram usadas no projeto.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
