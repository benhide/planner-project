import { deleteKitchen, loadKitchens, saveKitchen, loadKitchen } from '../../api/KitchenApi';
import { BaseWidget } from '../../engine/widgets/BaseWidget';
import { KitchenActionTypes, WidgetActionTypes } from './ActionTypes';
import { IKitchen } from '../../utilities/Interfaces';

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
export type KitchenActions = IKitchenSavedAction | IKitchenLoadedAction | IKitchensRemovedAction;

// Add widget action creator
export const AddWidget = (widget: BaseWidget) => {
    return { type: WidgetActionTypes.WIDGET_ADDED, widget };
};

// Remove widget action creator
export const RemoveWidget = (widget: BaseWidget) => {
    return { type: WidgetActionTypes.WIDGET_REMOVED, widget };
};

// Update widget action creator
export const UpdateWidget = (widget: BaseWidget) => {
    return { type: WidgetActionTypes.WIDGET_UPDATED, widget };
};

// // TODO
// export const LoadKitchensSuccess = (kitchens: IKitchen[]) => {
//     return { type: KitchenActionTypes.LOAD_KITCHENS_SUCCESS, kitchens };
// };

// TODO
export const LoadKitchenSuccess = (kitchen: IKitchen) => {
    return { type: KitchenActionTypes.LOAD_KITCHEN_SUCCESS, kitchen };
};

// TODO
export const SaveKitchenSuccess = (kitchen: IKitchen) => {
    return { type: KitchenActionTypes.SAVE_KITCHEN_SUCCESS, kitchen };
};

// TODO
export const RemovedKitchenSuccess = (id: number) => {
    return { type: KitchenActionTypes.REMOVED_KITCHEN_SUCCESS, id };
};

// TODO
export function SaveKitchen(kitchen: IKitchen) {
    return async (dispatch: (arg0: { type: KitchenActionTypes; kitchen: IKitchen; }) => void) => {
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
    return async (dispatch: (arg0: { type: KitchenActionTypes; kitchen: IKitchen; }) => void) => {
        try {
            const loadedKitchen = await loadKitchen(id);
            dispatch(LoadKitchenSuccess(loadedKitchen));
        } catch (error) {
            throw error;
        }
    };
}

// TODO
export function DeleteKitchen(id: number) {
    return async (dispatch: (arg0: { type: KitchenActionTypes; id: number; }) => void) => {
        try {
            dispatch(RemovedKitchenSuccess(id));
            return deleteKitchen(id);
        } catch (error) {
            throw error;
        }
    };
}

// export const SaveKitchen: ActionCreator<
//            ThunkAction<
//                Promise<IKitchensSavedAction>,
//                IPostPersonResult,
//                IPlannerState,
//                KitchenActions
//            >
//        > = (kitchen: IPlannerState) => {
//            return async (dispatch: Dispatch<KitchenActions>) => {
//                const postingPersonAction: IPostingPersonAction = {
//                    type: 'PostingPerson',
//                };
//                dispatch(postingPersonAction);
//                const result = await postPersonFromApi(person);
//                const postPersonAction: IPostedPersonAction = {
//                    type: 'PostedPerson',
//                    result,
//                };
//                return dispatch(postPersonAction);
//            };
//        };

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

// // TODO: WHAT THE THUNK!!!
// export const SaveKitchen = (kitchen: IPlannerState) => {
//     return async (dispatch: Dispatch<KitchenActions>) => {
//         try {
//             const savedKitchen = await saveKitchen(kitchen); // API CALL !!!!!!
//             return dispatch(SaveKitchenSuccess(savedKitchen));
//         } catch (error) {
//             throw error;
//         }
//     };
// };

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
