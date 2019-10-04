import { Widgets } from '../../engine/Widgets';
import { BaseWidget } from '../../engine/widgets/BaseWidget';
import { IWidgetAction } from '../../utilities/Interfaces';
import { KitchenActionTypes } from './ActionTypes';

// Add widget action creator
export const AddWidget = (widget: BaseWidget): IWidgetAction => {
    Widgets.get().addWidget(widget);
    return { type: KitchenActionTypes.WIDGET_ADDED, widget };
};

// Remove widget action creator
export const RemoveWidget = (widget: BaseWidget): IWidgetAction => {
    Widgets.get().removeWidget(widget);
    return { type: KitchenActionTypes.WIDGET_REMOVED, widget };
};

// Update widget action creator
export const UpdateWidget = (widget: BaseWidget): IWidgetAction => {
    return { type: KitchenActionTypes.WIDGET_UPDATED, widget };
};
