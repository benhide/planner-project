import { store } from '../redux/ConfigureStore';
import { IReduxPlannerState } from '../utilities/Interfaces';
import { Widgets } from './Widgets';

// Only select the top widget
export const selectTopWidget = (): void => {
    let top = -1;

    // Widgets from redux store
    const widgets = (store.getState() as IReduxPlannerState).kitchen.widgets;

    if (widgets.length > 0) {
        for (let pos = 0; pos < widgets.length; pos++) {
            if (Widgets.get().isSelected(pos)) {
                top = pos;
                Widgets.get().setSelected(pos, false);
            }
        }
        if (top >= 0) {
            Widgets.get().setSelected(top, true);
        }
    }
};

// Only remove the top widget
export const setTopWidgetAsDeleting = (): void => {
    let top = -1;

    // Widgets from redux store
    const widgets = (store.getState() as IReduxPlannerState).kitchen.widgets;

    if (widgets.length > 0) {
        for (let pos = 0; pos < widgets.length; pos++) {
            if (Widgets.get().isDeleting(pos)) {
                top = pos;
                Widgets.get().setDeleting(pos, false);
            }
        }
        if (top >= 0) {
            Widgets.get().setDeleting(top, true);
        }
    }
};

// Remove an widget
export const canDeleteWidget = (id: number): boolean => {
    // Widgets from redux store
    const widgets = (store.getState() as IReduxPlannerState).kitchen.widgets;
    for (let pos = 0; pos < widgets.length; pos++) {
        if (widgets[pos].id === id) {
            return true;
        }
    }
    return false;
};

// Only scale the top widgets (dont grab widgets below)
export const onlyScale = () => {
    // Widgets from redux store
    const widgets = (store.getState() as IReduxPlannerState).kitchen.widgets;
    let itemBeingScaled = false;

    for (let pos = 0; pos < widgets.length; pos++) {
        if (Widgets.get().isScaling(pos)) {
            itemBeingScaled = true;
        }
    }
    if (itemBeingScaled) {
         for (let pos = 0; pos < widgets.length; pos++) {
             Widgets.get().setSelected(pos, false);
         }
    }
};
