<template>
	<view class="page login-page">
		<view class="login-form">
			<view><input class="input-row" :value="user" type="number" maxlength="30" placeholder="输入手机号" /></view>
			<view class="flex-box input-row">
				<input class="flex-item input" :value="code" type="number" maxlength="30" placeholder="验证码" />
				<view class="sendcode" @click="sendCode(isDisabled)">
					<block v-if="!codeButtonOn">获取验证码</block>
					<block v-if="codeButtonOn">{{ codeTime }}S后再发送</block>
				</view>
			</view>
			<button type="button" class="btn login_btn" @click="next">下一步</button>
		</view>
	</view>
</template>
<script>
const util = require('@/utils/util.js');
export default {
	data() {
		return {
			user: '', //用户名
			password: '', //密码
			code: '',
			isDisabled: false, // 发送按钮禁止
			codeButtonOn: false,
			codeTime: 60
		};
	},
	methods: {
			// 发送验证码
		sendCode: function(e) {
			if (!e.currentTarget.dataset.disabled) {
				this.alert('请输入正确手机号');
				return false;
			}
			var type = e.currentTarget.dataset.type;
			if (e.currentTarget.dataset.disabled) {
				var that = this;
				that.setData({
					['isDisabled']: false
				});

				var params = {};
				var url = 'getVerificationCodeForForgetPwd.ashx';
				params.Mobile = that.data.user;
				util.POST({
					url: url,
					params: JSON.stringify(params),
					success: function(res) {
						var oData = res.data[0];
						uni.showToast({
							title: '发送成功',
							duration: 1000
						});

						if (oData.Status == 201) {
							uni.showToast({
								icon: 'none',
								title: oData.Msg,
								duration: 1000
							});
							that.setData({
								['isDisabled']: true
							});
						}

						if (oData.Status == 200) {
							var time = that.data.codeTime;

							var timer = setInterval(function() {
								time--;
								that.setData({
									['codeTime']: time
								});
								that.setData({
									['isDisabled']: false
								});
								that.setData({
									['codeButtonOn']: 1
								});

								if (time <= 0) {
									clearInterval(timer);
									that.setData({
										['isDisabled']: true
									});
									that.setData({
										['codeButtonOn']: 0
									});
								}
							}, 1e3);
						}
					},
					fail: function() {
						uni.showToast({
							icon: 'none',
							title: '失败'
						});
					}
				});
			}
		},
		next: function() {
			var user = this.data.user;
			var password = this.data.password;
			var code = this.data.code;
			if (!user) {
				this.alert('请输入手机号');
				return false;
			}
			if (!code) {
				this.alert('请输入验证码');
				return false;
			}

			// 去修改密码
			uni.navigateTo({
				url: '/pages/center/changePass'
			});
		},
		alert: function(txt) {
			uni.showModal({
				title: '温馨提示',
				content: txt,
				confirmColor: '#c40606'
			});
		}
	}
};
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
.sendcode {
	color: $color;
}
</style>
