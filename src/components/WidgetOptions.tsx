import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';
import { ColorButton } from '../style/Styles';

export const WidgetOptions = (props: any) => {
    const { widgetInfo, onClose, open } = props;

    return (
        <>
            <Dialog open={open} aria-labelledby="scroll-dialog-title" maxWidth="lg">
                <DialogTitle id="scroll-dialog-title">{widgetInfo.type}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{widgetInfo.longDesc}</DialogContentText>
                    <ColorButton>Select Material / Colour</ColorButton>
                </DialogContent>
                <DialogActions>
                    <ColorButton onClick={onClose} color="primary">
                        Close
                    </ColorButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

// onClose = { handleClose };
