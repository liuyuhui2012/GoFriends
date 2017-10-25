<template>
	<div class="content-item" @click="toActivityDetail(list.partyId)">
		<!--Complete Template-->
		<div>
			<!--Top Box-->
			<div class="top-box">
				<!--avatar-->
				<div class="avatar">
					<img :src="list.partyPhoto" alt="">
				</div>
				<!--info-->
				<div class="info">
					<p class="title">{{list.partyName}}</p>
					<!--tab-->
					<div class="tab" v-if="list.isJoin=='no'">参加</div>
				</div>

			</div>

			<!--Bottom Box-->
			<div class="bottom-box">
				<!--left-->
				<div class="left">
					<!--username-->
					<p class="username">{{list.partyType}}</p>
					<!--time-->
					<div class="time">
						{{list.partyDate | filterTime}}
					</div>
				</div>

				<!--right-->
				<div class="right">
					<!--visit-->
					<div class="item">
						<mu-icon value="visibility" :size="14" color="#D3DCE6"></mu-icon>
						<div class="text">10</div>
					</div>
					<!--reply-->
					<div class="item">
						<mu-icon value="textsms" :size="14" color="#D3DCE6"></mu-icon>
						<div class="text">50</div>
					</div>
				</div>
			</div>
			<!--bottom box-->
		</div>
		<!--complete template-->
	</div>
</template>

<script>
	import {
		filterTime
	} from '../../assets/js/filters.js'
	export default {
		props: {
			list: {
				type: Object
			},
			// 是否采用简洁模版
			simple: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			filterTime
		},
		methods: {
			toActivityDetail(partyId) {
				this.$router.push({
					name: 'activitydetail',
					params: {
						partyId
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	@import '../../assets/sass/_base.scss';
	.content-item {
		width: 100%;
		padding: .20rem;
		margin-top: .12rem;
		background: #fff;
		box-sizing: border-box;
		@include center-block;
		.top-box {
			position: relative;
			@include clearfix();
			.avatar {
				width: 30%;
				height: 1.2rem;
				overflow: hidden;
				background: $ExtraLightGray;
				@include float();
				img {
					width: 100%;
					height: 100%;
				}
			}
			.info {
				position: absolute;
				width: 70%;
				margin-left: .10rem;
				@include float();
				.title {
					font-size: .32rem;
					margin-right: 10px;
					line-height: .46rem;
					-webkit-margin-before: .5em;
					color: $Black;
				}
				.tab {
					position: absolute;
					right: 0;
					margin-right: 10px;
					padding: .01rem .08rem;
					background: $red;
					border-radius: 4px;
					font-size: .24rem;
					color: #fff;
				}
			}
		}
		.bottom-box {
			display: flex;
			color: darken($Gray, 20%);
			.left {
				flex: 1;
				display: flex;
				align-items: center;
				.username {
					padding: 0 !important;
					-webkit-margin-before: 0em;
					-webkit-margin-after: 0em;
				}
				.time {
					margin-left: .24rem;
					font-size: .24rem;
				}
			}
			.right {
				display: flex;
				.item {
					display: flex;
					align-items: center;
					&:first-child {
						margin-right: .16rem;
					}
					.text {
						font-size: .24rem;
						margin-left: .08rem;
					}
				}
			}
		}
	}
</style>