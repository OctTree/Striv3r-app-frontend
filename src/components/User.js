import './Design.css'
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import defaultAvatar from "../images/avatar.png"

const userParameters = {
    name: "",
    email: "",
    image: "",
    zip: "",
    phone: "",
    referral: ""
}

export default function User() {

    useEffect(() => {

        if (localStorage.getItem("token")) {
            axios.get('/users/' + localStorage.getItem("user_id"), {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                setUser(res.data.data.user)
            })
        }
        else {
            history("/login")
        }
    }, [localStorage.getItem("user_id")]);

    const history = useNavigate();

    const [user, setUser] = useState(userParameters);

    const handleLogout = (e) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        axios.delete('/logout', {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            localStorage.removeItem("token")
            localStorage.removeItem("name")
            history('/login');
        })
    }

    return (
        <div>
            <nav className="navbar navbar-light bg-dark justify-content-between">
                <div className="striv3-nav-bannar">
                    <a href="/users" className="nav-bar-brand">Striv3r</a>
                </div>


            </nav>

            <Container fluid>
                <div className="col-12 mt-3">

                    <div className="col-12 col-sm-4 bg-white p-2 d-flex">
                        <div className="col-4">
                            <img src={defaultAvatar} alt="some text" className="default-profile-pic" />
                        </div>

                        <div className="col-8">
                            <div>
                                <strong className="text-dark h3">{user.name}</strong>
                            </div>
                            <div className="mt-1">
                                <simple className="text-dark">{user.zip}</simple>
                            </div>
                            <div className="mt-1 d-inline-flex">
                                <div>
                                    <simple className="text-dark">Reward Points</simple>
                                </div>
                                <div className="ms-1">
                                    <simple className="text-dark">Referral Points</simple>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-4 p-2 user-cus-div">
                        <div className="">
                            <strong className="text-dark"># wks in row</strong>
                        </div>
                    </div>

                    <div className="col-12 col-sm-4 p-2 user-cus-div-border">
                        <div className="">
                            <strong className="text-white">Quote / Tip of the Day</strong>
                        </div>
                    </div>

                    <div className="col-12 col-sm-4 p-2 user-cus-div-border">
                        <div className="col-12 d-inline-flex" >
                            <div className="col-6">
                                <strong className="text-white h3">Current Goals:</strong>
                            </div>
                            <div className="col-3">

                            </div>
                            <div className="col-3">
                                <strong className="text-white">Edit Goals</strong>
                            </div>
                        </div>
                        <div className="col-12">
                            <strong className="text-white">My goal is to meditate __ x / week for __ minutes / session</strong>
                        </div>
                    </div>

                    <div className="col-12 col-sm-4 p-2 user-cus-div-border">
                        <div className="col-12 d-inline-flex" >
                            <div className="col-6">
                                <strong className="h3 t-colour">Striv3r Plan:</strong>
                            </div>
                            <div className="col-3">

                            </div>
                            <div className="col-3">
                                <strong className="text-white">Edit Plan</strong>
                            </div>
                        </div>
                        <div className="col-12">
                            <strong className="t-colour">Week 1:</strong><br />
                            <strong className="text-white">Medidate 1x this week for 5 min.</strong><input type="checkbox" className="plan-input-box ms-1" />
                        </div>
                        <div className="col-12 ms-2">
                            <strong className="t-colour">Week 2:</strong><br />
                            <strong className="text-white">Medidate 1x this week for 5 min.</strong><input type="checkbox" className="plan-input-box ms-1" />
                        </div>
                        <div className="col-12 ms-4">
                            <strong className="t-colour">Week 3:</strong><br />
                            <strong className="text-white">Medidate 1x this week for 5 min.</strong><input type="checkbox" className="plan-input-box ms-1" />
                        </div>
                    </div>


                </div>
                <nav className="navbar navbar-light bg-dark justify-content-between">

                    <button className="btn btn-sm btn-danger logout-button" onClick={handleLogout}>Logout</button>
                    <button className="btn btn-sm btn-danger logout-button">Contact</button>
                </nav>
            </Container>

        </div>
    );
}