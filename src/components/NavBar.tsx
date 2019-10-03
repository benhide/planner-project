import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getKitchensList } from '../api/KitchenApi';
import { WREN_GREEN } from '../utilities/Defaults';
import { IMenuItem, IPlannerState } from '../utilities/Interfaces';
import { AddMenu } from './AddMenu';
import { DeleteMenu } from './DeleteMenu';
import { LoadMenu } from './LoadMenu';
import { SaveMenu } from './SaveMenu';

// Navbar styling
const useStyles = makeStyles(() =>
    createStyles({
        title: {
            flexGrow: 1,
        },
        bar: {
            backgroundColor: WREN_GREEN,
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
        // Getthe kitchen list from the server
        getKitchensList().then((result: IPlannerState[]) => setLoadItems(result.map((item) => ({ id: item.id, name: item.name }))));
        setIsLoading(false);
    }, [isLoading]);

    // Return the JSX
    return (
        <>
            <AppBar position="static" className={style.bar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={style.title}>
                        Wren Kitchen planner
                    </Typography>
                    <AddMenu setIsLoading={setIsLoading} dispatch={dispatch} />
                    <SaveMenu setIsLoading={setIsLoading} dispatch={dispatch} />
                    <LoadMenu loadItems={loadItems} setIsLoading={setIsLoading} dispatch={dispatch} />
                    <DeleteMenu setIsLoading={setIsLoading} dispatch={dispatch} />
                </Toolbar>
            </AppBar>
        </>
    );
};
