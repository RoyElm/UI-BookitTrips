import React from "react";
import "./WelcomePage.css";
import { Email, GitHub, LinkedIn } from "@material-ui/icons";

function WelcomePage(): JSX.Element {
    return (
        <div className="WelcomePage">
            <div className="hero-text">
                <h1>I'm Roy Elmakies </h1>
                <h1>And Welcome to my Bookit Trip!!</h1>
            </div>
            <a href="https://www.linkedin.com/in/royelmakies/"><LinkedIn/></a>
            <a href="https://github.com/RoyElm"><GitHub /></a>
            <a href="mailto:roye456@gmail.com"><Email /></a>
        </div>
    );
};

export default WelcomePage;
