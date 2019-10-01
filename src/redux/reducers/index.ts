import { combineReducers } from 'redux';
import { kitchenReducer } from './KitchenReducer';

// The root reducer
export const RootReducer = combineReducers<any>({
    kitchen: kitchenReducer,
});
