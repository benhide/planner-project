import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { NavBar } from './components/NavBar';
import { Planner } from './components/Planner';
import { ToolBox } from './components/ToolBox';
import { store } from './redux/ConfigureStore';
import { theme } from './style/Styles';

// React render
ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <NavBar />
            <ToolBox />
            <Planner />
            <ToastContainer position="bottom-left" autoClose={2000} />
        </ThemeProvider>
    </Provider>,
    document.getElementById('App'),
);
