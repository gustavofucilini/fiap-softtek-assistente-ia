import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const AttachmentsPage = () => {
    const location = useLocation();
    const { fileUrl } = location.state || {};

    if (!fileUrl) {
        return <Container className="my-5"><h2>Arquivo não encontrado</h2></Container>;
    }

    // Verifica o tipo de arquivo para exibição adequada
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
    const isPdf = fileExtension === 'pdf';

    return (
        <Container className="my-5">
            <h2>Visualizar Anexo</h2>
            {isImage && (
                <img src={fileUrl} alt="Anexo" style={{ width: '100%', height: 'auto' }} />
            )}
            {isPdf && (
                <iframe src={fileUrl} width="100%" height="600px" title="Attachment Viewer" />
            )}
            {!isImage && !isPdf && (
                <p>Tipo de arquivo não suportado para visualização direta.</p>
            )}
            <Button href={fileUrl} download>Download do Arquivo</Button>
        </Container>
    );
};

export default AttachmentsPage;
