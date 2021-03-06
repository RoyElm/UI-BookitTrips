import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, TextField, ThemeProvider, Typography } from "@material-ui/core";
import { Clear, Send, Add } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./AddVacation.css";
import VacationModel from "../../Models/VacationModel";
import store from "../../../Redux/Store";
import axios from "axios";
import { Globals } from "../../../Services/Globals";
import { changeDateFormat, logoutUser } from '../../../Services/GlobalHelpers'
import { createTheme, creatingClasses } from '../../../Services/GlobalStylingMaker';
import { errorsService } from "../../../Services/GlobalErrorsService";


function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>();
    const history = useHistory();

    //Handling "toDate" input to control the date;
    const [fromDateValidation, setFromDateValidation] = useState(changeDateFormat(new Date().toString()));

    //importing styles from Global function; 
    const theme = createTheme();
    const classes = creatingClasses();

    //Handling unauthorized behavior of user
    useEffect(() => {
        if (!store.getState().authState.auth.isLoggedIn || !store.getState().authState.auth.user.isAdmin) {
            return history.push("/page404");
        }
    })

    async function submit(editedVacation: VacationModel) {
        try {
            const myFormData = new FormData();
            myFormData.append("destination", editedVacation.destination);
            myFormData.append("description", editedVacation.description);
            myFormData.append("fromDate", editedVacation.fromDate.toString());
            myFormData.append("toDate", editedVacation.toDate.toString());
            myFormData.append("price", editedVacation.price.toString());
            myFormData.append("newImage", editedVacation.newImage.item(0));
            await axios.post<VacationModel>(Globals.vacationUrl, myFormData);
            history.push("/vacations")

        } catch (error) {
            //if user token has been expired he will be logout and rotate to Login Page
            if (error.response?.status === 403) {
                logoutUser();
                alert(errorsService.getError(error));
                history.push("/auth/login");
            }else {
                alert(errorsService.getError(error));
            }
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <div className="AddVacation">

                <Typography variant="h3">
                    <Add />
                        Add Vacation
                    </Typography>
                <form method="POST" onSubmit={handleSubmit(submit)} encType="multipart/form-data">

                    <TextField
                        name="destination" inputRef={register}
                        label="Destination" variant="outlined" className={classes.textBox}
                        inputProps={{ minLength: 5, maxLength: 30 }}
                        required />
                    <br />

                    <TextField
                        name="description" inputRef={register}
                        inputProps={{ type: "textarea", minLength: 5, maxLength: 1000 }}
                        label="Description" type="textarea" variant="outlined" className={classes.textBox}
                        multiline required
                    />
                    <br />

                    <TextField name="fromDate"
                        inputRef={register}
                        label="From Date" InputLabelProps={{ shrink: true }}
                        type="date" variant="outlined" className={classes.textBox}
                        inputProps={{ min: changeDateFormat(new Date().toString()), max: "2030-01-01" }}
                        //Setting min to "toDate" input that will not able to Admin to use old date then the one has been chosen
                        onChange={e => setFromDateValidation(e.target.value)} required />
                    <br />

                    <TextField name="toDate"
                        InputLabelProps={{ shrink: true }} label="To Date"
                        inputRef={register}
                        type="date" variant="outlined" className={classes.textBox}
                        inputProps={{ min: changeDateFormat(new Date(fromDateValidation).toString()), max: "2030-01-01" }}
                        required />
                    <br />


                    <TextField name="price"
                        inputProps={{ step: "0.01", min: 500, max: 20000 }}
                        inputRef={register} label="Price"
                        type="number" variant="outlined" className={classes.textBox} required />
                    <br />

                    <TextField name="newImage" inputRef={register}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ accept: "image/*" }}
                        label="Image" type="file" variant="outlined"
                        className={classes.textBox} required
                    />
                    <br />

                    <ButtonGroup fullWidth variant="contained" >
                        <Button color="primary" fullWidth type="submit" startIcon={<Send />}>Send</Button>
                        <Button color="secondary" fullWidth type="reset" startIcon={<Clear />}>Clear</Button>
                    </ButtonGroup>
                </form>
            </div>
        </ThemeProvider >
    );
}

export default AddVacation;
