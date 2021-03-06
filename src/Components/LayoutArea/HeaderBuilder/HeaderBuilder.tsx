import React from "react";
import { createHeadStyle } from "../../../Services/GlobalStylingMaker";
import vacationJpg from '../../../assets/images/vacation.jpg';
import addVacationJpg from '../../../assets/images/addVacation.jpg';
import adminWatcher from '../../../assets/images/adminWatcher.jpg';
import welcomeJpg from '../../../assets/images/welcome.jpg';
import { NavLink } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";
import "./HeaderBuilder.css";

interface HeaderBuilderProps {
    isAdmin: number;
}

//Used material ui documentation;
function HeaderBuilder(props: HeaderBuilderProps): JSX.Element {
    
    //importing styles from Global styles function;
    const usingStyles = createHeadStyle();

    //creating array of images that will be the backgroundImage at NavBar;
    const AdminImages = [{ url: welcomeJpg }, { url: vacationJpg }, { url: addVacationJpg }, { url: adminWatcher }];
    const UserImages = [{ url: welcomeJpg }, { url: vacationJpg }];

    //Create Links and names to be fit in the imagesArray
    const AdminLinks = [
        { to: "/welcome", name: "Home" },
        { to: "/vacations", name: "Vacations" },
        { to: "/add-vacation", name: "Add Vacation" },
        { to: "/vacations/admin-watcher", name: "Admin Watcher" }
    ];

    const UserLinks = [
        { to: "/welcome", name: "Home" },
        { to: "/vacations", name: "Vacations" }
    ];

    return (
        <div className="HeaderBuilder">
            {props.isAdmin ?
                AdminImages.map((image, index) => (
                    <NavLink to={AdminLinks[index].to} key={index}>
                        <ButtonBase
                            focusRipple
                            key={index}
                            className={`${usingStyles.image} headerButton`}
                            focusVisibleClassName={usingStyles.focusVisible}
                        >
                            <span
                                className={usingStyles.imageSrc}
                                style={{
                                    backgroundImage: `url(${image.url})`,
                                }}
                            />
                            <span className={usingStyles.imageBackdrop} />
                            <span className={usingStyles.imageButton}>
                                {AdminLinks[index].name}
                            </span>
                        </ButtonBase>
                    </NavLink>
                )) :
                UserImages.map((image, index) => (
                    <NavLink to={UserLinks[index].to} key={index}>
                        <ButtonBase
                            focusRipple
                            key={index}
                            className={`${usingStyles.image} headerButton`}
                            focusVisibleClassName={usingStyles.focusVisible}
                        >
                            <span
                                className={usingStyles.imageSrc}
                                style={{
                                    backgroundImage: `url(${image.url})`,
                                }}
                            />
                            <span className={usingStyles.imageBackdrop} />
                            <span className={usingStyles.imageButton}>
                                {UserLinks[index].name}
                            </span>
                        </ButtonBase>
                    </NavLink>
                ))
            }
        </div>
    );
}

export default HeaderBuilder;
