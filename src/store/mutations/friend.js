import * as types from '../constants/types'

export const friendMutations = {
	[types.FETCH_FRIEND_DETAIL_REQ](state) {
		state.isFetching = true
	},
	[types.FETCH_FRIEND_DETAIL_SUC](state, action) {
		state.data.frienddetail = action.frienddetail;
		state.data.user = action.frienddetail.user;
		state.isFetching = false;
	},
	[types.FETCH_FRIEND_DETAIL_ERR](state, action) {
		state.error = action.error;
		state.isFetching = false;
	},
	[types.CLEAR_FRIEND_DETAIL_DATA](state) {
		state.data.frienddetail = null;
		state.data.user = null;
	}
}