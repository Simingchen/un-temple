<template>
	<view>
		<view class="panel">
		    <textarea class="textarea" :value="mes" placeholder='请留下您的宝贵意见和建议，我们将努力改进' maxlength='500'></textarea>
		</view>
		<view class="panel">
		    <input class="input" type="number" :value="phone" placeholder='请留下您的手机号码，以便我们回复您' maxlength='11'></input>
		</view>
		<button type="button" class="btn save-btn" @click="saveMsg">提交</button>
	</view>
</template>
<script>
	const util = require('@/utils/util.js');
	export default {
		data() {
			return {
				mes: '',
				phone: '',
			}
		},
		methods: {
			saveMsg () {
			    if (!this.mes) {
			        uni.showToast({
			            icon: "none",
			            title: "请留下您的宝贵意见和建议，我们将努力改进"
			        })
			        return false;
			    }
			    if (!this.phone) {
			        uni.showToast({
			            icon: "none",
			            title: "请留下你的手机号"
			        })
			        return false;
			    }
			    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
			    if (!phoneReg.test(this.phone)) {
			        uni.showToast({
			            icon: "none",
			            title: "请正确填写手机号码"
			        })
			        return false;
			    }
			
			    var that = this;
			    var url = "getAddress.ashx"
			    var params = {};
			    params.RID = id;
			    util.POST({
			        url: url,
			        params: JSON.stringify(params),
			        success: function (res) {
			            var oData = res.data[0]
			            if (oData.Status == 200) {
			                var data = oData.Data[0];
			                that.setData({
			                    user: data,
			                    region: [data.Province, data.City, data.County]
			                })
			            } else {
			                uni.showToast({
			                    icon: 'none',
			                    title: oData.Msg,
			                    duration: 1000
			                })
			            }
			        }
			    })
			}
		}
	}
</script>
<style lang="scss">
	page{
		background:#fbe5c3;
	}
	.panel{
		margin: 50rpx 20rpx;
	    padding: 30rpx;
	}
	.textarea{
	    width:100%;
	    height:300rpx;
	}
	.input{
	    width: 100%;
	    height:30rpx;
	}
	.save-btn{
	    margin-top:80rpx;   
	}
</style>