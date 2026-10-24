import {Container, Row, Col} from "react-bootstrap";
import BotonColor from "../BotonColor.tsx/BotonColor";

const SeccionHero = () => {
  return (
    <section id="Inicio" className="py-5 bg-light">
        <Container className="py-5">
            <Row className="align-items-center g-4">
                <Col md ={6}>
                <h1 className="display-4 fw-bold">Pilar Tecno</h1>
                <p className="lead text-secondary">Bienvenido al curso de React</p>
                <BotonColor />
                </Col>
                <Col md={6}> 
                <div
                    className="rounded-4 bg-white shadow-sm d-flex align-items-center justify-content-center "
                    style={{ minHeight: "220px"}}
                    >
                    <span className="text-secondary">
                    {/*Imagen del curso*/}
                    Proximamente: cursos
                    </span>

                </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default SeccionHero

