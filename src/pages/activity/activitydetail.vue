<template>
	<div id="container">
		<mu-appbar :title="this.title">
			<mu-icon-button icon="arrow_back" slot="left" @click="routerBack" />
			<mu-icon-button icon="share" slot="right" />
		</mu-appbar>
		<div class="main">
			<mu-refresh-control :refreshing="common.refresh.isShow" :trigger="trigger" @refresh="refresh" />
			<!--Swiper-->
			<swiper v-if="activity.data.party.PartyPhotos!=null" class="swiper" :options="swiperOption" ref="mySwiper">
				<!-- slides -->
				<swiper-slide class="swiper-slide" v-for="(item, index) in activity.data.party.PartyPhotos" :key="index">
					<img class="swiper-img" :src="item.PartyPhoto" />
				</swiper-slide>
				<!-- Optional controls -->
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>

			<mu-flexbox class="action-wrapper" orient="vertical">
				<mu-flexbox orient="vertical" class="action-wrapper">
					<!--item-->
					<mu-flexbox class="action-item">
						<div class="main-title">
							{{activity.data.party.partyName}}
						</div>
					</mu-flexbox>

					<!--item-->
					<mu-flexbox class="action-item">
						<mu-icon value="timer" :size="20" style="color: #00b1fe"></mu-icon>
						<div class="title">
							{{activity.data.party.partyDate}} 至 {{activity.data.party.partyDateEnd}}
						</div>
					</mu-flexbox>

					<!--item-->
					<mu-flexbox class="action-item">
						<mu-icon value="map-marker" :size="20" style="color: #f86161"></mu-icon>
						<div class="title">
							{{activity.data.party.partyAddress}}
						</div>
					</mu-flexbox>
				</mu-flexbox>
			</mu-flexbox>
			<mu-flexbox class="action-wrapper" orient="vertical">
				<mu-flexbox orient="vertical" class="action-wrapper">
					<!--item-->
					<mu-flexbox class="action-item2">
						<div class="title">活动来源</div>
					</mu-flexbox>
					<mu-flexbox class="activityinfo">
						<!--avatar-->
						<div class="avatar">
							<img :src="activity.data.source.sourcePhoto">
						</div>

						<div class="title1">{{activity.data.source.sourceName}}</div>
					</mu-flexbox>
				</mu-flexbox>
			</mu-flexbox>

			<mu-flexbox class="action-wrapper" orient="vertical">
				<mu-flexbox orient="vertical" class="action-wrapper">
					<!--item-->
					<mu-flexbox class="action-item2">
						<div class="title">参与者</div>
					</mu-flexbox>
					<mu-row>
						<mu-col class="c_menus" width="25" v-for="(item, index) in activity.data.PartyPeoples" :key="index">
							<div class="d_menus" @click="toFriendDetail(item.userId)">
								<mu-avatar :src="item.userImage" class="topicMoreImg" />
								<br class="m_text">{{item.userName}}</br>
							</div>
						</mu-col>
					</mu-row>
				</mu-flexbox>
			</mu-flexbox>

			<mu-flexbox class="action-wrapper" orient="vertical">
				<mu-flexbox orient="vertical" class="action-wrapper">
					<!--item-->
					<mu-flexbox class="action-item2">
						<div class="title">资源分布</div>
					</mu-flexbox>
					<schart :canvasId="canvasId" :type="type" :width="width" :height="height" :data="refreshChartData(this.data,activity.data.resource)" :options="options"></schart>
				</mu-flexbox>
			</mu-flexbox>

			<mu-flexbox class="action-wrapper" orient="vertical">
				<mu-flexbox orient="vertical" class="action-wrapper">
					<!--item-->
					<mu-flexbox class="action-item2">
						<div class="title">活动内容</div>
					</mu-flexbox>

					<mu-flexbox class="partyIntroduce-container" justify="center" v-html=activity.data.party.partyIntroduce>
					</mu-flexbox>

				</mu-flexbox>
			</mu-flexbox>
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
	import Schart from 'vue-schart'
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'
	require('swiper/dist/css/swiper.css')
	export default {
		components: {
			swiper,
			swiperSlide,
			Schart
		},
		computed: {
			...mapState([
				'common',
				'activity'
			]),
		},
		mounted() {
			this.trigger = this.$el;
		},
		data() {
			return {
				title: '活动详情',
				trigger: null,
				scroller: null,
				swiperOption: { //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
					// notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
					notNextTick: true,
					// swiper configs 所有的配置同swiper官方api配置
					autoplay: 3000,
					direction: 'horizontal',
					grabCursor: true,
					setWrapperSize: true,
					autoHeight: true,
					pagination: '.swiper-pagination',
					paginationClickable: true,
					mousewheelControl: true,
					observeParents: true,
					paginationType: 'fraction'
				},

				canvasId: 'myCanvas',
				type: 'ring',
				width: document.body.clientWidth,
				height: 300,
				data: [],
				options: {
					bgColor: '#ffffff', // 默认背景颜色
					title: '', // 图表标题
					titleColor: '#000000', // 图表标题颜色
					titlePosition: 'top', // 图表标题位置: top / bottom
					legendColor: '#000000', // 图例文本颜色
					legendTop: 40, // 图例距离顶部的长度
					colorList: ['#1E9FFF', '#13CE66', '#F7BA2A', '#FF4949', '#72f6ff'], // 环形图颜色列表
					radius: 100, // 环形图外圆半径
					innerRadius: 80 // 环形图内圆半径
				},

				partyId: null
			}
		},
		created() {
			let partyId = this.$route.params.partyId;
			this.partyId = partyId;
			this.refresh();
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
			refresh() {
				this.CLEAR_STATE_DATA();
				this.http(true, this.partyId);
			},
			http(isRefresh, partyId) {
				this.$store.dispatch('fetchActivityAction', {
					isRefresh,
					partyId
				})
			},
			routerBack() {
				if(this.$store.state.sessionToken) {
					if(this.$store.state.isFirst) {
						this.setIsFirst(false);
						this.$router.go(-1);
						this.$router.go(-1);
					} else {
						this.$router.go(-1)
					}
				} else {
					this.$router.go(-1)
				}
			},
			refreshChartData(data, resources) {
				var Array = [];
				for(var i = 0; i < resources.length; i++) {
					data = new Object();
					data.name = resources[i].profession;
					data.value = resources[i].count;

					Array.push(data);
				}
				return Array;
			},
			toFriendDetail(friendId) {
				this.$router.push({
					name: 'frienddetail',
					params: {
						friendId: friendId
					}
				});
			},
		}
	}
</script>
<style lang="scss">
	@import '../../assets/sass/_base.scss';
	#container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.main {
			flex: 1;
			width: 100%;
			overflow-x: hidden;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
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
			.action-wrapper {
				background: #fff;
				border-top: 1px solid $LightGray;
				border-bottom: 1px solid $LightGray;
				.action-item {
					position: relative;
					height: .88rem;
					padding-left: .24rem;
					box-sizing: border-box;
					.main-title {
						font-weight: bold;
						flex: 1;
						height: 100%;
						margin-left: .10rem;
						border-bottom: 1px solid $LightGray;
						display: flex;
						align-items: center;
						font-size: .32rem;
					}
					.title {
						flex: 1;
						height: 100%;
						margin-left: .16rem;
						border-bottom: 1px solid $LightGray;
						display: flex;
						align-items: center;
						font-size: .28rem;
					}
					.count {
						position: absolute;
						top: 50%;
						right: 24px;
						transform: translate3d(0, -50%, 0);
						width: .4rem;
						height: .4rem;
						line-height: .4rem;
						text-align: center;
						font-size: .2rem;
						color: $LightBlack;
						border-radius: 100%;
						background: $LightGray;
					}
					&:last-child .title {
						border-bottom: none;
					}
				}
				.action-item2 {
					position: relative;
					height: .68rem;
					padding-left: .24rem;
					box-sizing: border-box;
					.title {
						flex: 1;
						font-weight: bold;
						height: 100%;
						margin-left: .10rem;
						display: flex;
						align-items: center;
						font-size: .28rem;
					}
				}
				.activityinfo {
					width: 100%;
					height: 1.2rem;
					padding: 0 .24rem;
					box-sizing: border-box;
					background: #fff;
					margin-bottom: 10px;
					.avatar {
						width: .96rem;
						height: .96rem;
						overflow: hidden;
						border-radius: 4px;
						border-bottom: 1rem;
						background: $ExtraLightGray;
						img {
							width: .96rem;
							height: .96rem;
						}
					}
					.title1 {
						flex: 1;
						height: 100%;
						margin-left: .50rem;
						display: flex;
						align-items: center;
						font-size: .28rem;
					}
				}
				.demo-badge-content {
					padding: 12px;
					.mu-badge {
						background-color: inherit;
						color: inherit;
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
				.partyIntroduce-container {
					margin-left: 12px;
					margin-right: 12px;
					display: inline-block;
					*display: inline;
					*zoom: 1;
					white-space: nowrap;
					word-break: keep-all;
				}
			}
		}
		.hide-overflow {
			overflow: hidden;
		}
	}
</style>