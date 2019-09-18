import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            backgroundColor: '#57B05E',
        },
        button: {
            backgroundColor: '#57B05E',
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        bar: {
            backgroundColor: '#57B05E',
        },
    }),
);

export function NavBar() {
    const style = useStyles();

    return (
        <div className={style.root}>
            <AppBar position="static" className={style.bar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={style.title}>
                        Wren Kitchen planner
                    </Typography>
                    <Button color="inherit" onClick={() => console.log('save data')}>
                        Save <SaveIcon className={style.rightIcon} />
                    </Button>
                    <Button color="inherit" onClick={() => console.log('load data')}>
                        Download
                        <CloudDownloadIcon className={style.rightIcon} />
                    </Button>
                    <Button color="inherit" onClick={() => console.log('delete data')}>
                        Delete
                        <DeleteIcon className={style.rightIcon} />
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

// import MenuIcon from '@material-ui/icons/Menu';
// import IconButton from '@material-ui/core/IconButton';
// import logo from '../images/logo.png';
