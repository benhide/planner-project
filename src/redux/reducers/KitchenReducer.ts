import { KitchenActionTypes } from '../actions/ActionTypes';
import initialState from './IntialState';
import { KitchenActions } from '../actions/ActionsInterfaces';

// The kitchen reducer
export const kitchenReducer = (state = initialState, action: KitchenActions) => {
    const id = state.id;
    const name = state.name;

    // Switch on action type
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
            return { ...state, id, name, widgets: [...state.widgets, { ...action.widget }] };

        // Remove a widget from the store
        case KitchenActionTypes.WIDGET_REMOVED:
            return { ...state, id, name, widgets: state.widgets.filter((widget) => widget.id !== action.widget.id) };

        // Update a widget in the store
        case KitchenActionTypes.WIDGET_UPDATED:
            return {
                ...state,
                id,
                name,
                widgets: state.widgets.map((widget) => {
                    return widget.id !== action.widget.id ? widget : { ...widget, ...action.widget };
                }),
            };

        // Return the default state
        default:
            return state;
    }
};
