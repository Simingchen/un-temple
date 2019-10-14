<template>
	<view class='ban'>
		<swiper class="top-swiper" :autoplay="true" :indicator-dots="true" indicator-active-color="#fff"
		 indicator-color='rgba(255,255,255, .5)' duration="200" :circular="true">
			<swiper-item class="item" v-for="(item,index) in topBanner.list" :key="index">
				<image :src="item.File" class="slide-image"></image>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				topBanner: {
				    list: [
				        {
				            "ID": "b9358e50-62a9-45ed-93c3-ba204fc87c0e",
				            "File": "http://img.honghuo777.com/UploadFile/banner/20180816170946_0714.png"
				        },
				        {
				            "ID": "53149bcb-b1f7-4d3b-a686-f4314da66ab7",
				            "File": "http://img.honghuo777.com/UploadFile/banner/20180816153438_1950.jpeg"
				        },
				        {
				            "ID": "cc8ddacd-7b5d-44e3-8154-38f6c745ecd3",
				            "File": "http://img.honghuo777.com/UploadFile/banner/20180816143009_2098.jpeg"
				        }
				    ]
				},
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>
<style lang="scss">
	.ban image, .ban {
	    width: 750rpx;
	    height: 360rpx;
	    overflow: hidden;
	}
	.top-swiper{
	    height:360rpx;
	}
</style>
