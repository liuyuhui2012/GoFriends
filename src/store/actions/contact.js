import * as types from '../constants/types'
import axios from 'axios'
import { getCookie } from '../../assets/js/cookies.js'

export const contactActions = {
	/**
	 * 获取用户通信录
	 * @type  {get}
	 * @param {userId} [String] 
	 * @param {isRefresh} [Boolean]
	 */
	fetchContactAction({
		commit,
		state,
		dispatch
	}, params) {
		let isRefresh = params.isRefresh || false;
		let userId = getCookie('userId');
		if(!isRefresh) {
			commit(types.FETCH_CONTACT_REQ);
		} else {
			commit(types.SHOW_REFRESH);
		}
		axios({
			method: 'get',
			url: 'getUserFriendsByUserId',
			params: {
				userId:userId
			}
		}).then((res) => {
			commit(types.HIDE_REFRESH);
			commit(types.FETCH_CONTACT_SUC, {
				data: res.data.users
			})
		}).catch((error) => {
			commit(types.FETCH_CONTACT_ERR, {
				error
			})
			console.log(error);
		})
	}
}