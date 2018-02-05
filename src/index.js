import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from './Routes'
import store from './store';
import DrawerUndockedExample from './Component/Navbar';
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <DrawerUndockedExample/>
            <Routes />
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
