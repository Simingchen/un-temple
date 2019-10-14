<template>
	<view class="line-item clearfix">
	    <text class="lab">头像</text>
	    <view bindtap="selectPhoto">
	        <image class="avator fr" src="{{user.Head}}"></image>
	        <view class="avator fr" wx:if="{{!user.Head}}">未知</view>
	    </view>
	</view>
	<view class="line-item arrow clearfix">
	    <text class="lab">昵称</text>
	    <navigator data-type="name" class="fr" hover-class="none" url="/pages/center/editTxt/editTxt?type=nickname&txt={{user.Name}}">
	        {{user.Name}}
	        <block wx:if="{{!user.Name}}">未知</block>
	    </navigator>
	</view>
	<view class="line-item clearfix">
	    <text class="lab">ID</text>
	    <view class="fr">{{user.Number}}
	        <block wx:if="{{!user.Number}}"></block>
	    </view>
	</view>
	<view class="line-item arrow flex-box">
	    <text class="lab">生日</text>
	    <picker class="flex-item" data-type="Birthday" mode="date" value="{{user.Birthday}}" start="2015-09-01" end="2017-09-01" bindchange="changeMsg">
	        <view class="picker">
	            {{user.Birthday}}
	            <block wx:if="{{!user.Birthday}}">未知</block>
	        </view>
	    </picker>
	</view>
	<view class="line-item arrow clearfix flex-box">
	    <text data-type="constellation" class="lab">星座</text>
	    <picker class="flex-item" bindchange="bindPickerChange" value="{{index}}" range="{{constellation}}">
	        <view class="picker">
	            <block wx:if="{{index != -1}}">{{constellation[index]}}</block>
	            <block wx:if="{{index == -1}}">未知</block>
	        </view>
	    </picker>
	</view>
	<view class="line-item arrow clearfix">
	    <text class="lab">城市</text>
	    <!-- <picker class="flex-item" mode="region" bindchange="bindRegionChange" value="{{user.region}}" custom-item="{{customItem}}">
	        <view class="picker tar">
	            {{user.region[0]}}，{{user.region[1]}}，{{user.region[2]}}
	        </view>
	    </picker> -->
	    <navigator data-type="city" class="fr" hover-class="none" url="/pages/center/editTxt/editTxt?type=city&txt={{user.City}}">
	        {{user.City}}
	        <block wx:if="{{!user.City}}">未知</block>
	    </navigator>
	</view>
	<view class="line-item arrow clearfix">
	    <text class="lab">职业</text>
	    <!-- <picker class="flex-item" bindchange="jobChange" value="{{jobIndex}}" range="{{user.job}}" range-key="txt">
	        <view class="picker">
	            {{user.job[jobIndex].txt}}
	            <block wx:if="{{!user.job[jobIndex].txt}}">未知</block>
	        </view>
	    </picker> -->
	    <navigator data-type="job" class="fr" hover-class="none" url="/pages/center/editTxt/editTxt?type=job&txt={{user.Occupation}}">
	        {{user.Occupation}}
	        <block wx:if="{{!user.Occupation}}">未知</block>
	    </navigator>
	</view>
	<navigator class="line-item arrow clearfix" hover-class="none" url="/pages/center/editTxt/editTxt?type=sign&txt={{user.Introduce}}">
	    <text class="lab">个性签名</text>
	    <view data-type="sign"  class="sign fr" >
	        <text>{{user.Introduce}}</text>
	        <text wx:if="{{!user.Introduce}}">
	            这家伙很懒什么都没留下
	        </text>
	    </view>
	</navigator>
	<button class="btn mt40" bindtap="saveMsg">保存</button>
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
	/* pages/center/editMsg/editMsg.wxss */
	page{
	    background: #f4f4f4;
	}
	.lh100{
	    line-height: 100rpx;
	}
	.mt40{
	    margin-top:40rpx;
	}
	.tar{
	    text-align: right
	}
	.avator{
	    width:64rpx;
	    height:64rpx;
	    margin-top:20rpx;
	    background: #999;
	    border-radius: 64rpx;
	}
	.line-item{
	    background: #fff;
	    border-top:1rpx solid #f4f4f4;
	    padding-left:35rpx;
	    padding-right:65rpx;
	    color:#666;
	    line-height: 100rpx;
	    font-size: 27rpx;
	}
	.line-item.arrow{
	    position:relative;
	}
	.line-item.arrow:before{
	     position:absolute; 
	    content:"";
	    right:33rpx;
	    top:45rpx;
	    width:15rpx;
	    height:15rpx;
	    border-top:3rpx solid #666;
	    border-right:3rpx solid #666;
	    transform: rotate(45deg);
	}
	.line-item .lab{
	    float:left;
	    line-height: 100rpx;
	    height: 100rpx;
	    color:#000;
	}
	.flex-box{
	    display: flex;
	}
	.flex-box .flex-item{
	    flex:1;
	}
	.flex-box .flex-item .picker{
	    width:100%;
	    text-align: right
	}
	.flex-box input{
	    text-align: right;
	    flex:1;
	    height:100rpx;
	    line-height: 100rpx; 
	}
	.sign text{
	    line-height: 100rpx;
	}
</style>