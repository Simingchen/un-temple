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
`
mockData = JSON.parse(mockData)
const util = require('../../utils/util.js');

Page({
    data: {
        isLoadData: true,   // 是否可加载数据
        items: [],     // 订单数据
        curMethods: null,       // 当前方法
        curType: -1,              // 当前类型 默认为全部
        totalPages: 0,         // 所有页数
        curPage: 0,           // 当前页数
        curItem: "",         // 选定的当前item
    },
    switchOrder: function (e) {
        // type  -1：全部 0：待付款 1：待发货 2：待收货 4：已完成
        var type = e.currentTarget.dataset.type;
        this.getOrderList(type, 0, 10);
    },
    getOrderList: function (type, page, size) {
        var that = this;
        var url = "api/getOrderList"
        var params = new Object();
        params.Status = type;
        params.Page = page;
        params.Size = size;
        
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
            fail: function () {
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
    payOrder: function (e) {
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
    cancleOrder: function (e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "取消订单？",
            confirmColor: "#f79bb0",
            success: function (res) {
                if (res.confirm) {
                    that.data.items.forEach((item, index) => {  // 成功后删除订单
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
    certainOrder: function (e) {
        var that = this;
        var number = e.currentTarget.dataset.number;
        var id = e.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "确认收货？",
            confirmColor: "#f79bb0",
            success: function (res) {
                if (res.confirm) {
                    var url = "confirmTrade.ashx"
                    var params = new Object();
                    params.Number = number;
                    util.POST({
                        url: url,
                        params: JSON.stringify(params),
                        success: function (res) {
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
                        fail: function () {
                            
                        },
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    // 在线支付前弹出密码框
    payPop: function (item) {
        this.curItem = item;
        // 直接支付
        this.payOrder();
    },
    onLoad: function (options) {
        this.tabBar = this.selectComponent("#tabBar");
        this.getOrderList(-1, 0, 10)

        this.setData({
            items: mockData
        })
        console.log(this.data.items)
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.isLoadData) {
            var type = this.data.curType;
            var page = this.data.curPage + 1
            this.getOrderList(type, page, 10);
        }
    },
})