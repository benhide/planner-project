import { MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { LoadKitchen } from '../redux/actions/KitchenActions';
import { IKitchen, IPlannerState } from '../utilities/Interfaces';
import { Kitchen } from '../engine/Kitchen';
import { toast } from 'react-toastify';
import { kitchenReducer } from '../redux/reducers/KitchenReducer';

// The load menu component
export default function LoadMenu(props: any): JSX.Element {
    const { loadItems, setIsLoading } = props;

    // Dispatch for thunks
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    // Local state
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // Handle clicks on menu items
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    // Handle the menu closing
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Load kitchen
    const loadKitchen = (e: any, id: number, name: string): void => {
        e.preventDefault();
        dispatch(LoadKitchen(id))
            .then(() => {
                Kitchen.getInstance().kitchenID = id;
                Kitchen.getInstance().kitchenName = name;
                // kitchen.getInstance().widgets = widgets;
                toast.success('Kitchen has been loaded');
            })
            .catch((error: string) => {
                toast.error('Kitchen ' + name + ' failed to load!');
                // tslint:disable-next-line: no-console
                console.log(error);
            });
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
                {loadItems.map((kitchen: IKitchen) => (
                    <MenuItem key={kitchen.name} onClick={(e) => loadKitchen(e, kitchen.id, kitchen.name)}>
                        {kitchen.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
