<template>
	<view class="app" @click="test">
		<!-- 顶部 -->
		<view class="top">
			<view class="tLeft">
				<view class="tlTitle">任务名称一</view>
				<view class="tlProcess">
					<evan-steps :active="1" direction="horizontal">
						<evan-step title="未开始"></evan-step>
						<evan-step title="进行中"></evan-step>
						<evan-step title="已完成"></evan-step>
					</evan-steps>

				</view>
			</view>
			<view class="tRight">
				<view class="button" id="fiveBox" @click.stop="pop1()">
					任务总数：7
				</view>
				<view class="pop" id="box" v-show="isPop" @click.stop="test1">
					<view class="pLst">
						<view class="pLeft">
							<view class="ptu">
								<!-- <image src="../../static/bianqian.png"></image> -->
								1
							</view>
							<view class="pTitle">
								<view class="zs">1号码头&nbsp;→&nbsp;2号码头</view>
								<view class="zsTime" style="font-size: 12rpx;color: #a2a2a2;">2021/04/25 12:00</view>
							</view>
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
								<!-- <image src="../../static/bianqian.png"></image> -->
								2
							</view>
							<view class="pTitle">
								<view class="zs">1号码头 &nbsp;→&nbsp; 2号码头</view>
								<view class="zsTime" style="font-size: 12rpx;color: #a2a2a2;">2021/04/25 12:00</view>
							</view>
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
								<!-- <image src="../../static/bianqian.png"></image> -->
								3
							</view>
							<view class="pTitle">
								<view class="zs">1号码头 &nbsp;→&nbsp; 2号码头</view>
								<view class="zsTime" style="font-size: 12rpx;color: #a2a2a2;">2021/04/25 12:00</view>
							</view>
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
								<!-- <image src="../../static/bianqian.png"></image> -->
								4
							</view>
							<view class="pTitle">
								<view class="zs">1号码头 &nbsp;→&nbsp; 2号码头</view>
								<view class="zsTime" style="font-size: 12rpx;color: #a2a2a2;">2021/04/25 12:00</view>
							</view>
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
								<!-- <image src="../../static/bianqian.png"></image> -->
								5
							</view>
							<view class="pTitle">
								<view class="zs">1号码头 &nbsp;→&nbsp; 2号码头</view>
								<view class="zsTime" style="font-size: 12rpx;color: #a2a2a2;">2021/04/25 12:00</view>
							</view>
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
								<!-- <image src="../../static/bianqian.png"></image> -->
								6
							</view>
							<view class="pTitle">
								<view class="zs">1号码头 &nbsp;→&nbsp; 2号码头</view>
								<view class="zsTime" style="font-size: 12rpx;color: #a2a2a2;">2021/04/25 12:00</view>
							</view>
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
								<!-- <image src="../../static/bianqian.png"></image> -->
								7
							</view>
							<view class="pTitle">
								<view class="zs">1号码头 &nbsp;→&nbsp; 2号码头</view>
								<view class="zsTime" style="font-size: 12rpx;color: #a2a2a2;">2021/04/25 12:00</view>
							</view>
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
		</view>
		<!-- end -->
		<!-- 内容 -->
		<view class="content">
			<view class="conLeft">
			<!-- 	<view class="name">
					<view class="naTitle">任务名称：</view>
					<view class="naCon">任务一</view>
				</view> -->
				<view class="time">
					<view class="tTitle">任务时间：</view>
					<view class="stime">2021/07/06 09:00</view>
					<view class="zhi">至</view>
					<view class="etime">2021/07/06 15:00</view>
				</view>
				<view class="startPoint">
					<view class="sTitle">起&emsp;&emsp;点：</view>
					<view class="spoint">1号码头1号码头</view>
					<view class="szhi">终&emsp;&emsp;点：</view>
					<view class="epoint">2号码头2号码头</view>
				</view>
				<!-- <view class="hybrid"> -->
					<view class="type">
						<view class="tyTitle">车辆类型：</view>
						<view class="tyCon">叉车</view>
					</view>
					
			<!-- 	</view> -->
				<view class="num">
					<view class="nTitle">车牌号码：</view>
					<view class="nCon">测试车牌号</view>
				</view>
				<view class="driverName">
					<view class="driTitle">司机姓名：</view>
					<view class="driCon">张振华</view>
				</view>
				<view class="note">
					<view class="noTitle">备&emsp;&emsp;注：</view>
					<view class="noCon">此次货物运输，正常。</view>
				</view>
			</view>
			<view class="conRight">
				<view class="start" @click="start" v-if="isSt">开始</view>
				<view class="zhong" @click="pop" v-if="isZh">结束</view>
				<view class="end" @click="popp">终止</view>
			</view>
			<!-- 每个页面都要写 -->
			<my-popup @uuidCallback="uuidCallback" @closeCallback="closeCallback" ref="mpopup" :isdistance="true">
			</my-popup>
		</view>
		<!-- end -->
	</view>
</template>

<script>
	import EvanSteps from '@/components/evan-steps/evan-steps.vue'
	import EvanStep from '@/components/evan-steps/evan-step.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import EvanIcons from '@/components/evan-icons/evan-icons.vue'
	export default {
		components: {
			EvanSteps,
			EvanStep,
			UniIcons,
			EvanIcons
		},
		data() {
			return {
				isPop: false, //点击任务总数，列表是否显示		
				bg: '#45c4ff', //开始背景色
				stTitle: '开始', //开始文字
				popup_uuid: [], //存放uuid
				aaa: this.showPopu,
				isSt: true,
				isZh: false
			}
		},
		onLoad() {
		
		},
		created() {
			
		},
		methods: {
			goNvue() {
				uni.navigateTo({
					url: '/pages/app/app'
				})
			},
			/* 点击任务总数 */
			pop1() {
				this.isPop = !this.isPop;
			},
			test(){
				this.isPop = false;
			},
			test1(){},
			/* end */
			start() {
				this.isSt = false;
				this.isZh = true;
			},


			pop: function() {
				this.$refs.mpopup.open({
					type: 'success',
					content: '任务已结束',
					timeout: 2000,
				});
			},
			popp: function() {
				this.$refs.mpopup.open({
					type: 'err',
					content: '任务已终止',
					timeout: 2000,
					isClick: false
				});
			},
			//uuid回传
			uuidCallback(uuid) {
				//存起来
				this.popup_uuid.push({
					uuid
				})
				//console.log(this.popup_uuid)
			},
			//关闭回传
			closeCallback(uuid) {
				for (var i = 0; i < this.popup_uuid.length; i++) {
					if (this.popup_uuid[i].uuid == uuid) {
						//移除uuid
						this.popup_uuid.splice(i, 1);
						break;
					}
				}
			}


		}
	}
</script>

<style>
	.btn {
		transform: translateY(50%);
	}

	.app {
		padding: 12rpx 14rpx;
	}

	.top {
		display: flex;
		justify-content: space-between;
	}

	.tLeft {
		width: 74%;
	}

	.tlTitle {
		font-size: 20rpx;
		font-weight: 700;
	}

	.tlProcess {
		margin-top: 18rpx;
	}

	.evan-steps {
		width: 122%;
		/* margin-left: -52rpx; */
	}

	.tRight {
		width: 26%;
		position: relative;
	}

	.button {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 16rpx;
		font-weight: 700;
		background: #00ba53;
		color: #fff;
		border-radius: 8rpx;
		text-align: center;
	}

	.pop {
		width: 300rpx;
		height: 300rpx;
		border: 1px solid #dbe3e6;
		border-radius: 8rpx;
		position: absolute;
		right: 0;
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
		margin-left: 14rpx;
	}
.zs{
	color: #3399ff;
}
	.ptu {
		width: 22rpx;
		height: 22rpx;
		line-height: 22rpx;
		text-align: center;
		background: #fee16a;
		color: #fff;
		border-radius: 4rpx;
		
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

	.content {
		background: #e0f5ff;
		display: grid;
		grid-template-columns: 58% 42%;
		/* justify-content: space-between;
		align-items: center; */
		border-radius: 8rpx;
		padding: 4rpx 16rpx;
		margin-top: 24rpx;
	}

	.conLeft {
		font-size: 16rpx;
		color: #000;
		/* display: grid; */
		/* grid-row-gap: 0rpx; */
	}

	.name {
		display: flex;
		align-items: center;
	}

	.naTitle {}

	.naCon {
		color: #3399ff;
		margin-left: 10rpx;
	}

	.time, .startPoint, .type, .num, .driverName, .note{
		margin: 16rpx 0;
	}

	.time {
		display: flex;
		align-items: center;
	}

	.tTitle {
	}

	.stime {
		color: #3399ff;
		margin-left: 10rpx;
	}

	.zhi {
		margin: 0 10rpx;
	}

	.etime {
		color: #3399ff;
	}

	.startPoint {
		display: flex;
		align-items: center;
	}

	.sTitle {
		width: 20.5%;
	}

	.spoint {
		width: 27%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		color: #3399ff;
		margin-left: 10rpx;
	}

	.szhi {
		width: 20.5%;
		margin: 0 10rpx;
	}

	.epoint {
		width: 27%;
		color: #3399ff;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.hybrid {
		display: flex;
		align-items: center;
	}

	.type {
		display: flex;
		align-items: center;
	}

	.tyTitle {
	}

	.tyCon {
		color: #3399ff;
		margin-left: 10rpx;
	}

	.num {
		display: flex;
		align-items: center;
	}

	.nTitle {
		/* margin-left: 24rpx; */
	}

	.nCon {
		color: #3399ff;
		margin-left: 10rpx;
	}

	.driverName {
		display: flex;
		align-items: center;
	}

	.driTitle {
	}

	.driCon {
		color: #3399ff;
		margin-left: 10rpx;
	}

	.note {
		display: flex;
		align-items: center;
	}

	.noTitle {
	}

	.noCon {
		margin-left: 10rpx;
	}

	.conRight {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.start,
	.end,
	.zhong {
		width: 130rpx;
		height: 130rpx;
		line-height: 130rpx;
		font-size: 36rpx;
		text-align: center;
		font-weight: 700;
		color: #fff;
		border-radius: 10000rem;
	}

	.start {
		background: #45c4ff;
	}

	.zhong {
		background: #0fc15e;
	}

	.end {
		background: #ff9170;
		margin-left: 30rpx;
	}
</style>
