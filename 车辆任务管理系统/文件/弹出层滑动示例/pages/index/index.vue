<template>
	<view class="content">
		<text @click="$refs.popup.open()">点击打开弹窗</text>
		<uni-popup ref="popup">
			<popup-scroll style="height: 700rpx; width: 700rpx; background-color: #fff;">
				<view v-for="item in 40" :key="item" style="line-height: 60rpx;">{{item}}</view>
			</popup-scroll>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import popupScroll from '@/components/popup-scroll/popup-scroll.vue'
	export default {
		name: "demo",
		components: {
			uniPopup,
			popupScroll
		}
	}
</script>
