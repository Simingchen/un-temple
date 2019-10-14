<template>
	<view class="search-bar-box">
	    <view class="hr130"></view>
	    <view class="search-bar {{isSHowSearch? 'focus': ''}}">
	        <view class="search-box flex-box">
	            <view class="form flex-box flex-item">
	                <input placeholder='请输入关键字搜索' focus="{{isSHowSearch}}" bindinput="bindKeyInput" value="{{searchTxt}}" confirm-type="search" class="flex-item" maxlength="20"></input>
	                <view class="close" bindtap='clear' bindconfirm="confirmSearch"></view>
	            </view> 
	            <view class="cancel" bindtap='toggleSearch'>
	                取消
	            </view>
	        </view>
	        <view class="search-input form" bindtap='toggleSearch'>
	            <text>请输入关键字搜索</text>
	        </view>
	    </view>
	    <view class="search-con" wx:if="{{isSHowSearch}}">
	        <view class="panel search-line lately-search" wx:if="{{history.length > 0}}">
	            <view class="title">
	                最近搜索
	                <view class="del" bindtap='clearHistory'></view>
	            </view>
	            <view class="list-con clearfix">
	                <view class="item" wx:for="{{history}}" wx:key="index">
	                    {{item}}
	                </view>
	            </view>
	        </view>
	        <view class="panel search-line hot-search">
	            <view class="title">
	                热门搜索
	            </view>
	            <view class="list-con clearfix">
	                <view class="item">阿斯顿发生的发生兜风</view>
	            </view>
	        </view>
	    </view>
	</view>
	<view class="goods-list" wx:if="{{!isSHowSearch}}" wx:for="{{goodsList}}" wx:key="{{index}}" wx:for-item="goods">
	    <navigator class="goods-item" hover-class="none" url="/pages/goods/detail/index">
	        <image class="goods-img" src="{{goods.goods_cover}}"></image>
	        <view class="con">
	            <view class="goods-name ellipsis2">
	                {{goods.goods_name}}
	            </view>
	            <view class="goods-price">
	                <text>¥{{goods.goods_price}}</text>
	            </view>
	        </view>
	    </navigator>
	</view>
</template>
<script>
	const util = require('../../../utils/util.js');
	var mockData = { "data": { "current_page": 1, "data": [{ "goods_id": 15, "goods_name": "\u5357\u6cc9\u5c71\u5bfa8\u5bf8\u5706\u6ee1\u89c2\u97f3\uff08\u7fe0\u7389\u9576\u91d1\uff09", "goods_cover": "http:\/\/qn.fayuanhui.cn\/2d2da218534518a64eee630d33132d5e.jpg", "goods_storage": 3, "goods_price": "4666.00" }, { "goods_id": 16, "goods_name": "\u5357\u6cc9\u5c71\u5bfa8\u5bf8\u5706\u6ee1\u4e09\u5b9d\u4f5b\uff08\u7fe0\u7389\u9576\u91d1\uff09", "goods_cover": "http:\/\/qn.fayuanhui.cn\/efcd450e04ff4aa8b1a689e5c31da9ac.png", "goods_storage": 3, "goods_price": "4666.00" }, { "goods_id": 17, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u51b0\u66dc\u89c2\u97f3", "goods_cover": "http:\/\/qn.fayuanhui.cn\/c3c45db2fc6d98d1ace84ac2446e377d.jpg", "goods_storage": 95, "goods_price": "166.00" }, { "goods_id": 18, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u4e0d\u9000\u83e9\u8428", "goods_cover": "http:\/\/qn.fayuanhui.cn\/10800518fb59ab2d22df128093c59d31.jpg", "goods_storage": 20, "goods_price": "7999.00" }, { "goods_id": 19, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u6c89\u9999", "goods_cover": "http:\/\/qn.fayuanhui.cn\/d6be21a44e2b4b3cb7d42a594a76fc4d.jpg", "goods_storage": 99, "goods_price": "66.00" }, { "goods_id": 20, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u51e4\u773c\u624b\u4e32", "goods_cover": "http:\/\/qn.fayuanhui.cn\/f124951e9c4a2c69e4f267176fba873d.jpg", "goods_storage": 8, "goods_price": "299.00" }, { "goods_id": 21, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u4f5b\u7f18\u5409\u7965\u597d\u8fd0\u4f5b\u724c\uff08\u5973\u6b3e\uff09", "goods_cover": "http:\/\/qn.fayuanhui.cn\/ccb115cebc8a4520ef647113cc032c0e.jpg", "goods_storage": 10, "goods_price": "566.00" }, { "goods_id": 22, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u560e\u4e4c\u76d2\uff08\u5973\u6b3e\uff09", "goods_cover": "http:\/\/qn.fayuanhui.cn\/347a52dd1117d1a95c54e27253620310.jpg", "goods_storage": 10, "goods_price": "599.00" }, { "goods_id": 23, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u82b1\u4e1d\u89c2\u97f3\u83e9\u8428", "goods_cover": "http:\/\/qn.fayuanhui.cn\/a8c8a72e667744700122d26bdda73be5.jpg", "goods_storage": 10, "goods_price": "799.00" }, { "goods_id": 24, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u91d1\u521a\u83e9\u63d0\u9879\u94fe", "goods_cover": "http:\/\/qn.fayuanhui.cn\/84eee1526ef439d4b31ecde4448b1df3.jpg", "goods_storage": 197, "goods_price": "166.00" }], "per_page": 10, "total": 36 }, "msg": "", "code": 200 }
	
	export default {
		data() {
			return {
				isSHowSearch: false,
				searchTxt: "",
				history: ["撒的发多少", "撒的发多少"],
				curPage: 0,
				isLoadData: true,   // 是否可加载数据
				isLogin: false,
				totalPages: 1,           // 所有页数
				curPage: 1,              // 当前页数
				goodsList: []
			}
		},
		onLoad: function (options) {
		    this.getMsg(0, 0)
		},
		methods: {
			// 删除操作************************************
			// 勾选单品删除
			selectDeleted: function (e) {
			    var that = this;
			    var goodsId = e.currentTarget.dataset.id;
			    var flag = e.currentTarget.dataset.deleted;
			    var product = e.currentTarget.dataset.item;
			
			    this.data.cartItems.forEach((item, index) => {
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
			selectShopDeleted: function (e) {
			    var that = this;
			    var id = e.currentTarget.dataset.id;
			    var flag = e.currentTarget.dataset.deleted;
			    var deleted = "";
			   
			    this.data.cartItems.forEach((item, index) => {
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
			checkDeletedGoods: function (id, flag) {
			    var that = this;
			    this.data.cartItems.forEach((item, index) => {
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
			checkShopDeleted: function (product) {
			    // 全部选中则全选点亮
			    var that = this;
			    var checkAllFlags = true;
			    var checkIndex = "";    // 需要检索的商店
			    this.data.cartItems.forEach((item, index) => {
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
			checkAllDeleted: function () {
			    // 全部选中则全选点亮
			    var that = this;
			    var checkAllFlags = true;
			    var checkIndex = "";    // 需要检索的商店
			    this.data.cartItems.forEach((item, index) => {
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
			calTotalDeletedNum: function () {
			    var that = this;
			    // var totalMoney = 0;
			    var totalNum = 0;
			
			    // 设置选定数量
			    that.setData({
			        totalNum2: totalNum
			    })
			
			    this.data.cartItems.forEach((item, index) => {
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
			allSelectDeleted: function (e) {
			    var that = this;
			    var flag = e.currentTarget.dataset.flag;
			    // this.data.allSelectBtn = flag;
			    var deleted = "";
			
			    // 全选标志
			    this.setData({
			        isAllSelectDeleted: !flag
			    })
			
			    this.data.cartItems.forEach((item, index) => {
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
			goDeleted: function () {
			    var that = this;
			    var selectGoods = [];
			    var item = {};
			    this.data.cartItems.forEach((item, index) => {
			        item.List.forEach((goodsItem, goodsIndex) => {
			            if (goodsItem.deleted) {
			                item.CID = goodsItem.ID
			                selectGoods.push(item)
			            }
			        })
			    })
			    wx.showModal({
			        title: '提示',
			        content: '确定删除所选项吗？',
			        confirmColor: "#f6819e",
			        success: function (res) {
			            if (res.confirm) {
			                // 执行删除接口
			                var url = "deleteCollectGoods.ashx";
			                var params = new Object();
			                params.LstCollectGoods = selectGoods;
			
			                util.POST({
			                    url: url,
			                    params: JSON.stringify(params),
			                    success: function (res) {
			                        var oData = res.data[0]
			                        wx.showToast({
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
			                        } else {
			                            
			                        }
			                    },
			                    fail: function () {
			                        wx.showToast({
			                            icon: 'none',
			                            title: "失败"
			                        })
			                    },
			                })
			                
			            } else if (res.cancel) {
			                console.log('用户点击取消')
			            }
			        }
			    })
			},
			getMsg(type, page) {
			    this.setData({
			        ["goodsList"]: mockData.data.data
			    })
			    console.log(this.data.goodsList)
			    var that = this;
			    var url = "getMyCollectionList.ashx";
			    var params = new Object();
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
			                wx.showToast({
			                    icon: 'none',
			                    title: oData.Msg,
			                    duration: 1000
			                })
			            }
			        },
			        fail: function () {
			            wx.showToast({
			                icon: 'none',
			                title: "失败"
			            })
			        },
			    })
			},
			goUrl (e) {
			    var index = e.currentTarget.dataset.index;
			    var number = e.currentTarget.dataset.number;
			    wx.navigateTo({
			        url: "/pages/goodsDetail/index?index="+index+"&number="+ number,
			        
			    })
			},

			// 切换搜索
			toggleSearch() {
			    this.setData({
			        isSHowSearch: !this.data.isSHowSearch
			    })
			},
			// 清除历史搜索
			clearHistory() {
			    this.setData({
			        history: []
			    })
			},
			// 清除搜索
			clear() {
			    this.setData({
			        searchTxt: ""
			    })
			},
			// 输入搜索
			bindKeyInput: function (e) {
			    this.setData({
			        searchTxt: e.detail.value
			    })
			},
			changeTab (e) {
			    var type = e.currentTarget.dataset.type;
			    this.setData({
			        curType: type
			    })
			},
			/**
			 * 页面上拉触底事件的处理函数
			 */
			onReachBottom: function () {
			    if (this.data.isLoadData) {
			        var type = this.data.curType;
			        var page = this.data.curPage + 1
			        this.getMsg(type, page);
			    }
			}
		}
	}
</script>
<style lang="scss">
	.search-bar{
	    position: fixed;
	    width:100%;
	    top:0;
	    left:0;
	    height:132rpx;
	    background: #c7a769;
	}
	.hr130{
	    height:132rpx;
	}
	.search-box{
	    padding-top:30rpx;
	    padding-left:20rpx;
	    display: none;
	}
	.form{
	    /* width:710rpx; */
	    height:72rpx;
	    line-height: 72rpx;
	    margin:0 auto;
	    background: #e4d8bf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAARVBMVEXk2L/Hp2nJqm/VvpHQtoPk1rzi1Ljdyqbbx6HNsXrLrnXj1brZxZ7XwJXYwpjUvI7fz6/ezavMr3jLrXPOs37h07bSuYi5d4yZAAABK0lEQVQ4y42S2xKDIAxE3QgqCN6q/v+nligMKmbafYEwx2RZqS6avLIEssrP1bu0W5D1GfoXprU4RB+Km65gRj63ftbccxoMl3t/H6V4QndtzLNNc4WYGfW998BUf5/lSpcEqFwVTHmubZgV98VEirZc8Kzfs1uB+tyFe3RCwDNA578AbFjEVi2vHvAi5KJdBcwitAELrxbQlSgCpUWWATj1EABXsvPtn07NH57w83YNYGNOgwh1wB6jNyKk0i/7cPTvmgDq04NYxEbpFfQEeMkRmrx/HTjdXuweRrclE8yqXGqDkEM56/6sG6bMfG2jmEm+o/njbHXb+U13luODqhyBRctq4i7Mr59UUxOyqOa7ZyqrHZcDtHvHOQsUu9tSfIkSon5SVP2Up/oL5CMIWTIpOO8AAAAASUVORK5CYII=) 18rpx 18rpx no-repeat;
	    background-size: 36rpx 36rpx;
	    border-radius:8rpx;
	}
	.form input{
	    display: block;
	    height:72rpx;
	    padding-left:90rpx;
	}
	.search-input{
	    position:absolute;
	    top:30rpx;
	    left:20rpx;
	    right:30rpx;
	    height:72rpx;
	    padding-left:90rpx;
	}
	.close{
	    width: 72rpx;
	    height: 72rpx;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAACx0lEQVRYR9WZvY9NURDAf1MICSqroPcRIhI9CgpLIpFYW5DoWKWOAqGwKq2PTkKxS4hN0NiGXiIiFn+AwqqQEMXIMHdz39n73j3n3rvv5bzy3Zk5vzM583HmCC1+qroW2AvsA3YCW4ExYL2b/Q4sAp+A98Ar4LWI/Gy6rKQqqqrpjAOngaPAmkQbv4A54B7wQkQ0RT8JWFWPA5eBXSmLDJB9B1wTkUex9qKAVXULcAs4EGs4UW4eOCcin+v0aoFV9SRwG1hXZ6zl9x/AlIg8GGRnILCqTgMXWoKkqt8QkYv9lPoCq+od4Ezqah3J3xWRs1W2KoFH5NmQr9LTy4D9zN7vyFNtzZwKz3QPsGeDN0MIsNiNWCDuKWePEPjlCqauWMhQbl5EDhZ/LgF7UXjY1OoK600UxeUfsJfbt5EV7ItVJ2ATYOlnVSLsH8DSpdmxqml26n5WEXdbGS+ADwPP6rT8u1UkKyS20WPATAK0wU6KyBPXn/IKGrP0ERF5XgDPAhMxWl77rxSyCdA9sA581b0cs/SsiEyKt4jWAsZ2XVUL13m6iU64Cevyxgz4kLV5MVssyaQApMjWYYwb8HUPnjrh8HsMSIxMyrrTBvzUG/EUxUJ2EJDJLAVYwyANmeYMeAHY1oTWdfpBU2SDjmDNzEcDtoDb0ALYVJdBl+0lZJI6jG8GbNG3uk4y4nsldIewhvA7S+CvfjWPcGJfkWEdiUXz8AdgewvaYQbdQpZpLbvCkV1ptvlYPs2PVyHraU9EBp6NlrpqL88DNyPX/d9eOvCoGnhrSx9HAvc08AY+iivSJWBzBHDvFcm9bJPJPC6hxQ5VNZ9rvnvZxqr5DFIc2sareYyqSkdjFGPWMPbihoEl6HzGrSP2dLOBdgk6nyeDEnQ+jzLBZTKPZ68AOp+HxTDvlJ5u9wM7/Ol2Y2mCbxN0uzN29nT7F1CKspwex1OuAAAAAElFTkSuQmCC) no-repeat 50%;
	    background-size: 36rpx auto;
	}
	.cancel{
	    width:126rpx;
	    font-size: 36rpx;
	    padding: 0 24rpx 0 30rpx;
	    color: #fff;
	    line-height: 72rpx;
	    display: none;
	}
	.focus .cancel{
	    display: block;
	}
	.focus .search-input{
	    display: none;
	}
	.focus .search-box{
	    display: flex;
	}
	.info .item{
	    padding:30rpx;
	    position: relative;
	}
	.info .item .img{
	    display:block;
	    width:200rpx;
	    height:200rpx;
	    margin-right:33rpx;
	    background: #999;
	}
	.info .item .tit{
	    line-height: 48rpx;
	    font-size: 34rpx;
	    color:#2c3e50;
	}
	.info .item .see{
	    padding-left:50rpx;
	    margin-top:67rpx;
	    color:#999;
	    font-size: 26rpx;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAMAAADbT899AAAAclBMVEX///+ZmZmdnZ37+/v09PSfn5/u7u7x8fHp6en4+Pitra2kpKShoaHe3t6+vr6mpqbr6+vW1tbU1NTDw8PAwMCqqqqoqKjl5eXi4uLOzs7Hx8e3t7exsbHa2trLy8vExMS6urr29va0tLSzs7Ojo6PIyMjLnb59AAABFUlEQVQoz31S15LDIAyU6Rhcca+xffn/X7xBjGPfJZN9knZhUQEuULWMtWkONzP4ADrH0QleyTdZTV4h1hhLfDAwetdZ71k+9Yox1U8+qRN96XL1lF1FSIXjPu1fpYgUXR0DmieJoCCR4Ku861Gcgy6PLNtLDaq+1SofqJOBQml8lBVA1wi5igFsjmBiExBjhHhISAJJnhoED+xPDl0dwrgFdbIShP12gAjY0tcT8u2JaGcA4iqyyLDIGagLetP5eeYpR2MFuhibZiywzdAPDYMYOPYkgYquC4NCvdTnKkqDcxEhzSuO/oW+LXP3HvGiGGuXGO9P7Z99ajQh3HIeal42+Af2NNEJM3z8VGx2UxMfaX83/wUxQw8ViRksQQAAAABJRU5ErkJggg==) 0 center no-repeat;
	    background-size: 32rpx 20rpx;
	}
	.goods-list{
	    margin-top:20rpx;
	}
	.search-line{
	    padding:30rpx;
	}
	.search-line .title{
	    position: relative;
	    font-size: 32rpx;
	    color: #999;
	    height:44rpx;
	    line-height: 44rpx;
	    margin-bottom:20rpx;
	}
	.del{
	    position: absolute;
	    right: -30rpx;
	    height: 100rpx;
	    width: 100rpx;
	    top: -30rpx;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADwklEQVRYR+1Yz48URRT+Xu24Ychm48XobTlyUNC4khgj3vmNcOBGxuzUawdYlf0H+saFgCzM0lWzZozshRB+KGII8WAw8SIq6Mm4ava0xxWI7DLM9DPV6Z709s7Mzg4jmkCfuuv1e++r731VXa8JPV7W2r0iYgC8ICJ1pdT1paWl/ePj4w97CUm9ODmfIAhuEtHbaf+BgYF3xsbGbvYSMwLi+35uZGQklwRYWFhYFeDQ0NA3IrIlnZSIdovI1+mxfD7fMdbi4mKNmR9RpVI5FobhBIDneplJH3waAE5QEAR3iWi4DwEfJ8RdB+SIUmpCRPIA1gMYchFFZJGI7reJLl1k7eYdF+YBgOPL6met/UBEPo6TlJn5cBcJ+/JKWyAiMuV53qFslmq1+vzc3Nw93/fDVghmZmaGZ2dnH/i+X29lN8asn5+fr/u+X1sm9PRDmpFWQKy1R0XkOBHdEpG3nNoz/gfCMDxHRHODg4OjhULhr7Q9CIKtSqmvROTvRqPxZqlU+iOxL2PEGDMO4FSskRWMGGN+BPBa7LyJmX9JJzLGfA5gVzy2g5mvZewutssBIjqktZ7qFYhL/HLs/DozO2DNy1p7TUS2xQN7mflKxl4WkVIM5EOtdTTp6DmDuMkIEU1prZdpxBjzM4BX+gEEwEfMnCyM3oEopUaLxeIPa2EkCIIyEUWMPAPiKOiJEQBnmTmhMeIyrZFWpTHGfAlgezux/idAiOhdrfXlzGI4AyBZAN2JtRUj1to7IrIp3mfe8DzvViZRk5GnA4gx5g6AfjFylJlPrrqhtRFrRyDW2qsisiPeOVfTyJMBIiL7PM+71EGsjwXkNoDN7cSaZqRvQIgo0Fq/n5lREwgRbdFaf5+2B0FwlYii0vzfgZwGkJz62pfGWntERCZjsa2ZEWPMFwB2dmDkyQMhov1a64uZ0q4diPu0MLOXCfQTgFdjxlZoJM1IGyDNLV5EJjzPO9FyH8mU5jOt9cEMEPft2APAnVVHmHk+Y4+OgkQkIjKaPcEZYz4B8F5cuu6AALjNzMn5NMpXqVReDMPQraTvmPlGGoS7n5ycHM7n84fDMPyNmS9k7cYYt8pG1wrEzbqslLK5XO7PQqGwlA3czXO1Wl1Xq9U2ANAA3CTWxX4dNzRXik/jF11P6n4xPHJUx7NYrTlvZ3fjrrceBKBcLKXUgWKxeL6lRsrl8ku5XO5XAP92L/y7+3gys2s3o2vFDKanp7c2Gg33A2ZjmvqElWRMZEVr26nXFSJquB86RPRtvV4vpZsrF/Mf4IXmhdOm8ssAAAAASUVORK5CYII=) no-repeat 50%;
	    background-size: 34rpx;
	}
	.search-line .item{
	    float:left;
	    background: #f5f5f5;
	    border-radius: 4rpx;
	    line-height: 76rpx;
	    margin-bottom: 30rpx;
	    padding-left: 20rpx;
	    padding-right: 20rpx;
	    margin-right:20rpx;
	}
</style>