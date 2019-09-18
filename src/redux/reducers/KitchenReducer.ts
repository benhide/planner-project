import * as types from '../actions/ActionTypes';

export function KitchenReducer(state: any = [], action: any) {
    switch (action.type) {
        case types.UNIT_ADDED:
            return [...state, { ...action.unit }];
        case types.UNIT_REMOVED:
        default:
            return state;
    }
}
