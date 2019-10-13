var mockData = `
    [
    {
        "id": "1234234534",
        "Name": "南泉山寺庙圆满大方撒旦法撒旦法",
        "Img": "http:\/\/qn.fayuanhui.cn\/2d2da218534518a64eee630d33132d5e.jpg",
        "see": 30,
        "source": "法缘汇"
    },
    {
        "id": "1234234534",
        "Name": "南泉山寺庙圆满大方撒旦法撒旦法",
        "Img": "http:\/\/qn.fayuanhui.cn\/2d2da218534518a64eee630d33132d5e.jpg",
        "see": 30,
        "source": "法缘汇"
    }
]
`
mockData = JSON.parse(mockData)
const util = require('../../../utils/util.js');

Page({
    data: {
        isLoadData: true,   // 是否可加载数据
        items: [],     // 订单数据
        curMethods: null,       // 当前方法
        curType: -1,              // 当前类型 默认为全部
        totalPages: 0,         // 所有页数
        curItem: "",         // 选定的当前item
    },
    switchOrder: function (e) {
        // type  -1：全部 0：待付款 1：待发货 2：待收货 4：已完成
        var type = e.currentTarget.dataset.type;
        this.getOrderList(0, 10);
    },
    getOrderList: function (page, size) {
        var that = this;
        var url = "api/getOrderList"
        var params = new Object();
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
            curPage: page,
        })
    },
    onLoad: function (options) {
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
            var page = this.data.curPage + 1
            this.getOrderList(type, page, 10);
        }
    },
})