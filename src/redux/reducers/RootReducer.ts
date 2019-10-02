import { combineReducers } from 'redux';
import { kitchenReducer } from './KitchenReducer';

// The root reducer
export const rootReducer = combineReducers<any>({
    kitchen: kitchenReducer,
});
