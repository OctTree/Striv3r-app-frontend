import './Design.css'
import { Container } from 'react-bootstrap'

export default function Home() {
    return (
        <Container className="Home" fluid>

            <label className="StrivText">Striv3r</label>

            <div className="StrivWel"> Welcome to Striv3r</div>

            <div className="StrivWelPar mt-2"> Build a Plan. Comit to Action. Reward your consitency. Surprise yourself with habit-stacking</div>

            <div><a href="/register" className="strivbut btn btn-success mt-5">Get Started</a></div>

            <div><a href="/login" className="text-decoration-none text-white mt-2">Already a Striv3r Member?</a></div>

            <div><a href="/login"  className="strivbut btn btn-success mt-2">Sign in</a></div>

            <div className=" mt-4 " ><a href="https://www.striv3r.com/" className="text-decoration-none text-white">Visit: </a> <a href="https://www.striv3r.com/" className="text-decoration-none text-success">Striv3r.com</a>
                <a href="https://www.striv3r.com/" className="text-decoration-none text-white"> for more</a>
            </div>

        </Container>

        );
}