var app = getApp();
const util = require('../../../utils/util.js');
Page({
    data: {
        currentTab: 1, //预设当前项的值
        curPage: 0,
        isLoadData: true,   // 是否可加载数据
        name: "",   // 搜索关键词
        "models": [{
            "name": "一级类目",
            "id": "6010",
            "type": "cat",
            "list": [
                {
                    "name": "蜂蜜",
                    "id": "6011",
                    "pic": "//img.alicdn.com/imgextra/i4/844537169/TB2yG6qhpXXXXb2XXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id =725677994&cat=50518003&q=èè"
                }, {
                    "name": "阿胶",
                    "id": "6012",
                    "pic": "//img.alicdn.com/imgextra/i2/831867534/TB2LmnLhpXXXXcbXXXXXXXXXXXX-831867534.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=é¿è¶"
                }, {
                    "name": "枸杞",
                    "id": "6013",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB22xnYhpXXXXXFXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=æ¸æ"
                }, {
                    "name": "燕窝",
                    "id": "6014",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB2ferzhpXXXXakXpXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=ççª"
                }, {
                    "name": "灵芝",
                    "id": "6015",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB2uGPahpXXXXbDXpXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=çµè"
                }, {
                    "name": "西洋参",
                    "id": "6016",
                    "pic": "//img.alicdn.com/imgextra/i2/844537169/TB20tbkhpXXXXXfXpXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=è¥¿æ´å"
                }, {
                    "name": "维生素",
                    "id": "6017",
                    "pic": "//img.alicdn.com/imgextra/i2/844537169/TB225TxhpXXXXaFXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=ç»´çç´ "
                }, {
                    "name": "补钙",
                    "id": "6018",
                    "pic": "//img.alicdn.com/imgextra/i2/844537169/TB2sdDwhpXXXXbXXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=é"
                }, {
                    "name": "鱼油",
                    "id": "6019",
                    "pic": "//img.alicdn.com/imgextra/i3/844537169/TB2EG2fhpXXXXaGXpXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=é±¼æ²¹"
                }, {
                    "name": "蛋白粉",
                    "id": "6020",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB2_a2BhpXXXXX7XXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=èç½ç²"
                }, {
                    "name": "铁皮石斛",
                    "id": "6021",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB2U02EhpXXXXXeXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=éç®ç³æ"
                }, {
                    "name": "蜂胶",
                    "id": "6022",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB2vSnvhpXXXXaGXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=èè¶"
                }, {
                    "name": "玛咖片",
                    "id": "6023",
                    "pic": "//img.alicdn.com/imgextra/i2/844537169/TB23_YChpXXXXXCXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50514008&q=çåç"
                }, {
                    "name": "美体",
                    "id": "6024",
                    "pic": "//img.alicdn.com/imgextra/i3/844537169/TB2ccHAhpXXXXaDXpXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=åè¥"
                }, {
                    "name": "保健礼盒",
                    "id": "6025",
                    "pic": "//img.alicdn.com/imgextra/i2/844537169/TB2ESHnhpXXXXcAXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=ç¤¼"
                }
            ]
        }, {
            "name": "一级类目",
            "id": "6010",
            "type": "cat",
            "list": [
                {
                    "name": "蜂蜜",
                    "id": "6011",
                    "pic": "//img.alicdn.com/imgextra/i4/844537169/TB2yG6qhpXXXXb2XXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id =725677994&cat=50518003&q=èè"
                }, {
                    "name": "阿胶",
                    "id": "6012",
                    "pic": "//img.alicdn.com/imgextra/i2/831867534/TB2LmnLhpXXXXcbXXXXXXXXXXXX-831867534.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=é¿è¶"
                }, {
                    "name": "枸杞",
                    "id": "6013",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB22xnYhpXXXXXFXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=æ¸æ"
                }, {
                    "name": "燕窝",
                    "id": "6014",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB2ferzhpXXXXakXpXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=ççª"
                }, {
                    "name": "灵芝",
                    "id": "6015",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB2uGPahpXXXXbDXpXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=çµè"
                }, {
                    "name": "西洋参",
                    "id": "6016",
                    "pic": "//img.alicdn.com/imgextra/i2/844537169/TB20tbkhpXXXXXfXpXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=è¥¿æ´å"
                }, {
                    "name": "维生素",
                    "id": "6017",
                    "pic": "//img.alicdn.com/imgextra/i2/844537169/TB225TxhpXXXXaFXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=ç»´çç´ "
                }, {
                    "name": "补钙",
                    "id": "6018",
                    "pic": "//img.alicdn.com/imgextra/i2/844537169/TB2sdDwhpXXXXbXXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=é"
                }, {
                    "name": "鱼油",
                    "id": "6019",
                    "pic": "//img.alicdn.com/imgextra/i3/844537169/TB2EG2fhpXXXXaGXpXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=é±¼æ²¹"
                }, {
                    "name": "蛋白粉",
                    "id": "6020",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB2_a2BhpXXXXX7XXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=èç½ç²"
                }, {
                    "name": "铁皮石斛",
                    "id": "6021",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB2U02EhpXXXXXeXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=éç®ç³æ"
                }, {
                    "name": "蜂胶",
                    "id": "6022",
                    "pic": "//img.alicdn.com/imgextra/i1/844537169/TB2vSnvhpXXXXaGXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=èè¶"
                }, {
                    "name": "玛咖片",
                    "id": "6023",
                    "pic": "//img.alicdn.com/imgextra/i2/844537169/TB23_YChpXXXXXCXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50514008&q=çåç"
                }, {
                    "name": "美体",
                    "id": "6024",
                    "pic": "//img.alicdn.com/imgextra/i3/844537169/TB2ccHAhpXXXXaDXpXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=åè¥"
                }, {
                    "name": "保健礼盒",
                    "id": "6025",
                    "pic": "//img.alicdn.com/imgextra/i2/844537169/TB2ESHnhpXXXXcAXXXXXXXXXXXX-844537169.jpg",
                    "url": "//s.m.tmall.com/chaoshi.htm?user_id=725677994&cat=50518003&q=ç¤¼"
                }
            ]
        }],
        goodsList:[]
    },
    getMsg: function (name, page) {
        var that = this;
        var url = "searchGoods.ashx"
        var params = new Object();
        params.Name = name;
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
                            goodsList: oData.Data[0].List
                        })
                    } else {
                        var data = that.data.goodsList.concat(oData.Data[0].List);
                        that.setData({
                            goodsList: data
                        })
                    }

                    if (oData.Data[0].page >= oData.Data[0].PageCount - 1) {
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
            }
        })
    },
    // 滚动切换标签样式
    switchTab: function (e) {
        this.setData({
            currentTab: e.detail.current
        });
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        var cur = e.target.dataset.current;
        if (this.data.currentTaB != cur) { 
            this.setData({
                currentTab: cur
            })
        }
    },
    onLoad: function (options) {
        this.tabBar = this.selectComponent("#tabBar");
        this.setData({
            name: options.txt
        })
        this.getMsg(this.data.name, 0)
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.isLoadData) {
            var page = this.data.curPage + 1
            this.getMsg(this.data.name, page);
        }
    },
})