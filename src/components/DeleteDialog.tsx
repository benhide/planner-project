import { Button, createStyles, Dialog, DialogTitle, makeStyles, Theme, Typography } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteKitchen } from '../api/KitchenApi';
import { DeleteKitchen } from '../redux/actions/KitchenActions';
import { DEFAULT_KITCHEN } from '../utilities/Defaults';
import { IDeleteDialogProps, IReduxPlannerState } from '../utilities/Interfaces';

// Component styling
const menuStyles = makeStyles((theme: Theme) =>
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
export const DeleteKitchenDialog = (props: IDeleteDialogProps): JSX.Element => {
    // Styling
    const style = menuStyles();

    // The props
    const { onClose, open, dispatch } = props;

    // Redux store
    const currentKitchen = useSelector((state) => (state as IReduxPlannerState).kitchen);

    // When the dialog box closes
    const handleClose = (): void => {
        onClose();
    };

    // Delete the current kitchen
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (currentKitchen.id) {
            deleteKitchen(currentKitchen.id)
                .then(() => {
                    toast.success('Kitchen deleted');
                    dispatch(DeleteKitchen(DEFAULT_KITCHEN));
                })
                .catch(() => toast.error('Kitchen failed to delete!'));
        } else {
            dispatch(DeleteKitchen(DEFAULT_KITCHEN));
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
};
