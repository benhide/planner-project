import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { BaseWidget } from '../engine/widgets/BaseWidget';
import { DeleteKitchen, LoadKitchens, SaveKitchen } from '../redux/actions/KitchenActions';
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
export const NavBar = (): JSX.Element => {
    const style = useStyles();

    //
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    //
    React.useEffect((): void => {
        dispatch(LoadKitchens());
        // .catch((error: string) => alert('Kitchens failed to load!\n' + error));
    }, []);

    // Get the current state from redux store and update the basket
    const currentState = useSelector((state) => state as IPlannerState);
    // tslint:disable-next-line: no-console
    currentState.kitchens.forEach((kitchen) => console.log(kitchen.id));

    // Save the current kitchen
    const saveKitchen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        dispatch(SaveKitchen({ id: 0, widgets: new Array<BaseWidget>() }));
        // .catch((error: string) => alert('Kitchen failed to save!\n' + error));
    };

    // Load kitchens
    const loadKitchens = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        dispatch(LoadKitchens());
        // .catch((error: string) => alert('Kitchens failed to load' + error));
    };

    const deleteKitchen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        dispatch(DeleteKitchen(currentState.kitchens[0]));
        // .catch((error: string) => alert('Kitchens failed to load' + error));
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
                    <Button color="inherit" onClick={(e) => loadKitchens(e)}>
                        Download
                        <CloudDownloadIcon className={style.rightIcon} />
                    </Button>
                    <Button color="inherit" onClick={(e) => deleteKitchen(e)}>
                        Delete
                        <DeleteIcon className={style.rightIcon} />
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};
