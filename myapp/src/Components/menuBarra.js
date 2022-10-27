//import bootstrap
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import './App.css';
const MenuBarra = () => {
    return ( 
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Spotify Pirata</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="CRUD" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/FormularioGenero">Genero</NavDropdown.Item>
                <NavDropdown.Item href="/FormularioCancion">
                  Cancion
                </NavDropdown.Item>
                <NavDropdown.Item href="/FormularioArtista">Artista</NavDropdown.Item>
                <NavDropdown.Item href="/FormularioAlbum">Album</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Acerca de
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     );
}
 
export default MenuBarra;