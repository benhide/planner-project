import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Kitchen } from '../engine/Kitchen';
import { SaveKitchen, DeleteKitchen } from '../redux/actions/KitchenActions';
import { IMenuProps, IPlannerState, IReduxPlannerState } from '../utilities/Interfaces';
import { SaveDialog } from './SaveDialog';
import { DEFAULT_KITCHEN } from '../utilities/Defaults';
import { GenerateId } from '../engine/widgets/WidgetsID';
import { useSelector } from 'react-redux';

// Menu for creating a new kitchen
export const AddMenu = (props: IMenuProps): JSX.Element => {
    // Props
    const { setIsLoading, dispatch } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    // Redux store
    const currentKitchen = useSelector((state) => (state as IReduxPlannerState).kitchen);

    // Handle clicks on menu item
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
                        widgets: Kitchen.getInstance().widgets,
                        name: currentKitchen.name,
                    },
                    true,
                ),
            )
                .then(() => toast.success('Kitchen ' + currentKitchen.name + ' has been saved'))
                .catch(() => toast.error('Kitchen ' + currentKitchen.name + ' failed to save!'));
        }
    };

    // When closing the save menu
    const handleClose = () => {
        setIsLoading(true);
        setOpen(false);
        GenerateId.resetAllIds();
        dispatch(DeleteKitchen(DEFAULT_KITCHEN));
    };

    // Rendert the JSX
    return (
        <div>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AddIcon />
            </Button>
            <SaveDialog open={open} onClose={handleClose} dispatch={dispatch} isNew={true} />
        </div>
    );
}
