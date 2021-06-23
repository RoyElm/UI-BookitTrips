import React from "react";
import { createHeadStyle } from "../../../Services/GlobalStylingMaker";
import vacationJpg from '../../../assets/images/vacation.jpg';
import addVacationJpg from '../../../assets/images/addVacation.jpg';
import adminWatcher from '../../../assets/images/adminWatcher.jpg';
import welcomeJpg from '../../../assets/images/welcome.jpg';
import { NavLink } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";
import "./HeaderBuilder.css";
import GlobalPaths from "../../../Services/GlobalPaths.env";

//Create Links and names to be fit in the imagesArray
const ADMIN_LINKS = [
    { to: GlobalPaths.home, name: "Home" },
    { to: GlobalPaths.vacations, name: "Vacations" },
    { to: GlobalPaths.addVacation, name: "Add Vacation" },
    { to: GlobalPaths.adminWatcher, name: "Admin Watcher" }
];

const USER_LINKS = [
    { to: GlobalPaths.home, name: "Home" },
    { to: GlobalPaths.vacations, name: "Vacations" }
];

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

    return (
        <div className="HeaderBuilder">
            {props.isAdmin ?
                AdminImages.map((image, index) => (
                    <NavLink to={ADMIN_LINKS[index].to} key={index}>
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
                                {ADMIN_LINKS[index].name}
                            </span>
                        </ButtonBase>
                    </NavLink>
                )) :
                UserImages.map((image, index) => (
                    <NavLink to={USER_LINKS[index].to} key={index}>
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
                                {USER_LINKS[index].name}
                            </span>
                        </ButtonBase>
                    </NavLink>
                ))
            }
        </div>
    );
}

export default HeaderBuilder;
