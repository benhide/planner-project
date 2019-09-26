import { MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { deleteKitchen, getKitchensList } from '../api/KitchenApi';
import { IKitchen, IMenuItem, IPlannerState } from '../utilities/Interfaces';
import { toast } from 'react-toastify';

// TODO
export default function DeleteMenu(): JSX.Element {
    // Dispatch for thunks
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    // Local state
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [deleteItems, setDeleteItems] = React.useState<IMenuItem[]>(new Array<IMenuItem>());
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    // When component mounted
    React.useEffect(() => {
        getKitchensList().then((result: IKitchen[]) => setDeleteItems(result.map((item) => ({ id: item.id, name: item.name }))));
        setIsLoading(false);
    }, [isLoading]);

    // Handle clicks on menu items
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle the menu closing
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Delete selected kitchen
    const removeKitchen = (e: any, id: number): void => {
        deleteKitchen(id)
            .then(() => toast.success('Kitchen has been deleted'))
            .catch((error: string) => {
                toast.error('Kitchen failed to delete!');
                console.log(error);
            });
        setAnchorEl(null);
        setIsLoading(true);
    };

    // Rendert the JSX
    return (
        <div>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <DeleteIcon />
            </Button>
            <Menu id="simple-delete-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {deleteItems.map((kitchen) => (<MenuItem key={kitchen.name} onClick={(e) => removeKitchen(e, kitchen.id)}>{kitchen.name}</MenuItem>))}
            </Menu>
        </div>
    );
}
