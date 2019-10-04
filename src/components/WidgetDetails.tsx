import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import * as React from 'react';
import { widgetDetailStyle } from '../style/Styles';
import { IWidgetDeatilsProps } from '../utilities/Interfaces';
import { WidgetOptions } from './WidgetOptions';

// Itemdetails component
export const WidgetDetails = (props: IWidgetDeatilsProps): JSX.Element => {
    // Styling
    const style = widgetDetailStyle();

    // Props
    const { widgetInfo } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    // Dsiaply the widget options menu
    const openWidgetOptions = () => {
        setOpen(true);
    };

    // Closing the widgte menu options
    const handleClose = () => {
        setOpen(false);
    };

    // Render jsx
    return (
        <>
            <Card className={style.card}>
                <CardActionArea onClick={() => openWidgetOptions()}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {widgetInfo.type ? widgetInfo.type : 'Item Info'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {widgetInfo.shortDescription ? widgetInfo.shortDescription : null}
                        </Typography>
                    </CardContent>
                    <CardMedia className={style.media} image={widgetInfo.image} />
                    {widgetInfo.image ? widgetInfo.image : null}
                </CardActionArea>
            </Card>
            <WidgetOptions onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} widgetInfo={widgetInfo} />
        </>
    );
};
