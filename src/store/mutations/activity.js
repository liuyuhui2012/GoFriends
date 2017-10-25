import * as types from '../constants/types'

export const activityMutations = {
	[types.FETCH_ACTIVITY_REQ](state) {
		state.isFetching = true
	},
	[types.FETCH_ACTIVITY_SUC](state, action) {
		state.data.source = action.data.source;
		state.data.PartyPeoples = action.data.PartyPeoples;
		state.data.party = action.data.party;
		state.data.contacts = action.data.contacts;
		state.data.resource=action.data.resource;
		state.isFetching = false;
	},
	[types.FETCH_ACTIVITY_ERR](state, action) {
		state.error = action.error;
		state.isFetching = false;
	},
	[types.CLEAR_ACTIVITY_DATA](state) {
		state.data.source = null;
		state.data.PartyPeoples = [];
		state.data.party = null;
		state.data.contacts = [];
		state.data.resource=[];
	}
}