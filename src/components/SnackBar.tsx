import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        close: {
            padding: theme.spacing(0.5),
        },
    }),
);

export default function SimpleSnackbar() {
    const style = useStyles();
    const [open, setOpen] = React.useState(false);

    function handleClick() {
        setOpen(true);
    }

    function handleClose(event: React.SyntheticEvent | React.MouseEvent, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    const action: JSX.Element = (
        <IconButton key="close" aria-label="close" color="inherit" className={style.close} onClick={handleClose}>
            <CloseIcon />
        </IconButton>
    );

    return (
        <div>
            <Button onClick={handleClick}>Open simple snackbar</Button>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{ 'aria-describedby': 'message-id' }}
                message={<span id="message-id">Note archived</span>}
                action={[action]}
            />
        </div>
    );
}
