import './Design.css'
import {Container} from 'react-bootstrap'
import InstagramIcon from "../images/instagram.png"
import FacebookIcon from "../images/facebook.png"
import TwitterIcon from "../images/twitter.png"


export default function Home() {
    return (
        <Container className="Home" fluid>
            <label className="StrivText mt-4">Striv3r</label>

            <div className="StrivWel mt-4"> Welcome to Striv3r</div>

            <div className="StrivWelPar mt-1"> Build a Plan. Comit to Action. Reward your consitency. Surprise
                yourself with habit-stacking
            </div>

            <div className="mt-3">
                <a href="/register" className="strivbut btn btn-success mt-5">Get Started</a>
            </div>

            <div className="mt-3"><a href="/login" className="text-decoration-none text-white mt-2">Already a Striv3r
                Member?</a>
            </div>

            <div className="mt-2"><a href="/login" className="strivbut btn btn-success mt-2">Sign in</a></div>
            <div className="d-flex icon-social">
                <div className="icon-social-one">
                    <img src={InstagramIcon} alt="some text"/>
                </div>
                <div className="icon-social-one">
                    <img src={FacebookIcon} alt="some text ml-2"/>
                </div>
                <div className="icon-social-one">
                    <img src={TwitterIcon} alt="some text ml-2"/>
                </div>
            </div>

            <div className=" mt-4 "><a href="https://www.striv3r.com/"
                                       className="text-decoration-none text-white">Visit: </a> <a
                href="https://www.striv3r.com/" className="text-decoration-none text-success">Striv3r.com</a>
                <a href="https://www.striv3r.com/" className="text-decoration-none text-white"> for more</a>
            </div>
        </Container>

    );
}