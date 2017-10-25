import * as types from '../constants/types'
import axios from 'axios'
import {
	getCookie
} from '../../assets/js/cookies.js'

export const messageActions = {
	/**
	 * 获取已读和未读信息
	 * @type  {get}
	 * @param {accesstoken} [String] 
	 * @param {isRefresh} [Boolean]
	 */
	fetchMessageAction({
		commit,
		state,
		dispatch
	}, params) {
		let isRefresh = params.isRefresh || false;
		let userId = getCookie('userId');
		if(!isRefresh) {
			commit(types.FETCH_MSG_REQ);
		} else {
			commit(types.SHOW_REFRESH);
		}
		axios({
			method: 'get',
			url: 'messages',
			params: {
				userId: userId
			}
		}).then((res) => {
			commit(types.HIDE_REFRESH);
			commit(types.FETCH_MSG_SUC, {
				data: res.data.data
			})
		}).catch((error) => {
			commit(types.FETCH_MSG_ERR, {
				error
			})
			console.log(error);
		})
	},
	/**
	 * 获取通知与申请
	 * @param {userId} [String] 
	 * @param {isRefresh} [Boolean]
	 */
	fetchMessageListAction({
		commit,
		state,
		dispatch
	}, params) {
		let isRefresh = params.isRefresh || false;
		let userId = getCookie('userId');
		if(!isRefresh) {
			commit(types.FETCH_MSG_LIST_REQ);
		} else {
			commit(types.SHOW_REFRESH);
		}
		axios({
			method: 'get',
			url: 'selectMessage',
			params: {
				userId: userId
			}
		}).then((res) => {
			commit(types.HIDE_REFRESH);
			let messages = res.data.message;
			var Array = [];
			for(var i = 0; i < messages.length; i++) {
				let message = new Object();
				let messageDimension = messages[i].messageDimension;
				message.content = messageDimension.dimension;
				if(messageDimension.user != null) {
					message.headImage = messageDimension.user.userImage;
					message.title = messageDimension.user.userName;
				} else if(messageDimension.party != null) {
					message.headImage = messageDimension.party.partyPhoto;
					message.title = messageDimension.party.partyName;
				}
				Array.push(message);
			}
			commit(types.FETCH_MSG_LIST_SUC, {
				data: Array
			})
		}).catch((error) => {
			commit(types.FETCH_MSG_LIST_ERR, {
				error
			})
			console.log(error);
		})
	},
}