import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Basket } from './components/Basket';
import { NavBar } from './components/NavBar';
import { Planner } from './components/Planner';
import { ToolBox } from './components/ToolBox';
import { Store } from './redux/ConfigureStore';

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
