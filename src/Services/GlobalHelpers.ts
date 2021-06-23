import axios from 'axios';
import { socketManagerInstance } from "../Socket.io/SocketManager";
import store from "../Redux/Store";
import { authLoggedOutAction } from "../Redux/AuthState";
import { vacationResetAction } from "../Redux/VacationsState";
import LoginModel from '../Components/Models/LoginModel';
import { errorsService } from './GlobalErrorsService';

//Global functions helper each component can reusable that functions.

//change Date format to be in same Local time. and with the format YYYY-DD-MMl
export function changeDateFormat(date: string) {
    const originalDate = new Date(date);
    const dateString = new Date(originalDate.getTime() - (originalDate.getTimezoneOffset() * 60000))
        .toISOString().split("T")[0];
    return dateString;
}

export function creatingRandomColors() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.8 + ')';
}

//Handling header authorization adding user token.
export function authorizationHeader(userLogged: LoginModel) {
    axios.defaults.headers["authorization"] = `Bearer ${userLogged.token}`;
    return;
}

//Handling logout user reseting vacation list, logging out user at redux, deleting token from header and disconnect from socket.io.
export function logoutUser() {
    store.dispatch(vacationResetAction());
    store.dispatch(authLoggedOutAction());
    delete axios.defaults.headers["authorization"];
    socketManagerInstance.disconnect();
    return;
}

export function handlingCatchError(error) {
    if (error.response?.status === 403) {
        logoutUser();
        alert("Your session time has been Expired");
        return 'error403';
    }
    alert(errorsService.getError(error));
    return ''
}
