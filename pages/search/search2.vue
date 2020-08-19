<template>
	<view class="n_customer">
		<!-- 获取客户档案（个人） -->
		
		<!-- 获取客户档案（企业） -->
		<view class="consultants" v-if="role=='3'">
			<hx-navbar  style="padding-top:var(--status-bar-height);"  class="hx-navbarr" :back="true" :fixed="true" >
				<view class="ctn5" style="width: 100%;">
					<uni-search-bar v-model="keyword3" radius="100" placeholder="客户订单号/客户名称/手机号码" clearButton="auto" cancelButton="auto" @confirm="search3" />
				</view>
			</hx-navbar>
				<!-- <uni-search-bar v-model="keyword3" radius="100" placeholder="客户订单号/客户名称/手机号码" clearButton="auto" cancelButton="auto" @confirm="search3" /> -->
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
									{{orderStatus[item.STATUS]}}
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
		
		<view class="manager" v-if="role=='4'">
			<hx-navbar  style="padding-top:var(--status-bar-height);"  class="hx-navbarr" :back="true" :fixed="true" >
				<view class="ctn5" style="width: 100%;">
					<uni-search-bar v-model="keyword4" radius="100" placeholder="客户订单号/客户名称/手机号码" clearButton="auto" cancelButton="auto" @confirm="search4" />
				</view>
			</hx-navbar>
				
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
				orderStatus:['未提交','审批中','已审核', '驳回'],
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
				// orderStatus:[],//订单状态（经理审核列表）
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
			this.role = ops.role;
			// this.role = 3;//测试
		},
		created() {
			fn.tabbarRequired("false"); //不带tabbar
			if(this.role==3||this.role==4){
				this.GetAutoSalesOrderList (this.paramOrderList);
			}else{
				uni.showToast({
				    title: '出错误啦，返回上一个页面',
				    duration: 2000
				});
			}
			
		},
		methods: {
			search3(){
				this.paramOrderList.customer_name =  this.keyword3.value;
				this.GetAutoSalesOrderList (this.paramOrderList);//顾问列表 
			},
			search4(){
				this.paramOrderList.customer_name =  this.keyword4.value;
				this.GetAutoSalesOrderList (this.paramOrderList);//经理审核列表
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
				let that = this;
				// debugger
					if(this.role=='3'){//去订单详情(顾问)
						uni.navigateTo({
						    url: "../autoSalesOrderDetail/autoSalesOrderDetail?isReview=true&id="+id
						});
					}
					if(this.role=='4'){//去订单详情（经理）
					uni.navigateTo({
						url:'../autoSalesOrderDetail/autoSalesOrderDetail?isReview=false&id='+id
					});
						
					}
			},
			//拨打电话
			makePhoneCall(phone){
				console.log(phone)
				if(phone!=="" && phone !==null){
					uni.makePhoneCall({
						phoneNumber: phone,
						success: () => {
							console.log("成功拨打电话")
						}
					})
				}else{
					uni.showToast({
					    title: '此人没有留下联系电话',
						icon:'none',
					    duration: 2000
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
page{
	    background-color: #F5F5F5;	
}
</style>
