import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Basket } from './components/Basket';
import { NavBar } from './components/NavBar';
import { Planner } from './components/Planner';
import { ToolBox } from './components/ToolBox';
import { store } from './redux/ConfigureStore';

// React render
ReactDOM.render(
    (
        <Provider store={store}>
            <NavBar />
            <ToolBox />
            <Basket />
            <Planner />
        </Provider>
    ),
    document.getElementById('App'),
);
