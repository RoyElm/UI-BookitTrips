import React, { useEffect, useRef } from "react";
import "./LoginPage.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import LoginModel from "../../Models/LoginModel";
import { Globals } from "../../../Services/Globals";
import store from "../../../Redux/Store";
import { authLoggedInAction } from "../../../Redux/AuthState";
import { authorizationHeader } from "../../../Services/GlobalHelpers";
import { socketManagerInstance } from '../../../Socket.io/SocketManager';
import { errorsService } from "../../../Services/GlobalErrorsService";

function LoginPage(): JSX.Element {

    let registered = useRef<LoginModel>();
    const history = useHistory();
    const { register, handleSubmit } = useForm<LoginModel>();

    useEffect(() => {
        //Handling unauthorized behavior of user;
        if (store.getState().authState.auth.isLoggedIn) {
            history.push("/page404");
        }

        //After registration rendering the username that has been registered;
        if (!store.getState().authState.auth.isLoggedIn && store.getState().authState.auth.user) {
            registered.current = store.getState().authState.auth.user;
        };
    })

    //Handling login form submit;
    async function send(user: LoginModel) {
        try {
            const response = await axios.post<LoginModel>(Globals.authUrl + "login", user);
            const userLogged = response.data;
            
            //Start listen to socket.io
            socketManagerInstance.connect();
            store.dispatch(authLoggedInAction(userLogged));

            //function from Global function services that will add to Axios header user token.
            authorizationHeader(userLogged);
            history.push("/vacations");
        } catch (err) {
            alert(errorsService.getError(err))
        }
    }

    return (
        <div className="LoginPage">
            <div className="wrapper">
                <div className="title">
                    Login
                </div>
                <form action="POST" onSubmit={handleSubmit(send)}>
                    <div className="field">

                        <input type="text" name="username" ref={register} defaultValue={registered.current ? registered.current.username : ""} required />
                        <label>User name:</label>
                    </div>
                    <div className="field">
                        <input type="password" name="password" ref={register} required />
                        <label>Password</label>
                    </div>
                    <div className="field">
                        <input type="submit" value="Login" />
                    </div>
                    <div className="signup-link">
                        Not a member? <NavLink to="/auth/register">Signup now</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default LoginPage;
