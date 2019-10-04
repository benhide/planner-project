import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { WREN_GREEN } from '../utilities/Defaults';
import { IWidgetDeatilsProps } from '../utilities/Interfaces';
import { WidgetOptions } from './WidgetOptions';

// Styling
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: '100%',
            float: 'left' as 'left',
            color: WREN_GREEN,
            marginTop: '20px',
        },
        media: {
            height: 140,
        },
    }),
);

// Itemdetails component
export const WidgetDetails = (props: IWidgetDeatilsProps): JSX.Element => {
    // Styling
    const style = useStyles();

    // Props
    const { widgetInfo } = props;

    // Local state
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Render jsx
    return (
        <>
            <Card className={style.card}>
                <CardActionArea onClick={() => handleClick()}>
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

// <ExpansionPanel>
//     <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
//         <Typography variant="caption">Hide/Show Details</Typography>
//     </ExpansionPanelSummary>

//      <ExpansionPanelDetails>
//             <Typography variant="body2" color="textSecondary" component="p">
//                 {widgetInfo.longDesc}
//             </Typography>
//         </ExpansionPanelDetails>
//         <ExpansionPanelDetails></ExpansionPanelDetails>
//                         </ExpansionPanel>
//                                                 </ExpansionPanelDetails>
