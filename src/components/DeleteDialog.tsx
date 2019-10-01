import { Button, createStyles, Dialog, DialogTitle, makeStyles, Theme, Typography } from '@material-ui/core';
import * as React from 'react';
import { toast } from 'react-toastify';
import { deleteKitchen } from '../api/KitchenApi';
import { Kitchen } from '../engine/Kitchen';
import { DeleteKitchen } from '../redux/actions/KitchenActions';
import { IDialogProps } from '../utilities/Interfaces';
import { DEFAULT_KITCHEN } from '../utilities/Defaults';

// Styling
export const menuStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        information: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            width: 400,
        },
        deleteButton: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            width: 150,
            display: 'inline-block',
            float: 'left' as 'left',
        },
        cancelButton: {
            marginRight: theme.spacing(3),
            marginLeft: theme.spacing(3),
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            width: 150,
            display: 'inline-block',
            float: 'right' as 'right',
        },
    }),
);

// Delete dialog component
export function DeleteKitchenDialog(props: IDialogProps) {
    // Styling
    const style = menuStyles();

    // The props
    const { onClose, open, dispatch } = props;

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
                    dispatch(
                        DeleteKitchen(DEFAULT_KITCHEN),
                    );
                    Kitchen.getInstance().resetKitchen();
                })
                .catch((error: string) => toast.error('Kitchen failed to delete!'));
        }
        onClose();
    };

    // Render the JSX
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="save-dialog-title">Delete Kitchen</DialogTitle>
            <Typography className={style.information}>You are about to delete this kitchen, are you sure you want to continue?</Typography>
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
