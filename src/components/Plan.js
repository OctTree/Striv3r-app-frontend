import Image from "../images/logo.jpg";
import PlanButton from '../images/plan_button.svg'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const plan_state = {
    days_per_week: '',
    minutes: '',
    day_on_week: [],
    time_on_day: '',
    goals: '',
    error: ''
}

export default function Plan() {

    const [planObject, setplanObject] = useState(plan_state);
    const [IsLoading, setIsLoading] = useState(false);
    const [selectedDay, setSelectedDay] = useState([]);
    const history = useNavigate();

    const handleChange = event => {
        const { checked, value } = event.currentTarget;

        setSelectedDay(
            prev => checked
                ? [...prev, value]
                : prev.filter(val => val !== value)
        );
    };

    const handlePlanSubmit = (event) => {
        event.preventDefault();
        console.log(selectedDay)
        const signup_parameter = {
            plan: {
                days_per_week: planObject.days_per_week,
                minutes: planObject.minutes,
                day_on_week: selectedDay,
                time_on_day: planObject.time_on_day,
                goals: planObject.goals,
            }
        }
        if (planObject.days_per_week > 7) {
            setplanObject({ ...planObject, error: "Days Per week should be 7 or less then 7" })
        }
        else {
            setIsLoading(true)
            axios.post('/plans', signup_parameter, { headers: { 'Content-Type': 'application/json', Accept: "*/*", Authorization: `Bearer ${localStorage.getItem('token')}` } })
                .then(response => {
                    setIsLoading(false)

                    let state_value = response.status
                    if (state_value === 200) {
                        history.push('/user');
                    }
                    localStorage.setItem("access-token", response.data);
                }).catch(error => {
                    setIsLoading(false)
                    console.log(error.response)
                    if (!error.response) {
                        history('/login');
                    } else {
                        let state_value = error.response.status
                        if (state_value === 500 || 400 || 401) {

                            setplanObject({
                                ...planObject, error: error.response.data.errors[0]
                            })

                        }

                    }
                }
                )
        }
    }

    return (
        <form onSubmit={handlePlanSubmit}>
            <div className="col-12  bg-dark justify-content-center">
                <div className="col-lg-4 col-md-4 col-12 p-4">
                    <div className="mt-3 text-center">
                        <img src={Image} alt="some text" className="w-30 h-30" />
                    </div>

                    <div className="mt-2 text-center">
                        <h3 className="text-white">Create Your</h3>
                        <h3 className="text-white"><span className="plans-striv3-text-color">Striv3</span> Plan</h3>
                    </div>

                    <div className="col-12 mt-1 text-center">
                        <img src={PlanButton} alt="some text" />
                    </div>

                    <div className="col-12 mt-2 d-flex justify-content-around">
                        <div className="col-6">
                            <button className="btn plans-meditation-button">Meditation Goal:</button>
                        </div>
                        <div className="col-4">
                            <span className="text-white">Need help <br /> planning?(vid)</span>
                        </div>
                    </div>

                    <div className="col-12 mt-3 text-white plan-how-long">
                        <span>How many times/wk do you want to <br /> meditate? For how Long?</span>
                    </div>

                    <div className="col-12 mt-4 d-flex">
                        <div className="col-6 ms-2">
                            <input type="number" className="plan-input-box"

                                onChange={event => setplanObject({
                                    ...planObject, days_per_week: event.target.value,
                                    error: ''
                                })}

                            /><span className="text-white ms-2">Days/Wk</span>
                        </div>
                        <div className="col-6">
                            <input type="number" className="col-6 plan-input-box"

                                onChange={event => setplanObject({
                                    ...planObject, minutes: event.target.value,
                                    error: ''
                                })}

                            /><span className="text-white ms-2">Minutes</span>
                        </div>
                    </div>

                    <div className="mt-3 text-white plan-how-long">
                        <span>What Days & Time work best for you?<br /> (Check all that apply)</span>
                    </div>

                    <div className="col-12 mt-4 d-flex">
                        <div className="col-3 ms-2">
                            <input type="checkbox" value="monday"
                                onChange={handleChange}
                                className="plan-input-box" /><span className="text-white ms-2">Mon</span>
                        </div>
                        <div className="col-3">
                            <input type="checkbox" value="tuesday" onChange={handleChange} className="plan-input-box" /><span className="text-white ms-2">Tues</span>
                        </div>
                        <div className="col-3">
                            <input type="checkbox" value="wednesday" onChange={handleChange} className="plan-input-box" /><span className="text-white ms-2">Wed</span>
                        </div>
                        <div className="col-3">
                            <input type="checkbox" value="thursday" onChange={handleChange} className="plan-input-box" /><span className="text-white ms-2">Thurs</span>
                        </div>
                    </div>

                    <div className="col-12 mt-4 d-flex">
                        <div className="col-3 ms-2">
                            <input type="checkbox" value="friday" onChange={handleChange} className="plan-input-box" /><span className="text-white ms-2">Fri</span>
                        </div>
                        <div className="col-3">
                            <input type="checkbox" value="saturday" onChange={handleChange} className="plan-input-box" /><span className="text-white ms-2">Sat</span>
                        </div>
                        <div className="col-3">
                            <input type="checkbox" value="sunday" onChange={handleChange} className="plan-input-box" /><span className="text-white ms-2">Sun</span>
                        </div>
                    </div>

                    <div className="col-12 mt-3 text-white plan-how-long">
                        <span>Time of Day:</span>
                    </div>

                    <div className="col-12 mt-2 d-flex">
                        <div className="col-4 ms-2">
                            <input type="checkbox" className="plan-input-box" /><span className="text-white ms-2">Morning</span>
                        </div>
                        <div className="col-4">
                            <input type="checkbox" className="plan-input-box" /><span className="text-white ms-2">Noon</span>
                        </div>
                        <div className="col-4">
                            <input type="checkbox" className="plan-input-box" /><span className="text-white ms-2">Evening</span>
                        </div>
                    </div>

                    <div className="mt-3 text-white plan-how-long">
                        <span>What other goals would you like to see?<br /> offered to track with your striv3 plan?</span>
                    </div>

                    <div className="mt-2">
                        <textarea placeholder="(List out Here)"
                            onChange={event => setplanObject({
                                ...planObject, goals: event.target.value,
                                error: ''
                            })}
                            className="plan-text-area-class"></textarea>
                    </div>

                </div>

                <div className="m-2 text-center">
                    <button className="strivbut btn btn-success" onClick={handlePlanSubmit} type="submit">{IsLoading ? "Please Wait...." : "Continue"}</button>
                </div>

                <div className="col-12 mt-2 ms-5">
                    <strong className="text-danger ms-2">{planObject.error}</strong>
                </div>
            </div>
        </form>
    )
}