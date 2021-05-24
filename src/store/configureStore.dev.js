import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createHashHistory} from 'history';
import {routerMiddleware, routerActions} from 'connected-react-router';
import {createLogger} from 'redux-logger';
import createRootReducer from '../reducers';

const history = createHashHistory();
const rootReducer = createRootReducer(history);

// eslint-disable-next-line no-unused-vars
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-underscore-dangle */
/*eslint-disable no-undef*/
const configureStore = () => {
    const middleware = [];
    const enhancers = [];

	 middleware.push(thunk);

    const logger = createLogger({
        level:     'info',
        collapsed: true
    });

    if (process.env.NODE_ENV !== 'test') {
        middleware.push(logger);
    }

    const router = routerMiddleware(history);
    middleware.push(router);
    const actionCreators = {
        ...routerActions
    };

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            actionCreators
		  })
        : compose;

    enhancers.push(applyMiddleware(...middleware));
    const enhancer = composeEnhancers(...enhancers);

    const store = createStore(rootReducer, {}, enhancer);
    if (module.hot) {
        module.hot.accept(
            '../reducers',
            () => store.replaceReducer(require('../reducers').default)
        );
    }

    return store;
};

export default {configureStore, history};
