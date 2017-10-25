import * as types from '../constants/types'
import { setCookie, getCookie, delCookie } from '../../assets/js/cookies'
import axios from 'axios'

export const loginActions = {
    /**
     * 用户登录请求
     * @type  {post}
     * @param {account} [String] 用户登录token
     */
    fetchUserAction({ commit, state, dispatch }, params) {
        commit(types.FETCH_USER_REQ);
        axios({
            method: 'post',
            url: 'loginByPhoneNumber',
            params: {
                moNumber: params.account,
                password:params.pwd
            }
        }).then((res) => {
            // 显示登录成功提示     
            dispatch('showSnackbarAction', {
                msg: '登录成功',
                isWarn: false
            });
            // 将 account 缓存在 cookie 中
            setCookie('account', params.account);
			setCookie('userId',res.data.userId);
            // 提交获取的数据
            commit(types.FETCH_USER_SUC, {
                data: res.data
            });
        }).catch((error) => {
            dispatch('showSnackbarAction', {
                msg: '登录失败，请检查网络或账号是否正确',
                isWarn: true
            });
            commit(types.FETCH_USER_ERR, {
                error
            });
            console.log(error)
        })
    },
    /**
     * 请求用户详情数据
     * @type  {get}
     * @param {loginname} [String] 用户名 
     */
    fetchUserInfoAcrion({ commit, state }, params) {
        axios({
            method: 'get',
            url: 'user/' + params.loginname
        }).then((res) => {
            commit(types.COMMIT_USERINFO, {
                data: res.data.data
            })
        })
    }
}