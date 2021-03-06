import React, { useEffect, useState } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import UserModel from "../../Models/UserModel";
import NavLog from "../../UserArea/NavLog/NavLog";
import HeaderBuilder from "../HeaderBuilder/HeaderBuilder";
import "./Header.css";

function Header(): JSX.Element {
    
    //Handling user login/logout changes.
    const [auth, setAuth] = useState<UserModel>(store.getState().authState.auth);

    //Listen to store changes to get when user loggedin to render his right Links at header.
    useEffect(() => {
        const unSubscribe: Unsubscribe = store.subscribe(() => {
            const auth = store.getState().authState.auth;
            setAuth(auth);
        })
        return unSubscribe;
    });

    return (
        <div className="Header">
            <h1>Bookit Trips!</h1>
            {auth.isLoggedIn && auth.user.isAdmin ?
                <HeaderBuilder isAdmin={1}/> : <HeaderBuilder isAdmin={0}/>
            }
            <NavLog />
        </div >
    );

}

export default Header;
