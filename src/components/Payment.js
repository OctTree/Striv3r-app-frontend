import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import Vector from "../images/name.svg"
import ReferralIcon from "../images/VectorRefferal.png"
import PaymentIcon from "../images/payment_icon.svg"
import PlanButton from "../images/plan_button.svg";
import PaymentTwoIcon from "../images/payment_two_icon.svg";
import {loadStripe} from '@stripe/stripe-js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {CardElement, Elements, useStripe, useElements} from '@stripe/react-stripe-js';

const subscription_state = {
    referral_code: '',
    amount: "",
    subscription_type: "",
    error: ''
}

const CheckoutForm = () => {

    const [IsLoading, setIsLoading] = useState(false);
    const [subscriptionObject, setSubscriptionObject] = useState(subscription_state);
    const history = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const handSubscriptionTypeChange = (event) => {
        const {checked, value} = event.currentTarget;

        setSubscriptionObject({
            ...subscriptionObject, subscription_type: value,
            error: ''
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        } else if (subscriptionObject.referral_code.length <= 5 && subscriptionObject.referral_code === '') {
            setSubscriptionObject({
                ...subscriptionObject, error: 'Referral Code is Required and should be greater than 5 characters.'
            })
        } else if (subscriptionObject.referral_code.length <= 5) {

            setSubscriptionObject({
                ...subscriptionObject, error: 'Referral Code should be greater than 5 characters.'
            })
        } else if (subscriptionObject.referral_code === '') {

            setSubscriptionObject({
                ...subscriptionObject, error: 'Referral Code is Required.'
            })
        } else {
            stripe.createToken(elements.getElement(CardElement)).then((token) => {
               if (token.error){
                   window.location.reload()
               }
               else {
                   setIsLoading(true)
                   let subscription_params = {
                       referral_code: subscriptionObject.referral_code,
                       amount: subscriptionObject.amount,
                       subscription_type: subscriptionObject.subscription_type,
                       last_four_digits: token.token.card.last4,
                       token: token.token.id
                   }

                   axios.post('/subscriptions', subscription_params, {
                       headers: {
                           'Content-Type': 'application/json',
                           Accept: "*/*",
                           Authorization: `Bearer ${localStorage.getItem('token')}`
                       }
                   })
                       .then(response => {
                           setIsLoading(false)

                           let state_value = response.status
                           if (state_value === 200) {
                               history('/user');
                           }
                           localStorage.setItem("access-token", response.data);
                       })
               }
            });
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="col-7 d-flex ">

                <div className="col-2 input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping"><img src={Vector} alt="some text"/></span>
                    <input type="text" className="form-control" placeholder="Name" aria-label="Username"
                           aria-describedby="addon-wrapping"/>
                </div>


                <div className="col-8 ms-1">

                    <input type="text" className="form-control" placeholder="Address / Apt.." aria-label="email"
                           aria-describedby="addon-wrapping"/>
                </div>

            </div>

            <div className="col-12 d-flex mt-4">
                <CardElement/>
            </div>

            <div className="col-12 mt-2">

                <div className="col-12 mt-3 text-white h2 d-inline-flex">
                    <strong>Subscription Options:</strong>
                    <a className="mt-2 ms-3 h6 text-decoration-none text-white">*Why $20+?</a>
                </div>

                <div className="col-12 mt-3 text-white h2">
                    <strong><input type="radio" value="30" name="amount" onChange={handSubscriptionTypeChange}/> <span
                        className="ml-2">$30* /mo ($15 rewards)</span></strong>
                </div>

                <div className="col-12 mt-3 text-white h2">
                    <strong><input type="radio" value="60" name="amount" onChange={handSubscriptionTypeChange}/> <span
                        className="ml-2">$60 /3mo ($50 rewards, referral req)</span></strong>
                </div>

                <div className="col-12 mt-3 text-white h2">
                    <strong><input type="radio" value="other" name="amount" onChange={handSubscriptionTypeChange}/>
                        <span className="ml-2">Other (scaling by income)*</span></strong>
                </div>

            </div>

            <div className="col-12 d-flex mt-4 ms-3">

                <div className="col-2">

                    <input type="number" className="form-control" placeholder="$" aria-label="$"
                           aria-describedby="addon-wrapping"/>
                </div>


                <div className="col-4 ms-1">
                    <a className="ms-3 h6 text-decoration-none text-white">$amount/min</a>
                </div>
                <div className="col-2 ms-1">
                    <Tippy content="$/min = to .1% of annual income, Reward = 75.90%(value must be >$50)">
                        <span className="text-white payment-tooltip">?</span>
                    </Tippy>
                </div>

            </div>

            <div className="input-group flex-nowrap mt-4">
                <span className="input-group-text" id="addon-wrapping"><img src={ReferralIcon} alt="some text"/></span>
                <input type="text" className="form-control" onChange={event => setSubscriptionObject({
                    ...subscriptionObject, referral_code: event.target.value,
                    error: ''
                })} placeholder="Referral/Discount" aria-label="zip"
                       aria-describedby="addon-wrapping"/>
            </div>
            <label for="basic-url" class="form-label text-danger">{subscriptionObject.error}</label>

            <div className="mt-2 text-center">
                <button
                    className="strivbut btn btn-success mt-2"
                >{IsLoading ? "Please Wait.." : "Continue"}</button>
            </div>
        </form>
    );
};


export default function Payment() {

    const history = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history.push("/")
        }
    }, [localStorage.getItem('token')])

    const stripePromise = loadStripe('pk_test_51KIp05K0Z4NcdBjlcUvkbx3fR38IlCDuEmIPdnkMvSpraHgM7ecntWaQhfQ5l5L3jb0HRdRozaMXmbjsLnpPKhNi004ckqHR3K');

    return (
        <div className="col-lg-4 col-sm-4 bg-dark justify-content-center">
            <div className="p-4">

                <div className="mt-3 text-center">
                    <img src={PaymentIcon} alt="some text" className="w-30 h-30"/>
                </div>

                <div className="mt-3 text-center">
                    <img src={PaymentTwoIcon} alt="some text"/>
                </div>

                <div className="col-12 mt-1 text-center">
                    <img src={PlanButton} alt="some text"/>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm/>
                </Elements>

            </div>
        </div>

    );
}