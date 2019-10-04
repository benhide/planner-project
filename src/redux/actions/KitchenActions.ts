import { loadKitchen, saveKitchen } from '../../api/KitchenApi';
import { Widgets } from '../../engine/Widgets';
import { BaseWidget } from '../../engine/widgets/BaseWidget';
import { Unit } from '../../engine/widgets/Unit';
import { Wall } from '../../engine/widgets/Wall';
import { WallUnit } from '../../engine/widgets/WallUnit';
import { WorkTop } from '../../engine/widgets/Worktop';
import {
    DEFAULT_KITCHEN,
    UNIT_TYPE,
    WALLUNIT_TYPE,
    WALL_TYPE,
    WORKTOP_TYPE,
} from '../../utilities/Defaults';
import { IKitchenAction, IPlannerState } from '../../utilities/Interfaces';
import { KitchenActionTypes } from './ActionTypes';

// Load kitchen action
export const LoadKitchenSuccess = (kitchen: IPlannerState): IKitchenAction => {
    Widgets.get().updateWidgets(populateWidgetArray(kitchen));
    return { type: KitchenActionTypes.LOAD_KITCHEN_SUCCESS, kitchen };
};

// Save kitchen action
export const SaveKitchenSuccess = (kitchen: IPlannerState): IKitchenAction => {
    Widgets.get().updateWidgets(populateWidgetArray(kitchen));
    return { type: KitchenActionTypes.SAVE_KITCHEN_SUCCESS, kitchen };
};

// Save a kitchen thunk
export const SaveKitchen = (kitchen: IPlannerState, isNewKitchen: boolean) => {
    return async (dispatch: (arg0: IKitchenAction) => void) => {
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
    return async (dispatch: (arg0: IKitchenAction) => void) => {
        try {
            const loadedKitchen = (await loadKitchen(id)) as IPlannerState;
            dispatch(LoadKitchenSuccess(loadedKitchen));
        } catch (error) {
            throw error;
        }
    };
}

// Remove kitchen thunk
export function DeleteKitchen(kitchen: IPlannerState): IKitchenAction {
    Widgets.get().resetWidgets();
    return { type: KitchenActionTypes.REMOVED_KITCHEN_SUCCESS, kitchen };
}

// Populate the kitchen array
const populateWidgetArray = (kitchen: IPlannerState): BaseWidget[] => {
    return kitchen.widgets.map((widget) => {
        const { dimensions, position, zIndex, id, isScalable, isRotatable, type, widgetInfo } = widget;
        const { width, length } = dimensions;
        const { x, y } = position;

        // Setup new widget based on type
        switch (widget.type) {
            case UNIT_TYPE:
                return new Unit(width, length, x, y, zIndex, id, isScalable, isRotatable, type, widgetInfo);
            case WALLUNIT_TYPE:
                return new WallUnit(width, length, x, y, zIndex, id, isScalable, isRotatable, type, widgetInfo);
            case WALL_TYPE:
                return new Wall(width, length, x, y, zIndex, id, isScalable, isRotatable, type, widgetInfo);
            case WORKTOP_TYPE:
                return new WorkTop(width, length, x, y, zIndex, id, isScalable, isRotatable, type, widgetInfo);
        }
    }) as BaseWidget[];
};
