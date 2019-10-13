const util = require('../../../utils/util.js');
Page({
    data: {
        hotSearch: [],
        historySearch: [   // 历史搜索
            {
                id: 123,
                txt: "悦诗风吟",
            },
            {
                id: 123,
                txt: "芭比布朗",
            },
            {
                id: 123,
                txt: "芭比布朗",
            },
            {
                id: 123,
                txt: "芭比布朗",
            },
            {
                id: 123,
                txt: "芭比布朗",
            }
        ]
    },
    onLoad: function (options) {
        this.getMsg();
    },
    getMsg: function () {
        var that = this;
        var url = "getHotKeys.ashx"
        var params = new Object();
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
    // 搜索
    goSearch (e) {
        wx.redirectTo({
            url: "/pages/goodsDetail/searchlist/search?txt=" + e.detail.value
        })
    }
})