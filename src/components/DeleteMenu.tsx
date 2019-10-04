import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import { ColorButton } from '../style/Styles';
import { ILoadDeleteMenuProps } from '../utilities/Interfaces';
import { DeleteKitchenDialog } from './DeleteDialog';

// Delete menu component
export const DeleteMenu = (props: ILoadDeleteMenuProps): JSX.Element => {
    // Props
    const { setIsLoading, dispatch } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    // Handle clicks on menu items
    const handleClickDelete = (): void => {
        setOpen(true);
        setIsLoading(true);
    };

    // When closing the save menu
    const handleClose = (): void => {
        setOpen(false);
        setIsLoading(true);
    };

    // Rendert the JSX
    return (
        <>
            <ColorButton color="inherit" onClick={() => handleClickDelete()}>
                <DeleteIcon />
            </ColorButton>
            <DeleteKitchenDialog open={open} onClose={handleClose} dispatch={dispatch} />
        </>
    );
};
