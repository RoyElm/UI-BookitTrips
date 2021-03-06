import React from "react";
import { NavLink } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalPaths";

function LoginTab(): JSX.Element {
    return (
        <div className="LoginTab">
            <NavLink to={GlobalPaths.loginUrl} >Login</NavLink>
            <span>/</span>
            <NavLink to={GlobalPaths.registerUrl}>Register</NavLink>
        </div>
    );
}

export default LoginTab;
