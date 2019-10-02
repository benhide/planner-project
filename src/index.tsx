import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Basket } from './components/Basket';
import { NavBar } from './components/NavBar';
import { Planner } from './components/Planner';
import { ToolBox } from './components/ToolBox';
import { store } from './redux/ConfigureStore';
import { WidgetOptions } from './components/WidgetOptions';

// React render
ReactDOM.render(
    <Provider store={store}>
        <NavBar />
        <ToolBox />
        <Basket />
        <Planner />
        {/* <WidgetOptions /> */}
        <ToastContainer position="bottom-left" autoClose={2000} />
    </Provider>,
    document.getElementById('App'),
);
