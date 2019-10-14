<template>
	<view class="login-page">
		<view class="panel login-form">
			<view class="input-row row1">
				<input data-type="pass" bindinput="checkForm" type="password" maxlength="30" placeholder="请输入新的密码" />
			</view>
			<view class="flex-box input-row row2">
				<input class="flex-item input" data-type="code" bindinput="bindInput" type="number" maxlength="30" placeholder="请输入验证码" />
				<view data-disabled="{{isDisabled}}" class="sendcode" bindtap='sendCode'>
					<block wx:if="{{!codeButtonOn}}">
						获取验证码
					</block>
					<block wx:if="{{codeButtonOn}}">
						{{codeTime}}S后再发送
					</block>
				</view>
			</view>
		</view>
		<button type="button" class="btn login_btn" bindtap="change">保存</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				user: "",
				pass: "", // 新密码
				password: "", // 再次输入密码密码
				code: "",
				isDisabled: false, // 发送按钮禁止
				codeButtonOn: false,
				codeTime: 60,
			}
		},
		onLoad() {

		},
		methods: {
			bindInput: function(e) { // 输入框输入
				this.setData({
					[e.currentTarget.dataset.type]: e.detail.value
				})
			},
			checkForm: function(e) { // 验证手机号
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
			sendCode: function(e) { // 发送验证码
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
			change: function() {
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
			alert: function(txt) {
				wx.showModal({
					title: "温馨提示",
					content: txt,
					confirmColor: "#f79bb0"
				})
			},
		}
	}
</script>
<style>
	.input-row {
		padding: 20rpx 0 20rpx 135rpx;
		border-bottom: 1px solid #e9e9e9;
		color: #6c6c6c;
		font-size: 26rpx;
	}

	.row1 {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAsCAMAAACua0M1AAAAZlBMVEX///8AAADj4+MmJia/v790dHTw8PBpaWkXFxf8/PwfHx/v7+/g4OCzs7P29vbz8/Pp6emrq6sQEBCNjY2AgIBtbW3Z2dnCwsJmZmZDQ0M1NTUaGhoHBwejo6Oenp6SkpJPT08tLS3ajppYAAAAoElEQVQ4y+3OyQ6DIBSF4XMFKsgg4lCnTu//kiXpTmFhunDjv/2SkwNAd5L2faxCzLWBUoWXi8oX2Wps061cOFCX4aGwTz1DWcOzt0EqzphHsfYqo2uBggQySpdeeo5m+1uZvaWy7Kc8/eqYNlVXZ1VVVN2zaoioOa75ZWmTr6yM6hn1Gvt0T8zDCaJ5LLeNM5FwwDBRumlAzAiZMCkM8AVaEglwe6Q1AgAAAABJRU5ErkJggg==);
		background-size: 29rpx 44rpx;
		background-repeat: no-repeat;
		background-position: 34rpx 28rpx;
	}

	.row2 {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAsCAMAAAA+eDr6AAAAt1BMVEX///8AAAAUFBQGBgYSEhL39/f9/f0rKyv5+fns7Ozg4OAKCgq4uLhFRUUeHh4ODg7y8vKdnZ1kZGRISEgWFhbw8PDZ2dmqqqqampovLy/R0dGzs7OgoKCXl5eSkpKCgoJpaWlbW1tTU1NDQ0M7Ozs1NTUxMTElJSX29vbIyMjCwsKtra2np6eNjY3i4uLV1dXKysqkpKR8fHx3d3ccHBz09PTn5+fa2trMzMyIiIhwcHBKSkokJCSwp9PVAAABn0lEQVQ4y9XV53KCQBSG4fOxsouAYhB7bLEl9pae+7+usCsm4FLyN+8fZ/BxOTjOkbS6s1mXiqqdGMBOtVxkDgKogoGViRqbsyQPDwg7bxpphi99B2HCJXIFwhx/yZMD7fvjAAqt1Tt8LS73Hvf3lzH9mTAQVenxn8N7E0QZYuYTrolhkxI1hwLXSPnp6GBTSvZhNDUiVjIpN9NTzKCCSv+V2S9/YW3m7IpZG0CriClVt4rYnVRmxmyWqSud2YHnakpna4C5kaqYlMWe58rd3yoykrOVO6H70JQ6zQPjcSfVIyVi8GgB2JRwkxtlAwsaA/f06+baWXLYsXyuSeya1eV0UwW4o4YDvFFOXcBpEI3kcTnVgVH4smVyusxaANtS2BDwmlnKLgHDy9QdQJQz1t0c6FjRFvCAeeqaMuvxO/UYMK2lqE+A9ZI/VqFtkfIUQDt+pQ8gWCbVUxVA/+a5GcCOVuyGRwY4LaKUzy5WnFS89QWg+kRaZbWZxeaV8937Qu3q9G9pVYWMMciqq+y/BQUVGuQtR8v1heMI3+XJ698aihgtQDZYCAAAAABJRU5ErkJggg==);
		background-size: 38rpx 44rpx;
		background-repeat: no-repeat;
		background-position: 34rpx 28rpx;
	}

	.input-row:last-child {
		border: 0;
	}

	.input {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 34rpx;
	}

	.login-form {
		padding: 30rpx;
		margin-bottom: 100rpx;
	}

	.login_btn {
		width: 710rpx;
		height: 95rpx;
		margin: 0 auto;
		padding: 0 50rpx;
		line-height: 95rpx;
		font-size: 26rpx;
		color: #fff;
		background: #c7a769;
	}

	.bot {
		width: 600rpx;
		padding: 0 17rpx;
		font-size: 26rpx;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.sendcode {
		color: #c7a769;
		height: 80rpx;
		padding: 0 40rpx;
		line-height: 80rpx;
		border-left: 1px solid #e9e9e9;
		font-size: 34rpx;
	}
</style>
