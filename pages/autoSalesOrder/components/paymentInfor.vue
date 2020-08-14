<template>
	<view>
		<!-- 款项信息 -->
		<view class="payment-infor marB20">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					款项信息
					<text class="blueline"></text>
				</view>
			</view>
			<view class="commom-content">
				<view class="content marB20">
					<view class="list">
						<view class="cell row">
							<view class="notesL">
								订金方式
							</view>
							<view class="notesR right">
								<button v-for="(item,index) in subscription_typeCodes" :key="index" @click="depositMethod(item.ID,index)"
								 :class="{'on': entry13.typeIndex==index?true:false}" class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">
								{{subscription_typeNAME[entry13.typeIndex]==='定金'? "定金" : "订金"}}
							</view>
							<view class="notesR right">
								<input type="number" class="uni-input" v-model.number="entry13.first_price" placeholder-style="color:#C3C3C3"
								 placeholder="请填写" />
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">
								尾款
							</view>
							<view class="notesR right">
								{{last_price}}元
							</view>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="list">
						<view class="cell row">
							<view class="notesL Required">

								应收总额
							</view>
							<view class="notesR right">
								{{totalPrice}}元
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								整车款
							</view>
							<view class="notesR right">
								{{entry13.entry1_price}}元
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								精品美容款
							</view>
							<view class="notesR right">
								{{entryArrPrice(entry4)}}元
								<!-- {{entry13.entry2_price}}元 -->
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								产品款
							</view>
							<view class="notesR right">
								<!-- {{entry13.entry4_price}}元 -->
								{{entryArrPrice(entry8)}}元
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								套餐款
							</view>
							<view class="notesR right">
								<!-- {{entry13.entry6_price}}元 -->
								{{entryArrPrice(entry9)}}元
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								代办款
							</view>
							<view class="notesR right">
								<!-- {{entry13.entry3_price}}元 -->
								{{entryArrPrice(entry10)}}元
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								卡券款
							</view>
							<view class="notesR right">
								<!-- {{entry13.entry5_price}}元 -->
								{{entryArrPrice(entry11)}}元
							</view>
						</view>

						<view class="">
							测试
							{{totalPrice}}
						</view>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>
<script>
	/*
	 *
	 * paymentInfor 款项信息
	 * @description 款项信息组件
	 */
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'baseinfo',
		props: {
			param: {}
		},
		data() {
			return {
				entry13: {
					type:null,//	是	int	订金方式
					typeIndex:0,//	是	int	订金方式
					first_price:0,//	是	int	订金/定金，单位分，无时填0
					last_price:0,//	是	int	尾款，单位分，无时填0
					total_price:0,//	总额
				},
				entry4: this.$store.state.parts.entry4, //精品美容信息
				entry7: this.$store.state.parts.entry7, //延保产品信息
				entry8: this.$store.state.parts.entry8, //公司产品信息
				entry9: this.$store.state.parts.entry9, //套餐产品
				entry10: this.$store.state.parts.entry10, //代办业务信息
				entry11: this.$store.state.parts.entry11 ,//卡券销售信息
				
			}
		},
		computed: {
			...mapGetters(['subscription_typeCodes', "subscription_typeNAME"]),
			getfirst_price(){
				return this.entry13.first_price
			},
			getentr14(){
				let obj = {
					first_price:this.getfirst_price,//	是	int	订金(反写收款类型为整车订金的收款金额)，单位分，无时填0
					last_price:this.last_price,//	是	int	尾款(反写除整车订金的收款金)额合计，单位分，无时填0
					get_price:this.totalPrice,//	是	int	已收总额：订金+尾款，单位分，无时填0
					car_price:this.$store.state.carinfo.obj.final_price,//	是	int	整车款，单位分，无时填0
					goods_price	:this.entryArrPrice(this.entry4),//是	int	商品款，单位分，无时填0
					product_price:this.entryArrPrice(this.entry8),//	是	int	产品款，单位分，无时填0
					commission_price:this.entryArrPrice(this.entry10),//	是	int	代办款，单位分，无时填0
					card_price:this.entryArrPrice(this.entry11),//	是	int	卡券款，单位分，无时填0
				}
				return obj
			},
			//应收总额
			totalPrice() {
				// debugger
				let carprice = this.$store.state.carinfo.obj.final_price
				let entry4Price = this.entryArrPrice(this.entry4)
				let entry8Price = this.entryArrPrice(this.entry8)
				let entry9Price = this.entryArrPrice(this.entry9)
				let entry10Price = this.entryArrPrice(this.entry10)
				let entry11Price = this.entryArrPrice(this.entry11)
				let totalPrice = Number(entry4Price) + Number(entry8Price) + Number(entry9Price) + Number(entry10Price) + Number(entry11Price) + Number(carprice) 
				
				console.log(totalPrice)
				this.entry13.total_price = totalPrice
				return totalPrice
			},
			//尾款
			last_price() {
				let last_price = this.totalPrice - this.entry13.first_price
				this.entry13.last_price = last_price
				return last_price
			},
			entryArrPrice: function() {
				return function(arr) {
					var total = 0
					arr.forEach((item, index) => {
						total += Number(item.num) * Number(item.final_price);
					})
					return total
				}
			},
			entryObjPrice: function() {
				return function(arr) {
					total = Number(arr.num) * Number(arr.final_price);
					return total
				}
			},
		
		},
		watch: {
			getentr14: {
			 handler(newValue, oldValue) {
							   // debugger
							  this.$emit('entry14Change',this.getentr14)
			  },
			  deep: true
			},
		      entry13: {
		       handler(newValue, oldValue) {
				   // debugger
				  this.$emit('entry13Change',this.entry13)
		        },
		        deep: true
		      },
		},
		created() {
			// this.entry14.car_price = this.$store.state.carinfo.obj.final_price
			// this.subtotalPriceTotal('companyPro')
		},
		methods: {
			//非整车的每个小记
			subtotalPriceTotal(name) {
				// debugger
				let self_ = this,
					total = 0,
					obj = [];
				switch (name) {
					case 'fineBeauty':
						obj = self_.fineBeauty
						break;
					case 'Exinsurance':
						obj = self_.Exinsurance
						break;
					case 'companyPro':
						obj = self_.$store.state.parts.entry8
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
				}
				obj.forEach(function(key) {
					total += Number(key.num) * Number(key.final_price);
				});


				return total
			},
			//定金方式
			depositMethod(e, index) {
				this.entry13.typeIndex = index; //切换样式
				this.entry13.type = e;
			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
	}
</style>
