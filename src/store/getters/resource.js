import * as types from '../constants/types'

export const resourceGetters = {
	[types.GETTER_RESOURCE_DETAIL_DATA](state) {
		return state.data.resourceDetail;
	}
}