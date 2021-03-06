import * as subscription from '../utilities/Interfaces';

// Type of event
export enum GameEvent {
    MouseClick,
    MouseMove,
    MouseUp,
    MouseDown,
}

// The event bus
export namespace EventBus {
    const subscriptions = new Map<symbol, subscription.IEventSubscription>();

    // Subscribe to the event
    // takes a game event and subscription function
    export function subscribe(event: GameEvent, fn: subscription.SubscriptionFn): symbol {
        const id = Symbol();
        subscriptions.set(id, { event, fn });
        return id;
    }

    // Unsubscribe from an event
    export function unsubscribe(id: symbol): void {
        subscriptions.delete(id);
    }

    // Publish the event
    // when an event is publish an x and y are sent
    export function publish(event: GameEvent, data: object): void {
        [...subscriptions.values()].filter((e: subscription.IEventSubscription) => e.event === event).forEach((e) => e.fn(data));
    }
}
