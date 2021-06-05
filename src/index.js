import React from 'react';
import ReactDOM from 'react-dom';

// main component
import App from './App';
import './index.css';
import { Provider } from './context/context';

ReactDOM.render(
    <Provider>
        <App />
    </Provider>, document.getElementById('root')
);