<template>
	<view class="page login-page">
		<view class="login-form">
			<view>
				<input class="input-row" :value="user" type="number" maxlength="30" placeholder="输入手机号" />
			</view>
			<view class="flex-box input-row">
				<input class="flex-item input" type="number" maxlength="30" placeholder="验证码" />
				<view class="sendcode" @click='sendCode(isDisabled)'>
					<block v-if="!codeButtonOn">
						获取验证码
					</block>
					<block v-if="codeButtonOn">
						{{codeTime}}S后再发送
					</block>
				</view>
			</view>
			<view>
				<input class="input-row" type="password" maxlength="20" placeholder="密码8-20位,必须含数字加英文" />
			</view>
			<button type="button" class="btn login_btn" @click="signUp">注册</button>
		</view>
	</view>
</template>
<script>
	const util = require('@/utils/util.js');
	export default {
		data() {
			return {
				user: "", //用户名
				password: "", //密码
				code: "",
				device: "", // 使用设备
				isDisabled: false, // 发送按钮禁止
				codeButtonOn: false,
				codeTime: 60,
			}
		},
		onLoad() {

		},
		methods: {
			checkForm: function() { // 验证手机号
				var type = e.currentTarget.dataset.type;
				if (type == "user") {
					var reg = /^1\d{10}$/;
					var iso = reg.test(e.detail.value);
					if (iso) {
						this.isDisabled = true
					} else {
						this.isDisabled = false
					}
				}
			},
			sendCode: function(e) { // 发送验证码
				var that = this;
				if (!e.currentTarget.dataset.disabled) {
					this.alert("请输入正确手机号")
					return false;
				}
				var type = e.currentTarget.dataset.type;
				if (e.currentTarget.dataset.disabled) {
					var data = 'isDisabled'
					this.isDisabled = false

					var params = {};
					var url = "getVerificationCode.ashx"
					params.Mobile = that.data.user;
					util.POST({
						url: url,
						params: JSON.stringify(params),
						success: function(res) {
							var oData = res.data[0].Data
						},
						fail: function() {
							uni.showToast({
								title: "失败"
							})
						},
					})

					uni.showToast({
						title: '发送成功',
						duration: 1000
					})
					var time = that.data.codeTime

					var timer = setInterval(function() {
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
			signUp: function() {
				console.log("sdf")
				var that = this
				var user = this.data.user;
				var password = this.data.password;
				var code = this.data.code;
				if (!user) {
					this.alert("请输入手机号")
					return false;
				}
				if (!code) {
					this.alert("请输入验证码")
					return false;
				}
				if (!password) {
					this.alert("请输入密码")
					return false;
				}
				if (password.length < 8) {
					this.alert("密码长度太短了哦")
					return false;
				}

				var params = {};
				var url = "register.ashx"
				params.Mobile = user;
				params.Password = password;
				params.DeviceType = that.data.device;
				params.Code = code;

				uni.showLoading({
					title: "提交中..."
				})

				util.POST({
					url: url,
					params: JSON.stringify(params),
					success: function(res) {
						var oData = res.data[0]
						uni.showToast({
							icon: 'none',
							title: oData.Msg
						})

						if (oData.Status == 200) {
							uni.redirectTo({
								url: '/pages/center/login/login'
							})
						}
						uni.hideLoading({})
					},
					fail: function() {
						uni.showToast({
							icon: 'none',
							title: "失败"
						})
					},
				})
			},
			alert: function(txt) {
				uni.showModal({
					title: "温馨提示",
					content: txt,
					confirmColor: "#c40606"
				})
			},
		}
	}
</script>
<style lang="scss">
	.input-row {
		width: 600rpx;
		height: 75rpx;
		margin: 0 auto;
		border: 1px solid $color;
		color: #6c6c6c;
		border-radius: 75rpx;
		padding: 0 50rpx;
		line-height: 75rpx;
		margin-bottom: 45rpx;
		font-size: 26rpx;
		box-sizing: border-box;
	}

	.input {
		height: 75rpx;
		line-height: 75rpx;
	}

	.login-form {
		padding-top: 85rpx;
	}

	.login_btn {
		width: 600rpx;
		height: 75rpx;
		margin: 0 auto;
		border: 1px solid $color;
		border-radius: 75rpx;
		padding: 0 50rpx;
		line-height: 75rpx;
		margin-bottom: 45rpx;
		font-size: 26rpx;
		color: #fff;
	}

	.bot {
		width: 600rpx;
		padding: 0 17rpx;
		font-size: 26rpx;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.sign {
		color: $color;
	}

	.flex-box {
		display: flex;
	}

	.flex-item {
		flex: 1;
	}

	.sendcode {
		color: $color;
	}
</style>
