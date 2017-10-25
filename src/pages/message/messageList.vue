<template>
	<div id="container">
		<mu-appbar :title="this.title">
			<mu-icon-button icon="arrow_back" slot="left" @click="routerBack" />
		</mu-appbar>
		<div class="main">
			<mu-refresh-control :refreshing="common.refresh.isShow" :trigger="trigger" @refresh="refresh" />
			<mu-list-item v-for="(item, index) in message.data.messageDimensions" :key="index">
				<mu-avatar :src="item.headImage" slot="leftAvatar" />
				<span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">{{item.title}} -</span>{{item.content}}
				</span>
				<mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
					<mu-menu-item title="标记" />
					<mu-menu-item title="删除" />
				</mu-icon-menu>
			</mu-list-item>
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
	import noMoreData from '../../components/noMoreData/noMoreData'

	export default {
		components: {
			noMoreData
		},
		computed: {
			...mapState([
				'common',
				'message'
			]),
			...mapGetters([
				'FETCH_MSG_LIST_SUC'
			])
		},
		mounted() {
			this.trigger = this.$el;
		},
		data() {
			return {
				title: '申请与通知',
				trigger: null,
				scroller: null,
			}
		},
		created() {
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
				this.http(true);
			},
			http(page, limit, isRefresh, profession, type) {
				this.$store.dispatch('fetchMessageListAction', {
					isRefresh
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
			getMessageDimensions(messages) {
				var Array = [];
				for(var i = 0; i < messages.length; i++) {
					let messageDimension = new Object();
					messageDimension = messages[i].messageDimension;
					Array.push(messageDimension);
				}
				return Array;
			},
			getMessageTitle(messageDimension) {
				let user = messageDimension.user;
			}
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