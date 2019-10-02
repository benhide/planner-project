import { Button, createStyles, Dialog, DialogTitle, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Kitchen } from '../engine/Kitchen';
import { SaveKitchen } from '../redux/actions/KitchenActions';
import { IReduxPlannerState, ISaveDialogProps, IState } from '../utilities/Interfaces';

// Component styling
const menuStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            width: 400,
            display: 'flex',
            flexWrap: 'wrap',
        },
        information: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            width: 400,
        },
        textField: {
            marginLeft: theme.spacing(-2),
            marginRight: theme.spacing(-2),
            width: 415,
        },
        saveButton: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
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

// Save dialog component
export const SaveDialog = (props: ISaveDialogProps): JSX.Element => {
    // Styling
    const style = menuStyles();

    // The props
    const { onClose, open, dispatch, isNew } = props;

    // Local state
    const [values, setValues] = React.useState<IState>({ name: '' });

    // Redux store
    const currentKitchen = useSelector((state) => (state as IReduxPlannerState).kitchen);

    // When the dialog box closes
    const handleClose = (): void => {
        setValues({ ...values, [name]: '' });
        onClose();
    };

    // When the values in the text field change
    const handleChange = (name: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [name]: e.target.value });
    };

    // Save the current kitchen
    const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>): void => {
        // Name needs characters
        if (values.name.length <= 0) {
            toast.error('Kitchen needs a valid name!');
            return;
        } else {
            e.preventDefault();
            // Dispatch action
            dispatch(
                SaveKitchen(
                    {
                        id: currentKitchen.id,
                        widgets: Kitchen.getInstance().widgets,
                        name: values.name,
                    },
                    isNew,
                ),
            )
                .then(() => toast.success('Kitchen ' + values.name + ' has been saved'))
                .catch(() => toast.error('Kitchen ' + values.name + ' failed to save!'));
        }
        // Handle closing
        onClose();
    };

    // Render the JSX
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="save-dialog-title">Save Current Kitchen</DialogTitle>
            <Typography className={style.information}>Please enter a name for the kitchen to save...</Typography>
            <form className={style.container} noValidate autoComplete="off" onSubmit={(e) => handleSave(e)}>
                <TextField
                    id="save-name"
                    label="Enter kitchen name"
                    className={style.textField}
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="normal"
                />
            </form>
            <span>
                <Button className={style.saveButton} onClick={(e) => handleSave(e)}>
                    Save
                </Button>
                <Button className={style.cancelButton} onClick={() => handleClose()}>
                    Cancel
                </Button>
            </span>
        </Dialog>
    );
};
