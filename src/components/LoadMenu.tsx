import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getKitchensList } from '../api/KitchenApi';
import { LoadKitchen } from '../redux/actions/KitchenActions';
import { IPlannerState, IKitchen } from '../utilities/Interfaces';

// TODO
export default function LoadMenu(): JSX.Element {
    // Dispatch for thunks
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    getKitchensList().then((result: IKitchen[]) => result.forEach((item: IKitchen) => console.log(item.id)));

    //
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    //
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    //
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Load all kitchens
    const loadKitchen = (e: any, id: number): void => {
        e.preventDefault();
        dispatch(LoadKitchen(id)).catch((error: string) => alert('Kitchen ' + id + ' failed to load!\n' + error));
        setAnchorEl(null);
    };

    // TODO
    const menuItems = () => {
        getKitchensList();
        // return currentState.kitchens.map((kitchen) => (
        //     <MenuItem key={kitchen.name} onClick={(e) => loadKitchen(e, kitchen.id)}>
        //         {kitchen.name}
        //     </MenuItem>
        // ));
    };

    return (
        <div>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <CloudDownloadIcon />
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => handleClose()}>
                {/* {menuItems} */}
            </Menu>
        </div>
    );
}

// // Called when redux store changes
// React.useEffect((): void => {
//     dispatch(LoadKitchens());
//     // .catch((error: string) => alert('Kitchens failed to load!\n' + error));
// }, []);

// // Get the current state from redux store and update the basket
// const currentState = useSelector((state) => state as IPlannerState);
