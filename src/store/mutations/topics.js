import * as types from '../constants/types'

export const topicsMutations = {
	[types.FETCH_TOPICS_REQ](state) {
		state.isFetching = true
	},
	[types.FETCH_TOPICS_SUC](state, action) {
		state.isFetching = false;
		state.data.allactivities = action.allactivities;
		state.data.recommendActivities = action.recommendActivities;
		state.data.isHaveNextPage = action.isHaveNextPage;
	},
	[types.FETCH_TOPICS_ERR](state, action) {
		state.isFetching = false;
		state.error = action.error;
	},

	[types.CLEAR_STATE_DATA](state) {
		state.data.allactivities = [];
		state.data.recommendActivities = [];
		state.data.isHaveNextPage = false;
	},

	[types.TOGGLE_NO_MORE_DATA_STATE](state) {
		state.noMoreData = !state.noMoreData
	},
	// 切换 '报错' 状态
	// ==============
	[types.TOGGLE_ERROR_DATA_STATE](state) {
		state.errData = !state.errData
	},
	// 切换 isFetching 状态
	// ===================
	[types.TOGGLE_ISFETCHING_STATE](state) {
		state.isFetching = !state.isFetching
	},

	[types.FETCH_ACTIVITY_DATE_REQ](state) {
		state.isFetching = true
	},
	[types.FETCH_ACTIVITY_DATE_SUC](state, action) {
		state.isFetching = false;
		state.data.calendarActivities = action.data
	},
	[types.FETCH_ACTIVITY_DATE_ERR](state, action) {
		state.isFetching = false;
		state.error = action.error;
	},
	// 清除 state 的数据
	// ===============
	[types.CLEAR_ACTIVITY_DATE_DATA](state) {
		state.data.calendarActivities = [];
	},
}