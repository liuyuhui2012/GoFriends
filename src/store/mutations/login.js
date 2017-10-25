import * as types from '../constants/types'

export const loginMutations = {
	[types.FETCH_USER_REQ](state) {
		state.isFetching = true
	},
	[types.FETCH_USER_SUC](state, action) {
		state.isFetching = false;
		state.data.success = (action.data.status == 0);
		state.userinfo = action.data.user;
	},
	[types.FETCH_USER_ERR](state, action) {
		state.isFetching = false;
		state.data.success = false;
		state.error = action.error;
	},
	[types.COMMIT_USERINFO](state, action) {
		state.userinfo = action.data
	},
	[types.LOGOUT](state) {
		state.data.success = false;
	}
}