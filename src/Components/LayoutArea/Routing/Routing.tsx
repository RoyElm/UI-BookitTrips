import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../../UserArea/LoginPage/LoginPage";
import RegisterPage from "../../UserArea/RegisterPage/RegisterPage";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import AdminWatcher from "../../VacationArea/AdminWatcher/AdminWatcher";
import EditVacation from "../../VacationArea/EditVacation/EditVacation";
import Vacations from "../../VacationArea/VacationsList/VacationsList";
import Page404 from "../Page404/Page404";
import Home from "../Home/Home";
import GlobalPaths from '../../../Services/GlobalPaths.env';

function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Switch>
                <Route path={GlobalPaths.home} component={Home} exact />
                <Route path={GlobalPaths.vacations} component={Vacations} exact />
                <Route path={GlobalPaths.adminWatcher} component={AdminWatcher} exact />
                <Route path={GlobalPaths.addVacation} component={AddVacation} exact />
                <Route path={`${GlobalPaths.editVacation}/:vacationId`} component={EditVacation} exact />
                <Route path={GlobalPaths.loginPage} component={LoginPage} exact />
                <Route path={GlobalPaths.registerPage} component={RegisterPage} exact />
                <Route component={Page404} exact />
            </Switch>
        </div>
    );
}

export default Routing;
