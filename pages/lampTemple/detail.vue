<template>
	<view>
		<view class="top">
		    <image src="http://qn.fayuanhui.cn/c701c321e8760d2d54f7cedf25726cf1.jpg"></image>
		</view>
		<navigator class="order-btn" url="/pages/lampTemple/orderLamp">
			<image class="img" src="/static/img/i_46.jpg"></image>
		</navigator>
		<view class="panel detail-con">
		    <view class="detail-tit">关于寺院</view>
		    <view class="detail-master">住持：戒宝法师</view>
		</view>
	</view>
</template>
<script>
	const util = require('@/utils/util.js');
	export default {
		data() {
			return {
				temple: {}
			}
		},
		onLoad (options) {
		    this.getData(0, 10)
		},
		methods: {
			getList (page, size) {
			    var that = this;
			    var url = "api/getOrderList"
			    var params = {};
			    params.Page = page;
			    params.Size = size;
			    params.search = search;
			
			    util.POST({
			        url: url,
			        params: JSON.stringify(params),
			        success: function (res) {
					}
			    })
			},
		}
	}
</script>
<style lang="scss">
	.top{
	    height:750rpx;
		image{
		    width:100%;
		    height:750rpx;
		}
	}
	
	.core-light-item image{
	    width:62rpx;
	    height:48rpx;
	}
	.hr28{
	    height: 120rpx;
	}
	.detail-con{
	    padding: 30rpx;
	}
	.detail-con .detail-tit{
	    font-size: 40rpx;
	    line-height: 56rpx;
	}
	.detail-master{
	    line-height: 48rpx;
	    margin-top: 22rpx;
	}
	.order-btn{
		position:fixed;
		right:0px;
		top:714rpx;
		width:150rpx;
		height:80rpx;
		vertical-align: middle;
		background:#b95749;
		z-index:10;
		border-radius:80rpx 0 0 80rpx;
		.img{
			display: block;
			margin-top:20rpx;
			margin-left:8rpx;
			width:133rpx;
			height:37rpx;
		}
	}
</style>