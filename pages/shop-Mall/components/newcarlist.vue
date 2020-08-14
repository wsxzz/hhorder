<template>
	<view class="">
		<view class="newcarlist_s" style="display: block;">
			<view class="uni-gri-s" v-if="datalist.length>0">
				<view class="uni-grid-item-s"  v-for="(item,i) in datalist" :key="i" @click="selModelList(item.FID)">
					<image class="proImage" src="../../../static/images/car.png"  mode="widthFix"></image>
					<view class="carinfo">
						<view class="proname">
							{{item.NAME}}
						</view>
						<view class="proprice">
							<text class="icon-money">￥</text>
							0
							<text class="icon-wanyuan">万</text>
						</view>
						<view class="pronum">
							0人付款
						</view>
					</view>
					<!-- </navigator> -->
				</view>	
			</view>
			<view v-else>
				暂无数据
			</view>
		</view>
	</view>
	
</template>

<script>
	/*
	*
	 * baseinfo 订单基本信息
	 * @description 订单基本信息组件
	 * @nodata = [true|false] 是否显示
	 * @example <no-data text="true"></no-data>
	 */
	
		export default {
			props: {
			},  
			data() {
				return {
					datalist:[]
				}
			},
			created() {
				this.getBrandInfoByOrgID(this.$store.state.orgID);//获取组织旗下品牌信息
				// this.getAutoTypeListBywh(uni.getStorageSync('orgId'));
			},
			methods: {
				async getBrandInfoByOrgID(orgId){
					let param = JSON.stringify({ OrgID: orgId })
					await this.$api.HHPlatForm_P_GetBrandInfoByOrgID(param).then(res => {
						// 获得数据 
						this.getSeriesByBrand(res[0].FID);//根据品牌获取对应所有车系
					 }).catch(res => {
						 console.log(res)
					 　　// 失败进行的操作
					 })
				},
				async getSeriesByBrand(BrandFID){
					let param = JSON.stringify({ BrandFID: BrandFID })
					await this.$api.HHPF_P_GetSeriesByBrand(param).then(res => {
						// 获得数据 
						// console.log("根据品牌获取对应所有车系"+JSON.stringify(res))
						this.datalist = res
					 }).catch(res => {
						 console.log(res)
					 　　// 失败进行的操作
					 })
				},
				selModelList(id){//跳转到车型
					uni.navigateTo({
					    url: '../modelist/modelist?id='+id+'&Vehicle=true'
					});
				},
				// //通过名称或编码搜索某组织下的车型商品
				// async getAutoTypeListBywh(orgId){
				// 	let param = JSON.stringify({ OrgID: orgId, where: ""})
				// 	await this.$api.HHPlatForm_P_GetAutoTypeListBywh(param).then(res => {
				// 		// 获得数据 
				// 		// console.log("通过名称或编码搜索某组织下的车型商品"+JSON.stringify(res))
				// 		this.datalist = res
				// 	 }).catch(res => {
				// 		 console.log(res)
				// 	 　　// 失败进行的操作
				// 	 })
				// },
				
				
			}
		}
	</script>

<style lang="scss">
	
</style>
