<template>
	<view class="submitorder-content">
		<view class="">
			<navtitle title="基本信息" :clickTag="false"/>
			<view class="marB20 commom-content">
				<view class="content">
					<view class="list">
						<view v-for="(itemP, index1) in dataBaseList" :key="index1">
							<view class="cell row" v-if="itemP.isHave">
								<view class="notesL">
									{{itemP.title}}
								</view>
								<view class="notesR right" v-if="itemP.type == 'radioM'">
									<button v-for="(item,i1) in itemP.CODES" :key="i1" @click="radioMFun(itemP.fieldName,item.ID,'basic')" :class="{'on': item.ID==itemP.value?true:false}"
									 class="yybtn mini-btn" size="mini" type="default">
										{{item.NAME}}
									</button>
								</view>
								<view class="notesR right turntootherpage" v-if="itemP.type == 'selectM'">
									<image class="icon-next" :src="imgPro" mode="widthFix"></image>

									<view v-for="(item,index2) in itemP.CODES" :key="item.ID" v-if="item.ID==itemP.value">
										<picker data-current="basic" :id="itemP.fieldName" @change="PickChange" :value="index2" :range-key="'NAME'"
										 :range="itemP.CODES">
											<view class="uni-input">{{itemP.CODES[index2].NAME}}</view>
										</picker>
									</view>
								</view>
								<view class="notesR right" v-if="itemP.type == 'inputM'&& itemP.isHave">
									<input class="uni-input" v-model="itemP.value" placeholder-style="color:#C3C3C3" placeholder="请填写" />
								</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>

		<!-- 客户信息 -->
		<view>
			<view class="customer-Infor">
				<navtitle title="客户信息" :clickTag="true" @gotowhere="selectCustomers"/>
				<view v-if="param.entry1.customer_id!==undefined">
					<view v-if="role=='1'" class="content">
						<view class="" v-for="(itemP, index3) in dataCustomerList" :key="index3">
							<view class="cell-headportrait row" v-if="itemP.type=='IMgtextM'">
								<view class="col-2 row">
									<image class="character" :src="character" mode="widthFix"></image>
									<view class="name">
										{{itemP.value}}
									</view>
								</view>
							</view>
							<view class="info row" v-if="itemP.type=='textM'">
								<view class="infoL col-2 Required">
									<text class="Required-star">*</text>
									{{itemP.title}}
								</view>
								<view class="infoR col-2 right">
									{{itemP.value}}
								</view>
							</view>
							<view class="info row" v-if="itemP.type=='selectM'">
								<view class="infoL col-2 Required">
									<text class="Required-star">*</text>
									{{itemP.title}}
								</view>
								<view class="infoR col-2 right turntootherpage">
									<view v-for="(item,index4) in itemP.CODES" :key="item.ID" v-if="item.ID==itemP.value">
										<image class="icon-next" :src="imgPro" mode="widthFix"></image>

										<picker data-current="customer" :id="itemP.fieldName" @change="PickChange" :value="index4" :range-key="'NAME'"
										 :range="itemP.CODES">
											<view class="uni-input">{{itemP.CODES[index4].NAME}}</view>
										</picker>

									</view>
								</view>
							</view>
							<view class="title" v-if="itemP.type=='title'">
								{{itemP.title}}
							</view>
							<view class="cell row" v-if="itemP.type=='inputM'">
								<view class="cellL col-2">
									{{itemP.title}}
								</view>
								<view class="cellR col-2 right">
									<input class="uni-input" v-model="itemP.value" placeholder-style="color:#C3C3C3" placeholder="请输入" />
								</view>
							</view>
							<view class="cell row" v-if="itemP.type=='placeholder'">
								<view class="cellL col-2">
									{{itemP.title}}
								</view>
								<view class="cellR col-2 right">
									{{itemP.value}}
								</view>
							</view>
						</view>
					</view>

					<view v-if="role=='2'" class="content" v-for="(itemP, index5) in dataCustomerUnitList" :key="index5">
						<view class="cell-headportrait row" v-if="itemP.type=='IMgtextM'">
							<view class="col-2 row">
								<image class="character" :src="character" mode="widthFix"></image>
								<view class="name">
									{{itemP.value}}
								</view>
							</view>
						</view>
						<view class="info row" v-if="itemP.type=='inputM'">
							<view class="infoL col-2 Required">
								{{itemP.title}}
							</view>
							<view class="infoR col-2 right">
								<input class="uni-input" v-model="itemP.value" placeholder-style="color:#C3C3C3" placeholder="请输入" />
							</view>
						</view>
						<view class="info row" v-if="itemP.type=='textM'">
							<view class="infoL col-2 Required">
								{{itemP.title}}
							</view>
							<view class="infoR col-2 right">
								{{itemP.value}}
							</view>
						</view>
						<view class="info row" v-if="itemP.type=='selectM'">
							<view class="infoL col-2 Required">
								<text class="Required-star">*</text>
								{{itemP.title}}
							</view>
							<view class="infoR col-2 right turntootherpage">
								<view v-for="(item,index6) in itemP.CODES" :key="item.ID" v-if="item.ID==itemP.value">
									<image class="icon-next" :src="imgPro" mode="widthFix"></image>

									<picker data-current="customerUnit" :id="itemP.fieldName" @change="PickChange" :value="index6" :range-key="'NAME'"
									 :range="itemP.CODES">
										<view class="uni-input">{{itemP.CODES[index6].NAME}}</view>
									</picker>

								</view>
							</view>
						</view>
						<view class="title" v-if="itemP.type=='title'">
							{{itemP.title}}
						</view>
						<view class="cell row" v-if="itemP.type=='placeholder'">
							<view class="cellL col-2">
								{{itemP.title}}
							</view>
							<view class="cellR col-2 right">
								{{itemP.value}}
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="">
			商品信息
		</view>
		<!-- 保险信息 -->
		<view>
			<navtitle title="保险信息" :clickTag="true" @gotowhere="goInsurance"/>
			<view class="Insurance-infor">
				<view class="Insurance-infor-title">
					华安保险股份有限公陪你公司
				</view>
				<view class="commom-content marB20">
					<view class="content">
						<view class="list" v-for="(itemP, index12) in dataInsuranceList" :key="index12">
							<view class="cell row" v-if="itemP.type == 'textareaM'">
								<view class="addressL">
									{{itemP.title}}
								</view>
								<view class="addressR right">
									<textarea v-model="itemP.value" auto-height="96upx" placeholder="请输入" />
									</view>
							</view>
							<view class="cell row"  v-else>
								<view class="notesL">
									{{itemP.title}}
								</view>
								<view class="notesR right unit" v-if="itemP.type == 'inputM'">
									<text class="icon-unit">{{itemP.unit}}</text>
									<input class="uni-input" type="number" v-model="itemP.value"   placeholder="请输入"/>
								</view>
								<view class="notesR right turntootherpage"  v-if="itemP.type == 'selectM'">
										<view v-for="(item,index13) in itemP.CODES" :key="item.ID" v-if="item.ID==itemP.value">
											<image class="icon-next" :src="imgPro" mode="widthFix"></image>
											
											<picker data-current="insurance" :id="itemP.fieldName" @change="PickChange" :value="index13" :range-key="'NAME'" :range="itemP.CODES">
												<view class="uni-input">{{itemP.CODES[index13].NAME}}</view>
											</picker>
										</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 款项信息 -->
		<view class="payment-infor marB20">
			<navtitle title="款项信息" :clickTag="false"/>
			<view class="commom-content">
				<view class="content marB20">
					<view class="list" v-for="(itemP, index) in dataPriceList" :key="index">
						<view class="cell row" :class="{'borderT20':itemP.addClass}">
							<view class="notesL">
								{{itemP.title}}
							</view>
							<view class="notesR right">
								<button v-if="itemP.type == 'radioM'" v-for="(item,i) in itemP.CODES" :key="i" @click="radioMFun(itemP.fieldName,item.ID,'price')"
								 :class="{'on': item.ID==itemP.value?true:false}" class="yybtn mini-btn" size="mini" type="default">
									{{item.NAME}}
								</button>
								<input v-if="itemP.type == 'inputM'" class="uni-input" type="number" v-model="itemP.value" placeholder="请输入订金" />
								<text v-if="itemP.type == 'textM'">
									{{itemP.value}}
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 按揭项目 -->
		<view v-if="Isrepayment" class="mortgage-pro marB20">
			<navtitle title="按揭项目" :clickTag="false"/>
			<view class="commom-content marB20">
				<view class="content">
					<view class="list" v-for="(itemP, index7) in dataRepaymentList" :key="index7">
						<view class="cell row" v-if="itemP.type == 'textareaM'">
							<view class="addressL">
								{{itemP.title}}
							</view>
							<view class="addressR right">
								<textarea v-model="itemP.value" auto-height="96upx" placeholder="请输入" />
								</view>
						</view>
						<view class="cell row"  v-else>
							<view class="notesL">
								{{itemP.title}}
							</view>
							<view class="notesR right unit" v-if="itemP.type == 'inputM'">
								<text class="icon-unit">{{itemP.unit}}</text>
								<input class="uni-input" type="number" v-model="itemP.value"   placeholder="请输入"/>
							</view>
							<view class="notesR right turntootherpage"  v-if="itemP.type == 'selectM'">
									<view v-for="(item,index8) in itemP.CODES" :key="item.ID" v-if="item.ID==itemP.value">
										<image class="icon-next" :src="imgPro" mode="widthFix"></image>
										
										<picker data-current="repayment" :id="itemP.fieldName" @change="PickChange" :value="index8" :range-key="'NAME'" :range="itemP.CODES">
											<view class="uni-input">{{itemP.CODES[index8].NAME}}</view>
										</picker>
									</view>
							</view>
							<view class="notesR right turntootherpage"  v-if="itemP.type == 'selectM2'">
									<view v-for="(item,index9) in itemP.CODES" :key="item.FNumber" v-if="item.FID==itemP.value">
										<image class="icon-next" :src="imgPro" mode="widthFix"></image>
										<picker data-current="ORG" :id="itemP.fieldName" @change="PickChange" :value="index9" :range-key="'FName'" :range="itemP.CODES">
											<view class="uni-input">{{itemP.CODES[index9].FName}}</view>
										</picker>
									</view>
							</view>
							<view class="notesR right" v-if="itemP.type == 'radioM'" >
								<button  v-for="(item,i2) in itemP.CODES" :key="i2"
									@click="radioMFun(itemP.fieldName,item.ID,'repayment')"
									:class="{'on': item.ID==itemP.value?true:false}"
									class="yybtn mini-btn" size="mini" type="default">
									{{item.NAME}}
								</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 交付信息	-->
		<view class="marB20">
			<navtitle title="交付信息" :clickTag="false"/>
			<view class="commom-content marB20">
				<view class="content">
					<view class="list"  v-for="(itemP, index10) in dataGiveList" :key="index10">
						<view class="cell row"  v-if="itemP.type == 'textareaM'">
							<view class="addressL">
								{{itemP.title}}
							</view>
							<view class="addressR right">
								 <textarea  v-model="itemP.value"  auto-height="96upx"  placeholder="请输入" />
							</view>
						</view>
						<view class="cell row" v-else>
							<view class="notesL">
								{{itemP.title}}
							</view>
							<view class="notesR right turntootherpage"  v-if="itemP.type == 'dateM'" >
									<image class="icon-next" :src="imgPro" mode="widthFix"></image>
									<picker mode="date" :value="itemP.value" :start="itemP.start" :end="itemP.endDate" @change="bindDateChange">
										<view class="">{{itemP.value}}</view>
									</picker>
							</view>
							<view class="notesR right" v-else>
								<input v-if="itemP.type == 'inputM'" class="uni-input" type="number" v-model="itemP.value"   placeholder="请输入"/>
								<button v-if="itemP.type == 'radioM'"  v-for="(item,i3) in itemP.CODES" :key="i3"
									@click="radioMFun(itemP.fieldName,item.ID,'give')"
									:class="{'on': item.ID==itemP.value?true:false}"
									class="yybtn mini-btn" size="mini" type="default">
									{{item.NAME}}
								</button>
							</view>
							
						</view>
						
					</view>
				</view>
			</view>
		</view>
							
							
		<view class="invoice-infor marB20">
			<navtitle title="发票信息" :clickTag="false"/>
			<view class="commom-content">
				<view class="content">
					<view class="list" v-for="(itemP, index11) in dataInvoiceList" :key="index11">
						<view class="cell row">
							<view class="notesL">
								{{itemP.title}}
							</view>
							<view class="notesR right">
								<input v-if="itemP.type == 'inputM'" class="uni-input" type="number" v-model="itemP.value"   placeholder="请输入发票总额"/>
								<button v-if="itemP.type == 'radioM'"  v-for="(item,i4) in itemP.CODES" :key="i4"
									@click="radioMFun(itemP.fieldName,item.ID,'invoice')"
									:class="{'on': item.ID==itemP.value?true:false}"
									class="yybtn mini-btn" size="mini" type="default">
									{{item.NAME}}
								</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapGetters} from 'vuex'
	import { UpdateAutoSalesOrder } from '@/api/test/index.js';
	import { dataBaseArr,dataCustomerArr,dataCustomerUnitArr,dataInvoiceArr,dataPriceArr,dataGiveArr ,dataRepaymentArr,dataInsuranceArr} from './js/data.js';
	import fn from '../../common/filter.js'
	import navtitle from './components/title.vue' //列表
	
	export default {
		components: {
			navtitle
		},
		data() {
			return {
				title1:"基本信息",
				num:"1",
				dataBaseList:dataBaseArr(),//基本
				role:"1",//1个人，2单位
				dataCustomerList:dataCustomerArr(),//客户（个人）
				dataCustomerUnitList:dataCustomerUnitArr(),//客户（单位）
				dataInvoiceList:dataInvoiceArr(),//发票
				dataPriceList:dataPriceArr(),//款项
				dataGiveList:dataGiveArr(),//交付
				dataRepaymentList:dataRepaymentArr(),//按揭
				dataInsuranceList:dataInsuranceArr(),//保险
				Isrepayment:false,//按揭消费
				imgPro:'../../static/images/icons/icon-public-next.png',
				character:'../../static/images/icons/character.png',
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
		onLoad(ope) {
			// debugger
			console.log(ope.num)
			this.num = ope.num
		},
		created() {
			// debugger
			this.param = this.$store.state.test.param
			if(this.num!=="0"){
				this.getvalues()
			} 
			
			// 按揭机构
		},
		methods:{
			getvalues(){//信息回填
				//基本信息
				this.radioMFun("order_kind",this.param.basic.order_kind,"basic")
				this.radioMFun("sell_kind",this.param.basic.sell_kind,"basic") 
				this.radioMFun("car_type",this.param.basic.car_kind,"basic")
				this.radioMFun("order_channel",this.param.basic.order_channel,"basic")
				this.radioMFun("pay_type",this.param.basic.pay_type,"basic")
				this.radioMFun("order_from",this.param.basic.order_from,"basic")
				this.radioMFun("name",this.param.basic.name,"basic")
				this.radioMFun("customer_kind",this.param.entry1.kind,"basic")
				// debugger
				
				if(this.param.entry1.kind==15){
					this.radioMFun("bd_name",this.param.entry1.bd_name,"customer")
					this.radioMFun("com_phone",this.param.entry1.com_phone,"customer")
					this.radioMFun("cer_id_no",this.param.entry1.cer_id_no,"customer")
					this.radioMFun("name",this.param.entry2.name,"customer")
					this.radioMFun("phone",this.param.entry2.phone,"customer")
					this.radioMFun("identity",this.param.entry2.identity,"customer")
					this.radioMFun("relation",this.param.entry2.relation,"customer")
				}else{
					
					this.radioMFun("entrust_name",this.param.entry1.entrust_name,"customerUnit")
					this.radioMFun("entrust_phone",this.param.entry1.entrust_phone,"customerUnit")
					this.radioMFun("entrust_relation",this.param.entry1.entrust_relation,"customerUnit")
					this.radioMFun("unit_name",this.param.entry1.unit_name,"customerUnit")
					this.radioMFun("regist_no",this.param.entry1.regist_no,"customerUnit")
					this.radioMFun("unit_name1",this.param.entry1.unit_name,"customerUnit")
					this.radioMFun("regist_no1",this.param.entry1.regist_no,"customerUnit")
					this.radioMFun("register_site",this.param.entry1.register_site,"customerUnit")
				}
				
				if(this.Isrepayment){
					// debugger
					// 按揭信息（缺少按揭类型）
					this.radioMFun("org_type",this.param.entry5.org_type==undefined?1:this.param.entry5.org_type,"repayment")//按揭类型
					//根据按揭类型调取相应的按揭机构列表（成功后把相应的id回填）
					//this.radioMFun("org_id",this.param.entry5.org_id,"repayment")//按揭机构
					this.radioMFun("repayment_type",this.param.entry5.repayment_type==undefined?33:this.param.entry5.repayment_type,"repayment")
					this.radioMFun("price",this.param.entry5.price==undefined?0:this.param.entry5.price,"repayment")
					this.radioMFun("deadline",this.param.entry5.deadline==undefined?71:this.param.entry5.deadline,"repayment")
					this.radioMFun("multiple_txt",this.param.entry5.multiple_txt==undefined?'':this.param.entry5.multiple_txt,"repayment")
					this.radioMFun("first_per",this.param.entry5.first_per==undefined?0:this.param.entry5.first_per,"repayment")
					this.radioMFun("quota",this.param.entry5.quota==undefined?0:this.param.entry5.quota,"repayment")
					this.radioMFun("org_from",this.param.entry5.org_src==undefined?26:this.param.entry5.org_src,"repayment")
					this.radioMFun("qua_id",this.param.entry5.qua_id==undefined?84:this.param.entry5.qua_id,"repayment")
					this.radioMFun("info",this.param.entry5.info==undefined?'':this.param.entry5.info,"repayment")
				}
				
				
				// 交付信息
				this.radioMFun("give_type",this.param.entry12.give_type,"give")
				this.radioMFun("address_kind",this.param.entry12.address_type,"give")
				this.radioMFun("is_self",this.param.entry12.is_self,"give")				
				this.radioMFun("is_place",this.param.entry12.is_place,"give")			
				this.radioMFun("is_other",this.param.entry12.is_other,"give")
				this.radioMFun("address",this.param.entry12.address,"give")
				this.radioMFun("postcode",this.param.entry12.postcode,"give")
				this.radioMFun("remark",this.param.entry12.remark,"give")
				this.radioMFun("info",this.param.entry12.info,"give")
				this.radioMFun("info2",this.param.entry12.info2,"give")
				this.radioMFun("give_date",this.param.entry12.give_date,"give")
				
				
				// 款项信息
				this.radioMFun("subscription_type",this.param.entry13.type,"price")
				this.radioMFun("first_price",this.param.entry13.first_price,"price")
				this.radioMFun("last_price",this.param.entry13.last_price,"price")
				this.radioMFun("get_price",this.param.entry14.get_price,"price")
				this.radioMFun("car_price",this.param.entry14.car_price,"price")
				this.radioMFun("goods_price",this.param.entry14.goods_price,"price")
				this.radioMFun("product_price",this.param.entry14.product_price,"price")
				this.radioMFun("commission_price",this.param.entry14.commission_price,"price")
				this.radioMFun("card_price",this.param.entry14.card_price,"price")
				
				
				//发票
				this.radioMFun("invoice_sum",this.param.entry15.invoice_sum,"invoice")
				this.radioMFun("invoice",this.param.entry15.invoice,"invoice")
				this.radioMFun("invoice_public",this.param.entry15.invoice_public,"invoice")
			
			},
			submit(){
				this.savedataBase();//获取基本信息
				this.saveInvoice();//获取发票
				this.savePrice();//获取款项
				this.saveGive();//获取交付
				if(this.Isrepayment){
					this.saveRepayment();//获取按揭
				}else{
					this.param.entry5 = {}
				}
				// debugger
				console.log(this.$store.state.test.param)
				if(this.param.entry1.customer_id==undefined){
					alert("请选择相应的客户信息");
					return
				}else if((this.role=="1"&&this.param.entry1.bd_name=="")||(this.role=="2"&&this.param.entry1.unit_name=="")){
					alert("请选择相应的客户信息");
					return
				}
				this.saveCustomers();//获取客户信息（个人）
				this.saveCustomerUnit();//获取客户信息（单位）
				console.log( JSON.stringify(this.param))
				
			},
			
			// 处理客户信息清空
			clearCustomer(){//(个人)
				this.radioMFun("bd_name","","customer")
				this.radioMFun("com_phone","","customer")
				this.radioMFun("cer_id_no","","customer")
				this.radioMFun("name","","customer")
				this.radioMFun("phone","","customer")
				this.radioMFun("identity","","customer")
				this.radioMFun("relation",21,"customer")
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
			clearCustomerUnit(){//(单位)
				this.radioMFun("entrust_name","","customerUnit")
				this.radioMFun("entrust_phone","","customerUnit")
				this.radioMFun("entrust_relation",21,"customerUnit")
				this.radioMFun("unit_name","","customerUnit")
				this.radioMFun("regist_no","","customerUnit")
				this.radioMFun("unit_name1","","customerUnit")
				this.radioMFun("regist_no1","","customerUnit")
				this.radioMFun("register_site","","customerUnit")
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
				this.$store.state.test.param.entry1.unit_name =  ""
				this.$store.state.test.param.entry1.regist_no =  ""
				this.$store.state.test.param.entry1.register_site = ""
			},
			
			
			radioMFun(fieldName,newID,module) {
				 
				if(module=="basic"){//基本
					let Dates = this.dataBaseList.find(item => item.fieldName == fieldName);
					if(fieldName=='order_from'){//订单来源
						let nameDate = this.dataBaseList.find(item => item.fieldName == 'name')
						if(newID==14){//代交车
							nameDate.isHave = true
						}else{
							nameDate.isHave = false
							nameDate.value = ''
						}
					}
					
					if(fieldName=='pay_type'){//付款方式是按揭时
						let nameDate = this.dataBaseList.find(item => item.fieldName == 'name')
						if(newID==68){//按揭消费
							this.Isrepayment = true
						}else{
							this.Isrepayment = false
						}
					}
					if(fieldName=='customer_kind'){//客户类型
						let nameDate = this.dataBaseList.find(item => item.fieldName == 'name')
						// debugger
						if(newID==15){//个人
							this.role = "1"
							if(this.num=="1"){
								this.clearCustomerUnit()
							}
						}else{
							if(this.num=="1"){
								this.clearCustomer()
							}
							this.role = "2"
						}
					}
					Dates.value = newID
				}
				
				if(module=="invoice"){//发票
					let Dates = this.dataInvoiceList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}
				if(module=="price"){//款项
					let Dates = this.dataPriceList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}
				
				if(module=="give"){//交付
					let Dates = this.dataGiveList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}
				
				if(module=="repayment"){//按揭
					let Dates = this.dataRepaymentList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}
				
				if(module=="customer"){//客户（个人）
					let Dates = this.dataCustomerList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}
				if(module=="customerUnit"){//客户（单位）
					let Dates = this.dataCustomerUnitList.find(item => item.fieldName == fieldName);
					Dates.value = newID
				}
			},
			PickChange(e){
				// debugger
				let fieldName = e.target.id
				let cur = e.target.dataset.current
				let newIndex = e.target.value;
				this.PickMFun(fieldName,newIndex,cur);
			},
			PickMFun(fieldName,newIndex,cur){
				// debugger
				if(cur=="basic"){//基本
					let Dates = this.dataBaseList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].ID
					Dates.value = newID
				}
				
				if(cur=="repayment"){//按揭
					let Dates = this.dataRepaymentList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].ID
					Dates.value = newID
				}
				
				if(cur=="ORG"){//按揭金融机构
					let Dates = this.dataRepaymentList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].FID
					Dates.value = newID
				}
				
				if(cur=="customer"){//客户（个人）
					let Dates = this.dataCustomerList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].ID
					Dates.value = newID
				}
				
				if(cur=="customerUnit"){//客户（单位）
					let Dates = this.dataCustomerUnitList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].ID
					Dates.value = newID
				}
				if(cur=="insurance"){//保险
					let Dates = this.dataInsuranceList.find(item => item.fieldName == fieldName);
					let newID = Dates.CODES[newIndex].ID
					Dates.value = newID
				}
				
			},
			// 去客户列表页面
			selectCustomers() {
				// debugger
				this.savedataBase();//获取基本信息
				this.saveInvoice();//获取发票
				this.savePrice();//获取款项
				this.saveGive();//获取交付
				if(this.Isrepayment){
					this.saveRepayment();//获取按揭
				}else{
					this.param.entry5 = {}
				}
				uni.navigateTo({
					url: "../search/search0?role=" + this.role
				});
			},
			saveCustomers(){
				this.param.entry2.relation = this.dataCustomerList.find(item => item.fieldName == 'relation').value//与车主关系
				this.param.entry2.name = this.dataCustomerList.find(item => item.fieldName == 'name').value//车主姓名
				this.param.entry2.name = this.dataCustomerList.find(item => item.fieldName == 'name').value//车主姓名
				this.param.entry2.phone = this.dataCustomerList.find(item => item.fieldName == 'phone').value//车主电话
				this.param.entry2.identity = this.dataCustomerList.find(item => item.fieldName == 'identity').value//证件号码
				this.$store.state.test.param = this.param
			},
			saveCustomerUnit(){
				this.param.entry1.entrust_name = this.dataCustomerUnitList.find(item => item.fieldName == 'entrust_name').value//委托人姓名
				this.param.entry1.entrust_phone = this.dataCustomerUnitList.find(item => item.fieldName == 'entrust_phone').value//委托人电话
				this.param.entry1.entrust_relation = this.dataCustomerUnitList.find(item => item.fieldName == 'entrust_relation').value//委托关系
				
				this.$store.state.test.param = this.param
			},
			//去选择保险
			goInsurance(){
				uni.navigateTo({
				    url: '../Insuranceinstitutions/Insuranceinstitutions'
				});
			},
			//按揭
			saveRepayment(){
				this.param.entry5.org_id = this.dataRepaymentList.find(item => item.fieldName == 'org_id').value//按揭机构ID
				this.param.entry5.org_type = this.dataRepaymentList.find(item => item.fieldName == 'org_type').value//按揭类型
				this.param.entry5.repayment_type = this.dataRepaymentList.find(item => item.fieldName == 'repayment_type').value//还款方式
				this.param.entry5.price = this.dataRepaymentList.find(item => item.fieldName == 'price').value//	按揭金额额度总计
				this.param.entry5.deadline = this.dataRepaymentList.find(item => item.fieldName == 'deadline').value//贷款期限
				this.param.entry5.multiple_txt = this.dataRepaymentList.find(item => item.fieldName == 'multiple_txt').value//按揭内容
				this.param.entry5.first_per = this.dataRepaymentList.find(item => item.fieldName == 'first_per').value//首付比例
				this.param.entry5.quota = this.dataRepaymentList.find(item => item.fieldName == 'quota').value//贷款额度
				this.param.entry5.org_src = this.dataRepaymentList.find(item => item.fieldName == 'org_from').value//按揭机构来源I
				this.param.entry5.qua_id = this.dataRepaymentList.find(item => item.fieldName == 'qua_id').value//资质要求I
				this.param.entry5.info = this.dataRepaymentList.find(item => item.fieldName == 'info').value//备注
				
				this.$store.state.test.param = this.param
			},
			//交付
			saveGive(){
				this.param.entry12.give_type = this.dataGiveList.find(item => item.fieldName == 'give_type').value//交付方式
				this.param.entry12.address = this.dataGiveList.find(item => item.fieldName == 'address').value//取/送货地址
				this.param.entry12.address_type = this.dataGiveList.find(item => item.fieldName == 'address_kind').value//地址类型
				this.param.entry12.postcode = this.dataGiveList.find(item => item.fieldName == 'postcode').value//邮编
				this.param.entry12.give_date = this.dataGiveList.find(item => item.fieldName == 'give_date').value//约定交期
				this.param.entry12.remark = this.dataGiveList.find(item => item.fieldName == 'remark').value//交期备注
				this.param.entry12.other = ""//其他约定
				this.param.entry12.is_self = this.dataGiveList.find(item => item.fieldName == 'is_self').value//交期备注
				this.param.entry12.is_self = this.dataGiveList.find(item => item.fieldName == 'is_self').value//联系人类型
				this.param.entry12.other_person = ""//联系人
				this.param.entry12.info = this.dataGiveList.find(item => item.fieldName == 'info').value//备注
				this.param.entry12.is_place = this.dataGiveList.find(item => item.fieldName == 'is_place').value//二手车置换
				this.param.entry12.info2 = this.dataGiveList.find(item => item.fieldName == 'info2').value//二手车备注
				this.param.entry12.is_other = this.dataGiveList.find(item => item.fieldName == 'is_other').value//是否有其他约定
				
				
				this.$store.state.test.param = this.param
			},
			
			//保存基本信息
			savedataBase(){
				this.param.basic.order_kind = this.dataBaseList.find(item => item.fieldName == 'order_kind').value//订单类型
				this.param.basic.sell_kind = this.dataBaseList.find(item => item.fieldName == 'sell_kind').value//销售类型
				this.param.basic.car_kind = this.dataBaseList.find(item => item.fieldName == 'car_type').value//车辆类型
				this.param.basic.order_channel = this.dataBaseList.find(item => item.fieldName == 'order_channel').value//订单渠道
				this.param.basic.name = this.dataBaseList.find(item => item.fieldName == 'name').value//活动名称/代交组织
				this.param.basic.pay_type = this.dataBaseList.find(item => item.fieldName == 'pay_type').value//付款方式
				this.param.basic.order_from = this.dataBaseList.find(item => item.fieldName == 'order_from').value//订单来源
				this.param.entry1.kind = this.dataBaseList.find(item => item.fieldName == 'customer_kind').value//客户类型
				
				
				this.param.basic.src_id = 0//关联订单
				this.param.basic.status = 0//订单状态
				this.param.basic.is_self = 0//是否车主本人
				this.param.basic.sell_org = 0//销售组织
				this.param.basic.second_point = 0//二级网点
				
				
				
				this.param.basic.adviser = this.$store.state.adviser	//顾问人员ID
				this.param.basic.adviser_org_id = this.$store.state.orgID//顾问人员组织ID
				this.param.basic.adviser_org_name = this.$store.state.OrgName	//顾问人员组织名称
				this.param.basic.adviser_department_id = this.$store.state.DeptID	//顾问人员部门ID
				this.param.basic.adviser_department_name = this.$store.state.DeptName	//顾问人员部门名称
				this.param.basic.adviser_post_id = this.$store.state.JOB_ID	//顾问人员岗位ID
				this.param.basic.adviser_post_name = this.$store.state.JOB_NAME	//顾问人员岗位名称
				this.param.basic.adviser_name = this.$store.state.B_NAME	//顾问人员名称
			
				
				this.$store.state.test.param = this.param
			},
			//发票
			saveInvoice(){
				this.param.entry15.invoice = this.dataInvoiceList.find(item => item.fieldName == 'invoice').value//机动车发票
				this.param.entry15.invoice_public = this.dataInvoiceList.find(item => item.fieldName == 'invoice_public').value//普通发票
				this.param.entry15.invoice_sum = this.dataInvoiceList.find(item => item.fieldName == 'invoice_sum').value//	发票总额
				this.$store.state.test.param = this.param
			},
			//款项
			savePrice(){
				this.param.entry13.type = this.dataPriceList.find(item => item.fieldName == 'subscription_type').value//订金方式
				this.param.entry13.first_price = this.dataPriceList.find(item => item.fieldName == 'first_price').value//订金/定金
				this.param.entry13.last_price = this.dataPriceList.find(item => item.fieldName == 'last_price').value//尾款
				
				this.param.entry14.first_price = this.dataPriceList.find(item => item.fieldName == 'first_price').value//订金/定金
				this.param.entry14.last_price = this.dataPriceList.find(item => item.fieldName == 'last_price').value//尾款
				this.param.entry14.get_price = this.dataPriceList.find(item => item.fieldName == 'get_price').value//已收总额
				this.param.entry14.car_price = this.dataPriceList.find(item => item.fieldName == 'car_price').value//整车款
				this.param.entry14.goods_price = this.dataPriceList.find(item => item.fieldName == 'goods_price').value//商品款
				this.param.entry14.product_price = this.dataPriceList.find(item => item.fieldName == 'product_price').value//产品款
				this.param.entry14.commission_price = this.dataPriceList.find(item => item.fieldName == 'commission_price').value//代办款
				this.param.entry14.card_price = this.dataPriceList.find(item => item.fieldName == 'card_price').value//卡券款
				
				
				this.$store.state.test.param = this.param
			},
			
			
			//交付日期
			bindDateChange: function(e) {
				this.radioMFun("give_date",e.target.value,"give")
			},
		}
	}
</script>

<style scoped>
	page {
		background-color: #f0f0f0;
	}
	.submitorder-content .payment-infor .commom-content .content{
		padding:0;
	}
	.submitorder-content .payment-infor .commom-content .content .cell{
		padding:28upx 30upx;
	}
	.submitorder-content .payment-infor .commom-content .content .borderT20{
		border-top: 20upx solid #f0f0f0;
	}
</style>
