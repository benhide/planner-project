import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Basket, ToolBox, NavBar, Planner } from './components';
import { ConfigureStore } from './redux/ConfigureStore';

export const Store = ConfigureStore({});

ReactDOM.render(
    (
        <Provider store={Store}>
            <NavBar />
            <ToolBox />
            <Basket />
            <Planner />
        </Provider>
    ),
    document.getElementById('App'),
);
