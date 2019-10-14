<template>
	<view class="orderList-page">
		<!-- 状态栏 -->
		<view class="top-box">
			<view class="flex-box top-nav">
				<view data-type="-1" class="flex-item {{curType == -1? 'on': ''}}" bindtap="switchOrder">
					全部订单
				</view>
				<view data-type="0" class="flex-item {{curType == 0? 'on': ''}}" bindtap="switchOrder">
					待支付
				</view>
				<view data-type="1" class="flex-item {{curType == 1? 'on': ''}}" bindtap="switchOrder">
					待发货
				</view>
				<view data-type="2" class="flex-item {{curType == 2? 'on': ''}}" bindtap="switchOrder">
					待收货
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="empty" wx:if="{{!items.length}}">
			<view class="txt">暂无订单~</view>
		</view>
		<view class="order-con" wx:if="{{items.length>0}}">
			<view class="panel goods-li" wx:for="{{items}}" wx:key="index">
				<view class="state-li clearfix">
					<view class="fl">
						订单编号：{{item.Number}}
					</view>
					<text class="state">待支付</text>
				</view>
				<view class="goodsItem">
					<image class="img" src="{{item.Img}}"></image>
					<view class="con">
						<view class="tit">上大人个人体会它已经dszfsdf sd同样人员而同样</view>
						<view class="item-sub clearfix">
							<view class="price fl">
								¥ 1231
							</view>
							<view class="num fr">× 21</view>
						</view>
					</view>
				</view>
				<view class="li-bot">
					<view class="total">合计: <text>234.00</text> </view>
					<view>共1件商品</view>
				</view>
				<view class="btns-line clearfix">
					<view class="delete-btn b2" wx:if="{{item.Status == 0}}" data-number="{{item.Number}}" bindtap="payOrder">去付款</view>
					<view class="delete-btn b1" wx:if="{{item.Status == 0}}" data-id="{{item.ID}}" bindtap="cancleOrder">取消订单</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var mockData =
		`
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
	`
	mockData = JSON.parse(mockData)
	const util = require('@/utils/util.js');
	export default {
		data() {
			return {
				isLoadData: true, // 是否可加载数据
				items: [], // 订单数据
				curMethods: null, // 当前方法
				curType: -1, // 当前类型 默认为全部
				totalPages: 0, // 所有页数
				curPage: 0, // 当前页数
				curItem: "", // 选定的当前item
			}
		},
		onLoad(options) {
			this.tabBar = this.selectComponent("#tabBar");
			this.getOrderList(-1, 0, 10)

			this.setData({
				items: mockData
			})
			console.log(this.data.items)
		},
		methods: {
			switchOrder(e) {
				// type  -1：全部 0：待付款 1：待发货 2：待收货 4：已完成
				var type = e.currentTarget.dataset.type;
				this.getOrderList(type, 0, 10);
			},
			getOrderList(type, page, size) {
				var that = this;
				var url = "api/getOrderList"
				var params = new Object();
				params.Status = type;
				params.Page = page;
				params.Size = size;

				util.POST({
					url: url,
					params: JSON.stringify(params),
					success(res) {
						var oData = res.data[0]

						if (oData.Status === "200") {
							that.setData({
								curPage: page,
							})

							// 如果页码为1，不进行列表叠加
							if (page == 0) {
								that.setData({
									items: oData.Data[0].List
								})
							} else {
								var data = that.data.items.concat(oData.Data[0].List);
								that.setData({
									items: data
								})
							}

							if (oData.Data[0].Page >= oData.Data[0].PageCount - 1) {
								that.setData({
									isLoadData: false
								})
							} else {
								that.setData({
									isLoadData: true
								})
							}
						} else {
							wx.showToast({
								icon: 'none',
								title: oData.Msg,
								duration: 1000
							})
						}
					},
					fail() {
						wx.showToast({
							icon: 'none',
							title: "失败"
						})
					},
				})

				this.setData({
					curType: type,
					curPage: page,
				})
			},
			// 去付款
			payOrder(e) {
				var number = e.currentTarget.dataset.number;
				// 微信支付
				util.PAY(number, {
					success() {
						setTimeout(() => {
							wx.navigateTo({
								url: "/pages/orderList/orderList"
							})
						}, 1e3)
					},
					fail() {
						console.log("支付取消");
					}
				})
			},
			// 点击取消订单
			cancleOrder(e) {
				var that = this;
				var id = e.currentTarget.dataset.id;
				wx.showModal({
					title: "提示",
					content: "取消订单？",
					confirmColor: "#f79bb0",
					success(res) {
						if (res.confirm) {
							that.data.items.forEach((item, index) => { // 成功后删除订单
								if (id == item.orderNO) {
									that.data.items.splice(index, 1);

									that.setData({
										items: that.data.items
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			// 确认收货
			certainOrder(e) {
				var that = this;
				var number = e.currentTarget.dataset.number;
				var id = e.currentTarget.dataset.id;
				wx.showModal({
					title: "提示",
					content: "确认收货？",
					confirmColor: "#f79bb0",
					success(res) {
						if (res.confirm) {
							var url = "confirmTrade.ashx"
							var params = new Object();
							params.Number = number;
							util.POST({
								url: url,
								params: JSON.stringify(params),
								success(res) {
									var oData = res.data[0]
									if (oData.Status === "200") {
										that.data.items.forEach((item, index) => {
											if (id == item.ID) {
												var status = 'items[' + index + '].Status';
												that.setData({
													status: 5
												})
											}
										})
										wx.showToast({
											icon: 'none',
											title: "成功",
											duration: 1000
										})
									} else {
										wx.showToast({
											icon: 'none',
											title: oData.Msg,
											duration: 1000
										})
									}
								},
								fail() {

								},
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
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
					var page = this.data.curPage + 1
					this.getOrderList(type, page, 10);
				}
			},
		}
	}
</script>
<style>
	page {
		background: #f4f4f4;
	}

	.order-con {
		padding-top: 20rpx;
	}

	.orderList-page .goods-li {
		padding: 30rpx;
	}

	.orderList-page .goods-li .li-bot {
		height: 110rpx;
		line-height: 110rpx;
	}

	.orderList-page .goods-li .li-bot view {
		float: right;
		margin-right: 0.5rem;
	}

	.total text {
		color: #c02028
	}

	.state-li {
		color: #191919;
		font-size: 24rpx;
	}

	.state-li .state {
		float: right;
		color: #c02028;
	}

	.orderList-page .delete-btn {
		position: relative;
		display: block;
		float: right;
		width: 228rpx;
		height: 83rpx;
		margin-left: 50rpx;
		text-align: center;
		line-height: 83rpx;
		font-size: 32rpx;
		color: #2c3e50;
		border-radius: 3rpx;
	}

	.orderList-page .delete-btn.b1 {
		border: 2rpx solid #e0e0e0;
	}

	.orderList-page .delete-btn.b2 {
		color: #fff;
		background: #bd151d;
	}

	.goodsItem {
		position: relative;
		display: flex;
		margin-bottom: .25rem;
		background-color: #fff;
		padding-top: 30rpx;
		padding-bottom: 35rpx;
	}

	.goodsItem .tit {
		font-size: 24rpx;
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical
	}

	.goodsItem .img {
		width: 200rpx;
		height: 200rpx;
		margin-right: 30rpx;
		background: #999;
	}

	.goodsItem .con {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		overflow: hidden
	}

	.goodsItem {
		border-bottom: 2rpx solid #f6f6f6;
	}

	.goodsItem .price-li {
		position: absolute;
		top: 38rpx;
		right: 32rpx;
		font-size: 20rpx;
	}

	.item-sub {
		padding-top: 10rpx;
		font-size: 24rpx;
	}

	.item-sub .price {
		color: #bd151d;
	}

	.goodsItem .price-li .price {
		line-height: .8rem;
		/* font-weight: 700; */
		color: #f6819e;
	}

	.goodsItem .price-li .market-price {
		font-size: 24rpx;
		line-height: .8rem;
		color: #999;
		text-decoration: line-through;
	}

	.goodsItem .item-subtitle {
		margin-top: 15rpx;
		color: #999;
		font-size: 24rpx;
		line-height: 35rpx;
	}

	.goodsItem .price-unit {
		font-size: 24rpx
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
		border-top: 1rpx solid #e5e5e5;
		color: #2c3e50;
		font-size: 34rpx;
	}

	.top-nav .on {
		color: #c7a769;
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
