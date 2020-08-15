<template>
	<view class="custom-header-con takebar">
		<view class="consultants">
			<!-- 顾问列表 -->
			<view class="uniyy-page-head-con">
				<hx-navbar class="hx-navbarr" :back="false" :fixed="true" :left-slot="false" :right-slot="false">
					<view class="ctn5" @click="gosearch">
						<uni-icons type="search" size="22" color="#666666" />
						<text class="txt">输入搜索关键词</text>
					</view>
					<view class="main-right add center" @click="add=!add">
						<view class="iconfont">&#xe66c;</view>
					</view>
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
				
				<view class="screen-bd">
					<view class="screen-bd-in">
						<view class="row pad borderB">
							<view class="screen-bdL">
								<view class="screen marR40" :class="{'on': param.status===1}" @click="submissionStatus(1)">
									<button class="mini-btn" size="mini">未提交{{total_wpc}}</button>
								</view>
								<view class="screen" :class="{'on': param.status===2}" @click="submissionStatus(2)">
									<button class="mini-btn" size="mini">已提交{{total_yjc}}</button>
								</view>
							</view>
							<view class="right">
								<text @click="openscreen">筛选</text>
								<text class="iconfont" @click="openscreen">&#xe67f;</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 顾问列表 -->
			<consultantsLists :consultantslists="consultantslists" :loadAll="loadAll" :NODATA="false" />

		</view>
		<view class="">
			<uni-popup class="" ref="sreen" type="top" :animation="true">
				<view class="screen-pop">
					<scroll-view scroll-y="true" style="height: 600upx;overflow:scroll">
						<view class="">
							<view class="title">
								筛选时段
							</view>
							<view class="row">
								<view class="col-2 center">
									<view class="date" @click="pickDtae()">
										2020-02-02
									</view>
								</view>
								<view class="col-2 center">
									<view class="date">
										{{param.end_date}}
									</view>
								</view>
							</view>
							<view class="title">
								订单类型
							</view>
							<view class="dllist-bd">
								<view class="btns" :class="{'on': dllistIndex==index?true:false}" v-for="(item,index) in dllist" @click="changeDL(index)">
									{{item}}
								</view>
							</view>
						</view>
						<view class="fbtns row">
							<view class="resetBtn col-2">
								重置
							</view>
							<view class="comfirmBtn col-2" @click="comfirm">
								确定
							</view>
						</view>
					</scroll-view>
				</view>
			</uni-popup>
		</view>

	</view>
</template>

<script>
	import consultantsLists from './components/consultants-lists.vue' //列表
	import fn from '../../common/filter.js' //数据

	export default {
		components: {
			consultantsLists
		},
		data() {
			return {
				add: false, //头部的add按钮
				subStatus: '', //提交与已提交的状态
				screendates: {}, //筛选条件
				dllist: ['零售', '二手车评估申请单', '收款申请单', '二手车入库单'], //订单类型
				dllistIndex:0,//当前类型（默认是零售）
				currentTabIndex: 1,
				loadAll: false, //数据加载完毕
				NODATA: false, //数据加载完毕
				consultantslists: [], //零售数据
				param: {
					"start_date": "",
					"end_date": fn.CurentTime(),
					"order_from": 0,
					"order_kind": 0,
					"order_channel": 0,
					"customer_name": "",
					"customer_phone": "",
					"model_id": 0,
					"chassis_num": "",
					"adviser": [],
					"status": 0,
					"pageIndex": 1,
					"pageSize": 4
				},
				loadFlag: true,
				total: 0, //	订单列表总数，总单量
				total_pc: 0, //	已配车数量
				total_wpc: 0, //	未配车数量
				total_yjc: 0, //	已交车数量
			}
		},
		onShow() {
			fn.tabbarRequired('true'); //该页面是否需要tabbar
			this.closeAllDialog()
		},
		created() {
			this.param.adviser[0] = this.$store.state.adviser //顾问id
			this.GetAutoSalesOrderList()
		},
		onPullDownRefresh() {
			console.log("触发了下拉刷新")
			this.refresh(); //刷新数据
		},
		onReachBottom() { //
			console.log("触发了上拉加载")
			this.paging() //加载下一页
		},
		methods: {
			submissionStatus(status) { //已提交未提交切换
				this.param.status = status
				this.closescreen()
				this.GetAutoSalesOrderList();
			},
			//获取筛选框的值，重新触发列表更新
			comfirm(val) {
				this.closescreen()
				this.GetAutoSalesOrderList();
			},
			pickDtae(){//改变开始时间
				this.param.start_date = '2020-01-01'
			},
			changeDL(i){//改变订单类型
				if(i==0){
					this.param.start_date = '2020-01-01'
					this.dllistIndex = i
				}else{
					uni.showToast({
					    title: '暂时没法查询其他类型的订单',
					    duration: 2000
					});
				}
			},
			//新增订单
			gosubmitorder() {
				this.add = false;
				this.$store.state.baseinfo.obj.src_id = 0 //无关联订单号码
				uni.navigateTo({
					url: "../autoSalesOrder/autoSalesOrder?edit='新增'",
				});
			},
			//新增首款申请单
			goCollection() {
				this.add = false;
			},
			//新增二手车评估
			goUsedcarevaluation() {
				this.add = false;
			},
			//去搜索页面
			gosearch() {
				uni.navigateTo({
					url: 'search/search?role=3'
				});
			},
			openscreen() {
				this.$refs.sreen.open()
			},
			closescreen() {
				this.$refs.sreen.close()
			},
			//获取订单列表
			async GetAutoSalesOrderList() {
				// debugger
				uni.showLoading({
					title: '加载中'
				});
				let param = this.param;
				await this.$api.HHPF_P_GetAutoSalesOrderList(param).then(res => {
					if (res.Data.list.length > 0) {
						this.total = res.Data.total //数据总数
						this.total_pc = res.Data.total_pc //	已配车数量
						this.total_wpc = res.Data.total_wpc //	未配车数量
						this.total_yjc = res.Data.total_yjc //	已交车数量
						this.consultantslists = [...this.consultantslists, ...res.Data.list]
						this.NODATA = false
						this.loadFlag = true
						uni.startPullDownRefresh(); //停止刷新
						uni.hideLoading(); //停止加载中
					} else {
						this.NODATA = true
						uni.hideLoading(); //停止加载中
					}
				}).catch(res => {
					console.log(res)
					// 失败进行的操作
				})
			},
			//刷新数据（回到最初数据）
			refresh() {
				this.param.pageIndex = 1; //回到第一页
				this.GetAutoSalesOrderList();
			},
			//数据分页
			paging() {
				// debugger
				let totalPage = Math.ceil(this.total / 4) //总页数
				console.log(totalPage)
				if (this.param.pageIndex < totalPage) {
					if (this.loadFlag) {
						this.param.pageIndex++; //下一页
						this.loadFlag = false
					}
					console.log(this.param.pageIndex)
					this.GetAutoSalesOrderList();
				}else{
					this.loadAll = true//加载全部
				}

			},
			closeAllDialog(){//关闭所有的弹框（）
				// this.cancel()
				this.add = false;
				// this.closescreen()
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
		// height: 500upx;
		// overflow: hidden;
	}

	.takebar {
		padding-top: 200upx !important;
	}
	
</style>
