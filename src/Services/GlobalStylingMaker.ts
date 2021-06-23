import { createMuiTheme } from "@material-ui/core";
import { Theme, makeStyles } from '@material-ui/core/styles';
import creatingStyle from '@material-ui/core/styles/createStyles';
import { lightBlue, purple } from "@material-ui/core/colors";

//Global function styles maker, each component in program can use this functions to create style classes;

export function createStyles() {
    const usingStyle = makeStyles({
        root: {
            maxWidth: 320,
            height: 400
        },
        media: {
            height: 100,
            width: 320
        },
        primary: {
            color: "#ff8a80"
        },
        secondary: {
            color: "#999999"
        }
    });

    return usingStyle();
}

export function creatingClasses() {
    const createClasses = makeStyles({
        textBox: { margin: "5px 0", width: 400 }
    });

    return createClasses();
}

export function createTheme() {
    return createMuiTheme({
        typography: {
            fontFamily: "fantasy",
            fontSize: 15,
            h3: {
                fontSize: 30
            }
        },
        palette: {
            primary: {
                main: lightBlue[600]
            },
            secondary: {
                main: purple[600]
            }
        }
    });
};

export function createHeadStyle() {
    const usingStyles = makeStyles((theme: Theme) =>
        creatingStyle({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                minWidth: 300,
                width: '100%',
            },
            image: {
                position: 'relative',
                height: 200,
                [theme.breakpoints.down('xs')]: {
                    width: '100% !important', // Overrides inline-style
                    height: 100,
                },
                '&:hover, &$focusVisible': {
                    zIndex: 1,
                    '& $imageBackdrop': {
                        opacity: 0.15,
                    },
                    '& $imageMarked': {
                        opacity: 0,
                    },
                    '& $imageTitle': {
                        border: '4px solid currentColor',
                    },
                },
            },
            focusVisible: {},
            imageButton: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.common.white,
            },
            imageSrc: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
            },
            imageBackdrop: {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: theme.palette.common.black,
                opacity: 0.4,
                transition: theme.transitions.create('opacity'),
            },
            imageTitle: {
                position: 'relative',
                padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
            },
            imageMarked: {
                height: 3,
                width: 18,
                backgroundColor: theme.palette.common.white,
                position: 'absolute',
                bottom: -2,
                left: 'calc(50% - 9px)',
                transition: theme.transitions.create('opacity'),
            },
        }),
    );
    return usingStyles();
}