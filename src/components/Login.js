import './Design.css'

import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import Logo from '../images/userprofile.svg'
import EmailIcon from "../images/email.svg"
import PasswordIcon from "../images/password.svg"


const login_state = {
    email: '',
    password: '',
    login_email_error: '',
    login_password_error: '',
    error: ''
}

export default function Login() {

    const [IsLoading, setIsLoading] = useState(false);
    const history = useNavigate();
    const [loginObject, setloginObject] = useState(login_state)

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const login_parameter = {
            email: loginObject.email,
            password: loginObject.password,
        }

        if (loginObject.email === '' && loginObject.password === '') {

            setloginObject({
                ...loginObject,
                login_email_error: 'Email is Required',
                login_password_error: 'Password is Required'
            })
            console.log(loginObject.login_email_error)
        } else if (loginObject.email === '') {
            setloginObject({...loginObject, login_email_error: 'Email is Required'})
        } else if (loginObject.password === '') {
            setloginObject({...loginObject, login_password_error: 'Password is Required'})
        } else {
            setIsLoading(true)
            axios.post('/login', login_parameter, {headers: {'Content-Type': 'application/json', Accept: "*/*"}})
                .then(response => {

                    if (response.data.data.user.user.active === false) {
                        alert("Your account is De-activated.")
                        window.location.reload()
                    } else {

                        setIsLoading(false)
                        let state_value = response.data.status
                        if (state_value === "success") {
                            localStorage.setItem("user_id", response.data.data.user.user.id)
                            localStorage.setItem('token', response.data.data.token)
                            localStorage.setItem('name', response.data.data.user.user.name)
                            history('/user');
                        }
                        localStorage.setItem("access-token", response.data);
                    }
                }).catch(error => {
                setIsLoading(false)
                let state_value = error.response.status
                if (state_value === 401) {
                    if (error.response.data.errors[0] === "Please confirm your account") {

                        setloginObject({
                            ...loginObject, error: error.response.data.errors[0]
                        })
                    } else {
                        setloginObject({
                            ...loginObject, error: error.response.data.errors[0]
                        })
                    }
                }
            });
        }

    }

    return (
        <div className="bg-dark">
            <div className="col-lg-4 col-md-4 col-12 p-4">

                <div className="mt-3 text-center">
                    <img src={Logo} alt="some text"/>
                </div>

                <div className="mt-3 text-center">
                    <label htmlFor="basic-url" className="form-label text-white">Login</label>
                </div>

                <form onSubmit={handleLoginSubmit} className="mt-3">


                    <div class="input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping"><img src={EmailIcon}
                                                                                    alt="some text"/></span>
                        <input type="email" class="form-control" placeholder="Email" aria-label="Username"

                               onChange={event => setloginObject({
                                   ...loginObject, email: event.target.value,
                                   login_email_error: '', error: ''
                               })}

                               aria-describedby="addon-wrapping"/>
                    </div>
                    <label for="basic-url" class="form-label text-danger">{loginObject.login_email_error}</label>

                    <div class="input-group flex-nowrap mt-3">
                        <span class="input-group-text" id="addon-wrapping"><img src={PasswordIcon}
                                                                                alt="some text"/></span>
                        <input type="password" class="form-control" placeholder="Password" aria-label="Username"

                               onChange={event => setloginObject({
                                   ...loginObject, password: event.target.value,
                                   login_password_error: '', error: ''
                               })}

                               aria-describedby="addon-wrapping"/>
                    </div>
                    <label for="basic-url" class="form-label text-danger">{loginObject.login_password_error}</label>

                    <div><a href="/#" className="text-decoration-none text-white">Forgot Password?</a></div>


                    <div className="text-center mt-8">
                        <button type="submit"
                                className="strivbut btn btn-success mt-4">{IsLoading ? "Please Wait...." : "LOGIN"}</button>
                    </div>

                    <div>
                        <label for="basic-url" class="form-label text-danger">{loginObject.error}</label>
                    </div>
                </form>
            </div>
        </div>
    );
}