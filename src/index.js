import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';

// main component
import App from './App';
import './index.css';
import { Provider } from './context/context';

ReactDOM.render(
    <SpeechProvider appId="28a573b5-47df-4f6c-90ea-c2ccf5250d7d" language="en-US" >
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>, document.getElementById('root')
);