import './Design.css'

import React, {useState, useRef, useEffect} from "react";
import StartIcon from "../images/Start_Vector.png"
import StopIcon from "../images/Stop_Vector.png"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const planParameters = {
    time_of_day: "",
    day_on_week: "",
    days_per_week: "",
    minutes: "",
    goals: ""
}

export default function Timer() {



    const increment = useRef(null)
    const history = useNavigate();
    const [plan, setPlan] = useState(planParameters)

    const [timer, setTimer] = useState(900)
    const [classname, setClassname] = useState("MedRun")
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)


    useEffect(() => {

        if (localStorage.getItem("token") !== null) {
            axios.get('/users/' + localStorage.getItem("user_id"), {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
               let plan_data = res.data.data.plans[res.data.data.plans.length - 1]
                setPlan(plan_data)

                const plan_time = (plan_data.minutes * 60)
                setTimer(plan_time)
            })
        }
        else {
            history("/login")
        }
    }, [localStorage.getItem("user_id")]);

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
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

    return (
        <div className={classname}>
            <div className="col-lg-4 col-md-4 col-12 p-4">

                <div>
                    <p>{formatTime()}</p>
                    <div className='buttons'>
                        {
                            !isActive && !isPaused ?
                                <button onClick={handleStart}>Start</button>
                                : (
                                    isPaused ? <button onClick={handlePause}>Pause</button> :
                                        <button onClick={handleResume}>Resume</button>
                                )
                        }
                        
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <strong className="med-heading">Meditation Timer</strong>
                </div>
                <div className="d-inline-flex">
                    <div className="mt-3 text-center">
                        <img src={StartIcon} alt="some text" />
                    </div>

                    <div className="ms-3 mt-3 text-center">
                        <img src={StopIcon} alt="some text" />
                    </div>
                </div>

            </div>
        </div>
    );
}