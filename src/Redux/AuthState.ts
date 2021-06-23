import LoginModel from "../Components/Models/LoginModel";
import RegisterModel from "../Components/Models/RegisterModel";
import UserModel from "../Components/Models/UserModel";
import { authorizationHeader } from "../Services/GlobalHelpers";

// Auth State: 
export class AuthState {
    public auth: UserModel = { isLoggedIn: false, user: null };
    constructor() {
        const auth: UserModel = JSON.parse(sessionStorage.getItem("auth"));
        if (auth && auth.isLoggedIn) {
            //after refreshing authorizing user Token.
            authorizationHeader(auth.user);
            this.auth = auth;
        }
    }
}

// Auth Action Types: 
export enum AuthActionType {
    AuthLoggedIn = "AuthLoggedIn",
    AuthRegistered = "AuthRegistered",
    AuthLoggedOut = "AuthLoggedOut"
}

// Auth Action: 
export interface AuthAction {
    type: AuthActionType;
    payload?: any; 
}

//Auth Action Creators 
export function authLoggedInAction(user: LoginModel): AuthAction {
    return { type: AuthActionType.AuthLoggedIn, payload: user };
}

export function authRegisteredAction(user: RegisterModel): AuthAction {
    return { type: AuthActionType.AuthRegistered, payload: user };
}

export function authLoggedOutAction(): AuthAction {
    return { type: AuthActionType.AuthLoggedOut };
}


// User Reducer: 
export function authReducer(
    currentState: AuthState = new AuthState(),
    action: AuthAction): AuthState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case AuthActionType.AuthLoggedIn:
            newState.auth = { isLoggedIn: true, user: action.payload };
            break;

        case AuthActionType.AuthRegistered:
            newState.auth = { isLoggedIn: false, user: action.payload };
            break;

        case AuthActionType.AuthLoggedOut:
            newState.auth = { isLoggedIn: false, user: null };
            break;
    }

    sessionStorage.setItem("auth", JSON.stringify(newState.auth));

    return newState; // Return the newState.
}
