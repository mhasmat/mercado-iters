import React, { useState } from 'react'; //HOOK
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import LoginModal from './LoginModal';

export default function NavigationBar() {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleFavoritosClick = () => {
    setUser('Bill');
  };

  const handleMisPublicacionesClick = () => {
    setUser('Richard');
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleLoginSuccess = (loggedUser) => {
    setUser(loggedUser);
    handleCloseLoginModal();
  };

  return (
    <>
      <Navbar bg='info' variant='dark' expand='lg'>
        <Navbar.Brand>MercadoIters</Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse>
          <Nav className='ml-auto'>
            {user ? (
              <>
                <Nav.Link onClick={handleFavoritosClick}>Favoritos</Nav.Link>
                <Nav.Link onClick={handleMisPublicacionesClick}>
                  Mis Publicaciones
                </Nav.Link>
                <NavDropdown title={user} alignRight>
                  <NavDropdown.Item>Mi Cuenta</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Button variant='warning' onClick={handleLogin}>
                Iniciar Sesión
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <LoginModal
        show={showLoginModal}
        onHide={handleCloseLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
