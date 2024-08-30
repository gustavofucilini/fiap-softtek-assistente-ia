import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SolutionModal({ solution, onHide }) {
    if (!solution) {
        return null;
    }

    return (
        <Modal show={!!solution} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Detalhes da Solução</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Descrição:</strong> {solution.description}</p>
                <p><strong>Problema:</strong> {solution.problem}</p>
                <p><strong>Solução:</strong> {solution.solution}</p>
                <p><strong>Responsável:</strong> {solution.responsible}</p>
                <p><strong>Anotações:</strong> {solution.notes}</p>
                <p>
                    <strong>Anexos:</strong>
                    <Link to={`/attachments`} state={{ fileUrl: solution.attachments }}>Acessar Anexos</Link>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SolutionModal;
