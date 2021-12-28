import './Design.css'
import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap'
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import defaultAvatar from "../images/avatar.png"

const userParameters = {
    name: "",
    email: "",
    image: "",
    zip: "",
    phone: "",
    referral: ""
}

const planParameters = {
    time_of_day: "",
    day_on_week: "",
    days_per_week: "",
    minutes: "",
    goals: ""
}

export default function User() {

    const history = useNavigate();

    const [user, setUser] = useState(userParameters);
    const [plan, setPlan] = useState(planParameters);
    const [activityPlans, setActivityPlans] = useState([]);

    useEffect(() => {

        if (localStorage.getItem("token") !== null) {
            axios.get('/users/' + localStorage.getItem("user_id"), {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {

                if (res.data.data.plans.length === 0) {
                    alert("You don't have any Plan. please update your plan.")
                    history('/plans/new');
                }

                axios.get('/activity_plans', {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "*/*",
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(response => {
                    console.log(response)
                    setActivityPlans(response.data)
                })

                setUser(res.data.data.user)
                setPlan(res.data.data.plans[res.data.data.plans.length - 1])
            })
        } else {
            history("/login")
        }
    }, [localStorage.getItem("user_id")]);

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
            localStorage.removeItem("user_id")
            history('/login');
        })
    }

    const render_checkbox = (size, activity_plan) => {
        const check_array = []
        for (var i = 0; i < size; i++) {
            if (activity_plan.remaining_time <= 0){
                check_array.push(<input type="checkbox" checked="checked" className="plan-input-box ms-1"/>);
            }
            else{
                check_array.push(<input type="checkbox" className="plan-input-box ms-1"/>);
            }
        }
        return check_array;
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
                            <img src={defaultAvatar} alt="some text" className="default-profile-pic"/>
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
                        <div className="col-12 d-inline-flex">
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
                            <strong className="text-white">My goal is to meditate {plan.days_per_week} / week
                                for {plan.minutes} minutes / session</strong>
                        </div>
                    </div>

                    <div className="col-12 col-sm-4 p-2 user-cus-div-border">
                        <div className="col-12 d-inline-flex">
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
                            <strong className="t-colour">Week 1:</strong>
                            {activityPlans.map((activity_plan, index) => (
                                activity_plan.week === "week 1" ?
                                    <div>
                                        <a href={"/timer/" + activity_plan.id} className="text-white">{activity_plan.activity_name} {activity_plan.frequency}x this week for {activity_plan.time} min.</a>
                                        {
                                            render_checkbox(activity_plan.frequency, activity_plan)
                                        }
                                    </div>
                                    :
                                    "No Activity"
                            ))}
                        </div>
                        <div className="col-12 ms-2">
                            <strong className="t-colour">Week 2:</strong>
                            {activityPlans.map((activity_plan, index) => (
                                activity_plan.week === "week 2" ?
                                    <div>
                                        <a href={"/timer/" + activity_plan.id} className="text-white">{activity_plan.activity_name} {activity_plan.frequency}x this week for {activity_plan.time} min.</a>
                                        {
                                            render_checkbox(activity_plan.frequency, activity_plan)
                                        }
                                    </div>
                                    :
                                    "No Activity"
                            ))}
                        </div>
                        <div className="col-12 ms-3">
                            <strong className="t-colour">Week 3:</strong>
                            {activityPlans.map((activity_plan, index) => (
                                activity_plan.week === "week 3" || activity_plan.week === "week 4" ||  activity_plan.week === "week 5" ?
                                    <div>
                                        <a href={"/timer/" + activity_plan.id} className="text-white">{activity_plan.activity_name} {activity_plan.frequency}x this week for {activity_plan.time} min.</a>
                                        {
                                            render_checkbox(activity_plan.frequency, activity_plan)
                                        }
                                    </div>
                                    :
                                    "No Activity"
                            ))}
                        </div>
                    </div>


                </div>
                <nav className="navbar navbar-light bg-dark justify-content-between">

                    <button className="btn btn-sm btn-link logout-button" onClick={handleLogout}>Logout</button>
                    <button className="btn btn-sm btn-link logout-button">Contact</button>
                </nav>
            </Container>

        </div>
    );
}