import './Design.css'
import { Container } from 'react-bootstrap'

export default function User() {
    return (
        <Container fluid>

            <label>Welcome <b>{localStorage.getItem('name')}</b></label>

        </Container>

    );
}