<template>
	<view class="submitorder-content">
		<view class="marB20">
			<navtitle title="基本信息" :clickTag="false" />
			<view v-for="(itemP, index1) in dataBaseList" :key="index1">

				<radioM v-if="itemP.isHave&&itemP.type == 'radioM'" :title="itemP.title" :CODES="itemP.CODES" :fieldName="itemP.fieldName"
				 module="basic" :value="itemP.value" @radiosMFun="radioMFun" />

				<selectM v-if="itemP.isHave&&itemP.type == 'selectM' " :title="itemP.title" :CODES="itemP.CODES" :fieldName="itemP.fieldName"
				 module="basic" :value="itemP.value" @PickMFun="PickMFun" />

				<inputM v-if="itemP.type == 'inputM'&& itemP.isHave" :ISnumber="itemP.numberVal" :isphoneNum="itemP.isphone" :title="itemP.title"
				 :fieldName="itemP.fieldName" module="basic" :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value"
				 :Required="false" :unit="false" @getval="radioMFun" />

			</view>
		</view>

		<view class="marB20">
			<view>
				<navtitle title="客户信息" :clickTag="true" @gotowhere="selectCustomers" />
				<view v-if="param.entry1.customer_id!==undefined">
					<view v-if="role=='1'">
						<view class="" v-for="(itemP, index3) in dataCustomerList" :key="index3">

							<textM v-if="itemP.type=='IMgtextM'" type="textcharacter" :value="itemP.value" />

							<textM v-if="itemP.type=='textM'" type="text" :Required="itemP.Required" :title="itemP.title" :ISnumber="itemP.numberVal"
							 :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value" :unit="false" />

							<selectM v-if="itemP.isHave&&itemP.type == 'selectM' " :title="itemP.title" :CODES="itemP.CODES" :fieldName="itemP.fieldName"
							 module="customer" :value="itemP.value" :Required="true" @PickMFun="PickMFun" />

							<textM v-if="itemP.type=='title'" type="textMtlt" :title="itemP.title" />
							<inputM v-if="itemP.type == 'inputM'&& itemP.isHave" :ISnumber="itemP.numberVal" :title="itemP.title" :fieldName="itemP.fieldName"
							 module="customer" :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value" :Required="false"
							 :unit="false" @getval="radioMFun" />
						</view>
					</view>
					
					<view v-if="role=='2'" v-for="(itemP, index5) in dataCustomerUnitList" :key="index5">
						<textM v-if="itemP.type=='IMgtextM'" type="textcharacter" :value="itemP.value" />

						<textM v-if="itemP.type=='title'" type="textMtlt" :title="itemP.title" />
						<textM v-if="itemP.type=='textM'" type="text" :Required="itemP.Required" :title="itemP.title" :ISnumber="itemP.numberVal"
						 :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value" :unit="false" />


						<selectM v-if="itemP.isHave&&itemP.type == 'selectM' " :title="itemP.title" :CODES="itemP.CODES" :fieldName="itemP.fieldName"
						 module="customerUnit" :value="itemP.value" :Required="false" @PickMFun="PickMFun" />


						<inputM v-if="itemP.type == 'inputM'&& itemP.isHave" :ISnumber="itemP.numberVal" :title="itemP.title" :fieldName="itemP.fieldName"
						 module="customerUnit" :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value"
						 :Required="false" :unit="false" @getval="radioMFun" />

					</view>
				</view>
			</view>
		</view>

		<view class="marB20">
			<navtitle title="商品信息" :clickTag="true" @gotowhere="goShop" />
			<view class="marB20" v-if="param.entry3.length>0">

				<shopM :titlesIndex="0" :arr="param.entry3" shopRole="entry3" @preinstalled="preinstalled" @getfinalPrice="getfinalPrice" />
				<totalM :totalPrice="totalentry3" />

				<view v-for="(itemP, index2) in dataCarInfoList" :key="index2">



					<radioM v-if="itemP.isHave&&itemP.type == 'radioM'" :title="itemP.title" :CODES="itemP.CODES" :fieldName="itemP.fieldName"
					 module="carinfo" :value="itemP.value" @radiosMFun="radioMFun" />

					<inputM v-if="itemP.type == 'inputM'&& itemP.isHave" :ISnumber="itemP.numberVal" :title="itemP.title" :fieldName="itemP.fieldName"
					 module="carinfo" :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value" :Required="false"
					 :unit="true" :unitIcon="itemP.unit" @getval="radioMFun" />

					<textM v-if="itemP.type=='textM'" type="text" :Required="itemP.Required" :title="itemP.title" :ISnumber="itemP.numberVal"
					 :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value" :unit="itemP.isunit" :unitIcon="itemP.isunit?itemP.unit:''" />
				</view>
			</view>
			<view class="marB20" v-if="param.entry4.length>0">
				<shopM :titlesIndex="1" :arr="param.entry4" shopRole="entry4" @bindChange="bindChange" @iswith="iswith" @isadd="isadd"
				 @preinstalled="preinstalled" @getfinalPrice="getfinalPrice" />
				<totalM :totalPrice="totalentry4" />
			</view>
			<view class="marB20" v-if="JSON.stringify(param.entry7)!== '{}'">
				<shopM :titlesIndex="2" :obj="param.entry7" shopRole="entry7" @bindChange="bindChange" @getfinalPrice="getfinalPrice" />
				<totalM :totalPrice="totalentry7" />
			</view>
			<view class="marB20" v-if="param.entry8.length>0">
				<shopM :titlesIndex="3" :arr="param.entry8" shopRole="entry8" @bindChange="bindChange" @getfinalPrice="getfinalPrice" />
				<totalM :totalPrice="totalentry8" />
			</view>
			<view class="marB20" v-if="param.entry10.length>0">
				<shopM :titlesIndex="4" :arr="param.entry10" shopRole="entry10" @bindChange="bindChange" @getfinalPrice="getfinalPrice" />
				<totalM :totalPrice="totalentry10" />
			</view>
			<view class="marB20" v-if="param.entry9.length>0">
				<shopM :titlesIndex="5" :arr="param.entry9" shopRole="entry9" @bindChange="bindChange" @getfinalPrice="getfinalPrice" />
				<totalM :totalPrice="totalentry9" />
			</view>

			<view class="marB20" v-if="param.entry11.length>0">
				<shopM :titlesIndex="6" :arr="param.entry11" shopRole="entry11" @bindChange="bindChange" @getfinalPrice="getfinalPrice" />
				<totalM :totalPrice="totalentry11" />
			</view>
		</view>
		<view class="marB20">
			<navtitle title="保险信息" :clickTag="true" @gotowhere="goInsurance" />


			<view v-if="param.entry6.org_id!==undefined" v-for="(itemP, index12) in dataInsuranceList" :key="index12">
				<textM v-if="itemP.type=='IMgtextM'" type="textMtlt" :title="itemP.value" />
				<selectM :Required="itemP.Required" v-if="itemP.isHave&&itemP.type == 'selectM' " :title="itemP.title" :CODES="itemP.CODES"
				 :fieldName="itemP.fieldName" module="insurance" :value="itemP.value" @PickMFun="PickMFun" />

				<inputM v-if="itemP.type == 'inputM'&& itemP.isHave" :ISnumber="itemP.numberVal" :title="itemP.title" :fieldName="itemP.fieldName"
				 module="insurance" :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value" :Required="false"
				 :unit="true" :unitIcon="itemP.unit" @getval="radioMFun" />

				<textareaM :Required="false" v-if="itemP.type == 'textareaM'&& itemP.isHave" :fieldName="itemP.fieldName" module="insurance"
				 :title="itemP.title" :value="itemP.value" @getval="radioMFun" />
			</view>
		</view>

		<view class="marB20">
			<navtitle title="款项信息" :clickTag="false" />
			<view v-for="(itemP, index) in dataPriceList" :key="index">
				<radioM v-if="itemP.isHave&&itemP.type == 'radioM'" :title="itemP.title" :CODES="itemP.CODES" :fieldName="itemP.fieldName"
				 module="price" :value="itemP.value" @radiosMFun="radioMFun" />

				<inputM v-if="itemP.type == 'inputM'&& itemP.isHave" :ISnumber="itemP.numberVal" :title="itemP.title" :fieldName="itemP.fieldName"
				 module="price" :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value" :Required="false"
				 :unit="false" @getval="radioMFun" />

				<textM v-if="itemP.type=='textM'" type="text" :Required="itemP.Required" :title="itemP.title" :ISnumber="itemP.numberVal"
				 :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value" :unit="false" />

			</view>
		</view>

		<view v-if="Isrepayment" class="marB20">
			<navtitle title="按揭项目" :clickTag="false" />
			<view v-for="(itemP, index7) in dataRepaymentList" :key="index7">

				<radioM v-if="itemP.isHave&&itemP.type == 'radioM'" :title="itemP.title" :CODES="itemP.CODES" :fieldName="itemP.fieldName"
				 module="repayment" :value="itemP.value" @radiosMFun="radioMFun" />

				<selectM :Required="itemP.Required" v-if="itemP.isHave&&itemP.type == 'selectM' " :title="itemP.title" :CODES="itemP.CODES"
				 :fieldName="itemP.fieldName" module="repayment" :value="itemP.value" @PickMFun="PickMFun" />

				<selectM :Required="itemP.Required" v-if="itemP.isHave&&itemP.type == 'selectM2' " type='select2' :title="itemP.title"
				 :CODES="itemP.CODES" :fieldName="itemP.fieldName" module="ORG" :FIDvalue="itemP.value" @PickMFun="PickMFun" />

				<textareaM :Required="false" v-if="itemP.type == 'textareaM'&& itemP.isHave" :fieldName="itemP.fieldName" module="repayment"
				 :title="itemP.title" :value="itemP.value" @getval="radioMFun" />

				<inputM v-if="itemP.type == 'inputM'&& itemP.isHave" :ISnumber="itemP.numberVal" :title="itemP.title" :fieldName="itemP.fieldName"
				 module="repayment" :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value" :Required="false"
				 :unit="true" :unitIcon="itemP.unit" @getval="radioMFun" />

				<textM v-if="itemP.type=='textM'" type="text" :Required="itemP.Required" :title="itemP.title" :ISnumber="itemP.numberVal"
				 :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value" :unit="true" :unitIcon="itemP.unit" />
			</view>

		</view>

		<view class="marB20">
			<navtitle title="交付信息" :clickTag="false" />
			<view v-for="(itemP, index10) in dataGiveList" :key="index10">
				<radioM v-if="itemP.isHave&&itemP.type == 'radioM'" :title="itemP.title" :CODES="itemP.CODES" :fieldName="itemP.fieldName"
				 module="give" :value="itemP.value" @radiosMFun="radioMFun" />

				<textareaM :Required="false" v-if="itemP.type == 'textareaM'&& itemP.isHave" :fieldName="itemP.fieldName" module="give"
				 :title="itemP.title" :value="itemP.value" @getval="radioMFun" />

				<selectM :Required="itemP.Required" v-if="itemP.isHave&&itemP.type == 'dateM' " type='date' :title="itemP.title"
				 :Datevalue="itemP.value" :start="itemP.start" :FIDvalue="itemP.value" :endDate="itemP.endDate" @bindDateChange="bindDateChange" />

			</view>

		</view>


		<view class="invoice-infor marB20">
			<navtitle title="发票信息" :clickTag="false" />
			<view v-for="(itemP, index11) in dataInvoiceList" :key="index11">
				<radioM v-if="itemP.isHave&&itemP.type == 'radioM'" :title="itemP.title" :CODES="itemP.CODES" :fieldName="itemP.fieldName"
				 module="invoice" :value="itemP.value" @radiosMFun="radioMFun" />


				<inputM v-if="itemP.type == 'inputM'&& itemP.isHave" :ISnumber="itemP.numberVal" :title="itemP.title" :fieldName="itemP.fieldName"
				 module="invoice" :valueNum="itemP.numberVal?itemP.value:0" :value="itemP.numberVal?'':itemP.value" :Required="false"
				 :unit="false" @getval="radioMFun" />
			</view>

		</view>

<view class="bottomgroup">
			<view class="row bottom-price">
				<view class="col-2">
					<view class="total">
						合计 <text class="price-icon">¥</text>
						<text class="price">{{getPrices}}</text>
					</view>
					<!-- <view class="discount">
						优惠金额0
					</view> -->
				</view>
				<!-- <view class="col-2 right category">
					商品数量: <text>0</text>
				</view> -->
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
					<view style="width: 100%;" class="comfirmbtn" @click="submit">
						确定
					</view>
				</view>
			</view>
			
			<view class="">
				<textarea :value="testValue" placeholder="" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex'
	import {
		UpdateAutoSalesOrder
	} from '@/api/test/index.js';
	import {
		dataBaseArr,
		dataCustomerArr,
		dataCustomerUnitArr,
		dataInvoiceArr,
		dataPriceArr,
		dataGiveArr,
		dataRepaymentArr,
		dataInsuranceArr,
		dataCarInfoArr
	} from './js/data.js';
	import fn from '../../common/filter.js'
	import navtitle from './components/title.vue' //列表
	import textareaM from './components/textarea.vue' //列表
	import selectM from './components/select.vue' //列表
	import textM from './components/text.vue' //列表
	import radioM from './components/radio.vue' //列表
	import inputM from './components/input.vue' //列表
	import shopM from './components/shop.vue' //列表
	import totalM from './components/total.vue' //列表

	export default {
		components: {
			navtitle,
			textareaM,
			selectM,
			textM,
			radioM,
			inputM,
			shopM,
			totalM
		},
		data() {
			return {
				testValue:'',
				num: "1",
				carPrice: 0, //车辆价格
				taxnum: 0, //税率
				getPrices: 0,
				firstPrice: 0,
				totalentry3M: 0,
				totalentry4M: 0,
				totalentry7M: 0,
				totalentry8M: 0,
				totalentry9M: 0,
				totalentry10M: 0,
				totalentry11M: 0,
				dataBaseList: dataBaseArr(), //基本
				role: "1", //1个人，2单位
				dataCarInfoList: dataCarInfoArr(), //整车
				dataCustomerList: dataCustomerArr(), //客户（个人）
				dataCustomerUnitList: dataCustomerUnitArr(), //客户（单位）
				dataInvoiceList: dataInvoiceArr(), //发票
				dataPriceList: dataPriceArr(), //款项
				dataGiveList: dataGiveArr(), //交付
				dataRepaymentList: dataRepaymentArr(), //按揭
				dataInsuranceList: dataInsuranceArr(), //保险
				Isrepayment: false, //按揭消费
				imgPro: '../../static/images/icons/icon-public-next.png',
				character: '../../static/images/icons/character.png',
				param: {
					"basic": {}, //销售订单基础数据
					"entry1": {}, //客户补充信息
					"entry2": {}, //车主信息
					"entry3": [], //车辆销售信息
					"entry4": [], //精品美容信息
					"entry5": {}, //按揭信息
					"entry6": {}, //保险信息
					"entry7": {}, //延保产品信息
					"entry8": [], //公司产品信息
					"entry9": [], //套餐产品
					"entry10": [], //代办业务信息
					"entry11": [], //卡券销售信息
					"entry12": {}, //交付信息
					"entry13": {}, //款项信息
					"entry14": {}, //支付信息
					"entry15": {}, //发票信息
				}
			}
		},
		onShow() {
			fn.tabbarRequired("true");
		},
		onLoad(ope) {
			console.log(ope.num)
			this.num = ope.num
		},
		created() {
			// debugger
			this.param = this.$store.state.test.param
			if (this.num !== "0") {
				this.getvalues()
			}
			//整车（分类：64）
		},
		computed: {
			totalentry3: function() { //整车
				let total = 0
				let arr = this.param.entry3
				if (arr.length > 0) {
					arr.forEach(function(key) {
						total = key.final_price;
						// total = key.final_price + key.tax_limit;
					});
				}
				this.totalentry3M = total
				this.radioMFun("car_price", total, "price") //整车款
				this.getPrice(); //应收总款
				return total
			},

			totalentry4: function() { //精品美容产品
				let total = 0
				let arr = this.param.entry4
				if (arr.length > 0) {
					arr.forEach(function(key) {
						total += Number(key.num) * Number(key.final_price);
					});
				}
				this.totalentry4M = total
				this.radioMFun("goods_price", total, "price") //精品美容款
				this.getPrice(); //应收总款
				return total
			},
			totalentry7: function() {
				let total = 0
				let obj = this.param.entry7
				if (JSON.stringify(obj) !== "{}") {
					total = Number(obj.num) * Number(obj.final_price);
				}

				this.totalentry7M = total
				this.productPrice() //产品款
				this.getPrice(); //应收总款
				return total
			},
			totalentry8: function() { //公司产品
				let total = 0
				let arr = this.param.entry8
				if (arr.length > 0) {
					arr.forEach(function(key) {
						total += Number(key.num) * Number(key.final_price);
					});
				}
				this.totalentry8M = total
				this.productPrice() //产品款
				this.getPrice(); //应收总款
				return total
			},
			totalentry9: function() { //套餐产品
				let total = 0
				let arr = this.param.entry9
				if (arr.length > 0) {
					arr.forEach(function(key) {
						total += Number(key.num) * Number(key.final_price);
					});
				}
				this.totalentry9M = total
				this.productPrice() //产品款
				this.getPrice(); //应收总款
				return total
			},
			totalentry10: function() { //代办业务
				let total = 0
				let arr = this.param.entry10
				if (arr.length > 0) {
					arr.forEach(function(key) {
						total += Number(key.num) * Number(key.final_price);
					});
				}
				this.totalentry10M = total
				this.radioMFun("commission_price", total, "price") //代办款
				this.getPrice(); //应收总款
				return total
			},
			totalentry11: function() { //卡券销售
				let total = 0
				let arr = this.param.entry11
				if (arr.length > 0) {
					arr.forEach(function(key) {
						total += Number(key.num) * Number(key.final_price);
					});
				}
				this.totalentry11M = total
				this.radioMFun("card_price", total, "price") //卡券款
				this.getPrice(); //应收总款
				return total
			},
		},
		watch: {
			getPrices(newName, oldName) { //监听应收总款，改变尾款
				let lastPrice = Number(newName) - this.firstPrice
				this.radioMFun("last_price", lastPrice, "price")
			},
			firstPrice(newName, oldName) { //监听定金，改变尾款
				let lastPrice = this.getPrices - Number(newName)
				this.radioMFun("last_price", lastPrice, "price")
			},
			carPrice(newName, oldName) { //监听整车成交价，改变税额
			// debugger
				let tax_limit = newName * (this.taxnum) / 100
				this.radioMFun("tax_limit", tax_limit, "carinfo")
			},
			taxnum(newName, oldName) { //监听整车税率，改变税额
			// debugger
				let tax_limit = (this.carPrice) * newName / 100
				this.radioMFun("tax_limit", tax_limit, "carinfo")
			},
		},
		methods: {
		async submit() {
				this.savedataBase(); //获取基本信息
				this.saveInvoice(); //获取发票
				this.savePrice(); //获取款项
				this.saveGive(); //获取交付
				if (this.Isrepayment) {
					this.saveRepayment(); //获取按揭
				} else {
					this.param.entry5 = {}
				}
				this.savecarinfo();//获取商品
				this.saveInsurance(); //获取保险
				// debugger
				console.log(this.$store.state.test.param)
				if (this.param.entry1.customer_id == undefined) {
					uni.showToast({
					    title: '请选择相应的客户信息',
					    duration: 2000
					});
					return
				} else if ((this.role == "1" && this.param.entry1.bd_name == "") || (this.role == "2" && this.param.entry1.unit_name ==
						"")) {
					uni.showToast({
					    title: '请选择相应的客户信息',
					    duration: 2000
					});
					return
				}

				this.saveCustomers(); //获取客户信息（个人）
				this.saveCustomerUnit(); //获取客户信息（单位）
				console.log(JSON.stringify(this.param))
				this.testValue = JSON.stringify(this.param)
				await this.$api.HHPF_P_AddAutoSalesOrder(this.param).then(res => {
					
					uni.showLoading({
					    title: '提交成功，正在返回订单列表'
					});
					// 清空状态管理的数据
					this.clearDtae();
					setTimeout(function(){
						// 获得数据
						uni.redirectTo({
						    url: '../consultantsLists/consultantsLists'
						});
					},400)
					
				 }).catch(res => {
					 console.log(res)
					 uni.showToast({
					     title: res.Message,
					     duration: 2000
					 });
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			radioMFun(fieldName, newID, module) {
				if (module == "carinfo") { //整车
					let Dates = this.dataCarInfoList.find(item => item.fieldName == fieldName);
					Dates.value = newID

					if (fieldName == 'is_tax') { //待收购置税
						let nameDate = this.dataCarInfoList.find(item => item.fieldName == 'collection_type')
						if (newID == 0) { //
							nameDate.isHave = false
						} else {
							nameDate.isHave = true
						}
					}
					if (fieldName == 'final_price') {
						this.carPrice = newID
					}
					if (fieldName == 'tax_num') {
						this.taxnum = newID
					}
				}
				if (module == "repayment") { //按揭
					if (fieldName == 'org_type') { //类型
						this.getjg(newID)
					}
					if (fieldName == 'price') { //额度
						let Dates = this.dataRepaymentList.find(item => item.fieldName == 'first_per');
						this.quota(Dates.value, newID)
					}
					if (fieldName == 'first_per') { //首比例
						let Dates = this.dataRepaymentList.find(item => item.fieldName == 'price');
						this.quota(newID, Dates.value)
					}

					let Dates = this.dataRepaymentList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}
				if (module == "basic") { //基本
					let Dates = this.dataBaseList.find(item => item.fieldName == fieldName);
					if (fieldName == 'order_from') { //订单来源
						let nameDate = this.dataBaseList.find(item => item.fieldName == 'name')
						if (newID == 14) { //代交车
							nameDate.isHave = true
						} else {
							nameDate.isHave = false
							nameDate.value = ''
						}
					}

					if (fieldName == 'pay_type') { //付款方式是按揭时
						let nameDate = this.dataBaseList.find(item => item.fieldName == 'name')
						if (newID == 68) { //按揭消费
							this.Isrepayment = true
						} else {
							this.Isrepayment = false
						}
					}
					if (fieldName == 'customer_kind') { //客户类型
						let nameDate = this.dataBaseList.find(item => item.fieldName == 'name')
						// debugger
						if (newID == 15) { //个人
							this.role = "1"
							if (this.num == "1") {
								this.clearCustomerUnit()
							}
						} else {
							if (this.num == "1") {
								this.clearCustomer()
							}
							this.role = "2"
						}
					}
					Dates.value = newID
				}
				if (module == "invoice") { //发票
					let Dates = this.dataInvoiceList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}

				if (module == "insurance") { //保险
					let Dates = this.dataInsuranceList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}
				if (module == "price") { //款项

					if (fieldName == 'first_price') {
						this.firstPrice = newID
					}

					let Dates = this.dataPriceList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}

				if (module == "give") { //交付
					let Dates = this.dataGiveList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}

				if (module == "customer") { //客户（个人）
					let Dates = this.dataCustomerList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}
				if (module == "customerUnit") { //客户（单位）
					let Dates = this.dataCustomerUnitList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}
			},

			getvalues() { //信息回填
				// debugger
				//基本信息
				this.radioMFun("order_kind", this.param.basic.order_kind, "basic")
				this.radioMFun("sell_kind", this.param.basic.sell_kind, "basic")
				this.radioMFun("car_type", this.param.basic.car_kind, "basic")
				this.radioMFun("order_channel", this.param.basic.order_channel, "basic")
				this.radioMFun("pay_type", this.param.basic.pay_type, "basic")
				this.radioMFun("order_from", this.param.basic.order_from, "basic")
				this.radioMFun("name", this.param.basic.name, "basic")
				this.radioMFun("customer_kind", this.param.entry1.kind, "basic")
				// debugger
				//整车信息
				if (this.param.entry3.length > 0) {
					// debugger
					this.radioMFun("final_price", this.param.entry3[0].final_price, "carinfo")
					this.radioMFun("is_tax", this.param.entry3[0].is_tax, "carinfo")
					this.radioMFun("collection_type", this.param.entry3[0].collection_type, "carinfo")
					this.radioMFun("tax_num", this.param.entry3[0].tax_num, "carinfo")
					this.radioMFun("tax_limit", this.param.entry3[0].tax_limit, "carinfo")
				}
				if (this.param.entry1.kind == 15) {
					this.radioMFun("bd_name", this.param.entry1.bd_name, "customer")
					this.radioMFun("com_phone", this.param.entry1.com_phone, "customer")
					this.radioMFun("cer_id_no", this.param.entry1.cer_id_no, "customer")
					this.radioMFun("name", this.param.entry2.name, "customer")
					this.radioMFun("phone", this.param.entry2.phone, "customer")
					this.radioMFun("identity", this.param.entry2.identity, "customer")
					this.radioMFun("relation", this.param.entry2.relation, "customer")
				} else {

					this.radioMFun("entrust_name", this.param.entry1.entrust_name, "customerUnit")
					this.radioMFun("entrust_phone", this.param.entry1.entrust_phone, "customerUnit")
					this.radioMFun("entrust_relation", this.param.entry1.entrust_relation, "customerUnit")
					this.radioMFun("unit_name", this.param.entry1.unit_name, "customerUnit")
					this.radioMFun("regist_no", this.param.entry1.regist_no, "customerUnit")
					this.radioMFun("unit_name1", this.param.entry1.unit_name, "customerUnit")
					this.radioMFun("regist_no1", this.param.entry1.regist_no, "customerUnit")
					this.radioMFun("register_site", this.param.entry1.register_site, "customerUnit")
				}

				if (JSON.stringify(this.param.entry6.org_id) !== "{}") {
					this.radioMFun("org_name", this.param.entry6.org_name, "insurance")
					this.radioMFun("jqx_price", this.param.entry6.jqx_price, "insurance")
					this.radioMFun("ccs_price", this.param.entry6.ccs_price, "insurance")
					this.radioMFun("syx_price", this.param.entry6.syx_price, "insurance")
					this.radioMFun("discount_price", this.param.entry6.discount_price, "insurance")
					this.radioMFun("other_price", this.param.entry6.other_price, "insurance")
					this.radioMFun("info", this.param.entry6.info, "insurance")
					this.radioMFun("kind", this.param.entry6.kind, "insurance")

				}
				if (this.Isrepayment) {
					// debugger
					// 按揭信息（缺少按揭类型）
					this.radioMFun("org_type", this.param.entry5.org_type == undefined ? 1 : this.param.entry5.org_type, "repayment") //按揭类型
					//根据按揭类型调取相应的按揭机构列表（成功后把相应的id回填）
					//this.radioMFun("org_id",this.param.entry5.org_id,"repayment")//按揭机构
					this.radioMFun("repayment_type", this.param.entry5.repayment_type == undefined ? 33 : this.param.entry5.repayment_type,
						"repayment")
					this.radioMFun("price", this.param.entry5.price == undefined ? 0 : this.param.entry5.price, "repayment")
					this.radioMFun("deadline", this.param.entry5.deadline == undefined ? 71 : this.param.entry5.deadline, "repayment")
					this.radioMFun("multiple_txt", this.param.entry5.multiple_txt == undefined ? '' : this.param.entry5.multiple_txt,
						"repayment")
					this.radioMFun("first_per", this.param.entry5.first_per == undefined ? 0 : this.param.entry5.first_per,
						"repayment")
					this.radioMFun("quota", this.param.entry5.quota == undefined ? 0 : this.param.entry5.quota, "repayment")
					this.radioMFun("org_from", this.param.entry5.org_src == undefined ? 26 : this.param.entry5.org_src, "repayment")
					this.radioMFun("qua_id", this.param.entry5.qua_id == undefined ? 84 : this.param.entry5.qua_id, "repayment")
					this.radioMFun("info", this.param.entry5.info == undefined ? '' : this.param.entry5.info, "repayment")
				}


				// 交付信息
				this.radioMFun("give_type", this.param.entry12.give_type, "give")
				this.radioMFun("address_kind", this.param.entry12.address_type, "give")
				this.radioMFun("is_self", this.param.entry12.is_self, "give")
				this.radioMFun("is_place", this.param.entry12.is_place, "give")
				this.radioMFun("is_other", this.param.entry12.is_other, "give")
				this.radioMFun("address", this.param.entry12.address, "give")
				this.radioMFun("postcode", this.param.entry12.postcode, "give")
				this.radioMFun("remark", this.param.entry12.remark, "give")
				this.radioMFun("info", this.param.entry12.info, "give")
				this.radioMFun("info2", this.param.entry12.info2, "give")
				this.radioMFun("give_date", this.param.entry12.give_date, "give")


				// 款项信息
				this.radioMFun("subscription_type", this.param.entry13.type, "price")
				this.radioMFun("first_price", this.param.entry13.first_price, "price")
				this.radioMFun("last_price", this.param.entry13.last_price, "price")
				this.radioMFun("get_price", this.param.entry14.get_price, "price")
				this.radioMFun("car_price", this.param.entry14.car_price, "price")
				this.radioMFun("goods_price", this.param.entry14.goods_price, "price")
				this.radioMFun("product_price", this.param.entry14.product_price, "price")
				this.radioMFun("commission_price", this.param.entry14.commission_price, "price")
				this.radioMFun("card_price", this.param.entry14.card_price, "price")


				//发票
				this.radioMFun("invoice_sum", this.param.entry15.invoice_sum, "invoice")
				this.radioMFun("invoice", this.param.entry15.invoice, "invoice")
				this.radioMFun("invoice_public", this.param.entry15.invoice_public, "invoice")

			},
			PickChange(e) {
				// debugger
				let fieldName = e.target.id
				let cur = e.target.dataset.current
				let newIndex = e.target.value;
				this.PickMFun(fieldName, newIndex, cur);
			},

			getjg(FType) {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				let param1 = JSON.stringify({
					FType: FType
				}) //默认是厂家
				this.$api.HHPlatForm_P_GetMortgageCompany(param1).then(res => {
					// 获得数据  
					let Dates = this.dataRepaymentList.find(item => item.fieldName == 'org_id');
					Dates.CODES = res
					this.$store.state.org_list1 = res
					if (res.length > 0) {
						Dates.value = res[0].FID
					} else {
						Dates.value = ""
					}
					setTimeout(function() {
						uni.hideLoading()
					}, 400)

				}).catch(res => {
					console.log(res)
					// 失败进行的操作
				})

			},
			quota(first_per, price) { //贷款额度总计=额度*首比例
				let quota = price * (100 - first_per) / 100

				let Dates = this.dataRepaymentList.find(item => item.fieldName == 'quota');
				Dates.value = quota

			},
			productPrice() { //款项产品款
				let productPrice = Number(this.totalentry7M) + Number(this.totalentry8M) + Number(this.totalentry9M)
				this.radioMFun("product_price", productPrice, "price")
			},
			getPrice() { //款项应收总额
				let getPrice = Number(this.totalentry3M) + Number(this.totalentry4M) + Number(this.totalentry7M) + Number(this.totalentry8M) +
					Number(this.totalentry9M) + Number(this.totalentry10M) + Number(this.totalentry11M)

				this.getPrices = getPrice
				this.radioMFun("get_price", getPrice, "price")
			},
			bindChange(e, i, k, shopRole) { //商品数量的加减
				console.log(e, i, k, shopRole)
				if (shopRole !== 'entry7') {
					let arr = this.getArr(shopRole)
					arr[k].num = e
					this.$set(arr, k, arr[k])
				} else {
					let obj = this.param.entry7
					obj.num = e
				}

				this.$store.state.test.param = this.param //保存
			},

			getfinalPrice(shopRole, newDate, index) { //得到成交价格
				this.getArr(shopRole)
				arr[index].final_price = newDate
				this.$set(arr, index, arr[index])
				this.$store.state.test.param = this.param //保存
			},
			getArr(shopRole) { //获取当前数据
				let arr = []
				if (shopRole == 'entry4') {
					arr = this.param.entry4
				}
				if (shopRole == 'entry8') {
					arr = this.param.entry8
				}
				if (shopRole == 'entry9') {
					arr = this.param.entry9
				}
				if (shopRole == 'entry10') {
					arr = this.param.entry10
				}
				if (shopRole == 'entry11') {
					arr = this.param.entry11
				}
				return arr
			},
			iswith(k) { //随车
				let arr = this.param.entry4
				let oldState = arr[k].is_with;
				let newState = oldState == 0 ? 1 : 0
				arr[k].is_with = newState
				this.$set(arr, k, arr[k])
				this.$store.state.test.param.entry4 = this.param.entry4 //保存
			},
			isadd(k) { //加装
				let arr = this.param.entry4
				let oldState = arr[k].is_add;
				let newState = oldState == 0 ? 1 : 0
				arr[k].is_add = newState
				this.$set(arr, k, arr[k])
				this.$store.state.test.param.entry4 = this.param.entry4 //保存
			},
			preinstalled(k) {
				let arr = this.param.entry4
				let oldState = arr[k].pre_installed;
				let newState = oldState == 0 ? 1 : 0
				arr[k].pre_installed = newState
				this.$set(arr, k, arr[k])
				this.$store.state.test.param.entry4 = this.param.entry4 //保存
			},
			// 处理客户信息清空
			clearCustomer() { //(个人)
				this.radioMFun("bd_name", "", "customer")
				this.radioMFun("com_phone", "", "customer")
				this.radioMFun("cer_id_no", "", "customer")
				this.radioMFun("name", "", "customer")
				this.radioMFun("phone", "", "customer")
				this.radioMFun("identity", "", "customer")
				this.radioMFun("relation", 21, "customer")
				this.param.entry1.bd_name = ""
				this.param.entry1.com_phone = ""
				this.param.entry1.cer_id_no = ""
				this.param.entry2.name = ""
				this.param.entry2.phone = ""
				this.param.entry2.identity = ""
				this.param.entry2.relation = 21


				this.$store.state.test.param.entry1.bd_name = ""
				this.$store.state.test.param.entry1.com_phone = ""
				this.$store.state.test.param.entry1.cer_id_no = ""
				this.$store.state.test.param.entry2.name = ""
				this.$store.state.test.param.entry2.phone = ""
				this.$store.state.test.param.entry2.identity = ""
				this.$store.state.test.param.entry2.relation = 21

			},
			clearCustomerUnit() { //(单位)
				this.radioMFun("entrust_name", "", "customerUnit")
				this.radioMFun("entrust_phone", "", "customerUnit")
				this.radioMFun("entrust_relation", 21, "customerUnit")
				this.radioMFun("unit_name", "", "customerUnit")
				this.radioMFun("regist_no", "", "customerUnit")
				this.radioMFun("unit_name1", "", "customerUnit")
				this.radioMFun("regist_no1", "", "customerUnit")
				this.radioMFun("register_site", "", "customerUnit")
				this.param.entry1.entrust_name = ""
				this.param.entry1.entrust_phone = ""
				this.param.entry1.entrust_relation = 21
				this.param.entry1.unit_name = ""
				this.param.entry1.regist_no = ""
				this.param.entry1.unit_name1 = ""
				this.param.entry1.regist_no1 = ""
				this.param.entry1.register_site = ""

				this.$store.state.test.param.entry1.entrust_name = ""
				this.$store.state.test.param.entry1.entrust_phone = ""
				this.$store.state.test.param.entry1.entrust_relation = 21
				this.$store.state.test.param.entry1.entrust_relation_txt = ""
				this.$store.state.test.param.entry1.unit_name = ""
				this.$store.state.test.param.entry1.regist_no = ""
				this.$store.state.test.param.entry1.register_site = ""
			},

			PickMFun(fieldName, newIndex, cur) {
				// debugger
				if (cur == "basic") { //基本
					let Dates = this.dataBaseList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].ID
					Dates.value = newID
				}

				if (cur == "repayment") { //按揭
					let Dates = this.dataRepaymentList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].ID
					Dates.value = newID
				}

				if (cur == "ORG") { //按揭金融机构
					let Dates = this.dataRepaymentList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].FID
					Dates.value = newID
				}

				if (cur == "customer") { //客户（个人）
					let Dates = this.dataCustomerList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].ID
					Dates.value = newID
				}

				if (cur == "customerUnit") { //客户（单位）
					let Dates = this.dataCustomerUnitList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].ID
					Dates.value = newID
				}
				if (cur == "insurance") { //保险
					let Dates = this.dataInsuranceList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].ID
					Dates.value = newID
				}

			},
			// 去客户列表页面
			selectCustomers() {
				this.savedataBase(); //获取基本信息
				this.saveInvoice(); //获取发票
				this.savePrice(); //获取款项
				this.saveGive(); //获取交付
				this.saveCustomers(); //获取客户信息（个人）
				this.saveCustomerUnit(); //获取客户信息（单位）
				if (this.Isrepayment) {
					this.saveRepayment(); //获取按揭
				} else {
					this.param.entry5 = {}
				}
				if(this.param.basic.order_kind==7){
					this.$store.state.shop="NoVehicle"
				}else{
					this.$store.state.shop="Vehicle"
				}
					this.savecarinfo();
				uni.navigateTo({
					url: "../search/search0?role=" + this.role
				});
			},
			goInsurance() { //跳转保险
				this.savedataBase(); //获取基本信息
				this.saveInvoice(); //获取发票
				this.savePrice(); //获取款项
				this.saveGive(); //获取交付
				this.saveCustomers(); //获取客户信息（个人）
				this.saveCustomerUnit(); //获取客户信息（单位）
				if (this.Isrepayment) {
					this.saveRepayment(); //获取按揭
				} else {
					this.param.entry5 = {}
				}
				if(this.param.basic.order_kind==7){
					this.$store.state.shop="NoVehicle"
				}else{
					this.$store.state.shop="Vehicle"
				}
				this.savecarinfo();
				uni.navigateTo({
					url: "../Insuranceinstitutions/Insuranceinstitutions"
				});
			},
			goShop(){
				this.savedataBase(); //获取基本信息
				this.saveInvoice(); //获取发票
				this.savePrice(); //获取款项
				this.saveGive(); //获取交付
				this.saveCustomers(); //获取客户信息（个人）
				this.saveCustomerUnit(); //获取客户信息（单位）
				if (this.Isrepayment) {
					this.saveRepayment(); //获取按揭
				} else {
					this.param.entry5 = {}
				}
				if(this.param.basic.order_kind==7){
					this.$store.state.shop="NoVehicle"
				}else{
					this.$store.state.shop="Vehicle"
				}
				this.savecarinfo();
				
				uni.navigateTo({
					url: "../shop-Mall/shop-Mall"
				});
			},
			//去选择保险
			goInsurance() {
				this.savedataBase(); //获取基本信息
				this.saveInvoice(); //获取发票
				this.savePrice(); //获取款项
				this.saveGive(); //获取交付
				this.saveCustomers(); //获取客户信息（个人）
				this.saveCustomerUnit(); //获取客户信息（单位）
				if (this.Isrepayment) {
					this.saveRepayment(); //获取按揭
				} else {
					this.param.entry5 = {}
				}
				this.savecarinfo();
				if(this.param.basic.order_kind==7){
					this.$store.state.shop="NoVehicle"
				}else{
					this.$store.state.shop="Vehicle"
				}
				
				uni.navigateTo({
					url: '../Insuranceinstitutions/Insuranceinstitutions'
				});
			},
			savecarinfo() {//整车
				if (this.param.entry3.length>0) {
					this.param.entry3[0].final_price = this.dataCarInfoList.find(item => item.fieldName == 'final_price').value //
					this.param.entry3[0].is_tax = this.dataCarInfoList.find(item => item.fieldName == 'is_tax').value //
					this.param.entry3[0].collection_type = this.dataCarInfoList.find(item => item.fieldName == 'collection_type').value //
					this.param.entry3[0].tax_num = this.dataCarInfoList.find(item => item.fieldName == 'tax_num').value //
					this.param.entry3[0].tax_limit = this.dataCarInfoList.find(item => item.fieldName == 'tax_limit').value //
				}
				this.$store.state.test.param = this.param	
			},
			//保险
			saveInsurance() {
				if (this.param.entry6.org_id !== undefined && this.param.entry6.org_id !== '' && this.param.entry6.org_id !== null) {
					this.param.entry6.jqx_price = this.dataInsuranceList.find(item => item.fieldName == 'jqx_price').value //
					this.param.entry6.ccs_price = this.dataInsuranceList.find(item => item.fieldName == 'ccs_price').value //
					this.param.entry6.syx_price = this.dataInsuranceList.find(item => item.fieldName == 'syx_price').value //
					this.param.entry6.discount_price = this.dataInsuranceList.find(item => item.fieldName == 'discount_price').value //
					this.param.entry6.other_price = this.dataInsuranceList.find(item => item.fieldName == 'other_price').value //
					this.param.entry6.info = this.dataInsuranceList.find(item => item.fieldName == 'info').value //
					this.param.entry6.kind = this.dataInsuranceList.find(item => item.fieldName == 'kind').value //
				} else {
					this.param.entry6 = {}
				}



				this.$store.state.test.param = this.param
			},
			saveCustomers() {
				this.param.entry2.relation = this.dataCustomerList.find(item => item.fieldName == 'relation').value //与车主关系
				this.param.entry2.name = this.dataCustomerList.find(item => item.fieldName == 'name').value //车主姓名
				this.param.entry2.name = this.dataCustomerList.find(item => item.fieldName == 'name').value //车主姓名
				this.param.entry2.phone = this.dataCustomerList.find(item => item.fieldName == 'phone').value //车主电话
				this.param.entry2.identity = this.dataCustomerList.find(item => item.fieldName == 'identity').value //证件号码
				this.$store.state.test.param = this.param
			},
			saveCustomerUnit() {
				this.param.entry1.entrust_name = this.dataCustomerUnitList.find(item => item.fieldName == 'entrust_name').value //委托人姓名
				this.param.entry1.entrust_phone = this.dataCustomerUnitList.find(item => item.fieldName == 'entrust_phone').value //委托人电话
				this.param.entry1.entrust_relation = this.dataCustomerUnitList.find(item => item.fieldName == 'entrust_relation').value //委托关系

				this.$store.state.test.param = this.param
			},
			//按揭
			saveRepayment() {
				this.param.entry5.org_id = this.dataRepaymentList.find(item => item.fieldName == 'org_id').value //按揭机构ID
				this.param.entry5.org_type = this.dataRepaymentList.find(item => item.fieldName == 'org_type').value //按揭类型
				this.param.entry5.repayment_type = this.dataRepaymentList.find(item => item.fieldName == 'repayment_type').value //还款方式
				this.param.entry5.price = this.dataRepaymentList.find(item => item.fieldName == 'price').value //	按揭金额额度总计
				this.param.entry5.deadline = this.dataRepaymentList.find(item => item.fieldName == 'deadline').value //贷款期限
				this.param.entry5.multiple_txt = this.dataRepaymentList.find(item => item.fieldName == 'multiple_txt').value //按揭内容
				this.param.entry5.first_per = this.dataRepaymentList.find(item => item.fieldName == 'first_per').value //首付比例
				this.param.entry5.quota = this.dataRepaymentList.find(item => item.fieldName == 'quota').value //贷款额度
				this.param.entry5.org_src = this.dataRepaymentList.find(item => item.fieldName == 'org_from').value //按揭机构来源I
				this.param.entry5.qua_id = this.dataRepaymentList.find(item => item.fieldName == 'qua_id').value //资质要求I
				this.param.entry5.info = this.dataRepaymentList.find(item => item.fieldName == 'info').value //备注

				this.$store.state.test.param = this.param
			},
			//交付
			saveGive() {
				this.param.entry12.give_type = this.dataGiveList.find(item => item.fieldName == 'give_type').value //交付方式
				this.param.entry12.address = this.dataGiveList.find(item => item.fieldName == 'address').value //取/送货地址
				this.param.entry12.address_type = this.dataGiveList.find(item => item.fieldName == 'address_kind').value //地址类型
				this.param.entry12.postcode = this.dataGiveList.find(item => item.fieldName == 'postcode').value //邮编
				this.param.entry12.give_date = this.dataGiveList.find(item => item.fieldName == 'give_date').value //约定交期
				this.param.entry12.remark = this.dataGiveList.find(item => item.fieldName == 'remark').value //交期备注
				this.param.entry12.other = "" //其他约定
				this.param.entry12.is_self = this.dataGiveList.find(item => item.fieldName == 'is_self').value //交期备注
				this.param.entry12.is_self = this.dataGiveList.find(item => item.fieldName == 'is_self').value //联系人类型
				this.param.entry12.other_person = "" //联系人
				this.param.entry12.info = this.dataGiveList.find(item => item.fieldName == 'info').value //备注
				this.param.entry12.is_place = this.dataGiveList.find(item => item.fieldName == 'is_place').value //二手车置换
				this.param.entry12.info2 = this.dataGiveList.find(item => item.fieldName == 'info2').value //二手车备注
				this.param.entry12.is_other = this.dataGiveList.find(item => item.fieldName == 'is_other').value //是否有其他约定


				this.$store.state.test.param = this.param
			},

			//保存基本信息
			savedataBase() {
				this.param.basic.order_kind = this.dataBaseList.find(item => item.fieldName == 'order_kind').value //订单类型
				this.param.basic.sell_kind = this.dataBaseList.find(item => item.fieldName == 'sell_kind').value //销售类型
				this.param.basic.car_kind = this.dataBaseList.find(item => item.fieldName == 'car_type').value //车辆类型
				this.param.basic.order_channel = this.dataBaseList.find(item => item.fieldName == 'order_channel').value //订单渠道
				this.param.basic.name = this.dataBaseList.find(item => item.fieldName == 'name').value //活动名称/代交组织
				this.param.basic.pay_type = this.dataBaseList.find(item => item.fieldName == 'pay_type').value //付款方式
				this.param.basic.order_from = this.dataBaseList.find(item => item.fieldName == 'order_from').value //订单来源
				this.param.entry1.kind = this.dataBaseList.find(item => item.fieldName == 'customer_kind').value //客户类型


				this.param.basic.src_id = 0 //关联订单
				this.param.basic.status = 0 //订单状态
				this.param.basic.is_self = 0 //是否车主本人
				this.param.basic.sell_org = 0 //销售组织
				this.param.basic.second_point = 0 //二级网点



				this.param.basic.adviser = this.$store.state.adviser //顾问人员ID
				this.param.basic.adviser_org_id = this.$store.state.orgID //顾问人员组织ID
				this.param.basic.adviser_org_name = this.$store.state.OrgName //顾问人员组织名称
				this.param.basic.adviser_department_id = this.$store.state.DeptID //顾问人员部门ID
				this.param.basic.adviser_department_name = this.$store.state.DeptName //顾问人员部门名称
				this.param.basic.adviser_post_id = this.$store.state.JOB_ID //顾问人员岗位ID
				this.param.basic.adviser_post_name = this.$store.state.JOB_NAME //顾问人员岗位名称
				this.param.basic.adviser_name = this.$store.state.B_NAME //顾问人员名称


				this.$store.state.test.param = this.param
			},
			//发票
			saveInvoice() {
				this.param.entry15.invoice = this.dataInvoiceList.find(item => item.fieldName == 'invoice').value //机动车发票
				this.param.entry15.invoice_public = this.dataInvoiceList.find(item => item.fieldName == 'invoice_public').value //普通发票
				this.param.entry15.invoice_sum = this.dataInvoiceList.find(item => item.fieldName == 'invoice_sum').value //	发票总额
				this.$store.state.test.param = this.param
			},
			//款项
			savePrice() {
				this.param.entry13.type = this.dataPriceList.find(item => item.fieldName == 'subscription_type').value //订金方式
				this.param.entry13.first_price = this.dataPriceList.find(item => item.fieldName == 'first_price').value //订金/定金
				this.param.entry13.last_price = this.dataPriceList.find(item => item.fieldName == 'last_price').value //尾款

				this.param.entry14.first_price = this.dataPriceList.find(item => item.fieldName == 'first_price').value //订金/定金
				this.param.entry14.last_price = this.dataPriceList.find(item => item.fieldName == 'last_price').value //尾款
				this.param.entry14.get_price = this.dataPriceList.find(item => item.fieldName == 'get_price').value //已收总额
				this.param.entry14.car_price = this.dataPriceList.find(item => item.fieldName == 'car_price').value //整车款
				this.param.entry14.goods_price = this.dataPriceList.find(item => item.fieldName == 'goods_price').value //商品款
				this.param.entry14.product_price = this.dataPriceList.find(item => item.fieldName == 'product_price').value //产品款
				this.param.entry14.commission_price = this.dataPriceList.find(item => item.fieldName == 'commission_price').value //代办款
				this.param.entry14.card_price = this.dataPriceList.find(item => item.fieldName == 'card_price').value //卡券款


				this.$store.state.test.param = this.param
			},


			//交付日期
			bindDateChange(fieldName, ID, module) {
				this.radioMFun(fieldName, ID, module)
			},
			clearDtae(){
				this.$store.state.test.param = {
					"basic": {}, //销售订单基础数据
					"entry1": {}, //客户补充信息
					"entry2": {}, //车主信息
					"entry3": [], //车辆销售信息
					"entry4": [], //精品美容信息
					"entry5": {}, //按揭信息
					"entry6": {}, //保险信息
					"entry7": {}, //延保产品信息
					"entry8": [], //公司产品信息
					"entry9": [], //套餐产品
					"entry10": [], //代办业务信息
					"entry11": [], //卡券销售信息
					"entry12": {}, //交付信息
					"entry13": {}, //款项信息
					"entry14": {}, //支付信息
					"entry15": {}, //发票信息
				}
			},
		},


	}
</script>

<style scoped>
	page {
		background-color: #f0f0f0;
	}

	.submitorder-content .payment-infor .commom-content .content {
		padding: 0;
	}

	.submitorder-content .payment-infor .commom-content .content .cell {
		padding: 28upx 30upx;
	}

	.submitorder-content .payment-infor .commom-content .content .borderT20 {
		border-top: 20upx solid #f0f0f0;
	}
</style>
