import React, { useEffect, useState } from 'react'; //HOOK

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavigationBar from './components/NavigationBar';
import PubCard from './components/PubCard';

function App() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:8000/publicaciones';

    fetch(url, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => setPublications(data));
  }, []);

  const getCards = () => {
    const cards = publications.map((publication) => (
      <PubCard
        titulo={publication.titulo}
        descripcion={publication.descripcion}
        imagen={publication.imagen}
      />
    ));

    return cards;
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <NavigationBar />
        </Col>
      </Row>

      <Row className='row-cols-1 row-cols-xs-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 mt-4'>
        {getCards()}
      </Row>
    </Container>
  );
}

export default App;
