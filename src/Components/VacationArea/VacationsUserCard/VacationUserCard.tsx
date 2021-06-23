import React, { useState } from "react";
import { IconButton, Typography, CardMedia, CardContent, CardActionArea, Card } from "@material-ui/core";
import { Favorite, RadioButtonUnchecked } from '@material-ui/icons';
import VacationModel from "../../Models/VacationModel";
import axios from "axios";
import { Globals } from "../../../Services/Globals";
import "./VacationUserCard.css";
import store from "../../../Redux/Store";
import { createStyles } from "../../../Services/GlobalStylingMaker";
import { handlingCatchError } from "../../../Services/GlobalHelpers";
import { useHistory } from "react-router-dom";
import GlobalPaths from "../../../Services/GlobalPaths.env";

interface VacationUserCardProps {
    vacation: VacationModel;
}

function VacationUserCard(props: VacationUserCardProps): JSX.Element {

    //getting userId from authState.
    const userId = store.getState().authState.auth.user.userId;

    //global styling that importing from GlobalStylingMaker service
    const classes = createStyles();
    const history = useHistory();

    //Check if the user has been like that vacation.
    let res: Boolean = false;
    if (props.vacation.followers) {
        let result: string[] = props.vacation.followers.split(",");
        res = result.includes(userId.toString())
    }
    const [checkColor, setCheckColor] = useState<Boolean>(res);

    //Handling vacations follow (unFollow,newFollow);
    async function followController(vacationId: number) {
        try {
            //creating object that own userId,vacationId to send to the server.
            const follow = { userId, vacationId }

            if (!checkColor) {
                await axios.post(Globals.vacationUrl + "follow", follow);
            } else {
                await axios.delete(`${Globals.vacationUrl}unFollow/${follow.userId}/${follow.vacationId}`);
            }
            setCheckColor(!checkColor);

        } catch (error) {
            //if user token has been expired he will be logout and rotate to Login Page
            const catchError = handlingCatchError(error);
            if (catchError === 'error403') history.push(GlobalPaths.loginPage);
        }
    }

    return (
        <div className="VacationUserCard">
            <Card className={classes.root}>

                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={Globals.vacationUrl + "images/" + props.vacation.imageFileName}
                        title={props.vacation.destination}
                    />

                    <Favorite type="button"
                        className={checkColor ? classes.primary + " FavoriteIcon" : classes.secondary + " FavoriteIcon"}
                        onClick={async () => await followController(props.vacation.vacationId)}>
                    </Favorite>

                </CardActionArea>

                <CardContent className="CardContent">

                    <IconButton className="countIcon">
                        <RadioButtonUnchecked fontSize="large" ></RadioButtonUnchecked>
                        <Typography className="countFollowers" variant="subtitle1" component="h4">
                            {props.vacation.countFollows ? props.vacation.countFollows : 0}
                        </Typography>
                    </IconButton>

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

export default VacationUserCard;
