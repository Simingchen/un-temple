<template>
	<view class="shopCart-page">
		<view class="empty" v-if="isLogin">
			<view class="txt">当前没有登录哦~ T.T</view>
			<view class="subTxt">快去登录吧</view>
			<navigator class="btn toActive" url="/login">去登录</navigator>
		</view>
		<block v-if="!isLogin">
			<!-- <view class="tab-bar flex-box">
				<view class="flex-item" :class="{on: curType == 0}" @click='changeTab(0)'>法物</view>
				<view class="flex-item" :class="{on: curType == 1}" @click='changeTab(1)'>法讯</view>
			</view> -->
			<view class="empty" v-if="!goodsList.length">
				<view class="txt tac">快去收藏吧~</view>
			</view>
			<view class="page-content" v-if="goodsList.length">
				<view v-for="(goods, index) in goodsList" :key="index">
					<view class="goods-item">
						<image class="goods-img" :src="goods.goods_cover"></image>
						<view class="con">
							<view class="goods-name ellipsis2">
								{{goods.goods_name}}
							</view>
							<view class="goods-price">
								<text>¥{{goods.goods_price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>
<script>
	const util = require('@/utils/util.js');
	var mockData = {
		"data": {
			"current_page": 1,
			"data": [{
				"goods_id": 15,
				"goods_name": "\u5357\u6cc9\u5c71\u5bfa8\u5bf8\u5706\u6ee1\u89c2\u97f3\uff08\u7fe0\u7389\u9576\u91d1\uff09",
				"goods_cover": "http:\/\/qn.fayuanhui.cn\/2d2da218534518a64eee630d33132d5e.jpg",
				"goods_storage": 3,
				"goods_price": "4666.00"
			}, {
				"goods_id": 16,
				"goods_name": "\u5357\u6cc9\u5c71\u5bfa8\u5bf8\u5706\u6ee1\u4e09\u5b9d\u4f5b\uff08\u7fe0\u7389\u9576\u91d1\uff09",
				"goods_cover": "http:\/\/qn.fayuanhui.cn\/efcd450e04ff4aa8b1a689e5c31da9ac.png",
				"goods_storage": 3,
				"goods_price": "4666.00"
			}, {
				"goods_id": 17,
				"goods_name": "\u5357\u6cc9\u5c71\u5bfa\u51b0\u66dc\u89c2\u97f3",
				"goods_cover": "http:\/\/qn.fayuanhui.cn\/c3c45db2fc6d98d1ace84ac2446e377d.jpg",
				"goods_storage": 95,
				"goods_price": "166.00"
			}, {
				"goods_id": 18,
				"goods_name": "\u5357\u6cc9\u5c71\u5bfa\u4e0d\u9000\u83e9\u8428",
				"goods_cover": "http:\/\/qn.fayuanhui.cn\/10800518fb59ab2d22df128093c59d31.jpg",
				"goods_storage": 20,
				"goods_price": "7999.00"
			}, {
				"goods_id": 19,
				"goods_name": "\u5357\u6cc9\u5c71\u5bfa\u6c89\u9999",
				"goods_cover": "http:\/\/qn.fayuanhui.cn\/d6be21a44e2b4b3cb7d42a594a76fc4d.jpg",
				"goods_storage": 99,
				"goods_price": "66.00"
			}, {
				"goods_id": 20,
				"goods_name": "\u5357\u6cc9\u5c71\u5bfa\u51e4\u773c\u624b\u4e32",
				"goods_cover": "http:\/\/qn.fayuanhui.cn\/f124951e9c4a2c69e4f267176fba873d.jpg",
				"goods_storage": 8,
				"goods_price": "299.00"
			}, {
				"goods_id": 21,
				"goods_name": "\u5357\u6cc9\u5c71\u5bfa\u4f5b\u7f18\u5409\u7965\u597d\u8fd0\u4f5b\u724c\uff08\u5973\u6b3e\uff09",
				"goods_cover": "http:\/\/qn.fayuanhui.cn\/ccb115cebc8a4520ef647113cc032c0e.jpg",
				"goods_storage": 10,
				"goods_price": "566.00"
			}, {
				"goods_id": 22,
				"goods_name": "\u5357\u6cc9\u5c71\u5bfa\u560e\u4e4c\u76d2\uff08\u5973\u6b3e\uff09",
				"goods_cover": "http:\/\/qn.fayuanhui.cn\/347a52dd1117d1a95c54e27253620310.jpg",
				"goods_storage": 10,
				"goods_price": "599.00"
			}, {
				"goods_id": 23,
				"goods_name": "\u5357\u6cc9\u5c71\u5bfa\u82b1\u4e1d\u89c2\u97f3\u83e9\u8428",
				"goods_cover": "http:\/\/qn.fayuanhui.cn\/a8c8a72e667744700122d26bdda73be5.jpg",
				"goods_storage": 10,
				"goods_price": "799.00"
			}, {
				"goods_id": 24,
				"goods_name": "\u5357\u6cc9\u5c71\u5bfa\u91d1\u521a\u83e9\u63d0\u9879\u94fe",
				"goods_cover": "http:\/\/qn.fayuanhui.cn\/84eee1526ef439d4b31ecde4448b1df3.jpg",
				"goods_storage": 197,
				"goods_price": "166.00"
			}],
			"per_page": 10,
			"total": 36
		},
		"msg": "",
		"code": 200
	}

	export default {
		data() {
			return {
				curType: 0,
				isLoadData: true, // 是否可加载数据
				isLogin: false,
				totalMoney: 0, // 选定总金额
				totalNum: 0, // 选定商品数量
				isAllSelect: false, // 是否全选还是取消全选
				isEditStatus: true, // 是否在编辑状态
				allSelectBtn: false, // 选定所有商品
				isAllSelectDeleted: false, // 是否全选还是取消全选(编辑模式)
				totalNum2: 0, // 选定删除商品数量(编辑模式)
				editTxt: "编辑", // 编辑文字
				curProduct: "", // 删除单选当前的选中商品
				isMultProduct: 1, // 是否选中并删除多个商品 0为单个删除 1为全部删除 2为失效删除
				totalPages: 1, // 所有页数
				curPage: 1, // 当前页数
				cartItems: [],
				goodsList: []
			}
		},
		onLoad(options) {
			this.getMsg(0, 0)
		},
		methods: {
			// 删除操作************************************
			// 勾选单品删除
			selectDeleted(e) {
				var that = this;
				var goodsId = e.currentTarget.dataset.id;
				var flag = e.currentTarget.dataset.deleted;
				var product = e.currentTarget.dataset.item;

				this.cartItems.forEach((item, index) => {
					var goods = 'cartItems[' + index + '].List';
					if (product.ID == item.ID) {
						item.List.forEach((goodsItem, goodsIndex) => {
							if (goodsId == goodsItem.ID) {
								var deleted = goods + '[' + goodsIndex + '].deleted';
								if (deleted) {
									that.setData({
										[deleted]: !flag
									})
								}
							}
						})
					}
				})

				// 检测当前商店
				this.checkShopDeleted(product);
				// 检测所有
				this.checkAllDeleted();
			},
			// 勾选商店删除
			selectShopDeleted(e) {
				var that = this;
				var id = e.currentTarget.dataset.id;
				var flag = e.currentTarget.dataset.deleted;
				var deleted = "";

				this.cartItems.forEach((item, index) => {
					deleted = 'cartItems[' + index + '].deleted';

					if (deleted) {
						if (id == item.ID) {
							console.log(deleted)
							that.setData({
								[deleted]: !flag
							})
						}
					}
				})

				// 检测商店子商品全选非全选
				this.checkDeletedGoods(id, flag);

				// 检测所有
				this.checkAllDeleted();
			},
			// 检测商店子商品全选非全选删除状态
			checkDeletedGoods(id, flag) {
				var that = this;
				this.cartItems.forEach((item, index) => {
					var goods = 'cartItems[' + index + '].List';
					if (id == item.ID) {
						item.List.forEach((goodsItem, goodsIndex) => {
							var deleted = goods + '[' + goodsIndex + '].deleted';
							if (deleted) {
								that.setData({
									[deleted]: !flag
								})
							}
						})
					}
				})

				// 计算删除数量
				this.calTotalDeletedNum()
			},
			// 检测商店删除全选非全选
			checkShopDeleted(product) {
				// 全部选中则全选点亮
				var that = this;
				var checkAllFlags = true;
				var checkIndex = ""; // 需要检索的商店
				this.cartItems.forEach((item, index) => {
					if (product.ID == item.ID) {
						checkIndex = index;
						item.List.forEach((goodsItem, goodsIndex) => {
							checkAllFlags = checkAllFlags && goodsItem.deleted;
						})
					}
				})

				// 操作
				var deleted = 'cartItems[' + checkIndex + '].deleted';
				if (deleted) {
					that.setData({
						[deleted]: checkAllFlags
					})
				}

				// 计算删除数量
				this.calTotalDeletedNum()
			},
			// 检测所有全选非全选
			checkAllDeleted() {
				// 全部选中则全选点亮
				var that = this;
				var checkAllFlags = true;
				var checkIndex = ""; // 需要检索的商店
				this.cartItems.forEach((item, index) => {
					item.List.forEach((goodsItem, goodsIndex) => {
						checkAllFlags = checkAllFlags && goodsItem.deleted;
					})
				})

				// 操作全选标志
				this.setData({
					isAllSelectDeleted: checkAllFlags
				})
			},
			// 计算删除勾选的商品数
			calTotalDeletedNum() {
				var that = this;
				// var totalMoney = 0;
				var totalNum = 0;

				// 设置选定数量
				that.setData({
					totalNum2: totalNum
				})

				this.cartItems.forEach((item, index) => {
					var goods = 'cartItems[' + index + '].List';
					item.List.forEach((goodsItem, goodsIndex) => {
						if (goodsItem.deleted) {
							totalNum += 1;
							// 设置选定数量
							that.setData({
								totalNum2: totalNum
							})
						}
					})
				})
			},
			// 点击全选 flag:true 选中全选 false 取消全选
			allSelectDeleted(e) {
				var that = this;
				var flag = e.currentTarget.dataset.flag;
				// this.allSelectBtn = flag;
				var deleted = "";

				// 全选标志
				this.setData({
					isAllSelectDeleted: !flag
				})

				this.cartItems.forEach((item, index) => {
					deleted = 'cartItems[' + index + '].deleted';
					// 全选商店
					if (deleted) {
						that.setData({
							[deleted]: !flag
						})
					}

					// 全选商品
					var goods = 'cartItems[' + index + '].List';
					item.List.forEach((goodsItem, goodsIndex) => {
						var deleted = goods + '[' + goodsIndex + '].deleted';
						if (deleted) {
							that.setData({
								[deleted]: !flag
							})
						}
					})
				})
				// 计算总数量
				this.calTotalDeletedNum();
			},
			// 删除所选项
			goDeleted() {
				var that = this;
				var selectGoods = [];
				var item = {};
				this.cartItems.forEach((item, index) => {
					item.List.forEach((goodsItem, goodsIndex) => {
						if (goodsItem.deleted) {
							item.CID = goodsItem.ID
							selectGoods.push(item)
						}
					})
				})
				uni.showModal({
					title: '提示',
					content: '确定删除所选项吗？',
					confirmColor: "#f6819e",
					success(res) {
						if (res.confirm) {
							// 执行删除接口
							var url = "deleteCollectGoods.ashx";
							var params = {};
							params.LstCollectGoods = selectGoods;

							util.POST({
								url: url,
								params: JSON.stringify(params),
								success(res) {
									var oData = res.data[0]
									uni.showToast({
										icon: 'none',
										title: oData.Msg,
										duration: 1000
									})
									if (oData.Status === "200") {
										// 过滤有删除标记的商品
										var newCartItems = [];
										var newGoods = [];
										that.data.cartItems.forEach((item, index) => {
											if (!item.deleted) {
												newGoods = item.List.filter((goodsItem, goodsIndex) => {
													return !goodsItem.deleted;
												})
												item.List = newGoods;
												newCartItems.push(item)
											}
										})

										that.setData({
											cartItems: newCartItems
										})
									}
								}
							})

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			getMsg(type, page) {
				this.goodsList = mockData.data.data
				var that = this;
				var url = "getMyCollectionList.ashx";
				var params = {
					Size: 10,
					Page: page
				};
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
					},
					fail() {
						uni.showToast({
							icon: 'none',
							title: "失败"
						})
					},
				})
			},
			goUrl(e) {
				var index = e.currentTarget.dataset.index;
				var number = e.currentTarget.dataset.number;
				uni.navigateTo({
					url: "/pages/goods/detail?index=" + index + "&number=" + number,
				})
			},
			changeTab(type) {
				this.curType = type
			},
			/**
			 * 页面上拉触底事件的处理函数
			 */
			onReachBottom() {
				if (this.isLoadData) {
					var type = this.curType;
					var page = this.curPage + 1
					this.getMsg(type, page);
				}
			}
		}
	}
</script>
<style lang="scss">
	page{
		background: #etertw ;
	}
	.page-content{
		padding-top:20rpx;
	}
	.tab-bar {
		height: 100rpx;
		margin-bottom: 20rpx;
		line-height: 100rpx;
		background: #fff;
		text-align: center;
		border-top: 1rpx solid #dadada;
	}

	.tab-bar .flex-item.on {
		color: #c40606;
	}

	.info .item {
		padding: 30rpx;
		position: relative;
		.img {
			display: block;
			width: 200rpx;
			height: 200rpx;
			margin-right: 33rpx;
			background: #999;
		}
		.tit {
			line-height: 48rpx;
			font-size: 34rpx;
			color: #2c3e50;
		}
		.see {
			padding-left: 50rpx;
			margin-top: 67rpx;
			color: #999;
			font-size: 26rpx;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAMAAADbT899AAAAclBMVEX///+ZmZmdnZ37+/v09PSfn5/u7u7x8fHp6en4+Pitra2kpKShoaHe3t6+vr6mpqbr6+vW1tbU1NTDw8PAwMCqqqqoqKjl5eXi4uLOzs7Hx8e3t7exsbHa2trLy8vExMS6urr29va0tLSzs7Ojo6PIyMjLnb59AAABFUlEQVQoz31S15LDIAyU6Rhcca+xffn/X7xBjGPfJZN9knZhUQEuULWMtWkONzP4ADrH0QleyTdZTV4h1hhLfDAwetdZ71k+9Yox1U8+qRN96XL1lF1FSIXjPu1fpYgUXR0DmieJoCCR4Ku861Gcgy6PLNtLDaq+1SofqJOBQml8lBVA1wi5igFsjmBiExBjhHhISAJJnhoED+xPDl0dwrgFdbIShP12gAjY0tcT8u2JaGcA4iqyyLDIGagLetP5eeYpR2MFuhibZiywzdAPDYMYOPYkgYquC4NCvdTnKkqDcxEhzSuO/oW+LXP3HvGiGGuXGO9P7Z99ajQh3HIeal42+Af2NNEJM3z8VGx2UxMfaX83/wUxQw8ViRksQQAAAABJRU5ErkJggg==) 0 center no-repeat;
			background-size: 32rpx 20rpx;
		}
	}
</style>
