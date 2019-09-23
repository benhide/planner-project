import { combineReducers } from 'redux';
import { widgetsReducer, kitchenReducer } from './KitchenReducer';

// The root reducer
// **********************************************
// TODO: LOADING AND SAVING FROM SERVER REDUCER
// **********************************************
export const RootReducer = combineReducers<any>({
    Widgets: widgetsReducer,
    Kitchen: kitchenReducer,
});

// Units: unitsReducer,
// Wallunits: wallunitsReducer,
// Worktops: worktopsReducer,
// Walls: wallsReducer,

// unitsReducer, wallsReducer, wallunitsReducer, worktopsReducer,
