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
    time: ""
}

export default function Timer(props) {



    const increment = useRef(null)
    const history = useNavigate();
    const [plan, setPlan] = useState(planParameters)

    const [timer, setTimer] = useState(900)
    const [classname, setClassname] = useState("MedRun")
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const { id } = useParams();


    useEffect(() => {

        if (localStorage.getItem("token") !== null) {
            axios.get('/activity_plans/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
               let plan_data = res.data.activity_plan
                setPlan(plan_data)
                if(plan_data.activity_name === "workout"){
                    setClassname("MedWork")
                }
                else if(plan_data.activity_name === "run"){
                    setClassname("MedRun")
                }
                else if(plan_data.activity_name === "journal"){
                    setClassname("MedJour")
                }
                else if(plan_data.activity_name === "musical"){
                    setClassname("MedPrac")
                }
                else{
                    setClassname("Med")
                }
                console.log(plan_data)
                setTimer(plan_data.remaining_time)
            })
        }
        else {
            history("/login")
        }
    }, []);

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
        axios.put('/activity_plans/' + id, activity_form, {headers: {'Content-Type': 'application/json', Accept: "*/*"
            , Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
            .then(response => {
                console.log(response)
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

        if(getMinutes > 0 && getSeconds > 0){
            return `${getMinutes} : ${getSeconds}`
        }
        else{
            return `00 : 00`
        }
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