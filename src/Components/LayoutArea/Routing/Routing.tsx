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
import { GlobalPaths } from "../../../Services/GlobalPaths";

function Routing(): JSX.Element {
    
    return (
        <div className="Routing">
            <Switch>
                <Route path={GlobalPaths.homeUrl} component={Home} exact />
                <Route path={GlobalPaths.vacationListUrl} component={Vacations} exact />
                <Route path={GlobalPaths.adminWatcherUrl} component={AdminWatcher} exact />
                <Route path={GlobalPaths.addVacationUrl} component={AddVacation} exact />
                <Route path={GlobalPaths.editVacationUrl} component={EditVacation} exact />
                <Route path={GlobalPaths.loginUrl} component={LoginPage} exact />
                <Route path={GlobalPaths.registerUrl} component={RegisterPage} exact />
                <Route component={Page404} exact/>
            </Switch>
        </div>
    );
}

export default Routing;
