import * as types from '../constants/types'

export const friendGetters = {
	[types.GETTER_FRIEND_DETAIL_USER](state) {
		return state.data.user;
	},
	[types.GETTER_FRIEND_DETAIL](state) {
		return state.data.frienddetail;
	}
	
}