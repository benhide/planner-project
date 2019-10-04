import { AppBar, ClickAwayListener, Slide, Toolbar, Typography } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getKitchensList } from '../api/KitchenApi';
import { ColorButton, navBarStyle } from '../style/Styles';
import { IMenuItem, IPlannerState } from '../utilities/Interfaces';
import { AddMenu } from './AddMenu';
import { Basket } from './Basket';
import { DeleteMenu } from './DeleteMenu';
import { LoadMenu } from './LoadMenu';
import { SaveMenu } from './SaveMenu';
import { SearchBar } from './SearchBar';

// The navbar react component
export const NavBar = (): JSX.Element => {
    // Style
    const style = navBarStyle();

    // Local state
    const [loadItems, setLoadItems] = React.useState<IMenuItem[]>(new Array<IMenuItem>());
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [checked, setChecked] = React.useState(false);

    // Dispatch for thunks
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    // When component mounted
    React.useEffect(() => {
        // Get the kitchen list from the server
        getKitchensList().then((result: IPlannerState[]) => {
            setLoadItems(result.map((item) => ({ id: item.id, name: item.name })));
            setIsLoading(false);
        });
    }, [isLoading]);

    // Disaply the basket
    const openBasket = () => {
        setChecked((prev) => !prev);
    };

    // When clicked away from basket
    const handleClickAway = () => {
        setChecked(false);
    };

    // Return the JSX
    return (
        <>
            <AppBar position="static" className={style.bar}>
                <Toolbar>
                    <img src={'/images/logo.png'} width="10%" />
                    <Typography variant="h6" color="inherit" className={style.title}>
                        Kitchen Planner
                    </Typography>
                    <SearchBar />
                    <AddMenu setIsLoading={setIsLoading} dispatch={dispatch} />
                    <SaveMenu setIsLoading={setIsLoading} dispatch={dispatch} />
                    <LoadMenu loadItems={loadItems} setIsLoading={setIsLoading} dispatch={dispatch} />
                    <DeleteMenu loadItems={loadItems} setIsLoading={setIsLoading} dispatch={dispatch} />
                    <ColorButton color="inherit" onClick={() => openBasket()}>
                        <ShoppingBasketIcon />
                    </ColorButton>
                </Toolbar>
            </AppBar>
            <Slide direction="left" in={checked} mountOnEnter unmountOnExit timeout={300}>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div>
                        <Basket />
                    </div>
                </ClickAwayListener>
            </Slide>
        </>
    );
};
