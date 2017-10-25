<template>
	<div id="container">
		<mu-appbar :title="this.title">
			<mu-icon-button icon="arrow_back" slot="left" @click="routerBack" />
			<mu-icon-menu icon="settings" slot="right">
			</mu-icon-menu>
		</mu-appbar>
		<div class="main">
			<mu-refresh-control :refreshing="common.refresh.isShow" :trigger="trigger" @refresh="refresh" />
			<div class="content-wrapper">
				<content-item v-for="(item, index) in moments.momentActivity" :list="item" :key="index"></content-item>
			</div>
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
	import contentItem from '../../components/contentItem/contentItem'
	import noMoreData from '../../components/noMoreData/noMoreData'

	export default {
		components: {
			contentItem,
			noMoreData
		},
		computed: {
			...mapState([
				'common',
				'moments'
			]),
		},
		mounted() {
			this.scroller = this.$el;
			this.trigger = this.$el;
		},
		data() {
			return {
				title: '朋友圈',
				trigger: null,
				scroller: null,
				momentsId: null
			}
		},
		created() {
			let momentsId = this.$route.params.momentsId;
			let momentsName = this.$route.params.momentsName;
			this.title = momentsName;
			this.momentsId = momentsId;
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
				this.http(1, true, this.momentsId);
			},
			http(page, isRefresh, momentsId) {
				this.$store.dispatch('fetchMomentsActivityAction', {
					page,
					isRefresh,
					momentsId
				})
			},
			loadMore() {
				if(!this.topics.isFetching && !this.topics.noMoreData) {
					this.page += 1;
				}
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
			background: $ExtraLightGray;
		}
		.hide-overflow {
			overflow: hidden;
		}
	}
</style>