import { GameEvent } from '../engine/EventBus';
import { BaseWidget } from '../engine/widgets/BaseWidget';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

// An event subscription takes an event and a
// subscription function
export interface IEventSubscription {
    event: GameEvent;
    fn: SubscriptionFn;
}

// Subscription function
export type SubscriptionFn = (data: object) => void;

// Can it be rendered
export interface IRenderable {
    draw(ctx: CanvasRenderingContext2D): void;
}

// Can it be rotated
export interface IRotatable {
    isRotatable: boolean;
}

// Can it be scaled
export interface IScalable {
    isScalable: boolean;
}

// Can it be selected
export interface ISelectable {
    isSelected: boolean;
}

// Basket item interface
export interface IItem {
    desc: string;
    qty: number;
    m2: number;
    price: number;
    total: number;
}

// Redux planner state
export interface IPlannerState {
    kitchen: IKitchen;
}

// TODO
export interface IKitchen {
    widgets: BaseWidget[];
    id: number;
    name: string;
}

// Menu item
export interface IMenuItem {
    id: number;
    name: string;
}

// Interface for dialog props
export interface IDialogProps {
    open: boolean;
    onClose: () => void;
    dispatch: ThunkDispatch<IPlannerState, void, Action<any>>;
}

// Interface for the text field state
export interface IState {
    name: string;
}
