import './Design.css'

import React, {useState, useRef, useEffect} from "react";
import StartIcon from "../images/Start_Vector.png"
import StopIcon from "../images/Stop_Vector.png"
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const planParameters = {
    activity_name: "",
    remaining_time: "",
    time_spent: "",
    time: "",
    frequency: "",
    frequency_finished: ""
}

export default function Timer(props) {


    const increment = useRef(null)
    const history = useNavigate();
    const [plan, setPlan] = useState(planParameters)

    const [timer, setTimer] = useState(900)
    const [classname, setClassname] = useState("MedRun")
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const {id} = useParams();


    useEffect(() => {


        if (localStorage.getItem("token") !== null) {

            axios.get('/users/' + localStorage.getItem("user_id"), {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {

                    axios.get('/activity_plans/' + id, {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: "*/*",
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }).then(res => {
                        let plan_data = res.data.activity_plan
                        setPlan(plan_data)
                        if (plan_data.activity_name === "workout") {
                            setClassname("MedWork")
                        } else if (plan_data.activity_name === "run") {
                            setClassname("MedRun")
                        } else if (plan_data.activity_name === "journal") {
                            setClassname("MedJour")
                        } else if (plan_data.activity_name === "musical") {
                            setClassname("MedPrac")
                        } else if (plan_data.activity_name === "walk") {
                            setClassname("MedRun")
                        } else {
                            setClassname("Med")
                        }

                        plan_data.frequency_finished === plan_data.frequency ? setTimer(0) : setTimer(plan_data.remaining_time)
                    })

            })
        } else {
            history("/login")
        }
    }, []);

    useEffect(() => {

        if (plan.frequency) {
            if (plan.frequency === plan.frequency_finished) {
                alert("Activity Plan Completed.")
                return history("/user")
            }
        }


        var remaining_time = plan.frequency === 1 ? 0 : plan.frequency_finished === (plan.frequency - 1) ? 0 : (plan.time * 60)

        if (timer === 0) {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Do you want to confirm this activity?")) {
                clearInterval(increment.current)
                setIsPaused(false)

                const activity_form = {
                    activity_plan: {
                        time_spent: 0,
                        remaining_time: remaining_time,
                        completed: true,
                        frequency_finished: (plan.frequency_finished + 1)
                    }
                }

                axios.put('/activity_plans/' + id, activity_form, {
                    headers: {
                        'Content-Type': 'application/json', Accept: "*/*"
                        , Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(response => {
                    history("/user")
                })
            } else {
                let time_remaining = (plan.time * 60)
                setTimer(time_remaining)

                const activity_form = {
                    activity_plan: {
                        time_spent: 0,
                        remaining_time: time_remaining
                    }
                }

                axios.put('/activity_plans/' + id, activity_form, {
                    headers: {
                        'Content-Type': 'application/json', Accept: "*/*"
                        , Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            }
        }
    }, [timer === 0])

    const handleStart = () => {
        setIsActive(true)
        setIsPaused(true)
        increment.current = setInterval(() => {

            setTimer((timer) => timer - 1)

        }, 1000)
    }

    const handlePause = () => {
        clearInterval(increment.current)
        setIsPaused(false)

        let total_time = plan.remaining_time
        let time_spent = total_time - timer
        let time_remaining = (total_time - time_spent)

        const activity_form = {
            activity_plan: {
                time_spent: time_spent,
                remaining_time: time_remaining
            }
        }
        axios.put('/activity_plans/' + id, activity_form, {
            headers: {
                'Content-Type': 'application/json', Accept: "*/*"
                , Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    const handleResume = () => {
        setIsPaused(true)
        increment.current = setInterval(() => {
            setTimer((timer) => timer - 1)
        }, 1000)
    }

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)

        return `${getMinutes} : ${getSeconds}`
    }

    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className={classname}>
            <div className="col-lg-4 col-md-4 col-12 p-4">

                <div>
                    <p style={{fontSize: "28px"}}>{formatTime()}</p>
                    <div className="mt-3 text-center">
                        <strong className="med-heading">{Capitalize(plan.activity_name)} Timer</strong>
                    </div>
                    <div className='buttons mt-3'>
                        {
                            !isActive && !isPaused ?
                                <button className="timer-activity-plan-button" onClick={handleStart}><img
                                    src={StartIcon} alt="some text"/></button>
                                : (
                                    isPaused ? <button className="timer-activity-plan-button" onClick={handlePause}><img
                                            src={StopIcon} alt="some text"/></button> :
                                        <button className="timer-activity-plan-button" onClick={handleResume}><img
                                            src={StartIcon} alt="some text"/></button>
                                )
                        }

                    </div>
                </div>

            </div>
        </div>
    );
}