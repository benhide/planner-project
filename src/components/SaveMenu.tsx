import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Widgets } from '../engine/Widgets';
import { SaveKitchen } from '../redux/actions/KitchenActions';
import { IMenuProps, IReduxPlannerState } from '../utilities/Interfaces';
import { SaveDialog } from './SaveDialog';

// The save menu for kitchens
export const SaveMenu = (props: IMenuProps): JSX.Element => {
    // Props
    const { setIsLoading, dispatch } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    // Redux store
    const currentKitchen = useSelector((state) => (state as IReduxPlannerState).kitchen);

    // Handle the click on save button
    const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>): void => {
        // If not already saved it will not have id
        if (!currentKitchen.id) {
            // Open save dialog
            setOpen(true);
        } else {
            // Dispatch action to redux store
            dispatch(
                SaveKitchen(
                    {
                        id: currentKitchen.id,
                        widgets: currentKitchen.widgets,
                        name: currentKitchen.name,
                    },
                    false,
                ),
            )
                .then(() => toast.success('Kitchen ' + currentKitchen.name + ' has been saved'))
                .catch(() => toast.error('Kitchen ' + currentKitchen.name + ' failed to save!'));
        }
    };

    // When closing the save menu
    const handleClose = (): void => {
        setIsLoading(true);
        setOpen(false);
    };

    // Render the JSX
    return (
        <>
            <Button color="inherit" onClick={(e) => handleClickOpen(e)}>
                <SaveIcon />
            </Button>
            <SaveDialog open={open} onClose={handleClose} dispatch={dispatch} isNew={false} />
        </>
    );
}
