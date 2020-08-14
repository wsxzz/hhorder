<template>
	<view class="shop-Mall">
		<!-- 搜索 -->
		<uni-search-bar radius="100" placeholder="请输入" clearButton="auto" cancelButton="auto" @confirm="search" />
		<!-- 滑动筛选 -->
		<view class="screen-bd">
					<view class="screen-bd-in">
						<scroll-view v-if="titles.length>0" class="screen-lists"  scroll-x="true">
							<text class="screen-list-cell"   v-for="(item ,i) in titles" :key="i"  @click="partsSel(item.APP_FNumber)" :class="{'screen-list-cell-on': partsSels===item.APP_FNumber}">{{item.APP_FName}}</text>
						</scroll-view>
					</view>
				</view>
		<view class="goods-lists">
			<view v-for="(item,index) in titles" :key="index">
				<view v-show="partsSels===item.APP_FNumber">
					<view v-if="index==0">
						<!-- 热门推荐 -->
						<view class="goods-titles pad">热门推荐</view>
						<carlist :list="list"/>
					</view>
					<view v-else>
						<view v-for="(itme,type_2_i) in type_23" :key="type_2_i">
							<view  class="goods-titles pad" @click="getthird(itme.APP_FNumber)">{{itme.APP_FName}}</view>
							<view class="newcarlist_c">
								<view class="uni-gri-s">
										 <view class="uni-grid-item-s"  v-for="(itme,type_3_i) in itme.children" :key="type_3_i" @click="tomodelist(itme.APP_FNumber)">
											<image class="proImage"  :src="imgURL"  mode="widthFix"></image>
											<view class="carinfo">
												<view class="proname">
													{{itme.APP_FName}}
												</view>
											</view>
										</view>
								</view>
							</view>
						</view>
						
						
						<!--  -->
						<!-- <view class="">
							
						</view> -->
					</view>
					
				</view>
			</view>
			
			
			
		</view>

	</view>
</template>

<script>
	import carlist from './components/carlist.vue' //列表
	export default {
		components: {
			carlist
		},
		data() {
			return {
				list:[],
				imgURL:"../../static/images/peijian.png",
				titles:[],//一级商品分类
				type_23:[],//二级商品分类
				partsSels: '', //整车配件选择
				vehicleDisabled: true, //整车可选，配件置灰
			}
		},
		created() {
			var that = this;
			that.getGoodsOneType();//获取一级商品分类
		},
		methods: {
			async getGoodsOneType(){
				let self_ = this;
				console.log(self_.$store.state.shop)
				uni.showLoading({
					mask:true,
				    title: '加载中'
				});
				await self_.$api.HHPlatForm_P_GetGoodsOneType().then(res => {
					// 获得数据 
					let arr = [];
					if(self_.$store.state.shop=="Vehicle"){
						res.forEach(x=>{
							// if(x.APP_FName=="整车"){
								arr.push({"APP_FNumber":x.APP_FNumber,"APP_FName":x.APP_FName})
							// }
						})
						
						self_.list = [{//默认整车只有精致新车
							"name":"精致新车",
							"imgURL":"../../static/images/car2.jpg"
						}]
						self_.partsSels = arr[0].APP_FNumber
					}else if(self_.$store.state.shop=="NoVehicle"){
						res.forEach(x=>{
							if(x.APP_FName!=="整车"){
								arr.push({"APP_FNumber":x.APP_FNumber,"APP_FName":x.APP_FName})
							}
						})
						self_.partsSel(arr[0].APP_FNumber);
					}else{
						arr = res
					}
					self_.titles = arr
					 uni.hideLoading();
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			//通过一级获取二级—+三级
			async getGoods23TypeByOneType(type){
				// debugger
						uni.showLoading({
							mask:true,
							title: '加载中'
						});
							let param = { Type:type }
							await this.$api.HHPlatForm_P_GetGoods23TypeByOneType(param).then(res => {
								// 获得数据 
								let arr = []
								for(let x of res) {
									if(x.Type=='2'){
										arr.push({APP_FID:x.APP_FID,APP_FName:x.APP_FName, APP_FNumber
			: x.APP_FNumber,Type:x.Type,children:[]});
									}
									if(x.Type=='3'){
										for(let y of arr) {
											if(y.APP_FNumber.split('.')[1]==x.APP_FNumber.split('.')[1]){
												
												y.children.push({APP_FID:x.APP_FID,APP_FName:x.APP_FName, APP_FNumber: x.APP_FNumber,Type:x.Type})
											}
										}
									}
									
								}
								this.type_23 = arr;
								uni.hideLoading();
							 }).catch(res => {
								 console.log(res)
							 　　// 失败进行的操作
							 })
			},
			// 跳转配件列表
			tomodelist(Type){
				uni.navigateTo({
				    url: './modelist/modelist?type='+Type+'&Vehicle=false'
				});
			},
			search(res) {
				uni.showToast({
					title: '目前只有精致新车',
					icon: 'none'
				})
			},
			//整车配件选择
			partsSel(e) {
				this.partsSels = e;
				this.getGoods23TypeByOneType(e);
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F9F9F9;
	}
	.screen-lists{
		width: 100%;
		white-space: nowrap;
	}
	.screen-lists2{
		width: 100%;
		height: 40px;
		white-space: nowrap;
	}
	.screen-list-cell2{
		width: 150px;
		height: 40px;
		line-height: 40px;
		display: inline-block;
		text-align: center;
	}
</style>
