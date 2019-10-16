<template>
	<view>
		<view class="empty" v-if="isLogin">
			<view class="txt">当前没有登录哦~ T.T</view>
			<view class="subTxt">快去登录吧</view>
			<navigator class="btn toActive" url="/pages/center/login">去登录</navigator>
		</view>
		<block v-if="!isLogin">
			<view class="empty" v-if="!cartItems.length">
				<view class="txt">当前的购物车为空~ T.T</view>
				<view class="subTxt">快去挑点商品吧</view>
				<a class="btn toActive" to="/goodsList">去逛逛</a>
			</view>
			<view class="edit-bar" v-if="cartItems.length">
				<!-- 购买全选  -->
				<view class="fl" @click="allSelect()">
					<text class="form-checkbox" :class="{ checked: isAllSelect }"></text>
					<text>全选</text>
				</view>
			</view>
			<view class="page-content" v-if="cartItems.length">
				<view class="shop-item" v-for="(goods, index) in cartItems" :key="index">
					<view class="item-cart">
						<view class="check-container">
							<!-- 正常状态 -->
							<view :class="{ checked: goods.checked }" class="form-checkbox" @click="selectProduct()"><text mark="非编辑"></text></view>
						</view>
						<view class="name-card clearfix">
							<image class="thumb" :src="goods.Img" @click="goUrl(goods)"></image>
							<view class="detail" v-if="!isEditStatus">
								<view class="title ellipsis2" @click="goUrl">{{ goods.Name }}</view>
								<view class="price">¥{{ goods.SingelPrice }}</view>
							</view>
						</view>
						<!-- 购物车数量编辑块 -->
						<view class="mui-number">
							<text class="decrease" @click="changeQuantity(-1, item, goods)"></text>
							<text type="number" class="num">{{ goods.Quantity }}</text>
							<text class="increase" @click="changeQuantity(1, item, goods)"></text>
						</view>
					</view>
				</view>
			</view>
			<!-- 脚底 -->
			<view class="footer-box">
				<view class="subfooter flex-box">
					<!-- 商品删除 -->
					<block v-if="isEditStatus">
						<view class="flex-item">
							<view class="footer-checkbox" @click="allSelectDeleted(isAllSelectDeleted)">
								<text class="form-checkbox" :class="{ checked: isAllSelectDeleted }"></text>
								<text>全选</text>
							</view>
						</view>
					</block>
					<!-- 商品结算 -->
					<block v-if="!isEditStatus">
						<view class="flex-item">
							<view class="fl footer-checkbox" @click="allSelect(isAllSelect)">
								<text class="form-checkbox" :class="{ checked: isAllSelect }"></text>
								<text>全选</text>
							</view>
							<view class="totalMoney">
								合计：
								<text class="c58">¥{{ totalMoney }}</text>
							</view>
						</view>
						<button class="bill-btn b1" :class="{ on: totalNum2 > 0 }" :disabled="totalNum2 == 0" @click="goDeleted">
							<text>删除 ({{ totalNum2 }})</text>
						</button>
						<button class="bill-btn" :class="{ on: totalNum > 0 }" :disabled="totalNum == 0" @click="goPay">
							<text>结算 ({{ totalNum }})</text>
						</button>
					</block>
				</view>
			</view>
		</block>
	</view>
</template>
<script>
const util = require('@/utils/util.js');
var mockData = 
	    [
	        {
	            "Img": "http://img4.imgtn.bdimg.com/it/u=2974067341,1797013015&fm=26&gp=0.jpg",
	            "Name": "是的法规的刚好梵蒂冈和梵蒂冈和规范化发过火",
	            "SingelPrice": 100,
	            "Quantity": 1,
	            StoreID: 124234
	        }
	    ]
;
export default {
	data() {
		return {
			isLogin: false,
			totalMoney: 0, // 选定总金额
			totalNum: 0, // 选定商品数量
			isAllSelect: false, // 是否全选还是取消全选
			isEditStatus: false, // 是否在编辑状态
			allSelectBtn: false, // 选定所有商品
			allSelectDeleted: false, // 选定所有删除项(编辑模式)
			isAllSelectDeleted: false, // 是否全选还是取消全选(编辑模式)
			totalNum2: 0, // 选定删除商品数量(编辑模式)
			curProduct: '', // 删除单选当前的选中商品
			isMultProduct: 1, // 是否选中并删除多个商品 0为单个删除 1为全部删除 2为失效删除
			totalPages: 1, // 所有页数
			curPage: 1, // 当前页数
			cartItems: [] // 购物车列表数据
		};
	},
	onLoad(options) {
		this.getGoods();
	},
	methods: {
		// 获取信息
		getGoods: function() {
			this.cartItems = mockData
			var that = this;
			var url = 'getMyCart.ashx';
			var params = {};

			// util.POST({
			//     url: url,
			//     params: JSON.stringify(params),
			//     success: function (res) {
			//         var oData = res.data[0]

			//         if (oData.Status == 200) {
			//             that.setData({
			//                 cartItems: oData.Data[0].List
			//             })
			//         } else {
			//             uni.showToast({
			//                 icon: 'none',
			//                 title: oData.Msg,
			//                 duration: 1000
			//             })
			//         }
			//     },
			//     fail: function () {
			//         uni.showToast({
			//             icon: 'none',
			//             title: "失败"
			//         })
			//     },
			// })
		},
		// 点击全选 flag:true 选中全选 false 取消全选
		allSelect: function(e) {
			var that = this;
			var checked = '';
			const flag = this.isAllSelect
			// 全选标志
			this.isAllSelect = !flag

			this.cartItems.forEach((item, index) => {
				// 全选商店
				item.checked = !flag

				// 全选商品
				var goods = 'cartItems[' + index + '].LstOrderDetails';
				item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
					goodsItem.checked = !flag
				});
			});
			// 计算总金额
			this.calTotalMoney();
		},
		// 单个商品选择
		selectProduct: function(e) {
			var that = this;
			var goodsId = e.currentTarget.dataset.id;
			var flag = e.currentTarget.dataset.checked;
			var product = e.currentTarget.dataset.item;
			this.cartItems.forEach((item, index) => {
				var goods = 'cartItems[' + index + '].LstOrderDetails';
				if (product.StoreID == item.StoreID) {
					item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
						if (goodsId == goodsItem.ID) {
							var checked = goods + '[' + goodsIndex + '].checked';
							that.setData({
								[checked]: !flag
							});
						}
					});
				}
			});

			// 检测所有
			this.checkAll();
		},
		// 检测商店子商品全选非全选
		checkGoods: function(id, flag) {
			var that = this;
			this.cartItems.forEach((item, index) => {
				var goods = 'cartItems[' + index + '].LstOrderDetails';
				if (id == item.StoreID) {
					item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
						var checked = goods + '[' + goodsIndex + '].checked';
						if (checked) {
							that.setData({
								[checked]: !flag
							});
						}
					});
				}
			});

			// 计算总金额
			this.calTotalMoney();
		},
		// 检测所有全选非全选
		checkAll: function() {
			// 全部选中则全选点亮
			var that = this;
			var checkAllFlags = true;
			var checkIndex = ''; // 需要检索的商店
			this.cartItems.forEach((item, index) => {
				item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
					checkAllFlags = checkAllFlags && goodsItem.checked;
				});
			});

			// 操作全选标志
			this.isAllSelect = checkAllFlags;
		},
		// 计算总金额，计算勾选的商品数
		calTotalMoney: function() {
			var that = this;
			var totalMoney = 0;
			var totalNum = 0;

			// 清空设置选定价格
			that.totalMoney = totalMoney;
			// 设置选定数量
			that.totalNum = totalNum;

			this.cartItems.forEach((item, index) => {
				var goods = 'cartItems[' + index + '].LstOrderDetails';
				item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
					if (goodsItem.checked) {
						totalMoney = (totalMoney * 100 + goodsItem.SingelPrice * goodsItem.Quantity * 100) / 100;
						totalNum += 1;
						// 设置选定价格
						that.totalMoney = totalMoney;
						// 设置选定数量
						that.totalNum = totalNum;
					}
				});
			});
		},
		// 加减商品数量
		changeQuantity: function(e) {
			var that = this;
			var goodsId = e.currentTarget.dataset.id;
			var product = e.currentTarget.dataset.item;
			var type = e.currentTarget.dataset.type;
			var nums = null;
			var nowNum = null;

			this.cartItems.forEach((goodsItem, goodsIndex) => {
				if (goodsId == goodsItem.ID) {
					var nowNum = this.cartItems[goodsIndex].Quantity;

					nums = goods + '[' + goodsIndex + '].Quantity';

					if (type > 0) {
						nowNum++;
					} else {
						nowNum > 1 ? nowNum-- : (nowNum = 1);
					}

					var url = 'saveQuantityForCart.ashx';
					var params = {};
					params.OID = goodsId;
					params.Quantity = nowNum;
					util.POST({
						url: url,
						params: JSON.stringify(params),
						success: function(res) {
							var oData = res.data[0];
							if (oData.Status == 200) {
								that.setData({
									[nums]: nowNum
								});

								// 计算总金额
								that.calTotalMoney();
							}
						}
					});
				}
			});
		},
		// 结算商品
		goPay: function() {
			var selectGoods = [];
			this.cartItems.forEach((item, index) => {
				item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
					if (goodsItem.checked) {
						var addItem = {
							OID: null
						};
						addItem.OID = goodsItem.ID;
						selectGoods.push(addItem);
					}
				});
			});
			var url = 'submitCart.ashx';
			var params = {};
			params.OrderDetailsList = selectGoods;
			util.POST({
				url: url,
				params: JSON.stringify(params),
				success: function(res) {
					var oData = res.data[0];
					if (oData.Status == 200) {
						// 购物车结算到订单
						uni.navigateTo({
							url: '/pages/goods/order?id=' + oData.Data[0].Token
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: oData.Msg,
							duration: 1000
						});
					}
				},
				fail: function() {
					uni.showToast({
						icon: 'none',
						title: '失败'
					});
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
.page-content {
	margin-top: 2.2rem;
}

.page-content .scroll-inner {
	padding-bottom: 5.2rem;
}

.edit-bar {
	position: fixed;
	top: 0;
	width: 100%;
	height: 70rpx;
	padding: 0 38rpx;
	background-color: #fff;
	border-top: 1rpx solid #f4f4f4;
	z-index: 10;
	color: #666;
	font-size: 27rpx;
	line-height: 1;
	box-sizing: border-box;
	padding-top: 17rpx;
}
.edit-bar .form-checkbox {
	margin-right: 35rpx;
}
.shop-item {
	margin-bottom: 13rpx;
	padding-right: 30rpx;
	background: #fff;
}
.shop-store {
	position: relative;
	height: 60rpx;
	font-size: 24rpx;
	box-sizing: border-box;
	line-height: 30rpx;
	padding-left: 30rpx;
	padding-top: 15rpx;
	background: #fff;
	&.arrow {
		float: left;
		width: 15rpx;
		height: 15rpx;
		margin-top: 8rpx;
		border-top: 3rpx solid #cbcbcb;
		border-right: 3rpx solid #cbcbcb;
		transform: rotate(45deg);
		margin-left: 20rpx;
	}
	&.text {
		float: left;
	}
	&.form-checkbox {
		margin-right: 35rpx;
	}
}

.footer-box {
	height: 80rpx;
}
.subfooter {
	position: fixed;
	margin: 0 auto;
	bottom: 0;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	z-index: 5;
	background-color: #fff;
	font-size: 28rpx;
	.bill-btn {
		width: 4.5rem;
		height: 80rpx;
		text-align: center;
		border: 0;
		background: #bd151d;
		border-radius: 0;
		color: #fff;
		font-size: 28rpx;
		line-height: 80rpx;
	}
	.bill-btn.on {
		color: #fff;
		background-color: #ec584e;
	}
	.totalMoney {
		margin-left: 45rpx;
	}
	.form-checkbox {
		margin-top: 8rpx;
	}
}

.bill-btn.b1 {
	background: #c7a769 !important;
}

.c58 {
	color: #bd151d;
}

.item-cart {
	position: relative;
	padding-top: 27rpx;
	padding-bottom: 27rpx;
	border-top: 2rpx solid #f4f4f4;
	background-color: #fff;
	.check-container {
		float: left;
		width: 29rpx;
		height: 29rpx;
		margin-top: 60rpx;
		margin-left: 0.7rem;
		margin-right: 32rpx;
		box-sizing: border-box;
		.check-state {
			display: inline-block;
			width: 2rem;
			height: 1rem;
			margin-left: 0.25rem;
			text-align: center;
			line-height: 1rem;
			color: #fff;
			border-radius: 0.15rem;
			&.failure {
				background-color: #aaa;
			}
		}
	}
	.check-failure {
		float: left;
		width: 2rem;
		padding: 0.25rem 0.5rem;
		margin-left: -0.5rem;
		color: #fff;
		background: #aaa;
		font-size: 0.6rem;
		border-radius: 3px;
	}
	.name-card {
		position: relative;
		overflow: hidden;
		width: 632rpx;
		border-bottom: 2rpx soild #e9e9e9;
	}
	.thumb {
		float: left;
		width: 200rpx;
		height: 200rpx;
		margin-right: 20rpx;
	}
	.detail {
		.p {
			position: relative;
			height: 0.8rem;
			padding-right: 1rem;
			margin: 0 0 0.1rem;
			font-size: 0.6rem;
			line-height: 0.8rem;
			color: #666;
		}
		.num {
			float: right;
			color: #999;
			font-size: 20rpx;
		}
		.price {
			position: absolute;
			left: 220rpx;
			bottom: 0;
			line-height: 0.8rem;
			font-weight: 700;
			color: #f6819e;
			font-size: 24rpx;
		}
		.price-unit {
			font-size: 12px;
		}
		.fail-tip {
			width: 9rem;
			height: 1.7rem;
			margin-right: 2.2rem;
		}
	}
	.title {
		font-size: 24rpx;
		color: #000;
		line-height: 36rpx;
		height: 2rem;
	}
	.delete-btn {
		position: absolute;
		right: 0;
		top: 0;
		width: 3.048rem;
		height: 100%;
		text-align: center;
		line-height: 7rem;
		color: #fff;
		background-color: #ff4343;
		font-size: 0.8rem;
		z-index: 2;
	}
}

.emptyList {
	padding: 1.5rem 0;
	background-color: #fff;
	.img {
		width: 6rem;
	}
}

.form-checkbox {
	display: inline-block;
	width: 29rpx;
	height: 29rpx;
	background-image: url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAdAB0DAREAAhEBAxEB/8QAHAAAAQMFAAAAAAAAAAAAAAAABQQGBwABAgMJ/8QAGgEAAgMBAQAAAAAAAAAAAAAAAwQAAQYCB//aAAwDAQACEAMQAAAA7yLu6+u09lW9rZChU6dpIYB6BKFYwwwlUkdi1L2vOsFTTkTqPU+f/8QALxAAAQMCBAMGBgMAAAAAAAAAAQIDBAURAAYSIQdRcRMUFTFBYggQFzJCYSIjsv/aAAgBAQABPwCdNqVWnuUWiSTHQzYTZwSCWyRcNoB212IJJuEgjYk7fT3Jz4KqrQWags/c7U095Uo9XL26CwxJyEKWDKyJUF0mQjdMYKUuG77Vsk2SPcjSr9kC2Mq5mRmOE6ZUNUSbDeLFQhKXqLDoANr/AJJKSlSVeqVA4yam+W401X3y2+9Onmpw6z/q2Be2+LY+JPiRV+DmYoFfy6n+yuRVNSgEXB7uq6VdSHyL+0csZYdEFLuWnzpdhKPYg/mwSdChzAH8T+0n51nJFB42V2VVKwhTlLptolMdR5POgq7dxJ9U6tCAebSsVehxqqEPds4xIYJMeWwQFtk+drggg23SQQcZ8421bhhL8OqlHZqqxsHmnDGv1BC9+lsZWn1ri7RfE6lVDApi1aXadASUuPD1St+99J5ICD7sQIcWBDbgwI7bDDKAhplpASlCQLAADyGP/8QAJxEAAQMCBAUFAAAAAAAAAAAAAQACAxEhBBBBcRIiMTJRM5GhscH/2gAIAQIBAT8Ac573ljbU6n83Qhj1Fd0Iw3tTTULDegD5v73zkdwX8qDkBj1H1oc+41Tow/cap+KdC7hIr8KMmUVPRBf/xAAwEQABAgMFBgMJAAAAAAAAAAABAgMEETEABSFBYQYSEyJRcRCiwRQyM0JicqHS8P/aAAgBAwEBPwBptlhnjPCZPup65TOctBWwvW8EfDcKB0Tyjyys3efG5Y1IcHXALGoVU9lTFo2E9jdG6d5ChNKhmPQgggjIg2j8ItaRRPKOycPHY+6Wb/hHGHqNEET+sYjyfm0WniSiBRVdFCo9RofGGvKK2dhUtNYOL5lDHAfIDrKauyhZiIWxMSmk1Bof7IjEWuzZxi+GuI2stg5Hm/W0Y0xcURw2077gopWIGNQmk/uKhpZbjjqytZJJxJNSbf/Z);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 29rpx 29rpx;
	border-radius: 29rpx;
	&.checked {
		/* background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAS1BMVEUAAAAzhPszhPoyhPsyhPozg/s0hPwyhPw0hvs8h/9Aj/8yg/syg/ozhPsyg/r///+wz/2RvfxTl/pup/vT5P3U5f16r/u91/18sPvWF+94AAAADnRSTlMAvdnFopBcUTsREPPW8utY9+UAAADeSURBVDjLlZTrDoMgDIWpIoqX1svm9v5PumRGD7Aq7vtH8iWnFFoT4p2lousKss4bnZo4gGpFaUpOKJvUqVihipSWWIXawOn5hB4W8Smk16PX1fAl2x3La6n89pA1lpV36rOqJ5ElqN1rziwi7+PkjdOkp8gDJ2esHiYzjtaQHjZFDS2O+yxxGChMtzsiYxQGOjNAkhFhIQPixs1CWBBHHFkIA2QsR9YLYUELHMcWwoJmeo4shAGfPPCIMJT081XWlVPqm58u/31vD0J+pPLDeXPM8wsjv3r+XWL5dfgBB3w3WcIaGhAAAAAASUVORK5CYII=); */
		background: #f79bb0;
	}
}

.pageCon {
	height: 100%;
	background-color: #fff;
}

.topfixed {
	position: fixed;
	width: 100%;
}

.fail-del-btn {
	display: block;
	width: 6rem;
	height: 1.5rem;
	margin: 0.5rem auto;
	text-align: center;
	line-height: 1.5rem;
	color: #ec584e;
	border: 1px solid #ec584e;
	border-radius: 0.15rem;
}
.footer-checkbox {
	padding-left: 30rpx;
	margin-right: 30rpx;
	&.form-checkbox {
		margin-right: 15rpx;
	}
}

.mui-number {
	position: absolute;
	bottom: 30rpx;
	right: 0;
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
	.decrease,
	.increase {
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
	.decrease {
		float: left;
		&:before {
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
	}
	.increase {
		&:before {
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
		&:after {
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
	}
	.num {
		float: left;
		width: 100rpx;
		height: 48rpx;
		line-height: 48rpx;
		border: none;
		text-align: center;
		color: #000;
		font-size: 22rpx;
	}
}

.goodsItem {
	padding-bottom: 42rpx;
	border-bottom: 2rpx solid #f6f6f6;
	.img {
		float: left;
		width: 200rpx;
		height: 200rpx;
		margin-right: 30rpx;
		background: #999;
	}
	.tit {
		line-height: 65rpx;
		font-weight: 600;
		font-size: 38rpx;
	}
	.left {
		font-size: 34rpx;
		color: #803437;
		line-height: 65rpx;
	}
}
.item-sub {
	font-size: 34rpx;
	color: #999;
	line-height: 65rpx;
}
</style>
