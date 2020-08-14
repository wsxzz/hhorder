<template>
	<view>
		<view v-if="hasrelatedOldOrder" class="related-old-order">
			<view class="headtitle row">
				<view class="headtitleL col-2">
					关联原有订单
				</view>
				<view class="col-2 right">
					<image class="icon-qiehuan" src="../../../static/images/icons/icon-Line-qiehuan.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="old-order-list pad">
				<view class="cell-1">
					<text class="ordernum">OS2018090200001</text>
					<text class="orderstate">已完成</text>
				</view>
				<view class="name">
					谢宝新
				</view>
				<view class="carinfo">
					蒙迪欧 插电混动2.0L E-CVT智尚版2018款
				</view>
				<view class="shopnums">
					<text class="nums">
						商品数量
						<text class="num">3</text>
					</text>
					<text class="date">2019-2-15 10:30:09</text>
				</view>
			</view>
		</view>
		
		
		
		
	</view>
</template>

<script>
	/*
	*
	 * relatedOldOrder 关联原有订单
	 * @description 关联原有订单
	 * @nodata = [true|false] 是否显示
	 * @example <no-data text="true"></no-data>
	 */
		export default {
			name: 'relatedOldOrder',
			props: {
				hasrelatedOldOrder: {
					type: Boolean,
					default: false
				}
			},
			data() {
				return {
					
				}
			},
			methods: {
			
			}
		}
	</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F5;
	}
</style>