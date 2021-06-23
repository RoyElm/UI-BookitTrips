import axios from "axios";
import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import store from "../../../Redux/Store";
import { vacationDownloadedAction } from "../../../Redux/VacationsState";
import { Globals } from "../../../Services/Globals";
import UserModel from "../../Models/UserModel";
import VacationModel from "../../Models/VacationModel";
import { History } from 'history';
import VacationAdminCard from "../VacationAdminCard/VacationAdminCard";
import VacationUserCard from "../VacationsUserCard/VacationUserCard";
import { Unsubscribe } from "redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { handlingCatchError } from "../../../Services/GlobalHelpers";
import GlobalPaths from "../../../Services/GlobalPaths.env";

interface VacationsListState {
    vacations: VacationModel[];
    auth: UserModel;
}

interface VacationsListProps extends RouteComponentProps {
    history: History;
}

class VacationsList extends Component<VacationsListProps, VacationsListState> {

    private unsubscribeFromStore: Unsubscribe;

    public constructor(props: VacationsListProps) {
        super(props);
        this.state = {
            vacations: store.getState().vacationState.vacations,
            auth: store.getState().authState.auth
        }
    }

    public async componentDidMount() {
        try {
            //Handling unauthorized access from guest.
            if (!this.state.auth.isLoggedIn) {
                alert("You are not authorized to access this page you have to Login");
                return this.props.history.push("/auth/login");
            }

            const userId = this.state.auth.user.userId;

            //Listen to store to handle changes of Vacations; 
            this.unsubscribeFromStore = store.subscribe(() => {
                const vacations = store.getState().vacationState.vacations;
                //Sorting the vacations by user that is login liked
                vacations.sort(v => v.followers && v.followers.includes(userId.toString()) ? -1 : 1);
                this.setState({ vacations });
            });

            //getting data from server
            if (this.state.vacations.length === 0) {
                const response = await axios.get<VacationModel[]>(Globals.vacationUrl);
                const vacations = response.data;
                //Sorting the vacations by user that is login liked
                vacations.sort(v => v.followers && v.followers.includes(userId.toString()) ? -1 : 1);
                store.dispatch(vacationDownloadedAction(vacations));
            }
        } catch (error) {

            //if user token has been expired he will be logout and rotate to Login Page
            const catchError = handlingCatchError(error);
            if (catchError === 'error403') this.props.history.push(GlobalPaths.loginPage);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="VacationsList">
                {!this.state.vacations.length && <CircularProgress />}
                {this.state.auth.user && this.state.auth.user.isAdmin ?
                    this.state.vacations.map(vacation => <VacationAdminCard key={vacation.vacationId} vacation={vacation} />)
                    : this.state.vacations.map(vacation => <VacationUserCard key={vacation.vacationId} vacation={vacation} />)}
            </div>
        );
    }

    //destroy the component after leaving and stop the listen to store;
    public componentWillUnmount(): void {
        if (this.unsubscribeFromStore) {
            this.unsubscribeFromStore();
        }
    }
}

export default VacationsList;
