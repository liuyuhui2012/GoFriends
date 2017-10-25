import * as types from '../constants/types'
import axios from 'axios'
import { getCookie } from '../../assets/js/cookies.js'

export const momentsActions = {
	/**
	 * 获取用户朋友圈
	 * @type  {get}
	 * @param {userId} [String] 
	 * @param {isRefresh} [Boolean]
	 */
	fetchMomentsAction({
		commit,
		state,
		dispatch
	}, params) {
		let isRefresh = params.isRefresh || false;
		let userId = getCookie('userId');
		if(!isRefresh) {
			commit(types.FETCH_MOMENTS_REQ);
		} else {
			commit(types.SHOW_REFRESH);
		}
		axios({
			method: 'get',
			url: 'selectAllMomentsByUserId',
			params: {
				userId: userId,
			}
		}).then((res) => {
			commit(types.HIDE_REFRESH);
			commit(types.FETCH_MOMENTS_SUC, {
				data: res.data.moments
			})
		}).catch((error) => {
			commit(types.FETCH_MOMENTS_ERR, {
				error
			})
			console.log(error);
		})
	},

	/**
	 * 请求朋友圈活动列表数据
	 * @type  {get}
	 * @param {tab} [String]        主题类型
	 * @param {page} [Number]       分页
	 * @param {limit} [Number]      每次请求获取数据个数
	 * @param {isRefresh} [Boolean] 请求是否是刷新请求，默认 false
	 */
	fetchMomentsActivityAction({
		commit,
		state
	}, params) {
		let isRefresh = params.isRefresh || false;
		let userId = getCookie('userId');
		if(!isRefresh) {
			commit(types.FETCH_MOMENTS_ACTIVITY_REQ);
		} else {
			commit(types.SHOW_REFRESH);
		};
		axios({
			method: 'get',
			url: 'selectPartyByMomentsId',
			params: {
				momentsId: params.momentsId,
				page: params.page,
				userId: userId
			}
		}).then((res) => {
			let data = res.data.party,
				origin = state.data.momentActivity,
				arr = [];

			// 累加数组
			arr = origin.concat(data);

			commit(types.HIDE_REFRESH);
			console.log(arr);
			if(data.length > 0) {
				commit(types.FETCH_MOMENTS_ACTIVITY_SUC, {
					data: arr
				})
			} else {
				commit(types.TOGGLE_NO_MORE_DATA_STATE);
				commit(types.TOGGLE_ISFETCHING_STATE);
			}
		}).catch((error) => {
			commit(types.TOGGLE_ERROR_DATA_STATE);
			commit(types.FETCH_MOMENTS_ACTIVITY_ERR, {
				error
			});
			console.log(error);
		})
	}
}