import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Kitchen } from '../engine/Kitchen';
import { SaveKitchen } from '../redux/actions/KitchenActions';
import { SaveKitchenDialog } from './SaveDialog';

// Menu for creating a new kitchen
export default function NewKitchenMenu(props: any): JSX.Element {
    // Props
    const { setIsLoading, dispatch } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    // Handle clicks on menu item
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
                    true,
                ),
            )
                .then(() => toast.success('Kitchen ' + Kitchen.getInstance().kitchenName + ' has been saved'))
                .catch((error: string) => toast.error('Kitchen ' + Kitchen.getInstance().kitchenName + ' failed to save!'));
        }
    };

    // When closing the save menu
    const handleClose = () => {
        setIsLoading(true);
        setOpen(false);
    };

    // Rendert the JSX
    return (
        <div>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AddIcon />
            </Button>
            <SaveKitchenDialog open={open} onClose={handleClose} dispatch={dispatch} isNew={true}/>
        </div>
    );
}
