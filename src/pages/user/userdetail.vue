<template>
	<div id="container">
		<mu-appbar title="用户信息">
			<mu-icon-button icon="arrow_back" slot="left" @click="routerBack" />
		</mu-appbar>
		<div class="main">
			<mu-flexbox class="userinfo-wrapper" orient="vertical" key="is-login">
				<mu-flexbox class="userinfo">
					<div class="avatar">
						<img :src="login.userinfo.userImage" alt="">
					</div>
					<div class="info">
						<div class="username">{{login.userinfo.userName}}</div>
					</div>
				</mu-flexbox>
				<mu-flexbox orient="vertical" class="action-wrapper">
					<mu-flexbox class="action-item">
						<div class="title">
							性别
						</div>
						<div class="content">
							{{login.userinfo.sex}}
						</div>
					</mu-flexbox>
					<mu-flexbox class="action-item">
						<div class="title">
							生日
						</div>
						<div class="content">
							{{login.userinfo.birthday}}
						</div>
					</mu-flexbox>
					<mu-flexbox class="action-item">
						<div class="title">
							婚否
						</div>
						<div class="content">
							{{login.userinfo.marriage}}
						</div>
					</mu-flexbox>
					<mu-flexbox class="action-item">
						<div class="title">
							设置生日不可见
						</div>
						<mu-switch class="switch" :value="login.userinfo.canSeeUserBirthday" /><br/>
					</mu-flexbox>
				</mu-flexbox>

				<mu-flexbox orient="vertical" class="action-wrapper">
					<mu-flexbox class="action-item">
						<div class="title">
							目前地址
						</div>
						<div class="content">
							{{login.userinfo.userLocation}}
						</div>
					</mu-flexbox>
					<mu-flexbox class="action-item">
						<div class="title">
							手机号码
						</div>
						<div class="content">
							{{login.userinfo.moNumber}}
						</div>
					</mu-flexbox>
					<mu-flexbox class="action-item">
						<div class="title">
							QQ
						</div>
						<div class="content">
							{{login.userinfo.qq}}
						</div>
					</mu-flexbox>
					<mu-flexbox class="action-item">
						<div class="title">
							微信
						</div>
						<div class="content">
							{{login.userinfo.weChat}}
						</div>
					</mu-flexbox>
					<mu-flexbox class="action-item">
						<div class="title">
							积分
						</div>
						<div class="content">
							{{login.userinfo.integral}}
						</div>
					</mu-flexbox>
				</mu-flexbox>

				<mu-flexbox class="btn-logout" align="center" justify="center">
					修改密码
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
	import snackbar from '../../components/snackbar/snackbar'
	import mainProgress from '../../components/mainProgress/mainProgress'
	export default {
		data() {
				return {
					// ----- account
					account: '',
					//----password
					pwd: '',
					// ----- tip
					isTipShow: false
				}
			},
			created() {
				// 如果 cookie 缓存存在，则显示 account
				let account = getCookie('account');
				let pwd = getCookie('pwd');
				if(account) {
					this.account = account
				}
				if(pwd) {
					this.pwd = pwd
				}
			},
			computed: {
				...mapState([
					'login',
					'common'
				]),
				...mapGetters([
					'REPLIES_COUNT',
					'COLLECTS_COUNT',
					'MY_TOPICS_COUNT'
				])
			},
			components: {
				snackbar,
				mainProgress
			},
			methods: {
				...mapMutations([
					'SHOW_MAIN_OVERFLOW',
					'LOGOUT',
					'CLEAR_MSG_DATA'
				]),

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
		}
		.hide-overflow {
			overflow: hidden;
		}
		.userinfo-wrapper {
			.userinfo {
				width: 100%;
				height: 1.5rem;
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
						font-size: .30rem;
					}
					.content {
						position: absolute;
						margin-right: .36rem;
						right: 0;
					}
					.switch {
						margin-right: .36rem;
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
			}
			.btn-logout {
				width: 100%;
				height: .88rem;
				background: #fff;
				margin-top: .32rem;
				border-top: 1px solid $LightGray;
				border-bottom: 1px solid $LightGray;
				font-size: .28rem;
			}
		}
	}
</style>