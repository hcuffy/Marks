import _ from 'lodash';

export function defaultStateUpdater(state, action) {
    return _.assign({}, state, action.payload);
}

export function modalStateUpdater(state, action) {
    const showModal = !state.showModal;

    return _.assign({}, state, {showModal}, action.payload);
}

export function reducerActionHandler(state, action, handlers) {
    const handler = handlers[action.type];

    if (handler) {
        return handler(state, action);
    } else {
        return state;
    }
}
