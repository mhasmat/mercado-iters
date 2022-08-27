import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

export default function LoginModal({ show, onHide, onLoginSuccess }) {
  const [email, setEmail] = useState('elon@musk.com');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value.toLowerCase());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const url = 'http://localhost:8000/auth';

    const loginUser = {
      email,
      password,
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(loginUser), //lo convierto en string xa q viaje x post
      headers: { 'Content-Type': 'application/json' }, //xa q lo abra como json del otro lado
      credentials: 'include', //xa q viajen al back las cookies
    });

    const data = await response.json();

    if (response.status === 200) {
      onLoginSuccess(data.user);
    } else {
      Swal.fire({ title: data.message, icon: 'error' });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancelar
        </Button>
        <Button variant='primary' onClick={handleLogin}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
