<template>
	<view>
		<view class="top-box">
			<view class="flex-box top-nav">
				<view class="flex-item" :class="{ on: curType == -1 }" @click="switchOrder(-1)">全部订单</view>
				<view class="flex-item" :class="{ on: curType == 0 }" @click="switchOrder(0)">待支付</view>
				<view class="flex-item" :class="{ on: curType == 1 }" @click="switchOrder(1)">待发货</view>
				<view class="flex-item" :class="{ on: curType == 2 }" @click="switchOrder(2)">待收货</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="order-con" v-if="items.length">
			<view class="panel goods-li" v-for="(item, index) in items" :key="index">
				<view class="state-li clearfix">
					<view class="fl">订单编号：{{ item.Number }}</view>
					<text class="state">待支付</text>
				</view>
				<view class="goodsItem">
					<image class="img" :src="item.Img"></image>
					<view class="con">
						<view class="tit">八寸法喜寺圆满观音</view>
						<view class="item-sub clearfix">
							<view class="price fl">¥ 1231</view>
							<view class="num fr">× 21</view>
						</view>
					</view>
				</view>
				<view class="li-bot">
					<view class="total">
						合计:
						<text>234.00</text>
					</view>
					<view class="num">共1件商品</view>
				</view>
				<view class="btns-line clearfix">
					<view class="delete-btn b2" v-if="item.Status == 0" data-number="item.Number" @click="payOrder">去付款</view>
					<view class="delete-btn b1" v-if="item.Status == 0" data-id="item.ID" @click="cancleOrder">取消订单</view>
				</view>
			</view>
		</view>
		<view class="empty" v-if="!items.length"><view class="txt">暂无订单~</view></view>
	</view>
</template>
<script>
var mockData = `
	    [
	    {
	        "id": "1234234534",
	        "Number": "12342tyu7658754534",
	        "Status": 0,
	        "Name": "南泉山寺庙圆满大方撒旦法撒旦法",
	        "Img": "http:\/\/qn.fayuanhui.cn\/2d2da218534518a64eee630d33132d5e.jpg",
	        "price": "466.00",
	        "num": 1,
	        "total": "466.00"
	    },
	    {
	        "id": "1234234534",
	        "Number": "12342tyu7658754534",
	        "Status": 0,
	        "Name": "南泉山寺庙圆满大方撒旦法撒旦法",
	        "Img": "http:\/\/qn.fayuanhui.cn\/2d2da218534518a64eee630d33132d5e.jpg",
	        "price": "466.00",
	        "num": 1,
	        "total": "466.00"
	    }
	]
	`;
mockData = JSON.parse(mockData);
const util = require('@/utils/util.js');
export default {
	data() {
		return {
			isLoadData: true, // 是否可加载数据
			items: mockData || [], // 订单数据
			curMethods: null, // 当前方法
			curType: -1, // 当前类型 默认为全部
			totalPages: 0, // 所有页数
			curPage: 0, // 当前页数
			curItem: '' // 选定的当前item
		};
	},
	onLoad(options) {
		this.getOrderList(options.type, 0, 10)
	},
	methods: {
		switchOrder(type) {// type  -1：全部 0：待付款 1：待发货 2：待收货 4：已完成
			this.getOrderList(type, 0, 10);
			this.curType = type
		},
		getOrderList(type, page, size) {
			this.curType = type
			var that = this;
			var url = 'api/getOrderList';
			var params = {
				Status: type,
				Page: page,
				Size: size
			};

			util.POST({
				url: url,
				params: JSON.stringify(params),
				success(res) {
					var oData = res.data[0];

					if (oData.Status === '200') {
						// 如果页码为1，不进行列表叠加
						if (page == 0) {
							that.items = oData.Data[0].List
						} else {
							that.items = [...that.items, ...oData.Data[0].List]
						}
						
						var isLoadData = false
						if (oData.Data[0].Page >= oData.Data[0].PageCount - 1) {
							isLoadData = false
						} else {
							isLoadData = true
						}
						that.isLoadData = isLoadData
					} else {
						uni.showToast({
							icon: 'none',
							title: oData.Msg,
							duration: 1000
						});
					}
				},
				fail() {
					// uni.showToast({
					// 	icon: 'none',
					// 	title: '失败'
					// });
				}
			});
		},
		// 去付款
		payOrder(e) {
			var number = e.currentTarget.dataset.number;
			// 微信支付
			util.PAY(number, {
				success() {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/orderList/orderList'
						});
					}, 1e3);
				},
				fail() {
					console.log('支付取消');
				}
			});
		},
		// 点击取消订单
		cancleOrder(e) {
			var that = this;
			var id = e.currentTarget.dataset.id;
			uni.showModal({
				title: '提示',
				content: '取消订单？',
				confirmColor: '#c40606',
				success(res) {
					if (res.confirm) {
						that.data.items.forEach((item, index) => {
							// 成功后删除订单
							if (id == item.orderNO) {
								that.data.items.splice(index, 1);
							}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 确认收货
		certainOrder(e) {
			var that = this;
			var number = e.currentTarget.dataset.number;
			var id = e.currentTarget.dataset.id;
			uni.showModal({
				title: '提示',
				content: '确认收货？',
				confirmColor: '#c40606',
				success(res) {
					if (res.confirm) {
						var url = 'confirmTrade.ashx';
						var params = {
							Number: number
						};
						util.POST({
							url: url,
							params: JSON.stringify(params),
							success(res) {
								var oData = res.data[0];
								if (oData.Status === '200') {
									that.data.items.forEach((item, index) => {
										if (id == item.ID) {
											var status = 'items[' + index + '].Status';
											that.setData({
												status: 5
											});
										}
									});
									uni.showToast({
										icon: 'none',
										title: '成功',
										duration: 1000
									});
								} else {
									uni.showToast({
										icon: 'none',
										title: oData.Msg,
										duration: 1000
									});
								}
							},
							fail() {}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 在线支付前弹出密码框
		payPop(item) {
			this.curItem = item;
			// 直接支付
			this.payOrder();
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
			if (this.data.isLoadData) {
				var type = this.data.curType;
				var page = this.data.curPage + 1;
				this.getOrderList(type, page, 10);
			}
		}
	}
};
</script>
<style lang="scss">
page {
	background: #fbe5c3;
}

.order-con {
	padding-top: 20rpx;
}

.goods-li {
	padding: 35rpx;
	.li-bot {
		height: 110rpx;
		line-height: 110rpx;
		.total,.num {
			float: right;
			margin-right: 0.5rem;
		}
		.total {
			color: #c02028;
		}
	}
}



.state-li {
	color: #463d3d;
	font-size: 24rpx;
	.state {
		float: right;
		color: #c02028;
	}
}

.delete-btn {
	position: relative;
	display: block;
	float: right;
	width: 187rpx;
	height: 70rpx;
	margin-left: 42rpx;
	text-align: center;
	line-height: 70rpx;
	font-size: 32rpx;
	color: #2c3e50;
	border-radius: 3rpx;
	&.b1 {
		border: 2rpx solid #a0a0a0;
	}
	&.b2 {
		color: #fff;
		background: #bd151d;
	}
}

.goodsItem {
	position: relative;
	display: flex;
	margin-bottom: 0.25rem;
	background-color: #fff;
	padding-top: 30rpx;
	padding-bottom: 35rpx;
	border-bottom: 2rpx solid #f6f6f6;
	.tit {
		font-size: 28rpx;
		color: #061220;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.img {
		width: 196rpx;
		height: 196rpx;
		margin-right: 30rpx;
		background: #999;
	}
	.con {
		flex: 1;
		overflow: hidden;
	}
	.price-li {
		position: absolute;
		top: 38rpx;
		right: 32rpx;
		font-size: 20rpx;
		.price {
			line-height: 0.8rem;
			/* font-weight: 700; */
			color: #f6819e;
		}
		.market-price {
			font-size: 24rpx;
			line-height: 0.8rem;
			color: #999;
			text-decoration: line-through;
		}
	}
	.item-sub {
		padding-top: 10rpx;
		font-size: 24rpx;
		.price {
			color: #bd151d;
		}
	}
	.item-subtitle {
		margin-top: 15rpx;
		color: #999;
		font-size: 24rpx;
		line-height: 35rpx;
	}
	.price-unit {
		font-size: 24rpx;
	}
}

.top-nav {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100rpx;
	text-align: center;
	line-height: 100rpx;
	z-index: 5;
	background: #f9f9f9;
	color: #463d3d;
	font-size: 34rpx;
	.on {
		color: #fff;
		background: #c40606;
	}
}

.empty {
	text-align: center;
	padding-top: 130rpx;
}

.empty .txt {
	font-size: 32rpx;
	margin-bottom: 10rpx;
	color: #666;
}

.empty .subTxt {
	margin-bottom: 40rpx;
	color: #999;
}

.top-box {
	margin-bottom: 88rpx;
}
</style>
