<template>
	<view class="totalBD">
		<view class="total right">
			小计：<text class="txt">{{totalPrice}}元</text>
		</view>
	</view>
</template>

<script>
		export default {
			props: {
				totalPrice:{
					type: Number,
					default:0
				}
			},
			data() {
				return {
					}
			},
			
			methods:{
				
			}
		}
</script>

<style>
</style>
