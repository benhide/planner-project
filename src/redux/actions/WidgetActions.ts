import { Widgets } from '../../engine/Widgets';
import { BaseWidget } from '../../engine/widgets/BaseWidget';
import { KitchenActionTypes } from './ActionTypes';

// Add widget action creator
export const AddWidget = (widget: BaseWidget) => {
    Widgets.getInstance().addWidget(widget);
    return { type: KitchenActionTypes.WIDGET_ADDED, widget };
};

// Remove widget action creator
export const RemoveWidget = (widget: BaseWidget) => {
    Widgets.getInstance().removeWidget(widget);
    return { type: KitchenActionTypes.WIDGET_REMOVED, widget };
};

// Update widget action creator
export const UpdateWidget = (widget: BaseWidget) => {
    return { type: KitchenActionTypes.WIDGET_UPDATED, widget };
};
