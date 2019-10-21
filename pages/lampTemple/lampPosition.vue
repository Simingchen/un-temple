<template>
	<view>
		<view class="panel top-bar flex-box">
		    <view class="flex-item">
				<image class="icon" src="/static/img/1_03.png"></image>
		        <view class="txt">剩余位置</view>
		        <view class="num">1028</view>
		    </view>
		    <view class="flex-item">
		        <image class="icon" src="/static/img/i_07.jpg"></image>
		        <view class="txt">已选</view>
		        <view class="num">0</view>
		    </view>
		    <view class="flex-item">
		        <image class="icon" src="/static/img/i_09.jpg"></image>
		        <view class="txt">已售</view>
		        <view class="num">28</view>
		    </view>
		</view>
		<view class="positon-panel">
		    <view class="lamp-list">
		        <view class="lift">
		            <view class="item" v-for="(item, index) in floor" :key="index">
		                {{item}}
		            </view>
		        </view>
		        <view class="lamps clearfix">
		            <scroll-view class="scroll" scroll-x>
						<view v-for="(item, index) in floor" :key="index">
						    <view class="item" v-for="(lamp, i) in LampList" :key="i" @click="selectLamp(lamp)">
						        <image class="icon" src="/static/img/i_24.jpg"></image>
						        <view class="no">{{item}}-{{lamp}}</view>
						    </view>
						</view>
		            </scroll-view>
		        </view>
		    </view>
		</view>
	</view>
</template>
<script>
	const util = require('@/utils/util.js');
	export default{
		data() {
			return{
				floor: [1,2,3,4,5,6,7,8,9,10],
				LampList: [1,2,3,4,5,6,7,8,9,10],
			}
		},
		onLoad (options) {
		    // this.getMsg();
		},
		methods: {
			getMsg: function () {
			    // var that = this;
			    // var url = "getMember.ashx"
			    // util.POST({
			    //     url: url,
			    //     success: function (res) {
			    //     },
			    // })
			},
			// 选择灯位
			selectLamp (lamp) {
				uni.navigateTo({
				    url: '/pages/lampTemple/orderLamp?id=' + lamp
				});
			}
		}
	}
</script>
<style lang="scss">
	.panel{
	    padding:30rpx;
	}
	.top-bar{
	    text-align: center;
		box-shadow: 1rpx 1rpx 60rpx rgba(227,157,78,.5);
		.icon{
		    width:125rpx;
		    height:115rpx;
		    background: #999;
		}
		.txt{
		    color:#666;
		    line-height: 60rpx;
		    font-size: 30rpx;
		}
		.num{
		    font-size: 34rpx;
		    font-weight: 700;
		}
	}
	.positon-tab{
	    width:514rpx;
	    margin:0 auto;
	    text-align: center;
	    font-size: 34rpx;
	    line-height: 77rpx;
	    margin-bottom:40rpx;
	}
	.positon-tab .flex-item.on .txt{
	    padding-bottom:21rpx;
	    color:#c7a769;
	    border-bottom:4rpx solid #c7a769;
	}
	.position-list .item{
	    float:left;
	    width:88rpx;
	    height:88rpx;
	    margin-right: 24rpx;
	    margin-bottom:24rpx;
	    text-align: center;
	    line-height: 88rpx;
	    border:1rpx solid #e0e0e0;
	    border-radius: 6rpx;
	    font-size: 32rpx;
		&:nth-child(6n){
		    margin-right: 0;
		}
	}
	.positon-panel{
		background: #fff;
	}
	.lamp-list{
	    position: relative;
		.lift{
		    position: absolute;
			left:8rpx;
			top:8rpx;
		    width:40rpx;
		    padding-top:32rpx;
		    text-align: center;
		    color:#fff;
		    background: #1c1e1d;
			.item{
			    margin-bottom:82rpx;
				&:last-child{
					margin-bottom:44rpx;
				}
			}
		}
	}
	.scroll{
	    width:100%;
		white-space: nowrap;
		.item {
			display: inline-block;
		}
	}
	.lamps {
	    padding-left:60rpx;
		.item{
		    width:77rpx;
		    height:96rpx;
		    margin-bottom:20rpx;
		    margin-right: 30rpx;
		    text-align: center;
			color:#666;
			.icon{
			    width:60rpx;
			    height:70rpx;
			    background: #999;
			}
			.no{
			    line-height: 44rpx;
			    font-size: 20rpx;
			}
		}
	}
</style>