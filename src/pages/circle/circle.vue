<template>
	<div class="topics-container">
		<transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
			<infoPage v-show="info.isInfoPageShow"></infoPage>
		</transition>
		<mu-flexbox class="login" orient="vertical" v-if="!login.data.success">
			<img class="img" src="../../assets/images/mountain.png" alt="">
			<p class="login-title">登录后可查看圈子</p>
			<div class="button-wrapper">
				<mu-raised-button label="登录" backgroundColor="#41b883" :fullWidth="true" @click="tapToLogin"></mu-raised-button>
			</div>
		</mu-flexbox>

		<div v-else>
			<div class="tabs-wrapper">
				<mu-tabs :value="activeTab" lineClass="active-line" @change="handleTabChange">
					<mu-tab value="resource" title="资源圈" />
					<mu-tab value="moments" title="朋友圈" />
				</mu-tabs>
			</div>
			<mu-refresh-control :refreshing="common.refresh.isShow" :trigger="trigger" @refresh="refresh" />
			<div class="gridlist-container" v-show="this.activeTab=='resource'">
				<mu-grid-list class="gridlist">
					<mu-grid-tile v-for="(item, index) in resource.data.resources" :key="index">
						<img :src="getImageUrl(item.profession)" @click="toResourceList(item.profession)" />
						<span slot="title" @click="toResourceList(item.profession)">{{item.profession}}</span>
						<span slot="subTitle" @click="toResourceList(item.profession)">热度 <b>{{item.count}}</b></span>
						<mu-icon-button icon="star_border" slot="action" />
					</mu-grid-tile>
				</mu-grid-list>
			</div>
			<mu-row gutter v-show="this.activeTab=='moments'">
				<mu-col class="c_menus" width="30" v-for="(item, index) in moments.data.moments" :key="index">
					<div class="d_menus" @click="toMoments(item.momentsId,item.momentsName)">
						<mu-avatar :src="item.momentsPhoto" class="topicMoreImg" />
						<br class="m_text">{{item.momentsName}}</br>
					</div>
				</mu-col>
			</mu-row>
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
	require('swiper/dist/css/swiper.css')
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookies'
	import noMoreData from '../../components/noMoreData/noMoreData'
	import infoPage from '../../components/infoPage/infoPage'
	import contentItem from '../../components/contentItem/contentItem'
	export default {
		components: {
			contentItem,
			infoPage,
			noMoreData
		},
		data() {
			return {
				open: false,
				activeTab: 'resource',
				scroller: null,
				trigger: null,
			}
		},
		mounted() {
			this.scroller = this.$el;
			this.trigger = this.$el;
		},
		created() {
			let tabSelected = getCookie('circle-tab-selected');
			if(tabSelected != null) {
				this.activeTab = tabSelected;
			}
			this.getLatestData();
		},
		computed: {
			...mapState([
				'topics',
				'info',
				'login',
				'common',
				'moments',
				'resource'
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
				'DEL_COLLECTED'
			]),

			handleTabChange(val) {
				this.activeTab = val;
				setCookie('circle-tab-selected', val);
				this.getLatestData();
			},

			refresh() {
				this.CLEAR_STATE_DATA();
				this.getCurrentTabData(this.activeTab, true);
			},

			getLatestData() {
				if(this.resource.data.resources.length === 0) {
					this.getResourceData(true);
				}
				if(this.moments.data.moments.length === 0) {
					this.getMomentsData(true);
				}
			},

			getResourceData(isRefresh) {
				this.$store.dispatch('fetchResourceAction', {
					isRefresh
				})
			},

			getMomentsData(isRefresh) {
				this.$store.dispatch('fetchMomentsAction', {
					isRefresh
				})
			},

			getCurrentTabData(tab, isRefresh) {
				switch(tab) {
					case 'resource':
						this.getResourceData(isRefresh);
						break;
					case 'moments':
						this.getMomentsData(isRefresh);
						break;
				}
			},

			toResourceList(profession) {
				setCookie('resource-listPage-to-detailPage', 0);
				this.$router.push({
					name: 'resourceList',
					params: {
						profession
					}
				});
			},

			toMoments(momentsId, momentsName) {
				this.$router.push({
					name: 'moments',
					params: {
						momentsId,
						momentsName
					}
				});
			},

			getImageUrl(profession) {
				var imageUrl = "";
				if(profession.indexOf("IT") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/it.png";
				else if(profession.indexOf("财务") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/caiwu.png";
				else if(profession.indexOf("采购") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/caigou.png";
				else if(profession.indexOf("传媒") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/chuanmei.png";
				else if(profession.indexOf("建筑") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/jianzhu.png";
				else if(profession.indexOf("服务业") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/fuwuye.png";
				else if(profession.indexOf("兼职") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/jianzhi.png";
				else if(profession.indexOf("金融") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/jinrong.png";
				else if(profession.indexOf("能源") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/nengyuan.png";
				else if(profession.indexOf("生产") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/shengchan.png";
				else if(profession.indexOf("项目") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/xiangmu.png";
				else if(profession.indexOf("销售") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/xiaoshou.png";
				else if(profession.indexOf("咨询") >= 0)
					imageUrl = "http://120.25.124.38:8080/GoFriends/resources/zixun.png";
				return imageUrl;
			},

			tapToLogin() {
				if(!this.login.data.success) {
					this.$router.replace({
						name: 'user'
					});
					this.$store.commit('HANDLE_CHANGE', 'user');
				}
			}
		}

	}
</script>

<style lang="scss">
	@import '../../assets/sass/_base.scss';
	.topics-container {
		position: relative;
		background: $ExtraLightGray;
		.login {
			margin-top: 2rem;
			.img {
				width: 1.5rem;
				height: 1.5rem;
			}
			.login-title {
				font-size: .32rem;
				color: $ExtraLightBlack;
			}
			.button-wrapper {
				width: 2.5rem;
			}
		}
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
		.m_text {
			font-size: .10rem;
			color: white;
		}
		.c_menus {}
		.d_menus {
			height: 100%;
			width: 100%;
			text-align: center;
			padding: 8px;
		}
		.topicMoreImg {
			width: 40px;
			height: 40px;
		}
		.gridlist-container {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
		.gridlist {
			width: 100%;
			overflow-y: auto;
		}
		.grid-item {
			width: 100%;
			height: 100%;
			background: transparent;
			overflow-y: auto;
		}
	}
</style>