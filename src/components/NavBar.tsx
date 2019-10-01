import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { getKitchensList } from '../api/KitchenApi';
import { IMenuItem, IPlannerState } from '../utilities/Interfaces';
import NewKitchenMenu from './AddMenu';
import DeleteMenu from './DeleteMenu';
import LoadMenu from './LoadMenu';
import SaveMenu from './SaveMenu';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

// Navbar styling
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
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
    // Style
    const style = useStyles();

    // Local state
    const [loadItems, setLoadItems] = React.useState<IMenuItem[]>(new Array<IMenuItem>());
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    // Dispatch for thunks
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    // When component mounted
    React.useEffect(() => {
        getKitchensList().then((result: IPlannerState[]) => setLoadItems(result.map((item) => ({ id: item.id, name: item.name }))));
        setIsLoading(false);
    }, [isLoading]);

    // Return the JSX
    return (
        <div className={style.root}>
            <AppBar position="static" className={style.bar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={style.title}>
                        Wren Kitchen planner
                    </Typography>
                    <NewKitchenMenu setIsLoading={setIsLoading} dispatch={dispatch} />
                    <SaveMenu setIsLoading={setIsLoading} dispatch={dispatch} />
                    <LoadMenu loadItems={loadItems} setIsLoading={setIsLoading} dispatch={dispatch} />
                    <DeleteMenu setIsLoading={setIsLoading} dispatch={dispatch} />
                </Toolbar>
            </AppBar>
        </div>
    );
};
