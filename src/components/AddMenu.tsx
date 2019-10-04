import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GenerateIDs } from '../engine/widgets/WidgetsID';
import { DeleteKitchen, SaveKitchen } from '../redux/actions/KitchenActions';
import { ColorButton } from '../style/Styles';
import { DEFAULT_KITCHEN } from '../utilities/Defaults';
import { IMenuProps, IReduxPlannerState } from '../utilities/Interfaces';
import { SaveDialog } from './SaveDialog';

// Menu for creating a new kitchen
export const AddMenu = (props: IMenuProps): JSX.Element => {
    // Props
    const { setIsLoading, dispatch } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    // Redux store
    const currentKitchen = useSelector((state) => (state as IReduxPlannerState).kitchen);

    // Handle clicks on menu item
    const handleClick = () => {
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
                    true,
                ),
            )
                .then(() => toast.success('Kitchen ' + currentKitchen.name + ' has been saved'))
                .catch(() => toast.error('Kitchen ' + currentKitchen.name + ' failed to save!'));
        }
        setIsLoading(true);
    };

    // When closing the save menu
    const handleClose = () => {
        setOpen(false);
        GenerateIDs.get().resetAllIds();
        dispatch(DeleteKitchen(DEFAULT_KITCHEN));
        setIsLoading(true);
    };

    // Rendert the JSX
    return (
        <>
            <ColorButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AddIcon />
            </ColorButton>
            <SaveDialog open={open} onClose={handleClose} dispatch={dispatch} isNew={true} />
        </>
    );
};
