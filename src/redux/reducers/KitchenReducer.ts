import { KitchenActionTypes } from '../actions/ActionTypes';
import { KitchenActions } from '../actions/KitchenActions';
import initialState from './IntialState';

//
export const kitchenReducer = (state = initialState.kitchen, action: KitchenActions) => {
    switch (action.type) {
        // Save a kitchen to server
        case KitchenActionTypes.SAVE_KITCHEN_SUCCESS:
            return action.kitchen;

        // Load kitchen from server
        case KitchenActionTypes.LOAD_KITCHEN_SUCCESS:
            return action.kitchen;

        // Delete kitchen from server
        case KitchenActionTypes.REMOVED_KITCHEN_SUCCESS:
            return action.kitchen;

        //  Add a widget to the store
        case KitchenActionTypes.WIDGET_ADDED:
            return [...state.widgets, { ...action.widget }];

        // Remove a widget from the store
        case KitchenActionTypes.WIDGET_REMOVED:
            return state.widgets.filter((widget) => widget.id !== action.widget.id);

        // Update a widget in the store
        case KitchenActionTypes.WIDGET_UPDATED:
            return state.widgets.map((widget) => {
                return widget.id !== action.widget.id ? widget : { ...widget, ...action.widget };
            });
        // Return default state
        default:
            return state;
    }
};
