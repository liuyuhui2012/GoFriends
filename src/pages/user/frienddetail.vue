<template>
	<div id="container">
		<mu-appbar :title="this.title">
			<mu-icon-button icon="arrow_back" slot="left" @click="routerBack" />
		</mu-appbar>
		<div class="main">
			<mu-flexbox class="userinfo-wrapper" v-if="GETTER_FRIEND_DETAIL_USER!=null" orient="vertical" key="is-login">
				<!--info-->
				<mu-flexbox class="userinfo">
					<!--avatar-->
					<div class="avatar">
						<img :src="GETTER_FRIEND_DETAIL_USER.userImage" alt="">
					</div>
					<div class="info">
						<div class="username">{{GETTER_FRIEND_DETAIL_USER.userName}}</div>
						<div class="userid">ID: {{GETTER_FRIEND_DETAIL_USER.userMark}}</div>
					</div>
				</mu-flexbox>

				<mu-flexbox orient="vertical" class="action-wrapper">
					<!--item-->
					<mu-flexbox class="action-item">
						<div class="title">
							关系
						</div>
						<div class="content" v-if="GETTER_FRIEND_DETAIL.friendStatus==='friends'">好友</div>
						<div class="content" v-if="GETTER_FRIEND_DETAIL.friendStatus==='tfriends'">二度好友</div>
					</mu-flexbox>
					<!--item-->
					<mu-flexbox class="action-item">
						<div class="title">
							性别
						</div>
						<div class="content">{{GETTER_FRIEND_DETAIL_USER.sex}}</div>
					</mu-flexbox>
					<!--item-->
					<mu-flexbox class="action-item">
						<div class="title">
							手机号码
						</div>
						<div class="content" v-if="GETTER_FRIEND_DETAIL.friendStatus==='friends'">{{GETTER_FRIEND_DETAIL_USER.moNumber}}</div>
						<div class="content" v-if="GETTER_FRIEND_DETAIL.friendStatus==='tfriends'">**</div>
					</mu-flexbox>
					<!--item-->
					<mu-flexbox class="action-item">
						<div class="title">
							目前地址
						</div>
						<div class="content">{{GETTER_FRIEND_DETAIL_USER.userLocation}}</div>
					</mu-flexbox>
					<!--item-->
					<mu-flexbox class="action-item-1">
						<div class="title">
							资源
						</div>
					</mu-flexbox>
					<div class="demo-chip-container">
						<mu-chip class="demo-chip" backgroundColor="blue300" v-for="item in GETTER_FRIEND_DETAIL.resource" :key="index">
							{{item.profession}}
						</mu-chip>

					</div>
					<!--item-->
					<mu-flexbox class="action-item-1">
						<div class="title">
							交友圈
						</div>
					</mu-flexbox>
					<mu-flexbox orient="vertical">
						<mu-flexbox orient="vertical" class="gridview">
							<mu-row>
								<mu-col class="c_menus" width="25" v-for="(item,index) in GETTER_FRIEND_DETAIL.moments" :key="index">
									<div class="d_menus">
										<mu-avatar :src="item.momentsPhoto" class="topicMoreImg" />
										<br class="m_text">{{item.momentsName}}</br>
									</div>
								</mu-col>
							</mu-row>
						</mu-flexbox>
					</mu-flexbox>

					<mu-flexbox orient="vertical">

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

	export default {
		components: {},
		computed: {
			...mapState([
				'common',
				'friend'
			]),
			...mapGetters([
				'GETTER_FRIEND_DETAIL_USER',
				'GETTER_FRIEND_DETAIL'
			])
		},
		mounted() {
			this.trigger = this.$el;
		},
		data() {
			return {
				title: '好友详情',
				trigger: null,
				scroller: null,
				friendId: 0,
			}
		},
		created() {
			this.CLEAR_STATE_DATA();
			let friendId = this.$route.params.friendId;
			this.friendId = friendId;
			this.getFriendDetail(true, this.friendId);
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
			getFriendDetail(isRefresh, friendId) {
				this.$store.dispatch('fetchFriendDetailAction', {
					isRefresh,
					friendId
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
				.demo-chip-container {
					padding-bottom: 8px;
					margin-left: .80rem;
					width: 100%;
					border-bottom: 1px solid $LightGray;
					display: flex;
					flex-wrap: wrap;
					.demo-chip {
						margin: 4px;
					}
				}
			}
		}
		.hide-overflow {
			overflow: hidden;
		}
	}
</style>