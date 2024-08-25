import React from "react";
import "../../scss/HomePage.scss";
import { Container, Row, Col, Button } from "react-bootstrap";
import ChatBotImg from "../../assets/ChatBot.png";

function HomePage() {
  return (
    <div>
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="hero-title">
                Assistente de Suporte Técnico com IA Generativa
              </h1>
              <p className="hero-subtitle">
                Revolucione o atendimento com tecnologia de ponta. Nossa solução
                utiliza IA para oferecer suporte técnico rápido e eficaz,
                permitindo que sua equipe se concentre no que realmente importa.
              </p>
            </Col>
            <Col md={6}>
              <img src={ChatBotImg} alt="Illustration" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>

      <section className="challenges-section py-5 my-4">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h2 className="section-title">Desafios Propostos</h2>
              <br />
              <p className="section-text">
                Desenvolvimento de um Assistente de Suporte Técnico com IA Generativa
                para melhorar a eficiência e precisão no atendimento do Service
                Desk e AMS. Utilizando tecnologias como HTML, CSS, JavaScript e
                React, nossa solução analisa o histórico de soluções para
                fornecer insights rápidos e automáticos aos atendentes,
                facilitando a resolução de problemas. Com uma interface
                intuitiva, o assistente torna o suporte técnico mais ágil e
                eficaz, permitindo que os atendentes se concentrem em tarefas
                mais complexas.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="videos-section py-5 bg-light">
        <Container>
          <Row>
            <Col md={6} className="mb-4">
              <div className="video-card">
                <h3 className="video-title">Primeiro Vídeo de Apresentação</h3>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src="https://www.youtube.com/embed/vp1"
                    title="VP1"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </Col>
            <Col md={6} className="mb-4">
              <div className="video-card">
                <h3 className="video-title">Segundo Vídeo de Apresentação</h3>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src="https://www.youtube.com/embed/vp2"
                    title="VP2"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default HomePage;
