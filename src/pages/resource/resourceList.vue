<template>
	<div id="container">
		<mu-appbar :title="this.title">
			<mu-icon-button icon="arrow_back" slot="left" @click="routerBack" />
			<mu-icon-menu icon="more_vert" slot="right">
				<mu-menu-item title="一度" />
				<mu-menu-item title="二度" />
			</mu-icon-menu>
		</mu-appbar>
		<div class="main">
			<mu-refresh-control :refreshing="common.refresh.isShow" :trigger="trigger" @refresh="refresh" />
			<mu-list v-for="(item, index) in resource.data.resourceList" :key="index">
				<mu-list-item :title="item.profession" @click="toResourceDetail(item)">
					<mu-avatar :src="item.userImage" slot="leftAvatar" />
					<span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">{{item.userName}} -</span> {{item.position}} -
					</span>{{item.companyName}}</span>
					<mu-badge content="一度" secondary slot="right" v-show="item.friendStatus=='friends'" />
					<mu-badge content="二度" primary slot="right" v-show="item.friendStatus=='tfriends'" />
				</mu-list-item>
				<mu-divider inset/>
			</mu-list>
		</div>
		<!--<mu-infinite-scroll loadingText="正在加载..." :scroller="scroller" :loading="topics.isFetching" @load="loadMore" />
		<noMoreData v-if="this.topics.noMoreData"></noMoreData>
		<noMoreData v-if="this.topics.errData" title="网络出错了，稍后再试"></noMoreData>-->
	</div>
</template>
<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	import noMoreData from '../../components/noMoreData/noMoreData'
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookies'
	export default {
		components: {
			noMoreData
		},
		computed: {
			...mapState([
				'common',
				'resource'
			]),
		},
		mounted() {
			this.trigger = this.$el;
		},
		data() {
			return {
				title: '资源',
				trigger: null,
				scroller: null,
				profession: null
			}
		},
		created() {
			var flag = getCookie('resource-listPage-to-detailPage');
			if(flag == 1) {
				let profession = getCookie('route-params-profession');
				this.title = profession;
				this.profession = profession;
			} else {
				let profession = this.$route.params.profession;
				setCookie('route-params-profession', profession);
				this.title = profession;
				this.profession = profession;
				this.refresh();
			}

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
				this.getCurrentProfessionResource(true, this.profession, 1);
			},
			getCurrentProfessionResource(isRefresh, profession, type) {
				this.$store.dispatch('fetchResourceListAction', {
					isRefresh,
					profession,
					type
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
			toResourceDetail(resource) {
				this.$router.push({
					name: 'resourceDetail',
					params: {
						resource: resource
					}
				});
			},
		}
	}
</script>
<style lang="scss">
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
	}
</style>