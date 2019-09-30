import { loadKitchen, saveKitchen } from '../../api/KitchenApi';
import { Kitchen } from '../../engine/Kitchen';
import { BaseWidget } from '../../engine/widgets/BaseWidget';
import { DEFAULT_KITCHEN } from '../../utilities/Defaults';
import { IKitchen } from '../../utilities/Interfaces';
import { KitchenActionTypes } from './ActionTypes';

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
export interface IKitchenRemovedAction {
    type: KitchenActionTypes.REMOVED_KITCHEN_SUCCESS;
    kitchen: IKitchen;
}

// TODO
export type KitchenActions = IKitchenSavedAction | IKitchenLoadedAction | IKitchenRemovedAction | IKitchenWidgetAddedAction | IKitchenWidgetRemovedAction | IKitchenWidgetUpdatedAction;

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
export function SaveKitchen(kitchen: IKitchen, isNewKitchen: boolean) {
    return async (dispatch: (arg0: { type: KitchenActionTypes; kitchen: IKitchen }) => void) => {
        try {
            if (!isNewKitchen) {
                const savedKitchen = (await saveKitchen(kitchen)) as IKitchen;
                Kitchen.getInstance().updateKitchenDetails(savedKitchen.id, savedKitchen.name, savedKitchen.widgets);
                dispatch(SaveKitchenSuccess(savedKitchen));
            } else {
                await saveKitchen(kitchen);
                Kitchen.getInstance().resetKitchen();
                dispatch(DeleteKitchen(DEFAULT_KITCHEN));
            }
        } catch (error) {
            throw error;
        }
    };
}

// Load kitchen
export function LoadKitchen(id: number) {
    return async (dispatch: (arg0: { type: KitchenActionTypes; kitchen: IKitchen }) => void) => {
        try {
            const loadedKitchen = await loadKitchen(id);
            Kitchen.getInstance().updateKitchenDetails(loadedKitchen.id, loadedKitchen.name, loadedKitchen.widgets);
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
