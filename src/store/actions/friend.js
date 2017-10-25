import * as types from '../constants/types'
import axios from 'axios'
import {
	getCookie
} from '../../assets/js/cookies.js'

export const friendActions = {
	/**
	 * 获取好友详情
	 */
	fetchFriendDetailAction({
		commit,
		state,
		dispatch
	}, params) {
		let isRefresh = params.isRefresh || false;
		let userId = getCookie('userId');
		if(!isRefresh) {
			commit(types.FETCH_FRIEND_DETAIL_REQ);
		} else {
			commit(types.SHOW_REFRESH);
		}
		axios({
			method: 'get',
			url: 'getUserDetailMessage',
			params: {
				userId: userId,
				currentlyUserId:params.friendId
			}
		}).then((res) => {
			commit(types.HIDE_REFRESH);
			commit(types.FETCH_FRIEND_DETAIL_SUC, {
				frienddetail: res.data
			})
		}).catch((error) => {
			commit(types.FETCH_FRIEND_DETAIL_ERR, {
				error
			})
			console.log(error);
		})
	}
}