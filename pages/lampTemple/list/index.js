var mockData = `
    [
    {
        "brief": "会龙寺地处上海市南汇区六灶镇会龙村，始建于明代洪武十九年(1386年)。初称陆家庵，后易名会龙寺。该寺在历史上就是周边四镇(六灶、三灶、祝桥、盐仓)百姓和盐商祈求平安兴隆、万事顺利的佛教活动场所。六百多年来，会龙寺历尽沧桑，饱经风雨，到上个世纪90年代初，政府宗教办正式批准为佛教活动场所",
        "distance": 14476,
        "dl_num": 256,
        "temple_id": 235,
        "temple_img": "http://qn.fayuanhui.cn/c701c321e8760d2d54f7cedf25726cf1.jpg",
        "temple_name": "上海会龙寺",
        "unlit":2984
    }
]
`
mockData = JSON.parse(mockData)
const util = require('../../../utils/util.js');

Page({
    data: {
        isLoadData: true,   // 是否可加载数据
        items: [],     // 订单数据
        curType: -1,              // 当前类型 默认为全部
        totalPages: 0,         // 所有页数
        isSHowSearch: false,
        searchTxt: "",
        history: ["撒的发多少", "撒的发多少"],
    },
    getList: function (page, size, search) {
        var that = this;
        var url = "api/getOrderList"
        var params = {};
        params.Page = page;
        params.Size = size;
        params.search = search;

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
    // 切换搜索
    toggleSearch () {
        this.setData({
            isSHowSearch: !this.data.isSHowSearch
        })
    },
    // 清除历史搜索
    clearHistory () {
        this.setData({
            history: []
        })
    },
    // 清除搜索
    clear () {
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
    // 确认搜索
    confirmSearch () {
        this.getList(0, 10, this.data.searchTxt);
    },
    onLoad: function (options) {
        this.getList(0, 10)

        this.setData({
            items: mockData
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.isLoadData) {
            var page = this.data.curPage + 1
            this.getList(page, 10);
        }
    },
})