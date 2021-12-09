import Image from "../images/logo.jpg";
import PlanButton from '../images/plan_button.svg'
import React from "react";


export default function Plan() {

    return (
        <div className="col-12  bg-dark justify-content-center">
        <div className="col-lg-4 col-md-4 col-12 p-4">
            <div className="mt-3 text-center">
                <img src={Image} alt="some text" className="w-30 h-30"/>
            </div>

            <div className="mt-2 text-center">
              <h3 className="text-white">Create Your</h3>
               <h3 className="text-white"><span className="plans-striv3-text-color">Striv3</span> Plan</h3>
            </div>

            <div className="mt-1 text-center">
                <img src={PlanButton} alt="some text"/>
            </div>

            <div className="mt-2 d-flex justify-content-around">
                <div>
                <button className="plans-meditation-button">Meditation Goal:</button>
                </div>
                <div>
                 <span className="text-white">Need help <br/> planning?(vid)</span>
                </div>
            </div>

            <div className="mt-3 text-white plan-how-long">
                <span>How many times/wk do you want to <br/> meditate? For how Long?</span>
            </div>

            <div className="mt-4 d-flex justify-content-around">
                <div>
                    <input type="text" className="plan-input-box"/><span className="text-white ml-5">Days/Wk</span>
                </div>
                <div>
                    <input type="text" className="plan-input-box"/><span className="text-white ml-5">Minutes</span>
                </div>
            </div>

            <div className="mt-3 text-white plan-how-long">
                <span>What Days & Time work best for you?<br/> (Check all that apply)</span>
            </div>

            <div className="mt-4 d-flex justify-content-around">
               <div>
                   <input type="text" className="plan-input-box"/><span className="text-white ml-5">Mon</span>
               </div>
                <div>
                    <input type="text" className="plan-input-box"/><span className="text-white ml-5">Tues</span>
                </div>
                <div>
                    <input type="text" className="plan-input-box"/><span className="text-white ml-5">Wed</span>
                </div>
                <div>
                    <input type="text" className="plan-input-box"/><span className="text-white ml-5">Thurs</span>
                </div>
            </div>

            <div className="mt-4 d-flex">
                <div>
                    <input type="text" className="plan-input-box"/><span className="text-white ml-5">Fri</span>
                </div>
                <div>
                    <input type="text" className="plan-input-box"/><span className="text-white ml-5">Sat</span>
                </div>
                <div>
                    <input type="text" className="plan-input-box"/><span className="text-white ml-5">Sun</span>
                </div>
            </div>

            <div className="mt-3 text-white plan-how-long">
                <span>Time of Day:</span>
            </div>

            <div className="mt-2 d-flex">
                <div>
                    <input type="text" className="plan-input-box"/><span className="text-white ml-5">Morning</span>
                </div>
                <div>
                    <input type="text" className="plan-input-box"/><span className="text-white ml-5">Noon</span>
                </div>
                <div>
                    <input type="text" className="plan-input-box"/><span className="text-white ml-5">Evening</span>
                </div>
            </div>

            <div className="mt-3 text-white plan-how-long">
                <span>What other goals would you like to see?<br/> offered to track with your striv3 plan?</span>
            </div>

            <div className="mt-2">
                <textarea placeholder="(List out Here)" className="plan-text-area-class"></textarea>
            </div>

        </div>
    </div>
    )
}