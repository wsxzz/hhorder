<template>
	<view class="no-data" v-if="nodata">
		<image class="no-data-img" src="../../static/images/icons/bg_No_record.png" mode="widthFix"></image>
		<view class="no-data-text">
			暂无记录
		</view>
	</view>
</template>

<script>
	/**
	 * no-data 暂无数据
	 * @description 列表没有数据时显示
	 * @nodata = [true|false] 是否显示
	 * @example <no-data text="true"></no-data>
	 */
	export default {
		name: 'no-data',
		props: {
			nodata: {
				type: Boolean,
				default: true
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
.no-data{
	padding-top: 314upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	align-items: center;
	.no-data-img{
		display: block;
		width: 400upx;
	}
	.no-data-text{
		margin-top: 12upx;
		color: #70767F;
	}
}
</style>
