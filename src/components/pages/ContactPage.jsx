import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Container>
      <header className="my-5 text-center">
        <h2>Contato/Feedback</h2>
        <p>Entre em contato ou envie seu feedback.</p>
      </header>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Seu nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Seu email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Mensagem</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Sua mensagem"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Enviar
        </Button>
      </Form>
      {showAlert && (
        <Alert variant="success" className="mt-4">
          Mensagem enviada com sucesso!
        </Alert>
      )}
    </Container>
  );
}

export default ContactPage;
