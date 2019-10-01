import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// Styling
export const menuStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            width: 400,
        },
        saveButton: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            width: 150,
            display: 'inline-block',
            float: 'left' as 'left',
        },
        deleteButton: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            width: 150,
            display: 'inline-block',
            float: 'left' as 'left',
        },
        cancelButton: {
            marginRight: theme.spacing(5),
            marginLeft: theme.spacing(5),
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            width: 150,
            display: 'inline-block',
            float: 'right' as 'right',
        },
    }),
);
