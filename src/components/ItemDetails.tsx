import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: '100%',
            float: 'left' as 'left',
            color: '#57B05E',
            marginTop: '20px',
        },
        media: {
            // height: 140,
        },
    }),
);

export function ItemDetails(props: any): JSX.Element {
    const style = useStyles();

    return (
        <Card className={style.card}>
            <CardActionArea onClick={() => console.log('show dialog')}>
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
}

// const slide = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

// function alertDialogSlide(props: any): JSX.Element {
//     const [open, setOpen] = React.useState(false);
//     handleClickOpen();

//     function handleClickOpen(): void {
//         setOpen(true);
//     }

//     function handleClose(): void {
//         setOpen(false);
//     }

//     return (
//         <div>
//             <Dialog
//                 open={open}
//                 TransitionComponent={slide}
//                 keepMounted
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-slide-title"
//                 aria-describedby="alert-dialog-slide-description"
//             >
//                 <DialogTitle id="alert-dialog-slide-title">{props.itemSelected}</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-slide-description">{props.itemInfo}</DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         CLose
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }

// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import { TransitionProps } from '@material-ui/core/transitions';
// import Typography from '@material-ui/core/Typography';
// import Slide from '@material-ui/core/Slide';
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
