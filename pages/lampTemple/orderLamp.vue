<template>
	<view>
		<view class="panel main-con">
			<view class="tit caa">供灯灯塔</view>
			<view class="flex-box">
				<view class="temple-item">
					<view class="img-box" :class="{active : curLamp == 1}" @click="switchLamp(1)">
						<image src="http://qn.fayuanhui.cn/WechatIMG1197r.jpg"></image>
					</view>
					<view class="temp-name ellipsis">上海会龙寺-西</view>
					<view class="flex-box">
						<view class="core-light-item flex-item">
							<image class="icon" src="/static/img/i_30.jpg"></image>
							<text>74</text>
						</view>
						<view class="core-light-item flex-item">
							<image class="icon" src="/static/img/i_32.jpg"></image>
							<text>1546</text>
						</view>
					</view>
				</view>
				<view class="temple-item">
					<view class="img-box" :class="{active : curLamp == 2}" @click="switchLamp(2)">
						<image src="http://qn.fayuanhui.cn/WechatIMG1196l.jpg"></image>
					</view>
					<view class="temp-name ellipsis">上海会龙寺-东</view>
					<view class="flex-box">
						<view class="core-light-item flex-item">
							<image class="icon" src="/static/img/i_30.jpg"></image>
							<text>74</text>
						</view>
						<view class="core-light-item flex-item">
							<image class="icon" src="/static/img/i_32.jpg"></image>
							<text>1546</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="panel lamp-position">
			<navigator class="line-item arrow clearfix" hover-class="none" url="/pages/lampTemple/lampPosition">
				<text class="lab caa">供灯位置</text>
				<view class="fr">18-015</view>
			</navigator>
		</view>
		<view class="panel lamp-time">
			<view class="tit caa">供灯时长</view>
			<view class="lamp-list clearfix">
				<view class="lamp-item" :class="{ on: curTime == 1 }" @click="changeTime(1)">1小时</view>
				<view class="lamp-item" :class="{ on: curTime == 2 }" @click="changeTime(2)">1天</view>
				<view class="lamp-item" :class="{ on: curTime == 3 }" @click="changeTime(3)">1个月</view>
				<view class="lamp-item" :class="{ on: curTime == 4 }" @click="changeTime(4)">1年</view>
				<view class="lamp-item" :class="{ on: curTime == 5 }" @click="changeTime(5)">常明</view>
				<view class="lamp-item" :class="{ on: curTime == 6 }" @click="changeTime(6)">随喜供灯</view>
				
			</view>
		</view>
		<view class="panel bless">
			<view class="tit caa">祈福语</view>
			<view class="bless-list clearfix">
				<view class="item" :class="{ on: curBless == 1 }" @click="changeBless(1)">平安灯</view>
				<view class="item" :class="{ on: curBless == 2 }" @click="changeBless(2)">转运灯</view>
				<view class="item" :class="{ on: curBless == 3 }" @click="changeBless(3)">学业灯</view>
				<view class="item" :class="{ on: curBless == 4 }" @click="changeBless(4)">财运灯</view>
				<view class="item" :class="{ on: curBless == 5 }" @click="changeBless(5)">姻缘灯</view>
				<view class="item" :class="{ on: curBless == 6 }" @click="changeBless(6)">求子灯</view>
				<view class="item" :class="{ on: curBless == 7 }" @click="changeBless(7)">事业灯</view>
				<view class="item" :class="{ on: curBless == 8 }" @click="changeBless(8)">长寿灯</view>
			</view>
			<scroll-view scroll-y class="bless-txt">平安是福,人人想得,俗世中祈福求事事成遂,合家安康幸福。遇逆境能化凶成吉,顺境则吉上加吉。 升官贵人: 官运亨通,鹏程万里</scroll-view>
		</view>
		<view class="panel">
			<view class="tit caa">祈福语</view>
			<view class="input-box flex-box">
				<view class="lab caa">祈福人姓名</view>
				<input class="flex-item" placeholder="选填姓名" maxlength="15" :value="user.send" />
			</view>
			<view class="input-box flex-box">
				<view class="lab caa">收福人姓名</view>
				<input class="flex-item" placeholder="选填姓名" maxlength="25" :value="user.receiver" />
			</view>
			<view class="input-box flex-box">
				<view class="lab caa">短信收福人</view>
				<input class="flex-item" placeholder="选填手机号码" type="number" maxlength="11" :value="user.msg" />
			</view>
		</view>
		<view class="footer-box">
			<view class="hr28"></view>
			<view class="footer flex-box">
				<view class="flex-item b1">
					合计
					<text class="total">¥19998</text>
				</view>
				<view class="b2" @click="saveOrder">随喜捐赠</view>
			</view>
		</view>
	</view>
</template>
<script>
const util = require('@/utils/util.js');
export default {
	data() {
		return {
			curLamp: 1,
			curTime: 1,
			curBless: 1,
			bless: 1, // 祝福语
			user: {
				send: '',
				receiver: '',
				msg: ''
			}
		};
	},
	onLoad(options) {
		this.getMsg();
	},
	methods: {
		getMsg: function() {
			var that = this;
			var url = 'getMember.ashx';
			util.POST({
				url: url,
				success: function(res) {
					var oData = res.data[0];

					if (oData.Status == 200) {
						that.setData({
							user: oData.Data[0]
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: oData.Msg,
							duration: 1000
						});
					}
				}
			});
		},
		// 顶部灯选择
		switchLamp (lamp) {
			this.curLamp = lamp
		},
		// 供灯时长
		changeTime(time) {
			this.curTime = time;
		},
		// 祈福语
		changeBless(time) {
			this.curBless = time;
		},
		saveOrder() {
			// if (!this.data.name) {
			//     uni.showToast({
			//         icon: "none",
			//         title: "冠名文字不能为空"
			//     })
			//     return false;
			// }
			// if (!this.data.led) {
			//     uni.showToast({
			//         icon: "none",
			//         title: "LED显示文字不能为空"
			//     })
			//     return false;
			// }

			var that = this;
			var url = 'getMember.ashx';
			util.POST({
				url: url,
				success: function(res) {
					var oData = res.data[0];

					if (oData.Status == 200) {
						// 微信支付
						util.PAY(oData.Data[0].Number, {
							success() {
								uni.redirectTo({
									url: '/pages/orderList/orderList'
								});
							},
							fail() {
								uni.redirectTo({
									url: '/pages/orderList/orderList'
								});
							}
						});
					}
				}
			});
		}
	}
};
</script>
<style lang="scss">
page {
	background: #fbf7ef;
}
.caa {
	color: #aa040c !important;
}
.panel {
	padding: 30rpx;
	margin:0rpx;
	margin-bottom:20rpx;
	.tit{
		margin-left: -20rpx;
		padding-left:26rpx;
		background: url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAASABIDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAACAYJ/8QAGQEAAwEBAQAAAAAAAAAAAAAABgcIBQME/9oADAMBAAIQAxAAAABpL2wJjhtMkrn4Rh1IQHgLUPvKRcFaCJIs+tGj6R//xAAmEAAABgICAQQDAQAAAAAAAAABAgMEBQYHEQgSAAkTIjEQUmEV/9oACAEBAAE/AOTedKHyuss3/sc0YiDGLnWjfG1DhZhVFGQ6OkwUevlAS2t3ARKRMA6F/cd+WfNA4a5C2/JWI8ZhSpWu2F6m9jCWJ0RK0gmY4iqo2K3MQfe1spu/2YPKj6j+JbDVIyfk6rYGLl9HoOHDI8YcTNznIBjJj/SiOvL1iqbwW+VwZeas3aq02gPGMTICiAlkWISkcKDkDfuPyAwfYD5mO2ZqrmUUriNkGbRsN8scbB14l6kiPJJVJyqgigZugBvZKQ3XoYA66DZhDyr+kfynl61Hy03zFusW9dMUVncaWfWODRUxAE6IG38uoiJd+c24GCkMKS79/CtF1yNk0yLLNimOUguUREoCIb1sAHXnph1WryXODL8vI1tg4dsLU9MwdLsyHUbCZU3YUzCGyb/n4//EACYRAAEDAwMCBwAAAAAAAAAAAAECAxEABBIFIVEGMRATFCIkcfD/2gAIAQIBAT8A1G9Y1R1QN0EwQEIBInfdSjG88dhTl36PUHXmEYFJMjI++J3IiN6Z1+0caSshQJAMR2p20XY/GcTBQggHkZJg/dXjt63deZllktaUjNUkgkAQJimuldRU2Cu5WCQJGR2PFau2hVmokD8a6baaVrNyopEhRg8b+H//xAAlEQACAgEDBAEFAAAAAAAAAAABAgMEEQUGEgAHEyFSEBQiQnH/2gAIAQMBAT8A2VtnVtjUYHj0GSbnG5tWJIwxTKNxjhXlhCuMs5PJviMe6G3TuPaNHTtUtG1HPHGVfxITWzj8RIZA2I/2HHrUO0Ov0780EcsTqjMoYOMMASAw/uM9aZr1fdCnWqcpYWrMbuufcchgsc0x8R6x1tqjtm7oDVPF4jBWqySS/bwFIwyK7uJHILlhnkCc59KD1d7/AOy69yWKDQq8iKxCuYlBYAkBsY9ch7x126tWYdxRJG5UZJwCQM8G671XrsPbXQ4Y5WVHgj5KGIDYX1yGcHH0/9k=) 0 14rpx no-repeat;
		line-height: 25px;
		background-size:18rpx 18rpx;
	}
}
.input-box {
	border-bottom: 2rpx solid #f6f6f6;
	.lab {
		line-height: 108rpx;
	}
	input {
		display: block;
		height: 108rpx;
		padding-left: 48rpx;
		line-height: 108rpx;
	}
}
.bless {
	.tit {
		line-height: 50rpx;
	}
}
.bless-txt {
	height: 256rpx;
	padding: 30rpx;
	background: #f5f5f5;
	line-height: 54rpx;
	color: #000;
}
.hr28 {
	height: 100rpx;
}
.footer {
	position: fixed;
	width: 100%;
	bottom: 0;
	height: 100rpx;
	font-size: 36rpx;
	line-height: 100rpx;
	color: #fff;
	text-align: center;
	.b1 {
		font-size: 30rpx;
		color: #2c3e50;
		background: #fff;
	}
	.b2 {
		width: 340rpx;
		background: #bd151d;
	}
	.total {
		margin-left: 25rpx;
		font-size: 32rpx;
		font-weight: 600;
		color: #bd151d;
	}
}
.lamp-position {
	padding: 0;
	overflow: hidden;
}

.mui-number {
	position: absolute;
	bottom: 42rpx;
	left: 230rpx;
	width: 196rpx;
	height: 48rpx;
	text-align: center;
	line-height: 48rpx;
	letter-spacing: 0;
	&.disabled {
		width: 6.1rem;
		height: 1.5rem;
		color: #fff;
		background-color: #aaa;
	}
	.decrease {
		float: left;
	}
}
.lamp-item {
	float: left;
	margin-top: 26rpx;
	margin-right: 30rpx;
	min-width: 140rpx;
	height: 64rpx;
	border-radius: 64rpx;
	text-align: center;
	line-height: 64rpx;
	font-size: 24rpx;
	color: #333;
	background: #ececec;
	&:nth-child(4) {
		margin-right: 0;
	}
	&:last-child {
		width: 190rpx;
	}
	&.on {
		color: #fff;
		background: #b95749;
	}
}
.bless-list{
	.item {
		float: left;
		margin-bottom: 20rpx;
		margin-right: 30rpx;
		min-width: 140rpx;
		height: 64rpx;
		border-radius: 64rpx;
		text-align: center;
		line-height: 64rpx;
		font-size: 24rpx;
		color: #999;
		border:2rpx solid #d4cebf;
		&:nth-child(4) {
			margin-right: 0;
		}
		&.on {
			color: #fff;
			background: #b95749;
			border-color: #b95749;
		}
	}
}
.main-con {
	position: relative;
	padding: 30rpx;
}

.temple-item {
	color:#666;
	width:314rpx;
	margin-right:40rpx;
	&:first-child{
		margin-left:10rpx;
	}
	.temp-name {
		color:$color;
		line-height: 60rpx;
	}
	.icon{
		float: left;
		width:60rpx;
		height:38rpx;
		margin-right:10rpx;
	}
	.c6{
		color:#666;
	}
}
.img-box {
	position: relative;
	width: 315rpx;
	height: 400rpx;
	overflow: hidden;
	image {
		width: 100%;
		height: 100%;
	}
	&.active {
		border: 3rpx solid $color;
		&:before {
			position: absolute;
			content: '';
			width: 100rpx;
			height: 100rpx;
			top: 0;
			right: 0;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAMAAAAqwkWTAAABJlBMVEUAAAC9FR69FR28FBu9FBzIAAC+FBy+FR29FRy+FBy9FRy+FR3BFBu/Dh21FBTCFByyAAC9FB2+FR29FRy+FBzAFRyxABW9FB2+FB2+FR2+FR29FR29FR29FRy+FBzAFhzAFiC9ERq+Fh29FR29FR2+FR2+FR2+Fhy/FB2+FR29FR2+FB2+FR2+FR6+FB29FR2+Fh2+FB3AFhvAFxy9FR3+/v767u++GSH46er9/Pz78/PwzM3imp7HOD/FMzrCKC/8+Pj029ztv8HqtrjdiIzXcnfKRErBJCu/HSX25OT34+T13+Dy0tTvx8nuxMblo6bbgobZeX3TZmvNTVTLSU/JPkXDLTTAICj79fXwztDnrbDnqq3mqazfkJTfj5PUZ2zRXmPQW2AJ0XWXAAAANHRSTlMA5+UX/QHi3vTs2c8iEQwJBPnGtUIyBvDUwbyqmIZwLSgdpZ6MgF9RPcu5rqGSe2dYSjk20GiiPwAAAplJREFUaN680mlTGkEUheErEjCQRZQskphFo2atynKaAdkRBJe4R7Mv//9PJDDTOaXTlGGGm/djf+inbtURkQcJlVLpTHZufnllbVpsi1AtWchTUm7RSk+g3KqVXkG31KyV7kO3vIWuKEsr8ldahmZLQuklFCuIUFqCXlkRNnsPamXkP0lpOS+9gFIpOd/teeiUELekD8nN59BoSsJSAUwDorQAaELsxoIyRGlOAZq81Pha3O54Icjd9WeIWm3b/Kl7CUQpi2gdF82gTyFowtJR0wxbvwxi03cjOAdl41cJQROVqiZoq/YPEKUMRtb70a3jQv0N6+yeIgRFkz6UjGkeXph1xTrtM4wHyeM03L03gzoAq7ess+/BAUWT1s2wb3zZLAVM+QAYH5JrqREX+VUR9CugTfMIbiiatGn/3cewrp118RhjQpQScHRSNH6fPQDfTdBODZEheTTlvMlKG573xTqVBiJBlNwL92u3jTX7iAXJw6twVNsyjMsYBcWQ6jvGsPIh4kNyyymdtuh8/Ik4EKU7cNTYtU7pBLEg9s4p9Sq+06ojJsTezsDR2d7A2eshNsSeOqV+tVjqeJggRMldfIjlZ5QhSjldiL3JaUOUdCG2ltOGKOlC7HVSG6KkC7HVpDZESRdiv2uzYyOAoAAIosmf0QAiREQG/Xcn3AreRZe9AvYbGkqyUDsGhpI0lISh9mooCUPtwlDbMdRODSVhqD0YapuGyhoaKmtoqKyhobKGhooNGkqyUFtvDRUbNJSkobKGhsoaGipraKisoaFig4aSNFTW0FCxQUNJGio2aChJQ8UGDSVpqNigoSQNFRs0lKShsoaGig0aStJQsUFDSRoqa2iorKGhsoaGyhoaKjYE2c1T3275AW7sD9ltPQRGAAAAAElFTkSuQmCC)
			right 0 no-repeat;
			background-size: 100rpx 100rpx;
			z-index: 10;
		}
	}
}

</style>
