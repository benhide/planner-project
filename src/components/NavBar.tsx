import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import DeleteMenu from './DeleteMenu';
import LoadMenu from './LoadMenu';
import SaveMenu from './SaveMenu';
import AddMenu from './AddMenu';
import { getKitchensList } from '../api/KitchenApi';
import { IKitchen, IMenuItem } from '../utilities/Interfaces';

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
    const style = useStyles();

    const [loadItems, setLoadItems] = React.useState<IMenuItem[]>(new Array<IMenuItem>());
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    // When component mounted
    React.useEffect(() => {
        getKitchensList().then((result: IKitchen[]) => setLoadItems(result.map((item) => ({ id: item.id, name: item.name }))));
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
                    <AddMenu setIsLoading={setIsLoading} />
                    <SaveMenu setIsLoading={setIsLoading} />
                    <LoadMenu loadItems={loadItems} setIsLoading={setIsLoading} />
                    <DeleteMenu setIsLoading={setIsLoading} />
                </Toolbar>
            </AppBar>
        </div>
    );
};

// // Dispatch for thunks
// const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

// // Save the current kitchen
// const saveKitchen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
//     e.preventDefault();
//     dispatch(
//         SaveKitchen({
//             id: Kitchen.getInstance().kitchenID,
//             widgets: Kitchen.getInstance().widgets,
//             name: 'Kitchen name' + Math.random() * 10,
//         }),
//     ).catch((error: string) => alert('Kitchen failed to save!\n' + error));
// };
// // Dispatch for thunks
// const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

// // Called when redux store changes
// React.useEffect((): void => {
//     // dispatch(LoadKitchens());
//     // .catch((error: string) => alert('Kitchens failed to load!\n' + error));
// }, []);

// // Get the current state from redux store and update the basket
// const currentState = useSelector((state) => state as IPlannerState);
// // // tslint:disable-next-line: no-console
// // currentState.kitchens.forEach((kitchen) => console.log(kitchen.id));

// // Save the current kitchen
// const saveKitchen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
//     e.preventDefault();
//     dispatch(
//         SaveKitchen({
//             id: Kitchen.getInstance().kitchenID,
//             widgets: Kitchen.getInstance().widgets,
//             name: 'Kitchen name' + Math.random() * 10,
//         }),
//     ).catch((error: string) => alert('Kitchen failed to save!\n' + error));
// };

// // Load all kitchens
// const loadKitchens = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
//     e.preventDefault();
//     dispatch(LoadKitchens()).catch((error: string) => alert('Kitchens failed to load!\n' + error));
// };

// // Load all kitchens
// const loadKitchen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
//     e.preventDefault();
//     dispatch(LoadKitchen(1)).catch((error: string) => alert('Kitchen 1 failed to load!\n' + error));
// };

// // Delete the last kitchen
// const deleteKitchen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
//     e.preventDefault();

//     if (currentState.kitchens.length > 0) {
//         dispatch(DeleteKitchen(currentState.kitchens[currentState.kitchens.length - 1])).catch((error: string) =>
//             alert('Kitchens failed to delete!\n' + error),
//         );
//     }
// };
