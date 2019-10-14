<template>
	<view>
		<view class="edit-box" wx:if="{{type == 'nickname'}}">
		    <textarea class="line-item" value="{{msg}}" bindinput='checkNum' maxlength="{{all}}"></textarea>
		    <view class="num">{{num}}/{{all}}</view>
		</view>  
		<view class="edit-box" wx:if="{{type == 'sign'}}">
		    <textarea class="line-item" value="{{msg}}" bindinput='checkNum2' maxlength="{{all2}}"></textarea>
		    <view class="num">{{num2}}/{{all2}}</view>
		</view> 
		<view class="edit-box" wx:if="{{type == 'job'}}">
		    <textarea class="line-item" value="{{msg}}" bindinput='checkNum2' maxlength="{{all2}}"></textarea>
		    <view class="num">{{num2}}/{{all2}}</view>
		</view>
		<view class="edit-box" wx:if="{{type == 'city'}}">
		    <textarea class="line-item" value="{{msg}}" bindinput='checkNum2' maxlength="{{all2}}"></textarea>
		    <view class="num">{{num2}}/{{all2}}</view>
		</view>
	</view>
</template>
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
<style>
	page{
	    background: #f4f4f4;
	}
	.edit-box{
	    position:relative;
	}
	.line-item{
	    display: block;
	    height:210rpx;
	    width:100%;
	    background: #fff;
	    border-top:1rpx solid #f4f4f4;
	    padding-left:35rpx;
	    color:#666;
	    line-height: 100rpx;
	    font-size: 27rpx;
	}
	.num{
	    position:absolute;
	    color:#a0a0a0;
	    font-size: 20rpx;
	    right:25rpx;
	    bottom:25rpx;
	}
</style>

