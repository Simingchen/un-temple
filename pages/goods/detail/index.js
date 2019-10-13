const util = require('../../../utils/util.js');
Page({
    data: {
        Quantity: 1,
        isCollect: false,
        isShowPopup: false,
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
    // 切换弹窗
    togglePopup() {
        this.setData({
            isShowPopup: !this.data.isShowPopup
        })
    },
    // 收藏
    collect() {
        this.setData({
            isCollect: !this.data.isCollect
        })
    },
    // 加减商品数量
    changeQuantity: function (e) {
        console.log("asfd")
        var that = this;
        var type = e.currentTarget.dataset.type;

        var nowNum = this.data.Quantity;

        if (type > 0) {
            nowNum++;
        } else {
            nowNum > 1 ? nowNum-- : nowNum = 1;
        }

        that.setData({
            ['Quantity']: nowNum
        })
        // var url = "saveQuantityForCart.ashx";
        // var params = {};
        // params.OID = goodsId;
        // params.Quantity = nowNum;
        // util.POST({
        //     url: url,
        //     params: JSON.stringify(params),
        //     success: function (res) {
        //         var oData = res.data[0]
        //         if (oData.Status == 200) {
        //             that.setData({
        //                 [Quantity]: nowNum
        //             })
        //         }
        //     }
        // })
    },
    onLoad: function (options) {
    },
});

