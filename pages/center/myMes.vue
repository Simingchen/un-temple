<template>
	<view class="shopCart-page">
	    <view class="empty" v-if="isLogin">
	        <view class="txt">当前没有登录哦~  T.T</view>
	        <view class="subTxt">快去登录吧</view>
	        <navigator class="btn toActive" url="/login">去登录</navigator>
	    </view>
	    <block v-if="!isLogin">
	        <view class="tab-bar flex-box">
	            <view class="flex-item" :class="{on: curType == 0}" bindtap='changeTab(0)'>供灯消息</view>
	            <view class="flex-item" :class="{on: curType == 1}" bindtap='changeTab(1)'>系统消息</view>
	        </view>
	        <view class="empty tac" v-if="!goodsList.length">
	            <view class="txt">暂无消息~</view>
	        </view>
	        <view class="page-content" v-if="goodsList.length">
	            
	        </view>
	    </block>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				curType: 0,
				goodsList: []
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
			    params.Size = size;
			    params.Page = page;
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
		}
	}
</script>
<style>
	.tab-bar{
	    height:100rpx;
	    margin-bottom:20rpx;
	    line-height: 100rpx;
	    background: #f9f9f9;
	    text-align: center;
	    border-top:1rpx solid #dadada;
	}
	.tab-bar .flex-item.on{
	    color:#c40606;
	}
</style>