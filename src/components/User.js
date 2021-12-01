import './Design.css'
import {Container} from 'react-bootstrap'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function User() {


    const history = useNavigate();
    const handleLogout = (e) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        axios.delete('/logout', {headers: {'Content-Type': 'application/json', Accept: "*/*", Authorization: `Bearer ${localStorage.getItem('token')}` }}).then(res =>
        {
            localStorage.removeItem("token")
            localStorage.removeItem("name")
            history('/login');
        })
    }

    return (
        <Container fluid>

            <label>Welcome <b>{localStorage.getItem('name')}</b></label>
            <div className="float-right">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </Container>

    );
}