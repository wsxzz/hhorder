<template>
	<view class="">
		<view>
			<!-- 商品信息 -->
			<view class="Commodity-infor marB20">
			
				<view v-if="true" class="Commodity-infor-nonvehical ">
					<!-- 精品美容 -->
					<!--  -->
					<checkbox-group @change="checkboxChange">
						<!-- 精品美容 -->
						<view v-if="fineBeauty.length>=1&&fineBeauty[0].good_id!==null" class="commom-content marB20">
							<view class="content">
								<view class="optionaltitle">
									<label>
										<!-- <checkbox value="fineBeauty" /> -->
										<text class="txt">精品美容</text>
									</label>
								</view>
								<view>
									<view v-for="(item ,i_fineBeauty) in fineBeauty" :key="i_fineBeauty">
										<view class="goodsinfolist">
											<!-- <label class="checkboxs">
												<checkbox :value="Checkbox.fineBeauty[i_fineBeauty].value" :checked="Checkbox.fineBeauty[i_fineBeauty].checked" />
											</label> -->
											<view class="uni-flex uni-row newcarcell_f">
												<view class="uni-flex goodavatar marR10" style="">
													<img style="width: 100%;" :src="item.img_url" />
												</view>
												<view class="carinfo">
													<view class="carname">
														{{item.good_name}}
													</view>
													<view class="listinfo">
														<text class="title">指导价格</text>
														<text class="value"> {{item.guide_price}}</text>
													</view>
												</view>
											</view>
										</view>
										<view class="">
											<view class="row">
												<view class="col-2">
													成交单价
												</view>
												<view class="col-2 right">
													{{item.final_price}}元
												</view>
											</view>
											<view class="row followCar">
												<view class="col-2">
													<text class="followCarbtn" :class="{'on': item.is_add===1}" @click="isadd(i_fineBeauty)">加装</text>
													<text class="followCarbtn" :class="{'on': item.is_with===1}" @click="isWith(i_fineBeauty)">随车</text>
													<text class="followCarbtn" :class="{'on': item.pre_installed===1}" @click="preInstalled(i_fineBeauty)">预装</text>
												</view>
												<view class="col-2 numberright">
													<view class="number-box row">
														<view class="reduce" @click="changenumber('reduce',item.num,i_fineBeauty,'fineBeauty')">
															<text class="iconfont">&#xe603;</text>
														</view>
														<view class="numberbox">
															<text class="number">{{item.num}}</text>
														</view>
														<view class="increase" @click="changenumber('increase',item.num,i_fineBeauty,'fineBeauty')">
															<text class="iconfont">&#xe602;</text>
														</view>
													</view>

												</view>
											</view>
										</view>
									</view>

									<view class="row">
										<view class="subtotal right">
											<text class="subtotaltxt">小计</text>
											<text class="subtotalicon">¥</text>
											<text class="subtotalmoney">
												{{subtotalPriceTotal('fineBeauty')}}
											</text>
										</view>
									</view>

								</view>

							</view>
						</view>

						<!-- 延保产品 -->
						<view v-if="Exinsurance.good_id!==null&&Exinsurance.good_id!==undefined" class="commom-content marB20">
							<view class="content">
								<view class="optionaltitle">
									<label>
										<!-- <checkbox value="vehicle" /> -->
										<text class="txt">延保产品</text>
									</label>
								</view>
								<view>
									<view>
										<view class="goodsinfolist">
											<!-- <label class="checkboxs">
												<checkbox :value="Checkbox.Exinsurance.value" :checked="Checkbox.Exinsurance.checked" />
											</label> -->
											<view class="uni-flex uni-row newcarcell_f">
												<view class="uni-flex goodavatar marR10" style="">
													<img style="width: 100%;" :src="Exinsurance.img_url" />
												</view>
												<view class="carinfo">
													<view class="carname">
														{{Exinsurance.good_name}}
													</view>
													<view class="listinfo">
														<text class="title">指导价格</text>
														<text class="value"> {{Exinsurance.guide_price}}</text>
													</view>
												</view>
											</view>
										</view>
										<view class="">
											<view class="row">
												<view class="col-2">
													成交单价
												</view>
												<view class="col-2 right">
													{{Exinsurance.final_price}}元
												</view>
											</view>
											<view class="row followCar">
												<view class="col-2 numberright">
													<view class="number-box row">
														<view class="reduce" @click="changenumber('reduce',item.num,0,'Exinsurance')">
															<text class="iconfont">&#xe603;</text>
														</view>
														<view class="numberbox">
															<text class="number">{{Exinsurance.num}}</text>
														</view>
														<view class="increase" @click="changenumber('increase',item.num,0,'Exinsurance')">
															<text class="iconfont">&#xe602;</text>
														</view>
													</view>

												</view>
											</view>
										</view>
									</view>

									<view class="row">
										<view class="subtotal right">
											<text class="subtotaltxt">小计</text>
											<text class="subtotalicon">¥</text>
											<text class="subtotalmoney">
												{{subtotalPriceTotal('Exinsurance')}}
											</text>
										</view>
									</view>

								</view>

							</view>
						</view>
						<!-- 公司产品 -->
						<view v-if="companyPro.length>=1&&companyPro[0].good_id!==null" class="commom-content marB20">
							<view class="content">
								<view class="optionaltitle">
									<label>
										<!-- <checkbox value="vehicle" /> -->
										<text class="txt">公司产品</text>
									</label>
								</view>
								<view>
									<view v-for="(item ,i_companyPro) in companyPro" :key="i_companyPro">
										<view class="goodsinfolist">
											<!-- <label class="checkboxs">
												<checkbox :value="Checkbox.companyPro[i_companyPro].value" :checked="Checkbox.companyPro[i_companyPro].checked" />
											</label> -->
											<view class="uni-flex uni-row newcarcell_f">
												<view class="uni-flex goodavatar marR10" style="">
													<img style="width: 100%;" :src="item.img_url" />
												</view>
												<view class="carinfo">
													<view class="carname">
														{{item.good_name}}
													</view>
													<view class="listinfo">
														<text class="title">指导价格</text>
														<text class="value"> {{item.guide_price}}</text>
													</view>
												</view>
											</view>
										</view>
										<view class="">
											<view class="row">
												<view class="col-2">
													成交单价
												</view>
												<view class="col-2 right">
													{{item.final_price}}元
												</view>
											</view>
											<view class="row followCar">
												<view class="col-2 numberright">
													<view class="number-box row">
														<view class="reduce" @click="changenumber('reduce',item.num,i_companyPro,'companyPro')">
															<text class="iconfont">&#xe603;</text>
														</view>
														<view class="numberbox">
															<text class="number">{{item.num}}</text>
														</view>
														<view class="increase" @click="changenumber('increase',item.num,i_companyPro,'companyPro')">
															<text class="iconfont">&#xe602;</text>
														</view>
													</view>

												</view>
											</view>
										</view>
									</view>

									<view class="row">
										<view class="subtotal right">
											<text class="subtotaltxt">小计</text>
											<text class="subtotalicon">¥</text>
											<text class="subtotalmoney">
												{{subtotalPriceTotal('companyPro')}}
											</text>
										</view>
									</view>

								</view>

							</view>
						</view>
						<!-- 套餐产品 -->
						<view v-if="Setmeal.length>=1&&Setmeal[0].good_id!==null" class="commom-content marB20">
							<view class="content">
								<view class="optionaltitle">
									<label>
										<!-- <checkbox value="vehicle" /> -->
										<text class="txt">套餐产品</text>
									</label>
								</view>
								<view>
									<view v-for="(item ,i_Setmeal) in Setmeal" :key="i_Setmeal">
										<view class="goodsinfolist">
											<!-- <label class="checkboxs">
												<checkbox :value="Checkbox.Setmeal[i_Setmeal].value" :checked="Checkbox.Setmeal[i_Setmeal].checked" /> -->
											</label>
											<view class="uni-flex uni-row newcarcell_f">
												<view class="uni-flex goodavatar marR10" style="">
													<img style="width: 100%;" :src="item.img_url" />
												</view>
												<view class="carinfo">
													<view class="carname">
														{{item.good_name}}
													</view>
													<view class="listinfo">
														<text class="title">指导价格</text>
														<text class="value"> {{item.guide_price}}</text>
													</view>
												</view>
											</view>
										</view>
										<view class="">
											<view class="row">
												<view class="col-2">
													成交单价
												</view>
												<view class="col-2 right">
													{{item.final_price}}元
												</view>
											</view>
											<view class="row followCar">
												<view class="col-2 numberright">
													<view class="number-box row">
														<view class="reduce" @click="changenumber('reduce',item.num,i_Setmeal,'Setmeal')">
															<text class="iconfont">&#xe603;</text>
														</view>
														<view class="numberbox">
															<text class="number">{{item.num}}</text>
														</view>
														<view class="increase" @click="changenumber('increase',item.num,i_Setmeal,'Setmeal')">
															<text class="iconfont">&#xe602;</text>
														</view>
													</view>

												</view>
											</view>
										</view>
									</view>

									<view class="row">
										<view class="subtotal right">
											<text class="subtotaltxt">小计</text>
											<text class="subtotalicon">¥</text>
											<text class="subtotalmoney">
												{{subtotalPriceTotal('Setmeal')}}
											</text>
										</view>
									</view>

								</view>

							</view>
						</view>
						<!-- 代办业务 -->
						<view v-if="agencyService.length>=1&&agencyService[0].good_id!==null" class="commom-content marB20">
							<view class="content">
								<view class="optionaltitle">
									<label>
										<!-- <checkbox value="vehicle" /> -->
										<text class="txt">代办业务</text>
									</label>
								</view>
								<view>
									<view v-for="(item ,i_agencyService) in agencyService" :key="i_agencyService">
										<view class="goodsinfolist">
											<!-- <label class="checkboxs">
												<checkbox :value="Checkbox.agencyService[i_agencyService].value" :checked="Checkbox.agencyService[i_agencyService].checked" />
											</label> -->
											<view class="uni-flex uni-row newcarcell_f">
												<view class="uni-flex goodavatar marR10" style="">
													<img style="width: 100%;" :src="item.img_url" />
												</view>
												<view class="carinfo">
													<view class="carname">
														{{item.good_name}}
													</view>
													<view class="listinfo">
														<text class="title">指导价格</text>
														<text class="value"> {{item.guide_price}}</text>
													</view>
												</view>
											</view>
										</view>
										<view class="">
											<view class="row">
												<view class="col-2">
													成交单价
												</view>
												<view class="col-2 right">
													{{item.final_price}}元
												</view>
											</view>
											<view class="row followCar">
												<view class="col-2 numberright">
													<view class="number-box row">
														<view class="reduce" @click="changenumber('reduce',item.num,i_agencyService,'agencyService')">
															<text class="iconfont">&#xe603;</text>
														</view>
														<view class="numberbox">
															<text class="number">{{item.num}}</text>
														</view>
														<view class="increase" @click="changenumber('increase',item.num,i_agencyService,'agencyService')">
															<text class="iconfont">&#xe602;</text>
														</view>
													</view>

												</view>
											</view>
										</view>
									</view>

									<view class="row">
										<view class="subtotal right">
											<text class="subtotaltxt">小计</text>
											<text class="subtotalicon">¥</text>
											<text class="subtotalmoney">
												{{subtotalPriceTotal('agencyService')}}
											</text>
										</view>
									</view>

								</view>

							</view>
						</view>
						<!-- 卡券销售 -->
						<view v-if="Cardvoucher.length>=1&&Cardvoucher[0].good_id!==null" class="commom-content marB20">
							<view class="content">
								<view class="optionaltitle">
									<label>
										<!-- <checkbox value="vehicle" /> -->
										<text class="txt">卡券销售</text>
									</label>
								</view>
								<view>
									<view v-for="(item ,i_Cardvoucher) in Cardvoucher" :key="i_Cardvoucher">
										<view class="goodsinfolist">
											<!-- <label class="checkboxs">
												<checkbox :value="Checkbox.Cardvoucher[i_Cardvoucher].value" :checked="Checkbox.Cardvoucher[i_Cardvoucher].checked" />
											</label> -->
											<view class="uni-flex uni-row newcarcell_f">
												<view class="uni-flex goodavatar marR10" style="">
													<img style="width: 100%;" :src="item.img_url" />
												</view>
												<view class="carinfo">
													<view class="carname">
														{{item.good_name}}
													</view>
													<view class="listinfo">
														<text class="title">指导价格</text>
														<text class="value"> {{item.guide_price}}</text>
													</view>
												</view>
											</view>
										</view>
										<view class="">
											<view class="row">
												<view class="col-2">
													成交单价
												</view>
												<view class="col-2 right">
													{{item.final_price}}元
												</view>
											</view>
											<view class="row followCar">
												<view class="col-2 numberright">
													<view class="number-box row">
														<view class="reduce" @click="changenumber('reduce',item.num,i_Cardvoucher,'Cardvoucher')">
															<text class="iconfont">&#xe603;</text>
														</view>
														<view class="numberbox">
															<text class="number">{{item.num}}</text>
														</view>
														<view class="increase" @click="changenumber('increase',item.num,i_Cardvoucher,'Cardvoucher')">
															<text class="iconfont">&#xe602;</text>
														</view>
													</view>

												</view>
											</view>
										</view>
									</view>

									<view class="row">
										<view class="subtotal right">
											<text class="subtotaltxt">小计</text>
											<text class="subtotalicon">¥</text>
											<text class="subtotalmoney">
												{{subtotalPriceTotal('Cardvoucher')}}
											</text>
										</view>
									</view>

								</view>

							</view>
						</view>
					</checkbox-group>
				</view>
			</view>



		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'parts',
		props: {},
		data() {
			return {
				"fineBeauty": [],//精品美容信息
				"Exinsurance": {},//延保产品信息
				"companyPro": [],//公司产品信息
				"Setmeal": [],//套餐产品
				"agencyService": [],//代办业务信息
				"Cardvoucher": [],//卡券销售信息
			}
		},
		watch: {
		      fineBeauty: {
		       handler(newValue, oldValue) {
				  this.$emit('entry4Change',this.fineBeauty)
		        },
		        deep: true
		      },
			  Exinsurance: {
			   handler(newValue, oldValue) {
			  				  this.$emit('entry7Change',this.Exinsurance)
			    },
			    deep: true
			  },
			  companyPro: {
			   handler(newValue, oldValue) {
			  				  this.$emit('entry8Change',this.companyPro)
			    },
			    deep: true
			  },
			  Setmeal: {
			   handler(newValue, oldValue) {
			  				  this.$emit('entry9Change',this.Setmeal)
			    },
			    deep: true
			  },
			  agencyService: {
			   handler(newValue, oldValue) {
			  				  this.$emit('entry10Change',this.agencyService)
			    },
			    deep: true
			  },
			  Cardvoucher: {
			   handler(newValue, oldValue) {
			  				  this.$emit('entry11Change',this.Cardvoucher)
			    },
			    deep: true
			  },
			  
		},
		computed: {
			...mapGetters(['car_kindNAME', "car_pay_typeCodes"]),
			//非整车的每个小记
			subtotalPriceTotal(name) {
				// debugger
				return function(name) {
					let self_ = this,
						total = 0,
						obj = [];
					switch (name) {
						case 'fineBeauty':
							obj = self_.fineBeauty
							break;
						case 'companyPro':
							obj = self_.companyPro
							break;
						case 'Setmeal':
							obj = self_.Setmeal
							break;
						case 'agencyService':
							obj = self_.agencyService
							break;
						case 'Cardvoucher':
							obj = self_.Cardvoucher
							break;
						case 'Exinsurance':
							obj = self_.Exinsurance
							break;
					}
					if(name!=="Exinsurance"){
						obj.forEach(function(key) {
							total += Number(key.num) * Number(key.final_price);
						});
					}else{
						total  =  Number(obj.num) * Number(obj.final_price);
					}
					
					return total
				}
			},
			// 总计
			totalPrice() {
				let self_ = this
				let totalPrice = 0 //总金额
				let carPrice = self_.carinfos.final_price //整车
				let fineBeautyPrice = 0 //非整车--精品美容
				self_.fineBeauty.forEach(function(key) {
					fineBeautyPrice += Number(key.num) * Number(key.final_price);
				});
				let ExinsurancePrice = 0 //非整车--延保
				ExinsurancePrice = Number(self_.Exinsurance.num) * Number(self_.Exinsurance.final_price);
				
				let companyProPrice = 0 //非整车--公司产品
				self_.companyPro.forEach(function(key) {
					companyProPrice += Number(key.num) * Number(key.final_price);
				});
				let agencyServicePrice = 0 //非整车--代办业务
				self_.agencyService.forEach(function(key) {
					agencyServicePrice += Number(key.num) * Number(key.final_price);
				});
				let SetmealPrice = 0 //非整车--套餐产品
				self_.Setmeal.forEach(function(key) {
					SetmealPrice += Number(key.num) * Number(key.final_price);
				});
				let CardvoucherPrice = 0 //非整车--卡券销售
				self_.Cardvoucher.forEach(function(key) {
					CardvoucherPrice += Number(key.num) * Number(key.final_price);
				});
				totalPrice = Number(carPrice) + Number(fineBeautyPrice) + Number(ExinsurancePrice) + Number(companyProPrice) +
					Number(agencyServicePrice) + Number(SetmealPrice) + Number(CardvoucherPrice)
			
				return totalPrice
			},
		},
		created() {
			// debugger
			this.fineBeauty = this.$store.state.parts.entry4
			this.Exinsurance = this.$store.state.parts.entry7
			this.companyPro = this.$store.state.parts.entry8
			this.Setmeal = this.$store.state.parts.entry9
			this.agencyService = this.$store.state.parts.entry10
			this.Cardvoucher = this.$store.state.parts.entry11
		},
		methods: {
			getCheckboxes() { //生成多选框数组
						// debugger
						let self_ = this;
						self_.Checkbox = {
							fineBeauty: [],
							Exinsurance: {},
							companyPro: [],
							Setmeal: [],
							agencyService: [],
							Cardvoucher: [],
						};
						for (var i = 0, lenI = self_.fineBeauty.length; i < lenI; ++i) {
							let item = {
								value: 'fineBeauty' + i,
								checked: true
							}
			
							if (self_.Checkboxsel.length > 0) {
								if (self_.Checkboxsel.includes(item.value)) {
									item.checked = true
								} else {
									item.checked = false
								}
							}
							self_.Checkbox.fineBeauty.push(item)
						}
			
						// for (var i = 0, lenI = self_.Exinsurance.length; i < lenI; ++i) {
							let item = {
								value: 'Exinsurance0',
								checked: true
							}
							if (self_.Checkboxsel.length > 0) {
								if (self_.Checkboxsel.includes(item.value)) {
									item.checked = true
								} else {
									item.checked = false
								}
							}
							self_.Checkbox.Exinsurance = {
								value: 'Exinsurance0',
								checked: true
							}
						// }
			
						for (var i = 0, lenI = self_.companyPro.length; i < lenI; ++i) {
							if(self_.Checkboxsel.length==0&&self_.companyPro[0].good_id!==null){
								self_.Checkboxsel[0] = 'companyPro0'
							}
							let item = {
								value: 'companyPro' + i,
								checked: true
							}
							if (self_.Checkboxsel.length > 0) {
								if (self_.Checkboxsel.includes(item.value)) {
									item.checked = true
								} else {
									item.checked = false
								}
							}
							self_.Checkbox.companyPro.push(item)
						}
						for (var i = 0, lenI = self_.Setmeal.length; i < lenI; ++i) {
							let item = {
								value: 'Setmeal' + i,
								checked: true
							}
							if (self_.Checkboxsel.length > 0) {
								if (self_.Checkboxsel.includes(item.value)) {
									item.checked = true
								} else {
									item.checked = false
								}
							}
							self_.Checkbox.Setmeal.push(item)
						}
						for (var i = 0, lenI = self_.agencyService.length; i < lenI; ++i) {
							let item = {
								value: 'agencyService' + i,
								checked: true
							}
							if (self_.Checkboxsel.length > 0) {
								if (self_.Checkboxsel.includes(item.value)) {
									item.checked = true
								} else {
									item.checked = false
								}
							}
							self_.Checkbox.agencyService.push(item)
						}
						for (var i = 0, lenI = self_.Cardvoucher.length; i < lenI; ++i) {
							let item = {
								value: 'Cardvoucher' + i,
								checked: true
							}
							if (self_.Checkboxsel.length > 0) {
								if (self_.Checkboxsel.includes(item.value)) {
									item.checked = true
								} else {
									item.checked = false
								}
							}
							self_.Checkbox.Cardvoucher.push(item)
						}
						console.log(self_.Checkbox)
					},
					checkboxChange: function(e) {
						let self_ = this;
						// var items = this.items,
						let values = e.detail.value;
						self_.Checkboxsel = values;
						console.log(values)
						console.log(self_.Checkbox)
						if (values.includes('fineBeauty1')) {
							console.log("1")
						}
					},
					getnewprice() { //改变checkbox，重新计算小记
						let self_ = this;
								for (var i = 0, lenI = self_.Checkbox.fineBeauty.length; i < lenI; ++i) {
									if(self_.fineBeauty[i].good_id!==null){
										if (self_.Checkboxsel.includes(self_.Checkbox.fineBeauty[i].value)) {
											self_.fineBeauty[i].final_price = self_.fineBeauty[i].noswith__price
										} else {
											self_.fineBeauty[i].final_price = 0
										}
									}
									
								}
								// for (var i = 0, lenI = self_.Checkbox.Exinsurance.length; i < lenI; ++i) {
									
								// 	if(self_.Exinsurance[i].good_id!==null){
								// 		if (self_.Checkboxsel.includes(self_.Checkbox.Exinsurance[i].value)) {
								// 			self_.Exinsurance[i].final_price = self_.Exinsurance[i].noswith__price
								// 		} else {
								// 			self_.Exinsurance[i].final_price = 0
								// 		}
								// 	}
								// }
								
								for (var i = 0, lenI = self_.Checkbox.companyPro.length; i < lenI; ++i) {
									if(self_.companyPro[i].good_id!==null){
										if (self_.Checkboxsel.includes(self_.Checkbox.companyPro[i].value)) {
											self_.companyPro[i].final_price = self_.companyPro[i].noswith__price
										} else {
											self_.companyPro[i].final_price = 0
										}
									}
								}
								
								for (var i = 0, lenI = self_.Checkbox.Setmeal.length; i < lenI; ++i) {
									if(self_.Setmeal[i].good_id!==null){
										if (self_.Checkboxsel.includes(self_.Checkbox.Setmeal[i].value)) {
											self_.Setmeal[i].final_price = self_.Setmeal[i].noswith__price
										} else {
											self_.Setmeal[i].final_price = 0
										}
									}
								}
								for (var i = 0, lenI = self_.Checkbox.agencyService.length; i < lenI; ++i) {
									if(self_.agencyService[i].good_id!==null){
										if (self_.Checkboxsel.includes(self_.Checkbox.agencyService[i].value)) {
											self_.agencyService[i].final_price = self_.agencyService[i].noswith__price
										} else {
											self_.agencyService[i].final_price = 0
										}
									}
								}
								for (var i = 0, lenI = self_.Checkbox.Cardvoucher.length; i < lenI; ++i) {
									if(self_.Cardvoucher[i].good_id!==null){
										if (self_.Checkboxsel.includes(self_.Checkbox.Cardvoucher[i].value)) {
											self_.Cardvoucher[i].final_price = self_.Cardvoucher[i].noswith__price
										} else {
											self_.Cardvoucher[i].final_price = 0
										}
									}
								}
							
					},
			
					
					// 是否加装
					isadd(index) {
						let self_ = this;
						if (self_.fineBeauty[index].is_add == 0) {
							self_.fineBeauty[index].is_add = 1
						} else if (self_.fineBeauty[index].is_add == 1) {
							self_.fineBeauty[index].is_add = 0
						}
					},
					//是否随车
					isWith(index) {
						let self_ = this;
						if (self_.fineBeauty[index].is_with == 0) {
							self_.fineBeauty[index].is_with = 1
							self_.fineBeauty[index].final_price = 0 //成交单价
						} else if (self_.fineBeauty[index].is_with == 1) {
							self_.fineBeauty[index].is_with = 0
							self_.fineBeauty[index].final_price = self_.fineBeauty[index].noswith__price //成交单价
						}
					},
					//是否预装
					preInstalled(index) {
						let self_ = this;
						if (self_.fineBeauty[index].pre_installed == 0) {
							self_.fineBeauty[index].pre_installed = 1
						} else if (self_.fineBeauty[index].pre_installed == 1) {
							self_.fineBeauty[index].pre_installed = 0
						}
					},
					//商品非整车（随车）
					changenumber(type, value, index, arr) {
						let self_ = this,
							value_new = 0;
						if (type === "reduce" && value > 0) { //减少
							value_new = value - 1
						}
						if (type === "reduce" && value == 0) { //减少
							value_new = 0
						}
						if (type === "increase") { //增加
							value_new = Number(value) + Number(1)
						}
			
			
						switch (arr) {
							case 'fineBeauty':
								self_.fineBeauty[index].num = value_new;
								break;
							case 'Exinsurance':
								self_.Exinsurance.num = value_new;
								break;
							case 'companyPro':
								self_.companyPro[index].num = value_new;
								break;
							case 'Setmeal':
								self_.Setmeal[index].num = value_new;
								break;
							case 'agencyService':
								self_.agencyService[index].num = value_new;
								break;
							case 'Cardvoucher':
								self_.Cardvoucher[index].num = value_new;
								break;
			
						}
					},
			
				}
			}
	
</script>

<style>
</style>

