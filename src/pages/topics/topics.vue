<template>
	<div class="topics-container">
		<transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
			<infoPage v-show="info.isInfoPageShow"></infoPage>
		</transition>
		<mu-flexbox class="login" orient="vertical" v-if="!login.data.success">
			<img class="img" src="../../assets/images/mountain.png" alt="">
			<p class="login-title">登录后可查看活动</p>
			<div class="button-wrapper">
				<mu-raised-button label="登录" backgroundColor="#41b883" :fullWidth="true" @click="tapToLogin"></mu-raised-button>
			</div>
		</mu-flexbox>
		<div v-if="login.data.success">
			<div class="tabs-wrapper">
				<mu-tabs :value="activeTab" lineClass="active-line" @change="handleTabChange">
					<mu-tab value="all" title="推荐活动" />
					<mu-tab value="super-calendar" title="超级日程" />
				</mu-tabs>
			</div>
			<mu-refresh-control :refreshing="common.refresh.isShow" :trigger="trigger" @refresh="refresh" />
			<div v-if="this.activeTab=='all'">
				<swiper class="swiper" :options="swiperOption" ref="mySwiper">
					<swiper-slide class="swiper-slide" v-for="(item, index) in topics.data.recommendActivities" :key="index">
						<span class="title">{{item.partyName}}</span>
						<img class="swiper-img" :src="item.partyPhoto" @click="toActivityDetail(item.partyId)" />
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
				<div class="content-wrapper">
					<content-item v-for="(item, index) in getSameCityActivities(topics.data.allactivities)" :list="item" :key="index"></content-item>
				</div>
				<mu-infinite-scroll v-if="topics.data.isHaveNextPage" loadingText="正在加载..." :scroller="scroller" :loading="topics.isFetching" @load="loadMore" />
			</div>

			<div v-if="this.activeTab=='super-calendar'">
				<calendar v-on:chose_day="clickday" v-on:is_today="clicktoday" v-on:change_month="change_date" mark_array="[1,2]" :is_hide_otherday=false></calendar>
				<div class="content-wrapper">
					<content-item v-for="(item, index) in topics.data.calendarActivities" :list="item" :key="index"></content-item>
				</div>
			</div>

			<noMoreData v-if="this.topics.noMoreData"></noMoreData>
		</div>
	</div>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookies'
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'
	require('swiper/dist/css/swiper.css')
	import infoPage from '../../components/infoPage/infoPage'
	import contentItem from '../../components/contentItem/contentItem'
	import noMoreData from '../../components/noMoreData/noMoreData'
	import calendar from '../../components/calendar/calendar'

	export default {
		components: {
			contentItem,
			noMoreData,
			infoPage,
			swiper,
			swiperSlide,
			calendar
		},
		data() {
			return {
				open: true,
				activeTab: 'all',
				scroller: null,
				page: 1,
				trigger: null,
				swiperOption: {
					notNextTick: true,
					autoplay: 3000,
					direction: 'horizontal',
					grabCursor: true,
					setWrapperSize: true,
					autoHeight: true,
					pagination: '.swiper-pagination',
					paginationClickable: true,
					mousewheelControl: true,
					observeParents: true,
					paginationType: 'bullets'
				},
				selectedDate: ''
			}
		},
		created() {
			let tabSelected = getCookie('topics-tab-selected');
			if(tabSelected != null) {
				this.activeTab = tabSelected;
			}
			this.getLatestActivities();
		},
		mounted() {
			this.scroller = this.$el;
			this.trigger = this.$el;
		},
		computed: {
			...mapState([
				'topics',
				'info',
				'login',
				'common'
			])
		},
		methods: {
			...mapMutations([
				'CLEAR_STATE_DATA',
				'TOGGLE_NO_MORE_DATA_STATE',
				'TOGGLE_ERROR_DATA_STATE',
				'SHOW_MAIN_OVERFLOW',
				'TOGGLE_INFO_PAGE_DISPLAY',
				'SUC_COLLECT',
				'DEL_COLLECTED',

				'CLEAR_ACTIVITY_DATE_DATA'
			]),
			handleTabChange(val) {
				this.activeTab = val;
				//记录该页面tab选择
				setCookie('topics-tab-selected', val);
			},

			/**
			 * 获取推荐、超级日程的最新活动列表数据
			 */
			getLatestActivities() {
				//如果推荐页面数据为空，则获取推荐活动列表数据 
				if(this.topics.data.allactivities.length === 0) {
					this.getAllParties(0,true);
					this.page = 1;
				}
				//如果超级日程数据为空，则获取超级日程表的列表数据
				if(this.topics.data.calendarActivities.length === 0) {
					this.getPartiesByDate(true, this.getCurrentDate());
				}
			},

			getAllParties(page,isRefresh) {
				this.$store.dispatch('fetchTopicsAction', {
					page,
					isRefresh
				})
			},

			getPartiesByDate(isRefresh, date) {
				this.$store.dispatch('fetchTopicsByDateAction', {
					isRefresh,
					date
				})
			},

			getSameCityActivities(activities) {
				var sameCityActivities = [];
				for(var i = 0; i < activities.length; i++) {
					let activity = new Object();
					activity = activities[i];
					if(activity.partyStatus === 'sameCity') {
						sameCityActivities.push(activity);
					}
				}
				return sameCityActivities;
			},

			loadMore() {
				if(!this.topics.isFetching && !this.topics.noMoreData) {
					this.page += 1;
					this.getAllParties(this.page,false);
				}
			},
			refresh() {
				switch(this.activeTab) {
					case 'all':
						{
							this.CLEAR_STATE_DATA();
							this.page = 1;
							this.getAllParties(0,true);
						}
						break;

					case 'super-calendar':
						{
							this.CLEAR_ACTIVITY_DATE_DATA();
							this.getPartiesByDate(true, this.getCurrentDate());
						}
						break;
				}

			},
			tapToLogin() {
				if(!this.login.data.success) {
					this.$router.replace({
						name: 'user'
					});
					this.$store.commit('HANDLE_CHANGE', 'user');
				}
			},
			toActivityDetail(partyId) {
				this.$router.push({
					name: 'activitydetail',
					params: {
						partyId
					}
				});
			},
			getCurrentDate() {
				var currentDate = new Date();
				var year = currentDate.getFullYear();
				var month = currentDate.getMonth() + 1;
				var yyyymm = year + "-" + month;
				return yyyymm;
			},
			clickday(data) {
				this.getSelectedDateActivities(data);
			},
			clicktoday(data) {
				//				this.getSelectedDateActivities(data);
			},
			change_date(data) {
				this.getSelectedDateActivities(data);
			},
			getSelectedDateActivities(data) {
				var arr = data.split('/');
				var year = arr[0]; //获取当前日期的年份
				var month = arr[1]; //获取当前日期的月份
				var yyyymm = year + "-" + month;
				this.getPartiesByDate(false, yyyymm);
			}
		}

	}
</script>

<style lang="scss">
	@import '../../assets/sass/_base.scss';
	.topics-container {
		position: relative;
		background: $ExtraLightGray;
		.mu-circle {
			border-top-color: $primary !important;
			border-right-color: $primary !important;
			border-left-color: $primary !important;
		}
		.title {
			margin-top: 10px;
			position: absolute;
			left: 0.266667rem;
			font-size: 16px;
			/*px*/
			color: #fff;
		}
		.swiper {
			width: 100%;
			height: 200px;
			background: #dedede;
		}
		.swiper-slide {
			width: 100%;
			height: 200px;
			background: #dedede;
		}
		.swiper-img {
			width: 100%;
			height: 200px;
		}
		.tabs-wrapper {
			width: 100%;
			height: 48px;
			.mu-tabs {
				position: fixed;
				top: 56px;
				background: #fff !important;
				.mu-tab-link {
					color: rgba(31, 45, 61, .7);
				}
				.mu-tab-active {
					font-size: .3rem;
					color: rgba(31, 45, 61, 1);
				}
			}
			.active-line {
				background: $primary !important;
			}
		}
		.mu-infinite-scroll {
			padding: .24rem 0;
			.mu-infinite-scroll-text {
				font-size: .28rem;
			}
		}
		.calendar-container {
			-webkit-font-smoothing: antialiased;
			margin: 0;
			padding: 0;
			font-size: 16px;
			font-family: 'Hiragino Sans GB', 'Microsoft Yahei', SimSun, Tahoma, Arial, Helvetica, STHeiti;
		}
		.to-top {
			position: fixed;
			top: 80%;
			left: 90%;
			transform: translate(-80%, -90%);
			width: 1rem;
			height: 1rem;
			background: url('../../assets/images/top.png')no-repeat;
			background-size: 100% 100%;
			background-color: #fff;
			border-radius: 1rem;
		}
		.login-title {
			font-size: .32rem;
			color: $ExtraLightBlack;
			margin-top: 10px;
		}
		.button-wrapper {
			margin-top: 20px;
			width: 2.5rem;
		}
	}
</style>