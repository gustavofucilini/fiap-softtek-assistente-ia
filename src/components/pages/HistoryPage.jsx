import React, { useState } from 'react';
import { Container, Table, Form, Modal, Button } from 'react-bootstrap';

function HistoryPage() {
  const [selectedSolution, setSelectedSolution] = useState(null);
  const solutions = [
    { date: '01/01/2024', description: 'Solução 1', status: 'Concluído' },
    { date: '02/01/2024', description: 'Solução 2', status: 'Pendente' },
    // Adicione mais soluções aqui
  ];

  const handleShowDetails = (solution) => {
    setSelectedSolution(solution);
  };

  const handleClose = () => {
    setSelectedSolution(null);
  };

  return (
    <Container>
      <header className="my-5 text-center">
        <h2>Histórico de Soluções</h2>
        <p>Lista das soluções que o assistente técnico pode acessar.</p>
      </header>
      <Form className="mb-4">
        <Form.Group controlId="search">
          <Form.Control type="text" placeholder="Buscar Solução..." />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {solutions.map((solution, index) => (
            <tr key={index}>
              <td>{solution.date}</td>
              <td>{solution.description}</td>
              <td>{solution.status}</td>
              <td>
                <Button variant="info" onClick={() => handleShowDetails(solution)}>Detalhes</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Modal show={!!selectedSolution} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Solução</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSolution && (
            <>
              <p><strong>Data:</strong> {selectedSolution.date}</p>
              <p><strong>Descrição:</strong> {selectedSolution.description}</p>
              <p><strong>Status:</strong> {selectedSolution.status}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default HistoryPage;
