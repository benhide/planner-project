import { combineReducers } from 'redux';
import { RemoveWidget, Units, Walls, Wallunits, Worktops } from './KitchenReducer';

// const initialState = {
//     units: 0,
//     walls: 0,
//     worktops: 0,
//     wallunits: 0,
// };

export const RootReducer = combineReducers({
    Units,
    Wallunits,
    Worktops,
    Walls,
    RemoveWidget,
});
