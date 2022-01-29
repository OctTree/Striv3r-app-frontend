import './Design.css'
import {useState, useEffect} from 'react';
import {Button, Container, Modal} from 'react-bootstrap'
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import defaultAvatar from "../images/avatar.png"

const userParameters = {
    name: "",
    email: "",
    image: "",
    zip: "",
    phone: "",
    referral: "",
    point_balance: "",
    total_point_earned: "",
    active: ""
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
    const [modalOpen, setModalOpen] = useState('modal fade show')
    const [activityPlans, setActivityPlans] = useState([]);
    const [planDetails, setPlanDetails] = useState([]);

    const [show, setShow] = useState(false);

    const handleModalClose = () => setShow(false);

    useEffect(() => {

        if (localStorage.getItem("token") !== null) {
            axios.get('/users/' + localStorage.getItem("user_id"), {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                setPlanDetails(res.data.data.plan_details)
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

    const handlePointSubmit = (event) => {
        axios.post('/redeems', {}, {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                window.location.reload()
            })
    }

    const handleCancel = (event) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure, you want to cancel?")) {
            axios.put('/users/' + localStorage.getItem("user_id"), {user: {active: 'false'}}, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "*/*",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    window.location.reload()
                })
        }
    }

    const render_checkbox = (size, activity_plan) => {
        const check_array = []
        if (activity_plan.frequency === activity_plan.frequency_finished) {
            for (var i = 0; i < size; i++) {
                check_array.push(<input type="checkbox" disabled="disabled" checked="checked"
                                        className="plan-input-box ms-1"/>);
            }
        } else {
            var i = 0

            for (i = 0; i < activity_plan.frequency_finished; i++) {
                check_array.push(<input type="checkbox" disabled="disabled" checked="checked"
                                        className="plan-input-box ms-1"/>);
            }

            for (i = 0; i < (size - activity_plan.frequency_finished); i++) {
                check_array.push(<input type="checkbox" disabled="disabled" className="plan-input-box ms-1"/>);
            }

        }

        return check_array;
    }

    const handleGoal = () => {
      history("/plans/edit")
    }

   const handleReactivate = () => {
       axios.put('/users/' + localStorage.getItem("user_id"), { user: { active: true } }, {
           headers: {
               'Content-Type': 'application/json', Accept: "*/*"
               , Authorization: `Bearer ${localStorage.getItem('token')}`
           }
       }).then(response => {
           window.location.reload()
       })
   }

    const handleTimer = (id) => {
        user.active === false ? setShow(true) : history(`/timer/${id}`)
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
                                    <span
                                        className="ml-3 points-text">{user.point_balance ? user.point_balance : 0}</span><br/>
                                    <span className="text-dark">Point Balance</span>
                                </div>
                                <div className="ms-1">
                                    <span
                                        className="ml-3 points-text">{user.total_point_earned ? user.total_point_earned : 0}</span>
                                    <br/>
                                    <span className="text-dark">Total Points Earned</span>
                                </div>
                            </div>
                            <div className="mt-1 d-inline-flex">
                                <div>
                                    <span className="ml-3 points-text">{user.referral_code}</span><br/>
                                    <span className="text-dark">Referral code</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <button className="btn btn-sm btn-primary" data-bs-toggle="modal"
                                        data-bs-target="#redeem-point-modal">Redeem Points
                                </button>
                            </div>

                            <div className="modal fade" id="redeem-point-modal" tabIndex="-1"
                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Redeem Points</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="form-group">
                                                    <input type="radio" name="redeem_point"/> Redeem for a cash value at
                                                    3 months
                                                </div>
                                                <div className="form-group">
                                                    <input type="radio" name="redeem_point"/> Redeem on free month
                                                    subscription at 300 points
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-sm btn-primary"
                                                    onClick={handlePointSubmit}>Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <Modal show={show} onHide={handleModalClose}>
                                <Modal.Body>
                                    Your account has been deactivated, would you like to reactivate your account and
                                    resume your payments
                                    at the previous amount?

                                    <Button variant="primary" className="mt-3" onClick={handleReactivate}>
                                        Reactivate Account
                                    </Button>
                                </Modal.Body>
                            </Modal>

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
                                <strong className="text-white"> <button className="btn btn-sm btn-link logout-button" onClick={handleGoal}>Edit Goal</button></strong>
                            </div>
                        </div>
                        <div className="col-12">
                            {
                                planDetails.map(function(val){
                               return     <div>
                                        <strong className="text-white">My goal is to {val.name} {val.days} / week
                                            for {val.time} minutes / session</strong>
                                    </div>
                                })
                            }
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
                                <strong className="text-white"><button className="btn btn-sm btn-link logout-button" onClick={handleGoal}>Edit Plan</button></strong>
                            </div>
                        </div>
                        <div className="col-12">
                            <strong className="t-colour">Week 1:</strong>
                            {activityPlans.map((activity_plan, index) => (
                                activity_plan.week === "week 1" ?
                                    <div>
                                        <a onClick={() => handleTimer(activity_plan.id)}
                                           className="text-white user-timer-button">{activity_plan.activity_name} {activity_plan.frequency}x
                                            this week for {activity_plan.time} min.</a>
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
                                        <a onClick={() => handleTimer(activity_plan.id)}
                                           className="text-white user-timer-button">{activity_plan.activity_name} {activity_plan.frequency}x
                                            this week for {activity_plan.time} min.</a>
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
                                activity_plan.week === "week 3" ?
                                    <div>
                                        <a onClick={() => handleTimer(activity_plan.id)}
                                           className="text-white user-timer-button">{activity_plan.activity_name} {activity_plan.frequency}x
                                            this week for {activity_plan.time} min.</a>
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
                    <button className="btn btn-sm btn-link logout-button" onClick={handleCancel}>Cancel</button>
                    <button className="btn btn-sm btn-link logout-button">Contact</button>
                </nav>
            </Container>

        </div>
    );
}