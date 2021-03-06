import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import { IMenuProps } from '../utilities/Interfaces';
import { DeleteKitchenDialog } from './DeleteDialog';

// Delete the current kitchen from the server
export default function DeleteMenu(props: IMenuProps): JSX.Element {
    // Props
    const { setIsLoading, dispatch } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    // Handle clicks on menu items
    const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        setOpen(true);
    };

    // When closing the save menu
    const handleClose = () => {
        setIsLoading(true);
        setOpen(false);
    };

    // Rendert the JSX
    return (
        <div>
            <Button color="inherit" onClick={(e) => handleClickDelete(e)}>
                <DeleteIcon />
            </Button>
            <DeleteKitchenDialog open={open} onClose={handleClose} dispatch={dispatch} />
        </div>
    );
}
