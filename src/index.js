import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import LocationListener from './LocationListener';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 



ReactDOM.render(
    <BrowserRouter>
        <LocationListener>
            <App />
        </LocationListener>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
