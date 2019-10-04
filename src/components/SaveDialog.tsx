import { Dialog, DialogTitle, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SaveKitchen } from '../redux/actions/KitchenActions';
import { ColorButton, menuStyles } from '../style/Styles';
import { IReduxPlannerState, ISaveDialogProps, IState } from '../utilities/Interfaces';

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
    const handleSave = (): void => {
        // Name needs characters
        if (values.name.length <= 0) {
            toast.error('Kitchen needs a valid name!');
            return;
        } else {
            // Dispatch action
            dispatch(
                SaveKitchen(
                    {
                        id: currentKitchen.id,
                        widgets: currentKitchen.widgets,
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
            <form className={style.container} noValidate autoComplete="off" onSubmit={() => handleSave()}>
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
                <ColorButton className={style.saveButton} onClick={() => handleSave()}>
                    Save
                </ColorButton>
                <ColorButton className={style.cancelButton} onClick={() => handleClose()}>
                    Cancel
                </ColorButton>
            </span>
        </Dialog>
    );
};
