<template>
	<div class="message">
		<!--Refresh Control-->
		<mu-refresh-control :refreshing="common.refresh.isShow" :trigger="trigger" @refresh="refresh" />
		<!--refresh control-->

		<!--Info Page-->
		<transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
			<infoPage v-show="info.isInfoPageShow"></infoPage>
		</transition>
		<!--info page-->

		<!--Login-->
		<mu-flexbox class="login" orient="vertical" v-if="!login.data.success">
			<!--image-->
			<img class="img" src="../../assets/images/mountain.png" alt="">

			<!--title-->
			<p class="login-title">登录后可查看未读消息</p>

			<!--button-->
			<div class="button-wrapper">
				<mu-raised-button label="登录" backgroundColor="#41b883" :fullWidth="true" @click="tapToLogin"></mu-raised-button>
			</div>
		</mu-flexbox>
		<!--login-->

		<!--Content-->
		<div class="content" v-else>
			<!--new msgs-->
			<div class="new-msgs" @click="toMessageList()">
				<!--title-->
				<div class="title">
					&nbsp&nbsp&nbsp申请与通知
				</div>
			</div>

			<div>
				<mu-list v-for="(item, index) in sortContactUsers(contact.data)" :key="index">
					<mu-divider inset v-if="item.firstWord!=null" />

					<mu-list-item :title=item.userName @click="toFriendDetail(item.userId)">
						<mu-avatar :src="item.userImage" slot="rightAvatar" />
						<mu-icon v-if="item.userName==null" value="grade" slot="left" color="pinkA200" />
						<mu-avatar v-if="item.userName!=null" color="pinkA200" :style="{'margin-left': '-8px'}" backgroundColor="transparent" slot="leftAvatar">{{item.firstWord}}</mu-avatar>
					</mu-list-item>
				</mu-list>
			</div>
		</div>
		<!--content-->
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
		getCookie
	} from '../../assets/js/cookies.js'
	import {
		filterTime
	} from '../../assets/js/filters.js'
	import infoPage from '../../components/infoPage/infoPage'
	export default {
		data() {
				let accesstoken = getCookie('accesstoken');
				return {
					accesstoken,
					// ----- refresh control
					trigger: null
				}
			},
			mounted() {
				this.trigger = this.$el;
			},
			computed: {
				...mapState([
					'contact',
					'login',
					'message',
					'info',
					'common'
				]),
				...mapGetters([
					'HAS_NOT_READ_MESSAGES_COUNT'
				])
			},
			components: {
				infoPage
			},
			filters: {
				filterTime
			},
			created() {
				if(this.contact.data.length === 0) {
					this.getContactsList(true);
				}
			},
			methods: {
				...mapActions('contact', [
					'fetchContactAction',
				]),
				...mapMutations([
					'SHOW_MAIN_OVERFLOW',
					'TOGGLE_INFO_PAGE_DISPLAY',
					'SUC_COLLECT',
					'DEL_COLLECTED'
				]),

				tapToLogin() {
					if(!this.login.data.success) {
						this.$router.replace({
							name: 'user'
						});
						this.$store.commit('HANDLE_CHANGE', 'user');
					}
				},

				refresh() {
					this.getContactsList(true);
				},

				getContactsList(isRefresh) {
					this.$store.dispatch('fetchContactAction', {
						isRefresh
					})
				},

				toFriendDetail(friendId) {
					this.$router.push({
						name: 'frienddetail',
						params: {
							friendId: friendId
						}
					});
				},

				toMessageList() {
					this.$router.push({
						name: 'messageList'
					});
				},

				sortContactUsers(groups) {
					var Array = [];
					for(var i = 0; i < groups.length; i++) {
						for(var j = 0; j < groups[i].data.length; j++) {
							let user = new Object();
							user = groups[i].data[j];
							if(j === 0) {
								user.firstWord = groups[i].type;
							}
							Array.push(user);
						}
					}
					return Array;
				}
			}
	}
</script>

<style lang="scss">
	@import '../../assets/sass/_base.scss';
	.message {
		background: #fff;
		.login {
			margin-top: 2rem;
			.img {
				width: 1.5rem;
				height: 1.5rem;
			}
			.title {
				font-size: .32rem;
				color: $ExtraLightBlack;
			}
			.button-wrapper {
				width: 2.5rem;
			}
		}
		.content {
			.new-msgs,
			.past-msgs {
				width: 100%;
				.title {
					position: relative;
					width: 100%;
					height: .86rem;
					line-height: .86rem;
					background: $ExtraLightGray;
					&:before {
						content: '';
						display: block;
						width: 6px;
						height: 100%;
						position: absolute;
						left: 0;
						top: 0;
						background: $Gray;
					}
					.btn-mark-all {
						position: absolute;
						right: .32rem;
						top: 0;
						font-size: .22rem;
						color: $primary;
					}
				}
			}
			.past-msgs {
				.lists {
					.list {
						.time {
							color: lighten($ExtraLightBlack, 50%) !important;
						}
						.body {
							color: lighten($ExtraLightBlack, 50%);
						}
					}
				}
			}
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