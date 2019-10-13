const util = require('../../../utils/util.js');
Page({
    data: {
        user: {},
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
            fail: function () {
                wx.showToast({
                    icon: 'none',
                    title: "失败"
                })
            },
        })
    },
    onLoad: function (options) {
        // this.tabBar = this.selectComponent("#tabBar");
        this.getMsg();
    },
})