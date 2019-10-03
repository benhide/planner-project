import { Button, createMuiTheme, Theme } from '@material-ui/core';
import { withStyles, makeStyles, createStyles } from '@material-ui/styles';
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

// Button
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