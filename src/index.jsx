/* eslint-disable no-undef*/
import React from 'react';
import {render} from 'react-dom';
import './i18n';
import {Root} from './containers';
import './App.global.css';
import {configureStore, history} from './store';

const store = configureStore();

render(<Root store={store} history={history} />, document.getElementById('root'));
