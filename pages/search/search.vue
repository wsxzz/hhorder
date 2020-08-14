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
				role:'1',
				keyword1:'',//客户档案（个人）
				keyword2:'',//客户档案（企业）
				customerlist:[],//客户档案列表（个人）
				UnitCustomerlist:[],//客户档案列表（企业）
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
		},
		created() {
			switch (this.role){
				case '1':
				this.getCustomer ("");
					break;
				case '2':
				this.GetUnitCustomer ("");
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
			// 获取客户档案（个人）
			async getCustomer (name) {
				let that = this;
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
			
			// 确定
			handClick(id){
				let that = this;
					// 回填信息
					that.$store.state.customerInfo.entry1.customer_id = id
					that.$store.state.customerInfo.seletOk = true
					uni.navigateTo({
					    url: "../autoSalesOrder/autoSalesOrder"
					});
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
