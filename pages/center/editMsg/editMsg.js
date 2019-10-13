// pages/center/editMsg/editMsg.js
const util = require('../../../utils/util.js');
Page({
    data: {
        user: {},
        index: "",  // 星座索引
        constellation: ["水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座"],
        avator: ""
    },
    // 获取信息
    getMsg: function () {
        var that = this;
        var url = "getMember.ashx"
        util.POST({
            url: url,
            success: function (res) {
                var oData = res.data[0]
                if (oData.Status == 200) {
                    var index = that.data.constellation.indexOf(oData.Data[0].Constellation);
                    that.setData({
                        user: oData.Data[0],
                        index: index
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
    // 选择上传图片
    selectPhoto () {
        var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                upload(that, tempFilePaths);
            }
        })
    },
    // 上传图片
    upload (page, path) {
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        }),
        wx.uploadFile({
            url: "uploadImg.ashx",
            filePath: path[0],
            name: 'file',
            header: { "Content-Type": "multipart/form-data" },
            formData: {
                //和服务器约定的token, 一般也可以放在header中
                'session_token': wx.getStorageSync('session_token')
            },
            success: function (res) {
                console.log(res);
                if (res.statusCode != 200) {
                    wx.showModal({
                        title: '提示',
                        content: '上传失败',
                        showCancel: false
                    })
                    return;
                }
                var data = res.data
                page.setData({  //上传成功修改显示头像
                    src: path[0]
                })
            },
            fail: function (e) {
                console.log(e);
                wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                })
            },
            complete: function () {
                wx.hideToast();  //隐藏Toast
            }
        })
    },
    changeMsg:function (e) {
        var type = e.currentTarget.dataset.type;
        this.setData({
            ["user."+ type]: e.detail.value
        })
    },
    bindPickerChange: function (e) {   // 星座改变
        this.setData({
            index: e.detail.value
        })
    },
    saveMsg: function () {
        var that = this;
        var params = new Object();
        var url = "saveMember.ashx"
        params.File = this.data.avator;
        params.Sex = "1";
        params.LoginName = this.data.user.Name;
        params.Birthday = this.data.user.Birthday;
        params.Constellation = this.data.index == -1 ? "" : this.data.constellation[this.data.index];
        params.City = this.data.user.City;
        params.Occupation = this.data.user.Occupation;
        params.Introduce = this.data.user.Introduce
        params.GameLlist = "";
        console.log(params)
        util.POST({
            url: url,
            params: JSON.stringify(params),
            success: function (res) {
                var oData = res.data[0]
                wx.showToast({
                    icon: 'none',
                    title: oData.Msg,
                    duration: 1000
                })
                
                if (oData.Status == 200) {
                    setTimeout(() => {
                        wx.navigateBack({ // 成后返回上一页
                            delta: 1
                        })
                    }, 1e3)
                    
                }
            },
            fail: function () {
                wx.showToast({
                    title: "失败"
                })
            },
        })
    },
    onLoad: function () {
        this.tabBar = this.selectComponent("#tabBar");

        this.getMsg();
    },
    onShow: function () {  // 设置保存上一页的数据
        let pages = getCurrentPages();  
        let curPage = pages[pages.length - 1]  // 当前页面
        if (curPage.data.nickname) {
            this.setData({
                ['user.Name']: curPage.data.nickname
            })
        }
        if (curPage.data.sign) {
            this.setData({
                ['user.Introduce']: curPage.data.sign
            })
        }
        if (curPage.data.job) {
            this.setData({
                ['user.Occupation']: curPage.data.job
            })
        }
        if (curPage.data.city) {
            this.setData({
                ['user.City']: curPage.data.city
            })
        }
    },
})