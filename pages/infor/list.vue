<template>
	<view>
		<view class="search-bar">
			<view class="hr130"></view>
			<view class="search-box">
				<view class="form flex-box">
					<input placeholder='请输入关键字搜索' confirm-type="search" class="flex-item"></input>
					<view class="close"></view>
				</view>
			</view>
		</view>
		<view class="list">
			<navigator class="panel item flex-box" v-for="(item, index) in items" :key="index" hover-class="none" url="/pages/infor/detail/index">
				<image class="img" src="item.Img"></image>
				<view class="con flex-item">
					<view class="tit">{{item.Name}}</view>
					<view class="see">{{item.see}}</view>
					<view class="source">{{item.source}}</view>
				</view>
			</navigator>
		</view>
	</view>
</template>
<script>
	var mockData =
		`
	    [
	    {
	        "id": "1234234534",
	        "Name": "南泉山寺庙圆满大方撒旦法撒旦法",
	        "Img": "http:\/\/qn.fayuanhui.cn\/2d2da218534518a64eee630d33132d5e.jpg",
	        "see": 30,
	        "source": "法缘汇"
	    },
	    {
	        "id": "1234234534",
	        "Name": "南泉山寺庙圆满大方撒旦法撒旦法",
	        "Img": "http:\/\/qn.fayuanhui.cn\/2d2da218534518a64eee630d33132d5e.jpg",
	        "see": 30,
	        "source": "法缘汇"
	    }
	]
	`
	mockData = JSON.parse(mockData)
	const util = require('@/utils/util.js');
	export default {
		data() {
			return {
				isLoadData: true, // 是否可加载数据
				items: mockData || [], // 订单数据
				curMethods: null, // 当前方法
				curType: -1, // 当前类型 默认为全部
				totalPages: 0, // 所有页数
				curItem: "", // 选定的当前item
			}
		},
		onLoad: function(options) {
			this.getOrderList(-1, 0, 10)
			console.log(this.data.items)
		},
		methods: {
			switchOrder: function(e) {
				// type  -1：全部 0：待付款 1：待发货 2：待收货 4：已完成
				var type = e.currentTarget.dataset.type;
				this.getOrderList(0, 10);
			},
			getOrderList: function(page, size) {
				var that = this;
				var url = "api/getOrderList"
				var params = new Object();
				params.Page = page;
				params.Size = size;

				util.POST({
					url: url,
					params: JSON.stringify(params),
					success: function(res) {
						var oData = res.data[0]

						if (oData.Status === "200") {
							that.setData({
								curPage: page,
							})

							// 如果页码为1，不进行列表叠加
							if (page == 0) {
								that.setData({
									items: oData.Data[0].List
								})
							} else {
								var data = that.data.items.concat(oData.Data[0].List);
								that.setData({
									items: data
								})
							}

							if (oData.Data[0].Page >= oData.Data[0].PageCount - 1) {
								that.setData({
									isLoadData: false
								})
							} else {
								that.setData({
									isLoadData: true
								})
							}
						} else {
							wx.showToast({
								icon: 'none',
								title: oData.Msg,
								duration: 1000
							})
						}
					},
					fail: function() {
						wx.showToast({
							icon: 'none',
							title: "失败"
						})
					},
				})

				this.setData({
					curPage: page,
				})
			},
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if (this.data.isLoadData) {
				var page = this.data.curPage + 1
				this.getOrderList(type, page, 10);
			}
		},
	}
</script>
<style lang="scss">
	page{
		background:#fffbf6;
	}
	.hr130 {
		height: 132rpx;
	}
	.search-bar-box{
		background: #fff;
		z-index: 10;
	}
	.search-box {
		position: fixed;
		width: 100%;
		height: 132rpx;
		top: 0;
		left: 0;
		padding-top: 30rpx;
		padding-left: 20rpx;
		z-index: 10;
	}

	.form {
		width: 710rpx;
		height: 94rpx;
		line-height: 94rpx;
		margin: 0 auto;
		background: #fbe5c3 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAARVBMVEXk2L/Hp2nJqm/VvpHQtoPk1rzi1Ljdyqbbx6HNsXrLrnXj1brZxZ7XwJXYwpjUvI7fz6/ezavMr3jLrXPOs37h07bSuYi5d4yZAAABK0lEQVQ4y42S2xKDIAxE3QgqCN6q/v+nligMKmbafYEwx2RZqS6avLIEssrP1bu0W5D1GfoXprU4RB+Km65gRj63ftbccxoMl3t/H6V4QndtzLNNc4WYGfW998BUf5/lSpcEqFwVTHmubZgV98VEirZc8Kzfs1uB+tyFe3RCwDNA578AbFjEVi2vHvAi5KJdBcwitAELrxbQlSgCpUWWATj1EABXsvPtn07NH57w83YNYGNOgwh1wB6jNyKk0i/7cPTvmgDq04NYxEbpFfQEeMkRmrx/HTjdXuweRrclE8yqXGqDkEM56/6sG6bMfG2jmEm+o/njbHXb+U13luODqhyBRctq4i7Mr59UUxOyqOa7ZyqrHZcDtHvHOQsUu9tSfIkSon5SVP2Up/oL5CMIWTIpOO8AAAAASUVORK5CYII=) 18rpx 30rpx no-repeat;
		background-size: 36rpx 36rpx;
		border-radius: 8rpx;
	}

	.form input {
		display: block;
		height: 94rpx;
		padding-left: 90rpx;
	}

	.close {
		width: 94rpx;
		height: 94rpx;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAACx0lEQVRYR9WZvY9NURDAf1MICSqroPcRIhI9CgpLIpFYW5DoWKWOAqGwKq2PTkKxS4hN0NiGXiIiFn+AwqqQEMXIMHdz39n73j3n3rvv5bzy3Zk5vzM583HmCC1+qroW2AvsA3YCW4ExYL2b/Q4sAp+A98Ar4LWI/Gy6rKQqqqrpjAOngaPAmkQbv4A54B7wQkQ0RT8JWFWPA5eBXSmLDJB9B1wTkUex9qKAVXULcAs4EGs4UW4eOCcin+v0aoFV9SRwG1hXZ6zl9x/AlIg8GGRnILCqTgMXWoKkqt8QkYv9lPoCq+od4Ezqah3J3xWRs1W2KoFH5NmQr9LTy4D9zN7vyFNtzZwKz3QPsGeDN0MIsNiNWCDuKWePEPjlCqauWMhQbl5EDhZ/LgF7UXjY1OoK600UxeUfsJfbt5EV7ItVJ2ATYOlnVSLsH8DSpdmxqml26n5WEXdbGS+ADwPP6rT8u1UkKyS20WPATAK0wU6KyBPXn/IKGrP0ERF5XgDPAhMxWl77rxSyCdA9sA581b0cs/SsiEyKt4jWAsZ2XVUL13m6iU64Cevyxgz4kLV5MVssyaQApMjWYYwb8HUPnjrh8HsMSIxMyrrTBvzUG/EUxUJ2EJDJLAVYwyANmeYMeAHY1oTWdfpBU2SDjmDNzEcDtoDb0ALYVJdBl+0lZJI6jG8GbNG3uk4y4nsldIewhvA7S+CvfjWPcGJfkWEdiUXz8AdgewvaYQbdQpZpLbvCkV1ptvlYPs2PVyHraU9EBp6NlrpqL88DNyPX/d9eOvCoGnhrSx9HAvc08AY+iivSJWBzBHDvFcm9bJPJPC6hxQ5VNZ9rvnvZxqr5DFIc2sareYyqSkdjFGPWMPbihoEl6HzGrSP2dLOBdgk6nyeDEnQ+jzLBZTKPZ68AOp+HxTDvlJ5u9wM7/Ol2Y2mCbxN0uzN29nT7F1CKspwex1OuAAAAAElFTkSuQmCC) no-repeat 50%;
		background-size: 36rpx auto;
	}

	.item {
		padding: 30rpx;
		position: relative;
	}

	.item .img {
		display: block;
		width: 200rpx;
		height: 200rpx;
		margin-right: 33rpx;
		background: #999;
	}

	.item .tit {
		line-height: 48rpx;
		font-size: 34rpx;
		color: #2c3e50;
	}

	.item .see {
		padding-left: 50rpx;
		margin-top: 67rpx;
		color: #999;
		font-size: 26rpx;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAMAAADbT899AAAAclBMVEX///+ZmZmdnZ37+/v09PSfn5/u7u7x8fHp6en4+Pitra2kpKShoaHe3t6+vr6mpqbr6+vW1tbU1NTDw8PAwMCqqqqoqKjl5eXi4uLOzs7Hx8e3t7exsbHa2trLy8vExMS6urr29va0tLSzs7Ojo6PIyMjLnb59AAABFUlEQVQoz31S15LDIAyU6Rhcca+xffn/X7xBjGPfJZN9knZhUQEuULWMtWkONzP4ADrH0QleyTdZTV4h1hhLfDAwetdZ71k+9Yox1U8+qRN96XL1lF1FSIXjPu1fpYgUXR0DmieJoCCR4Ku861Gcgy6PLNtLDaq+1SofqJOBQml8lBVA1wi5igFsjmBiExBjhHhISAJJnhoED+xPDl0dwrgFdbIShP12gAjY0tcT8u2JaGcA4iqyyLDIGagLetP5eeYpR2MFuhibZiywzdAPDYMYOPYkgYquC4NCvdTnKkqDcxEhzSuO/oW+LXP3HvGiGGuXGO9P7Z99ajQh3HIeal42+Af2NNEJM3z8VGx2UxMfaX83/wUxQw8ViRksQQAAAABJRU5ErkJggg==) 0 center no-repeat;
		background-size: 32rpx 20rpx;
	}

	.source {
		position: absolute;
		right: 33rpx;
		bottom: 30rpx;
	}
</style>
