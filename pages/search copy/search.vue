<template>
	<view class="n_customer">
		<!-- 获取客户档案（个人） -->
		<view v-if="role=='1'">
			<uni-search-bar v-model="keyword1" radius="100" placeholder="姓名/手机号" clearButton="auto" cancelButton="auto" @confirm="search1" />
			<view class="">
				<!-- 客户列表 -->
				<view  v-if="customerlist.length>0" class="n_customerlist">
					<view  v-for="(item,i) in customerlist" :key="i">
						<view class="n_customercell row" @click="handClick(item.ID)">
							<view class="detials">
								<view class="name">
									<text  v-html="item.BD_NAME"></text>/
									<text class="sex" v-html="item.BD_SEX"></text>
								</view>
								<view class="phone" v-html="item.COM_PHONE"></view>
							</view>
							<view class="data" v-html="formateDate(item.ADD_DATE)"></view>
						</view>
					</view>
					<view v-if="loadall" class="Finished-loading">
						已全部加载完毕
					</view>
				</view>
			</view>
		</view>
		<!-- 获取客户档案（企业） -->
		<view v-if="role=='2'">
			<uni-search-bar v-model="keyword2" radius="100" placeholder="公司名称" clearButton="auto" cancelButton="auto" @confirm="search2" />
			<view  v-if="UnitCustomerlist.length>0" class="n_customerlist">
				<view  v-for="(item,i) in UnitCustomerlist" :key="i">
					<view class="n_customercell row" @click="handClick(item.ID)">
						<view class="detials">
							<view class="name">
								<text  v-html="item.UNIT_NAME"></text>
							</view>
							<view class="phone" v-html="item.TEl"></view>
						</view>
						<view class="data" v-html="formateDate(item.FCreateTime)"></view>
					</view>
				</view>
				<view v-if="loadall" class="Finished-loading">
					已全部加载完毕
				</view>
			</view>
		</view>
		<!-- 顾问列表 -->
		<view class="consultants" v-if="role=='3'">
				<uni-search-bar v-model="keyword3" radius="100" placeholder="客户订单号/客户名称/手机号码" clearButton="auto" cancelButton="auto" @confirm="search3" />
				<view class="consultants-lists">
					<view v-if="salelist.length>0" class="consultants-lists-cell" v-for="(item,i) in salelist" :key="i">
						<view @click="handClick(item.ID)">
							<view class="row ordernum">
								<view class="ordernumL">
									{{item.ORDER_ID}}
									<text class="attribute">零售</text>
									<text class="date">{{item.ORDER_TIME}}</text>
								</view>
								<view class="ordernumR right state">
									{{item.STATUS}}
								</view>
							</view>
							
							<view class="ordercontant row">
								<view class="col-2">
									<text class="ordername">{{item.BD_NAME}}</text>/
									{{item.BD_SEX}}
									
								</view>
								<view class="col-2 right">
									<image @tap.stop="makePhoneCall(item.TEl)" class="orderphone" src="../../static/images/icons/icon-phone.png" mode="widthFix"></image>
								</view>
							</view>
							<view class="carinfo">
								{{item.OFFICIA_LNAME}}
							</view>
							<view class="row shopnumber">
								<view class="col-2">
									<text class="text">商品数量</text>
									<text class="value">{{item.GOODS_NUM}}</text>
								</view>
							</view>
						</view>
					</view>	
				</view>
		</view>
		<!-- 经理审核列表 -->
		<view class="manager" v-if="role=='4'">
				<uni-search-bar v-model="keyword4" radius="100" placeholder="客户订单号/客户名称/手机号码" clearButton="auto" cancelButton="auto" @confirm="search4" />
				<view class="manager-list" v-if="salelist.length>0">
					<view class="manager-lists-cell"  v-for="(item,i) in salelist" :key="i">
						<view @click="handClick(item.ID)">
							<view class="row ordernum">
								<view class="col-2">
									{{item.ORDER_ID}}
									<text class="date">{{item.ORDER_TIME}}</text>
								</view>
								<view class="col-2 right state">
									{{orderStatus[item.STATUS]}}
								</view>
							</view>
							
							<view class="ordercontant row">
								<view class="col-2">
									<text class="ordername">{{item.BD_NAME}}</text>
									<text v-if="item.DB_SEX!=='未知'">/{{item.DB_SEX}}</text>
								</view>
								<view class="col-2 right name">
									李销售
								</view>
							</view>
							<view class="carinfo">
								{{item.OFFICIA_LNAME}}
							</view>
							<view class="row shopnumber">
								<view class="col-2">
									<text class="text">商品数量</text>
									<text class="value">{{item.GOODS_NUM}}</text>
									<text class="consult-btn" @click.stop="Check(item.ID)">查阅</text>
								</view>
							</view>
						</view>
					</view>
					<view class="Checkpopup">
						<uni-popup ref="popup" type="center" :animation="true">
							<view class="popup-content">
								<view class="toptitle right">
									<uni-icons  @click="closepopup" type="close" color="#8f8f94" size="25" />
								</view>
								<view class="checkList">
									<text class="title">GP1</text><text class="value"></text>
									<text class="title">GP2</text><text class="value"></text>
								</view>
							</view>
						</uni-popup>
					</view>
				</view>
		</view>
		<!-- 暂无数据 -->
		<no-data :nodata="nodata"/>
	</view>
</template>

<script>
	import fn from  '../../common/filter.js' //数据
	export default {
		data() {
			return {
				nodata:false,
				loadall:false,
				role:'4',
				keyword1:'',//客户档案（个人）
				keyword2:'',//客户档案（企业）
				keyword3:'',//获取销售订单列表
				keyword4:'',//获取经理审核列表
				customerlist:[],//客户档案列表（个人）
				UnitCustomerlist:[],//客户档案列表（企业）
				salelist:[],//销售订单
				orderStatus:[],//订单状态（经理审核列表）
				paramOrderList:{//销售订单列表参数/经理审核列表
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
					"pageSize": 50
				},//
			};
		},
		computed:{
			formateDate(){//时间格式转化
				return function (time) {
				     return fn.formateDate2(time)
				}
			},
		},
		onLoad(ops) {
			//此页面应该禁止下拉刷新
			console.log(ops.role)//目前角色（需要展示什么的列表）
			uni.setStorageSync('searchRole', ops.role);//存入缓存
			// uni.setStorageSync('searchRole', '2');//测试
		},
		created() {
			this.role = uni.getStorageSync('searchRole')
			this.orderStatus = this.$store.state.orderStatus;//订单状态
			switch (this.role){
				case '1':
				this.getCustomer ("");
					break;
				case '2':
				this.GetUnitCustomer ("");
					break;
				case '3':
				this.GetAutoSalesOrderList (this.paramOrderList);
					break;
				case '4':
				this.GetAutoSalesOrderList (this.paramOrderList);
					break;
				default:
				uni.showToast({
				    title: '出错误啦，返回上一个页面',
				    duration: 2000
				});
					break;
			}
			
		},
		methods: {
			search1(){
				this.getCustomer ("");//客户列表（个人）
			},
			search2(){
				this.GetUnitCustomer ("");//客户列表（公司）
			},
			search3(){
				this.GetAutoSalesOrderList (this.paramOrderList);//顾问列表 
			},
			search4(){
				this.GetAutoSalesOrderList (this.paramOrderList);//经理审核列表
			},
			// 获取客户档案（个人）
			async getCustomer (name) {
				let param = {"name":name, "pageIndex":1, "pageSize":50}
				await this.$api.HHPF_P_GetCustomer(param).then(res => {
					// 获得数据 
					// console.log("获取客户档案个人"+res.Data.list)
					 this.customerlist = res.Data.list
					 if(res.Data.list.length>0){
					 						 this.nodata = false
					 }else{
					 						 this.nodata = true
					 }
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			// 获取客户档案（企业）
			async GetUnitCustomer (name) {
				let param = {"name":name, "pageIndex":1, "pageSize":50}
				await this.$api.HHPF_P_GetUnitCustomer(param).then(res => {
					// 获得数据 
					console.log("获取客户档案公司"+res) 
					this.UnitCustomerlist = res.Data.list
					if(res.Data.list.length>0){
											 this.nodata = false
					}else{
											 this.nodata = true
					}
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			//获取销售订单列表
			async GetAutoSalesOrderList (paramOrderList) {
				let param =paramOrderList
				await this.$api.HHPF_P_GetAutoSalesOrderList(param).then(res => {
					// 获得数据 
					console.log("获取销售订单列表"+res)
					 this.salelist = res.Data.list
					 if(res.Data.list.length>0){
						 this.nodata = false
					 }else{
						 this.nodata = true
					 }
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			// 确定
			handClick(id){
				if(this.role=='1'||this.role=='2'){//返回新增订单
					this.$store.state.saleOrderDates.customerInfor.customer_id = id
					this.$store.state.saleOrder.baseinfoData.ISfirst = false
					uni.navigateTo({
					    url: "../autoSalesOrder/autoSalesOrder"
					});
				}else if(this.role=='3'){//去订单详情(顾问)
					uni.navigateTo({
					    url: "../autoSalesOrderDetail/autoSalesOrderDetail?isReview=true&id="+id
					});
				}else if(this.role=='4'){//去订单详情（经理）
				uni.navigateTo({
					url:'../autoSalesOrderDetail/autoSalesOrderDetail?isReview=false&id='+id
				});
					
				}
				
			},
			// 经理审核列表查阅
			Check(){
				this.$refs.popup.open()
			},
			//关闭经理审核列表查阅弹框
			closepopup(){
				this.$refs.popup.close()
			},
		},
	}
</script>

<style lang="scss">

</style>
