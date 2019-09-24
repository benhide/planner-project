import { KitchenActionTypes } from '../actions/ActionTypes';
import { KitchenActions } from '../actions/KitchenActions';
import initialState from './IntialState';

// // Reducer for unit actions
// export const widgetsReducer = (state = initialState, action: WidgetsAction) => {
//     switch (action.type) {
//         // Add a widget to the store
//         case WidgetActionTypes.WIDGET_ADDED:
//             return [...state.Widgets, { ...action.widget }];

//         // Remove a widget from the store
//         case WidgetActionTypes.WIDGET_REMOVED:
//             return state.Widgets.filter((widget) => widget.id !== action.widget.id);

//         // Update a widget in the store
//         case WidgetActionTypes.WIDGET_UPDATED:
//             return state.Widgets.map((widget) => {
//                 return widget.id !== action.widget.id ? widget : { ...widget, ...action.widget };
//             });
//         // Return default state
//         default:
//             return state;
//     }
// };

//
export const kitchenReducer = (state = initialState.kitchens, action: KitchenActions) => {
    switch (action.type) {
        // Save a kitchen to server
        case KitchenActionTypes.SAVE_KITCHEN_SUCCESS:
            return [...state, { ...action.kitchen }];

        // Load kitchens from server
        case KitchenActionTypes.LOAD_KITCHEN_SUCCESS:
            return action.kitchens;

        // Delete kitchen from server
        case KitchenActionTypes.REMOVED_KITCHEN_SUCCESS:
            return state.filter((kitchen) => kitchen.id !== action.kitchen.id);

        // Return default state
        default:
            return state;
    }
};

// UnitAction, WallAction, WallUnitAction, WorktopAction,

// // Reducer for unit actions
// export const unitsReducer = (state = initialState.Units, action: UnitAction) => {
//     switch (action.type) {
//         case KitchenActionTypes.UNIT_ADDED:
//             return [...state, { ...action.unit }];
//         case KitchenActionTypes.UNIT_REMOVED:
//             return state.filter((unit) => unit.id !== action.unit.id);
//         case KitchenActionTypes.UNIT_UPDATED:
//             return state.map((unit) => {
//                 return unit.id !== action.unit.id ? unit : { ...unit, ...action.unit };
//             });
//         default:
//             return state;
//     }
// };

// // Reducer for wallunit actions
// export const wallunitsReducer = (state = initialState.Wallunits, action: WallUnitAction) => {
//     switch (action.type) {
//         case KitchenActionTypes.WALLUNIT_ADDED:
//             return [...state, { ...action.wallunit }];
//         case KitchenActionTypes.WALLUNIT_REMOVED:
//             return state.filter((wallunit) => wallunit.id !== action.wallunit.id);
//         case KitchenActionTypes.WALLUNIT_UPDATED:
//             return state.map((wallunit) => {
//                 return wallunit.id !== action.wallunit.id ? wallunit : { ...wallunit, ...action.wallunit };
//             });
//         default:
//             return state;
//     }
// };

// // Reducer for wall actions
// export const wallsReducer = (state = initialState.Walls, action: WallAction) => {
//     switch (action.type) {
//         case KitchenActionTypes.WALL_ADDED:
//             return [...state, { ...action.wall }];
//         case KitchenActionTypes.WALL_REMOVED:
//             return state.filter((wall) => wall.id !== action.wall.id);
//         case KitchenActionTypes.WALL_UPDATED:
//             return state.map((wall) => {
//                 return wall.id !== action.wall.id ? wall : { ...wall, ...action.wall };
//             });
//         default:
//             return state;
//     }
// };

// // Reducer for worktop actions
// export function worktopsReducer(state = initialState.Worktops, action: WorktopAction) {
//     switch (action.type) {
//         case KitchenActionTypes.WORKTOP_ADDED:
//             return [...state, { ...action.worktop }];
//         case KitchenActionTypes.WORKTOP_REMOVED:
//             return state.filter((worktop) => worktop.id !== action.worktop.id);
//         case KitchenActionTypes.WORKTOP_UPDATED:
//             return state.map((worktop) => {
//                 return worktop.id !== action.worktop.id ? worktop : { ...worktop, ...action.worktop };
//             });
//         default:
//             return state;
//     }
// }

// // Reducer for items moved
// export function movedWidgetReducer(state = initialState, action: MovedWidgetAction) {
//     switch (action.type) {
//         case KitchenActionTypes.WIDGET_MOVED:
//             return state;
//     }
// }
