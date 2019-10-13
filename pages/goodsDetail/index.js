const app = getApp()
const util = require('../../utils/util.js');
Page({
    data: {
        isShowDialog: false,    // 是否显示加入购物车弹窗
        isShowparams: false,    // 是否显示产品参数
        goods: {},
        imgList: [],
        productQuantity: 1,         // 选定商品数量
        curStock: null,    // 选定的当前库存
        curSkuId: null,     // 当前选定的skuID
        curPrice: null,     // 当前选定价格
        curProty: null,     // 当前选定属性
    },
    getMsg (options) {
        var that = this;
        var url = "getGoodsDetails.ashx";
        var params = new Object();
        params.Index = options.index - 0;
        params.Number = options.number - 0;
        
        // params.Index = 5096;
        // params.Number = 1003;
        util.POST({
            url: url,
            params: JSON.stringify(params),
            success: function (res) {
                var oData = res.data[0]

                if (oData.Status === "200") {
                    that.setData({
                        goods: oData.Data[0],
                        curStock: oData.Data[0].SkuInfo[0].Stock,
                        curPrice: oData.Data[0].Price,
                        curSkuId: oData.Data[0].DefaultSkuID,
                        curProty: oData.Data[0].SkuInfo[0].Name
                    })

                    
                    var srcReg = /http.*?(gif|GIF|png|PNG|jpg|JPG)/gi;
                    if (that.data.goods.Content) {
                        that.setData({
                            imgList: that.data.goods.Content.match(srcReg)
                        })
                    }
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: oData.Msg,
                        duration: 1000
                    })
                }
            }
        })
    },
    // 切换sku弹窗
    toggleSku: function (e) {
        var type = ~~e.currentTarget.dataset.type;
        this.setData({
            isShowDialog: type
        })
    },
    // 加减商品数量
    changeQuantity: function (e) {
        var that = this;
        var type = e.currentTarget.dataset.type;
        var nowNum = this.data.productQuantity;
        
        if (type > 0) {
            if (this.data.productQuantity < this.data.curStock) {
                nowNum++;
            }
        } else {
            nowNum > 1 ? nowNum-- : nowNum = 1;
        }
        that.setData({
            ["productQuantity"]: nowNum
        })
    },
    // 收藏
    collect () {
        var that = this;
        var url = "addToCollectionList.ashx";
        var params = new Object();
        params.Store = this.data.goods.Index;
        params.Number = this.data.goods.Number;

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
                    var value = this.data.goods.isCollected == "True" ? "False" : "True"
                    that.setData({
                        ["goods.isCollected"]: value
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
    // 加入购物车
    addCart () {
        var that = this;
        var url = "addToCart.ashx";
        var params = new Object();
        var skuId = this.data.curSkuId;
        params.SID = this.data.goods.StoreID;
        params.Quantity = this.data.productQuantity;
        if (!that.data.goods.SkuInfo.length) {
            skuId = that.data.goods.DefaultSkuID
        }
        params.ID = skuId;
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
                    this.setData({
                        isShowDialog: true
                    })
                }
            }
        })
    },
    // 立即购买
    buyNow () {
        var that = this;
        var url = "addToCart.ashx";
        var params = new Object();
        var skuId = this.data.curSkuId;
        params.SID = this.data.goods.StoreID;
        params.Quantity = this.data.productQuantity;
        if (!that.data.goods.SkuInfo.length) {
            skuId = that.data.goods.DefaultSkuID
        }
        params.ID = skuId;
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
                    // 立即购买到购物车
                    wx.navigateTo({
                        url: "/pages/shopCart/shopCart"
                    })
                }
            }
        })
    },
    // 切换显示产品参数
    toogleParams (e) {
        var type = ~~e.currentTarget.dataset.type;
        this.setData({
            isShowparams: type
        })
    },
    // 选择水库
    selectSku (e) {
        var item = e.currentTarget.dataset.item;
        this.setData({
            curSkuId: item.MainID,  // 当前选定的skuID
            curStock: item.Stock,    // 选定的当前库存
            curPrice: item.Price,     // 当前选定价格
            curProty: item.Name,     // 当前选定属性
        })
    },
    onLoad: function (options) {
        this.getMsg(options);
    }
})
