<template>
	<view>
		<view class="search-bar-box">
		    <view class="hr130"></view>
		    <view class="search-bar" :calss="{focus: isSHowSearch}">
		        <view class="search-box flex-box">
		            <view class="form flex-box flex-item">
		                <input placeholder='请输入关键字搜索' focus="isSHowSearch" @input="bindKeyInput" :value="searchTxt" confirm-type="search" class="flex-item" maxlength="20"></input>
		                <view class="close" @click='clear' bindconfirm="confirmSearch"></view>
		            </view> 
		            <view class="cancel" @click='toggleSearch'>
		                取消
		            </view>
		        </view>
		        <view class="search-input form" @click='toggleSearch'>
		            <text>请输入关键字搜索</text>
		        </view>
		    </view>
		    <view class="search-con" v-if="isSHowSearch">
		        <view class="panel search-line lately-search" v-if="history.length > 0">
		            <view class="title">
		                最近搜索
		                <view class="del" @click='clearHistory'></view>
		            </view>
		            <view class="list-con clearfix">
		                <view class="item" v-for="(item, index) in history" :key="index">
		                    {{item}}
		                </view>
		            </view>
		        </view>
		        <view class="panel search-line hot-search">
		            <view class="title">
		                热门搜索
		            </view>
		            <view class="list-con clearfix">
		                <view class="item">阿斯顿发生的发生兜风</view>
		            </view>
		        </view>
		    </view>
		</view>
		<view class="goods-list" v-if="!isSHowSearch">
		    <navigator class="panel item flex-box" v-for="(item, index) in items" :key="index" url="/pages/lampTemple/detail/index">
		        <image class="img" src="item.temple_img"></image>
		        <view class="con flex-item">
		            <view class="tit ellipsis">{{item.temple_name}}</view>
		            <view class="desc ellipsis2">{{item.brief}}</view>
		            <view class="flex-box">
		                <view class="see clearfix">
		                    <image src="http://wx.fayuanhui.cn/static/images/light4_icon@2x.png"></image>
		                    <text>{{item.dl_num}}</text>
		                </view>
		                <view class="see light">
		                    <image src="http://wx.fayuanhui.cn/static/images/light4_n_icon@2x.png"></image>
		                    <text>{{item.unlit}}</text>
		                </view>
		            </view>
		        </view>
		    </navigator>
		</view>
	</view>
</template>
<script>
	var mockData = `
	    [
	    {
	        "brief": "会龙寺地处上海市南汇区六灶镇会龙村，始建于明代洪武十九年(1386年)。初称陆家庵，后易名会龙寺。该寺在历史上就是周边四镇(六灶、三灶、祝桥、盐仓)百姓和盐商祈求平安兴隆、万事顺利的佛教活动场所。六百多年来，会龙寺历尽沧桑，饱经风雨，到上个世纪90年代初，政府宗教办正式批准为佛教活动场所",
	        "distance": 14476,
	        "dl_num": 256,
	        "temple_id": 235,
	        "temple_img": "http://qn.fayuanhui.cn/c701c321e8760d2d54f7cedf25726cf1.jpg",
	        "temple_name": "上海会龙寺",
	        "unlit":2984
	    }
	]
	`
	mockData = JSON.parse(mockData)
	const util = require('@/utils/util.js');
	export default {
		data() {
			return {
				isLoadData: true,   // 是否可加载数据
				items: mockData || [],     // 订单数据
				curType: -1,              // 当前类型 默认为全部
				totalPages: 0,         // 所有页数
				isSHowSearch: false,
				searchTxt: "",
				history: ["撒的发多少", "撒的发多少"],
			}
		},
		onLoad (options) {
		    this.getList(0, 10)
		},
		methods: {
			getList (page, size, search) {
			    var that = this;
			    var url = "api/getOrderList"
			    var params = {};
			    params.Page = page;
			    params.Size = size;
			    params.search = search;
			
			    util.POST({
			        url: url,
			        params: JSON.stringify(params),
			        success (res) {
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
			        fail () {
			            wx.showToast({
			                icon: 'none',
			                title: "失败"
			            })
			        },
			    })
			
				this.curPage = page
			},
			// 切换搜索
			toggleSearch () {
			    this.setData({
			        isSHowSearch: !this.data.isSHowSearch
			    })
			},
			// 清除历史搜索
			clearHistory () {
			    this.setData({
			        history: []
			    })
			},
			// 清除搜索
			clear () {
			    this.setData({
			        searchTxt: ""
			    })
			},
			// 输入搜索
			bindKeyInput (e) {
			    this.setData({
			        searchTxt: e.detail.value
			    })
			},
			// 确认搜索
			confirmSearch () {
			    this.getList(0, 10, this.data.searchTxt);
			},
			
			/**
			 * 页面上拉触底事件的处理函数
			 */
			onReachBottom () {
			    if (this.data.isLoadData) {
			        var page = this.data.curPage + 1
			        this.getList(page, 10);
			    }
			},
		}
	}
</script>
<style>
	.search-bar{
	    position: fixed;
	    width:100%;
	    top:0;
	    left:0;
	    height:132rpx;
	    background: #c7a769;
	    z-index: 10;
	}
	.hr130{
	    height:132rpx;
	}
	.search-box{
	    padding-top:30rpx;
	    padding-left:20rpx;
	    display: none;
	}
	.form{
	    /* width:710rpx; */
	    height:72rpx;
	    line-height: 72rpx;
	    margin:0 auto;
	    background: #e4d8bf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAARVBMVEXk2L/Hp2nJqm/VvpHQtoPk1rzi1Ljdyqbbx6HNsXrLrnXj1brZxZ7XwJXYwpjUvI7fz6/ezavMr3jLrXPOs37h07bSuYi5d4yZAAABK0lEQVQ4y42S2xKDIAxE3QgqCN6q/v+nligMKmbafYEwx2RZqS6avLIEssrP1bu0W5D1GfoXprU4RB+Km65gRj63ftbccxoMl3t/H6V4QndtzLNNc4WYGfW998BUf5/lSpcEqFwVTHmubZgV98VEirZc8Kzfs1uB+tyFe3RCwDNA578AbFjEVi2vHvAi5KJdBcwitAELrxbQlSgCpUWWATj1EABXsvPtn07NH57w83YNYGNOgwh1wB6jNyKk0i/7cPTvmgDq04NYxEbpFfQEeMkRmrx/HTjdXuweRrclE8yqXGqDkEM56/6sG6bMfG2jmEm+o/njbHXb+U13luODqhyBRctq4i7Mr59UUxOyqOa7ZyqrHZcDtHvHOQsUu9tSfIkSon5SVP2Up/oL5CMIWTIpOO8AAAAASUVORK5CYII=) 18rpx 18rpx no-repeat;
	    background-size: 36rpx 36rpx;
	    border-radius:8rpx;
	}
	.form input{
	    display: block;
	    height:72rpx;
	    padding-left:90rpx;
	}
	.search-input{
	    position:absolute;
	    top:30rpx;
	    left:20rpx;
	    right:30rpx;
	    height:72rpx;
	    padding-left:90rpx;
	}
	.close{
	    width: 72rpx;
	    height: 72rpx;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAACx0lEQVRYR9WZvY9NURDAf1MICSqroPcRIhI9CgpLIpFYW5DoWKWOAqGwKq2PTkKxS4hN0NiGXiIiFn+AwqqQEMXIMHdz39n73j3n3rvv5bzy3Zk5vzM583HmCC1+qroW2AvsA3YCW4ExYL2b/Q4sAp+A98Ar4LWI/Gy6rKQqqqrpjAOngaPAmkQbv4A54B7wQkQ0RT8JWFWPA5eBXSmLDJB9B1wTkUex9qKAVXULcAs4EGs4UW4eOCcin+v0aoFV9SRwG1hXZ6zl9x/AlIg8GGRnILCqTgMXWoKkqt8QkYv9lPoCq+od4Ezqah3J3xWRs1W2KoFH5NmQr9LTy4D9zN7vyFNtzZwKz3QPsGeDN0MIsNiNWCDuKWePEPjlCqauWMhQbl5EDhZ/LgF7UXjY1OoK600UxeUfsJfbt5EV7ItVJ2ATYOlnVSLsH8DSpdmxqml26n5WEXdbGS+ADwPP6rT8u1UkKyS20WPATAK0wU6KyBPXn/IKGrP0ERF5XgDPAhMxWl77rxSyCdA9sA581b0cs/SsiEyKt4jWAsZ2XVUL13m6iU64Cevyxgz4kLV5MVssyaQApMjWYYwb8HUPnjrh8HsMSIxMyrrTBvzUG/EUxUJ2EJDJLAVYwyANmeYMeAHY1oTWdfpBU2SDjmDNzEcDtoDb0ALYVJdBl+0lZJI6jG8GbNG3uk4y4nsldIewhvA7S+CvfjWPcGJfkWEdiUXz8AdgewvaYQbdQpZpLbvCkV1ptvlYPs2PVyHraU9EBp6NlrpqL88DNyPX/d9eOvCoGnhrSx9HAvc08AY+iivSJWBzBHDvFcm9bJPJPC6hxQ5VNZ9rvnvZxqr5DFIc2sareYyqSkdjFGPWMPbihoEl6HzGrSP2dLOBdgk6nyeDEnQ+jzLBZTKPZ68AOp+HxTDvlJ5u9wM7/Ol2Y2mCbxN0uzN29nT7F1CKspwex1OuAAAAAElFTkSuQmCC) no-repeat 50%;
	    background-size: 36rpx auto;
	}
	.cancel{
	    width:126rpx;
	    font-size: 36rpx;
	    padding: 0 24rpx 0 30rpx;
	    color: #fff;
	    line-height: 72rpx;
	    display: none;
	}
	.focus .cancel{
	    display: block;
	}
	.focus .search-input{
	    display: none;
	}
	.focus .search-box{
	    display: flex;
	}
	.goods-list .panel {
	    margin-left:50rpx;
	}
	.goods-list .item{
	    padding:30rpx;
	    padding-left:0rpx;
	    position: relative;
	}
	.goods-list .item .img{
	    display:block;
	    width:220rpx;
	    height:220rpx;
	    margin-left: -30rpx;
	    margin-right:33rpx;
	    background: #999;
	}
	.goods-list .item .tit{
	    font-size: 32rpx;
	    color: #000;
	    line-height: 66rpx;
	}
	.goods-list .item .see{
	    font-size: 28rpx;
	    padding-top: 4rpx;
	    width: 176rpx;
	    color: #f3b019;
	}
	.goods-list .item .see image{
	    float:left;
	    width:56rpx;
	    height: 56rpx;
	}
	.goods-list .item .see text{
	    float:left;
	    margin-top: 28rpx;
	    margin-left: 16rpx;
	    line-height: 28rpx;
	}
	.goods-list .item .see.light{
	    color: #999;
	}
	.goods-list .desc{
	    height: 88rpx;
	    font-size: 28rpx;
	    color: #a3a3a3;
	    line-height: 44rpx;
	}
	.search-line{
	    padding:30rpx;
	}
	.search-line .title{
	    position: relative;
	    font-size: 32rpx;
	    color: #999;
	    height:44rpx;
	    line-height: 44rpx;
	    margin-bottom:20rpx;
	}
	.del{
	    position: absolute;
	    right: -30rpx;
	    height: 100rpx;
	    width: 100rpx;
	    top: -30rpx;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADwklEQVRYR+1Yz48URRT+Xu24Ychm48XobTlyUNC4khgj3vmNcOBGxuzUawdYlf0H+saFgCzM0lWzZozshRB+KGII8WAw8SIq6Mm4ava0xxWI7DLM9DPV6Z709s7Mzg4jmkCfuuv1e++r731VXa8JPV7W2r0iYgC8ICJ1pdT1paWl/ePj4w97CUm9ODmfIAhuEtHbaf+BgYF3xsbGbvYSMwLi+35uZGQklwRYWFhYFeDQ0NA3IrIlnZSIdovI1+mxfD7fMdbi4mKNmR9RpVI5FobhBIDneplJH3waAE5QEAR3iWi4DwEfJ8RdB+SIUmpCRPIA1gMYchFFZJGI7reJLl1k7eYdF+YBgOPL6met/UBEPo6TlJn5cBcJ+/JKWyAiMuV53qFslmq1+vzc3Nw93/fDVghmZmaGZ2dnH/i+X29lN8asn5+fr/u+X1sm9PRDmpFWQKy1R0XkOBHdEpG3nNoz/gfCMDxHRHODg4OjhULhr7Q9CIKtSqmvROTvRqPxZqlU+iOxL2PEGDMO4FSskRWMGGN+BPBa7LyJmX9JJzLGfA5gVzy2g5mvZewutssBIjqktZ7qFYhL/HLs/DozO2DNy1p7TUS2xQN7mflKxl4WkVIM5EOtdTTp6DmDuMkIEU1prZdpxBjzM4BX+gEEwEfMnCyM3oEopUaLxeIPa2EkCIIyEUWMPAPiKOiJEQBnmTmhMeIyrZFWpTHGfAlgezux/idAiOhdrfXlzGI4AyBZAN2JtRUj1to7IrIp3mfe8DzvViZRk5GnA4gx5g6AfjFylJlPrrqhtRFrRyDW2qsisiPeOVfTyJMBIiL7PM+71EGsjwXkNoDN7cSaZqRvQIgo0Fq/n5lREwgRbdFaf5+2B0FwlYii0vzfgZwGkJz62pfGWntERCZjsa2ZEWPMFwB2dmDkyQMhov1a64uZ0q4diPu0MLOXCfQTgFdjxlZoJM1IGyDNLV5EJjzPO9FyH8mU5jOt9cEMEPft2APAnVVHmHk+Y4+OgkQkIjKaPcEZYz4B8F5cuu6AALjNzMn5NMpXqVReDMPQraTvmPlGGoS7n5ycHM7n84fDMPyNmS9k7cYYt8pG1wrEzbqslLK5XO7PQqGwlA3czXO1Wl1Xq9U2ANAA3CTWxX4dNzRXik/jF11P6n4xPHJUx7NYrTlvZ3fjrrceBKBcLKXUgWKxeL6lRsrl8ku5XO5XAP92L/y7+3gys2s3o2vFDKanp7c2Gg33A2ZjmvqElWRMZEVr26nXFSJquB86RPRtvV4vpZsrF/Mf4IXmhdOm8ssAAAAASUVORK5CYII=) no-repeat 50%;
	    background-size: 34rpx;
	}
	.search-line .item{
	    float:left;
	    background: #f5f5f5;
	    border-radius: 4rpx;
	    line-height: 76rpx;
	    margin-bottom: 30rpx;
	    padding-left: 20rpx;
	    padding-right: 20rpx;
	    margin-right:20rpx;
	}
</style>