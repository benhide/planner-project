import * as Redux from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/RootReducer';

// Configure the store
const ConfigureStore = (initState: Redux.DeepPartial<any> | undefined) => {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    const middleware = Redux.applyMiddleware(thunk, reduxImmutableStateInvariant());
    const enhancers = composeEnhancers(middleware);
    return Redux.createStore(rootReducer, initState, enhancers);
};

// The redux store
export const store = ConfigureStore({});
