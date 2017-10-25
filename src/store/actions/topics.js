import * as types from '../constants/types'
import axios from 'axios'
import {
	getCookie
} from '../../assets/js/cookies.js'

export const topicsActions = {
	/**
	 * 请求首页活动列表数据
	 * @type  {get}
	 * @param {tab} [String]        主题类型
	 * @param {page} [Number]       分页
	 * @param {limit} [Number]      每次请求获取数据个数
	 * @param {isRefresh} [Boolean] 请求是否是刷新请求，默认 false
	 */
	fetchTopicsAction({
		commit,
		state
	}, params) {
		let isRefresh = params.isRefresh || false;
		let userId = getCookie('userId');
		if(!isRefresh) {
			commit(types.FETCH_TOPICS_REQ);
		} else {
			commit(types.SHOW_REFRESH);
		};

		axios({
			method: 'get',
			url: 'selectRPartyRand',
			params: {
				tab: params.tab,
				page: params.page,
				limit: params.limit,
				userId: userId
			}
		}).then((res) => {
			let data = res.data.party,
				origin = state.data.allactivities,
				arr = [];
			// 累加数组
			arr = origin.concat(data);
			//推荐活动
			var recommendActivities = [];
			for(var i = 0; i < data.length; i++) {
				let activity = new Object();
				activity = data[i];
				if(activity.partyStatus === 'recommend') {
					recommendActivities.push(activity);
				}
			}
			commit(types.HIDE_REFRESH);
			if(data.length > 0) {
				commit(types.FETCH_TOPICS_SUC, {
					allactivities: arr,
					recommendActivities:recommendActivities,
					isHaveNextPage:(res.data.pageIndex<res.data.pageSize)
				})
			} else {
				commit(types.TOGGLE_NO_MORE_DATA_STATE);
				commit(types.TOGGLE_ISFETCHING_STATE);
			}
		}).catch((error) => {
			commit(types.TOGGLE_ERROR_DATA_STATE);
			commit(types.FETCH_TOPICS_ERR, {
				error
			});
			console.log(error)
		})
	},

	/**
	 * 请求活动日程列表数据
	 * @type  {get}
	 * @param {userId}
	 * @param {date}
	 * @param {isRefresh} [Boolean] 请求是否是刷新请求，默认 false
	 */
	fetchTopicsByDateAction({
		commit,
		state
	}, params) {
		let isRefresh = params.isRefresh || false;
		let userId = getCookie('userId');
		if(!isRefresh) {
			commit(types.FETCH_ACTIVITY_DATE_REQ);
		} else {
			commit(types.SHOW_REFRESH);
		};

		axios({
			method: 'get',
			url: 'selectCRPartyByDate',
			params: {
				userId: userId,
				date: params.date
			}
		}).then((res) => {
			commit(types.HIDE_REFRESH);
			commit(types.FETCH_ACTIVITY_DATE_SUC, {
				data: res.data.party
			})
		}).catch((error) => {
			commit(types.TOGGLE_ERROR_DATA_STATE);
			commit(types.FETCH_ACTIVITY_DATE_ERR, {
				error
			});
			console.log(error)
		})
	}
}