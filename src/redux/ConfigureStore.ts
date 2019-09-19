import * as Redux from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { RootReducer } from './reducers';

export const Store = ConfigureStore({});

function ConfigureStore(initialState: any) {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    return Redux.createStore(RootReducer, initialState, composeEnhancers(Redux.applyMiddleware(reduxImmutableStateInvariant())));
}
