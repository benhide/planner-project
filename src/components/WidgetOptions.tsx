import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';
import { ColorButton } from '../style/Styles';
import { IWidgetOptionsProps } from '../utilities/Interfaces';

// Options for the widgets selected
export const WidgetOptions = (props: IWidgetOptionsProps) => {
    // Props
    const { widgetInfo, onClose, open } = props;

    // Render the jsx
    return (
        <>
            <Dialog open={open} aria-labelledby="scroll-dialog-title" maxWidth="lg">
                <DialogTitle id="scroll-dialog-title">{widgetInfo.type}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{widgetInfo.longDescription}</DialogContentText>
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
