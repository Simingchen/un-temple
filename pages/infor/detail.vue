<template>
	<view class="infor">
	    <view class="infor-title">中秋节将至，恭迎月光菩萨圣诞！</view>
	    <view class="infor-top">
	        <text>法缘汇</text>     
	        <text>浏览42</text>
	        <image class="collect" src="data:image/png;base64,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"></image>
	    </view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>
<style lang="scss">
	.infor-title{
	    font-size: 40rpx;
	    line-height: 64rpx;
	}
	.infor{
	   padding: 36rpx 30rpx 60rpx;
	}
	.collect{
	    float:right;
	    height: 60rpx;
	    width: 60rpx;
	    margin-top: -15rpx;
	}
	.infor-top{
	    padding-top: 30rpx;
	    padding-bottom: 30rpx;
	    font-size: 34rpx;
	    color:#999;
	}
	.infor-top text{
	    margin-right:10rpx;
	}
</style>
