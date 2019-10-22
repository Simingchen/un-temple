<template>
	<view class="login-page">
		<view class="panel login-form">
			<view class="input-row row1">
				<input v-model.trim="phone" maxlength="30" placeholder="请输入新的手机号码" />
			</view>
			<view class="flex-box input-row row2">
				<input class="flex-item input" v-model.trim="code" type="number" maxlength="30" placeholder="请输入验证码" />
				<view class="sendcode" @click='sendCode'>
					<block v-if="!codeButtonOn">
						获取验证码
					</block>
					<block v-if="codeButtonOn">
						{{codeTime}}S后再发送
					</block>
				</view>
			</view>
		</view>
		<button type="button" class="btn login_btn" @click="change">保存</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				phone: "",
				code: "",
				isDisabled: false, // 发送按钮禁止
				codeButtonOn: false,
				codeTime: 60,
			}
		},
		methods: {
			sendCode () { // 发送验证码
				if (this.phone == '') {
					this.alert("请输入手机号")
					return false;
				} else {
					if (!/^1\d{10}$/.test(this.phone)) {
						this.alert("请输入正确手机号")
					}
				}
				
				if (!this.isDisabled) {
					var that = this;
					that.isDisabled = false
					wx.showToast({
						title: '发送成功',
						duration: 1000
					})
					var time = that.codeTime

					var timer = setInterval(function() {
						time--;
						that.codeTime = time
						that.isDisabled = false
						that.codeButtonOn = true

						if (time <= 0) {
							clearInterval(timer);
							that.isDisabled = true
							that.codeButtonOn = false
						}
					}, 1E3)
				}
			},
			change: function() {
				var phone = this.phone;
				var password = this.password;
				var code = this.code;
				if (!phone) {
					this.alert("请输入新的手机号码")
					return false;
				}
				
				if (!code) {
					this.alert("请输入验证码")
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
					confirmColor: "#c40606"
				})
			},
		}
	}
</script>
<style lang="scss">
	page{
		background:#fbe5c3;
	}
	.input-row {
		padding: 20rpx 0 20rpx 135rpx;
		/* border-bottom: 1px solid #e9e9e9; */
		color: #6c6c6c;
		font-size: 26rpx;
	}

	.row1 {
		background-image: url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQCAwMDAgQDAwMEBAQEBQkGBQUFBQsICAYJDQsNDQ0LDAwOEBQRDg8TDwwMEhgSExUWFxcXDhEZGxkWGhQWFxb/2wBDAQQEBAUFBQoGBgoWDwwPFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhb/wgARCAAmAB0DAREAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAABwIGAAMEBf/EABoBAAIDAQEAAAAAAAAAAAAAAAQFAAEDBgL/2gAMAwEAAhADEAAAAGVL219KVaK9dfrOMtaP5+MsnAf5ItH8/GWTgPykB+gFqOPzp7uop6I3tW4FOHZOjPlv/8QANBAAAQMCBQEDCQkAAAAAAAAAAQIDBAURAAYHCBITMTd1EBQzQWFyssLSFRghIlRikZSj/9oACAEBAAE/ANAdKqVqJl2fmrNVWqj8l+e42Ay/x7LEqUSDckqx93PIH6quf3U/Rio7cckrp7yYlQrTL/A9JxUpKwlXqJHHGzaRMe0icYmSVvmHVH2Gis34oAQbD2XJxsv7n3fFX/k8jvol+7jZr3X1DxyR8KMbL+593xV/5PI76Jfu42a919Q8ckfCjGgmtcDIOWZVAqlGky0GYt9l2MtN/wA1gQoKxE3LUGVzEXKdcf6SCtfTCFcEj1mxxUN0FBMB4QstVEyCg9IPLQEcvbYk42UOF7SKU6vtXWH1fyhvFU2w5mNSfMHMNJVGLhLJf6iV8f3AIIxpHpPqRp6upKpdRytK+02A0vznrngRexFke3swvbFnJSyo16hf6/RjQTI72n+QE0KVNRLkLkLkPLaSQgKVYWTf8bWSMf/EACURAAEDAwIGAwAAAAAAAAAAAAEAAgMEBREhMxASFTFxgUFSYf/aAAgBAgEBPwCkpGztMkhPddNg/UbbFjQlW4kw4PwVbtj3xt20fJVu2PfG3bR8lUtaIWFjghc2Hs0o3RmNGlW3ZPlOtcmThwwqeknhzykarpcv2CpYDBHykr//xAAuEQABAgUCBAILAAAAAAAAAAABAAIDBAYREgXBITRy0RCBExYyUVJicZGhseH/2gAIAQMBAT8A1bV4shFbAl2gAAL1mnvc37f1MqacyGTWkfRVI1gnbtFrtB/aqXnR0jfwCqTnG9I3VS86Okb+AVSc43pG61bQnzsURWPA4W4p1LRm+1FaEylI+QyiC3mqmFp0D5RuodVy+AzYb+XdahrEhPBubXjHjwt3QqqU+B347rVp8T0z6VosLWX/2Q==);
		background-size: 29rpx 38rpx;
		background-repeat: no-repeat;
		background-position: 46rpx 28rpx;
	}

	.row2 {
		background-image: url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAmAB0DAREAAhEBAxEB/8QAGQABAQEAAwAAAAAAAAAAAAAACAcJBAUG/8QAGQEAAwEBAQAAAAAAAAAAAAAABQYHAwEE/9oADAMBAAIQAxAAAAB+qlbHS9R6j7gKcNI+V6NeON3RBFFGRjmDr+bv5qkcaHMh2DuNhJLsn8B/yGJHSRui7pZ5VlMjX1QG0VuMsx//xAA3EAACAAUCBQAGBwkAAAAAAAABAgMEBQYHCBEACRIhMRATFCNSwhUyQkRicYMiJTVBQ2R0sbL/2gAIAQEAAT8AyVz3rHpSTEhjDBFVnZxHZFjV2ow5eEpG46umF6wt+W68ah+YTqk1Jz4N35CjUymwY6xpSiW8zyktCdW3Vj0sXiMp7guzEHxxp65y+pbEslAt7JcnKX3TIICpEqcUwJ9VH9woPX+cRHP4uLO532BLjlXefxJd8pGhBetIPssVdzv4YxV/1xW/41Of5cT/AKPowNoCu3Lmmq8NTt03nJ2pQqFIu9Dj1aGRDqkWG3vBuO6J/TVgGLRSFA7HjHX3z9P5uIAt832oux5wUv6W/eLSAUx/Uet956sOQvX079O/bfbfiByqdPGom8bUzhpnyVBTFdTAe5Ka8y7TMp6pd2hwmbcq7kdLrEIMIksNwQo5lGtGgZbqknptwCYUhjSzSktLQqf+xBqUeECgcAeYMP6sP4u7/wA12x198/T+bjmP6PLl0s50qNRkqVEaz7knos5blQRPdw+ti7yjH7LwydgD9ZNjxjzP2YsVWjcVh4+v+fplIuqU9mrkjLRNkmE+RiAVLLsSpZSdj6OWryx6BWMQzeTNTFqRxM3G8CLQaVFcwostKIH2iuPIMUvuFPhUU/a7ZUxRj7NljTuN8nWxLVaj1GH0x5WYHgjw6MO6Op7q6kEHweNeXLDn9LU7LXfYl/S1Rtir1L2WQlamGSdlXbuEcohSIo+MdJ/DxoW5RuPsRvTsvZ1qMnddfCQ5qmUyBCJp0iSAyuQ6gx4g8gsAq/CSARx//8QAKxEAAQIEBAQGAwAAAAAAAAAAAQIDAAQFESEiMUEGEBJhEyNRwdHhMpGh/9oACAECAQE/AHuKGhcNtknubRN1aenDnVYegwESnEU4wLOZx31/cN8Syq9UH+fMH8jylaSt+SXMrV0pTpfeGt4y+Lm0vjbW0ChSc24h6XV5R1G4t6fekVioofUJdjBtOGG5HsIa3isU5cjMkgZFYg+0MzUyw2tDaiArAjlRqKgy5cmE4q0Hb7h9hmZZLbgumKpRTInrQq6ScL6xS6CywQ6/mVqBsPk8v//EADIRAAEBBQQHBgcAAAAAAAAAAAECAwQFESEABjFxBxASMkFRwRMjQmGBkSQzYoKSobH/2gAIAQMBAT8AcdFL0uSnp5SB9IJPuZWg1z4DBEnsWW0oiRUqpPPyAPkBaMaNoJEFFo7EsVHlVP4noRZ40XRZiZJboI+4dLMflJyGqK3td4dG2EMZILRosjaA8IOGZ4kcE1s+eH16W70Oh7KW1s0nhOVJyrKeNjf2MQZ2buUSZfFJ3DISMzQkChAxBG8KWuTdltD2aoi/1eWtTPFINZZnE+2b54fXpa5d42EehSUlXfMwAocaYKyP6NnuEQ5/eGTd4ZhS2Zmkngeo4yNJ11X1vw1ZREO0NXREwpWIKuQylZwf3yGPSXl2WUrTxH8PMHiLXTvyiPILFuzKWqRMkbpyrMHyrna9OkJ7iAW6OILNnUEneVzFN0ZEk6v/2Q==);
		background-size: 29rpx 38rpx;
		background-repeat: no-repeat;
		background-position: 46rpx 38rpx;
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
	}

	.bot {
		width: 600rpx;
		padding: 0 17rpx;
		font-size: 26rpx;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.sendcode {
		color: $color;
		height: 80rpx;
		padding: 0 40rpx;
		line-height: 80rpx;
		border: 1px solid #a0a0a0;
		font-size: 34rpx;
	}
</style>
