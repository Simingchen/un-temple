<template>
	<view class="page login-page">
	    <view class="login-form">
	        <view>
	            <input class="input-row" :value="user" type="text" maxlength="30" placeholder="输入手机号" value="1355643758"/>
	        </view>
	        <view>
	            <input  class="input-row" :value="password" @confirm="login" type="password" maxlength="20" placeholder="输入密码"/>
	        </view>
	        <button type="button" class="btn login_btn" @click="login">登录</button>
	        <view class="bot clearfix">
	            <navigator class="fl sign" url="/pages/center/register" hover-class="none">
	                立即注册
	            </navigator>
	            <navigator class="fr forget" url="/pages/center/forget" hover-class="none">
	                忘记密码?
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
				user: "",        //用户名
				password: "",    //密码
				device: ""    // 使用设备
			}
		},
		methods: {
			login: function (){
			    var that = this;
			    var user = this.data.user;
			    var password = this.data.password;
			    if (!user) {
			        uni.showModal({
			            title: "温馨提示",
			            content: "请输入手机号",
			            confirmColor: "#f79bb0"
			        })
			        return false;
			    }
			    if (!password) {
			        uni.showModal({
			            title: "温馨提示",
			            content: "请输入密码",
			            confirmColor: "#f79bb0"
			        })
			        return false;
			    }
			    
			    var url = "loginByMobile.ashx"
			    var params = {};
			    params.Mobile = user;
			    params.Password = password;
			    params.Device = that.data.device;
			
			    uni.showLoading({
			        title: "登录中..."
			    })
			
			    util.POST({
			        url: url,
			        params: JSON.stringify(params),
			        success: function (res) {
			            var oData = res.data[0]
			            uni.showToast({
			                icon: 'none',
			                title: oData.Msg,
			                duration: 1000
			            })
			            if (oData.Status === "200") {
			                uni.setStorageSync('losetime', oData.Data[0].LoseTime)
			                uni.setStorageSync('token', oData.Data[0].Token)
			
			                // 开始设置定时器检测登陆超时
			                util.setLogin(oData.Data[0].LoseTime);
			                uni.redirectTo({
			                    url: '/pages/center/mine/mine'
			                })
			            }
			        }
			    })
			},
		}
	}
</script>
<style lang="scss">
	.input-row {
	    width:600rpx;
	    height:75rpx;
	    margin:0 auto;
	    border: 1px solid $color;
	    color: #6c6c6c;
	    border-radius: 75rpx;
	    padding:0 50rpx;
	    line-height:75rpx;
	    margin-bottom:45rpx;
	    font-size: 26rpx;
	    box-sizing: border-box;
	}
	.login-form{
	    padding-top:85rpx;
	}
	.login_btn{
	    width:600rpx;
	    height:75rpx;
	    margin:0 auto;
	    border: 1px solid $color;
	    border-radius: 75rpx;
	    padding:0 50rpx;
	    line-height:75rpx;
	    margin-bottom:45rpx;
	    font-size: 26rpx;
	    color:#fff;
	    background: $color;
	}
	.bot{
	    width:600rpx;
	    padding:0 17rpx;
	    font-size: 26rpx;
	    margin:0 auto;
	    box-sizing: border-box;
	}
	.sign{
	    color:$color;
	}
</style>
