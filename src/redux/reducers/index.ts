import { combineReducers } from 'redux';
import units from './UnitReducer';

export const RootReducer = combineReducers({
    units,
});
