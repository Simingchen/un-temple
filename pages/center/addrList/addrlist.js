var mockData = '{"Result":1,"Shouaddrlist":[{"Id":11668,"Shouman":"陈生","Mobile":"13926012343","Addr":"石岗海边街31号","Provid":19,"Prov":"广东","Xianid":1601,"Xian":"广州市","TownId":50283,"Town":"黄埔区","VillageId":51887,"Village":"城区","Cardid":"","Postcode":"","Tel":"","Isdefault":false},{"Id":11706,"Shouman":"林先银","Mobile":"13799192995","Addr":"城关镇毓秀花园3号楼404单元","Provid":350000,"Prov":"福建省","Xianid":350400,"Xian":"三明市","TownId":350426,"Town":"尤溪县","VillageId":0,"Village":"","Cardid":"","Postcode":"365100","Tel":"","Isdefault":false},{"Id":11837,"Shouman":"Hdjs","Mobile":"13926012343","Addr":"Bxjsbd","Provid":520000,"Prov":"贵州省","Xianid":520100,"Xian":"贵阳市","TownId":520102,"Town":"南明区","VillageId":0,"Village":"","Cardid":"","Postcode":"","Tel":"","Isdefault":false},{"Id":11838,"Shouman":"Hx","Mobile":"13926012343","Addr":"Shshxncjsadf sdf是电饭锅电饭锅对方过后对方过后对方过后规划局Sh","Provid":31,"Prov":"新疆","Xianid":53090,"Xian":"铁门关市","TownId":53108,"Town":"铁门关市","VillageId":0,"Village":"","Cardid":"","Postcode":"","Tel":"","Isdefault":false},{"Id":23178,"Shouman":"hdjshs","Mobile":"13926012343","Addr":"11111","Provid":19,"Prov":"广东","Xianid":1601,"Xian":"广州市","TownId":50284,"Town":"增城区","VillageId":0,"Village":"","Cardid":"","Postcode":"","Tel":"","Isdefault":false},{"Id":23673,"Shouman":"陈先生","Mobile":"13926012343","Addr":"1111111111","Provid":19,"Prov":"广东","Xianid":1634,"Xian":"梅州市","TownId":1635,"Town":"兴宁市","VillageId":8520,"Village":"罗岗镇","Cardid":"","Postcode":"","Tel":"","Isdefault":false}]}'
mockData = JSON.parse(mockData)
const util = require('../../../utils/util.js');
Page({
    data: {
        isEmpty: "",
        items: [],           // 地址数据
        isAddNew: false,   // 是否显示添加按钮
        addrNum: 7,   // 地址总数大于不能添加新地址
    },
    // 获取信息
    getMsg: function () {
        this.setData({
            items: mockData.Shouaddrlist
        })
        var that = this;
        var url = "getAddressList.ashx"
        var params = new Object();
        util.POST({
            url: url,
            params: JSON.stringify(params),
            success: function (res) {
                var oData = res.data[0]

                if (oData.Status == 200) {
                    that.setData({
                        items: oData.Data
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
    // 设置默认地址
    setDefault(e) {
        var that = this;
        var url = "saveAddressInDefault.ashx"
        var params = new Object();
        var id = e.currentTarget.dataset.id;
        params.AID = id
        util.POST({
            url: url,
            params: JSON.stringify(params),
            success: function (res) {
                var oData = res.data[0]

                if (oData.Status == 200) {
                    that.data.items.forEach((item1, index) => {
                        var isDefault = 'items[' + index + '].isDefault'
                        if (id == item1.ID) {
                            that.setData({
                                [isDefault]: 1
                            })
                        } else {
                            that.setData({
                                [isDefault]: 0
                            })
                        }
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
    // 删除按钮
    delBtn: function (e) {
        var that = this
        var id = e.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content:"确定删除该地址吗？",
            confirmColor: "#f79bb0",
            success: function (res) {
                if (res.confirm) {
                    var that = this;
                    var url = "delReceiverAddress.ashx"
                    var params = new Object();
                    params.RID = id;
                    util.POST({
                        url: url,
                        params: JSON.stringify(params),
                        success: function (res) {
                            var oData = res.data[0]

                            if (oData.Status == 200) {
                                that.data.items.forEach((item, index) => {  // 成功后删除
                                    if (id == item.ID) {
                                        that.data.items.splice(index, 1);

                                        that.setData({
                                            items: that.data.items
                                        })
                                    }
                                })

                                that.verifyLength()
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
    // 检验列表长度
    verifyLength: function () {
         var isAdd = this.data.items.length >= this.data.addrNum;
         var isEmpty = this.data.items.length < 1;
         this.setData({
             isAddNew: isAdd,
             isEmpty: isEmpty,
         })
        
    },
    addNewAddr: function (e) {  // 添加新地址还是编辑地址
        var id = e.currentTarget.dataset.id;
        var url;
        if (id) {
            url = "/pages/center/addrNew/addNew?back=list&id=" + id
        } else {
            url = "/pages/center/addrNew/addNew?back=list"
        }

        wx.navigateTo({
            url: url
        })
    },
    onLoad: function (options) {
        this.getMsg()
    },
})