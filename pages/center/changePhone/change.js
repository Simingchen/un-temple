// pages/center/login/login.js
Page({
    data: {
        user: "",        
        pass: "",        // 新密码
        password: "",    // 再次输入密码密码
        code: "",
        isDisabled: false,   // 发送按钮禁止
        codeButtonOn: false,
        codeTime: 60,
    },
    bindInput: function (e) {   // 输入框输入
        this.setData({
            [e.currentTarget.dataset.type]: e.detail.value
        })
    },
    checkForm: function (e) { // 验证手机号
        this.setData({
            [e.currentTarget.dataset.type]: e.detail.value
        })

        var type = e.currentTarget.dataset.type;
        if (type == "user") {
            var reg = /^1\d{10}$/;
            var iso = reg.test(e.detail.value);
            if (iso) {
                this.setData({
                    ['isDisabled']: true
                })
            } else {
                this.setData({
                    ['isDisabled']: false
                })
            }
        }
    },
    sendCode: function (e) {    // 发送验证码
        if (!e.currentTarget.dataset.disabled) {
            this.alert("请输入正确手机号")
            return false;
        }
        var type = e.currentTarget.dataset.type;
        if (e.currentTarget.dataset.disabled) {
            var that = this;
            var data = 'isDisabled'
            that.setData({
                ['isDisabled']: false
            })
            wx.showToast({
                title: '发送成功',
                duration: 1000
            })
            var time = that.data.codeTime

            var timer = setInterval(function () {
                time--;
                that.setData({
                    ['codeTime']: time
                })
                that.setData({
                    ['isDisabled']: false
                })
                that.setData({
                    ['codeButtonOn']: 1
                })

                if (time <= 0) {
                    clearInterval(timer);
                    that.setData({
                        ['isDisabled']: true
                    })
                    that.setData({
                        ['codeButtonOn']: 0
                    })
                }
            }, 1E3)
        }
    },
    change: function () {
        var user = this.data.user;
        var password = this.data.password;
        var code = this.data.code;
        if (!user) {
            this.alert("请输入新的密码")
            return false;
        }
        if (!password) {
            this.alert("请再次输入新的密码")
            return false;
        }
        if (!code) {
            this.alert("请输入验证码")
            return false;
        }
        
        if (password.length < 8) {
            this.alert("密码长度太短了哦")
            return false;
        }

        // 登录
        wx.showLoading({
            title: "修改成功"
        })
    },
    alert: function (txt) {
        wx.showModal({
            title: "温馨提示",
            content: txt,
            confirmColor: "#f79bb0"
        })
    },
    onLoad: function () {
    }
})