import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import { Kitchen } from '../engine/Kitchen';
import { SaveKitchen } from '../redux/actions/KitchenActions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPlannerState } from '../utilities/Interfaces';
import { Action } from 'redux';
import { SaveDialog } from './SaveMenu';

// TODO
export default function AddMenu(props: any): JSX.Element {
    // Props
    const { setIsLoading } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    // Dispatch for thunks
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    // Handle clicks on menu items
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!Kitchen.getInstance().kitchenID) {
            setOpen(true);
        } else {
            e.preventDefault();
            dispatch(
                SaveKitchen({
                    id: Kitchen.getInstance().kitchenID,
                    widgets: Kitchen.getInstance().widgets,
                    name: Kitchen.getInstance().kitchenName,
                }),
            )
                .then(() => toast.success('Kitchen ' + Kitchen.getInstance().kitchenName + ' has been saved'))
                .catch((error: string) => {
                    toast.error('Kitchen ' + Kitchen.getInstance().kitchenName + ' failed to save!');
                    // tslint:disable-next-line: no-console
                    console.log(error);
                });
        }
    };

    // When closing the save menu
    const handleClose = () => {
        Kitchen.getInstance().resetKitchen();
        setIsLoading(true);
        setOpen(false);
    };

    // Rendert the JSX
    return (
        <div>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AddIcon />
            </Button>
            <SaveDialog open={open} onClose={handleClose} dispatch={dispatch} />
        </div>
    );
}
