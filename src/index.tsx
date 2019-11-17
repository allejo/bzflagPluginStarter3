import 'typeface-bitter';
import 'typeface-raleway';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDown,
  faAngleRight,
  faClipboard,
  faDownload,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

library.add(faAngleDown, faAngleRight, faClipboard, faDownload, faPlus, faTrashAlt);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
