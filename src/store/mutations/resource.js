import * as types from '../constants/types'

export const resourceMutations = {
	//resource
	[types.FETCH_RESOURCE_REQ](state) {
		state.isFetching = true
	},
	[types.FETCH_RESOURCE_SUC](state, action) {
		state.data.resources = action.resources;
		state.isFetching = false;
	},
	[types.FETCH_RESOURCE_ERR](state, action) {
		state.error = action.error;
		state.isFetching = false;
	},
	[types.CLEAR_RESOURCE_DATA](state) {
		state.data.resources = [];
	},

	//resourceList
	[types.FETCH_RESOURCE_LIST_REQ](state) {
		state.isFetching = true
	},
	[types.FETCH_RESOURCE_LIST_SUC](state, action) {
		state.data.resourceList = action.resourceList;
		state.isFetching = false;
	},
	[types.FETCH_RESOURCE_LIST_ERR](state, action) {
		state.error = action.error;
		state.isFetching = false;
	},
	[types.CLEAR_RESOURCE_LIST_DATA](state) {
		state.data.resourceList = [];
	},

	//resourceDetail
	[types.FETCH_RESOURCE_DETAIL_REQ](state) {
		state.isFetching = true
	},
	[types.FETCH_RESOURCE_DETAIL_SUC](state, action) {
		state.data.resourceDetail = action.resourceDetail;
		state.isFetching = false;
	},
	[types.FETCH_RESOURCE_DETAIL_ERR](state, action) {
		state.error = action.error;
		state.isFetching = false;
	},
	[types.CLEAR_RESOURCE_DETAIL_DATA](state) {
		state.data.resourceDetail = null;
	}
}