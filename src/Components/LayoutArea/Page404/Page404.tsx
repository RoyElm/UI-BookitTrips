import React from "react";
import './Page404.css';
import page404 from '../../../assets/images/page404.png';
import { NavLink } from "react-router-dom";

function Page404(): JSX.Element {
    return (
        <div className="Page404">
            <img src={page404} alt=""/>
            <NavLink className="homePageNav" to="/welcome"></NavLink>
            <NavLink className="vacationPageNav" to="/vacations"></NavLink>
        </div>
    );
}

export default Page404;
