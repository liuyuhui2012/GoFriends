import Vue from 'vue'
import Router from 'vue-router'
import topics from '../pages/topics/topics.vue'
import circle from '../pages/circle/circle.vue'
import user from '../pages/user/user.vue'
import message from '../pages/message/message.vue'
import resourceList from '../pages/resource/resourceList.vue'
import activitydetail from '../pages/activity/activitydetail.vue'
import moments from '../pages/circle/moments.vue'
import userdetail from '../pages/user/userdetail.vue'
import resourceDetail from '../pages/resource/resourceDetail.vue'
import frienddetail from '../pages/user/frienddetail.vue'
import messageList from '../pages/message/messageList.vue'

Vue.use(Router)

const routes = [{
	name: 'topics',
	path: '/topics/:title',
	component: topics
}, {
	name: 'circle',
	path: '/circle/:title',
	component: circle
}, {
	name: 'user',
	path: '/user/:title',
	component: user
}, {
	name: 'message',
	path: '/message/:title',
	component: message
}, {
	name: 'resourceList',
	path: '/resourceList/',
	component: resourceList
}, {
	name: 'activitydetail',
	path: '/activitydetail',
	component: activitydetail
}, {
	name: 'moments',
	path: '/moments',
	component: moments
}, {
	name: 'userdetail',
	path: '/userdetail',
	component: userdetail
}, {
	name: 'resourceDetail',
	path: '/resourceDetail',
	component: resourceDetail
}, {
	name:'frienddetail',
	path:'/frienddetail',
	component:frienddetail
},{
	name:'messageList',
	path:'/messageList',
	component:messageList
}]

const router = new Router({
	routes
})

router.push({
	name: 'topics',
	params: {
		title: '活动'
	}
})

export default router