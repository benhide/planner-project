import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getKitchensList } from '../api/KitchenApi';
import { LoadKitchen } from '../redux/actions/KitchenActions';
import { IKitchen, IPlannerState } from '../utilities/Interfaces';

interface ILoadMenuItem {
    id: number;
    name: string;
}

// TODO
export default function LoadMenu(): JSX.Element {
    // Dispatch for thunks
    const dispatch = useDispatch<ThunkDispatch<IPlannerState, void, Action>>();

    const loadItems = new Array<ILoadMenuItem>();
    getKitchensList()
        .then((result: IKitchen[]) => result.map((item: IKitchen) => loadItems.push({ id: item.id, name: item.name })))
        .finally();

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
    const LoadMenuItems = () => {
        // // getKitchensList();
        // return currentState.kitchens.map((kitchen) => (
        //     <MenuItem key={kitchen.name} onClick={(e) => loadKitchen(e, kitchen.id)}>
        //         {kitchen.name}
        //     </MenuItem>
        // ));

        loadItems.forEach((i) => console.log(i));
    };

    return (
        <div>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <CloudDownloadIcon />
            </Button>
            <Menu id="simple-load-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => handleClose()}>
                {LoadMenuItems}
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
