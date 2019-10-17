<template>
	<view class="order-page">
		<view class="address-box bgf">
			<!-- 有默认地址 -->
			<view class="addr-li rel">
				<view class="flex-box">
					<view class="flex-item">收货人： {{ order.receiver }}</view>
					<view class="flex-item">{{ order.phone }}</view>
				</view>
				<view class="addr-detail">收货地址：{{ order.addr }}</view>
			</view>
		</view>
		<view class="order-box">
				<view class="order-state">
					<view>订单编号：{{ order.Number }}</view>
					<view>下单时间：{{ order.CreateTime }}</view>
				</view>
				<view class="goodsItem" v-for="(item, index) in order.ListOrderDetails" :key="index">
					<image class="img" :src="item.Img" width="124" height="124"></image>
					<view class="con ofh">
						<view class="tit">{{ item.Name }}</view>
						<view class="item-subtitle sku-box">
							<view class="ellipsis">{{ item.Attr }}</view>
							<view class="num fr">
								×
								<text class="num-txt">{{ item.Quantity }}</text>
							</view>
						</view>
						<view class="price-li">
							<text class="price">¥{{ item.Price }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="bot clearfix">
				<view class="items-line send-type">
					配送方式：
					<text class="fr txt">{{ order.LogisticsType }}</text>
				</view>
				<view class="items-line leave-msg">
					<text class="txt">买家留言：</text>
					<text>{{ order.Remark }}</text>
				</view>
				<view class="items-line total">
					共{{ order.Count }}商品 小计：
					<text class="cf6">¥{{ order.TotalPrice }}</text>
				</view>
			</view>
			<view class="footer-box">
				<view class="hr75"></view>
				<button class="order-btn btn" @click="goPay" v-if="order.Status == 0">去付款</button>
				<view class="order-btn btn" v-if="order.Status == 2">待发货</view>
				<button class="order-btn btn" @click="certainOrder" v-if="order.Status == 4">确认收货</button>
				<view class="order-btn btn" @click="certainOrder" v-if="order.Status == 5">已完成</view>
			</view>
	</view>
</template>
<script>
const util = require('@/utils/util.js');
export default {
	data() {
		return {
			order: {
				receiver: '陈生',
				phone: '13926012341',
				addr: '高德置地16号高德置地16号高德置地16号',
				sendType: '圆通',
				leaveMsg: '发顺丰',
				orderNO: 1242135345,
				nums: 2,
				total: 6390,
				freight: 0,
				state: 1000, // 1000代付款 2000待发货 3000待收货  4000已完成
				date: '2017-08-14',
				time: '08:00',
				goods: [],
				ListOrderDetails: []
			}
		};
	},
	onLoad(options) {
		// this.getOrder(options.id);
	},
	methods: {
		// 获取订单
		getOrder(id) {
			var that = this;
			var url = 'getTradeInfo.ashx';
			var params = {
				Number: id
			};
			util.POST({
				url: url,
				params: JSON.stringify(params),
				success(res) {
					var oData = res.data[0];

					if (oData.Status == 200) {
						that.setData({
							order: oData.Data[0]
						});
					} else {
						wx.showToast({
							icon: 'none',
							title: oData.Msg,
							duration: 1000
						});
					}
				},
				fail() {
					wx.showToast({
						icon: 'none',
						title: '失败'
					});
				}
			});
		},
		// 去支付
		goPay() {
			var that = this;
			var url = 'getHotKeys.ashx';
			var params = new Object();
			params.Number = this.data.order.Number;
			util.POST({
				url: url,
				params: JSON.stringify(params),
				success(res) {
					var oData = res.data[0];

					if (oData.Status == 200) {
						that.setData({
							hotSearch: oData.Data
						});
					} else {
						wx.showToast({
							icon: 'none',
							title: oData.Msg,
							duration: 1000
						});
					}
				},
				fail() {
					wx.showToast({
						icon: 'none',
						title: '失败'
					});
				}
			});
		},
		// 确认收货
		certainOrder(e) {
			var that = this;
			var number = this.data.order.Number;
			wx.showModal({
				title: '提示',
				content: '确认收货？',
				confirmColor: '#c40606',
				success(res) {
					if (res.confirm) {
						var url = 'confirmTrade.ashx';
						var params = {};
						params.Number = number;
						util.POST({
							url: url,
							params: JSON.stringify(params),
							success(res) {
								var oData = res.data[0];

								if (oData.Status == 200) {
									wx.navigateBack({
										// 成后返回上一页
										delta: 1
									});
								} else {
									wx.showToast({
										icon: 'none',
										title: oData.Msg,
										duration: 1000
									});
								}
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
	background: #f4f4f4;
}

.addr-msg .ofh {
	padding-bottom: 20px;
}

.addr-msg .addr-select-box {
	margin: 0;
}

.addr-msg .addr-detail {
	font-size: 12px;
	color: #999;
}

.addr-msg .addNew {
	padding-left: 0.75rem;
}

.addr-li {
	padding-right: 110rpx;
	font-size: 27rpx;
	color: #000;
	line-height: 64rpx;
}

.addr-li .addr-detail {
	font-size: 24rpx;
	line-height: 34rpx;
	color: #000;
}

.address-box {
	position: relative;
	padding-top: 15rpx;
	padding-left: 78rpx;
	padding-bottom: 40rpx;
	border-top: 1rpx solid #f4f4f4;
	background: #fff
		url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAjABsDAREAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABwgFBgADBAn/xAAcAQACAgMBAQAAAAAAAAAAAAAEBQYHAAIIAQP/2gAMAwEAAhADEAAAAPX4ezauI6nhlh/c1gl4vQTsG88C9ZMqapfh51PSvkIhFTIzMK+5TvsrCm6jTtXjEuqpzMHY0rv5EX3e6//EAC8QAAEDAwIEBQMEAwAAAAAAAAECAwQFBhEABwgSMUETFCFRYTJigRAiNFKDoaL/2gAIAQEAAT8A4meJyq2tWHNt9upAamtgCpVFIBU0oj0ab+7BGVdsgD11bnDdvjd8NNz1+Whp50c6E1ecsyFA9yMKKT8KIOrSvnc/Zuvi3bv8y7HTjnhSXfEBRk/uaWc4/BxnqM6pNUh1qmsVamueIxIaC2l+4OtkXot1cR1MnXThZl1l2Q74vd/C1oz/AJOX9OJyLAVQKZNWE+aROKGvfwyhRV+MhGra3Duah0VmlQHlhloK5MJ91En/AGdb12nUtsd6arEiFcbE/wA9THmyUlLa1FaCkj+pynPug6s7jTuBqkIh3LZ7M6WhAHm2JfghwjupHIoA9zggfA1dO5NwbmVkVatKQhDSeWLFZ+hlJ64z1JwMk9fgADW3209Nes2BIrTakyXWfEWn2ClEp/5I1xH7GNbvW2ibSAhFbpoKoK1egfQfVTKj89Qex+CdRadOpE92l1OG4xIYcLb7DyClSFA4IIPQ64fNpZV3TEXNWoyk0qOvKAsfylg/SPtHc/j3wE4Guytbu7d2VcN0UCqVe32XZEirIjyHgVJLrXIs8quUjm9UjrqJGjQoyIcNhDTLSQhtptASlKR0AA6DSemv/8QAJREAAgICAQQABwAAAAAAAAAAAQIAAwQRMRASEyEFFEFRobHR/9oACAECAQE/ALbCvpYca2wb/cF9+G+n4+38iOliBhwZX7s2enxIDxA/XcrzLqk7VPoSwFWM+cKqdjcybnubbTGwUNAL8y2vvX1zLBrYmLi+Z+5uB+et6IzLsTQCmCf/xAAvEQABAwIDBQYHAQAAAAAAAAABAgMEABEFBiESMUFRYRAiMnGhogcUM1KBkcHh/9oACAEDAQE/AMn5OYmRhPnC6T4U8CBxV05CpWbst4e4Y7IuBp3EjZHqL/i9TcNwbH4pfi2B4KSLa8lD/L8qeYcjuqacFlA2NZiSuFlF1EbTZQEi326A+3syYtz5p5A8JTr530/tSsJiSZCnFjU1lya1jOXW1q17uyoHmNDfz3+Rqf8AD2KXyqO8Up5EbVugNxUHCIuDxy0zck7yd5rE8beE9wNHug2/Wh9ayjmM4FLKHfor8XQ8FD+jlSnWn2w62bpOoI1BHSs044iA2Y7Ju4faOZ6nh2cawLFsRiwZDbThCQgqA0NjcC4vupa1uLK1m5O8neaFf//Z)
		30rpx center no-repeat;
	background-size: 27rpx 35rpx;
}

.address-box:after {
	position: absolute;
	content: '';
	width: 100%;
	bottom: 0;
	left: 0;
	height: 8rpx;
	background-image: linear-gradient(90deg, #f69db1, #faccbf);
}

.leave-msg {
	display: flex;
}

.leave-msg textarea {
	flex: 1;
	border: 0;
	transition: height;
	vertical-align: top;
	height: 1.1rem;
}

.goodsItem {
	position: relative;
	display: flex;
	background-color: #fff;
	border: 1rpx solid #f4f4f4;
	padding-top: 33rpx;
	padding-bottom: 35rpx;
	padding-left: 26px;
	.tit {
		width: 495rpx;
		height: 63rpx;
		line-height: 30rpx;
		font-size: 24rpx;
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.img {
		width: 150rpx;
		height: 150rpx;
		border: 1rpx solid #e5e5e5;
	}
	.con {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		padding: 0 35rpx;
		overflow: hidden;
	}
	.price-li {
		position: absolute;
		bottom: 32rpx;
		font-size: 20rpx;
		.price {
			line-height: 0.8rem;
			font-weight: 700;
			color: #f6819e;
		}
		.market-price {
			font-size: 24rpx;
			line-height: 0.8rem;
			color: #999;
			text-decoration: line-through;
		}
	}
	.item-subtitle {
		margin-top: 15rpx;
		color: #999;
		font-size: 24rpx;
		line-height: 35rpx;
		.num {
			margin-top: 15rpx;
			font-size: 20rpx;
		}
	}
	.price-unit {
		font-size: 24rpx;
	}
}

.order-state {
	height: 110rpx;
	padding-top: 15rpx;
	padding-left: 37rpx;
	line-height: 42rpx;
	font-size: 24rpx;
	color: #666;
	box-sizing: border-box;
}

.pl10 {
	padding-left: 10rpx;
}

.bot {
	margin-top: 11rpx;
	background: #fff;
	padding-left: 28rpx;
	padding-right: 28rpx;
	font-size: 28rpx;
}

.send-type {
	line-height: 76rpx;
	border-bottom: 1rpx solid #f8f8f8;
}

.send-type .txt {
	margin-right: 10rpx;
}

.leave-msg {
	min-height: 155rpx;
	border-bottom: 1rpx solid #f8f8f8;
	box-sizing: border-box;
	padding: 25rpx 3rpx;
	line-height: 34rpx;
}

.total {
	float: right;
	line-height: 80rpx;
	font-size: 24rpx;
	color: #999;
}

.total .cf6 {
	font-weight: 500;
}

.hr75 {
	height: 75rpx;
}

.order-btn {
	position: fixed;
	width: 100%;
	bottom: 0;
	border-radius: 0;
	margin-bottom: 0;
}
</style>
