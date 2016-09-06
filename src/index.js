import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import hydraApp from './reducers';
import App from './components/App';

const loggerMiddleware = createLogger();

let store = createStore(
    hydraApp,
    compose(
        applyMiddleware(thunkMiddleware, loggerMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
<Provider store={store}>
    <App/>
    </Provider>,
    document.getElementById('app')
);