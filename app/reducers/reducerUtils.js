import _ from 'lodash';

export const defaultStateUpdater = (state, action) => {
    return _.assign({}, state, action.payload);
};

export const modalStateUpdater = (state, action) => {
    const showModal = !state.showModal;

    return _.assign({}, state, {showModal}, action.payload);
};

export const reducerActionHandler = (state, action, handlers) => {
    const handler = handlers[action.type];

    if (handler) {
        return handler(state, action);
    } else {
        return state;
    }
};
