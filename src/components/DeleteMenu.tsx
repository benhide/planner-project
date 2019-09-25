import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPlannerState } from '../utilities/Interfaces';

// TODO
export default function DeleteMenu(): JSX.Element {
    // Dispatch for thunks
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    //
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    //
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    //
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Delete the last kitchen
    const deleteKitchen = (e: any, id: number): void => {
        e.preventDefault();

        // if (currentState.kitchens.length > 0) {
        //     dispatch(DeleteKitchen(currentState.kitchens[currentState.kitchens.length - 1])).catch((error: string) =>
        //         alert('Kitchens failed to delete!\n' + error),
        //     );
        // }
    };

    // TODO
    const menuItems = () => {
        // return currentState.kitchens.map((kitchen) => (
        //     <MenuItem key={kitchen.name} onClick={(e) => deleteKitchen(e, kitchen.id)}>
        //         {kitchen.name}
        //     </MenuItem>
        // ));
    };

    return (
        <div>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <DeleteIcon />
            </Button>
            <Menu id="simple-delete-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {/* {menuItems} */}
            </Menu>
        </div>
    );
}

// // Called when redux store changes
// React.useEffect((): void => {
//     dispatch(LoadKitchens());
//     // .catch((error: string) => alert('Kitchens failed to load!\n' + error));
// }, []);

// // Get the current state from redux store and update the basket
// const currentState = useSelector((state) => state as IPlannerState);
