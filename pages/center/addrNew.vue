<template>
	<view>
		<view class="panel addr-con">
			<view class="line-item clearfix flex-box">
				<text class="lab">收货人</text>
				<input maxlength="10" v-model="user.Name" type="text" placeholder="请输入收货人姓名" />
			</view>
			<view class="line-item flex-box clearfix">
				<text class="lab">联系号码</text>
				<input maxlength="15" v-model="user.Mobile" type="number" placeholder="请输入联系号码" />
			</view>
			<view class="line-item flex-box clearfix">
				<text class="lab">所在城市</text>
				<picker mode="region" @change="bindRegionChange" v-model="region">
					<view class="picker">{{ region[0] }}，{{ region[1] }}，{{ region[2] }}</view>
				</picker>
			</view>
			<view class="line-item clearfix"><textarea class="textarea" maxlength="50" v-model="user.Address" placeholder="请填写详细地址" /></view>
		</view>
		<view class="line-item last-line" v-if="!addrId">
			<view class="flex-box" @click="setDefault">
				<text class="form-checkbox" :class="{ checked: user.isDefault }"></text>
				<text class="lab" :class="{ caa: user.isDefault }">设为默认</text>
			</view>
		</view>
		<view class="bot">
			<view class="hr22"></view>
			<button class="addNew" @click="addNewAddr">{{ btnTxt }}</button>
		</view>
	</view>
</template>
<script>
const util = require('@/utils/util.js');
export default {
	data() {
		return {
			btnTxt: '', // 按钮文本
			addrId: '', // 地址ID
			backPage: '', // 返回上一页地址
			isDefault: null, // 默认地址
			user: {
				isDefault: false,
				Mobile: '',
				Address: ''
			},
			region: ['广东省', '广州市', '海珠区']
		};
	},
	onLoad: function(options) {
		// 页面加载
		var title;
		var btnTxt;
		if (options.id) {
			this.getMsg(options.id);
			this.addrId = options.id;
			title = '编辑地址';
			btnTxt = '确认修改';
		} else {
			title = '添加地址';
			btnTxt = '确认添加';
		}
		if (options.back) {
			this.backPage = options.back;
		}
		wx.setNavigationBarTitle({
			// 设置标题
			title: title
		});
		// 设置按钮文字
		this.btnTxt = btnTxt;
	},
	methods: {
		getMsg: function(id) {
			var that = this;
			var url = 'getAddress.ashx';
			var params = {};
			params.RID = id;
			util.POST({
				url: url,
				params: JSON.stringify(params),
				success: function(res) {
					var oData = res.data[0];
					if (oData.Status == 200) {
						var data = oData.Data[0];
						that.setData({
							user: data,
							region: [data.Province, data.City, data.County]
						});
					} else {
						wx.showToast({
							icon: 'none',
							title: oData.Msg,
							duration: 1000
						});
					}
				}
			});
		},
		addNewAddr: function() {
			// 添加确认修改新地址
			var that = this;
			if (!this.user.Name) {
				this.alert('请输入收货人');
				return false;
			}

			if (!this.user.Mobile) {
				this.alert('请输入联系电话');
				return false;
			}

			if (!this.user.Address) {
				this.alert('请输入详细地址');
				return false;
			}

			var url = 'saveAddress.ashx';
			var params = {};
			params.Request = this.addrId ? 'Update' : 'Add';
			params.RAID = this.addrId ? this.addrId : '';
			params.Name = this.user.Name;
			params.Mobile = this.user.Mobile;
			params.Address = this.user.Address;
			params.Province = this.region[0];
			params.City = this.region[1];
			params.County = this.region[2];
			params.IsDefault = this.user.IsDefault ? false : true;
			console.log(params);
			util.POST({
				url: url,
				params: JSON.stringify(params),
				success: function(res) {
					var oData = res.data[0];

					if (oData.Status == 200) {
						var title = that.addrId ? '修改成功' : '添加成功';
						wx.showToast({
							title: title,
							icon: 'success',
							duration: 2000,
							success: function() {
								// 如果从地址列表过来返回去，防止历史记录过去不更新信息
								if (that.backPage == 'list') {
									wx.redirectTo({
										url: '/pages/center/addrList'
									});
									return false;
								}
								if (that.backPage == 'bargain') {
									wx.redirectTo({
										url: '/pages/bargain/list/index'
									});
									return false;
								}
								wx.navigateBack({
									// 成后返回上一页
									delta: 1
								});
							}
						});
					}
				}
			});
		},
		// 设置默认地址
		setDefault(e) {
			var that = this;
			// 添加地址可设默认地址
			if (!this.addrId) {
				that.user.isDefault = !that.user.isDefault;
				return false;
			}

			var url = 'saveAddressInDefault.ashx';
			var params = {};
			util.POST({
				url: url,
				params: JSON.stringify(params),
				success: function(res) {
					var oData = res.data[0];

					if (oData.Status == 200) {
						that.user.isDefault = !that.user.isDefault
					} else {
						wx.showToast({
							icon: 'none',
							title: oData.Msg,
							duration: 1000
						});
					}
				}
			});
		},
		alert: function(txt) {
			wx.showModal({
				title: '温馨提示',
				content: txt,
				confirmColor: '#c40606'
			});
		}
	}
};
</script>
<style lang="scss">
page {
	background: $bg;
}
.caa {
	color: #ff0000!important;
}
.addr-con {
	padding: 30rpx;
	background: #fff;
}
.lh100 {
	line-height: 100rpx;
}
.line-item {
	border-bottom: 1rpx solid #f4f4f4;
	padding-left: 35rpx;
	padding-right: 65rpx;
	color: #666;
	line-height: 100rpx;
	font-size: 32rpx;
}
.line-item:last-child {
	border: 0;
}
.line-item.arrow {
	position: relative;
}
.line-item.arrow:before {
	position: absolute;
	content: '';
	right: 33rpx;
	top: 45rpx;
	width: 15rpx;
	height: 15rpx;
	border-top: 3rpx solid #666;
	border-right: 3rpx solid #666;
	transform: rotate(45deg);
}
.line-item .lab {
	float: left;
	line-height: 100rpx;
	height: 100rpx;
	color: #000;
}
.picker {
	line-height: 100rpx;
}
.flex-box .lab {
	flex: 1;
}
.flex-box input {
	flex: 2;
	height: 100rpx;
	line-height: 100rpx;
}
.textarea {
	padding: 10rpx;
	padding-top: 30rpx;
	height: 150rpx;
	line-height: 32rpx;
}
.last-line {
	background: none;
	margin-top: 23rpx;
	border: 0;
	.lab{
		color:#999;
	}
}
.form-checkbox {
	border-radius: 100%;
	display: block;
	margin-top: 35rpx;
	margin-right: 15rpx;
	width: 30rpx;
	height: 30rpx;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAiCAMAAADmrkDzAAABJlBMVEUAAAC9vb2CgoKPj4+EhISFhYWJiYmYmJiHh4eSkpKUlJSjo6Ovr6+xsbG5ubmIiIiAgIB/f394eHiNjY2fn5+cnJy3t7ecnJyTk5OampqZmZmenp6kpKSnp6exsbG7u7uZmZmWlpadnZ2VlZWhoaGlpaWlpaWvr6+vr6+5ubm3t7eMjIyKioqPj499fX2Ojo6ampqhoaGioqKtra2rq6uqqqqpqamzs7O1tbW0tLS8vLy/v7+JiYl8fHx+fn6kpKSnp6eoqKitra2urq6qqqq0tLS0tLS2tra0tLS3t7e6urq5ubm4uLi3t7d9fX2pqamenp6bm5uUlJSRkZHNzc29vb2hoaGZmZmNjY16enp2dnZzc3PBwcG4uLizs7Ourq6kpKSTk5OoKc8yAAAATnRSTlMAK/76/v38+v77+uebjRf+/v79+/DvU/f39fLq19CzVPj39PTt3Nm6pmRB/v78+fbq493NycK9lYeDPBf++fXp3dS1q6uOdG5nYUFBQSrHFzPFAAABmUlEQVQ4y5WT13aCQBRFD0MR0AgI1iRqjInG9N57b9hSNfX/fyLqKA46PmQ/sA5w1p3bBgz7T1/VWu23+v0kgMdOfKG+qMVz8YA2L6cmMYgQMMypQobqtCMq09vwsUHc8TnmPTND5FkwzKjmGPzs6kurjKEpcnKLHq305KZkx8BhnEx0k5QsrgFhm+x2RCoSAp8SWUaLGzWBUayRLQDJ9zFw6HwU5HYQ1eb8F0SZ1iPvYYescXKcbtAyiuQDnwehYYNiTXZjLZTxU3sYjuB6HZ96QUUL08kUPYfY7E82W8Gr1jWrQSrmZJc5N/uKihimOu92LPeGxVafrKJc77U89962iOYmGPQXPKtezFzj5FJ3ff27s8u4dvtrcKzUlQJYisYzIInwcOaDAwtgxloPKYRRlJREe0QkhVFMuJ3OrIzcjxihGTzKUglcEtY5FRcRGzyiEW88WxHuri8FmYws5Qp+MqnDPBjOZNPx3bmgJJ3Cx23CMKJpepZQcERFT2OQbU16W9ST8YCuvanJdfDYT+ezgRbO+h7+wx8OfihLtGYjYgAAAABJRU5ErkJggg==);
	background-repeat: no-repeat;
	background-size: 100%;
	&.checked {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAq1BMVEX75cP/AAD9BAT5DAv64L/wuqH64sHqOTb2ExPnVU/oRUD3Dw/tLivpkYDxHx732LnvtJ3sMS/uKSfzGhn427v31bboSkXvJiT7BwfvsJrrnovsNDH20bTurZfpjH3nUkvwIyH6CQnzyK3xvqTnf3LmY1rnXFXywqjsoo/53r3tqZTsppHqmIbohXfma2HmZ13nTkjpQTz1zrDzxarqlIPnd2vnc2fmb2TmYFjS+ib6AAACbElEQVQ4y3WUh7KqMBRFsxPpTUCQohQvYO/t/f+XvSjKFS/sGSZkWOTUHPKp2eJ2NDUKIJftKhGWpFMzIx1z6i3mSrewAxsZvgnAjVWlLKuDNGaApt/n39z8ngGy/c8I5yfPmsyE6KaaFMxfi5+Y+KMEYPZ1OGi5cnABe+N9cMIxgFz+kC9NEgfIkl9SUBnM7UT86/hUBUxj+bah5HAMi3RJOAB69PrtpiEzSI8EFfBrp6Ix5O2A9GmoU+3++DxKwaoJ6ZV4yeDwdIiLMXS+9mukULbziMWXfQ83LYaPZcOPEojgwFl1c5Etlye+egoPgmxlKFYPB9TOF1rgkzRgRRc2iGIE0vr5vtCREf5suriFzbnw1TE+NOIinnbFYYNK4at2XgVGZKh13oV/5azhVjYghe9kiDdKCYN/fu6MnKmvs5eJDso3jQqKBzivjemAtHhmeJshT39IG5RxFOpdGFPEK/FZM6bMyIeu3LQJe/XyZChxMhyENudOn5xVIic2zAtpSJ6SIqZ5myPnR3qUnF1/g5VAZUoPZ9LSWodJklYJ1xIAVSBtbWWqPptiTRqtVEf9LoClQCuIVbXbbCL8aeJoDIf326NxeQ36tawCtp/UV6G0+jlxk8EJB6/LlYi9IM+utntaHF01jC+91/VA321DzkoAfTPq5lIKJ2p2R4ax4XWMlKEPuEYT6mB4DODu/sxC6xID5u+Q4qSg5NCka2ueeUbqgvvktQfpzgRkaWdMz5ZIlichKg4mRe4vxG8zieoC1I39ar8v02M9mneNjdbYVE0NjQI3vg9Jpwbeei+ZrsyYJrtOasw+M/YfyYAwhLHJ6WEAAAAASUVORK5CYII=);
	}
}

.addNew {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 83rpx;
	text-align: center;
	line-height: 83rpx;
	color: #fff;
	background: $color;
	font-size: 26rpx;
	z-index: 5;
	border: 0;
	margin: 0 auto;
	border-radius: 0;
}

.hr22 {
	line-height: 83rpx;
}
</style>
