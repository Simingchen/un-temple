<template>
	<view>
		<view class="panel">
			<view class="goodsItem clearfix rel">
				<image class="img" src="item.Img"></image>
				<view class="con ofh">
					<view class="tit ellipsis">揭阳普宁寺寺庙</view>
					<view class="item-sub">揭阳普宁寺——左</view>
					<view class="mui-number">
						<text class="decrease" @click="changeQuantity(-1)"></text>
						<text type="number" class="num">{{ Quantity }}</text>
						<text class="increase" @click="changeQuantity(1)"></text>
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
			<view class="tit">供灯时长</view>
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
			<view class="tit">祈福语</view>
			<view class="lamp-list clearfix">
				<view class="lamp-item" :class="{ on: curTime == 1 }" @click="changeTime(1)">1小时</view>
				<view class="lamp-item" :class="{ on: curTime == 2 }" @click="changeTime(2)">1天</view>
				<view class="lamp-item" :class="{ on: curTime == 3 }" @click="changeTime(3)">1个月</view>
				<view class="lamp-item" :class="{ on: curTime == 4 }" @click="changeTime(4)">1年</view>
				<view class="lamp-item" :class="{ on: curTime == 5 }" @click="changeTime(5)">常明</view>
				<view class="lamp-item" :class="{ on: curTime == 6 }" @click="changeTime(6)">随喜供灯</view>
			</view>
			<scroll-view scroll-y class="bless-txt">平安是福,人人想得,俗世中祈福求事事成遂,合家安康幸福。遇逆境能化凶成吉,顺境则吉上加吉。 升官贵人: 官运亨通,鹏程万里</scroll-view>
		</view>
		<view class="panel">
			<view class="tit">祈福语</view>
			<view class="input-box flex-box">
				<view class="tit">祈福人姓名</view>
				<input class="flex-item" placeholder="选填姓名" maxlength="15" :value="user.send" />
			</view>
			<view class="input-box flex-box">
				<view class="tit">收福人姓名</view>
				<input class="flex-item" placeholder="选填姓名" maxlength="25" :value="user.receiver" />
			</view>
			<view class="input-box flex-box">
				<view class="tit">短信收福人</view>
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
			Quantity: 1,
			curTime: 1,
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
		// 加减商品数量
		changeQuantity: function(type) {
			var that = this;
			var nums = null;
			var nowNum = this.data.Quantity;

			if (type > 0) {
				nowNum++;
			} else {
				nowNum > 1 ? nowNum-- : (nowNum = 1);
			}
			that.Quantity = nowNum;
			// var url = "saveQuantityForCart.ashx";
			// var params = {};
			// params.OID = goodsId;
			// params.Quantity = nowNum;
			// util.POST({
			//     url: url,
			//     params: JSON.stringify(params),
			//     success: function (res) {
			//         var oData = res.data[0]
			//         if (oData.Status == 200) {
			//             that.setData({
			//                 [nums]: nowNum
			//             })

			//             // 计算总金额
			//             that.calTotalMoney();
			//         }
			//     }
			// })
		},
		changeTime(time) {
			this.curTime = time;
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
}
.goodsItem {
	padding-bottom: 42rpx;
	border-bottom: 2rpx solid #f6f6f6;
}
.goodsItem .img {
	float: left;
	width: 200rpx;
	height: 200rpx;
	margin-right: 30rpx;
	background: #999;
}
.goodsItem .tit {
	line-height: 65rpx;
	font-weight: 600;
	font-size: 38rpx;
}
.item-sub {
	font-size: 34rpx;
	color: #999;
	line-height: 65rpx;
}
.goodsItem .left {
	font-size: 34rpx;
	color: #803437;
	line-height: 65rpx;
}
.input-box {
	border-bottom: 2rpx solid #f6f6f6;
}
.input-box .tit {
	line-height: 108rpx;
}
.input-box input {
	display: block;
	height: 108rpx;
	padding-left: 48rpx;
	line-height: 108rpx;
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
}

.mui-number.disabled {
	width: 6.1rem;
	height: 1.5rem;
	color: #fff;
	background-color: #aaa;
}

.mui-number .decrease,
.mui-number .increase {
	position: relative;
	float: right;
	display: block;
	width: 48rpx;
	height: 48rpx;
	background-color: #fff;
	color: #5f646e;
	border: 2rpx solid #e0e0e0;
	border-radius: 3rpx;
}

.mui-number .decrease {
	float: left;
}

.mui-number .decrease:before {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	content: '';
	width: 22rpx;
	height: 2rpx;
	background-color: #626262;
}

.mui-number .increase:before {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	content: '';
	width: 22rpx;
	height: 2rpx;
	background-color: #626262;
}

.mui-number .increase:after {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	content: '';
	width: 2rpx;
	height: 22rpx;
	background-color: #626262;
}

.mui-number .num {
	float: left;
	width: 100rpx;
	height: 48rpx;
	line-height: 48rpx;
	border: none;
	text-align: center;
	color: #000;
	font-size: 22rpx;
}
.lamp-time .tit {
	line-height: 50rpx;
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
</style>
