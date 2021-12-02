import './Design.css'
import { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap'
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import defaultAvatar from "../images/defaultavatar.png"

const userParameters = {
    name: "",
    email: "",
    image: "",
    zip: "",
    phone: "",
    referral: ""
}

export default function User() {

    useEffect(() => {

       if(localStorage.getItem("token")){
           axios.get('/users/' + localStorage.getItem("user_id"), {
               headers: {
                   'Content-Type': 'application/json',
                   Accept: "*/*",
                   Authorization: `Bearer ${localStorage.getItem('token')}`
               }
           }).then(res =>{
               setUser(res.data.data.user)
           })
       }
       else {
           history("/login")
       }
    }, [localStorage.getItem("user_id")]);

    const history = useNavigate();

    const [user, setUser] = useState(userParameters);

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
            history('/login');
        })
    }

    return (
        <div>
            <nav className="navbar navbar-light bg-light justify-content-between">
                <div className="striv3-nav-bannar">
                    <a href="/users" className="navbar-brand">Striv3r</a>
                </div>

                <button className="btn btn-sm btn-danger logout-button" onClick={handleLogout}>Logout</button>
            </nav>

            <Container fluid>
              <div className="container mt-3">

                  <div className="row">
                     <div className="col-md-6 col-sm-6">
                         <h4 className="text-muted">Profile Pic</h4>
                         <img src={defaultAvatar} alt="some text" className="default-profile-pic mt-2"/>
                     </div>
                  </div>

                  <div className="row mt-3">
                     <div className="col-md-3 col-sm-3">
                         <strong>Name</strong>
                     </div>
                      <div className="col-md-3 col-sm-3 mt-sm-1">
                          {user.name}
                      </div>
                  </div>

                  <div className="row mt-3">
                      <div className="col-md-3 col-sm-3">
                          <strong>Email</strong>
                      </div>
                      <div className="col-md-3 col-sm-3 mt-sm-1">
                          {user.email}
                      </div>
                  </div>

                  <div className="row mt-3">
                      <div className="col-md-3 col-sm-3">
                          <strong>Phone</strong>
                      </div>
                      <div className="col-md-3 col-sm-3 mt-sm-1">
                          {user.phone}
                      </div>
                  </div>

                  <div className="row mt-3">
                      <div className="col-md-3 col-sm-3">
                          <strong>Zip</strong>
                      </div>
                      <div className="col-md-3 col-sm-3 mt-sm-1">
                          {user.zip}
                      </div>
                  </div>

                  <div className="row mt-3">
                      <div className="col-md-3 col-sm-3">
                          <strong>Referral</strong>
                      </div>
                      <div className="col-md-3 col-sm-3 mt-sm-1">
                          {user.referral}
                      </div>
                  </div>

              </div>
            </Container>
        </div>
    );
}