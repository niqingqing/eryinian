<template>
	<view class="content" @click="test" style="background-color: red;">

			<view class="button" id="fiveBox" @click.stop="pop1()">
				任务总数：3
			</view>
			<view class="pop" id="box" v-show="isPop" @click.stop="test1">
				<view class="pLst">
					<view class="pLeft">
						<view class="ptu">
							<image src="../../static/bianqian.png"></image>
						</view>
						<view class="pTitle">任务一任务一</view>
					</view>
					<view class="pRight">
						<view class="prTitle">查看</view>
						<view class="prTu">
							<image src="../../static/arrow.png"></image>
						</view>
					</view>
				</view>
				<view class="pLst">
					<view class="pLeft">
						<view class="ptu">
							<image src="../../static/bianqian.png"></image>
						</view>
						<view class="pTitle">任务一任务一</view>
					</view>
					<view class="pRight">
						<view class="prTitle">查看</view>
						<view class="prTu">
							<image src="../../static/arrow.png"></image>
						</view>
					</view>
				</view>
			
			</view>

		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isPop: false, //点击任务总数，列表是否显示		
			}
		},
		onLoad() {

		},
		methods: {
			pop1() {
				this.isPop = !this.isPop;
			},
			test() {
				this.isPop = false;
			},
			test1() {},
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.button {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 16rpx;
		font-weight: 700;
		background: #00ba53;
		color: #fff;
		border-radius: 8rpx;
		text-align: center;
	}

	.pop {
		width: 90%;
		height: 300rpx;
		border: 1px solid #dbe3e6;
		border-radius: 8rpx;
		position: absolute;
		left: 50%;
		top: 60rpx;
		transform: translateX(-50%);
		padding: 10rpx 10rpx;
		background: #fff;
		overflow-y: scroll;
	}

	.pLst {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #f0f0f0;
		padding: 12rpx 12rpx;
	}

	.pLeft {
		display: flex;
		align-items: center;
	}

	.pTitle {
		color: #414141;
		margin-left: 10rpx;
	}

	.ptu {
		width: 22rpx;
		height: 21rpx;
	}

	.ptu image {
		width: 100%;
		height: 100%;
	}

	.pRight {
		display: flex;
		align-items: center;
	}

	.prTitle {
		color: #a2a2a2;
	}

	.prTu {
		width: 12rpx;
		height: 12rpx;
		margin-left: 4rpx;
	}

	.prTu image {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
