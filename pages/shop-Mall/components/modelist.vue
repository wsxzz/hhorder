<template>
	<view>
		<view v-if="list.length>0" class="newcarlist_f pad">
					<view v-for="(item,i) in list" :key="i" @click="godetails(item.goodsID)">
						<view class="uni-flex uni-row newcarcell_f">
						<view class="uni-flex marR10" style="width:212upx;height: 158upx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
							<img v-if="item.goodpic!==''&& item.goodpic!==null" style="width:100% ;" :src="item.goodpic">
							<image v-else :src="goodurl"  mode="widthFix"></image>
						</view>
						<view class="carinfo" style="width:446upx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: flex-start;align-items: flex-start;">
							<view v-if="IsVehicle" class="proname">
								{{item.OFFICIA_LNAME}}
							</view>
							<view v-else class="proname">
								{{item.OFFICEName}}
							</view>
							<view class="proprice">
								<text class="icon-money">￥</text>
								{{item.Unitprice}}
								<text class="icon-wanyuan">万</text>
							</view>
							<view class="pronum">
								0人付款
							</view>
						</view>
					</view>
					
					</view>
					
				</view>
				<!-- 暂无数据 -->
				<view v-else class="">
					<no-data :nodata='nodata'/>
				</view>
	</view>
	
	
	
</template>

<script>
		export default {
			props: {
				list: {//
					type: Array,
					default: []
				},
				IsVehicle: {//默认是整车
					type: Boolean,
					default: true
				}
			},
			data() {
				return {
					goodurl:'../../../static/images/car.png',
					nodata:true,//暂时无数据
				}
			},
			created() {
			},
			methods: {
				godetails(id){
					console.log(id)
					if(this.$store.state.shop=="Vehicle"){
						uni.navigateTo({
						    url: '../selColor/selColor?goodsID='+id
						});
					}else{
						uni.navigateTo({
						    url: '../detailed/partsdetails?goodsID='+id
						});
					}
				},
			}
		}
	</script>

<style lang="scss">
	
</style>
