<template>
	<view>
		<view class="user-top">
		    <view class="avactor-box">
		        <image class="avactor" src=""></image>
		    </view>
		    <view class="txt-line">
		        彭于晏
		    </view>
		</view>
		<view class="panel">
		    <view class="line-item arrow clearfix">
		        <text class="lab">昵称</text>
		        <navigator data-type="name" class="fr" hover-class="none" :url="'/pages/center/editTxt/editTxt?type=nickname&txt=' + user.Name">
		            彭于晏
		        </navigator>
		    </view>
		    <view class="line-item arrow clearfix">
		        <text class="lab">性别</text>
		        <navigator data-type="name" class="fr" hover-class="none" :url="'/pages/center/editTxt/editTxt?type=nickname&txt=' + user.Name">
		            男
		        </navigator>
		    </view>
		    <view class="line-item arrow clearfix">
		        <text class="lab">出生日期</text>
		        <view data-type="name" class="fr">
		            1992-07-28
		        </view>
		    </view>
		    <view class="line-item arrow clearfix">
		        <text class="lab">绑定手机号</text>
		        <navigator data-type="name" class="fr" hover-class="none" url="/pages/center/changePhone">
		            13926012343
		        </navigator>
		    </view>
		</view>
		<view class="btn save-btn">返回</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				user: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>
<style lang="scss">
	.panel{
	    padding:0 30rpx;
	    overflow: hidden;
	}
	.user-top{
	    height:290rpx;
	    padding-top:32rpx;
	    text-align: center;
	    color:#fff;
	}
	.avactor-box{
	    height:184rpx;
	}
	.user-top .avactor{
	    width:184rpx;
	    height:184rpx;
	    border-radius: 184rpx;
	    background: #999;
	}
	.user-top .txt-line{
	    line-height: 74rpx;
	    color:#999;
	}
	.line-item{
	    padding-left:30rpx;
	    padding-right:65rpx;
	    color:#666;
	    line-height: 116rpx;
	    font-size: 30rpx;
	    border-bottom:1rpx solid #e9e9e9;
	}
	.line-item:last-child{
	    border-bottom:0;
	}
	.line-item.arrow{
	    position:relative;
	}
	.line-item.arrow:before{
	     position:absolute; 
	    content:"";
	    right:33rpx;
	    top:50%;
	    width:15rpx;
	    height:15rpx;
	    border-top:3rpx solid #666;
	    border-right:3rpx solid #666;
	    transform: rotate(45deg) translate(-50%);
	}
	.line-item .lab{
	    float:left;
	    line-height: 116rpx;
	    height: 116rpx;
	    color:#000;
	}
	.save-btn{
	    width: 710rpx;
	    margin:100rpx auto;
	    text-align: center;
	    height:92rpx;
	    line-height: 92rpx;
	    font-size: 32rpx;
	}
</style>