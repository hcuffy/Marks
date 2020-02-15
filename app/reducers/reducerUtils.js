export const updateState = (state, action, propChange) => {
	return _.assign({}, state, action.payload, propChange)
}
