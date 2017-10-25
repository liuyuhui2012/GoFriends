import {
	contactActions
} from '../actions/contact'
import {
	contactMutations
} from '../mutations/contact'


const contact = {
	state: {
		isFetching: false,
		noMoreData: false,
		errData: false,
		error: '',
		data: []
	},
	mutations: contactMutations,
	actions: contactActions
}

export default contact;