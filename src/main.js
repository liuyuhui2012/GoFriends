// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

// axios
import axios from 'axios'
//axios.defaults.baseURL = 'http://120.25.124.38:8080/GoFriends/'   // 开发环境
axios.defaults.baseURL = 'https://www.gofriends-tutu.com/GoFriends/' // 生产环境

// import css
import './assets/css/material-icons.css' // material-icons.css
import './assets/css/reset.css' // reset.css
import 'animate.css' // animate.css

// muse
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import store from './store/index'
/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: {
		App
	}
})