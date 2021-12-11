import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Image from '../images/logo.jpg'
import Vector from "../images/name.svg"
import ReferralIcon from "../images/VectorRefferal.png"
import PaymentIcon from "../images/payment_icon.svg"
import PlanButton from "../images/plan_button.svg";
import PaymentTwoIcon from "../images/payment_two_icon.svg";
import CSVIcon from "../images/csv_icon.svg";

const signup_state = {
    name: '',
    email: '',
    phone: '',
    password: '',
    cpassword: '',
    zip: '',
    referral: "",
    signup_name_error: false,
    signup_phone_error: false,
    signup_email_error: false,
    signup_password_error: false,
    signup_cpassword_error: false,
    signup_zip_error: false,
    error: ''
}

export default function Payment() {

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
                phone: signUpObject.phone,
                referral: signUpObject.referral
            }
        }
        if (signUpObject.name === '') {
            setSignUpObject({ ...signUpObject, signup_name_error: true })
        } else if (signUpObject.email === '') {
            setSignUpObject({ ...signUpObject, signup_email_error: true })
        } else if (signUpObject.password === '') {
            setSignUpObject({ ...signUpObject, signup_password_error: true })
        } else if (signUpObject.password !== signUpObject.cpassword) {
            setSignUpObject({ ...signUpObject, signup_cpassword_error: true })
        } else if (signUpObject.zip === '') {
            setSignUpObject({ ...signUpObject, signup_zip_error: true })
        } else {
            setIsLoading(true)
            axios.post('/users', signup_parameter, { headers: { 'Content-Type': 'application/json', Accept: "*/*" } })
                .then(response => {
                    setIsLoading(false)
                    console.log(response)

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
        <div className="col-lg-4 col-sm-4 bg-dark justify-content-center">
            <div className="p-4">

                <div className="mt-3 text-center">
                    <img src={PaymentIcon} alt="some text" className="w-30 h-30" />
                </div>

                <div className="mt-3 text-center">
                    <img src={PaymentTwoIcon} alt="some text" />
                </div>

                <div className="col-12 mt-1 text-center">
                    <img src={PlanButton} alt="some text" />
                </div>

                <form onSubmit={handleSignupSubmit} className="mt-2">

                    <div className="col-7 d-flex ">

                        <div class="col-2 input-group flex-nowrap">
                            <span class="input-group-text" id="addon-wrapping"><img src={Vector} alt="some text" /></span>
                            <input type="text" class="form-control" placeholder="Name" aria-label="Username"
                                onChange={event => setSignUpObject({
                                    ...signUpObject, name: event.target.value,
                                    signup_name_error: '', error: ''
                                })}
                                aria-describedby="addon-wrapping" />
                        </div>


                        <div class="col-8 ms-1">

                            <input type="email" class="form-control" placeholder="Address / Apt.." aria-label="email"
                                onChange={event => setSignUpObject({
                                    ...signUpObject, email: event.target.value,
                                    signup_email_error: '', error: ''
                                })}
                                aria-describedby="addon-wrapping" />
                        </div>

                    </div>

                    <div className="col-12 d-flex mt-4">

                        <div class="col-8">

                            <input type="text" class="form-control" placeholder="City / State / Zip" aria-label="Username"
                                onChange={event => setSignUpObject({
                                    ...signUpObject, name: event.target.value,
                                    signup_name_error: '', error: ''
                                })}
                                aria-describedby="addon-wrapping" />
                        </div>


                        <div class="col-4 ms-1">
                            <input type="text" class="form-control" placeholder="CSV" aria-label="email"
                                onChange={event => setSignUpObject({
                                    ...signUpObject, email: event.target.value,
                                    signup_email_error: '', error: ''
                                })}
                                aria-describedby="addon-wrapping" />
                        </div>

                    </div>

                    <div className="col-12 d-flex mt-4">

                        <div class="col-8">

                            <input type="text" class="form-control" placeholder="Credit Card Number" aria-label="Username"
                                onChange={event => setSignUpObject({
                                    ...signUpObject, name: event.target.value,
                                    signup_name_error: '', error: ''
                                })}
                                aria-describedby="addon-wrapping" />
                        </div>


                        <div class="col-4 ms-1">

                            <input type="email" class="form-control" placeholder="Exp Date" aria-label="email"
                                onChange={event => setSignUpObject({
                                    ...signUpObject, email: event.target.value,
                                    signup_email_error: '', error: ''
                                })}
                                aria-describedby="addon-wrapping" />
                        </div>

                    </div>

                    <div className="col-12 mt-2">

                        <div className="col-12 mt-3 text-white h2 d-inline-flex">
                            <strong>Subscription Options:</strong>
                            <a className="mt-2 ms-3 h6 text-decoration-none text-white">*Why $20+?</a>
                        </div>

                        <div className="col-12 mt-3 text-white h2">
                            <strong>- $20* /mo ($10 rewards)</strong>
                        </div>

                        <div className="col-12 mt-3 text-white h2">
                            <strong>- $45 /3mo (referral req)</strong>
                        </div>

                        <div className="col-12 mt-3 text-white h2">
                            <strong>- Other (scaling by income)*</strong>
                        </div>

                        <div className="col-12 mt-3 text-white h2">
                            <strong>- Discount code (list below)</strong>
                        </div>

                    </div>

                    <div className="input-group flex-nowrap mt-4">
                        <span className="input-group-text" id="addon-wrapping"><img src={ReferralIcon} alt="some text" /></span>
                        <input type="text" className="form-control" placeholder="Referral/Discount" aria-label="zip"
                            onChange={event => setSignUpObject({
                                ...signUpObject, referral: event.target.value
                            })}
                            aria-describedby="addon-wrapping" />
                    </div>

                    <div className="mt-2 text-center">
                        <button
                            className="strivbut btn btn-success mt-2" onClick={handleSignupSubmit}>{IsLoading ? "Please Wait...." : "Continue"}</button>
                    </div>

                    <div>
                        <label for="basic-url" class="form-label text-danger">{signUpObject.error}</label>
                    </div>
                </form>
            </div>
        </div >

    );
}