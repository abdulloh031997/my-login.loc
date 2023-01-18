import React from 'react';
import './index.css';
import App from './App';
import * as ReactDOMClient from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const store = createStore(reducers, applyMiddleware(thunk));
const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
reportWebVitals();
