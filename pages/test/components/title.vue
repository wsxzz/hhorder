<template>
	<view>
		<view class="blueline-title row">
			<view class="col-2 blueline-infor">
				{{title}}
				<text class="blueline"></text>
			</view>
			<view class="col-2 right" v-if="clickTag">
				<image @click="goTo" class="blueline-icons" src="../../../static/images/icons/icon-public-more2.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {//
				type: String,
				default:""
			},
			clickTag:{
				type: Boolean,
				default:false
			}
		},  
		data() {
			return {
			}
		},
		methods: {
			goTo(){
				this.$emit('gotowhere')
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>