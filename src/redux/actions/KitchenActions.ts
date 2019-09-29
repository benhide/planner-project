import { saveKitchen, loadKitchen } from '../../api/KitchenApi';
import { BaseWidget } from '../../engine/widgets/BaseWidget';
import { KitchenActionTypes } from './ActionTypes';
import { IKitchen } from '../../utilities/Interfaces';

// Interfaces for kitchen actions
// Widget actions interfaces and types
// Widget added
export interface IKitchenWidgetAddedAction {
    type: KitchenActionTypes.WIDGET_ADDED;
    widget: BaseWidget;
}

// Widget removed
export interface IKitchenWidgetRemovedAction {
    type: KitchenActionTypes.WIDGET_REMOVED;
    widget: BaseWidget;
}

// Widget updated
export interface IKitchenWidgetUpdatedAction {
    type: KitchenActionTypes.WIDGET_UPDATED;
    widget: BaseWidget;
}

// TODO
export interface IKitchenLoadedAction {
    type: KitchenActionTypes.LOAD_KITCHEN_SUCCESS;
    kitchen: IKitchen;
}

// TODO
export interface IKitchenSavedAction {
    type: KitchenActionTypes.SAVE_KITCHEN_SUCCESS;
    kitchen: IKitchen;
}

// TODO
export interface IKitchensRemovedAction {
    type: KitchenActionTypes.REMOVED_KITCHEN_SUCCESS;
    kitchen: IKitchen;
}
// TODO
export type KitchenActions = IKitchenSavedAction | IKitchenLoadedAction | IKitchensRemovedAction | IKitchenWidgetAddedAction | IKitchenWidgetRemovedAction | IKitchenWidgetUpdatedAction;

// Add widget action creator
export const AddWidget = (widget: BaseWidget) => {
    return { type: KitchenActionTypes.WIDGET_ADDED, widget };
};

// Remove widget action creator
export const RemoveWidget = (widget: BaseWidget) => {
    return { type: KitchenActionTypes.WIDGET_REMOVED, widget };
};

// Update widget action creator
export const UpdateWidget = (widget: BaseWidget) => {
    return { type: KitchenActionTypes.WIDGET_UPDATED, widget };
};

// TODO
export const LoadKitchenSuccess = (kitchen: IKitchen) => {
    return { type: KitchenActionTypes.LOAD_KITCHEN_SUCCESS, kitchen };
};

// TODO
export const SaveKitchenSuccess = (kitchen: IKitchen) => {
    return { type: KitchenActionTypes.SAVE_KITCHEN_SUCCESS, kitchen };
};

// TODO
export function SaveKitchen(kitchen: IKitchen) {
    return async (dispatch: (arg0: { type: KitchenActionTypes; kitchen: IKitchen }) => void) => {
        try {
            const savedKitchen = await saveKitchen(kitchen);
            dispatch(SaveKitchenSuccess(savedKitchen));
        } catch (error) {
            throw error;
        }
    };
}

// TODO
export function LoadKitchen(id: number) {
    return async (dispatch: (arg0: { type: KitchenActionTypes; kitchen: IKitchen }) => void) => {
        try {
            const loadedKitchen = await loadKitchen(id);
            dispatch(LoadKitchenSuccess(loadedKitchen));
        } catch (error) {
            throw error;
        }
    };
}

// TODO
export function DeleteKitchen(kitchen: IKitchen) {
    return { type: KitchenActionTypes.REMOVED_KITCHEN_SUCCESS, kitchen };
}
