<template>
	<view>
		<view class="wrap">
		<!--搜索框  -->
		   <view class='search-input'>
		      <image src='../images/icon-search.png'></image>
		      <input type='text' confirm-type="search" auto-focus bindconfirm="goSearch"></input>
		   </view>
		   <!--大家搜  -->
		   <view class='search-cond'>
		          <view class='title'>
		              <view class='line'></view>
		              <view class="txt">大家最近都在搜</view>
		          </view>
		          <view class='search-cont'>
		                <navigator hover-class="none" url="/pages/goodsDetail/searchlist/search?txt={{item.SearchWord}}" wx:for="{{hotSearch}}" wx:key="{{index}}">
		                    <view>{{item.SearchWord}}</view>
		                </navigator>
		          </view>
		   </view>
		   <!--历史搜索  -->
		   <view class='search-his'>
		        <view class='title'>历史搜索</view>
		        <view class='list'>
		            <navigator class='list-box' hover-class="none" url="/pages/goodsDetail/searchlist/search?txt={{item.SearchWord}}"  wx:for="{{historySearch}}" wx:key="{{index}}">
		                <image src='../images/icon-history.png'></image>
		                <view>{{item.txt}}</view>
		            </navigator>
		        </view>
		   </view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>
<style lang="scss">
	.wrap {
	    margin: 0;
	}
	
	.search-input {
	    border-bottom: 1rpx solid #f4f4f4;
	    padding: 15rpx 35rpx;
	    position: relative;
	    border-top: 1rpx solid #f4f4f4;
	}
	
	.search-input image {
	    position: absolute;
	    left: 55rpx;
	    top: 30rpx;
	    z-index: 5;
	    width: 26rpx;
	    height: 27rpx;
	}
	
	.search-input input {
	    background: #f4f4f4;
	    height: 50rpx;
	    line-height: 50rpx;
	    width: 680rpx;
	    padding-left: 85rpx;
	    box-sizing: border-box;
	}
	
	.search-cond .title {
	    position: relative;
	    height: 84rpx;
	}
	
	.search-cond .title .line {
	    height: 2rpx;
	    background: #999;
	    width: 660rpx;
	    position: absolute;
	    top: 42rpx;
	    left: 45rpx;
	}
	
	.search-cond .title .txt {
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    background: #fff;
	    width: 206rpx;
	    height: 30rpx;
	    transform: translate(-50%,-50%);
	    padding-left: 20rpx;
	    font-size: 25rpx;
	    color: #666;
	}
	
	.search-cond .search-cont {
	    padding: 0 35rpx;
	    overflow: hidden;
	}
	
	.search-cond .search-cont view {
	    color: #f6819e;
	    border: 1rpx solid #f6819e;
	    width: 160rpx;
	    height: 54rpx;
	    box-sizing: border-box;
	    text-align: center;
	    margin: 0 10rpx 20rpx 0;
	    float: left;
	    border-radius: 27rpx;
	    font-size: 25rpx;
	    line-height: 50rpx;
	}
	
	.search-his .title {
	    font-size: 25rpx;
	    color: #666;
	    padding-left: 35rpx;
	    height: 70rpx;
	    line-height: 70rpx;
	    background: #f4f4f4;
	}
	
	.search-his .list .list-box {
	    border-bottom: 1rpx solid #e4e4e4;
	    padding: 25rpx 35rpx;
	    overflow: hidden;
	}
	
	.search-his .list .list-box image {
	    width: 25rpx;
	    height: 25rpx;
	    float: left;
	    margin: 7rpx 15rpx 0 0;
	}
	
	.search-his .list .list-box view {
	    font-size: 29rpx;
	    color: #999;
	    line-height: 35rpx;
	    float: left;
	}
	
</style>