import React from 'react';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default function PubCard(props) {
  return (
    <Col>
      <Card className='h-100'>
        <Card.Img
          variant='top'
          src={`http://localhost:8000/images/${props.imagen}`}
        />
        <Card.Body>
          <Card.Title>{props.titulo}</Card.Title>
          <Card.Text>{props.descripcion}</Card.Text>
          {/* <Button variant='primary'>Comprar</Button> */}
        </Card.Body>
      </Card>
    </Col>
  );
}
