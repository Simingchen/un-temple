<template>
	<view>
		<view class="top">
		    <image src="http://qn.fayuanhui.cn/c701c321e8760d2d54f7cedf25726cf1.jpg"></image>
		</view>
		<view class="panel main-con">
		    <view class="temp-tit">上海会龙寺</view>
		    <view class="flex-box">
		        <view class="temp-img flex-item">
		            <view class="img-box active"><image src="http://qn.fayuanhui.cn/WechatIMG1197r.jpg"></image></view>
		            <view class="temp-name">上海会龙寺-西</view>
		            <view class="core-light flex-box">
		                <view class="core-light-item flex-item">
		                    <image  src="../../img/3425.png"></image>
		                    <text >74</text>
		                </view>
		                <view class="core-light-item flex-item">
		                    <image src="http://wx.fayuanhui.cn/static/images/light4_n_icon@2x.png"></image>
		                    <text >1546</text>
		                </view>
		            </view>
		        </view>
		        <view class="temp-img flex-item">
		            <view class="img-box"><image src="http://qn.fayuanhui.cn/WechatIMG1196l.jpg"></image></view>
		            <view class="temp-name">上海会龙寺-东</view>
		            <view class="core-light flex-box">
		                <view class="core-light-item flex-item">
		                    <image  src="../../img/3425.png"> </image>
		                    <text >74</text>
		                </view>
		                <view class="core-light-item flex-item">
		                    <image src="http://wx.fayuanhui.cn/static/images/light4_n_icon@2x.png"></image>
		                    <text >1546</text>
		                </view>
		            </view>
		        </view>
		    </view>
		</view>
		<view class="panel detail-con">
		    <view class="detail-tit">关于寺院</view>
		    <view class="detail-master">住持：戒宝法师</view>
		</view>
		<view class="footer-box">
		    <view class="hr28"></view>
		    <view class="footer flex-box">
		        <navigator class="flex-item b2" url="/pages/lampTemple/orderStamp/index">预约</navigator>
		        <navigator class="flex-item b1" url="/pages/lampTemple/orderStamp/index">供奉佛龕</navigator>
		        <navigator class="flex-item b2" url="/pages/lampTemple/orderLamp/index">我要供灯</navigator>
		    </view>
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
	.top{
	    height:750rpx;
	}
	.top image{
	    width:100%;
	    height:750rpx;
	}
	.main-con{
	    position: relative;
	    padding:30rpx;
	    margin-top:-140rpx;
	}
	.temp-tit{
	    font-size: 44rpx;
	    line-height: 60rpx;
	    padding-bottom: 30rpx;
	}
	.temp-img{
	    width:310rpx;
	}
	.temp-img image{
	    width:100%;
	    height:100%;
	}
	.img-box{
	    position: relative;
	    width:310rpx;
	    height:380rpx;
	    border: 2rpx solid transparent;
	    border-radius: 10rpx;
	    overflow: hidden;
	}
	.img-box.active{
	    border: 2rpx solid #bd151d;
	}
	.img-box.active:before{
	    position: absolute;
	    content: "";
	    width:100rpx;
	    height:100rpx;
	    top:0;
	    right:0;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAMAAAAqwkWTAAABJlBMVEUAAAC9FR69FR28FBu9FBzIAAC+FBy+FR29FRy+FBy9FRy+FR3BFBu/Dh21FBTCFByyAAC9FB2+FR29FRy+FBzAFRyxABW9FB2+FB2+FR2+FR29FR29FR29FRy+FBzAFhzAFiC9ERq+Fh29FR29FR2+FR2+FR2+Fhy/FB2+FR29FR2+FB2+FR2+FR6+FB29FR2+Fh2+FB3AFhvAFxy9FR3+/v767u++GSH46er9/Pz78/PwzM3imp7HOD/FMzrCKC/8+Pj029ztv8HqtrjdiIzXcnfKRErBJCu/HSX25OT34+T13+Dy0tTvx8nuxMblo6bbgobZeX3TZmvNTVTLSU/JPkXDLTTAICj79fXwztDnrbDnqq3mqazfkJTfj5PUZ2zRXmPQW2AJ0XWXAAAANHRSTlMA5+UX/QHi3vTs2c8iEQwJBPnGtUIyBvDUwbyqmIZwLSgdpZ6MgF9RPcu5rqGSe2dYSjk20GiiPwAAAplJREFUaN680mlTGkEUheErEjCQRZQskphFo2atynKaAdkRBJe4R7Mv//9PJDDTOaXTlGGGm/djf+inbtURkQcJlVLpTHZufnllbVpsi1AtWchTUm7RSk+g3KqVXkG31KyV7kO3vIWuKEsr8ldahmZLQuklFCuIUFqCXlkRNnsPamXkP0lpOS+9gFIpOd/teeiUELekD8nN59BoSsJSAUwDorQAaELsxoIyRGlOAZq81Pha3O54Icjd9WeIWm3b/Kl7CUQpi2gdF82gTyFowtJR0wxbvwxi03cjOAdl41cJQROVqiZoq/YPEKUMRtb70a3jQv0N6+yeIgRFkz6UjGkeXph1xTrtM4wHyeM03L03gzoAq7ess+/BAUWT1s2wb3zZLAVM+QAYH5JrqREX+VUR9CugTfMIbiiatGn/3cewrp118RhjQpQScHRSNH6fPQDfTdBODZEheTTlvMlKG573xTqVBiJBlNwL92u3jTX7iAXJw6twVNsyjMsYBcWQ6jvGsPIh4kNyyymdtuh8/Ik4EKU7cNTYtU7pBLEg9s4p9Sq+06ojJsTezsDR2d7A2eshNsSeOqV+tVjqeJggRMldfIjlZ5QhSjldiL3JaUOUdCG2ltOGKOlC7HVSG6KkC7HVpDZESRdiv2uzYyOAoAAIosmf0QAiREQG/Xcn3AreRZe9AvYbGkqyUDsGhpI0lISh9mooCUPtwlDbMdRODSVhqD0YapuGyhoaKmtoqKyhobKGhooNGkqyUFtvDRUbNJSkobKGhsoaGipraKisoaFig4aSNFTW0FCxQUNJGio2aChJQ8UGDSVpqNigoSQNFRs0lKShsoaGig0aStJQsUFDSRoqa2iorKGhsoaGyhoaKjYE2c1T3275AW7sD9ltPQRGAAAAAElFTkSuQmCC) right 0 no-repeat;
	    background-size: 100rpx 100rpx;
	}
	.temp-name{
	    font-size: 38rpx;
	    line-height: 52rpx;
	    height: 52rpx;
	    margin: 26rpx 0 12rpx 10rpx;
	}
	.core-light-item image{
	    width:62rpx;
	    height:48rpx;
	}
	.hr28{
	    height: 120rpx;
	}
	.footer{
	    position: fixed;
	    width:100%;
	    bottom:0;
	    height: 120rpx;
	    font-size: 40rpx;
	    text-align: center;
	    line-height: 120rpx;
	    color: #fff;
	}
	.footer .b1{
	    background: #725a38;
	}
	.footer .b2{
	    background: #bd151d;
	}
	.detail-con{
	    padding: 30rpx;
	}
	.detail-con .detail-tit{
	    font-size: 40rpx;
	    line-height: 56rpx;
	}
	.detail-master{
	    line-height: 48rpx;
	    margin-top: 22rpx;
	}
</style>