<template>
	<view class="custom-header-con  custom-header">
		
		<view class="manager">
			<view class="uniyy-page-head">
				<hx-navbar :back="false"  style="padding-top:var(--status-bar-height);"  class="manager-hx-navbar">
					<view slot="left">
						<text class="iconfont">&#xe634;</text>
					</view>
					<view class="managerorderlist-nav row">
						<view class="col-2 center navbar" :class="{on: selState==='1'}" @click="switchState('1','1')">
							订单审核
							<view class="line"></view>
						</view>
						<view class="col-2 center navbar" :class="{on: selState==='2'}" @click="switchState('2','2')">
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
			
			 <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback">
					<managerlist @reloadlist="refresh" :consultantslists="consultantslists" :loadAll="loadAll" :NODATA="NODATA" :selState="selState"
					 @click="gocustodetail" />
			</mescroll-body>
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
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

	export default {
		components: {
			managerlist
		},
		data() {
			const currentDate = fn.getDateM({
				format: true
			})
			return {
				selState: '1',
				screenDialog: false,
				screenShow: false, //筛选框
				date: currentDate,
				startDate: '1990-01-01',
				endDate: fn.CurentTime(),
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
					"start_date":"",
					"end_date": fn.CurentTime(),
					"order_from": 0,
					"order_kind": 0,
					"order_channel": 0,
					"customer_name": "",
					"customer_phone": "",
					"model_id": 0,
					"chassis_num": "",
					"adviser": [],
					"status": 2,
					"pageIndex": 1,
					"pageSize": 4
				},
				loadFlag: true,
				total: 0, //	订单列表总数，总单量
			}
		},
		onShow() {
			// fn.tabbarRequired('true'); //该页面是否需要tabbar
		},
		created() {
			this.getinit();
		},
		onReachBottom() { //
			console.log("触发了上拉加载")
			this.paging() //加载下一页
		},
		methods: {
			getinit(){
				let that = this
				//获取登陆的信息
				let myorgid = that.$store.state.orgID == "" ? uni.getStorageSync('companyId') : that.$store.state.orgID //顾问id	
				//获取所有的顾问列表
				that.getAdvisorList(myorgid)			
				// 根据adviserId得到所有的顾问信息
				if (that.$store.state.DeptID == "") {
					let userid = that.$store.state.adviser
					if (userid == "") {
						userid = uni.getStorageSync('adviser');
					}
					that.CheckLogin(userid);
				}
			},
			mescrollInit(){//init
				this.refresh()//加载下一页
			},
			downCallback(mescroll){
				console.log("下拉刷新")
				this.refresh()//刷新
				setTimeout(function(){
					 mescroll.endSuccess(1)
				},1000)
			},
			// 切换订单审核和客户信息状态
			switchState(state, index) {
				let that = this;
				that.selState = state;
				// 正在加载
				uni.showToast({
					icon: 'loading',
					duration: 2000
				});
				if (index == "1") { //订单审核
					that.param.status = 2
				} else if (index == "2") { //客户订单
					that.param.status = 1
				}
				this.param.adviser = []
				this.param.start_date = "" 
				that.getlistINIT();
				that.GetAutoSalesOrderList();
			},
			//获取筛选框的值，重新触发列表更新
			comfirm() {
				this.changeAdversier()//顾问人员
				this.getlistINIT();//重新清空原来的筛选列表
				if(this.param.start_date==""){//默认开始日期是当天
					this.param.start_date = fn.CurentTime();
				}
				console.log(this.param)
				this.GetAutoSalesOrderList();
			},
			//刷新数据（回到最初数据）
			refresh() {
				this.param.pageIndex = 1; //回到第一页
				this.getlistINIT();//重新清空原来的筛选列表
				this.param.adviser = []
				this.param.start_date = ""
				this.GetAutoSalesOrderList();
			},
			// 切换条件重新选
			getlistINIT(){
				this.consultantslists = [];
				this.loadAll = false;
				this.NODATA = false;
				// this.closescreen();
			},
			//获取用户登陆信息
			async CheckLogin(userid) {
				let that = this;
				let param = {
					userID: userid
				}
				await that.$api.HHPlatForm_P_CheckLoginByUserID(param).then(res => {
					
					that.$store.state.OrgName = res[0].OrgName
					that.$store.state.DeptID = res[0].DeptID
					that.$store.state.DeptName = res[0].DeptName
					that.$store.state.JOB_ID = res[0].JOB_ID
					that.$store.state.JOB_NAME = res[0].JOB_NAME
					that.$store.state.B_NAME = res[0].B_NAME
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
			 //获取所有的顾问列表
			async getAdvisorList(myorgid) {
				let param = {
					OrgID: myorgid,
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
			// 改变开始日期
			bindDateChange: function(e) {
				this.date = e.target.value
				this.param.start_date = e.target.value
			},
			//改变订单类型
			changestatus(i) { 
				this.statusesIndex = i
				this.param.status = this.statusesId[i]
			},
			//改变顾问人员列表
			changeAdversier(){
				let arr = [];
				this.closescreen()
				this.AdvisorList.forEach(x => {
					if (x.disabled) {
						arr.push(x.EASID)
					}
				})
				this.param.adviser = arr;
			},
			//去搜索页面
			gosearch() {
				uni.navigateTo({
					url: '../search/search2?role=4'
				});
			},
			//打开筛选框
			openscreen() {
				this.$refs.sreen.open()
			},
			//关闭筛选框
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
				
				// alert(JSON.stringify(param)+"param是");
				
				await this.$api.HHPF_P_GetAutoSalesOrderList(param).then(res => {
					if (res.Data.list.length > 0) {
						this.total = res.Data.total //数据总数
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
