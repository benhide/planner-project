import { createStyles, makeStyles, MenuItem, Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import * as React from 'react';
import { toast } from 'react-toastify';
import { LoadKitchen } from '../redux/actions/KitchenActions';
import { ILoadMenuProps, IMenuItem } from '../utilities/Interfaces';

// Styling
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            margin: theme.spacing(2),
        },
    }),
);

// The load menu component
export const LoadMenu = (props: ILoadMenuProps): JSX.Element => {
    // The component styling
    const style = useStyles();

    // Props
    const { loadItems, setIsLoading, dispatch } = props;

    // Local state
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // Handle clicks on menu items
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(e.currentTarget);
    };

    // Handle the menu closing
    const handleClose = (): void => {
        setAnchorEl(null);
    };

    // Load kitchen
    const loadKitchen = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: number, name: string): void => {
        dispatch(LoadKitchen(id))
            .then(() => toast.success('Kitchen ' + name + ' has been loaded'))
            .catch(() => toast.error('Kitchen ' + name + ' failed to load!'));
        setAnchorEl(null);
        setIsLoading(false);
    };

    // Render the JSX
    return (
        <div>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <CloudDownloadIcon />
            </Button>
            <Menu id="simple-load-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => handleClose()}>
                <Typography className={style.title}>Choose kitchen to load</Typography>
                {loadItems.map((kitchen: IMenuItem) => (
                    <MenuItem key={kitchen.id} onClick={(e) => loadKitchen(e, kitchen.id, kitchen.name)}>
                        {kitchen.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
