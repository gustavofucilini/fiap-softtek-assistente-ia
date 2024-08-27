import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    message: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (!validationErrors) {
      setShowAlert(true);
      setForm({ name: "", email: "", message: "" });
      setErrors({ name: null, email: null, message: null });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (fields) => {
    const newErrors = {
      name: fields.name ? false : true,
      email: fields.email && validateEmail(fields.email) ? false : true,
      message: fields.message ? false : true,
    };

    return Object.keys(newErrors).some((key) => newErrors[key])
      ? newErrors
      : null;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  };

  const getFieldClassName = (field) => {
    if (errors[field] === null) return "";
    return errors[field] ? "is-invalid" : "is-valid";
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
            onChange={handleInputChange}
            className={getFieldClassName("name")}
            isInvalid={errors.name === true}
            isValid={errors.name === false}
          />
          {errors.name === true && (
            <Form.Text className="text-danger">Nome é obrigatório.</Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Seu email"
            value={form.email}
            onChange={handleInputChange}
            className={getFieldClassName("email")}
            isInvalid={errors.email === true}
            isValid={errors.email === false}
          />
          {errors.email === true && (
            <Form.Text className="text-danger">
              Email válido é obrigatório.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Mensagem</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Sua mensagem"
            value={form.message}
            onChange={handleInputChange}
            className={getFieldClassName("message")}
            isInvalid={errors.message === true}
            isValid={errors.message === false}
          />
          {errors.message === true && (
            <Form.Text className="text-danger">
              Mensagem é obrigatória.
            </Form.Text>
          )}
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
