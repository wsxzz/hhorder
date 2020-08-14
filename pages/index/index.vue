<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view @click="addorder">
			新增订单
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
		created() {
			// this.Getsell_kind();
		},//
		methods: {
			// async Getsell_kind(){
			// 	let param = {"codes":["sell_kind"]}
			// 	await this.$api.HHPF_P_GetBaseEnumByCodes(param).then(res => {
			// 		// 获得数据 
			// 		console.log("获取客户档案"+res) 
			// 	 }).catch(res => {
			// 		 console.log(res)
			// 	 　　// 失败进行的操作
			// 	 })
			// },
			addorder(){
				uni.navigateTo({
				    url: '../autoSalesOrder/autoSalesOrder'
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
