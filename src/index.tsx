import React from 'react';
import ReactDOM from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faClipboard, faDownload } from '@fortawesome/free-solid-svg-icons';

import 'typeface-bitter';
import 'typeface-raleway';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';

library.add(faClipboard, faDownload);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();