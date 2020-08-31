<template>
	<view class="">
		<view class="newcarlist_c">
			<view class="uni-gri-s"  v-for="(item,i) in list" :key="i" >
				 <navigator url="./newcarlist/newcarlist" hover-class="navigator-hover">
					 <view class="uni-grid-item-s">
						<image class="proImage"  :src="item.imgURL"  mode="widthFix"></image>
						<view class="carinfo">
							<view class="proname">
								{{item.name}}
							</view>
						</view>
					</view>
				 </navigator>
			</view>
		</view>
		
	</view>
	
</template>

<script>
		export default {
			props:{
				list: {//商品是否已经选好
					type: Array,
					default: []
				},
			},
			data() {
				return {
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
