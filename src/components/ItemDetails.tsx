import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { WREN_GREEN } from '../utilities/Defaults';

const style = makeStyles((theme: Theme) =>
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

interface IItemDetailsProps {
    itemSelected: string;
    itemInfo: string;
    itemImg: string;
}

export const ItemDetails: React.FunctionComponent<IItemDetailsProps> = (props) => {
    const style = style();

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
