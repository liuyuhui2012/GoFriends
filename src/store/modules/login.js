import {
	loginActions
} from '../actions/login'
import {
	loginMutations
} from '../mutations/login'
import {
	loginGetters
} from '../getters/login'

const login = {
	state: {
		// ----- fetching
		isFetching: false,
		// ----- data
		data: {
			success: false
		},
		userinfo: {
			avatar_url: '',
			collect_topics: [],
			create_at: '',
			loginname: '',
			recent_replies: [],
			recent_topics: [],
			score: 0,

			birthday: '',
			sex: '',
			easemobUserName: '',
			userMark: '',
			canSeeUserBirthday: false,
			userImage: '',
			marriage: '',
			integral: 0,
			inviteUser: 0,
			moNumber: '',
			userId: 0,
			userLocation: '',
			inviteCode: '',
			quickResponseCode: '',
			userName: '',
			weChat: '',
			easemobPassword: '',
			qq: ''
		}
	},
	mutations: loginMutations,
	getters: loginGetters,
	actions: loginActions
}

export default login