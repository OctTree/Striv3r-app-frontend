import './Design.css'
import React from "react";
import {useNavigate} from "react-router-dom";

export default function PageNotFound() {
    const history = useNavigate();
    const handleHome = () => {
        history("/user")
    }

    return (
        <div className="page-not-found">
            The Page you are looking for is not found. Please check the url
            <div className="mt-2">
            <button className="btn btn-primary" onClick={handleHome}>Home</button>
            </div>
        </div>
    )
}