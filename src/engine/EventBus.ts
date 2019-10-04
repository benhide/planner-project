import { IEventBusData, IEventSubscription, SubscriptionFn } from '../utilities/Interfaces';

// Type of event
export enum GameEvent {
    MouseClick,
    MouseMove,
    MouseUp,
    MouseDown,
}

// The event bus
export namespace EventBus {
    const subscriptions = new Map<symbol, IEventSubscription>();

    // Subscribe to the event
    // takes a game event and subscription function
    export const subscribe = (event: GameEvent, fn: SubscriptionFn): symbol => {
        const id = Symbol();
        subscriptions.set(id, { event, fn });
        return id;
    };

    // Unsubscribe from an event
    export const unsubscribe = (id: symbol): void => {
        subscriptions.delete(id);
    };

    // Publish the event
    // when an event is publish an x and y are sent
    export const publish = (event: GameEvent, data: IEventBusData): void => {
        [...subscriptions.values()].filter((e: IEventSubscription) => e.event === event).forEach((e) => e.fn(data));
    };
}
