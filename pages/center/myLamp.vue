<template>
	<view class="shopCart-page">
	    <view class="empty" v-if="isLogin">
	        <view class="txt">当前没有登录哦~  T.T</view>
	        <view class="subTxt">快去登录吧</view>
	        <navigator class="btn toActive" url="/pages/center/login">去登录</navigator>
	    </view>
	    <block v-if="!isLogin">
	        <view class="tab-bar flex-box">
	            <view class="flex-item" :class="{on: curType == 0}" @click='changeTab(0)'>全部</view>
	            <view class="flex-item" :class="{on: curType == 1}" @click='changeTab(1)'>即将过期</view>
	            <view class="flex-item" :class="{on: curType == 2}" @click='changeTab(2)'>已过期</view>
	            <view class="flex-item" :class="{on: curType == 3}" @click='changeTab(3)'>预约点灯</view>
	        </view>
	        <view class="empty-box" v-if="!goodsList.length">
	            <image class="img" :src="'../../static/img/i_15.jpg'"></image>
				<navigator open-type="switchTab" url="/pages/lampTemple/list">
					<image class="go-btn" :src="'../../static/img/i_52.jpg'"></image>
				</navigator>
	        </view>
	        <view class="page-content" v-if="goodsList.length">
	            <view class="panel msg-item clearfix" v-for="(item, index) in goodsList" :key="index">
					<view class="name">{{item.temple}}</view>
					<view calss="master">
						收福人： <text class="c9a">{{item.owner}}</text>
						<text class="ml20">类型：<text class="c9a">{{item.type}}</text></text>
					</view>
					<view class="time-box">
						剩余时长：
						<min-countdown :targetTime="item.time" @callback="timeEnd(1)" :format="format"></min-countdown>
					</view>
					<template v-if="item.isEnd==1">
						<image class="type-img" src="/static/img/i_19.jpg"></image>
						<view class="go-btn">再次点灯</view>
					</template>
				</view>
	        </view>
	    </block>
	</view>
</template>
<script>
	const util = require('@/utils/util.js');
	import minCountdown from '@/components/min-countdown/min-countdown.vue'
	export default {
		components: {minCountdown},
		data() {
			return {
				isLogin: 0,
				curType: 0,
				goodsList: [
					{
						temple: '敦化正觉寺',
						owner: '彭原因',
						type: '学业灯',
						time: new Date().getTime() + 18976754328,
					},
					{
						temple: '敦化正觉寺',
						owner: '彭原因',
						type: '学业灯',
						isEnd: 1,
						time: new Date().getTime() + 0,
					}
				],
				format: `
					<div class="time-box">
						<span style="text-align:center;color:#fff;background: #333;padding:0 2px;">{%d0}{%d1}{%d2}</span> 天
						<span style="text-align:center;color:#fff;background: #333;padding:0 2px;">{%h0}{%h1}</span> 时
						<span style="text-align:center;color:#fff;background: #333;padding:0 2px;">{%m0}{%m1}</span> 分
						<span style="text-align:center;color:#fff;background: #333;padding:0 2px;">{%s0}{%s1}</span> 秒
					</div>
				`
			}
		},
		onLoad (options) {
		    this.getMsg(0, 0)
		},
		
		methods: {
			changeTab(type) {
			    this.curType = type
			},
			getMsg(type, page) {
			    var that = this;
			    var url = "getMyCollectionList.ashx";
			    var params = {};
			    util.POST({
			        url: url,
			        params: JSON.stringify(params),
			        success: function (res) {
			            var oData = res.data[0]
			            if (oData.Status === "200") {
			                that.setData({
			                    curPage: page,
			                })
			                // 如果页码为1，不进行列表叠加
			                if (page == 0) {
			                    that.setData({
			                        ["cartItems"]: oData.Data
			                    })
			                } else {
			                    var data = that.data.ListList.concat(oData.Data[0].List);
			                    that.setData({
			                        ["cartItems"]: data
			                    })
			                }
			
			                if (oData.Data[0].Page >= oData.Data[0].PageCount - 1) {
			                    that.setData({
			                        isLoadData: false
			                    })
			                } else {
			                    that.setData({
			                        isLoadData: false
			                    })
			                }
			            } else {
			                uni.showToast({
			                    icon: 'none',
			                    title: oData.Msg,
			                    duration: 1000
			                })
			            }
			        }
			    })
			},
			// 时间结束
			timeEnd (id) {
				console.log(id)
			}
		}
	}
</script>
<style lang="scss">
	page{
		background: #fbf7ef;
	}
	.ml20{
		margin-left:30rpx;
	}
	.c9a{
		color:$color;
	}
	.tab-bar{
	    height:120rpx;
	    margin-bottom:20rpx;
	    line-height: 120rpx;
	    text-align: center;
		color:#6d6052;
		.flex-item{
			border:1rpx solid #e1a969;
			&.on{
				color:#fff;
				border-color:#b95749;
				background: #b95749;
			}
		}
	}
	.empty-box{
		position:relative;
		text-align:center;
		.img{
			width:602rpx;
			height:533rpx;
			margin-top:56rpx;
		}
		.go-btn{
			width:200rpx;
			height:200rpx;
			margin:56rpx auto 0;
		}
	}
	.cb9{
		color:#b95749;
	}
	.msg-item{
		position:relative;
		padding-left:15rpx;
		line-height: 60rpx;
		color:#333;
		.go-btn{
			float:right;
			width:160rpx;
			height:54rpx;
			margin-right:60rpx;
			margin-bottom:30rpx;
			text-align:center;
			color:#b95749;
			line-height: 54rpx;
			border-radius: 54rpx;
			border:1rpx solid #b95749;
		}
		.type-img{
			position:absolute;
			width: 124rpx;
			height:103rpx;
			top:0;
			right:20rpx;
		}
	}
	.time-box{
		color:#333;
		
	}
</style>