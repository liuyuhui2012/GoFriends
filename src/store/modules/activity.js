import {
	activityActions
} from '../actions/activity'

import {
	activityMutations
} from '../mutations/activity'

const activity = {
	state: {
		isFetching: false,
		noMoreData: false,
		errData: false,
		error: '',
		data:{
			source:null,
			PartyPeoples:[],
			party:null,
			contacts:[],
			resource:[]
		}
	},
	actions:activityActions,
	mutations:activityMutations
}

export default activity;