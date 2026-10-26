
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const BarraNavegacion = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm py-3"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Gestor de Tareas
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-principal" />

        <Navbar.Collapse id="navbar-principal">
          <Nav className="ms-auto gap-lg-3">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>

            <Nav.Link as={Link} to="/tareas">
              Mis tareas
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraNavegacion;