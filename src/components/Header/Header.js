import { Navbar, Container } from "react-bootstrap";

const header = () => {
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">NLP Question-Answer</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default header;