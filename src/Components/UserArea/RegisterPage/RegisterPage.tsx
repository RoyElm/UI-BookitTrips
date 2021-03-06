import React, { useEffect } from "react";
import "./RegisterPage.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import RegisterModel from "../../Models/RegisterModel";
import { Globals } from "../../../Services/Globals";
import store from "../../../Redux/Store";
import { authRegisteredAction } from "../../../Redux/AuthState";
import { errorsService } from "../../../Services/GlobalErrorsService";
import { GlobalPaths } from "../../../Services/GlobalPaths";


function RegisterPage(): JSX.Element {

    const { register, handleSubmit } = useForm<RegisterModel>();
    const history = useHistory();

    //Handling unauthorized behavior of user
    useEffect(() => {
        if (store.getState().authState.auth.isLoggedIn) {
            history.push("/page404");
        }
    });

    //Handling submit of registration form;
    async function send(newUser: RegisterModel) {
        try {
            await axios.post<RegisterModel>(Globals.authUrl + "register", newUser);
            store.dispatch(authRegisteredAction(newUser));
            history.push(GlobalPaths.loginUrl);
        }
        catch (err) {
            alert(errorsService.getError(err));
        }
    }

    return (
        <div className="RegisterPage">
            <div className="wrapper">
                <div className="title">
                    SignUp
                </div>
                <form action="POST" onSubmit={handleSubmit(send)}>
                    <div className="field">
                        <input type="text" name="firstName" ref={register}
                            minLength={2} maxLength={20} required />
                        <label>First Name:</label>
                    </div>

                    <div className="field">
                        <input type="text" name="lastName" ref={register}
                            minLength={2} maxLength={20} required />
                        <label>Last Name:</label>
                    </div>

                    <div className="field">
                        <input type="text" name="username" ref={register}
                            maxLength={20} minLength={4} required />
                        <label>User name:</label>
                    </div>

                    <div className="field">
                        <input type="password" name="password" ref={register}
                            minLength={6} maxLength={20} required />
                        <label>Password</label>
                    </div>

                    <div className="field">
                        <input type="submit" value="Register" />
                    </div>
                    <div className="login-link">
                        <NavLink to={GlobalPaths.loginUrl}>Login now</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
