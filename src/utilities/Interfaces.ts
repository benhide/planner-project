import { GameEvent } from '../engine/EventBus';
import { BaseWidget } from '../engine/widgets/BaseWidget';

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
