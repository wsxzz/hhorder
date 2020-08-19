<template>
	<view class="custom-header-con takebar">
		<view class="consultants">
			<!-- 顾问列表 -->
			<view class="uniyy-page-head-con">
				<view class="title-padding"></view>
				<hx-navbar barPlaceholder="show" class="hx-navbarr" :back="false" :fixed="true" :left-slot="false" :right-slot="false">
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
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback">
				<!-- 顾问列表 -->
				<consultantsLists @reloadlist="refresh" :consultantslists="consultantslists" :loadAll="loadAll" :NODATA="false" />
			</mescroll-body>

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
									<view class="date">
										<view class="">
											<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
												<view class="">{{date}}</view>
											</picker>
										</view>

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
			const currentDate = fn.getDateM({
				format: true
			})
			return {
				date: currentDate,
				startDate: '1990-01-01',
				endDate: fn.CurentTime(),
				add: false, //头部的add按钮
				subStatus: '', //提交与已提交的状态
				screendates: {}, //筛选条件
				dllist: ['单车','多车','非整车', '二手车评估申请单', '收款申请单', '二手车入库单'], //订单类型
				dllistIDs:[5,6,7],
				dllistIndex: 0, //当前类型（默认是零售）
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
		watch: {
			param: {
				handler(newValue, oldValue) {
					let that = this
					// if (newValue.adviser !== oldValue) {
					// 	that.GetAutoSalesOrderList();
					// }
				},
				deep: true
			},
		},
		onShow() {
			this.add = false;
		},
		created() {
			this.getinit();
		},
		//上拉加载
		onReachBottom() { 
			console.log("触发了上拉加载")
			this.paging() //加载下一页
		},
		methods: {
			getinit() {//初始化得到顾问id和orgid
				let that = this
				that.param.adviser[0] = that.$store.state.adviser == "" ? uni.getStorageSync('adviser') : that.$store.state.adviser //顾问id
				let userid = that.$store.state.adviser == "" ? uni.getStorageSync('adviser') : that.$store.state.adviser //顾问id
				this.GetAutoSalesOrderList()
				this.CheckLogin(userid);
			},
			mescrollInit() { //init
				this.refresh() //刷新
			},
			downCallback(mescroll) {
				console.log("下拉刷新")
				this.refresh() //刷新
				setTimeout(function() {
					mescroll.endSuccess(1)
				}, 1000)
			},
			async CheckLogin(userid) {
				let param = {
					userID: userid
				}
				await this.$api.HHPlatForm_P_CheckLoginByUserID(param).then(res => {
					debugger
					this.$store.state.OrgName = res[0].OrgName
					this.$store.state.DeptID = res[0].DeptID
					this.$store.state.DeptName = res[0].DeptName
					this.$store.state.JOB_ID = res[0].JOB_ID
					this.$store.state.JOB_NAME = res[0].JOB_NAME
					this.$store.state.B_NAME = res[0].B_NAME
					
					uni.setStorageSync('OrgName', res[0].OrgName);//
					uni.setStorageSync('DeptID', res[0].DeptID);//顾问
					uni.setStorageSync('DeptName', res[0].DeptID);//顾问
					uni.setStorageSync('JOB_ID', res[0].JOB_ID);//顾问
					uni.setStorageSync('JOB_NAME', res[0].JOB_NAME);//顾问
					uni.setStorageSync('B_NAME', res[0].B_NAME);//顾问

				}).catch(res => {
					console.log(res)
					// 失败进行的操作
				})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
				this.param.start_date = e.target.value
			},
			submissionStatus(status) { //已提交未提交切换
				this.param.status = status
				this.getlistINIT();//重新清空原来的筛选列表
				this.param.start_date = ""
				this.closescreen()
				this.GetAutoSalesOrderList();
			},
			//获取筛选框的值，重新触发列表更新
			comfirm(val) {
				this.closescreen()
				console.log(this.param)
				this.GetAutoSalesOrderList();
			},
			changeDL(i) { //改变订单类型
				if (i == 0 || i == 1 ||i == 2) {
					this.dllistIndex = i
					this.param.order_kind = this.dllistIDs[i]
				} else {
					uni.showToast({
						title: '暂时没法查询其他类型的订单',
						duration: 2000
					});
				}
			},
			//获取订单列表
			async GetAutoSalesOrderList() {
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
				this.getlistINIT();//重新清空原来的筛选列表
				this.param.adviser = []
				this.param.start_date = ""
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
				} else {
					this.loadAll = true //加载全部
				}

			},
			// 切换条件重新选
			getlistINIT(){
				this.consultantslists = [];
				this.loadAll = false;
				this.NODATA = false;
				// this.closescreen();
			},
			//新增订单
			gosubmitorder() {
				this.add = false;
				this.$store.state.baseinfo.obj.src_id = 0 //无关联订单号码
				uni.navigateTo({
					url: "../test/test?edit='新增'",
				});
			},
			//去搜索页面
			gosearch() {
				uni.navigateTo({
					url: '../search/search2?role=3'
				});
			},
			openscreen() {
				this.$refs.sreen.open()
			},
			closescreen() {
				this.$refs.sreen.close()
			},
			//新增首款申请单
			goCollection() {
				this.add = false;
				uni.showToast({
					title: '此功能还没好',
					duration: 2000
				});
			},
			//新增二手车评估
			goUsedcarevaluation() {
				this.add = false;
				uni.showToast({
					title: '此功能还没好',
					duration: 2000
				});
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
