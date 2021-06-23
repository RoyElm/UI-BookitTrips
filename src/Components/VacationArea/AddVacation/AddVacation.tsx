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
import { changeDateFormat, handlingCatchError } from '../../../Services/GlobalHelpers'
import { createTheme, creatingClasses } from '../../../Services/GlobalStylingMaker';
import GlobalPaths from "../../../Services/GlobalPaths.env";


function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>();
    const history = useHistory();
    const { auth } = store.getState().authState;

    //Handling "toDate" input to control the date;
    const [fromDateValidation, setFromDateValidation] = useState(changeDateFormat(new Date().toString()));

    //importing styles from Global function; 
    const theme = createTheme();
    const classes = creatingClasses();

    //Handling unauthorized behavior of user
    useEffect(() => {
        if (!auth.isLoggedIn || !auth.user.isAdmin) {
            return history.push(GlobalPaths.home);
        }
    }, [auth,history])

    async function handleEditVacationSubmit(editedVacation: VacationModel) {
        try {
            const formData = creatingFormData(editedVacation);
            await axios.post<VacationModel>(Globals.vacationUrl, formData);
            history.push(GlobalPaths.vacations)

        } catch (error) {
            //if user token has been expired he will be logout and rotate to Login Page
            const catchError = handlingCatchError(error);
            if (catchError === 'error403') history.push(GlobalPaths.loginPage);
        }
    }

    function creatingFormData(vacation: VacationModel) {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("fromDate", vacation.fromDate.toString());
        formData.append("toDate", vacation.toDate.toString());
        formData.append("price", vacation.price.toString());
        formData.append("newImage", vacation.newImage.item(0));
        return formData;
    }


    return (
        <ThemeProvider theme={theme}>
            <div className="AddVacation">
                <Typography variant="h3">
                    <Add />
                    Add Vacation
                </Typography>
                <form method="POST" onSubmit={handleSubmit(handleEditVacationSubmit)} encType="multipart/form-data">

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
