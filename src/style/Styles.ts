import { Button, createMuiTheme, Theme } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import { WREN_GREEN } from '../utilities/Defaults';

// App theme
export const theme = createMuiTheme({
    palette: {
        primary: {
            main: WREN_GREEN,
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#60C996',
            contrastText: '#FFFFFF',
        },
    },
});

// Coloured Button
export const ColorButton = withStyles((theme: Theme) => ({
    root: {
        'margin': theme.spacing(0.25),
        'backgroundColor': theme.palette.primary.main,
        'color': theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
}))(Button);

// Navbar styling
export const navBarStyle = makeStyles(() =>
    createStyles({
        title: {
            flexGrow: 1,
        },
        bar: {
            backgroundColor: WREN_GREEN,
        },
    }),
);

// Serach bar styling
export const searchBarStyle = makeStyles(() =>
    createStyles({
        search: {
            'position': 'relative',
            'borderRadius': theme.shape.borderRadius,
            'backgroundColor': fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            'marginLeft': 0,
            'width': '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                'width': 120,
                '&:focus': {
                    width: 200,
                },
            },
        },
    }),
);

// Styling
export const toolBoxStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1, 1),
            width: '15%',
            float: 'left' as 'left',
            marginTop: '20px',
        },
        button: {
            width: '48.5%',
        },
    }),
);

// Styling for the component
export const basketStyle = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginTop: '20px',
            fontSize: '15px',
            margin: theme.spacing(1),
            float: 'right' as 'right',
        },
        input: {
            display: 'none',
        },
        root: {
            padding: theme.spacing(1, 1),
            width: '20%',
            float: 'right' as 'right',
            marginTop: '20px',
            marginRight: '20px',
            zIndex: 1,
            position: 'relative',
        },
        cell: {
            fontSize: '12px',
            padding: theme.spacing(1, 1),
        },
    }),
);

// Component styling
export const menuStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            width: 400,
            display: 'flex',
            flexWrap: 'wrap',
        },
        information: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            width: 400,
        },
        textField: {
            marginLeft: theme.spacing(-2),
            marginRight: theme.spacing(-2),
            width: 415,
        },
        saveButton: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            width: 150,
            display: 'inline-block',
            float: 'left' as 'left',
        },
        cancelButton: {
            marginRight: theme.spacing(5),
            marginLeft: theme.spacing(5),
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            width: 150,
            display: 'inline-block',
            float: 'right' as 'right',
        },
        deleteButton: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            width: 150,
            display: 'inline-block',
            float: 'left' as 'left',
        },
    }),
);

// Styling
export const widgetDetailStyle = makeStyles(() =>
    createStyles({
        card: {
            width: '15.8%',
            float: 'left' as 'left',
            color: WREN_GREEN,
            marginTop: '340px',
            marginLeft: '-15.8%',
        },
        media: {
            // height: 140,
        },
    }),
);

// Styling
export const loadMenuStyle = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            margin: theme.spacing(2),
        },
    }),
);
