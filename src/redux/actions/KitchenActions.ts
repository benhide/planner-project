import { loadKitchen, saveKitchen } from '../../api/KitchenApi';
import { Kitchen } from '../../engine/Kitchen';
import { BaseWidget } from '../../engine/widgets/BaseWidget';
import { Unit } from '../../engine/widgets/Unit';
import { Wall } from '../../engine/widgets/Wall';
import { WallUnit } from '../../engine/widgets/WallUnit';
import { WorkTop } from '../../engine/widgets/Worktop';
import { DEFAULT_KITCHEN, DEFAULT_UNIT_TYPE, DEFAULT_WALLUNIT_TYPE, DEFAULT_WALL_TYPE, DEFAULT_WORKTOP_TYPE } from '../../utilities/Defaults';
import { IPlannerState } from '../../utilities/Interfaces';
import { KitchenActionTypes } from './ActionTypes';

// Load kitchen action
export const LoadKitchenSuccess = (kitchen: IPlannerState) => {
    Kitchen.getInstance().updateWidgets(populateWidgetArray(kitchen));
    return { type: KitchenActionTypes.LOAD_KITCHEN_SUCCESS, kitchen };
};

// Save kitchen action
export const SaveKitchenSuccess = (kitchen: IPlannerState) => {
    Kitchen.getInstance().updateWidgets(populateWidgetArray(kitchen));
    return { type: KitchenActionTypes.SAVE_KITCHEN_SUCCESS, kitchen };
};

// Save a kitchen thunk
export const SaveKitchen = (kitchen: IPlannerState, isNewKitchen: boolean) => {
    return async (dispatch: (arg0: { type: KitchenActionTypes; kitchen: IPlannerState }) => void) => {
        try {
            if (!isNewKitchen) {
                const savedKitchen = (await saveKitchen(kitchen)) as IPlannerState;
                dispatch(SaveKitchenSuccess(savedKitchen));
            } else {
                await saveKitchen(kitchen);
                dispatch(DeleteKitchen(DEFAULT_KITCHEN));
            }
        } catch (error) {
            throw error;
        }
    };
};

// Load kitchen thunk
export function LoadKitchen(id: number) {
    return async (dispatch: (arg0: { type: KitchenActionTypes; kitchen: IPlannerState }) => void) => {
        try {
            const loadedKitchen = (await loadKitchen(id)) as IPlannerState;
            dispatch(LoadKitchenSuccess(loadedKitchen));
        } catch (error) {
            throw error;
        }
    };
}

// Remove kitchen thunk
export function DeleteKitchen(kitchen: IPlannerState) {
    Kitchen.getInstance().resetWidgets();
    return { type: KitchenActionTypes.REMOVED_KITCHEN_SUCCESS, kitchen };
}

// Populate the kitchen array
const populateWidgetArray = (kitchen: IPlannerState): BaseWidget[] => {
    return kitchen.widgets.map((widget) => {
        if (widget.type === DEFAULT_UNIT_TYPE) {
            return new Unit(
                widget.dimensions.w,
                widget.dimensions.l,
                widget.position.x,
                widget.position.y,
                widget.zIndex,
                widget.id,
                widget.isScalable,
                widget.isRotatable,
                widget.type,
            );
        }
        if (widget.type === DEFAULT_WALLUNIT_TYPE) {
            return new WallUnit(
                widget.dimensions.w,
                widget.dimensions.l,
                widget.position.x,
                widget.position.y,
                widget.zIndex,
                widget.id,
                widget.isScalable,
                widget.isRotatable,
                widget.type,
            );
        }
        if (widget.type === DEFAULT_WALL_TYPE) {
            return new Wall(
                widget.dimensions.w,
                widget.dimensions.l,
                widget.position.x,
                widget.position.y,
                widget.zIndex,
                widget.id,
                widget.isScalable,
                widget.isRotatable,
                widget.type,
            );
        }
        if (widget.type === DEFAULT_WORKTOP_TYPE) {
            return new WorkTop(
                widget.dimensions.w,
                widget.dimensions.l,
                widget.position.x,
                widget.position.y,
                widget.zIndex,
                widget.id,
                widget.isScalable,
                widget.isRotatable,
                widget.type,
            );
        }
    }) as BaseWidget[];
};
