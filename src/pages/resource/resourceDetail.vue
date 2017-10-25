<template>
	<div id="container">
		<mu-appbar :title="this.title">
			<mu-icon-button icon="arrow_back" slot="left" @click="routerBack" />
			<mu-icon-button icon="star" slot="right" />
		</mu-appbar>
		<div class="main">
			<mu-flexbox class="userinfo-wrapper" orient="vertical" key="is-login">
				<!--info-->
				<mu-flexbox class="userinfo">
					<!--avatar-->
					<div class="avatar">
						<img :src="this.userImage" alt="">
					</div>
					<div class="info" @click="toFriendDetail()">
						<div class="username">{{this.userName}}</div>
						<div class="userid">ID: {{this.userMark}}</div>
						<div class="userid">点赞: {{this.hotCount}}</div>
						<mu-flexbox class="score" justify="center">
							<mu-icon value="stars" color="rgb(252, 192, 21)" :size="18"></mu-icon>
							<div>&nbsp</div>
						</mu-flexbox>
						<mu-icon value="navigate_next" style="position: absolute;top: 50%;right: 0;transform: translate3d(0, -50%, 0);color: #D3DCE6"></mu-icon>
					</div>
				</mu-flexbox>

				<mu-flexbox orient="vertical" class="action-wrapper">
					<!--item-->
					<mu-flexbox class="action-item">
						<div class="title">
							关系网
						</div>
						<div class="content" v-if="this.friendStatus==='friends'">好友</div>
						<div class="content" v-if="this.friendStatus==='tfriends'">二度好友</div>
					</mu-flexbox>

					<!--item-->
					<mu-flexbox class="action-item-1">
						<div class="title">
							交友圈
						</div>
					</mu-flexbox>

					<mu-flexbox orient="vertical" v-if="GETTER_RESOURCE_DETAIL_DATA.moments!=null">
						<mu-flexbox orient="vertical" class="gridview">
							<mu-row>
								<mu-col class="c_menus" width="25" v-for="(item, index) in GETTER_RESOURCE_DETAIL_DATA.moments" :key="index">
									<div class="d_menus">
										<mu-avatar :src="item.momentsPhoto" class="topicMoreImg" />
										<br class="m_text">{{item.momentsName}}</br>
									</div>
								</mu-col>
							</mu-row>
						</mu-flexbox>
					</mu-flexbox>

					<!--item-->
					<mu-flexbox class="action-item">
						<div class="title">
							资源行业
						</div>
						<div class="content">{{this.profession}}</div>
					</mu-flexbox>

					<mu-flexbox class="action-item">
						<div class="title">
							行业小类
						</div>
						<div class="content">{{this.position}}</div>
					</mu-flexbox>

					<mu-flexbox class="action-item">
						<div class="title">
							资源地址
						</div>
						<div class="content">{{this.companyName}}</div>
					</mu-flexbox>

					<mu-flexbox class="action-item">
						<div class="title">
							是否在职资源
						</div>
						<div class="content" v-if="this.working">是</div>
					</mu-flexbox>

					<mu-flexbox class="action-item">
						<div class="title">
							电话
						</div>
						<div class="content" v-if="this.friendStatus==='friends'">{{this.moNumber}}</div>
					</mu-flexbox>
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
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookies'
	export default {
		components: {},
		computed: {
			...mapState([
				'common',
				'resource'
			]),
			...mapGetters([
				'GETTER_RESOURCE_DETAIL_DATA'
			])
		},
		mounted() {
			this.trigger = this.$el;
		},
		data() {
			return {
				title: '资源信息',
				trigger: null,
				scroller: null,

				companyName: '',
				friendStatus: '',
				hotCount: 0,
				moNumber: '',
				position: '',
				profession: '',
				remarks: '',
				resourceId: 0,
				userId: 0,
				userImage: '',
				userMark: '',
				userName: '',
				working: false,
			}
		},
		created() {
			setCookie('resource-listPage-to-detailPage', 1);
			var resource = this.$route.params.resource;
			let companyName = resource.companyName;
			this.companyName = companyName;
			let friendStatus = resource.friendStatus;
			this.friendStatus = friendStatus;
			let hotCount = resource.hotCount;
			this.hotCount = hotCount;
			let moNumber = resource.moNumber;
			this.moNumber = moNumber;
			let position = resource.position;
			this.position = position;
			let profession = resource.profession;
			this.profession = profession;
			let remarks = resource.remarks;
			this.remarks = remarks;
			let resourceId = resource.resourceId;
			this.resourceId = resourceId;
			let userId = resource.userId;
			this.userId = userId;
			let userImage = resource.userImage;
			this.userImage = userImage;
			let userMark = resource.userMark;
			this.userMark = userMark;
			let userName = resource.userName;
			this.userName = userName;
			let working = resource.working;
			this.working = working;
			this.getResourceDetail(true, this.resourceId, this.userId);
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
			getResourceDetail(isRefresh, resourceId, currentlyUserId) {
				this.CLEAR_STATE_DATA();
				this.$store.dispatch('fetchResourceDetailAction', {
					isRefresh,
					resourceId,
					currentlyUserId
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
			toFriendDetail() {
				setCookie('resource', this.$route.params.resource);
				this.$router.push({
					name: 'frienddetail',
					params: {
						friendId: this.userId
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
			.userinfo-wrapper {
				.userinfo {
					width: 100%;
					height: 2rem;
					margin-top: .32rem;
					padding: 0 .24rem;
					box-sizing: border-box;
					background: #fff;
					border-top: 1px solid $LightGray;
					border-bottom: 1px solid $LightGray;
					.avatar {
						width: .96rem;
						height: .96rem;
						overflow: hidden;
						border-radius: 4px;
						background: $ExtraLightGray;
						img {
							width: .96rem;
							height: .96rem;
						}
					}
					.info {
						position: relative;
						flex: 1;
						margin-left: .24rem;
						.username {
							font-size: .28rem;
							font-weight: bold;
							color: $Black;
						}
						.userid {
							font-size: .22;
							margin-top: .08rem;
						}
						.score {
							position: absolute;
							right: 0;
							top: 0;
							width: 1.2rem;
							height: .42rem;
							border-radius: 5rem;
							background: $ExtraLightGray;
						}
					}
				}
				.action-wrapper {
					margin-top: .32rem;
					background: #fff;
					border-top: 1px solid $LightGray;
					border-bottom: 1px solid $LightGray;
					.action-item {
						position: relative;
						height: .88rem;
						padding-left: .24rem;
						box-sizing: border-box;
						.title {
							flex: 1;
							height: 100%;
							margin-left: .16rem;
							border-bottom: 1px solid $LightGray;
							display: flex;
							align-items: center;
							font-size: .28rem;
							font-weight: bold;
							color: $Black;
						}
						&:last-child .title {
							border-bottom: none;
						}
					}
					.action-item-1 {
						position: relative;
						height: .88rem;
						padding-left: .24rem;
						box-sizing: border-box;
						.title {
							flex: 1;
							height: 100%;
							margin-left: .16rem;
							display: flex;
							align-items: center;
							font-size: .28rem;
							font-weight: bold;
							color: $Black;
						}
					}
				}
				.gridview {
					background: #fff;
					border-bottom: 1px solid $LightGray;
					.m_text {
						font-size: .10rem;
						color: white;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						display: block;
						word-break: keep-all;
						/* 不换行 */
						white-space: nowrap;
						/* 不换行 */
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
				}
			}
		}
		.hide-overflow {
			overflow: hidden;
		}
	}
</style>