<template>
	<view>
		<view class="related-old-order">
			<view class="headtitle row">
				<view class="headtitleL col-2">
					关联原有订单
				</view>
				<view class="col-2 right">
					<image class="icon-qiehuan" src="../../../static/images/icons/icon-Line-qiehuan.png" mode="widthFix" @click="godetils(orderDetail.basic[0].ID)"></image>
				</view>
			</view>
			<view class="old-order-list pad">
				<view class="cell-1">
					<text class="ordernum">{{orderDetail.basic[0].ORDER_ID}}</text>
					<text class="orderstate">{{states[orderDetail.basic[0].STATUS]}}</text>
				</view>
				<view class="name">
					{{orderDetail.entry1[0].BD_NAME}}
				</view>
				<view class="carinfo">
					{{orderDetail.entry3[0].OFFICIA_LNAME}}
				</view>
				<view class="shopnums">
					<text class="nums">
						商品数量
						<text class="num">1</text>
					</text>
					<text class="date">{{orderDetail.basic[0].ORDER_TIME}}</text>
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
				orderDetail:{}
			},
			data() {
				return {
					states:['未提交','审批中','已审核', '驳回'],//状态
				}
			},
			methods: {
				godetils(id){
					// 跳转详情
					uni.navigateTo({
					    url: "../autoSalesOrderDetail/autoSalesOrderDetail?id="+id+"&isReview='false'",
					});
				}
			}
		}
	</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F5;
	}
</style>