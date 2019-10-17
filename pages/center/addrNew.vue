<template>
	<view>
		<view class="panel addr-con">
			<view class="line-item clearfix flex-box">
				<text class="lab">收货人</text>
				<input maxlength="10" :value="user.Name" type="text" placeholder="请输入收货人姓名" />
			</view>
			<view class="line-item flex-box clearfix">
				<text class="lab">联系号码</text>
				<input maxlength="15" :value="user.Mobile" type="number" placeholder="请输入联系号码" />
			</view>
			<view class="line-item flex-box clearfix">
				<text class="lab">所在城市</text>
				<picker mode="region" @change="bindRegionChange" :value="region">
					<view class="picker">{{ region[0] }}，{{ region[1] }}，{{ region[2] }}</view>
				</picker>
			</view>
			<view class="line-item clearfix"><textarea class="textarea" maxlength="50" :value="user.Address" placeholder="请填写详细地址" /></view>
		</view>
		<view class="line-item flex-box clearfix last-line" v-if="!addrId">
			<text class="form-checkbox" :class="{ checked: user.isDefault }" @click="setDefault"></text>
			<text class="lab">设为默认地址</text>
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
		this.btnTxt =  btnTxt
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
						that.setData({
							['user.isDefault']: !that.user.isDefault
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
	margin-top: 23rpx;
}
.form-checkbox {
	border-radius: 100%;
	display: block;
	margin-top: 35rpx;
	margin-right: 15rpx;
	width: 30rpx;
	height: 30rpx;
	background-image: url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wgARCAAdAB0DAREAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAABgcABQMECf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAOkxDGXAMF0AxpB4C40xchkK0IBjH//EAC8QAAICAQIFAgMIAwAAAAAAAAECAwQFBhEABxIhMVFhFUFCCBMUFiIyYnFDgpL/2gAIAQEAAT8Ay2WzOezM+ldK2hTWmFOUyhQOa5YbrDEp7NKV2Yk7hAR2JI4Tldopx15XEnMTn99jJzPakY+u7kgf0oA4m0EcMhtaByc2Hsx9xUkleWjP/F4mJ6N/HVH0ke/g6X1EmoqEkstRqd6nKat6m53avOvld/qUghlYeVIPGlc0NPcqvznJj7N+a1HLmLUVcbyyvM5c/wDIIHsqcYfmHpLM6SbWlfLRxYyJC07ynZoGHlHHybcgbDzuNt9xvpTJax5s6rr6vjtXcHo/EzE0YEYpJknB2LSeqevkfSO/URzm1pkOWup4Mphd1fO1FWwANwWgZgrH3Il2/wBRxoKZcObugrZ6LOIleSoD/noSOWidfULuYz6FPccZf7PWm8nqr4tBfnp4azILF7Dw7rDPMu/SQQf0judxt67Eb9q9evTrx1KsEcMEKBI40UKqKOwAA7ADifTGI5r5q9m8gGkxFHooY2RPE7IXM8q+qliEB+f3ZPGodL0NRpDJLNPUvU2L071Vgk9dj2PSSCCD4KkFSPI41nzm1Py0yHwXKVKGdcbAWFjaoxH8lDOCf6240xPmua2IGQzeW/A4iQ9MmNoRmNpx81lnLFip8EIE34qVa1KtFTpwRwQQII4441CqijsAAPA4/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwAH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwAH/9k=);
	background-repeat: no-repeat;
	background-size: 100%;
}

.form-checkbox.checked {
	background-image: url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAICAgICAQICAgIDAgIDAwYEAwMDAwcFBQQGCAcJCAgHCAgJCg0LCQoMCggICw8LDA0ODg8OCQsQERAOEQ0ODg7/2wBDAQIDAwMDAwcEBAcOCQgJDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg7/wgARCAAdAB0DAREAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAABgcAAwUJ/8QAGwEAAgIDAQAAAAAAAAAAAAAAAwYCBQABBwT/2gAMAwEAAhADEAAAAO4QmObyrCbsqsOgwkUqlaib87XsZpU0MgwOo3O1OJ6PyKqVB0YrlRNgyP8A/8QALhAAAgIBAgUCBAYDAAAAAAAAAQIDBAUGEQAHEiExQVETFWFxCBYiQlJiMkOS/9oACAEBAAE/AMnk8tmdVWdN6bsCgtUL82yxQOaxYbrDEp7GUqQxJ3CAjsSQOE5c6SdOrJY05+yf87OWne1Ix993JA+ygDiXRZxSG1ovIS4G4ncUpJnmoT/1eJiejf8AlH0kfXwdO5xM9hZZJKzY/JVZjXyFKQhmrzL5Xf8AcCCGVh5Ug8abyy4P8N/5selYyc9iKTK24qq7yytM5c/8ggfRU4xWutM5Xlm2rYMlHDh44y1h5js1dh5Rx6N4G3ruNt9xxpq/qrmXzJq6pjs29OaCxs5NCujlJMmwOxZ/dffyP2jv1Ec2NWXuX/MKtksR2fM01W0oG4LQMwDfciQD7KONFyri3yOi7R+FbxcrvTDf76cjlonX3C7/AAz7FPqN8pyNwGQ5kHJxXZ6Gn55RPkMHDusNiVd+kgg/pHc7jb1OxG/aCCCrRirVoUr14kCRRRqFRFHYAAeBtxJp3GcytW5TL3lMuBp9NLFSp4nZC5nlX3UswQEefhk8ZzTlLPRVpJJZqGSqsXpZCo/RPWY9j0kgggjsVYFT6jjVnNfUPL/N/KsjWpalcbBbKRtUYj+w6nBP22H0407NluZOmhdzGS+XYJz0yYvHRmJpx/GScsWKn1CBN+K8EFShDVqwpXrQoEiijUKqKOwAA8ADj//EAB4RAQACAQQDAAAAAAAAAAAAAAEAAhEDEiEiMUFS/9oACAECAQE/APLgmys2/MHMr1pmFhMyra7n1Lu1lOOsdMWHEwX5iDG7WC2IT//EAC8RAAIAAwYFAgUFAAAAAAAAAAECAwQRAAUhMUFhBhIUUXETkRUiMoGhQlJygrH/2gAIAQMBAT8Al5eWlJZZybHNzV5Ey5qYFmOYUHCgxY2+PXoMIL+mvZAFH4z+9TZL2EyeS8UERT+oABxuGGfhqi0/JGTjAA86MKq37l77HQjQgi0/LdZf/QhwgUiGCcgFFPyR9ybTFzXjK3j0DJWIThTXcbf5rafgXbw9d7SRVYs1EHzHMIOw37a6nQHhi7IN+SDQY+UJsP70qPda+SbXsvUhLxTFYgAbZwKMD5+obG0txjOwLv8ARZQ0VRRYhzUHPyd6+bO7xXLuak4knM2SfmOHpVIEI0ivVnHYGnIp3oCT/K0lPxZIkABkfBlbFT53GhFCLXXwxIX5A6iCzQh2wf2NFPvW08srcEf05dOaKMnY1puq0AruS1nd4jl3NScSTqbf/9k=);
}
.form-checkbox.checked {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAaVBMVEXHp2n////69vDr4MnNsXnKq3DZw5nezKf9/PrgzqvMrnX28efSuYf07uLgz63+/fzz7eDs4szaxZzYwpbVvY318OXo3MPo2sDcyKHWvo/JqW38+fXTuYjx6dnt4s7i07TRt4X28eju5dPzA5RmAAABDUlEQVQoz43T626EIBAF4DkgeAHvWte63V7e/yE7ik7MLjY9f0z4YhhghiBRurLzbCutIBEuO5LY5oldaugUk7oT1487PcW32cH1W0IvSaZs5wdrxNvA7k7ReLdxShdJVy7NFZuSuaPLdCBFkbxX6sYfRh1Rky8Y+ctYxWpSyLb1nOyr3lg/14IZ57BZnxeiC+qgNOxcKGgT1Cq+5YJ2toFLIKz1I6CPW+6P0nrHzqtDKbqVpveTdlzPVPhvVqmCUUlFQL320U8iyggrp13A+fgiiQWhMbKTAprT65omPKjcpZJ/5UHhvLxEUpzUjxujjTeTRuBs+qsV2VsfbeTrMRj/PUQygrkdhj4/j+Av7BAKRdl10DUAAAAASUVORK5CYII=);
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
