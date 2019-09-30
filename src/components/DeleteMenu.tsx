import { makeStyles, Theme, createStyles, Dialog, DialogTitle, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import { IDialogProps, IPlannerState } from '../utilities/Interfaces';
import { toast } from 'react-toastify';
import { Kitchen } from '../engine/Kitchen';
import { deleteKitchen } from '../api/KitchenApi';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { DeleteKitchen } from '../redux/actions/KitchenActions';

// Styling
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            width: 400,
        },
        deleteButton: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            width: 150,
            display: 'inline-block',
            float: 'left' as 'left',
        },
        cancelButton: {
            marginRight: theme.spacing(5),
            marginLeft: theme.spacing(5),
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            width: 150,
            display: 'inline-block',
            float: 'right' as 'right',
        },
    }),
);

// TODO
export default function DeleteMenu(props: any): JSX.Element {
    // Props
    const { setIsLoading } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    // Dispatch for thunks
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    // Handle clicks on menu items
    const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
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
            <DeleteDialog open={open} onClose={handleClose} dispatch={dispatch} />
        </div>
    );
}

// Save dialog component
function DeleteDialog(props: IDialogProps) {
    // The props
    const { onClose, open, dispatch } = props;

    // Styling
    const style = useStyles();

    // When the dialog box closes
    const handleClose = () => {
        onClose();
    };

    // Delete the current kitchen
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (Kitchen.getInstance().kitchenID) {
            deleteKitchen(Kitchen.getInstance().kitchenID)
                .then(() => {
                    toast.success('Kitchen deleted');
                    Kitchen.getInstance().resetKitchen();
                    debugger;
                    dispatch(
                        DeleteKitchen({
                            id: Kitchen.getInstance().kitchenID,
                            widgets: Kitchen.getInstance().widgets,
                            name: Kitchen.getInstance().kitchenName,
                        }),
                    );
                })
                .catch((error: string) => {
                    toast.error('Kitchen failed to delete!');
                    // tslint:disable-next-line: no-console
                    console.log(error);
                });
        }
        onClose();
    };

    // Render the JSX
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="save-dialog-title">Delete Kitchen</DialogTitle>
            <span>
                <Button className={style.deleteButton} onClick={(e) => handleDelete(e)}>
                    Delete
                </Button>
                <Button className={style.cancelButton} onClick={() => handleClose()}>
                    Cancel
                </Button>
            </span>
        </Dialog>
    );
}
