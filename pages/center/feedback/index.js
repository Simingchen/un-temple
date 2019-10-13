const util = require('../../../utils/util.js');
Page({
    data: {
        user: {}
    },
    onLoad: function(options) {

    },
    bindInput(e) { // 修改信息
        var type = e.currentTarget.dataset.type;
        this.setData({
            ['user.' + type]: e.detail.value
        })
    },
    saveMsg () {
        if (!this.data.user.mes) {
            wx.showToast({
                icon: "none",
                title: "请留下您的宝贵意见和建议，我们将努力改进"
            })
            return false;
        }
        if (!this.data.user.phone) {
            wx.showToast({
                icon: "none",
                title: "请留下你的手机号"
            })
            return false;
        }
        console.log()
        
        var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        if (!phoneReg.test(this.data.user.phone)) {
            wx.showToast({
                icon: "none",
                title: "请正确填写手机号码"
            })
            return false;
        }

        var that = this;
        var url = "getAddress.ashx"
        var params = new Object();
        params.RID = id;
        util.POST({
            url: url,
            params: JSON.stringify(params),
            success: function (res) {
                var oData = res.data[0]
                if (oData.Status == 200) {
                    var data = oData.Data[0];
                    that.setData({
                        user: data,
                        region: [data.Province, data.City, data.County]
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
    }
})