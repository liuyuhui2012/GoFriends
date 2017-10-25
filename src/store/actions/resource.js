import * as types from '../constants/types'
import axios from 'axios'
import {
	getCookie
} from '../../assets/js/cookies.js'

export const resourceActions = {
	/**
	 * 获取用户资源圈
	 * @type  {get}
	 * @param {userId} [String] 
	 * @param {isRefresh} [Boolean]
	 */
	fetchResourceAction({
		commit,
		state,
		dispatch
	}, params) {
		let isRefresh = params.isRefresh || false;
		let userId = getCookie('userId');
		if(!isRefresh) {
			commit(types.FETCH_RESOURCE_REQ);
		} else {
			commit(types.SHOW_REFRESH);
		}
		axios({
			method: 'get',
			url: 'selectCountResource',
			params: {
				userId: userId
			}
		}).then((res) => {
			commit(types.HIDE_REFRESH);
			commit(types.FETCH_RESOURCE_SUC, {
				resources: res.data.resource
			})
		}).catch((error) => {
			commit(types.FETCH_RESOURCE_ERR, {
				error
			})
			console.log(error);
		})
	},

	/**
	 * 获取用户某类资源列表
	 * @type  {get}
	 * @param {userId} [String] 
	 * @param {isRefresh} [Boolean]
	 */
	fetchResourceListAction({
		commit,
		state,
		dispatch
	}, params) {
		let isRefresh = params.isRefresh || false;
		let userId = getCookie('userId');
		if(!isRefresh) {
			commit(types.FETCH_RESOURCE_LIST_REQ);
		} else {
			commit(types.SHOW_REFRESH);
		}
		axios({
			method: 'post',
			url: 'selectResourceByProfession',
			params: {
				userId: userId,
				profession: params.profession,
				type: params.type
			}
		}).then((res) => {
			commit(types.HIDE_REFRESH);
			commit(types.FETCH_RESOURCE_LIST_SUC, {
				resourceList: res.data.resource
			})
		}).catch((error) => {
			commit(types.FETCH_RESOURCE_LIST_ERR, {
				error
			})
			console.log(error);
		})
	},

	/**
	 * 获取用户某类资源列表
	 * @type  {get}
	 * @param {userId} [String] 
	 * @param {isRefresh} [Boolean]
	 */
	fetchResourceDetailAction({
		commit,
		state,
		dispatch
	}, params) {
		let isRefresh = params.isRefresh || false;
		let userId = getCookie('userId');
		axios({
			method: 'get',
			url: 'selectResourceDetails',
			params: {
				userId: userId,
				currentlyUserId: params.currentlyUserId,
				resourceId: params.resourceId
			}
		}).then((res) => {
			commit(types.HIDE_REFRESH);
			commit(types.FETCH_RESOURCE_DETAIL_SUC, {
				resourceDetail: res.data.resource
			})
		}).catch((error) => {
			commit(types.FETCH_RESOURCE_DETAIL_ERR, {
				error
			})
			console.log(error);
		})
	}
}