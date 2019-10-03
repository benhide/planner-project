import { Widgets } from '../../engine/Widgets';
import { BaseWidget } from '../../engine/widgets/BaseWidget';
import { KitchenActionTypes } from './ActionTypes';

// Add widget action creator
export const AddWidget = (widget: BaseWidget) => {
    Widgets.get().addWidget(widget);
    return { type: KitchenActionTypes.WIDGET_ADDED, widget };
};

// Remove widget action creator
export const RemoveWidget = (widget: BaseWidget) => {
    Widgets.get().removeWidget(widget);
    return { type: KitchenActionTypes.WIDGET_REMOVED, widget };
};

// Update widget action creator
export const UpdateWidget = (widget: BaseWidget) => {
    return { type: KitchenActionTypes.WIDGET_UPDATED, widget };
};
