import {
	momentsActions
} from '../actions/moments'
import {
	momentsMutations
} from '../mutations/moments'

const moments = {
	state: {
		isFetching: false,
		noMoreData: false,
		errData: false,
		error: '',
		data: {
			moments: [],
			momentActivity: []
		}
	},
	mutations: momentsMutations,
	actions: momentsActions
}

export default moments;