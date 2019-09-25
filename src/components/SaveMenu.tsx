import { Button, createStyles, Dialog, DialogTitle, makeStyles, TextField, Theme } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import * as React from 'react';

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

interface ISaveDialogProps {
    open: boolean;
    onClose: () => void;
}

interface IState {
    name: string;
    // multiline: string;
}

export default function SaveMenu() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}>
                <SaveIcon />
            </Button>
            <SaveDialog open={open} onClose={handleClose} />
        </div>
    );
}

function SaveDialog(props: ISaveDialogProps) {
    const { onClose, open } = props;

    const style = useStyles();

    const handleClose = () => {
        onClose();
    };

    const [values, setValues] = React.useState<IState>({
        name: '',
        // multiline: 'Controlled',
    });

    // const handleChange = (name: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValues({ ...values, [name]: event.target.value });
    // };

    const handleChange = () => {
        // change stuff
    };

    const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // stuff
        e.preventDefault();
        onClose();
    };

    const onSave = (e: React.FormEvent<HTMLFormElement>) => {
        // save stuff
        e.preventDefault();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="save-dialog-title">Save Kitchen</DialogTitle>
            <form className={style.container} noValidate autoComplete="off" onSubmit={(e) => onSave(e)}>
                <TextField id="save-name" label="Enter kitchen name" className={style.textField} value={values.name} onChange={handleChange} margin="normal" />
            </form>
            <span>
                <Button className={style.saveButton} onClick={(e) => handleSaveClick(e)}>
                    Save
                </Button>
                <Button className={style.cancelButton} onClick={() => handleClose()}>
                    Cancel
                </Button>
            </span>
        </Dialog>
    );
}
