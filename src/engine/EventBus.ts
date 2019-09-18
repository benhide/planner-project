import { IEventSubscription, SubscriptionFn } from './Interfaces/IEventSubscription';

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
    export function subscribe(event: GameEvent, fn: SubscriptionFn): symbol {
        const id = Symbol();
        subscriptions.set(id, { event, fn });
        return id;
    }

    // Unsubscribe from an event
    export function unsubscribe(id: symbol) {
        subscriptions.delete(id);
    }

    // Publish the event
    // when an event is publish an x and y are sent
    export function publish(event: GameEvent, data: any) {
        [...subscriptions.values()].filter((e: IEventSubscription) => e.event === event).forEach((e) => e.fn(data));
    }
}
