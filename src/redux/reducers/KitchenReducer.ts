import * as types from '../actions/ActionTypes';
// import initialState from './IntialState';

export function Units(state: any = [], action: any) {
    switch (action.type) {
        case types.UNIT_ADDED:
            return [...state, { ...action.unit }];
        case types.UNIT_REMOVED:
        default:
            return state;
    }
}

export function Wallunits(state: any = [], action: any) {
    switch (action.type) {
        case types.WALLUNIT_ADDED:
            return [...state, { ...action.wallunit }];
        case types.WALLUNIT_REMOVED:
        default:
            return state;
    }
}

export function Walls(state: any = [], action: any) {
    switch (action.type) {
        case types.WALL_ADDED:
            return [...state, { ...action.wall }];
        case types.WALL_REMOVED:
        default:
            return state;
    }
}

export function Worktops(state: any = [], action: any) {
    switch (action.type) {
        case types.WORKTOP_ADDED:
            return [...state, { ...action.worktop }];
        case types.WORKTOP_REMOVED:
        default:
            return state;
    }
}

// export function RemoveWidget(state: any = [], action: any) {
//     switch (action.type) {
//         case types.WIDGET_REMOVED:
//             // tslint:disable-next-line: no-console
//             console.log(action.widget);
//             return state;
//         // return [...state, { ...action.widget }];
//         default:
//             return state;
//     }
// }
