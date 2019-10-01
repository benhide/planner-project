import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { GameEvent } from '../engine/EventBus';
import { BaseWidget } from '../engine/widgets/BaseWidget';
import { KitchenActionTypes } from '../redux/actions/ActionTypes';

/************************
 *  EVENTBUS INTERFACES *
 ************************/

// An event subscription takes an event and a
// subscription function
export interface IEventSubscription {
    event: GameEvent;
    fn: SubscriptionFn;
}

// Subscription function
export type SubscriptionFn = (data: object) => void;

/***********************
 *  WIDGET INTERFACES  *
 ***********************/

// Can widget be rendered
export interface IRenderable {
    draw(ctx: CanvasRenderingContext2D): void;
}

// Can widget be rotated
export interface IRotatable {
    isRotatable: boolean;
}

// Can widget be scaled
export interface IScalable {
    isScalable: boolean;
}

// Can widget be selected
export interface ISelectable {
    isSelected: boolean;
}

/************************
 * COMPONENT INTERFACES *
 ************************/

// Basket item interface
export interface IItem {
    desc: string;
    qty: number;
    m2: number;
    price: number;
    total: number;
}

// Menu item
export interface IMenuItem {
    id: number;
    name: string;
}

// Dialog props
export interface IDeleteDialogProps {
    open: boolean;
    onClose: () => void;
    dispatch: ThunkDispatch<IPlannerState, void, Action<any>>;
}

// Save dialog props
export interface ISaveDialogProps {
    onClose: () => void;
    open: boolean;
    dispatch: ThunkDispatch<IPlannerState, void, Action<any>>;
    isNew: boolean;
}

// Load menu props
export interface ILoadMenuProps {
    loadItems: IMenuItem[];
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: ThunkDispatch<IPlannerState, void, Action<any>>;
}

// Add menu props
export interface IMenuProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: ThunkDispatch<IPlannerState, void, Action<any>>;
}

// Interface for the text field state
export interface IState {
    name: string;
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

// Redux planner state
export interface IPlannerState {
    id: number;
    name: string;
    widgets: BaseWidget[];
}