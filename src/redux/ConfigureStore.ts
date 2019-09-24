import * as Redux from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { RootReducer } from './reducers';
import thunk from 'redux-thunk';
// import initialState from './reducers/IntialState';

// Configure the store
const ConfigureStore = (initState: any) => {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    return Redux.createStore(RootReducer, initState, composeEnhancers(Redux.applyMiddleware(thunk, reduxImmutableStateInvariant())));
};

// The redux store
// ******************************
// TODO: PASS IN INITIAL STATE??
// ******************************
export const store = ConfigureStore({});
