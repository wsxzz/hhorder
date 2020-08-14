<template>
	<view class="">
		<view class="newcarlist_f pad">
					<view  v-for="(item,i) in list" :key="i" >
						<navigator class="uni-flex uni-row newcarcell_f"  :url="'../detailed/detailed?id='+i"  hover-class="navigator-hover">
						<view class="uni-flex marR10" style="width:212upx;height: 158upx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
							<image :src="url+item.imgURL"  mode="widthFix"></image>
							<!-- <img src="../../../../assets/images/car.jpg" class="proImage" /> -->
						</view>
						<view class="carinfo" style="width:446upx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: flex-start;align-items: flex-start;">
							<view class="proname">
								{{item.name}}
							</view>
							<view class="proprice">
								<text class="icon-money">￥</text>
								{{item.price}}
								<text class="icon-wanyuan">万</text>
							</view>
							<view class="pronum">
								{{item.peplenum}}人付款
							</view>
						</view>
					</navigator>
					
					</view>
					
				</view>
	</view>
	
</template>

<script>
	// import carBrand from '@/utils/mock/carBrand.json'
		export default {
			
			data() {
				return {
					url:"../../../static/images/",
				list:[
					{
						"name":"2020款 改款 1.6L XE 手动舒享版两排效果1",
						"imgURL":"car2.jpg",
						"price":"10.9",
						"peplenum":"2000"
					},{
						"name":"2020款 改款 1.6L XE 手动舒享版两排效果2",
						"imgURL":"car.jpg",
						"price":"10.9",
						"peplenum":"2000"
					},{
						"name":"2020款 改款 1.6L XE 手动舒享版两排效果3",
						"imgURL":"car.jpg",
						"price":"10.9",
						"peplenum":"2000"
					},
					{
						"name":"2020款 改款 1.6L XE 手动舒享版两排效果4",
						"imgURL":"car2.jpg",
						"price":"10.9",
						"peplenum":"2000"
					},
				]
				}
			},
			created() {
				// this.brandlist = carBrand.data//获取品牌列表
			},
			methods: {
				selModelList(id){
					console.log(id);
				}
			}
		}
	</script>

<style lang="scss">
	
</style>
