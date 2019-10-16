<template>
<view>
	<view class="user-top">
	    <navigator class="set" hover-class="none" url="/pages/center/login">
	        退出
	    </navigator>
	    <view>
	        <image class="avactor" src=""></image>
	    </view>
	    <navigator hover-class="none" url="/pages/center/myInfor" class="txt-line">
	        <text class="name">彭于晏</text>
	    </navigator>
	</view>
	<view class="panel flex-box main-tab">
	    <navigator hover-class="none" class="flex-item" url="/pages/center/myStamp/index">
			<image class="img" :src="'../../static/img/jpg_03.jpg'"></image>
	        <view class="txt">我的冠名</view>
	    </navigator>
	    <navigator hover-class="none" class="flex-item" url="/pages/center/myLamp/index">
			<image class="img" :src="'../../static/img/jpg_05.jpg'"></image>
	        <view  class="txt">我的供灯</view>
	    </navigator>
	    <navigator hover-class="none" class="flex-item" url="/pages/goods/collect">
			<image class="img" :src="'../../static/img/jpg_07.jpg'"></image>
	        <view  class="txt">我的收藏</view>
	    </navigator>
	</view>
	<view class="panel feed-panel">
	    <view class="title">近期供灯</view>
	    <view class="con">
	        <view>你还没有供灯哦</view>
	        <navigator class="btn" open-type="switchTab" hover-class="none" url="/pages/lampTemple/list/index">去供灯</navigator>
	    </view>
	</view>
	<view class="panel">
	    <view class="title">我的法物</view>
	    <view class="tab-list flex-box">
	        <navigator class="flex-item" url="/pages/order/list?type=-1">
				<image class="img" :src="'../../static/img/jpg_13.jpg'"></image>
	            <view >全部订单</view>
	        </navigator>
	        <navigator class="flex-item" url="/pages/order/list?type=0">
				<image class="img" :src="'../../static/img/15.jpg'"></image>
	            <view >等待支付</view>
	        </navigator>
	        <navigator class="flex-item" url="/pages/order/list?type=1">
				<image class="img" :src="'../../static/img/17.jpg'"></image>
	            <view >等待发货</view>
	        </navigator>
	        <navigator class="flex-item" url="/pages/order/list?type=2">
				<image class="img" :src="'../../static/img/jpg_15.jpg'"></image>
	            <view >等待收货</view>
	        </navigator>
	    </view>
	</view>
	<view class="panel">
	    <view class="title">其他</view>
	    <view class="tab-list flex-box">
	        <navigator  class="flex-item" hover-class='none' url="/pages/center/addrlist">
				<image class="img" :src="'../../static/img/jpg_19.jpg'"></image>
	            <view >地址管理</view>
	        </navigator>
	        <navigator  class="flex-item" hover-class='none' url="/pages/center/changePhone">
				<image class="img" :src="'../../static/img/jpg_21.jpg'"></image>
	            <view >绑定手机号</view>
	        </navigator>
	        <navigator  class="flex-item" hover-class='none' url="/pages/center/myMes">
				<image class="img" :src="'../../static/img/jpg_23.jpg'"></image>
	            <view >我的消息</view>
	        </navigator>
	        <navigator  class="flex-item" hover-class='none' url="/pages/center/feedback">
				<image class="img" :src="'../../static/img/jpg_25.jpg'"></image>
	            <view >意见反馈</view>
	        </navigator>
	    </view>
	</view>
</view>
</template>
<script>
	const util = require('@/utils/util.js');
	export default {
		data() {
			return {
				user: {},
			}
		},
		onLoad() {
			this.getMsg();
		},
		methods: {
			getMsg: function () {
			    var that = this;
			    var url = "getMember.ashx"
			    util.POST({
			        url: url,
			        success: function (res) {
			            var oData = res.data[0]
				
			            if (oData.Status == 200) {
			                that.setData({
			                    user: oData.Data[0]
			                })
			            }
			        }
			    })
			},
		}
	}
</script>
<style lang="scss">
	page{
	    padding-bottom:20rpx;
	}
	.user-top{
	    position: relative;
	    height:405rpx;
	    background: #b95749;
	}
	.user-top .set{
	    position: absolute;
	    right:38rpx;
	    top:20rpx;
	    width:66rpx;
	    height:50rpx;
	    text-align: center;
	}
	.set-icon{
	    width:38rpx;
	    height:38rpx;
	}
	.panel .img{
	    width:66rpx;
	    height:58rpx;
	}
	.main-tab .img{
		width:84rpx;
		height:68rpx;
	}
	.user-top{
	    padding-top:50rpx;
	    text-align: center;
	    color:#fff;
		.avactor{
		    width:130rpx;
		    height:130rpx;
		    border-radius: 130rpx;
		    background: #999;
		}
		.txt-line{
		    line-height: 80rpx;
		}
	}
	.edit{
	    display: inline-block;
	    height:30rpx;
	    padding-right:26rpx;
	    margin-left:26rpx;
	    background-size: 26rpx 30rpx;
	    vertical-align: middle;
	}
	.panel {
	    text-align: center;
		.txt{
		    font-size: 34rpx;
		    color: #2c3e50;
		}
		.title{
		    color: #999;
		    font-size: 34rpx;
		    line-height: 48rpx;
		    padding-top: 30rpx;
		    padding-left: 30rpx;
		    text-align: left;
		}
	}
	.tab-list .flex-item{
	    padding: 36rpx 0 40rpx;
	}
	.main-tab{
	    position: relative;
	    padding: 44rpx 0 40rpx;
	    margin-top: -110rpx;
	    text-align: center;
	    line-height: 48rpx;
	}
	.feed-panel {
		padding-bottom:70rpx;
		.con{
		    padding-top:60rpx;
		}
		.txt{
		    font-size: 34rpx;
		}
		.btn{
		    font-size: 34rpx;
		    width:176rpx;
		    height:68rpx;
		    padding:0;
		    margin-top:30rpx;
		    margin-bottom:0;
		    line-height: 68rpx;
		    border-radius: 3rpx;
		}
	}
	
</style>