<template>
	<view class="submitorder-content custom-header">
		
		<!-- 基本信息 -->
		<baseinfo @baseinfoChange="getbaseinfo"></baseinfo>
		
		
		<view class="Commodity-infor marB20">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					商品信息
					<text class="blueline"></text>
				</view>
				<view class="col-2 right">
					<image @click="goshop" class="blueline-icons" src="../../static/images/icons/icon-public-more2.png" mode="widthFix"></image>
				</view>
			</view>
				<carinfo  :carinfo="carinfo" @carinfoChange="getcarinfo" @carinfosChange="getcarinfos"/>
				<parts @entry4Change="getentry4" @entry7Change="getentry7" @entry8Change="getentry8" @entry9Change="getentry9" @entry10Change="getentry10" @entry11Change="getentry11" :parts="parts"/>
		</view>
		
		<customerInfor :cusselectOK = "cusselectOK"  @entry1Change="getentry1" @entry2Change="getentry2"/>
		
		<insuranceInfor :insselectOK="insselectOK" @insuranceInforValChange="geinsuranceInfor"/>
		<paymentInfor :param="param" @entry14Change="getentry14" @entry13Change="getentry13"/>
		
		<mortgagePro :mortgageOk="mortgageOk" @mortgageProValChange="getmortgage"/>
		
		<deliveryInfor @deliveryInforValChange="getdeliveryInfo"/>
		
		<invoiceInfor @invoiceInforValChange="getinvoiceInfo"/>
		
		<view class="bottomgroup">
			<view class="row bottom-price">
				<view class="col-2">
					<view class="total">
						合计 <text class="price-icon">¥</text>
						<text class="price">0</text>
					</view>
					<view class="discount">
						优惠金额0
					</view>
				</view>
				<view class="col-2 right category">
						商品种类: <text>0</text> 商品数量: <text>0</text>
				</view>
			</view>
			<view class="row bottomgroupbtns">
				<view class="col-2 selectAllbtn">
					<label>
						<checkbox value="SelectAll" checked="true"/><text class="txt">全选</text>
					</label>
				</view>
				<view class="col-2 row ">
					<!-- <view class="deletebtn">
						删除
					</view> -->
					<view style="width: 100%;" class="comfirmbtn" @click="submitinfo">
						确定
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	// import { HHPF_P_AddAutoSalesOrder } from '@/api/index.js';
	
	import baseinfo from './components/baseinfo.vue' //基本信息
	import carinfo from './components/carinfo.vue' //基本信息
	import parts from './components/parts.vue' //基本信息
	
	import relatedOldOrder from './components/relatedOldOrder.vue' //关联原有订单
	import customerInfor from './components/customerInfor.vue'//客户信息
	import insuranceInfor from './components/insuranceInfor.vue'//保险信息
	import paymentInfor from './components/paymentInfor.vue'//款项信息
	import mortgagePro from './components/mortgagePro.vue'//按揭项目
	import deliveryInfor from './components/deliveryInfor.vue'//交付信息
	import invoiceInfor from './components/invoiceInfor.vue'//发票信息
	export default {
		components: {
			baseinfo,
			relatedOldOrder,
			customerInfor,
			insuranceInfor,
			paymentInfor,
			mortgagePro,
			deliveryInfor,
			invoiceInfor,
			carinfo,
			parts
		},
		data() {
			return {
				shop:"Vehicle",
				indexs:{},//接收子组件
				cusselectOK:false,
				insselectOK:false,
				mortgageOk:false,
				carinfo:{},
				parts:{},
				param:{
					"basic": {},//销售订单基础数据
					"entry1": {},//客户补充信息
					"entry2": {},//车主信息
					"entry3": [],//车辆销售信息
					"entry4": [],//精品美容信息
					"entry5": {},//按揭信息
					"entry6": {},//保险信息
					"entry7": {},//延保产品信息
					"entry8": [],//公司产品信息
					"entry9": [],//套餐产品
					"entry10": [],//代办业务信息
					"entry11": [],//卡券销售信息
					"entry12": {},//交付信息
					"entry13": {},//款项信息
					"entry14": {},//支付信息
					"entry15": {},//发票信息
				}
			};
		},
		computed:{
			// ...mapGetters(['sell_kindID','sell_kindNAME','order_kindCodes',"order_kindID","order_channelID","order_channelNAME","order_fromCodes",'order_fromID',"pay_typeCodes","pay_typeNAME",'pay_typeID',"car_typeCodes",'car_typeID',"customer_kindCodes","customer_kindID","customer_kindNAME"])
			...mapGetters(['sell_kindID',
			'order_kindID',	
			'order_channelID',	
			'order_fromID',	
			'customer_kindID',	
			'customer_fromID',	
			'customer_relationID',	
			'mortgage_kindID',	
			'payback_kindID',	
			'card_kindID',	
			'subscription_typeID',	
			'give_typeID',	
			'address_kindID',	
			'org_fromID',	
			'insurance_kindID',	
			'hangtag_kindID',	
			'hangtag_stageID',	
			'car_number_colorID',	
			'InsuranceExtend_KindID',	
			'car_kindID',	
			'car_pay_typeID',	
			'pay_typeID',	
			'car_typeID',	
			'Mortgage_LimitID',	
			'ReceivingApply_KindID',	
			'ReceivingApply_Member_KindID',	
			'Qualification_KindID',	
			'ReceivingApply_ProjectID',	
			'ReceivingApply_Project_KindID',	
			'Acquisition_KindID',
			'pay_typeNAME'])
		},
		watch: {
			entry2: {
				handler(newValue, oldValue) {
					this.$emit('entry2Change', this.entry2)
				},
				deep: true
			},
		},
		created() {
			this.cusselectOK = this.$store.state.customerInfo.seletOk
			this.insselectOK = this.$store.state.insuranceInfo.insselectOK
			this.mortgageOk = this.$store.state.mortgage.mortgageOk
			
			
			this.carinfo = this.$store.state.carinfo.obj
			this.carinfoall = this.$store.state.carinfo.objall
			
			
			
		},
		methods:{
			async submitinfo(){
				// 订单类型的初始值
				if(this.param.basic.car_kind==null){
					this.param.basic.car_kind = this.order_kindID[0]
				}
				if(this.param.basic.customer_kind==null){
					this.param.basic.customer_kind = this.customer_kindID[0]
				}
				if(this.param.basic.order_channel==null){
					this.param.basic.order_channel = this.order_channelID[0]
				}
				if(this.param.basic.order_from==null){
					this.param.basic.order_from = this.order_fromID[0]
				}
				if(this.param.basic.order_kind==null){
					this.param.basic.order_kind = this.order_kindID[0]
				}
				if(this.param.basic.pay_type==null){
					this.param.basic.pay_type = this.pay_typeID[0]
				}
				if(this.param.basic.sell_kind==null){
					this.param.basic.sell_kind = this.sell_kindID[0]
				}
				if(this.param.entry1.relation==0){
					this.param.entry1.relation = this.customer_relationID[0]
				}
				if(this.param.entry1.kind==null){
					this.param.entry1.kind = this.customer_kindID[0]
				}
				if(this.param.entry2.relation==0){
					this.param.entry2.relation = this.customer_relationID[0]
				}
				this.param.basic.pay_typeNAME = this.pay_typeNAME[this.param.basic.pay_typeIndex]
				if(this.param.basic.pay_typeNAME=='按揭消费'){
					if(this.param.entry5.deadline==null){
						this.param.entry5.deadline = this.Mortgage_LimitID[0]
					}
					if(this.param.entry5.qua_id==null){
						this.param.entry5.qua_id = this.Qualification_KindID[0]
					}
					
					if(this.param.entry5.repayment_type==null){
						this.param.entry5.repayment_type = this.payback_kindID[0]
					}
				}else{
					this.param.entry5 = {}
				}
				
				
				if(this.param.entry6.kind==null){
					this.param.entry6.kind = this.insurance_kindID[0]
				}
				if(this.param.entry12.give_type==null){
					this.param.entry12.give_type = this.give_typeID[0]
				}
				
				// this.param.entry1.kind =this.$store.state.baseinfo.obj.customer_kind
				
				this.param.entry13 = this.$store.state.paymentInfo.entry13
				this.param.entry14 = this.$store.state.paymentInfo.entry14
				if(this.param.entry13.type==null){
					this.param.entry13.type = this.subscription_typeID[0]
				}
				this.param.basic.adviser = this.$store.state.adviser
				this.param.basic.adviser_org_id = this.$store.state.orgID
				this.param.basic.adviser_org_name = this.$store.state.OrgName
				this.param.basic.adviser_department_id = this.$store.state.DeptID
				this.param.basic.adviser_department_name = this.$store.state.DeptName
				this.param.basic.adviser_post_id = this.$store.state.JOB_ID
				this.param.basic.adviser_post_name = this.$store.state.JOB_NAME
				this.param.basic.adviser_name = this.$store.state.B_NAME
				// 必须选择商品
				if( this.param.basic.order_kindIndex==0&& this.param.entry3.model_id==""){
					uni.showToast({
					    title: '您还未选择车型商品',
					    duration: 2000
					});
					return
				}
				if( this.param.entry3.model_id=="" && this.param.entry4.length==0&&this.param.entry8.length==0&&this.param.entry9.length==0 &&this.param.entry10.length==0&&this.param.entry11.length==0){
					uni.showToast({
					    title: '至少选择一款商品',
					    duration: 2000
					});
					return
				}
				
				
				console.log(  this.param.entry14,"0000")
				console.log(JSON.stringify(this.param),"11111")
				
				await this.$api.HHPF_P_AddAutoSalesOrder(this.param).then(res => {
						// 获得数据 
						// 跳转返回订单列表
						uni.navigateTo({
							url: '../consultantsLists/consultantsLists'
						});
						
					 }).catch(res => {
						 console.log(res)
					 　　// 失败进行的操作
					})
				
			},
			goshop() {
				uni.navigateTo({
					url: '../shop-Mall/shop-Mall'
				});
			},
			getcarinfos(val){
				this.$store.state.carinfo.obj = val
				this.param.entry3[0] = val
			},
			
			
			getbaseinfo(val){
				this.indexs = val
				 this.$store.state.baseinfo.obj = val
				 this.param.basic = val
				 this.cusselectOK = this.$store.state.customerInfo.seletOk
				 this.mortgageOk = this.$store.state.mortgage.mortgageOk
				 console.log(val,"basic")
			},
			getcarinfo(){//
				if(this.$store.state.carinfo.obj.model_id!==""){
					this.param.entry3[0] = this.$store.state.carinfo.obj 
				}
			},
			
			getentry1(val){
				this.$store.state.customerInfo.entry1 = val
				this.param.entry1 = val
				 console.log(val,"entry1")
			},
			getentry2(val){
				this.$store.state.customerInfo.entry2 = val
				this.param.entry2 = val
				 console.log(val,"entry2")
			},
			
			getentry4(val){
				this.$store.state.parts.entry4 = val
				this.param.entry4 = val
				 console.log(val,"entry4")
			},
			getentry7(val){
				this.$store.state.parts.entry7 = val
				this.param.entry7 = val
				 console.log(val,"entry7")
			},
			getentry8(val){
				this.$store.state.parts.entry8 = val
				this.param.entry8 = val
				 console.log(val,"entry8")
			},
			getentry9(val){
				this.$store.state.parts.entry9 = val
				this.param.entry9 = val
				 console.log(val,"entry9")
			},
			getentry10(val){
				this.$store.state.parts.entry10 = val
				this.param.entry10 = val
				 console.log(val,"entry10")
			},
			getentry11(val){
				this.$store.state.parts.entry11 = val
				this.param.entry11 = val
				 console.log(val,"entry11")
			},
			
			getentry14(val){
				this.$store.state.paymentInfo.entry14 = val
				//this.$store.dispatch("setentry14",val)
				//this.param.entry14 = this.$store.state.paymentInfo.entry14
				console.log(val,"entry14")
				
			},
			getentry13(val){
				this.$store.state.paymentInfo.entry13 = val
				this.param.entry13 = this.$store.state.paymentInfo.entry13
				console.log(val,"entry13")
				
			},
			
			geinsuranceInfor(val){
				this.$store.state.insuranceInfo.obj = val
				this.param.entry6 = val
				 console.log(val,"entry6")
				
			},
			getmortgage(val){
				this.$store.state.mortgage.obj = val
				this.param.entry5 = val
				 console.log(val,"entry5")
				
			},
			//交付
			getdeliveryInfo(val){
				this.$store.state.deliveryInfo.obj = val
				this.param.entry12 = val
				 console.log(val,"entry12")
				
			},
			//发票
			getinvoiceInfo(val){
				this.$store.state.invoiceInfo.obj = val
				this.param.entry15 = val
				 console.log(val,"entry15")
				
			},
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f0f0f0;
}
</style>
