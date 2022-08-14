import { setAutoFreeze } from 'immer';
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'typeface-bitter';
import 'typeface-raleway';

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.scss';

// We're using immer to manipulate objects that are stored in state. However,
// not all objects are and immer's automatic freezing functionality can lead to
// problems for those that are not. So let's disable it.
//   https://immerjs.github.io/immer/freezing/
setAutoFreeze(false);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
