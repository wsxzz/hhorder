<template>
	<view class="custom-header-con  custom-header">
		<view class="manager">
			<view class="uniyy-page-head">
				<hx-navbar class="manager-hx-navbar">
					<view class="managerorderlist-nav row">
						<view class="col-2 center navbar" :class="{on: selState==='orderapproval'}" @click="switchState('orderapproval','1')">
							订单审核
							<view class="line"></view>
						</view>
						<view class="col-2 center navbar" :class="{on: selState==='customerorder'}" @click="switchState('customerorder','2')">
							客户订单
							<view class="line"></view>
						</view>
					</view>
					<!-- 除了在微信小程序都存在 -->
					<!--  #ifndef MP-WEIXIN -->
					<view slot="right">
						<text class="iconfont search_icon" @click="gosearch">&#xe609;</text>
						<text @click="openscreen" :class="{screenDialog: screenShow}" class="iconfont">&#xe67f;</text>
					</view>
					<!--  #endif -->
				</hx-navbar>
			</view>

			<managerlist @reloadlist="refresh" :consultantslists="consultantslists" :loadAll="loadAll" :NODATA="false" :selState="selState"
			 @click="gocustodetail" />

		</view>
		<view class="">
			<uni-popup class="" ref="sreen" type="top" :animation="true">
				<view class="" style="position: relative; ">
					<view class="screen-pop" style="padding-top:90upx;overflow:scroll">
						<view class="" style="padding-bottom: 100upx;">
							<view class="title">
								选择顾问
							</view>
							<view class="dllist-bd">
								<view class="btns" :class="{'on': item.disabled?true:false}" v-for="(item,index) in AdvisorList" @click="item.disabled=!item.disabled">
									{{item.B_NAME}}
								</view>
							</view>
							<view class="title">
								筛选时段
							</view>
							<view class="row">
								<view class="col-2 center">
									<view class="date" @click="pickDtae()">
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
								订单状态
							</view>
							<view class="dllist-bd">
								<view class="btns" :class="{'on': statusesIndex==index?true:false}" v-for="(item,index) in statuses" @click="changestatus(index)">
									{{item}}
								</view>
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
				</view>
			</uni-popup>
		</view>

	</view>
</template>

<script>
	import managerlist from './components/manager-list.vue' //列表
	import fn from '../../common/filter.js' //数据

	export default {
		components: {
			managerlist
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				selState: 'orderapproval',
				screenDialog: false,
				screenShow: false, //筛选框
				date: currentDate,
				startDate: '1990-01-01',
				endDate: fn.CurentTime(),
				add: false, //头部的add按钮
				subStatus: '', //提交与已提交的状态
				screendates: {}, //筛选条件
				dllist: ['零售', '二手车评估申请单', '收款申请单', '二手车入库单'], //订单类型
				dllistIndex: 0, //当前类型（默认是零售）
				statuses: ['审批中', '已审批', '驳回'], //订单类型
				statusesId: [2, 3, 4],
				statusesIndex: 0, //当前类型（默认是零售）
				currentTabIndex: 1,
				loadAll: false, //数据加载完毕
				NODATA: false, //数据加载完毕
				consultantslists: [], //零售数据
				AdvisorList: [], //顾问列表
				advisers: [], //顾问id
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
			// debugger
			this.param.adviser[0] = this.$store.state.adviser == "" ? uni.getStorageSync('adviser') : this.$store.state.adviser //顾问id
			this.GetAutoSalesOrderList()

			// 根据adviserId得到所有的顾问信息

			if (this.$store.state.orgID == "" || this.$store.state.DeptID == "" || this.$store.state.JOB_ID == "") {
				let userid = this.$store.state.adviser
				if (userid == "") {
					userid = uni.getStorageSync('adviser');
				}
				this.CheckLogin(userid);
			}
			//获取所有的顾问列表
			this.getAdvisorList()

		},
		onPullDownRefresh() {
			console.log("触发了下拉刷新")
			// this.refresh(); //刷新数据
			setTimeout(function(){
				uni.startPullDownRefresh(); //停止刷新
			},1000)
			
		},
		onReachBottom() { //
			console.log("触发了上拉加载")
			this.paging() //加载下一页
		},
		methods: {
			// 切换订单审核和客户信息状态
			switchState(state, index) {
				this.selState = state;
				// 正在加载
				uni.showToast({
					icon: 'loading',
					duration: 2000
				});
				if (index == "1") { //订单审核
					this.param.status = 2
				} else if (index == "2") { //客户订单
					this.param.status = 1
				}
				this.GetAutoSalesOrderList();
			},
			async CheckLogin(userid) {
				let param = {
					userID: userid
				}
				await this.$api.HHPlatForm_P_CheckLoginByUserID(param).then(res => {

					this.$store.state.orgID = res[0].OrgID
					this.$store.state.OrgName = res[0].OrgName
					this.$store.state.DeptID = res[0].DeptID
					this.$store.state.DeptName = res[0].DeptName
					this.$store.state.JOB_ID = res[0].JOB_ID
					this.$store.state.JOB_NAME = res[0].JOB_NAME
					this.$store.state.B_NAME = res[0].B_NAME

				}).catch(res => {
					console.log(res)
					// 失败进行的操作
				})
			},
			async getAdvisorList() { //获取所有的顾问列表
				let OrgID = this.$store.state.orgID
				let param = {
					OrgID: OrgID
				}

				await this.$api.HHPlatForm_P_GetSalesAdvisorList(param).then(res => {
					this.AdvisorList = []
					res.forEach(x => {
						this.AdvisorList.push({
							"B_NAME": x.B_NAME,
							"EASID": x.EASID,
							"disabled": false
						})
					})
					// this.AdvisorList = res
				}).catch(res => {
					console.log(res)
					// 失败进行的操作
				})
			},

			bindDateChange: function(e) {
				this.date = e.target.value
				this.param.start_date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},

			submissionStatus(status) { //已提交未提交切换
				this.param.status = status
				this.closescreen()
				this.GetAutoSalesOrderList();
			},
			//获取筛选框的值，重新触发列表更新
			comfirm() {
				let arr = [];
				this.closescreen()
				this.AdvisorList.forEach(x => {
					if (x.disabled) {
						arr.push(x.EASID)
					}
				})
				this.param.adviser = arr;
				this.GetAutoSalesOrderList();
			},
			pickDtae() { //改变开始时间
				this.param.start_date = '2020-01-01'
			},
			changestatus(i) { //改变订单类型
				this.statusesIndex = i
				this.param.status = this.statusesId[i]
			},
			//去搜索页面
			gosearch() {
				uni.navigateTo({
					url: '../search/search2?role=4'
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
				
				alert(JSON.stringify(param)+"param是");
				
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
				} else {
					this.loadAll = true //加载全部
				}

			},
			closeAllDialog() { //关闭所有的弹框（）
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
		// height: 1200upx;
		// overflow: hidden;
	}

	.takebar {
		padding-top: 200upx !important;
	}
	.fbtns{
		width: 100%;
		background-color: #FFFFFF;
	}
	.fbtns{
		font-size: 34upx;
		border-top:1upx solid #EFEFEF;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	.fbtns .resetBtn{
		    height: 96upx;
		    line-height: 96upx;
		    text-align: center;
		    color: #17212E;
		    background-color: #FFFFFF;
	}
	 .fbtns .comfirmBtn{
		    width: 50%;
			height: 96upx;
			line-height: 96upx;
			text-align: center;
			color: #FFFFFF;
			background-color: #1371F7;
	}
</style>
