const util = require('../../../utils/util.js');
Page({
    data:{
        user:{
            name: "",
            led: ""
        },
    },
    getMsg: function () {
        var that = this;
        var url = "getMember.ashx"
        util.POST({
            url: url,
            success: function (res) {
                var oData = res.data[0]

                if (oData.Status == 200) {
                    that.setData({
                        user: oData.Data[0]
                    })
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: oData.Msg,
                        duration: 1000
                    })
                }
            },
        })
    },
    changeMsg: function (e) {  // 修改信息
        var type = e.currentTarget.dataset.type;
        this.setData({
            ['user.' + type]: e.detail.value
        })
    },
    saveOrder() {
        if (!this.data.name) {
            wx.showToast({
                icon: "none",
                title: "冠名文字不能为空"
            })
            return false;
        }
        if (!this.data.led) {
            wx.showToast({
                icon: "none",
                title: "LED显示文字不能为空"
            })
            return false;
        }

        var that = this;
        var url = "getMember.ashx"
        util.POST({
            url: url,
            success: function (res) {
                var oData = res.data[0]

                if (oData.Status == 200) {
                    // 微信支付
                    util.PAY(oData.Data[0].Number, {
                        success() {
                            wx.redirectTo({
                                url: "/pages/orderList/orderList"
                            })
                        },
                        fail() {
                            wx.redirectTo({
                                url: "/pages/orderList/orderList"
                            })
                        }
                    })
                }
            },
        })

    },
    onLoad: function (options) {
        this.getMsg();
    },
})