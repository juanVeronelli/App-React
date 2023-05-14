import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
  <Navbar bg="light" variant="light" className="py-3 align-items-center">
      <Navbar.Brand as={Link} to="/" className="mx-auto px-5">llive{"{JPG}"}</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link as={Link} to="/register" className="px-3">Registrarse</Nav.Link>
          <Nav.Link as={Link} to="/login" className="px-3">Iniciar Sesión</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
};

export default Header;
