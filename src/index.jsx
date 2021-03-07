/* eslint-disable no-undef*/
import React from 'react';
import {render} from 'react-dom';

import {Root} from './containers';
import {configureStore, history} from './store';
import './App.global.css';
import './i18n';

const store = configureStore();

render(<Root store={store} history={history} />, document.getElementById('root'));
