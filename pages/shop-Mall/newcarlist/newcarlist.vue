<template>
	<view>
	<view class="shop-Mall" :class="{'bodyw100':maskShow }">
		<view class="classification">
			<!-- 搜索 -->
			<uni-search-bar radius="100" placeholder="请输入" clearButton="auto" cancelButton="auto" @confirm="search" />
			<!-- 筛选 -->
			<view class="sortFilter">
				<view class="screen-bd ">
					<view class="screen-bd-in pad">
						<view class="row ">
							<view class="col-2">
								<text class="screen marR40" @click.stop="screenConditionClick('brand')" :class="{'on': screenCondition==='brand'}">
									品牌 <text class="iconfont"> {{screenCondition==='brand' ? "&#xe74b;" : "&#xe760;"}} </text>
								</text>
								<text class="screen" @click.stop="screenConditionClick('price')" :class="{'on': screenCondition==='price'}">
									价格<text class="iconfont">{{screenCondition==='price' ? "&#xe74b;" : "&#xe760;"}} </text>
								</text>
							</view>
						</view>
					<scroll-view class="listsscroll" scroll-y="true">
						<view class="lists" v-show="screenCondition==='brand'">
							<!-- 车系，车型，返回初筛选条件-->
							<view class="list-cell" v-show="currentCondition!=''">
								<text class="iconfont">&#xe634;</text>
								<text class="currentConditionT" @click.stop="goback">{{currentCondition}}</text>
							</view>
							<view class="list-cell row" v-for="(item,i) in list" :key="i">
								<view v-if="!ISmodel" class="txt" @click.stop="goNextCondition(item.FID)">
									{{item.NAME}}
								</view>
								<view v-if="ISmodel" class="txt" @click.stop="goNextCondition(item.goodsID)">
									{{item.OFFICIA_LNAME}}
								</view>
								<view class="iconbtn right"><text class="iconfont">&#xe606;</text> </view>
							</view>
						</view>
					</scroll-view>
						<view class="lists" v-show="screenCondition==='price'">
							<view class="list-cell center" @click.stop="priceSort('asce')">
								价格由低到高
							</view>
							<view class="list-cell center" @click.stop="priceSort('desc')">
								价格由高到低
							</view>
						</view>

					</view>
					<view class="mask" v-show="maskShow" @click="close"></view>
				</view>

				<view class="screen-condition">
					{{screenConditionTxt}}
				</view>
			</view>

			<!-- 新车分类 -->
			<newcarlist/>
		</view>

	</view>
	</view>
</template>

<script>
	import newcarlist from '../components/newcarlist.vue' //列表
	export default {
		components: {
			newcarlist
		},
		data() {
			return {
				screenCondition: '',
				maskShow: false,
				screenConditionTxt: '', //筛选之后的条件文本
				currentCondition: "",
				ISmodel:false,//是否是车型
				list: [], //列表
				brandlist: [], //品牌列表
				Serieslist: [], //车系列表
				typeList: [], //车型列表
				brandId: '', //当前选择的品牌id(用来暂时存储品牌id)
				carSeriesId: '', //当前选择的车系id(用来暂时存储车系id)
			}
		},
		created() {
			this.GetAllBrand();//获取所有品牌
		},
		methods: {
			//获取所有品牌
			async GetAllBrand(){
				await this.$api.HHPF_P_GetAllBrand().then(res => {
					// 获得数据 
					this.brandlist = res//品牌
					this.list = res//展示列表
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			//根据品牌获取对应所有车系
			async GetSeriesByBrand(BrandFID){
				let param = JSON.stringify({ BrandFID: BrandFID })
				await this.$api.HHPF_P_GetSeriesByBrand(param).then(res => {
					// 获得数据 
					this.Serieslist = res//车系
					this.list = res//展示列表
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			// 车系id获取所有车型
			async GetAutoTypeListbySeriesFID(SeriesFID){
				let param =  JSON.stringify({ SeriesFID:SeriesFID})
				await this.$api.HHPlatForm_P_GetAutoTypeListbySeriesFID(param).then(res => {
					// 获得数据 
					this.list = res//展示列表
					this.typeList = res//车型
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
				this.ISmodel = false;
				this.list = this.brandlist;
				this.Serieslist=[]; //车系列表
				this.typeList=[];//车型列表
				this.screenCondition = ""
			},
			//品牌与价格条件筛选
			screenConditionClick(e) {
				this.maskShow = true; //遮罩层
				this.screenCondition = e;
			},
			//价格排序
			priceSort(e) {
				if (e == 'asce') { //升序
					console.log('升序')
					this.screenConditionTxt = '价格由低到高'
				} else if (e == 'desc') { //降序
					console.log('降序')
					this.screenConditionTxt = '价格由高到低'
				}
				this.close(); //关闭弹框和筛选框
			},
			//跳转车系
			goNextCondition(id) {
				let that = this;
				// debugger
				let arr = that.list;
				if (that.currentCondition == "") {
					that.currentCondition = '车系';
					//查车系
					that.GetSeriesByBrand(id);
					that.ISmodel = false//是否是车型
				} else if (that.currentCondition == '车系') {
					that.currentCondition = '车型';
					//查车型
					that.GetAutoTypeListbySeriesFID(id);
					that.ISmodel = true//是否是车型
				} else if (that.currentCondition == '车型') {
					that.currentCondition = "";
					that.close(); //关闭弹框和筛选框
					// 跳转到车型详情
					debugger
					uni.navigateTo({
					    url: '../detailed/detailed?goodsID='+id
					});
					
				}
			},
			//返回上一个筛选列表
			goback() {
				let that = this;
				if (that.currentCondition == '车系') {
					that.currentCondition = '' //返回到品牌
					that.list = that.brandlist
					that.ISmodel = false//是否是车型
				} else if (that.currentCondition == '车型') {
					that.currentCondition = '车系' //返回到车系
					that.list = that.Serieslist
					that.ISmodel = false//是否是车型
				}
			},
			//搜索
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
	.bodyw100{
		width: 100%;
		height:1200upx;
		overflow: hidden;
	}
	.listsscroll{
		max-height: 600upx;
	}
</style>
