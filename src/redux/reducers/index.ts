import { combineReducers } from 'redux';
import { KitchenReducer } from './KitchenReducer';

// const initialState = {
//     units: 0,
//     walls: 0,
//     worktops: 0,
//     wallunits: 0,
// };

export const RootReducer = combineReducers({
    KitchenReducer,
});
