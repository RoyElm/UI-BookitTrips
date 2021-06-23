import React, { useEffect, useRef, useState } from "react";
import "./NavLog.css";
import UserModel from '../../Models/UserModel';
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";
import LogoutTab from "../LogoutTab/LogoutTab";
import LoginTab from "../LoginTab/LoginTab";
import { Avatar, Menu, MenuItem } from "@material-ui/core";


function NavLog(): JSX.Element {

    //Handling user login/logout changes.
    const [auth, setAuth] = useState<UserModel>(store.getState().authState.auth);

    //build in Material UI requirements
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuItemRef = useRef()
    const open = Boolean(anchorEl);

    //handling click on Menu component and open the Menu items used Material ui documentation
    const handleClick = () => {
        setAnchorEl(menuItemRef.current);
    };

    //handle close menu item component.
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    //Handling user login to render his first later of first name to show at Menu, also to know if he logged out or logged in;
    useEffect(() => {
        const unSubscribe: Unsubscribe = store.subscribe(() => {
            const auth = store.getState().authState.auth;
            setAuth(auth);
        });
        return unSubscribe;
    },[])

    return (
        <nav className="NavLog">
            <Avatar
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="avatar"
            >
                {auth.user && auth.isLoggedIn ? auth.user.firstName.charAt(0).toUpperCase() : null}
            </Avatar>

            <Menu
                className="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleClose} ref={menuItemRef}>
                    {auth.user && auth.isLoggedIn ? <LogoutTab user={auth.user} /> : <LoginTab />}
                </MenuItem>
            </Menu>
        </nav>
    );
}

export default NavLog;
