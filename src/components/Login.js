import './Design.css'

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const login_state = {
    email: '',
    password: '',
    login_email_error: '',
    login_password_error: '',
    error:''
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
            
            setloginObject({ ...loginObject, login_email_error: 'Email is Required', login_password_error: 'Password is Required' })
            console.log(loginObject.login_email_error)
        } else if (loginObject.email === '') {
            setloginObject({ ...loginObject, login_email_error: 'Email is Required' })
        } else if (loginObject.password === '') {
            setloginObject({ ...loginObject, login_password_error: 'Password is Required' })
        } else {
            setIsLoading(true)
            axios.post('/login', login_parameter, { headers: { 'Content-Type': 'application/json', Accept: "*/*" } })
                .then(response => {
                    setIsLoading(false)
                    let state_value = response.data.status
                    if (state_value === "success") {
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('name', response.data.data.user.user.name)
                        history('/user');
                    }
                    localStorage.setItem("access-token", response.data);
                }).catch(error => {
                    console.log(error.response)
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
        <div className="col-12 bg-dark vh-100 justify-content-center">
            <div className="col-lg-4 col-md-4 col-12 p-4">

                <form onSubmit={handleLoginSubmit}>

                    <label for="basic-url" class="form-label text-white">LOGIN</label>

                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">@</span>
                        <input type="email" class="form-control" placeholder="Email" aria-label="Username"

                            onChange={event => setloginObject({
                                ...loginObject, email: event.target.value,
                                login_email_error: '', error:''
                            })}

                            aria-describedby="addon-wrapping" />
                    </div>
                    <label for="basic-url" class="form-label text-danger">{loginObject.login_email_error}</label>

                    <div class="input-group flex-nowrap mt-3">
                        <span class="input-group-text" id="addon-wrapping">@</span>
                        <input type="password" class="form-control" placeholder="Password" aria-label="Username"

                            onChange={event => setloginObject({
                                ...loginObject, password: event.target.value,
                                login_password_error: '', error: ''
                            })}

                            aria-describedby="addon-wrapping" />
                    </div>
                    <label for="basic-url" class="form-label text-danger">{loginObject.login_password_error}</label>

                    <div><a href="/#" className="text-decoration-none text-white">Forgot Password?</a></div>

                    

                    <button type="submit" className="strivbut btn btn-success mt-2">{IsLoading ? "Please Wait...." : "LOGIN"}</button>

                    <div>
                        <label for="basic-url" class="form-label text-danger">{loginObject.error}</label>
                    </div>
                </form>
            </div>
        </div>
    );
}