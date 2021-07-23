<template>
	<view class="content">

		<!-- 状态栏 -->
		<view :style="{'height': statusBarHeight}" class="statusBar"></view>
		<!-- end -->
		<!-- 导航栏 -->
		<view class="nav">
			<view class="navTitle">首页</view>
			<view class="search">
				<image src="../../static/index/search.png"></image>
			</view>
		</view>
		<!-- end -->
		<!-- banner -->
		<view class="banner">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<image src="../../static/index/img1.png"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/index/img2.png"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/index/img3.png"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- end -->
		<!-- 分类 -->
		<view class="classify">
			<view class="clItem">
				<view class="clItemPic">
					<image src="../../static/index/classify.png"></image>
				</view>
				<view class="clItemTitle">甄选戒指</view>
			</view>
			<view class="clItem">
				<view class="clItemPic">
					<image src="../../static/index/classify.png"></image>
				</view>
				<view class="clItemTitle">优雅耳环</view>
			</view>
			<view class="clItem">
				<view class="clItemPic">
					<image src="../../static/index/classify.png"></image>
				</view>
				<view class="clItemTitle">典雅项链</view>
			</view>
			<view class="clItem">
				<view class="clItemPic">
					<image src="../../static/index/classify.png"></image>
				</view>
				<view class="clItemTitle">唯美胸针</view>
			</view>
		</view>
		<!-- end -->
		<!-- 今日特惠 -->
		<view class="preferential">
			<view class="preItem preItemOne">
				<view class="preItemOneTitle">今日特惠</view>
			</view>
			<view class="preItem preItemTwo">
				<view class="preItemChild"></view>
				<view class="preItemChild"></view>
			</view>
		</view>
		<!-- end -->
		<!-- 内容 -->
		<view class="contentInfor">
			<!-- 标题 -->
			<view class="conTitle">
				<view class="conDetails">热门推荐</view>
				<view class="conMore">
					<view class="moreTitle">查看更多</view>
					<view class="moreImg">
						<image src="../../static/index/arrow.png"></image>
					</view>
				</view>
			</view>
			<!-- 内容详情 -->
			<view class="conInfor">
				<view class="inforItem" v-for="(item,index) in array" :key='index'>
					<view class="itemPic">
						<image :src='item.img'></image>
					</view>
					<view class="itemTitle">{{item.itemTitle}}</view>
					<view class="itemClassify">{{item.itemClassify}}|{{item.leixing}}</view>
					<view class="itemPrice">{{item.itemPrice}}</view>
				</view>
				<!-- 		<view class="inforItem">
					<view class="itemPic">
						<image src="../../static/index/pic.png"></image>
					</view>
					<view class="itemTitle">非洲红宝石吊坠新球落坠</view>
					<view class="itemClassify">耳环|红宝石</view>
					<view class="itemPrice">￥6999.00</view>
				</view>
				<view class="inforItem">
					<view class="itemPic">
						<image src="../../static/index/pic.png"></image>
					</view>
					<view class="itemTitle">非洲红宝石吊坠新球落坠</view>
					<view class="itemClassify">耳环|红宝石</view>
					<view class="itemPrice">￥6999.00</view>
				</view>
				<view class="inforItem">
					<view class="itemPic">
						<image src="../../static/index/pic.png"></image>
					</view>
					<view class="itemTitle">非洲红宝石吊坠新球落坠</view>
					<view class="itemClassify">耳环|红宝石</view>
					<view class="itemPrice">￥6999.00</view>
				</view>
				<view class="inforItem">
					<view class="itemPic">
						<image src="../../static/index/pic.png"></image>
					</view>
					<view class="itemTitle">非洲红宝石吊坠新球落坠</view>
					<view class="itemClassify">耳环|红宝石</view>
					<view class="itemPrice">￥6999.00</view>
				</view>
				<view class="inforItem">
					<view class="itemPic">
						<image src="../../static/index/pic.png"></image>
					</view>
					<view class="itemTitle">非洲红宝石吊坠新球落坠</view>
					<view class="itemClassify">耳环|红宝石</view>
					<view class="itemPrice">￥6999.00</view>
				</view>
				<view class="inforItem">
					<view class="itemPic">
						<image src="../../static/index/pic.png"></image>
					</view>
					<view class="itemTitle">非洲红宝石吊坠新球落坠</view>
					<view class="itemClassify">耳环|红宝石</view>
					<view class="itemPrice">￥6999.00</view>
				</view>
				<view class="inforItem">
					<view class="itemPic">
						<image src="../../static/index/pic.png"></image>
					</view>
					<view class="itemTitle">非洲红宝石吊坠新球落坠</view>
					<view class="itemClassify">耳环|红宝石</view>
					<view class="itemPrice">￥6999.00</view>
				</view> -->
				<view class="bottom" v-show="isNotdata">人家也是有底线滴~</view>
			</view>
		</view>
		<!-- end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				statusBarHeight: '',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				array: [], //推荐列表循环
				pageNum: 1, //页码号
				isNotdata: false
			}
		},
		onLoad() {

			uni.getSystemInfo({
				success: function(res) {
					/* 获取手机状态栏的高度 */
					this.statusBarHeight = res.statusBarHeight;
					console.log(this.statusBarHeight, 10);
				}
			});

			let addArray = [];  //新循环出来的数组
			for (let i = 0; i < 10; i++) {
				let index = i+1  //列表第几个
				let arrayList = {
					img: '../../static/index/pic.png',
					itemTitle: '非洲红宝石吊坠新球落坠' + index,
					itemClassify: '耳环' + index,
					leixing: '红宝石' + index,
					itemPrice: '￥6999.00'
				};
				addArray.push(arrayList);
			}
			this.array = this.array.concat(addArray);


		},
		onReachBottom() { //触底加载新数据{img: '../../static/index/pic.png',itemTitle: '非洲红宝石吊坠新球落坠',itemClassify: '耳环',leixing: '红宝石',itemPrice: '￥6999.00'}

			this.pageNum++
			console.log(this.pageNum, "页面触底了");
			// this.list = [...this.array, ...['aa', 'bb']]; //在原有数据的基础上添加新的数据['aa','bb']，叫做展开语法
			let addArray = [];  //新循环出来的数组
			if (this.pageNum < 5) {
				for (let i = 0; i < 10; i++) {
					let nextIndex = i + 1;  //下一页的个数
					let arrayList = {
						img: '../../static/index/pic.png',
						itemTitle: '非洲红宝石吊坠新球落坠' + ((this.pageNum-1)*10+nextIndex),
						itemClassify: '耳环' + ((this.pageNum-1)*10+nextIndex),
						leixing: '红宝石' + ((this.pageNum-1)*10+nextIndex),
						itemPrice: '￥6999.00'
					};
					addArray.push(arrayList);
				}
				this.array = this.array.concat(addArray);
			} else {
				console.log("人家也是有底线滴~");
				this.isNotdata = !this.isNotdata;
			}

		},
		methods: {}
	}
</script>

<style>
	/* 状态栏 */
	.statusBar {
		width: 100%;
		background: #fff;
	}

	/* end */
	/* 导航栏 */
	.nav {
		/* width: 675rpx; */
		height: 80rpx;
		padding: 0 37.5rpx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0px 3px 6px 0px rgb(0, 0, 0, 0.1);
	}

	.navTitle {
		font-size: 32rpx;
		font-weight: bold;
	}

	.search {
		width: 32rpx;
		height: 32rpx;
	}

	.search image {
		width: 100%;
		height: 100%;
	}

	/* end */
	/* banner */
	.banner {
		padding: 37.5rpx 37.5rpx 10rpx 37.5rpx;
		border-radius: 14rpx;
	}

	.banner image {
		width: 100%;
		height: 100%;
		border-radius: 14rpx;
	}

	uni-swiper {
		height: 340rpx;
	}

	/* end */
	/* 分类 */
	.classify {
		padding: 0 36rpx;
		display: flex;
		justify-content: space-between;
		margin: 16rpx 0 0 0;
	}

	.clItem {
		width: 20%;
		margin: 18px 0 0 0;
		/* background-color: #007AFF; */
	}

	.clItemPic {
		width: 100rpx;
		height: 100rpx;
		margin: 0 auto;
		border-radius: 1000000px;
		background: #007AFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.clItemPic image {
		width: 60%;
		height: 60%;
		display: block;
	}

	.clItemTitle {
		font-size: 28rpx;
		text-align: center;
		margin-top: 16rpx;
	}

	/* end */
	/* 今日特惠 */
	.preferential {
		padding: 0 36rpx;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 24rpx;
		margin: 60rpx 0rpx 0rpx 0rpx;
	}

	.preItem {
		width: 100%;
		height: 300rpx;
	}

	.preItem image {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 14rpx;
	}

	.preItemOne {
		background: url(../../static/index/img1.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		border-radius: 14rpx;
	}

	.preItemOneTitle {
		width: fit-content;
		padding: 10rpx 24rpx 10rpx 24rpx;
		border-top-left-radius: 14rpx;
		border-bottom-right-radius: 14rpx;
		background: red;
		color: #fff;
		font-size: 28rpx;
	}

	.preItemTwo {
		display: grid;
		grid-row-gap: 24rpx;
	}

	.preItemChild {
		background: red;
		border-radius: 14rpx;
	}

	/* end */
	/* 内容 */
	.contentInfor {
		/* width: 675rpx; */
		padding: 0 37.5rpx;
		margin: 0 auto;
	}

	.conTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 60rpx 0 32rpx 0;
	}

	.conDetails {
		font-size: 32rpx;
		font-weight: bold;
	}

	.conMore {
		display: flex;
		align-items: center;
	}

	.moreTitle {
		font-size: 28rpx;
	}

	.moreImg {
		width: 40rpx;
		height: 40rpx;
	}

	.moreImg image {
		width: 100%;
		height: 100%;
	}

	.conInfor {
		display: grid;
		grid-template-columns: 1fr 1fr;
		/* grid-template-rows: 50% 50%; */
		grid-column-gap: 24rpx;
		/* 列间距 */
		grid-row-gap: 24rpx;
		/* 行间距 */
	}

	.inforItem {
		/* width: 337rpx; */
		/* height: 200rpx; */
		/* background: red; */
		margin: 12rpx 0 12rpx 0;
	}

	.itemPic {
		width: 100%;
		height: 360rpx;
		background: #b8a291;
		border-radius: 12rpx;
	}

	.itemPic image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.itemTitle {
		font-size: 28rpx;
		margin: 36rpx 0rpx 16rpx 0rpx;
	}

	.itemClassify {
		font-size: 24rpx;
	}

	.itemPrice {
		font-size: 28rpx;
		margin: 10rpx 0rpx 0rpx 0rpx;
	}

	/* end */
</style>
