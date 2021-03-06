import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "../../UserArea/LoginPage/LoginPage";
import RegisterPage from "../../UserArea/RegisterPage/RegisterPage";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import AdminWatcher from "../../VacationArea/AdminWatcher/AdminWatcher";
import EditVacation from "../../VacationArea/EditVacation/EditVacation";
import Vacations from "../../VacationArea/VacationsList/VacationsList";
import VacationUserCard from "../../VacationArea/VacationsUserCard/VacationUserCard";
import Page404 from "../Page404/Page404";
import WelcomePage from "../WelcomePage/WelcomePage";

function Routing(): JSX.Element {
    
    return (
        <div className="Routing">
            <Switch>
                <Route path="/welcome" component={WelcomePage} exact />
                <Route path="/vacations" component={Vacations} exact />
                <Route path="/vacations/admin-watcher" component={AdminWatcher} exact />
                <Route path="/add-vacation" component={AddVacation} exact />
                <Route path="/edit-vacations/:vacationId" component={EditVacation} exact />
                <Route path="/card" component={VacationUserCard} exact />
                <Route path="/auth/login" component={LoginPage} exact />
                <Route path="/auth/register" component={RegisterPage} exact />
                <Redirect from="/" to="/welcome" exact />
                <Route component={Page404} exact/>
            </Switch>
        </div>
    );
}

export default Routing;
