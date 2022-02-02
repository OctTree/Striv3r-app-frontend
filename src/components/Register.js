import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import Image from '../images/logo.jpg'
import Vector from "../images/name.svg"
import EmailIcon from "../images/email.svg"
import PasswordIcon from "../images/password.svg"
import ZipIcon from "../images/icon_one.svg"
import IphoneIcon from "../images/phone.png"
import ReferralIcon from "../images/VectorRefferal.png"

const signup_state = {
    name: '',
    email: '',
    phone: '',
    password: '',
    cpassword: '',
    zip: '',
    signup_name_error: false,
    signup_phone_error: false,
    signup_email_error: false,
    signup_password_error: false,
    signup_cpassword_error: false,
    signup_zip_error: false,
    error: ''
}

export default function Register() {

    const [signUpObject, setSignUpObject] = useState(signup_state);
    const [IsLoading, setIsLoading] = useState(false);
    const history = useNavigate();

    const handleSignupSubmit = (event) => {
        event.preventDefault();

        const signup_parameter = {
            user: {
                name: signUpObject.name,
                email: signUpObject.email,
                password: signUpObject.password,
                role_id: "2",
                zip: signUpObject.zip,
                phone: signUpObject.phone
            }
        }
        if (signUpObject.name === '') {
            setSignUpObject({...signUpObject, signup_name_error: true})
        } else if (signUpObject.email === '') {
            setSignUpObject({...signUpObject, signup_email_error: true})
        } else if (signUpObject.password === '') {
            setSignUpObject({...signUpObject, signup_password_error: true})
        } else if (signUpObject.password !== signUpObject.cpassword) {
            setSignUpObject({...signUpObject, signup_cpassword_error: true})
        } else if (signUpObject.zip === '') {
            setSignUpObject({...signUpObject, signup_zip_error: true})
        } else {
            setIsLoading(true)
            axios.post('/users', signup_parameter, {headers: {'Content-Type': 'application/json', Accept: "*/*", 'Access-Control-Allow-Origin': '*' }})
                .then(response => {
                    setIsLoading(false)

                    let state_value = response.status
                    if (state_value === 200) {
                        
                        history('/plans/new');
                    }
                    localStorage.setItem("token", response.data.data.token);
                    localStorage.setItem("user_id", response.data.data.user.user.id);
                }).catch(error => {
                    setIsLoading(false)

                    if (!error.response) {
                        history('/login');
                    } else {
                        let state_value = error.response.status
                        if (state_value === 500 || 400 || 401) {

                            setSignUpObject({
                                ...signUpObject, error: error.response.data.errors[0]
                            })

                        }

                    }
                }
            )
        }
    }

    return (
        <div className="col-12  bg-dark justify-content-center">
            <div className="col-lg-4 col-md-4 col-12 p-4">

                <div className="mt-3 text-center">
                    <img src={Image} alt="some text" className="w-30 h-30"/>
                </div>

                <div className="mt-3 text-center">
                    <label htmlFor="basic-url" className="form-label text-white">Create Account</label>
                </div>

                <form onSubmit={handleSignupSubmit} className="mt-2">

                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping"><img src={Vector} alt="some text" /></span>
                        <input type="text" class="form-control" placeholder="Name" aria-label="Username"
                               onChange={event => setSignUpObject({
                                   ...signUpObject, name: event.target.value,
                                   signup_name_error: '', error: ''
                               })}
                               aria-describedby="addon-wrapping"/>
                    </div>
                    <label for="basic-url"
                           class="form-label text-danger">{signUpObject.signup_name_error ? "Name is Required" : ""}</label>

                    <div class="input-group flex-nowrap mt-3">
                        <span class="input-group-text" id="addon-wrapping"><img src={EmailIcon} alt="some text" /></span>
                        <input type="email" class="form-control" placeholder="Email" aria-label="email"
                               onChange={event => setSignUpObject({
                                   ...signUpObject, email: event.target.value,
                                   signup_email_error: '', error: ''
                               })}
                               aria-describedby="addon-wrapping"/>
                    </div>
                    <label for="basic-url"
                           class="form-label text-danger">{signUpObject.signup_email_error ? "Email is Required" : ""}</label>

                    <div class="input-group flex-nowrap mt-3">
                        <span class="input-group-text" id="addon-wrapping"><img src={IphoneIcon} alt="some text" /></span>
                        <input type="text" class="form-control" placeholder="Phone(Optional)" aria-label="Phone"
                               onChange={event => setSignUpObject({
                                   ...signUpObject, phone: event.target.value,
                                   signup_phone_error: '', error: ''
                               })}
                               aria-describedby="addon-wrapping"/>
                    </div>
                    <label for="basic-url" class="form-label text-danger"></label>

                    <div class="input-group flex-nowrap mt-3">
                        <span class="input-group-text" id="addon-wrapping"><img src={PasswordIcon} alt="some text" /></span>
                        <input type="password" class="form-control" placeholder="Password" aria-label="Password"
                               onChange={event => setSignUpObject({
                                   ...signUpObject, password: event.target.value,
                                   signup_password_error: '', error: ''
                               })}
                               aria-describedby="addon-wrapping"/>
                    </div>
                    <label for="basic-url"
                           class="form-label text-danger">{signUpObject.signup_password_error ? "Password is Required" : ""}</label>

                    <div class="input-group flex-nowrap mt-3">
                        <span class="input-group-text" id="addon-wrapping"><img src={PasswordIcon} alt="some text" /></span>
                        <input type="password" class="form-control" placeholder="Confirm Password" aria-label="Password"
                               onChange={event => setSignUpObject({
                                   ...signUpObject, cpassword: event.target.value,
                                   signup_cpassword_error: '', error: ''
                               })}
                               aria-describedby="addon-wrapping"/>
                    </div>
                    <label for="basic-url"
                           class="form-label text-danger">{signUpObject.signup_cpassword_error ? "Password and Confirm Password is not matching" : ""}</label>

                    <div class="input-group flex-nowrap mt-3">
                        <span class="input-group-text" id="addon-wrapping"><img src={ZipIcon} alt="some text"  /></span>
                        <input type="text" class="form-control" placeholder="ZIP" aria-label="zip"
                               onChange={event => setSignUpObject({
                                   ...signUpObject, zip: event.target.value,
                                   signup_zip_error: '', error: ''
                               })}
                               aria-describedby="addon-wrapping"/>
                    </div>

                    <label for="basic-url"
                           class="form-label text-danger">{signUpObject.signup_zip_error ? "Zip is Required" : ""}</label>

                    <div className="mt-2 text-center">
                        <button
                            className="strivbut btn btn-success mt-2" onClick={handleSignupSubmit}>{IsLoading ? "Please Wait...." : "Continue"}</button>
                    </div>

                    <div>
                        <label for="basic-url" class="form-label text-danger">{signUpObject.error}</label>
                    </div>
                </form>
            </div>
        </div>

    );
}