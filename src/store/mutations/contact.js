import * as types from '../constants/types'

export const contactMutations = {
	[types.FETCH_CONTACT_REQ](state) {
		state.isFetching = true
	},
	[types.FETCH_CONTACT_SUC](state, action) {
		state.data = action.data;
		state.isFetching = false;
	},
	[types.FETCH_CONTACT_ERR](state, action) {
		state.error = action.error;
		state.isFetching = false;
	},
	[types.CLEAR_CONTACT_DATA](state) {
		state.data = [];
	}
}