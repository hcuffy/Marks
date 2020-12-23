import React from 'react';
import {render} from 'react-dom';
import './i18n';
import {Root} from './containers';
import './App.global.css';
import {configureStore, history} from './store';

const store = configureStore();

render(
    <Root store={store} history={history} />,
    // eslint-disable-next-line no-undef
    document.getElementById('root')

);
