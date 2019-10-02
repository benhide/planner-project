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
            if (Widgets.getInstance().isSelected(pos)) {
                top = pos;
                Widgets.getInstance().setSelected(pos, false);
            }
        }
        if (top >= 0) {
            Widgets.getInstance().setSelected(top, true);
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
            if (Widgets.getInstance().isDeleting(pos)) {
                top = pos;
                Widgets.getInstance().setDeleting(pos, false);
            }
        }
        if (top >= 0) {
            Widgets.getInstance().setDeleting(top, true);
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
