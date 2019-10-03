import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';

export const WidgetOptions = (props: any) => {

    const { onClose, open } = props;

    return (
        <>
            <Dialog open={open} aria-labelledby="scroll-dialog-title" maxWidth="lg">
                <DialogTitle id="scroll-dialog-title">Item Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        stuff goes herestuff goes herestuff goes herestuff goes herestuff goes herestuff goes herestuff goes herestuff goes herestuff
                        goes herestuff goes herestuff goes herestuff goes herestuff goes herestuff goes herestuff goes herestuff goes herestuff goes
                        herestuff goes herestuff goes herestuff goes herestuff goes herestuff goes herestuff goes herestuff goes herestuff goes
                        herestuff goes herestuff goes here stuff goes here
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

// onClose = { handleClose };