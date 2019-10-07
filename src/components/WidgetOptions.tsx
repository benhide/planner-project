import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';
import { CirclePicker, ColorResult } from 'react-color';
import { EventBus, GameEvent } from '../engine/EventBus';
import { ColorButton, widgetOptionsStyle } from '../style/Styles';
import { IColor, IColorChangeEvent, IWidgetOptionsProps } from '../utilities/Interfaces';

// Options for the widgets selected
export const WidgetOptions = (props: IWidgetOptionsProps) => {
    // Styling
    const style = widgetOptionsStyle();

    // Props
    const { widgetInfo, onClose, open } = props;

    const handleChange = (selectedColor: ColorResult): void => {
        onColourChange(selectedColor.rgb);
    };

    // Adds an event listener to where the mouse moved on the canvas
    const onColourChange = (color: IColor): void => {
        const colorChange: IColorChangeEvent = {
            color: color,
            type: widgetInfo.type,
        };

        EventBus.publish(GameEvent.ColorChange, { colorChange });
    };

    // Render the jsx
    return (
        <>
            <Dialog open={open} aria-labelledby="scroll-dialog-title" maxWidth="lg">
                <DialogTitle id="scroll-dialog-title">{widgetInfo.type}</DialogTitle>
                <DialogContent className={style.dialogContainer}>
                    <div className={style.imageContainer}>
                        <span className={style.imageHelper}></span>
                        <img className={style.image} src={widgetInfo.image} />
                    </div>
                    <div>
                        <DialogContentText>{widgetInfo.longDescription}</DialogContentText>
                    </div>
                    <div className={style.colourPicker}>
                        <CirclePicker onChangeComplete={(selectedColor) => handleChange(selectedColor)} />
                    </div>
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

// {
//     /* <ColorButton>Select Material / Colour</ColorButton> */
// }
