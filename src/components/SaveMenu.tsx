import { Button, createStyles, Dialog, DialogTitle, makeStyles, TextField, Theme } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Kitchen } from '../engine/Kitchen';
import { SaveKitchen } from '../redux/actions/KitchenActions';
import { IPlannerState } from '../utilities/Interfaces';

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
        saveButton: {
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

// Interface for save dialog props
interface ISaveDialogProps {
    open: boolean;
    onClose: () => void;
}

// Interface for the text field state
interface IState {
    name: string;
}

//
export default function SaveMenu() {
    // Local state
    const [open, setOpen] = React.useState(false);

    // Dispatch for thunks
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    // Handle the click on save button
    const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        setOpen(false);
    };

    // Render the JSX
    return (
        <div>
            <Button color="inherit" onClick={(e) => handleClickOpen(e)}>
                <SaveIcon />
            </Button>
            <SaveDialog open={open} onClose={handleClose} />
        </div>
    );
}

// Save dialog component
function SaveDialog(props: ISaveDialogProps) {
    // The props
    const { onClose, open } = props;

    // Styling
    const style = useStyles();

    // Dispatch for thunks
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    // When the dialog box closes
    const handleClose = () => {
        setValues({ ...values, [name]: '' });
        onClose();
    };

    // Local state
    const [values, setValues] = React.useState<IState>({ name: '' });

    // When the values in the text field change
    const handleChange = (name: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: e.target.value });
    };

    // Save the current kitchen
    const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        if (values.name.length <= 0) {
            toast.error('Kitchen needs a valid name!');
            return;
        } else {
            e.preventDefault();
            dispatch(
                SaveKitchen({
                    id: Kitchen.getInstance().kitchenID,
                    widgets: Kitchen.getInstance().widgets,
                    name: values.name,
                }),
            )
                .then(() => {
                    toast.success('Kitchen ' + values.name + ' has been saved');
                    // tslint:disable-next-line: no-console
                    console.log('update kitchen number!!!');
                })
                .catch((error: string) => alert('Kitchen ' + values.name + ' failed to save!\n' + error));
        }
        onClose();
    };

    // Render the JSX
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="save-dialog-title">Save Kitchen</DialogTitle>
            <form className={style.container} noValidate autoComplete="off" onSubmit={(e) => handleSave(e)}>
                <TextField id="save-name" label="Enter kitchen name" className={style.textField} value={values.name} onChange={handleChange('name')} margin="normal" />
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
}
