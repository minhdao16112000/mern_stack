import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./App.scss";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './store';
import LoadingScreen from './screens/LoadingScreen';

ReactDOM.render(
    <Provider store={store} >
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
