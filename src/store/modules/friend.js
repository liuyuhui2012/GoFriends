import {
	friendActions
} from '../actions/friend'
import {
	friendMutations
} from '../mutations/friend'
import {
	friendGetters
} from '../getters/friend'
const friend = {
	state: {
		isFetching: false,
		noMoreData: false,
		errData: false,
		error: '',
		data: {
			frienddetail: null,
			user:null
		}
	},
	mutations: friendMutations,
	getters:friendGetters,
	actions: friendActions
}

export default friend;