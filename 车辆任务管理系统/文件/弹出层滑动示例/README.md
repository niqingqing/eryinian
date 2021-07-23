### poput-scroll 产品特点
1. 手机端阻止滚动穿透、阻止滚动默认事件时用 transform 实现滚动

### poput-scroll 使用说明
1. 本组件主要是阻止滚动穿透、阻止滚动默认事件实现页面滚动， 使用场景一般配合弹窗类组件使用
2. demo 项目依赖 uni-popup

```
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
```

```
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import popupScroll from '@/components/popup-scroll/popup-scroll.vue'
export default {
	name: "demo",
	components: {
		uniPopup,
		popupScroll
	}
}
```

3. h5 预览
<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-btu2qmnksdny085b7d/3603c730-19be-11eb-8a36-ebb87efcf8c0.png" width="200" height="200" alt="qrcode" align=center />
