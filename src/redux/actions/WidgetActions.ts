import { BaseWidget } from '../../engine/widgets/BaseWidget';
import { KitchenActionTypes } from './ActionTypes';
import { Kitchen } from '../../engine/Kitchen';

// Add widget action creator
export const AddWidget = (widget: BaseWidget) => {
    Kitchen.getInstance().pushToWidgetArray(widget);
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
