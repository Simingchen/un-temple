<template>
	<view>
		<view class="panel">
		    <view class="goodsItem clearfix rel">
		        <image class="img" src="item.Img"></image>
		        <view class="con ofh">
		            <view class="tit ellipsis">揭阳普宁寺寺庙</view>
		            <view class="item-sub">
		                揭阳普宁寺——左
		            </view>
		            <view class="mui-number">
		                <text class="decrease" @click="changeQuantity(-1)"></text>
		                <text type="number" class="num">{{Quantity}}</text>
		                <text class="increase" @click="changeQuantity(1)"></text>
		            </view>
		        </view>
		    </view>
		    <view class="lamp-time">
		        <view class="tit">选择供灯时长</view>
		        <view class="lamp-list clearfix">
		            <view class="lamp-item" :class="{on: curTime==1}" @click='changeTime(1)'>1小时</view>
		            <view class="lamp-item" :class="{on: curTime==2}" @click='changeTime(2)'>1天</view>
		            <view class="lamp-item" :class="{on: curTime==3}" @click='changeTime(3)'>1个月</view>
		            <view class="lamp-item" :class="{on: curTime==4}" @click='changeTime(4)'>1年</view>
		            <view class="lamp-item" :class="{on: curTime==5}" @click='changeTime(5)'>常明</view>
		            <view class="lamp-item" :class="{on: curTime==6}" @click='changeTime(6)'>其他时长</view>
		        </view>
		    </view>
		</view>
		<view class="panel lamp-position">
		    <navigator class="line-item arrow clearfix" hover-class="none" url="/pages/lampTemple/lampPosition">
		        <text class="lab">选择供灯位置</text>
		        <view class="fr">
		            18-015
		        </view>
		    </navigator>
		</view>
		<view class="panel">
		    <view class="input-box flex-box">
		        <view class="tit">祈福人姓名</view>
		        <input class="flex-item" placeholder='选填姓名' maxlength='15' :value="user.send"></input>
		    </view>
		    <view class="input-box flex-box">
		        <view class="tit">收福人姓名</view>
		        <input class="flex-item" placeholder='选填姓名' maxlength='25' :value="user.receiver"></input>
		    </view>
		    <view class="input-box flex-box">
		        <view class="tit">短信收福人</view>
		        <input class="flex-item" placeholder='选填手机号码' type="number" maxlength='11' :value="user.msg"></input>
		    </view>
		</view>
		<view class="panel bless">
		    <view class="line-item arrow clearfix">
		        <text class="lab">祈福语</text>
		        <navigator class="fr" hover-class="none" :url="'/pages/center/editTxt/editTxt?type=nickname&txt=' + user.Name">
		            更多
		        </navigator>
		    </view>
		    <scroll-view scroll-y class="bless-txt">
		        平安是福,人人想得,俗世中祈福求事事成遂,合家安康幸福。遇逆境能化凶成吉,顺境则吉上加吉。 升官贵人: 官运亨通,鹏程万里
		    </scroll-view>
		</view>
		<view class="footer-box">
		    <view class="hr28"></view>
		    <view class="footer flex-box">
		        <view class="flex-item b1">合计 <text class="total">¥19998</text></view>
		        <view class="b2" @click='saveOrder'>随喜捐赠</view>
		    </view>
		</view>
	</view>
</template>
<script>
	const util = require('@/utils/util.js');
	export default {
		data() {
			return {
				Quantity: 1,
				curTime: 1,
				bless: 1,    // 祝福语
				user: {
				    send: "",
				    receiver:"",
				    msg: ""
				},
			}
		},
		onLoad (options) {
		    this.getMsg();
		},
		methods: {
			getMsg: function () {
			    var that = this;
			    var url = "getMember.ashx"
			    util.POST({
			        url: url,
			        success: function (res) {
			            var oData = res.data[0]
			
			            if (oData.Status == 200) {
			                that.setData({
			                    user: oData.Data[0]
			                })
			            } else {
			                uni.showToast({
			                    icon: 'none',
			                    title: oData.Msg,
			                    duration: 1000
			                })
			            }
			        },
			    })
			},
			// 加减商品数量
			changeQuantity: function (type) {
			    var that = this;
			    var nums = null;
			    var nowNum = this.data.Quantity;
			
			
			    if (type > 0) {
			        nowNum++;
			    } else {
			        nowNum > 1 ? nowNum-- : nowNum = 1;
			    }
			    that.Quantity = nowNum
			    // var url = "saveQuantityForCart.ashx";
			    // var params = {};
			    // params.OID = goodsId;
			    // params.Quantity = nowNum;
			    // util.POST({
			    //     url: url,
			    //     params: JSON.stringify(params),
			    //     success: function (res) {
			    //         var oData = res.data[0]
			    //         if (oData.Status == 200) {
			    //             that.setData({
			    //                 [nums]: nowNum
			    //             })
			
			    //             // 计算总金额
			    //             that.calTotalMoney();
			    //         }
			    //     }
			    // })
			},
			changeTime (time) {
			    this.curTime = time
			},
			saveOrder () {
			    // if (!this.data.name) {
			    //     uni.showToast({
			    //         icon: "none",
			    //         title: "冠名文字不能为空"
			    //     })
			    //     return false;
			    // }
			    // if (!this.data.led) {
			    //     uni.showToast({
			    //         icon: "none",
			    //         title: "LED显示文字不能为空"
			    //     })
			    //     return false;
			    // }
			
			    var that = this;
			    var url = "getMember.ashx"
			    util.POST({
			        url: url,
			        success: function (res) {
			            var oData = res.data[0]
			
			            if (oData.Status == 200) {
			                // 微信支付
			                util.PAY(oData.Data[0].Number, {
			                    success() {
			                        uni.redirectTo({
			                            url: "/pages/orderList/orderList"
			                        })
			                    },
			                    fail() {
			                        uni.redirectTo({
			                            url: "/pages/orderList/orderList"
			                        })
			                    }
			                })
			            }
			        },
			    })
			    
			},
			
		}
	}
</script>
<style>
	.panel{
	    padding:30rpx;
	}
	.goodsItem {
	    padding-bottom:42rpx;
	    border-bottom:2rpx solid #f6f6f6;
	}
	.goodsItem .img{
	    float:left;
	    width:200rpx;
	    height:200rpx;
	    margin-right: 30rpx;
	    background: #999;
	}
	.goodsItem .tit{
	    line-height: 65rpx;
	    font-weight:600;
	    font-size: 38rpx;
	}
	.item-sub{
	    font-size: 34rpx;
	    color:#999;
	    line-height: 65rpx;
	}
	.goodsItem .left{
	    font-size: 34rpx;
	    color:#803437;
	    line-height: 65rpx;
	}
	.input-box{
	    border-bottom:2rpx solid #f6f6f6;
	}
	.input-box .tit{
	    line-height: 108rpx;
	}
	.input-box input{
	    display: block;
	    height:108rpx;
	    padding-left:48rpx;
	    line-height: 108rpx;
	}
	.bless{
	    padding-top:0;
	}
	.bless-txt{
	    height:256rpx;
	    padding:30rpx;
	    background: #f5f5f5;
	    line-height: 54rpx;
	    color:#000;
	}
	.hr28{
	    height: 100rpx;
	}
	.footer{
	    position: fixed;
	    width:100%;
	    bottom:0;
	    height: 100rpx;
	    font-size: 36rpx;
	    line-height: 100rpx;
	    color: #fff;
	}
	.footer .b1{
	    font-size: 30rpx;
	    padding-left:30rpx;
	    color:#2c3e50;
	    background: #fff;
	}
	.footer .b2{
	    width:340rpx;
	    text-align: center;
	    background: #bd151d;
	}
	.footer .total{
	    margin-left:25rpx;
	    font-size: 32rpx;
	    font-weight: 600;
	    color:#bd151d;
	}
	.lamp-position {
	    padding: 0;
	    overflow: hidden;
	}
	.line-item{
	    background: #fff;
	    padding-left:30rpx;
	    padding-right:65rpx;
	    color:#666;
	    line-height: 100rpx;
	    font-size: 27rpx;
	}
	.line-item.arrow{
	    position:relative;
	}
	.line-item.arrow:before{
	     position:absolute; 
	    content:"";
	    right:33rpx;
	    top:43rpx;
	    width:15rpx;
	    height:15rpx;
	    border-top:3rpx solid #666;
	    border-right:3rpx solid #666;
	    transform: rotate(45deg);
	}
	.line-item .lab{
	    float:left;
	    line-height: 100rpx;
	    height: 100rpx;
	    color:#000;
	}
	.mui-number {
	    position: absolute;
	    bottom:42rpx;
	    left:230rpx;
	    width:196rpx;
	    height: 48rpx;
	    text-align: center;
	    line-height: 48rpx;
	    letter-spacing: 0;
	}
	
	.mui-number.disabled {
	    width: 6.1rem;
	    height: 1.5rem;
	    color: #fff;
	    background-color: #aaa;
	}
	
	.mui-number .decrease, .mui-number .increase {
	    position: relative;
	    float: right;
	    display: block;
	    width:48rpx;
	    height: 48rpx;
	    background-color: #fff;
	    color: #5f646e;
	    border:2rpx solid #e0e0e0;
	    border-radius: 3rpx;
	}
	
	.mui-number .decrease {
	    float: left;
	}
	
	.mui-number .decrease:before {
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    margin: auto;
	    content: '';
	    width: 22rpx;
	    height: 2rpx;
	    background-color: #626262;
	}
	
	.mui-number .increase:before {
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    margin: auto;
	    content: '';
	    width: 22rpx;
	    height: 2rpx;
	    background-color: #626262;
	}
	
	.mui-number .increase:after {
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    margin: auto;
	    content: '';
	    width: 2rpx;
	    height: 22rpx;
	    background-color: #626262;
	}
	
	.mui-number .num {
	    float: left;
	    width: 100rpx;
	    height: 48rpx;
	    line-height: 48rpx;
	    border: none;
	    text-align: center;
	    color: #000;
	    font-size: 22rpx;
	}
	.lamp-time .tit{
	    margin-top:30rpx;
	    line-height: 50rpx;
	}
	.lamp-item{
	    float:left;
	    margin-top:26rpx;
	    margin-right: 30rpx;
	    min-width:138rpx;
	    height:90rpx;
	    border:2rpx solid #e0e0e0;
	    border-radius: 8rpx;
	    text-align: center;
	    line-height: 90rpx;
	    font-size: 34rpx;
	}
	.lamp-item:nth-child(4){
	    margin-right: 0;
	}
	.lamp-item:last-child{
	    width:190rpx;
	}
	.lamp-item.on{
	    color:#bd151d;
	    border-color: #bd151d;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAMAAAAqwkWTAAABJlBMVEUAAAC9FR69FR28FBu9FBzIAAC+FBy+FR29FRy+FBy9FRy+FR3BFBu/Dh21FBTCFByyAAC9FB2+FR29FRy+FBzAFRyxABW9FB2+FB2+FR2+FR29FR29FR29FRy+FBzAFhzAFiC9ERq+Fh29FR29FR2+FR2+FR2+Fhy/FB2+FR29FR2+FB2+FR2+FR6+FB29FR2+Fh2+FB3AFhvAFxy9FR3+/v767u++GSH46er9/Pz78/PwzM3imp7HOD/FMzrCKC/8+Pj029ztv8HqtrjdiIzXcnfKRErBJCu/HSX25OT34+T13+Dy0tTvx8nuxMblo6bbgobZeX3TZmvNTVTLSU/JPkXDLTTAICj79fXwztDnrbDnqq3mqazfkJTfj5PUZ2zRXmPQW2AJ0XWXAAAANHRSTlMA5+UX/QHi3vTs2c8iEQwJBPnGtUIyBvDUwbyqmIZwLSgdpZ6MgF9RPcu5rqGSe2dYSjk20GiiPwAAAplJREFUaN680mlTGkEUheErEjCQRZQskphFo2atynKaAdkRBJe4R7Mv//9PJDDTOaXTlGGGm/djf+inbtURkQcJlVLpTHZufnllbVpsi1AtWchTUm7RSk+g3KqVXkG31KyV7kO3vIWuKEsr8ldahmZLQuklFCuIUFqCXlkRNnsPamXkP0lpOS+9gFIpOd/teeiUELekD8nN59BoSsJSAUwDorQAaELsxoIyRGlOAZq81Pha3O54Icjd9WeIWm3b/Kl7CUQpi2gdF82gTyFowtJR0wxbvwxi03cjOAdl41cJQROVqiZoq/YPEKUMRtb70a3jQv0N6+yeIgRFkz6UjGkeXph1xTrtM4wHyeM03L03gzoAq7ess+/BAUWT1s2wb3zZLAVM+QAYH5JrqREX+VUR9CugTfMIbiiatGn/3cewrp118RhjQpQScHRSNH6fPQDfTdBODZEheTTlvMlKG573xTqVBiJBlNwL92u3jTX7iAXJw6twVNsyjMsYBcWQ6jvGsPIh4kNyyymdtuh8/Ik4EKU7cNTYtU7pBLEg9s4p9Sq+06ojJsTezsDR2d7A2eshNsSeOqV+tVjqeJggRMldfIjlZ5QhSjldiL3JaUOUdCG2ltOGKOlC7HVSG6KkC7HVpDZESRdiv2uzYyOAoAAIosmf0QAiREQG/Xcn3AreRZe9AvYbGkqyUDsGhpI0lISh9mooCUPtwlDbMdRODSVhqD0YapuGyhoaKmtoqKyhobKGhooNGkqyUFtvDRUbNJSkobKGhsoaGipraKisoaFig4aSNFTW0FCxQUNJGio2aChJQ8UGDSVpqNigoSQNFRs0lKShsoaGig0aStJQsUFDSRoqa2iorKGhsoaGyhoaKjYE2c1T3275AW7sD9ltPQRGAAAAAElFTkSuQmCC) right 0 no-repeat;
	    background-size: 48rpx 48rpx;
	}
</style>