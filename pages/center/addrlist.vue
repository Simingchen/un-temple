<template>
	<view>
		<view class="empty" v-if="isEmpty">
			<view class="txt">当前的地址簿为空~ T.T</view>
			<view class="subTxt">快去添加您的地址簿吧</view>
			<view class="btn toActive" :class="{ disabled: isAddNew }" @click="addNewAddr()">添加新地址</view>
		</view>
		<block v-if="!isEmpty">
			<view class="list-con">
				<view class="panel list-item clearfix" :class="{default: item.Isdefault}" v-for="(item, index) in items" :key="index">
					<view class="receiver-box">
						<view>
							{{ item.Shouman }}
							<text class="ml10">{{ item.Mobile }}</text>
						</view>
					</view>
					<view class="addr-detail">{{ item.Addr }}</view>
					<view class="edit-line clearfix">
						<view class="fl" v-if="item.Isdefault == 1">
							<text class="form-checkbox checked"></text>
							<text class="caa">默认地址</text>
						</view>
						<view class="fl" v-if="item.Isdefault == 0" @click="setDefault(item.ID)">
							<text class="form-checkbox"></text>
							<text>设为默认</text>
						</view>
						<view class="fr edit-box clearfix">
							<view class="fl edit" @click="addNewAddr(item.ID)">编辑</view>
							<view class="fr delete" @click="delBtn(item.ID)">删除</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="p10">
                已保存了<b class="c58">{{items.length}}</b>条地址，还能保存<b class="c58">{{7-items.length}}</b>条地址
            </view> -->
			<view class="bot">
				<view class="hr22"></view>
				<button class="addNew" @click="addNewAddr" v-if="!isAddNew">添加新地址</button>
			</view>
		</block>
	</view>
</template>
<script>
var mockData =
	'{"Result":1,"Shouaddrlist":[{"Id":11668,"Shouman":"陈生","Mobile":"13926012343","Isdefault": 1,"Addr":"石岗海边街31号","Provid":19,"Prov":"广东","Xianid":1601,"Xian":"广州市","TownId":50283,"Town":"黄埔区","VillageId":51887,"Village":"城区","Cardid":"","Postcode":"","Tel":"","Isdefault":false},{"Id":11706,"Shouman":"林先银","Mobile":"13799192995","Addr":"城关镇毓秀花园3号楼404单元","Provid":350000,"Prov":"福建省","Xianid":350400,"Xian":"三明市","TownId":350426,"Town":"尤溪县","VillageId":0,"Village":"","Cardid":"","Postcode":"365100","Tel":"","Isdefault":false},{"Id":11837,"Shouman":"Hdjs","Mobile":"13926012343","Addr":"Bxjsbd","Provid":520000,"Prov":"贵州省","Xianid":520100,"Xian":"贵阳市","TownId":520102,"Town":"南明区","VillageId":0,"Village":"","Cardid":"","Postcode":"","Tel":"","Isdefault":1},{"Id":11838,"Shouman":"Hx","Mobile":"13926012343","Addr":"Shshxncjsadf sdf是电饭锅电饭锅对方过后对方过后对方过后规划局Sh","Provid":31,"Prov":"新疆","Xianid":53090,"Xian":"铁门关市","TownId":53108,"Town":"铁门关市","VillageId":0,"Village":"","Cardid":"","Postcode":"","Tel":"","Isdefault":false},{"Id":23178,"Shouman":"hdjshs","Mobile":"13926012343","Addr":"11111","Provid":19,"Prov":"广东","Xianid":1601,"Xian":"广州市","TownId":50284,"Town":"增城区","VillageId":0,"Village":"","Cardid":"","Postcode":"","Tel":"","Isdefault":false},{"Id":23673,"Shouman":"陈先生","Mobile":"13926012343","Addr":"1111111111","Provid":19,"Prov":"广东","Xianid":1634,"Xian":"梅州市","TownId":1635,"Town":"兴宁市","VillageId":8520,"Village":"罗岗镇","Cardid":"","Postcode":"","Tel":"","Isdefault":false}]}';
console.log(mockData)
mockData = JSON.parse(mockData);
const util = require('@/utils/util.js');
export default {
	data() {
		return {
			isEmpty: '',
			items: [], // 地址数据
			isAddNew: false, // 是否显示添加按钮
			addrNum: 7 // 地址总数大于不能添加新地址
		};
	},
	onLoad(options) {
		this.getMsg();
	},
	methods: {
		// 获取信息
		getMsg() {
			this.items = mockData.Shouaddrlist;
			var that = this;
			var url = 'getAddressList.ashx';
			var params = {};
			util.POST({
				url: url,
				params: JSON.stringify(params),
				success: function(res) {
					var oData = res.data[0];

					if (oData.Status == 200) {
						that.setData({
							items: oData.Data
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: oData.Msg,
							duration: 1000
						});
					}
				},
				fail: function() {
					uni.showToast({
						icon: 'none',
						title: '失败'
					});
				}
			});
		},
		// 设置默认地址
		setDefault(id) {
			var that = this;
			var url = 'saveAddressInDefault.ashx';
			var params = {
				id
			};
			util.POST({
				url: url,
				params: JSON.stringify(params),
				success: function(res) {
					var oData = res.data[0];

					if (oData.Status == 200) {
						that.data.items.forEach((item1, index) => {
							var isDefault = 'items[' + index + '].isDefault';
							if (id == item1.ID) {
								that.setData({
									[isDefault]: 1
								});
							} else {
								that.setData({
									[isDefault]: 0
								});
							}
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: oData.Msg,
							duration: 1000
						});
					}
				},
				fail: function() {
					uni.showToast({
						icon: 'none',
						title: '失败'
					});
				}
			});
		},
		// 删除按钮
		delBtn: function(id) {
			var that = this;
			uni.showModal({
				title: '提示',
				content: '确定删除该地址吗？',
				confirmColor: '#c40606',
				success: function(res) {
					if (res.confirm) {
						var that = this;
						var url = 'delReceiverAddress.ashx';
						var params = {
							RID: id
						};
						util.POST({
							url: url,
							params: JSON.stringify(params),
							success: function(res) {
								var oData = res.data[0];

								if (oData.Status == 200) {
									that.data.items.forEach((item, index) => {
										// 成功后删除
										if (id == item.ID) {
											that.data.items.splice(index, 1);

											that.setData({
												items: that.data.items
											});
										}
									});

									that.verifyLength();
								} else {
									uni.showToast({
										icon: 'none',
										title: oData.Msg,
										duration: 1000
									});
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
				}
			});
		},
		// 检验列表长度
		verifyLength: function() {
			var isAdd = this.data.items.length >= this.data.addrNum;
			var isEmpty = this.data.items.length < 1;
			this.setData({
				isAddNew: isAdd,
				isEmpty: isEmpty
			});
		},
		addNewAddr: function(id) {
			// 添加新地址还是编辑地址
			var url = '/pages/center/addrNew?back=list';
			if (id) {
				url = '/pages/center/addrNew?back=list&id=' + id;
			}

			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>
<style lang="scss">
page {
	color: #000;
	background: $bg;
}
.caa{
	color:#ff0000;
}
.ml10{
	margin-left:10rpx;
}
.form-checkbox {
	border-radius: 100%;
	display: inline-block;
	vertical-align: middle;
	margin-right: 15rpx;
	width: 30rpx;
	height: 30rpx;
	background-image: url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wgARCAAiACEDAREAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAABwADBAUGAgn/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAD0bKw7HAiA0CKZAgGJNiRDTjIFgtjxIKQJwiANlmI//8QANhAAAAYABAIHAw0AAAAAAAAAAQIDBAUGAAcRIUFREBITFCIxU3GRkhUWFxgjMjNCUlRhYnL/2gAIAQEAAT8Avd6kIt+2qFQZEf2SQL1kyH/Capeqr/GG+TKEwHfMwrJJTzw+gmT7cUm5B5EIXhhbI2ttAFepycrAPC7kVaujCXX+xRHcMVW5WGGn06FmKCQv1iiMdJJBok+KHAQ4H6Mm0Qmfl3MF543c1IKJpGN5ptkx0IQMNXbR8gDlk6ScIm16qiRwOUdB0HQQ2xfb8pAKo1uttQkbLI7NWobgkHqq8ihjM6CkpDLUXsiskadhEk5AjhAvVAq6e5xLyAd8fWLdfsE8ZIqBHw8vTXOzuCk10TkHimY2pDewcSlSudBlHElla2SdsJQRBeKWOBU2y4+SyeohoXmXFCoaFRbrPn64yE7Ij2kg/U3Mc4/lLyIHAMZvTKUNl9LCO6z1LuSBOJ1FPCAAHsEcfQHafTT+LF1qk/HTxMw6GQikmmmCL9gYdCSCIcP9hwHEJnLSpLVtKvTQcgn4VmciUUjpm9o7DiYzfy+iEhH5woPVh2Igy+3UUHkAF2944hISw5iWFpcrlHnjYmNN2kTEq/fE/BZYOfIOmRgYOYEBloVg96vl3lsRTT4gHDCr1qKV7eLrsYzU/W3aJpm95QDp/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwBP/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwBP/9k=);
	background-repeat: no-repeat;
	background-size: 100%;
	&.checked {
	background-image: url(data:image/jpg;base64,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);
}
}

.addNew {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100rpx;
	text-align: center;
	line-height: 100rpx;
	color: #fff;
	background: #c40606;
	z-index: 5;
	border: 0;
	margin: 0 auto;
	border-radius: 0;
}

.hr22 {
	height: 100rpx;
	line-height: 100rpx;
}
.list-con{
	padding-bottom:20rpx;
}
.list-item {
	position: relative;
	min-height: 215rpx;
	margin-bottom: 10rpx;
	background: #fff;
	padding: 10rpx 33rpx 0 40rpx;
	&.default{
		border: 2rpx solid $color;
	}
}
.addr-detail {
	font-size: 34rpx;
	line-height: 42rpx;
	color: #999;
}
.receiver-box {
	padding-right: 57rpx;
	margin-top: 20rpx;
	line-height: 54rpx;
	color: #000;
}
.edit-line {
	line-height: 80rpx;
	height: 80rpx;
	overflow: hidden;
	color: #999;
}
.edit-box {
	width: 245rpx;
}
.edit {
	padding-left: 40rpx;
	background-image: url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAgMDAwMDBAcFBAQEBAkGBwUHCgkLCwoJCgoMDREODAwQDAoKDhQPEBESExMTCw4UFhQSFhESExL/2wBDAQMDAwQEBAgFBQgSDAoMEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhL/wgARCAAaAB0DAREAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAABQgDBgcE/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAAfIKEJWy3BUWMbcowMOU28UgyY30ZM//EADMQAAEEAQIEAwMNAQAAAAAAAAECAwQFEQAGBxIhMQgTQRBRchYXMjdDUldhcYGVs9Hi/9oACAEBAAE/ANv2G/OJ8R2929uKHtunefcbgxRXNyVrbQop51lY75GvkZxK/EON/Asf5pzcVxsEPV+7d3V1zeWrWKhl6CiK20sA4U6pHZKlYSM+utkcfrCE3PreItXZPW1e9yKXDh5PXPRaRgAjHQjuNeHf6pKf45H969cTeJcLh3U87hbes5QxEjEnHu8xeOoQPU/sNYuuLW6lVlKtya7Md82bNdBSHcfaL+40kHCEen6nW1duN7Yp40QvLmSmmENPzXUgOyOQYBUR1OB0Gc4GvD7ZxGOG0SA/JYam10iQ1KYWsJW0vzVnBB/I63TT7i+cC4stvxaCyrLiubhLE+U3gYSR65VyZOSkfSxpqnicLRs7b2zZzTtpc3bCrd1nBdksJ6r+Fse7/rOvEnCjxOIThisMsl5lC3S2gJ51Huo47n2eFOFHds7aQ6wyt9lkBt1SAVoyeuD3Hs//xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECAQE/AAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEDAQE/AAf/2Q==);
	background-repeat: no-repeat;
	background-position: 0 28rpx;
	background-size: 29rpx 26rpx;
}
.delete {
	padding-left: 30rpx;
	background-image: url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wgARCAAaABMDAREAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAABAUIAwYH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAAt+GFEQMFhTITpyc0Atmf/8QAKBAAAQQBAwIFBQAAAAAAAAAAAQIDBAURAAYSE0EHISJRYRQ2c4HC/9oACAEBAAE/ALDe863plObeqLgOPFPRl/TNqRxC/UoAq9gcZGqq/wByQbPlMhX9hXqaIKHIDDa0uZGCOChkYzp7xeoIrrjEpqfGktqKVsusjkgj3wTqDQbbam2Qm0zL3WvDBZx5BsFpKh+s51DptmzJEBlO3mwqbIkR0k9izyyT59+OtibWpJe0ap5+qhuvLbJUtbQJJ5HTUZ6VOk9FpbnR3QHXOAzwR0E+o/Gqirms2FA45EeQhiwsXHFKQQEJV1OJPwe2vDz7Lp/w/wBHXjE6uFuvMZamC8wlThaPHmfMZONNWUxxxCFy31IUQCC4SCNVrSGK6I00hKG0NJCUIGABjsNf/8QAFBEBAAAAAAAAAAAAAAAAAAAAMP/aAAgBAgEBPwBP/8QAFBEBAAAAAAAAAAAAAAAAAAAAMP/aAAgBAwEBPwBP/9k=);
	background-repeat: no-repeat;
	background-position: 0 28rpx;
	background-size: 20rpx 26rpx;
}
.empty {
	text-align: center;
	padding-top: 130rpx;
	.txt {
		font-size: 32rpx;
		margin-bottom: 10rpx;
		color: #666;
	}
	.subTxt {
		margin-bottom: 40rpx;
		color: #999;
	}
}
</style>
