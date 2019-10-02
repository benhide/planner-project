import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { WREN_GREEN } from '../utilities/Defaults';
import { IWidgetDeatilsProps } from '../utilities/Interfaces';

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
            // height: 140,
        },
    }),
);

// Itemdetails component
export const WidgetDetails = (props: IWidgetDeatilsProps): JSX.Element => {
    const style = useStyles();

    // Render jsx
    return (
        <Card className={style.card}>
            <CardActionArea onClick={() => ({})}>
                <CardMedia className={style.media} image={props.itemInfo} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.itemSelected}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.itemInfo}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
