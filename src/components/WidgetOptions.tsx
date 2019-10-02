import { Paper, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import * as React from 'react';
import { WREN_GREEN, BLACK } from '../utilities/Defaults';

// Styling
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            // width: '55%',
            // height: '500px',
            zIndex: 10,
            backgroundColor: BLACK,
            // color: WREN_GREEN,
            marginTop: '-30%',
            // left: '50%',
            // marginLeft: '15%',
        },
        media: {
            // height: 140,
        },
    }),
);

export const WidgetOptions = (): JSX.Element => {
    const style = useStyles();

    return (
        <Paper className={style.paper}>
            <Typography variant="h5" component="h3">
                This is a sheet of paper.
            </Typography>
            <Typography component="p">Paper can be used to build surface or other elements for your application.</Typography>
        </Paper>
    );
};
