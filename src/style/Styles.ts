import { Button, createMuiTheme, Theme } from '@material-ui/core';
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
            main: '#00E676',
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
