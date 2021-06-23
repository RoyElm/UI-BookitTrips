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
import GlobalPaths from "../../../Services/GlobalPaths.env";
import LoginModel from "../../Models/LoginModel";


function RegisterPage(): JSX.Element {

    const { register, handleSubmit } = useForm<RegisterModel>();
    const history = useHistory();
    const { auth } = store.getState().authState;
    //Handling unauthorized behavior of user
    useEffect(() => {
        if (auth.isLoggedIn) {
            history.push(GlobalPaths.home);
        }
    }, [auth, history]);

    //Handling submit of registration form;
    async function submitForm(newUser: RegisterModel) {
        try {
            const response = await axios.post<LoginModel>(Globals.authUrl + "register", newUser);
            store.dispatch(authRegisteredAction(response.data));
            history.push(GlobalPaths.loginPage);
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
                <form action="POST" onSubmit={handleSubmit(submitForm)}>
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
                        <NavLink to={GlobalPaths.loginPage}>Login now</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
