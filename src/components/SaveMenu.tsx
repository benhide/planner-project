import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import * as React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Kitchen } from '../engine/Kitchen';
import { SaveKitchen } from '../redux/actions/KitchenActions';
import { SaveKitchenDialog } from './SaveDialog';

// The save menu for kitchens
export default function SaveMenu(props: any) {
    // Props
    const { setIsLoading, dispatch } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    // Handle the click on save button
    const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!Kitchen.getInstance().kitchenID) {
            setOpen(true);
        } else {
            e.preventDefault();
            dispatch(
                SaveKitchen(
                    {
                        id: Kitchen.getInstance().kitchenID,
                        widgets: Kitchen.getInstance().widgets,
                        name: Kitchen.getInstance().kitchenName,
                    },
                    false,
                ),
            )
                .then(() => toast.success('Kitchen ' + Kitchen.getInstance().kitchenName + ' has been saved'))
                .catch((error: string) => {
                    toast.error('Kitchen ' + Kitchen.getInstance().kitchenName + ' failed to save!');
                });
        }
    };

    // When closing the save menu
    const handleClose = () => {
        setIsLoading(true);
        setOpen(false);
    };

    // Render the JSX
    return (
        <div>
            <Button color="inherit" onClick={(e) => handleClickOpen(e)}>
                <SaveIcon />
            </Button>
            <SaveKitchenDialog open={open} onClose={handleClose} dispatch={dispatch} isNew={false}/>
        </div>
    );
}
