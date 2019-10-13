const util = require('../../utils/util.js');
Page({
    data: {
        order: {
            receiver: "陈生",
            phone: "13926012341",
            addr: "高德置地16号高德置地16号高德置地16号",
            sendType: "圆通",
            leaveMsg: "发顺丰",
            orderNO: 1242135345,
            nums: 2,
            total: 6390,
            freight: 0,
            state: 1000,    // 1000代付款 2000待发货 3000待收货  4000已完成
            date: "2017-08-14",
            time: "08:00",
            goods: [],
            
        },
        
    },
    // 获取订单
    getOrder: function (id) {
        var that = this;
        var url = "getTradeInfo.ashx"
        var params = new Object();
        params.Number = id;
        util.POST({
            url: url,
            params: JSON.stringify(params),
            success: function (res) {
                var oData = res.data[0]

                if (oData.Status == 200) {
                    that.setData({
                        order: oData.Data[0]
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
    // 去支付
    goPay () {
        var that = this;
        var url = "getHotKeys.ashx"
        var params = new Object();
        params.Number = this.data.order.Number;
        util.POST({
            url: url,
            params: JSON.stringify(params),
            success: function (res) {
                var oData = res.data[0]

                if (oData.Status == 200) {
                    that.setData({
                        hotSearch: oData.Data
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
    // 确认收货
    certainOrder: function (e) {
        var that = this;
        var number = this.data.order.Number;
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

                            if (oData.Status == 200) {
                                wx.navigateBack({ // 成后返回上一页
                                    delta: 1
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
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    onLoad: function (options) {
        this.getOrder(options.id)
    },  
})