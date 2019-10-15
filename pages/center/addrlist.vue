<template>
	<view class="addrCon">
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
							<text>默认地址</text>
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
	'{"Result":1,"Shouaddrlist":[{"Id":11668,"Shouman":"陈生","Mobile":"13926012343","Addr":"石岗海边街31号","Provid":19,"Prov":"广东","Xianid":1601,"Xian":"广州市","TownId":50283,"Town":"黄埔区","VillageId":51887,"Village":"城区","Cardid":"","Postcode":"","Tel":"","Isdefault":false},{"Id":11706,"Shouman":"林先银","Mobile":"13799192995","Addr":"城关镇毓秀花园3号楼404单元","Provid":350000,"Prov":"福建省","Xianid":350400,"Xian":"三明市","TownId":350426,"Town":"尤溪县","VillageId":0,"Village":"","Cardid":"","Postcode":"365100","Tel":"","Isdefault":false},{"Id":11837,"Shouman":"Hdjs","Mobile":"13926012343","Addr":"Bxjsbd","Provid":520000,"Prov":"贵州省","Xianid":520100,"Xian":"贵阳市","TownId":520102,"Town":"南明区","VillageId":0,"Village":"","Cardid":"","Postcode":"","Tel":"","Isdefault":false},{"Id":11838,"Shouman":"Hx","Mobile":"13926012343","Addr":"Shshxncjsadf sdf是电饭锅电饭锅对方过后对方过后对方过后规划局Sh","Provid":31,"Prov":"新疆","Xianid":53090,"Xian":"铁门关市","TownId":53108,"Town":"铁门关市","VillageId":0,"Village":"","Cardid":"","Postcode":"","Tel":"","Isdefault":false},{"Id":23178,"Shouman":"hdjshs","Mobile":"13926012343","Addr":"11111","Provid":19,"Prov":"广东","Xianid":1601,"Xian":"广州市","TownId":50284,"Town":"增城区","VillageId":0,"Village":"","Cardid":"","Postcode":"","Tel":"","Isdefault":false},{"Id":23673,"Shouman":"陈先生","Mobile":"13926012343","Addr":"1111111111","Provid":19,"Prov":"广东","Xianid":1634,"Xian":"梅州市","TownId":1635,"Town":"兴宁市","VillageId":8520,"Village":"罗岗镇","Cardid":"","Postcode":"","Tel":"","Isdefault":false}]}';
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
		addNewAddr: function(e) {
			// 添加新地址还是编辑地址
			var id = e.currentTarget.dataset.id;
			var url;
			if (id) {
				url = '/pages/center/addrNew/addNew?back=list&id=' + id;
			} else {
				url = '/pages/center/addrNew/addNew?back=list';
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
	background-image: url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wgARCAAdAB0DAREAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAABgcABQMECf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAOkxDGXAMF0AxpB4C40xchkK0IBjH//EAC8QAAICAQIFAgMIAwAAAAAAAAECAwQFBhEABxIhMVFhFUFCCBMUFiIyYnFDgpL/2gAIAQEAAT8Ay2WzOezM+ldK2hTWmFOUyhQOa5YbrDEp7NKV2Yk7hAR2JI4Tldopx15XEnMTn99jJzPakY+u7kgf0oA4m0EcMhtaByc2Hsx9xUkleWjP/F4mJ6N/HVH0ke/g6X1EmoqEkstRqd6nKat6m53avOvld/qUghlYeVIPGlc0NPcqvznJj7N+a1HLmLUVcbyyvM5c/wDIIHsqcYfmHpLM6SbWlfLRxYyJC07ynZoGHlHHybcgbDzuNt9xvpTJax5s6rr6vjtXcHo/EzE0YEYpJknB2LSeqevkfSO/URzm1pkOWup4Mphd1fO1FWwANwWgZgrH3Il2/wBRxoKZcObugrZ6LOIleSoD/noSOWidfULuYz6FPccZf7PWm8nqr4tBfnp4azILF7Dw7rDPMu/SQQf0judxt67Eb9q9evTrx1KsEcMEKBI40UKqKOwAA7ADifTGI5r5q9m8gGkxFHooY2RPE7IXM8q+qliEB+f3ZPGodL0NRpDJLNPUvU2L071Vgk9dj2PSSCCD4KkFSPI41nzm1Py0yHwXKVKGdcbAWFjaoxH8lDOCf6240xPmua2IGQzeW/A4iQ9MmNoRmNpx81lnLFip8EIE34qVa1KtFTpwRwQQII4441CqijsAAPA4/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwAH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwAH/9k=);
	background-repeat: no-repeat;
	background-size: 100%;
	&.checked {
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAaVBMVEXHp2n////69vDr4MnNsXnKq3DZw5nezKf9/PrgzqvMrnX28efSuYf07uLgz63+/fzz7eDs4szaxZzYwpbVvY318OXo3MPo2sDcyKHWvo/JqW38+fXTuYjx6dnt4s7i07TRt4X28eju5dPzA5RmAAABDUlEQVQoz43T626EIBAF4DkgeAHvWte63V7e/yE7ik7MLjY9f0z4YhhghiBRurLzbCutIBEuO5LY5oldaugUk7oT1487PcW32cH1W0IvSaZs5wdrxNvA7k7ReLdxShdJVy7NFZuSuaPLdCBFkbxX6sYfRh1Rky8Y+ctYxWpSyLb1nOyr3lg/14IZ57BZnxeiC+qgNOxcKGgT1Cq+5YJ2toFLIKz1I6CPW+6P0nrHzqtDKbqVpveTdlzPVPhvVqmCUUlFQL320U8iyggrp13A+fgiiQWhMbKTAprT65omPKjcpZJ/5UHhvLxEUpzUjxujjTeTRuBs+qsV2VsfbeTrMRj/PUQygrkdhj4/j+Av7BAKRdl10DUAAAAASUVORK5CYII=);
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

.list-item {
	position: relative;
	min-height: 215rpx;
	margin-bottom: 10rpx;
	background: #fff;
	padding: 10rpx 33rpx 0 40rpx;
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
