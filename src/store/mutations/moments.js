import * as types from '../constants/types'

export const momentsMutations = {
	//moments
	[types.FETCH_MOMENTS_REQ](state) {
		state.isFetching = true
	},
	[types.FETCH_MOMENTS_SUC](state, action) {
		state.data.moments = action.data;
		state.isFetching = false;
	},
	[types.FETCH_MOMENTS_ERR](state, action) {
		state.error = action.error;
		state.isFetching = false;
	},
	[types.CLEAR_MOMENTS_DATA](state) {
		state.data.moments = [];
	},
	//moments activity
	[types.FETCH_MOMENTS_ACTIVITY_REQ](state) {
		state.isFetching = true
	},
	[types.FETCH_MOMENTS_ACTIVITY_SUC](state, action) {
		state.momentActivity = action.data;
		state.isFetching = false;
	},
	[types.FETCH_MOMENTS_ACTIVITY_ERR](state, action) {
		state.error = action.error;
		state.isFetching = false;
	},
	[types.CLEAR_MOMENTS_ACTIVITY_DATA](state) {
		state.momentActivity = [];
	}
}