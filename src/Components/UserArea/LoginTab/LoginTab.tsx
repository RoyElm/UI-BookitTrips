import React from "react";
import { NavLink } from "react-router-dom";
import GlobalPaths from "../../../Services/GlobalPaths.env";

function LoginTab(): JSX.Element {
    return (
        <div className="LoginTab">
            <NavLink to={GlobalPaths.loginPage} >Login</NavLink>
            <span>/</span>
            <NavLink to={GlobalPaths.registerPage}>Register</NavLink>
        </div>
    );
}

export default LoginTab;
