import {
	resourceActions
} from '../actions/resource'
import {
	resourceMutations
} from '../mutations/resource'
import {
	resourceGetters
} from '../getters/resource'

const resource = {
	state: {
		isFetching: false,
		noMoreData: false,
		errData: false,
		error: '',
		data: {
			resources: [],
			resourceList: [],
			resourceDetail: null
		}
	},
	mutations: resourceMutations,
	getters:resourceGetters,
	actions: resourceActions
}

export default resource;