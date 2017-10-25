import { topicsMutations } from '../mutations/topics'
import { topicsActions } from '../actions/topics'

const topics = {
    state: {
        isFetching: false,
        noMoreData: false,
        errData: false,
        error: '',
        data: {
        	isHaveNextPage:false,
        	allactivities:[],
        	recommendActivities:[],
        	calendarActivities:[]
        }
    },
    mutations: topicsMutations,
    actions: topicsActions
}

export default topics