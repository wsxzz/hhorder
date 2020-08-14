<template>
	<view class="shop-Mall">
		<view class="carlist">
			<!-- 搜索 -->
			<uni-search-bar radius="100" placeholder="请输入" clearButton="auto" cancelButton="auto" @confirm="search" />
			<!-- 筛选 -->
			<view class="sortFilter">
				<view class="screen-bd">
					<view class="screen-bd-in pad">
						<view class="row ">
							<view class="col-2">
								<text class="screen marR40" @click.stop="screenConditionClick('displacement')" :class="{'on': screenCondition==='displacement'}">
									排量 <text class="iconfont"> {{screenCondition==='displacement' ? "&#xe74b;" : "&#xe760;"}} </text>
								</text>
								<text class="screen" @click.stop="screenConditionClick('salesVolume')" :class="{'on': screenCondition==='salesVolume'}">
									销量<text class="iconfont">{{screenCondition==='salesVolume' ? "&#xe74b;" : "&#xe760;"}} </text>
								</text>
							</view>
						</view>
						<view class="lists" v-show="screenCondition==='displacement'">
							<view class="list-cell center" @click.stop="displacementSort('asce')">
								排量由低到高
							</view>
							<view class="list-cell center" @click.stop="displacementSort('desc')">
								排量由高到低
							</view>
						</view>

						<view class="lists" v-show="screenCondition==='salesVolume'">
							<view class="list-cell center" @click.stop="salesVolumeSort('asce')">
								销量由低到高
							</view>
							<view class="list-cell center" @click.stop="salesVolumeSort('desc')">
								销量由高到低
							</view>
						</view>

					</view>
					<view class="mask" v-show="maskShow" @click="close"></view>
				</view>
				<view class="screen-condition">
					{{screenConditionTxt}}
				</view>
			</view>
			
			<modelist :IsVehicle="IsVehicle" :list="list"/>
		</view>
	</view>
	</view>
</template>

<script>
	import modelist from '../components/modelist.vue' //列表
	export default {
		components: {
			modelist
		},
		data() {
			return {
				IsVehicle:true,//是否是整车
				screenCondition: '',
				maskShow: false,
				screenConditionTxt: '', //筛选之后的条件文本
				currentCondition: "",
				list:[]
			}
		},
		onLoad(ope) {
			if(ope.Vehicle=='true'){//如果是整车
				this.$store.state.shop = 'Vehicle'//非整车
				this.IsVehicle = true
				uni.setStorageSync('myseriesFID', ope.id);//把车系的fid带过来，调用车型的接口
				// uni.setStorageSync('myseriesFID', 'nzIAAAAFeOla2qc+');//测试
			}else{//如果是配件
				this.$store.state.shop = 'NoVehicle'//非整车
				this.IsVehicle = false
				uni.setStorageSync('ThirdType', ope.type);//缓存第三级type，用途获取第四级
				// uni.setStorageSync('ThirdType', 'C.02.04');//测试
				// //修改标题
				uni.setNavigationBarTitle({
					title: '精品类'
				})
			}
			
		},
		created() {
			if(this.$store.state.shop == 'Vehicle'){
				this.getAutoTypeListbySeriesFID(uni.getStorageSync('myseriesFID'))//根据车系获取车型列表
			}else{
				this.getGoodsType(uni.getStorageSync('ThirdType'))//根据第三级获取第四级
			}
			
		},
		methods: {
			async getAutoTypeListbySeriesFID(SeriesFID){//把车系的fid带过来，调用车型的接口
				var that = this;
				uni.showLoading({
					mask:true,
				    title: '加载中'
				});
				let param =JSON.stringify({ SeriesFID:SeriesFID })
				await that.$api.HHPlatForm_P_GetAutoTypeListbySeriesFID(param).then(res => {
					 that.list = res
					 uni.hideLoading();
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			//通过第三级获取第四级
			async getGoodsType(Type){
				
				let that = this;
				let param = JSON.stringify({ Type: Type})
				await that.$api.HHPlatForm_P_GetGoodsType(param).then(res => {
					if(res==null||res==""||res==[]){//如果第四级返回空
						that.list = []
					}else{
						//修改标题
							uni.setNavigationBarTitle({
								title: res[0].APP_FName
							})
						//查询列表（根据四级+组织fid）
							 that.getGoodsList(that.$store.state.orgID,res[0].EAS_FID)//配件
					} 
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			async getGoodsList(OrgID,Type){//获取某组织+四级分类下对应所有商品
				var that = this;
				uni.showLoading({
					mask:true,
				    title: '加载中'
				});
				let param =JSON.stringify({ OrgID:OrgID, Type4: Type})
				await that.$api.HHPlatForm_P_GetGoodsList(param).then(res => {
					// debugger
					// 获得数据 
					console.log("获取某组织+四级分类下对应所有商品"+JSON.stringify(res))
						that.list = res
						
					 uni.hideLoading();
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			
			
			//点击页面任意地方，初始化某些状态
			initpage() {
				this.screenCondition = "";
			},
			//关闭价格和品牌筛选框和遮罩
			close() {
				this.maskShow = false;
				this.screenCondition = "";
			},
			//品牌与价格条件筛选
			screenConditionClick(e) {
				this.maskShow = true; //遮罩层
				this.screenCondition = e;
			},
			//排量排序
			displacementSort(e) {
				if (e == 'asce') { //升序
					console.log('升序')
					this.screenConditionTxt = '排量由低到高'
				} else if (e == 'desc') { //降序
					console.log('降序')
					this.screenConditionTxt = '排量由高到低'
				}
				this.close(); //关闭弹框和筛选框
			},
			//销量排序
			salesVolumeSort(e) {
				if (e == 'asce') { //升序
					this.screenConditionTxt = '销量由低到高'
				} else if (e == 'desc') { //降序
					this.screenConditionTxt = '销量由高到低'
				}
				this.close(); //关闭弹框和筛选框
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F9F9F9;
	}
</style>
