<template>
	<view>
		<image class="top-img" :src="'../../static/img/i_03.png'"></image>
		<view class="avator-box">
			<image class="img" src=""></image>
			<view class="name">彭于晏</view>
		</view>
		<view class="panel">
			<navigator class="line-item arrow" hover-class="none" url="/pages/center/myLamp">
				<image class="img" :src="'../../static/img/i_35.jpg'"></image>
				<text class="lab">个人供灯信息</text>
			</navigator>
			<navigator class="line-item arrow" hover-class="none" url="/pages/lampTemple/lampPosition">
				<image class="img i2" :src="'../../static/img/i_40.jpg'"></image>
				<text class="lab">绑定手机号</text>
			</navigator>
		</view>
		<view class="footer-box flex-box">
			<view class="flex-item">
				<image class="img" :src="'../../static/img/i_56.jpg'"></image>
				<view class="txt">功德随喜</view>
			</view>
			<view class="flex-item">
				<image class="img" :src="'../../static/img/i_58.jpg'"></image>
				<view class="txt">我的功德</view>
			</view>
		</view>
	</view>
</template>
<script>
	const util = require('@/utils/util.js');
	export default {
		data() {
			return {
				mes: '',
				phone: '',
			}
		},
		methods: {
			saveMsg () {
			    if (!this.mes) {
			        uni.showToast({
			            icon: "none",
			            title: "请留下您的宝贵意见和建议，我们将努力改进"
			        })
			        return false;
			    }
			    if (!this.phone) {
			        uni.showToast({
			            icon: "none",
			            title: "请留下你的手机号"
			        })
			        return false;
			    }
			    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
			    if (!phoneReg.test(this.phone)) {
			        uni.showToast({
			            icon: "none",
			            title: "请正确填写手机号码"
			        })
			        return false;
			    }
			
			    var that = this;
			    var url = "getAddress.ashx"
			    var params = {};
			    params.RID = id;
			    util.POST({
			        url: url,
			        params: JSON.stringify(params),
			        success: function (res) {
			            var oData = res.data[0]
			            if (oData.Status == 200) {
			                var data = oData.Data[0];
			                that.setData({
			                    user: data,
			                    region: [data.Province, data.City, data.County]
			                })
			            } else {
			                uni.showToast({
			                    icon: 'none',
			                    title: oData.Msg,
			                    duration: 1000
			                })
			            }
			        }
			    })
			}
		}
	}
</script>
<style lang="scss">
	page{
		background:#fbe5c3;
	}
	.top-img{
		display: block;
		width:100%;
		height:240rpx;
		margin-top:-2rpx;
		
	}
	.avator-box{
		podition:relative;
		width:154rpx;
		margin:-92rpx auto 0;
		text-align:center;
		color:$color;
		.img{
			width:154rpx;
			height:154rpx;
			border-radius: 150rpx;
			background: #eee;
		}
	}
	.panel{
		margin: 120rpx 0 0;
		.lab{
			color:$color;
		}
		.line-item{
			height:118rpx;
			padding-left:40rpx;
			&:first-child{
				&:after{
					position:absolute;
					left:40rpx;
					bottom:0;
					content:"";
					width:670rpx;
					border-bottom:1px solid #cccccc;
					
				}
			};
			
		}
		.img{
			float:left;
			width:70rpx;
			height:44rpx;
			margin-top:39rpx;
			margin-right:30rpx;
			&.i2{
				margin-top:24rpx;
				height:70rpx;
			}
		}
	}
	.footer-box{
		position:fixed;
		bottom:0;
		left:0;
		width:100%;
		padding-top:6px;
		text-align: center;
		height:94rpx;
		color:#d4cebf;
		background: #fff;
		.img{
			display: block;
			margin:0 auto;
			width:40rpx;
			height:46rpx;
			line-height: 1;
		}
		.txt{
			line-height: 40rpx;
			font-size: 24rpx;
		}
	}
</style>