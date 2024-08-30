import React, { useState } from 'react';
import { Container, Table, Form, Button, Pagination } from 'react-bootstrap';
import SolutionModal from './SolutionModal.jsx';

function HistoryPage() {
  const [selectedSolutionId, setSelectedSolutionId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
  const itemsPerPage = 5;

  const solutions = [
    { id: 1, date: '01/01/2024', description: 'Atualização de software não instala', status: 'Concluído',
      problem: 'O usuário não consegue instalar uma atualização importante do sistema.',
      solution: 'Verificar e corrigir permissões de arquivos e liberar espaço em disco.',
      responsible: 'João Silva', notes: 'Verificar logs do sistema.', attachments: 'Link para logs'
    },
    { id: 2, date: '02/01/2024', description: 'Falha na conexão com a impressora', status: 'Pendente',
      problem: 'A impressora não é reconhecida pela rede.',
      solution: 'Verificação do cabeamento e reinstalação dos drivers.',
      responsible: 'Maria Oliveira', notes: 'Verificar cabeamento.', attachments: 'Link para drivers'
    },
    { id: 3, date: '03/01/2024', description: 'Erro na inicialização do sistema', status: 'Concluído',
      problem: 'O sistema exibe uma mensagem de erro ao iniciar.',
      solution: 'Restaurar o sistema a partir de um ponto de restauração anterior.',
      responsible: 'Pedro Santos', notes: 'Verificar ponto de restauração.', attachments: 'Link para logs'
    },
    { id: 4, date: '04/01/2024', description: 'Tela azul ao abrir programa específico', status: 'Concluído',
      problem: 'O sistema apresenta uma tela azul da morte ao abrir um software específico.',
      solution: 'Atualizar os drivers de vídeo e reinstalar o programa.',
      responsible: 'Ana Costa', notes: 'Atualizar drivers de vídeo.', attachments: 'Link para drivers'
    },
    { id: 5, date: '05/01/2024', description: 'Sistema operacional não reconhece dispositivo USB', status: 'Pendente',
      problem: 'Um dispositivo USB não é detectado pelo sistema.',
      solution: 'Atualizar os drivers e verificar o hardware.',
      responsible: 'Carlos Lima', notes: 'Verificar hardware USB.', attachments: 'Link para drivers'
    },

  ];

  const handleShowDetails = (solutionId) => {
    setSelectedSolutionId(solutionId);
  };

  const handleClose = () => {
    setSelectedSolutionId(null);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedSolutions = [...solutions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredSolutions = sortedSolutions.filter((solution) =>
      solution.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolutions = filteredSolutions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSolutions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Encontre a solução selecionada com base no ID
  const selectedSolution = solutions.find(solution => solution.id === selectedSolutionId);

  return (
      <Container>
        <header className="my-5 text-center">
          <h2>Histórico de Soluções</h2>
          <p>Lista das soluções que o assistente técnico pode acessar.</p>
        </header>
        <Form className="mb-4">
          <Form.Group controlId="search">
            <Form.Control
                type="text"
                placeholder="Buscar Solução..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th onClick={() => handleSort('date')}>
              Data {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('description')}>
              Descrição {sortConfig.key === 'description' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('status')}>
              Status {sortConfig.key === 'status' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
            </th>
            <th>Ação</th>
          </tr>
          </thead>
          <tbody>
          {currentSolutions.map((solution) => (
              <tr key={solution.id}>
                <td>{solution.date}</td>
                <td>{solution.description}</td>
                <td style={{ color: solution.status === 'Concluído' ? 'green' : 'orange' }}>
                  {solution.status}
                </td>
                <td>
                  <Button variant="info" onClick={() => handleShowDetails(solution.id)}>Detalhes</Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        {/* Paginação */}
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
          ))}
        </Pagination>

        <SolutionModal solution={selectedSolution} onHide={handleClose} />
      </Container>
  );
}

export default HistoryPage;
