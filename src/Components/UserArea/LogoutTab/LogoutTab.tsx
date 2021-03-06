import React from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../Services/GlobalHelpers";
import LoginModel from "../../Models/LoginModel";

interface userProps {
    user: LoginModel;
}

function LogoutTab(props: userProps): JSX.Element {

    //LogoutUser function importing from Global function services to handel logout

    return (
        <div className="LogoutTab">
            <span> Welcome {props.user && props.user.firstName}</span>
            <br />
            <NavLink to="/auth/login" onClick={() => logoutUser()}>Logout</NavLink>
        </div>
    );
}

export default LogoutTab;
