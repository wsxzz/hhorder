<template>
	<view class="custom-header takebar">
		<view class="consultants">
			<!-- 顾问列表 -->
			<view class="uniyy-page-head">
				<hx-navbar class="hx-navbarr" :back="false" :fixed="true" :left-slot="false" :right-slot="false">
					<view class="ctn5" @click="gosearch">
						<uni-icons type="search" size="22" color="#666666" />
						<text class="txt">输入搜索关键词</text>
					</view>
					<view class="main-right add center" @click="add=!add">
						<view class="iconfont">&#xe66c;</view>

					</view>
					<!-- 下拉弹框 -->
					<view v-show="add" class="dropdown">
						<view class="options" @click="gosubmitorder">
							零售
						</view>
						<view class="options" @click="goCollection">
							收款申请单
						</view>
						<view class="options" @click="goUsedcarevaluation">
							二手车评估申请单
						</view>
					</view>
				</hx-navbar>
			</view>
			<!-- 顾问列表 -->
			<consultantsLists :consultantslists="consultantslists" :loadAll="loadAll" :NODATA="false"/>
			<!-- 测试 -->
			<view class="row" style="margin-top: 100upx;">
				<view class="col-2" @click="refresh">
					<button type="default">刷新</button>
				</view>
				<view class="col-2 center" @click="paging">
					<button type="default">下一页</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import consultantsLists from './components/consultants-lists.vue' //列表
	import screen from './components/screen.vue' //筛选框
	import fn from  '../../common/filter.js' //数据
	
	export default {
		components: {
			consultantsLists,
			screen,
		},
		data() {
			return {
				add: false, //头部的add按钮
				subStatus: '', //提交与已提交的状态
				screendates: {}, //筛选条件
				currentTabIndex: 1,
				loadAll:false,//数据加载完毕
				NODATA:false,//数据加载完毕
				consultantslists:[],//零售数据
				param:{
					  "start_date":"",
					    "end_date":"",
					    "order_from":0,
					    "order_kind":0,
					    "order_channel":0,
					    "customer_name":"",
					    "customer_phone":"",
					    "model_id":0,
					    "chassis_num":"",
					    "adviser":[],
					    "status":0,
					    "pageIndex": 1,
					    "pageSize": 4
				},
				loadFlag:true,
				totlePage:0,//总页数
				totle:0,//总数
			}
		},
		onShow() {
			fn.tabbarRequired('true');//该页面是否需要tabbar
		},
		created() {
			this.param.adviser[0] = this.$store.state.adviser//顾问id
			this.GetAutoSalesOrderList()
		},
		methods: {
			
			// 提交与已提交状态切换,重新触发列表更新
			changeState(state) {
				this.subStatus = state;
				uni.showToast({
					icon: 'loading',
					duration: 2000
				});
			},
			//获取筛选框的值，重新触发列表更新
			comfirm(val) {
				console.log(val)
				this.screendates = val;
				uni.showToast({
					icon: 'loading',
					duration: 2000
				});
			},
			//新增订单
			gosubmitorder() {
				//对订单进行操作
				this.$store.state.submitorderOps = {
					"oldOrderId": "", //关联订单的id
					"edit": "提交" //订单的具体操作【提交/升级/变更/赠送等】
				}
				this.$store.state.shopId = "";
				uni.navigateTo({
					url: "./autoSalesOrder/autoSalesOrder",
				});
				this.add = false;
			},
			//新增首款申请单
			goCollection() {
				// uni.navigateTo({
				// 	url: "../collectionApplication/index"
				// });
				
				this.add = false;
			},
			//新增二手车评估
			goUsedcarevaluation() {
				// uni.navigateTo({
				// 	url: "../usedCar/purchaseRequest"
				// });
				this.add = false;
			},
			//去搜索页面
			gosearch() {
				uni.navigateTo({
					url: 'search/search?role=3'
				});
			},
			//跳转订单详情页面
			gocustodetail(id) {
				
				if(typeof(id)=="number"){
				console.log(id+"是什么类型的");
				    
				
				}
				uni.navigateTo({
					url: "./autoSalesOrderDetail/autoSalesOrderDetail?id=" + id + "&isReview='false'"
				});
			},
			//获取订单列表
			async GetAutoSalesOrderList () {
				// debugger
				uni.showLoading({
				    title: '加载中'
				});
				let param = this.param;
				await this.$api.HHPF_P_GetAutoSalesOrderList(param).then(res => {
					if(res.Data.list.length>0){
						this.consultantslists = res.Data.list
						this.NODATA = false
						this.loadFlag = true
						
						uni.startPullDownRefresh();//停止刷新
						uni.hideLoading();//停止加载中
					}else{
						this.NODATA = true
						uni.hideLoading();//停止加载中
					}
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			//刷新数据（回到最初数据）
			refresh(){
				this.param.pageIndex = 1;//回到第一页
				this.GetAutoSalesOrderList();
			},
			//数据分页
			paging(){
				if(this.loadFlag){
					this.param.pageIndex++;//下一页
					this.loadFlag = false
				}
				console.log(this.param.pageIndex)
				this.GetAutoSalesOrderList();	
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
	}

	.takebar {
		padding-top: 200upx !important;
	}
</style>

