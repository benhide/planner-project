import * as Redux from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/RootReducer';

// Configure the store
const ConfigureStore = (initState: Redux.DeepPartial<any> | undefined) => {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    return Redux.createStore(rootReducer, initState, composeEnhancers(Redux.applyMiddleware(thunk, reduxImmutableStateInvariant())));
};

// The redux store
export const store = ConfigureStore({});
