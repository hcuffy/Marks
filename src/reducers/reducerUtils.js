import _ from 'lodash';

export function defaultStateUpdater(state, action) {
    return _.assign({}, state, action.payload);
}

export function dialogStateUpdater(state, action) {
    const showDialog = !state.showDialog;

    return _.assign({}, state, {showDialog}, action.payload);
}

export function reducerActionHandler(state, action, handlers) {
    const handler = handlers[action.type];

    if (handler) {
        return handler(state, action);
    } else {
        return state;
    }
}
