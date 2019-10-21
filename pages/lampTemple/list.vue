<template>
<view>
	<view class="search-bar-box">
	    <view class="hr130"></view>
	    <view class="search-bar" :class="{focus: isSHowSearch}">
	        <view class="search-box flex-box">
	            <view class="form flex-box flex-item">
	                <input placeholder='请输入关键字搜索' :focus="isSHowSearch" :value="searchTxt" confirm-type="search" class="flex-item input" maxlength="20"></input>
	                <view class="close" @click='clear' @confirm="confirmSearch"></view>
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
		<navigator class="panel temple-item flex-box" v-for="(item, index) in goodsList" :key="index" url="/pages/lampTemple/detail">
			<image class="goods-img" :src="item.goods_cover"></image>
		    <view class="con">
		        <view class="tit ellipsis">{{item.goods_name}}</view>
		        <view class="desc ellipsis2">{{item.goods_name}}</view>
		        <view class="flex-box">
		            <view class="see clearfix">
		                <image src="http://wx.fayuanhui.cn/static/images/light4_icon@2x.png"></image>
		                <text>12</text>
		            </view>
		            <view class="see light">
		                <image src="http://wx.fayuanhui.cn/static/images/light4_n_icon@2x.png"></image>
		                <text>12</text>
		            </view>
		        </view>
		    </view>
		</navigator>
	</view>
</view>
</template>
<script>
	const util = require('@/utils/util.js');
	var mockData = { "data": { "current_page": 1, "data": [{ "goods_id": 15, "goods_name": "\u5357\u6cc9\u5c71\u5bfa8\u5bf8\u5706\u6ee1\u89c2\u97f3\uff08\u7fe0\u7389\u9576\u91d1\uff09", "goods_cover": "http:\/\/qn.fayuanhui.cn\/2d2da218534518a64eee630d33132d5e.jpg", "goods_storage": 3, "goods_price": "4666.00" }, { "goods_id": 16, "goods_name": "\u5357\u6cc9\u5c71\u5bfa8\u5bf8\u5706\u6ee1\u4e09\u5b9d\u4f5b\uff08\u7fe0\u7389\u9576\u91d1\uff09", "goods_cover": "http:\/\/qn.fayuanhui.cn\/efcd450e04ff4aa8b1a689e5c31da9ac.png", "goods_storage": 3, "goods_price": "4666.00" }, { "goods_id": 17, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u51b0\u66dc\u89c2\u97f3", "goods_cover": "http:\/\/qn.fayuanhui.cn\/c3c45db2fc6d98d1ace84ac2446e377d.jpg", "goods_storage": 95, "goods_price": "166.00" }, { "goods_id": 18, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u4e0d\u9000\u83e9\u8428", "goods_cover": "http:\/\/qn.fayuanhui.cn\/10800518fb59ab2d22df128093c59d31.jpg", "goods_storage": 20, "goods_price": "7999.00" }, { "goods_id": 19, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u6c89\u9999", "goods_cover": "http:\/\/qn.fayuanhui.cn\/d6be21a44e2b4b3cb7d42a594a76fc4d.jpg", "goods_storage": 99, "goods_price": "66.00" }, { "goods_id": 20, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u51e4\u773c\u624b\u4e32", "goods_cover": "http:\/\/qn.fayuanhui.cn\/f124951e9c4a2c69e4f267176fba873d.jpg", "goods_storage": 8, "goods_price": "299.00" }, { "goods_id": 21, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u4f5b\u7f18\u5409\u7965\u597d\u8fd0\u4f5b\u724c\uff08\u5973\u6b3e\uff09", "goods_cover": "http:\/\/qn.fayuanhui.cn\/ccb115cebc8a4520ef647113cc032c0e.jpg", "goods_storage": 10, "goods_price": "566.00" }, { "goods_id": 22, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u560e\u4e4c\u76d2\uff08\u5973\u6b3e\uff09", "goods_cover": "http:\/\/qn.fayuanhui.cn\/347a52dd1117d1a95c54e27253620310.jpg", "goods_storage": 10, "goods_price": "599.00" }, { "goods_id": 23, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u82b1\u4e1d\u89c2\u97f3\u83e9\u8428", "goods_cover": "http:\/\/qn.fayuanhui.cn\/a8c8a72e667744700122d26bdda73be5.jpg", "goods_storage": 10, "goods_price": "799.00" }, { "goods_id": 24, "goods_name": "\u5357\u6cc9\u5c71\u5bfa\u91d1\u521a\u83e9\u63d0\u9879\u94fe", "goods_cover": "http:\/\/qn.fayuanhui.cn\/84eee1526ef439d4b31ecde4448b1df3.jpg", "goods_storage": 197, "goods_price": "166.00" }], "per_page": 10, "total": 36 }, "msg": "", "code": 200 }
	
	export default {
		data() {
			return {
				isSHowSearch: false,
				searchTxt: "",
				history: ["撒的发多少", "撒的发多少"],
				isLoadData: true,   // 是否可加载数据
				isLogin: false,
				totalPages: 1,           // 所有页数
				curPage: 1,              // 当前页数
				goodsList: []
			}
		},
		onLoad: function (options) {
		    this.getMsg(0, 0)
		},
		methods: {
			getMsg(type, page) {
			    this.goodsList = mockData.data.data
			    console.log(this.goodsList)
			    var that = this;
			    var url = "getMyCollectionList.ashx";
			    var params = {};
			    params.Size = size;
			    params.Page = page;
			    util.POST({
			        url: url,
			        params: JSON.stringify(params),
			        success: function (res) {
			            var oData = res.data[0]
			            if (oData.Status === "200") {
			                that.setData({
			                    curPage: page,
			                })
			                // 如果页码为1，不进行列表叠加
			                if (page == 0) {
			                    that.cartItems = oData.Data
			                } else {
								that.cartItems = [...that.cartItems, ...oData.Data[0].List]
			                }
			
			                if (oData.Data[0].Page >= oData.Data[0].PageCount - 1) {
			                    that.setData({
			                        isLoadData: false
			                    })
			                } else {
			                    that.setData({
			                        isLoadData: false
			                    })
			                }
			            } else {
			                uni.showToast({
			                    icon: 'none',
			                    title: oData.Msg,
			                    duration: 1000
			                })
			            }
			        }
			    })
			},
			goUrl (e) {
			    var index = e.currentTarget.dataset.index;
			    var number = e.currentTarget.dataset.number;
			    uni.navigateTo({
			        url: "/pages/goodsDetail/index?index="+index+"&number="+ number,
			        
			    })
			},

			// 切换搜索
			toggleSearch() {
			    this.isSHowSearch = !this.isSHowSearch
			},
			// 清除历史搜索
			clearHistory() {
			    this.history = []
			},
			// 清除搜索
			clear() {
			    this.searchTxt = ""
			},
			/**
			 * 页面上拉触底事件的处理函数
			 */
			onReachBottom: function () {
			    if (this.isLoadData) {
			        var type = this.curType;
			        var page = this.curPage + 1
			        this.getMsg(type, page);
			    }
			}
		}
	}
</script>
<style lang="scss">
	page{
		background:#fffbf6;
	}
	.search-bar{
	    position: fixed;
	    width:100%;
	    top:0;
	    left:0;
	    height:132rpx;
		z-index: 10;
		background: #fff;
	}
	.hr130{
	    height:132rpx;
	}
	.search-box{
	    padding-top:30rpx;
	    padding-left:20rpx;
	    display: none;
		.input{
			font-size: 28rpx;
		}
	}
	.form{
	    /* width:710rpx; */
	    height:92rpx;
	    line-height: 92rpx;
	    margin:0 auto;
	    background: #fbe5c3 url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAsACwDAREAAhEBAxEB/8QAHAAAAgEFAQAAAAAAAAAAAAAABQYAAQIDBAcJ/8QAGwEAAgMBAQEAAAAAAAAAAAAABQYAAwQBAgf/2gAMAwEAAhADEAAAAPbT5+1NzSEt89GD9akqHZJ0J9VUBGZ7K/bg2gAYYiLF7ugPivz9DaJIxMAnHX7Agybc1gq95pZNDc0A0VMYxInfJCpXDsX1YKbHlzXUpQPhQpKSSSSGTA8qUx//xAA1EAABAgQCBggEBwAAAAAAAAADAQIEBQYRACEHEBITMVEiQUJhcYGhwRUjkdEUIDIzNFKx/9oACAEBAAE/AKWpY9RHcqv3YB/uFt6J34UVIUgJEI0I327Tdsjv9XAaqo+cL+FMQfSytECsi+a5YqegQJDvmEhaqbLdp0Pe6OTm37axuFSFIoRGorhCRbf2I7n5r9MRMUeMiHxUSVXke67nu1aOJ6aIa+SRRFdu27QHL1N4K3FaSxkrn5hgSzC/MZ3Xv731VSJ05o954TpXGwzU5oma+l9ejOEMWcljEToCCqOd3qvDGkY4jVCrGLmIDWv8c1901UBU4Nx8BmBWtVv8dzuCoq/pxPdHG/M6Kkhms2luoCZIngvtiC0aTkhUSNOETOtWu2lxJpPByODSCgWqjeLnLxcvNcVhI5hK5mSJinqUZ3q5huarfJeS65XWtQyxm6HFoVicGnTat58cG0i1GYasYoBqvaYPP1VcSKsJnLJi6LiYh5xlVN+x7r3705LhPhdSyvsnhzN+n2VMTahpzAxzwwQHHFxYRtuHJe/8tDTeOgJwyDAX5R3WIN3Drz8cVXV84lc2dBwbhoxBtXNl8f/EADIRAAECBAIFCgcAAAAAAAAAAAECBAADBRExQRASIYHBBhRRUmFxkbHR4RMgIiMkofD/2gAIAQIBAT8AptNW/WckjE8BBTSqUnbYHxJ4wip0p2dRRG3rDZ+4qVDQEGa2yxHppSU0qlXzA8SfeJk1c5ZWs3J0cn3q1gt1m9to7sxFXbBs+UE4HaN+ipJ53SipHQFbsdPJ2UpTtUzIDzivrCn9hkAOOih1JARzaabdHpDyga6ypubXyOG4xK5PO1K+4oAeMNGkllJ+HLw8+0xVWc9s5K17Qo3B0tqw+bjVCrjt2+8Lr79QsLDuHqTDKquW08rWSoHEHh2x+NUG3WSf7cYc0V3JnFMsaycj8tFdzpLsS0n6VYiKnVHTZ1qItawj/8QAKREAAQMDAgQGAwAAAAAAAAAAAQIDBAAFERIhEDFBoSNRYYGR0RMgwf/aAAgBAwEBPwCZMRER5q6CgqdOJxk9hRhTo41Dsah3NWrQ98/fHefOI6E9hSEJbSEpGAOF1jJT4qeux+6t7xeignmNvjhCP4J2F+o43ZaRH09SR2zVpQUxMnqeFyhq1F5v3+6i3bSnS8Pcf2l3aOlJ0gk/FPvuSF611AktPMhKdiOnF23xXtyMH02pFqipOTk+9PwGXmtKRgjlXjRHvIimLlHcbyvY/rcWG3I5URuKgwI7zGpfPNf/2Q==) 20rpx 24rpx no-repeat;
	    background-size: 44rpx 44rpx;
	    border-radius:8rpx;
	}
	.form input{
	    display: block;
	    height:92rpx;
	    padding-left:90rpx;
	}
	.search-input{
	    position:absolute;
	    top:30rpx;
	    left:20rpx;
	    right:30rpx;
	    height:92rpx;
	    padding-left:90rpx;
	}
	.close{
	    width: 92rpx;
	    height: 92rpx;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAACx0lEQVRYR9WZvY9NURDAf1MICSqroPcRIhI9CgpLIpFYW5DoWKWOAqGwKq2PTkKxS4hN0NiGXiIiFn+AwqqQEMXIMHdz39n73j3n3rvv5bzy3Zk5vzM583HmCC1+qroW2AvsA3YCW4ExYL2b/Q4sAp+A98Ar4LWI/Gy6rKQqqqrpjAOngaPAmkQbv4A54B7wQkQ0RT8JWFWPA5eBXSmLDJB9B1wTkUex9qKAVXULcAs4EGs4UW4eOCcin+v0aoFV9SRwG1hXZ6zl9x/AlIg8GGRnILCqTgMXWoKkqt8QkYv9lPoCq+od4Ezqah3J3xWRs1W2KoFH5NmQr9LTy4D9zN7vyFNtzZwKz3QPsGeDN0MIsNiNWCDuKWePEPjlCqauWMhQbl5EDhZ/LgF7UXjY1OoK600UxeUfsJfbt5EV7ItVJ2ATYOlnVSLsH8DSpdmxqml26n5WEXdbGS+ADwPP6rT8u1UkKyS20WPATAK0wU6KyBPXn/IKGrP0ERF5XgDPAhMxWl77rxSyCdA9sA581b0cs/SsiEyKt4jWAsZ2XVUL13m6iU64Cevyxgz4kLV5MVssyaQApMjWYYwb8HUPnjrh8HsMSIxMyrrTBvzUG/EUxUJ2EJDJLAVYwyANmeYMeAHY1oTWdfpBU2SDjmDNzEcDtoDb0ALYVJdBl+0lZJI6jG8GbNG3uk4y4nsldIewhvA7S+CvfjWPcGJfkWEdiUXz8AdgewvaYQbdQpZpLbvCkV1ptvlYPs2PVyHraU9EBp6NlrpqL88DNyPX/d9eOvCoGnhrSx9HAvc08AY+iivSJWBzBHDvFcm9bJPJPC6hxQ5VNZ9rvnvZxqr5DFIc2sareYyqSkdjFGPWMPbihoEl6HzGrSP2dLOBdgk6nyeDEnQ+jzLBZTKPZ68AOp+HxTDvlJ5u9wM7/Ol2Y2mCbxN0uzN29nT7F1CKspwex1OuAAAAAElFTkSuQmCC) no-repeat 50%;
	    background-size: 36rpx auto;
	}
	.cancel{
	    width:126rpx;
	    font-size: 30rpx;
	    padding: 0 24rpx 0 30rpx;
	    color: #333;
	    line-height: 92rpx;
	    display: none;
	}
	.focus {
		.cancel{
		    display: block;
		}
		.search-input{
		    display: none;
		}
		.search-box{
		    display: flex;
		}
	}
	.goods-list .panel {
	    margin-left:50rpx;
	}
	.temple-item{
	    padding:30rpx;
	    padding-left:0rpx;
	    position: relative;
		.goods-img{
		    display:block;
		    width:220rpx;
		    height:220rpx;
		    margin-left: -30rpx;
		    margin-right:33rpx;
		    background: #999;
		}
		.con{
			width:430rpx;
		}
		.tit{
		    font-size: 32rpx;
		    color: #000;
		    line-height: 66rpx;
		}
		.see{
		    font-size: 28rpx;
		    padding-top: 4rpx;
		    width: 176rpx;
		    color: #f3b019;
		}
		.see image{
		    float:left;
		    width:56rpx;
		    height: 56rpx;
		}
		.see text{
		    float:left;
		    margin-top: 28rpx;
		    margin-left: 16rpx;
		    line-height: 28rpx;
		}
		.see.light{
		    color: #999;
		}
		.desc{
		    height: 88rpx;
		    font-size: 28rpx;
		    color: #a3a3a3;
		    line-height: 44rpx;
		}
	}
	.goods-list{
	    margin-top:20rpx;
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