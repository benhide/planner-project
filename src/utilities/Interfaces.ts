import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GameEvent } from '../engine/EventBus';
import { BaseWidget } from '../engine/widgets/BaseWidget';
import { KitchenActionTypes } from '../redux/actions/ActionTypes';

/************************
 *  EVENTBUS INTERFACES *
 ************************/

// An event subscription takes an event and a
// subscription function interface
export interface IEventSubscription {
    event: GameEvent;
    fn: SubscriptionFn;
}

// Event bus data object interface
export interface IEventBusData {
    x: number;
    y: number;
}

// Type declaration for subscription function
export type SubscriptionFn = (data: IEventBusData) => void;

/***********************
 *  WIDGET INTERFACES  *
 ***********************/

// Can widget be rendered interface
export interface IRenderable {
    draw(ctx: CanvasRenderingContext2D): void;
}

// Can widget be rotated interface
export interface IRotatable {
    readonly isRotatable: boolean;
}

// Can widget be scaled interface
export interface IScalable {
    readonly isScalable: boolean;
}

// Can widget be selected interface
export interface ISelectable {
    readonly isSelected: boolean;
}

// Widget info interface
export interface IWidgetInfo {
    readonly type: string;
    shortDescription: string;
    longDescription: string;
    colour: string;
    price: number;
    image: string;
}

/************************
 * COMPONENT INTERFACES *
 ************************/

// Basket item interface
export interface IItem {
    description: string;
    quanity: number;
    meteresSquared: number;
    price: number;
    total: number;
}

// Menu item interface
export interface IMenuItem {
    id: number;
    name: string;
}

// Dialog props interface
export interface IDeleteDialogProps {
    open: boolean;
    onClose: () => void;
    dispatch: ThunkDispatch<IPlannerState, void, Action<any>>;
}

// Save dialog props interface
export interface ISaveDialogProps {
    onClose: () => void;
    open: boolean;
    dispatch: ThunkDispatch<IPlannerState, void, Action<any>>;
    isNew: boolean;
}

// Load menu props interface
export interface ILoadDeleteMenuProps {
    loadItems: IMenuItem[];
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: ThunkDispatch<IPlannerState, void, Action<any>>;
}

// Add menu props interface
export interface IMenuProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: ThunkDispatch<IPlannerState, void, Action<any>>;
}

// Interface for the text field state
export interface IState {
    name: string;
}

// Interface for widget details props
export interface IWidgetDeatilsProps {
    widgetInfo: IWidgetInfo;
}

// Interface for widget options props
export interface IWidgetOptionsProps {
    widgetInfo: IWidgetInfo;
    onClose: () => void;
    open: boolean;
}

/**********************
 *  REDUX INTERFACES
 **********************/

// Widget added action interface
export interface IKitchenWidgetAddedAction {
    type: KitchenActionTypes.WIDGET_ADDED;
    widget: BaseWidget;
}

// Widget removed action interface
export interface IKitchenWidgetRemovedAction {
    type: KitchenActionTypes.WIDGET_REMOVED;
    widget: BaseWidget;
}

// Widget updated action interface
export interface IKitchenWidgetUpdatedAction {
    type: KitchenActionTypes.WIDGET_UPDATED;
    widget: BaseWidget;
}

// Kitchen loaded action interface
export interface IKitchenLoadedAction {
    type: KitchenActionTypes.LOAD_KITCHEN_SUCCESS;
    kitchen: IPlannerState;
}

// Kitchen saved action interface
export interface IKitchenSavedAction {
    type: KitchenActionTypes.SAVE_KITCHEN_SUCCESS;
    kitchen: IPlannerState;
}

// Kitchen removed action interface
export interface IKitchenRemovedAction {
    type: KitchenActionTypes.REMOVED_KITCHEN_SUCCESS;
    kitchen: IPlannerState;
}

// Kitchen action type declaration
export type KitchenActions =
    | IKitchenSavedAction
    | IKitchenLoadedAction
    | IKitchenRemovedAction
    | IKitchenWidgetAddedAction
    | IKitchenWidgetRemovedAction
    | IKitchenWidgetUpdatedAction;

// Planner state interface
export interface IPlannerState {
    id: number;
    name: string;
    widgets: BaseWidget[];
}

// Redux planner state interface
export interface IReduxPlannerState {
    kitchen: IPlannerState;
}

// Redux kitchen action interface
export interface IKitchenAction {
    type: KitchenActionTypes;
    kitchen: IPlannerState;
}

// Redux widget action interface
export interface IWidgetAction {
    type: KitchenActionTypes;
    widget: BaseWidget;
}
