import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { SaveKitchen } from '../redux/actions/KitchenActions';
import { IPlannerState } from '../utilities/Interfaces';

// Navbar styling
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            backgroundColor: '#57B05E',
        },
        button: {
            backgroundColor: '#57B05E',
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        bar: {
            backgroundColor: '#57B05E',
        },
    }),
);

// The navbar react component
export const NavBar = () => {
    const style = useStyles();

    // React.useEffect(() => {
    //     LoadKitchen();
    //     // .catch((error: string) => {
    //     //     alert('Kitchens failed to load' + error);
    //     // });
    // }, []);

    // Get the current state from redux store and update the basket
    const currentKitchen = useSelector((state) => state as IPlannerState);

    // Save the current kitchen
    const saveKitchen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        SaveKitchen(currentKitchen);
    };

    // Return the JSX
    return (
        <div className={style.root}>
            <AppBar position="static" className={style.bar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={style.title}>
                        Wren Kitchen planner
                    </Typography>
                    <Button color="inherit" onClick={(e) => saveKitchen(e)}>
                        Save <SaveIcon className={style.rightIcon} />
                    </Button>
                    <Button color="inherit" onClick={() => alert('load data')}>
                        Download
                        <CloudDownloadIcon className={style.rightIcon} />
                    </Button>
                    <Button color="inherit" onClick={() => alert('delete data')}>
                        Delete
                        <DeleteIcon className={style.rightIcon} />
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

// import MenuIcon from '@material-ui/icons/Menu';
// import IconButton from '@material-ui/core/IconButton';
// import logo from '../images/logo.png';
