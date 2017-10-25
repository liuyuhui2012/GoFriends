import * as types from '../constants/types'
import axios from 'axios'
import {
	getCookie
} from '../../assets/js/cookies.js'

export const activityActions = {
	/**
	 * 获取活动详情
	 * @type  {get}
	 * @param {userId} [String] 
	 * @param {isRefresh} [Boolean]
	 */
	fetchActivityAction({
		commit,
		state,
		dispatch
	}, params) {
		let userId = getCookie('userId');
		let isRefresh = params.isRefresh || false;
		if(!isRefresh) {
			commit(types.FETCH_ACTIVITY_REQ);
		} else {
			commit(types.SHOW_REFRESH);
		}
		axios({
			method: 'get',
			url: 'getPartyDetailWeb',
			params: {
				partyId: params.partyId,
				userId: userId
			}
		}).then((res) => {
			commit(types.HIDE_REFRESH);
			commit(types.FETCH_ACTIVITY_SUC, {
				data: res.data
			})
		}).catch((error) => {
			commit(types.FETCH_ACTIVITY_ERR, {
				error
			})
			console.log(error);
		})
	}
}