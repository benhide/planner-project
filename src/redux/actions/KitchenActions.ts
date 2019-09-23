import { Dispatch } from 'react';
import { Action, ActionCreator } from 'redux';
import { saveKitchen } from '../../api/KitchenApi';
import { BaseWidget } from '../../engine/widgets/BaseWidget';
import { IPlannerState } from '../../utilities/Interfaces';
import { KitchenActionTypes, WidgetActionTypes } from './ActionTypes';

// Interfaces for kitchen actions
// Widget actions interfaces and types
// Widget added
export interface IWidgetAddedAction {
    type: WidgetActionTypes.WIDGET_ADDED;
    widget: BaseWidget;
}

// Widget removed
export interface IWidgetRemovedAction {
    type: WidgetActionTypes.WIDGET_REMOVED;
    widget: BaseWidget;
}

// Widget updated
export interface IWidgetUpdatedAction {
    type: WidgetActionTypes.WIDGET_UPDATED;
    widget: BaseWidget;
}
// Type declarations for the widget actions
export type WidgetsAction = IWidgetAddedAction | IWidgetRemovedAction | IWidgetUpdatedAction;

// TODO
export interface IKitchensLoadedAction {
    type: KitchenActionTypes.LOAD_KITCHEN_SUCCESS;
    kitchen: IPlannerState;
}

// TODO
export interface IKitchensSavedAction {
    type: KitchenActionTypes.SAVE_KITCHEN_SUCCESS;
    kitchen: IPlannerState;
}

// TODO
export interface IKitchensUpdatedAction {
    type: KitchenActionTypes.UPDATE_KITCHEN_SUCCESS;
    kitchen: IPlannerState;
}
// TODO
export type KitchenActions = IKitchensSavedAction | IKitchensLoadedAction | IKitchensUpdatedAction;

// Add widget action creator
export const AddWidget: ActionCreator<Action> = (widget: BaseWidget) => {
    return { type: WidgetActionTypes.WIDGET_ADDED, widget };
};

// Remove widget action creator
export function RemoveWidget(widget: BaseWidget) {
    return { type: WidgetActionTypes.WIDGET_REMOVED, widget };
}

// Update widget action creator
export function UpdateWidget(widget: BaseWidget) {
    return { type: WidgetActionTypes.WIDGET_UPDATED, widget };
}

// TODO
export function LoadKitchenSuccess(kitchen: IPlannerState) {
    return { type: KitchenActionTypes.LOAD_KITCHEN_SUCCESS, kitchen };
}

// TODO
export function SaveKitchenSuccess(kitchen: IPlannerState) {
    return { type: KitchenActionTypes.SAVE_KITCHEN_SUCCESS, kitchen };
}

// TODO
export function UpdateKitchenSuccess(kitchen: IPlannerState) {
    return { type: KitchenActionTypes.UPDATE_KITCHEN_SUCCESS, kitchen };
}

// // TODO: WHAT THE THUNK!!!
// export function LoadKitchen() {
//     return (dispatch: any) => {
//         return getKitchens()
//             .then((kitchens) => {
//                 dispatch(LoadKitchenSuccess(kitchens));
//             })
//             .catch((error) => {
//                 throw error;
//             });
//     };
// }

// TODO: WHAT THE THUNK!!!
export const SaveKitchen = (kitchen: IPlannerState) => {
    return async (dispatch: Dispatch<KitchenActions>) => {
        try {
            const savedKitchen = await saveKitchen(kitchen); // API CALL !!!!!!
            return dispatch(SaveKitchenSuccess(savedKitchen));
        } catch (error) {
            throw error;
        }
    };
};

// // Interfaces for kitchen actions
// // Unit actions interfaces and types
// // - Unit added
// // - Unit removed
// // - Unit move (updated?)
// export interface IUnitAddedAction {
//     type: KitchenActionTypes.UNIT_ADDED;
//     unit: Unit;
// }
// export interface IUnitRemovedAction {
//     type: KitchenActionTypes.UNIT_REMOVED;
//     unit: Unit;
// }
// export interface IUnitUpdatedAction {
//     type: KitchenActionTypes.UNIT_UPDATED;
//     unit: Unit;
// }
// export type UnitAction = IUnitAddedAction | IUnitRemovedAction | IUnitUpdatedAction;
// // Worktop actions interfaces and types
// // - Worktop added
// // - Worktop removed
// // - Worktop move (updated?)
// export interface IWorktopAddedAction {
//     type: KitchenActionTypes.WORKTOP_ADDED;
//     worktop: WorkTop;
// }
// export interface IWorktopRemovedAction {
//     type: KitchenActionTypes.WORKTOP_REMOVED;
//     worktop: WorkTop;
// }
// export interface IWorktopUpdatedAction {
//     type: KitchenActionTypes.WORKTOP_UPDATED;
//     worktop: WorkTop;
// }
// export type WorktopAction = IWorktopAddedAction | IWorktopRemovedAction | IWorktopUpdatedAction;
// // WallUnit actions interfaces and types
// // - WallUnit added
// // - WallUnit removed
// // - WallUnit move (updated?)
// export interface IWallUnitAddedAction {
//     type: KitchenActionTypes.WALLUNIT_ADDED;
//     wallunit: WallUnit;
// }
// export interface IWallUnitRemovedAction {
//     type: KitchenActionTypes.WALLUNIT_REMOVED;
//     wallunit: WallUnit;
// }
// export interface IWallUnitUpdatedAction {
//     type: KitchenActionTypes.WALLUNIT_UPDATED;
//     wallunit: WallUnit;
// }
// export type WallUnitAction = IWallUnitAddedAction | IWallUnitRemovedAction | IWallUnitUpdatedAction;
// // Wall actions interfaces and types
// // - Wall added
// // - Wall removed
// // - Wall move (updated?)
// export interface IWallAddedAction {
//     type: KitchenActionTypes.WALL_ADDED;
//     wall: Wall;
// }
// export interface IWallRemovedAction {
//     type: KitchenActionTypes.WALL_REMOVED;
//     wall: Wall;
// }
// export interface IWallUpdatedAction {
//     type: KitchenActionTypes.WALL_UPDATED;
//     wall: Wall;
// }
// export type WallAction = IWallAddedAction | IWallRemovedAction | IWallUpdatedAction;
// // Kitchen action type definitions
// export type KitchenAction = UnitAction | WorktopAction | WallUnitAction | WallAction;
// // Action creator
// export function AddUnit(unit: Unit) {
//     return { type: KitchenActionTypes.UNIT_ADDED, unit };
// }
// // Action creator
// export function RemoveUnit(unit: BaseWidget) {
//     return { type: KitchenActionTypes.UNIT_REMOVED, unit };
// }
// // Action creator
// export function UpdateUnit(unit: BaseWidget) {
//     return { type: KitchenActionTypes.UNIT_UPDATED, unit };
// }
// // Action creator
// export function AddWallunit(wallunit: BaseWidget) {
//     return { type: KitchenActionTypes.WALLUNIT_ADDED, wallunit };
// }
// // Action creator
// export function RemoveWallunit(wallunit: BaseWidget) {
//     return { type: KitchenActionTypes.WALLUNIT_REMOVED, wallunit };
// }
// // Action creator
// export function UpdateWallunit(wallunit: BaseWidget) {
//     return { type: KitchenActionTypes.WALLUNIT_UPDATED, wallunit };
// }
// // Action creator
// export function AddWall(wall: BaseWidget) {
//     return { type: KitchenActionTypes.WALL_ADDED, wall };
// }
// // Action creator
// export function RemoveWall(wall: BaseWidget) {
//     return { type: KitchenActionTypes.WALL_REMOVED, wall };
// }
// // Action creator
// export function UpdateWall(wall: BaseWidget) {
//     return { type: KitchenActionTypes.WALL_UPDATED, wall };
// }
// // Action creator
// export function AddWorktop(worktop: BaseWidget) {
//     return { type: KitchenActionTypes.WORKTOP_ADDED, worktop };
// }
// // Action creator
// export function RemoveWorktop(worktop: BaseWidget) {
//     return { type: KitchenActionTypes.WORKTOP_REMOVED, worktop };
// }
// // Action creator
// export function UpdateWorktop(worktop: BaseWidget) {
//     return { type: KitchenActionTypes.WORKTOP_UPDATED, worktop };
// }
