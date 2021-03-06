import React from "react";
import { Typography, CardMedia, CardContent, CardActionArea, Card } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import VacationModel from "../../Models/VacationModel";
import { Globals } from "../../../Services/Globals";
import "./VacationAdminCard.css";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { createStyles } from "../../../Services/GlobalStylingMaker";
import { logoutUser } from "../../../Services/GlobalHelpers";
import { errorsService } from "../../../Services/GlobalErrorsService";

interface VacationAdminCardProps {
    vacation: VacationModel;
}

function VacationAdminCard(props: VacationAdminCardProps): JSX.Element {

    const history = useHistory();
    //Global styling function that importing from GlobalStylingMaker service.
    const classes = createStyles();

    //handling delete vacation (Admin only)
    const deleteVacation = async () => {
        try {
            const answer = window.confirm("Are you sure?");
            if (!answer) return;
            await axios.delete<VacationModel>(Globals.vacationUrl + props.vacation.vacationId);
        } catch (error) {

            //if user token has been expired he will be logout and rotate to Login Page
            if (error.response?.status === 403) {
                logoutUser();
                alert(errorsService.getError(error));
                history.push("/auth/login");
            } else {
                alert(errorsService.getError(error))
            }
        }
    }

    return (
        <div className="VacationAdminCard">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={Globals.vacationUrl + "images/" + props.vacation.imageFileName}
                        title={props.vacation.destination}
                    />
                    <DeleteForeverIcon type="button"
                        className={"deleteCard"}
                        onClick={deleteVacation}>
                    </DeleteForeverIcon>
                    <NavLink to={`/edit-vacations/${props.vacation.vacationId}`}>
                        <EditIcon type="button"
                            className={"editCard"}>
                        </EditIcon>
                    </NavLink>
                </CardActionArea>
                <CardContent className="CardContent">
                    <Typography gutterBottom variant="h6" component="h6">
                        {props.vacation.destination}
                    </Typography>
                    <Typography className="descriptionContainer" variant="body2" color="textPrimary" component="p">
                        {props.vacation.description}
                    </Typography>
                    <br />
                        From Date: {new Date(props.vacation.fromDate).toDateString()}
                    <br />
                        To Date: {new Date(props.vacation.toDate).toDateString()}
                    <Typography variant="subtitle1" component="h4">
                        Price: {props.vacation.price}$
                    </Typography>

                </CardContent>
            </Card >
        </div>
    );
}

export default VacationAdminCard;
