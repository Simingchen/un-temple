<template>
	<view>
		<view class="panel">
		    <view class="line-item arrow clearfix">
		        <view class="receiver-box">
		            <view>彭于晏  <text>13926012345</text></view>
		        </view>
		        <view class="addr-detail">
		            北京a是发撒地方电饭锅都是法国是的法规优惠价㔿
		        </view>
		    </view>
		</view>
		<view class="panel goods-box">
		    <view class="title">商品列表</view>
		    <view class="flex-box">
		        <image class="img" src="http://qn.fayuanhui.cn/2d2da218534518a64eee630d33132d5e.jpg"></image>
		        <view class="flex-item">
		            <view class="name">南泉寺翡翠8寸圆满观音玉佩观音玉佩观音玉佩</view>
		            <view class="num">数量 1</view>
		            <view class="price">¥46666.00</view>
		        </view>
		    </view>
		</view>
		<view class="panel clearfix">
		    <text>即时发货</text>
		    <switch class="fr"></switch>
		</view>
		<view class="panel clearfix">
		    <text>即时发货</text>
		    <switch class="fr"></switch>
		</view>
		<view class="tips">
		    特别注意：此平台因商品特殊性概不退换，请谨慎购买。
		</view>
		<view class="footer-box">
		    <view class="hr28"></view>
		    <view class="footer flex-box">
		        <view class="flex-item b1">合计 <text class="total">¥19998</text></view>
		        <view class="b2" bindtap='saveOrder'>确认付款</view>
		    </view>
		</view>
	</view>
</template>
<script>
	const util = require('@/utils/util.js');
	export default {
		data () {
			return {
				
			}
		}
	}
</script>
<style lang="scss">
	.panel{
	    padding:30rpx;
	}
	.line-item{
	    padding-top:10rpx;
	    background: #fff;
	    line-height: 64rpx;
	    font-size: 34rpx;
	    margin-bottom:-10rpx;
		&.arrow{
		    position:relative;
			&:before{
			     position:absolute; 
			    content:"";
			    right:0rpx;
			    top:50%;
			    width:15rpx;
			    height:15rpx;
			    border-top:3rpx solid #666;
			    border-right:3rpx solid #666;
			    transform: rotate(45deg) translate(-50%);
			}
		}
	}
	.goods-box {
		.title{
		    line-height: 80rpx;
		    margin-top:-25rpx;
		    font-size: 32rpx;
		}
		.img{
		    width:200rpx;
		    height:200rpx;
		    margin-right: 30rpx;
		    border-radius: 6rpx;
		}
		.name{
		    line-height: 56rpx;
		    font-size: 34rpx;
		}
		.num{
		    line-height: 56rpx;
		    color:#999;
		}
		.price{
		    color:#803437;
		}
	}
	.tips{
	    color:#bd151d;
	}
	.footer{
	    position: fixed;
	    width:100%;
	    bottom:0;
	    height: 100rpx;
	    font-size: 36rpx;
	    line-height: 100rpx;
	    color: #fff;
		.b1{
		    font-size: 30rpx;
		    padding-left:30rpx;
		    color:#2c3e50;
		    background: #fff;
		}
		.b2{
		    width:340rpx;
		    text-align: center;
		    background: #bd151d;
		}
		.total{
		    margin-left:25rpx;
		    font-size: 32rpx;
		    font-weight: 600;
		    color:#bd151d;
		}
	}
</style>

