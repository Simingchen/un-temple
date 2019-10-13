const util = require('../../../utils/util.js');
var mockData = `
    [
        {
            "Img": "http://img4.imgtn.bdimg.com/it/u=2974067341,1797013015&fm=26&gp=0.jpg",
            "Name": "是的法规的刚好梵蒂冈和梵蒂冈和规范化发过火",
            "SingelPrice": 100,
            "Quantity": 1,
            StoreID: 124234
        }
    ]
`
mockData = JSON.parse(mockData)
Page({
    data: {
        isLogin: false,
        totalMoney: 0,           // 选定总金额
        totalNum: 0,             // 选定商品数量
        isAllSelect: false,      // 是否全选还是取消全选
        isEditStatus: false,     // 是否在编辑状态
        allSelectBtn: false,     // 选定所有商品
        allSelectDeleted: false,  // 选定所有删除项(编辑模式)
        isAllSelectDeleted: false, // 是否全选还是取消全选(编辑模式)
        totalNum2: 0,            // 选定删除商品数量(编辑模式)
        curProduct: "",          // 删除单选当前的选中商品
        isMultProduct: 1,       // 是否选中并删除多个商品 0为单个删除 1为全部删除 2为失效删除
        totalPages: 1,           // 所有页数
        curPage: 1,              // 当前页数
        cartItems: []// 购物车列表数据
    },
    // 获取信息
    getGoods: function () {
        this.setData({
            cartItems: mockData
        })



        var that = this;
        var url = "getMyCart.ashx"
        var params = new Object();

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
        //             wx.showToast({
        //                 icon: 'none',
        //                 title: oData.Msg,
        //                 duration: 1000
        //             })
        //         }
        //     },
        //     fail: function () {
        //         wx.showToast({
        //             icon: 'none',
        //             title: "失败"
        //         })
        //     },
        // })
    },
    // 点击全选 flag:true 选中全选 false 取消全选
    allSelect: function (e) {
        var that = this;
        var flag = e.currentTarget.dataset.flag;
        var checked = "";

        // 全选标志
        this.setData({
            isAllSelect: !flag
        })

        this.data.cartItems.forEach((item, index) => {
            checked = 'cartItems[' + index + '].checked';
            // 全选商店
            if (checked) {
                that.setData({
                    [checked]: !flag
                })
            }
            
            // 全选商品
            var goods = 'cartItems[' + index + '].LstOrderDetails';
            item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
                var checked = goods + '[' + goodsIndex + '].checked';
                if (checked) {
                    that.setData({
                        [checked]: !flag
                    })
                }
            })
        })
        // 计算总金额
        this.calTotalMoney();
    },
    // 单个商品选择
    selectProduct: function (e) {
        var that = this;
        var goodsId = e.currentTarget.dataset.id;
        var flag = e.currentTarget.dataset.checked;
        var product = e.currentTarget.dataset.item;
        this.data.cartItems.forEach((item, index) => {
            var goods = 'cartItems[' + index + '].LstOrderDetails';
            if (product.StoreID == item.StoreID) {
                item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
                    if (goodsId == goodsItem.ID) {
                        var checked = goods + '[' + goodsIndex + '].checked';
                        that.setData({
                            [checked]: !flag
                        })
                    }
                })
            }
        })

        // 检测所有
        this.checkAll();
    },
    // 检测商店子商品全选非全选
    checkGoods: function (id, flag) {
        var that = this;
        this.data.cartItems.forEach((item, index) => {
            var goods = 'cartItems[' + index + '].LstOrderDetails';
            if (id == item.StoreID) {
                item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
                    var checked = goods + '[' + goodsIndex + '].checked';
                    if (checked) {
                        that.setData({
                            [checked]: !flag
                        })
                    }
                })
            }
        })

        // 计算总金额
        this.calTotalMoney()
    },
    // 检测所有全选非全选
    checkAll: function () {
        // 全部选中则全选点亮
        var that = this;
        var checkAllFlags = true;
        var checkIndex = "";    // 需要检索的商店
        this.data.cartItems.forEach((item, index) => {
            item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
                checkAllFlags = checkAllFlags && goodsItem.checked;
            })
        })

        // 操作全选标志
        this.setData({
            isAllSelect: checkAllFlags
        })
    },
    // 计算总金额，计算勾选的商品数
    calTotalMoney: function () {
        var that = this;
        var totalMoney = 0;
        var totalNum = 0;
        
        // 清空设置选定价格
        that.setData({
            totalMoney: totalMoney
        })
        // 设置选定数量
        that.setData({
            totalNum: totalNum
        })

        this.data.cartItems.forEach((item, index) => {
            var goods = 'cartItems[' + index + '].LstOrderDetails';
            item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
                if (goodsItem.checked) {
                    totalMoney = (totalMoney * 100 + goodsItem.SingelPrice * goodsItem.Quantity * 100) / 100
                    totalNum += 1;
                    // 设置选定价格
                    that.setData({
                        totalMoney: totalMoney
                    })
                    // 设置选定数量
                    that.setData({
                        totalNum: totalNum
                    })
                }
            })
        })
    },
    // 加减商品数量
    changeQuantity: function (e) {
        var that = this;
        var goodsId = e.currentTarget.dataset.id;
        var product = e.currentTarget.dataset.item;
        var type = e.currentTarget.dataset.type;
        var nums = null;
        var nowNum = null;

        this.data.cartItems.forEach((goodsItem, goodsIndex) => {
            if (goodsId == goodsItem.ID) {
                var nowNum = this.data.cartItems[goodsIndex].Quantity;

                nums = goods + '[' + goodsIndex + '].Quantity';

                if (type > 0) {
                    nowNum++;
                } else {
                    nowNum > 1 ? nowNum-- : nowNum = 1;
                }

                var url = "saveQuantityForCart.ashx";
                var params = {};
                params.OID = goodsId;
                params.Quantity = nowNum;
                util.POST({
                    url: url,
                    params: JSON.stringify(params),
                    success: function (res) {
                        var oData = res.data[0]
                        if (oData.Status == 200) {
                            that.setData({
                                [nums]: nowNum
                            })

                            // 计算总金额
                            that.calTotalMoney();
                        }
                    }
                })
            }
        })
    },
    // 结算商品
    goPay: function () {
        var selectGoods = [];
        this.data.cartItems.forEach((item, index) => {
            item.LstOrderDetails.forEach((goodsItem, goodsIndex) => {
                if (goodsItem.checked) {
                    var addItem = {
                        OID: null
                    }
                    addItem.OID = goodsItem.ID;
                    selectGoods.push(addItem)
                }
            })
        })
        var url = "submitCart.ashx";
        var params = new Object();
        params.OrderDetailsList = selectGoods;
        util.POST({
            url: url,
            params: JSON.stringify(params),
            success: function (res) {
                var oData = res.data[0]
                if (oData.Status == 200) {
                    // 购物车结算到订单
                    wx.navigateTo({
                        url: "/pages/order/index?id=" + oData.Data[0].Token
                    })
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
    onLoad: function (options) {
        this.getGoods()
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
})