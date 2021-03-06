import React from "react";
import { NavLink } from "react-router-dom";

function LoginTab(): JSX.Element {
    return (
        <div className="LoginTab">
            <NavLink to="/auth/login" >Login</NavLink>
            <span>/</span>
            <NavLink to="/auth/register">Register</NavLink>
        </div>
    );
}

export default LoginTab;
