import { GameEvent } from '..';

// An event subscription takes an event and a
// subscription function
export interface IEventSubscription {
    event: GameEvent;
    fn: SubscriptionFn;
}

export type SubscriptionFn = (data: object) => void;
