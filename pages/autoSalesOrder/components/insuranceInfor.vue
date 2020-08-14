<template>
	<view>
		<!-- 保险信息 -->
		<view class="Insurance-infor">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					保险信息
					<text class="blueline"></text>
				</view>
				<view class="col-2 right">
					<image @click="goInsurance" class="blueline-icons" src="../../../static/images/icons/icon-public-more2.png" mode="widthFix"></image>
				</view>
			</view>
			<view v-show="insselectOK">
				<view class="Insurance-infor-title">	
							{{insurance.name}}
				</view>
				<view class="Insurance-infor-list">
					<view class="cell row">
						<view class="col-2">
							交强险
						</view>
						<view class="cellR col-2 right">
							<input type="number"v-model.number="insurance.jqx_price" @blur="mblur"/>
						</view>
					</view>
					<view class="cell row">
						<view class="col-2">
							车船税
						</view>
						<view class="cellR col-2 right">
							<input type="number" v-model.number="insurance.ccs_price" @blur="mblur"/>
							<!-- 0 <text>元</text> -->
						</view>
					</view>
					
					<view class="cell row">
						<view class="col-2">
							商业险
						</view>
						<view class="cellR col-2 right">
							<input type="number" v-model.number="insurance.syx_price"  @blur="mblur"/>
							<!-- 0  <text>元</text> -->
						</view>
					</view>
					<view class="cell row">
						<view class="col-2">
							其他
						</view>
						<view class="cellR col-2 right">
							<input type="number" v-model.number="insurance.other_price"  @blur="mblur"/>
						<!-- 0  <text>元</text> -->
						</view>
					</view>
					<!-- <view class="cell row">
						<view class="col-2">
							机构来源
						</view>
						<view class="cellR col-2 right turntootherpage">
							<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<picker @change="bindPickChangeorgFrom" :value="insurance.org_fromIndex" :range="org_fromNAME">
								<view class="uni-input">{{org_fromNAME[insurance.org_fromIndex]}}</view>
							</picker>
						</view>
					</view> -->
					<view class="cell row">
						<view class="col-2">
							保险类型
						</view>
						<view class="cellR col-2 right turntootherpage">
							<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<picker @change="bindPickChangeType" :value="insurance.kindIndex" :range="insurance_kindNAME">
								<view class="uni-input">{{insurance_kindNAME[insurance.kindIndex]}}</view>
							</picker>
						</view>
					</view>
					<view class="cell row">
						<view class="col-2">
							保险优惠
							<view class="tax-rate">
								税率以官方收费为准
							</view>
							<view class="view-policy" @click="checkpolicy">
								查看政策
							</view>
						</view>
						<view class="cellR col-2 right">
							<input type="number" v-model.number="insurance.discount_price"  @blur="mblur"/>
							<!-- 0 <text>元</text> -->
						</view>
					</view>
					
					<view class="cell row">
						<view class="col-2">
							备注
						</view>
						<view class="cellR col-2 right">
							<textarea v-model="insurance.info" placeholder="请填写" auto-height/>
						</view>
					</view>
					<view class="row">
						<view class="subtotal right">
							<text class="subtotaltxt">小计</text>
							<text class="subtotalicon">¥</text>
							<text class="subtotalmoney">{{subtotal}}</text>
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
	 * insuranceInfor 保险信息
	 * @description 保险信息组件
	 * hasinsurance = [true|false] 是否显示
	 * @example <insuranceInfor @insuranceInforValChange="getinsuranceInforData"  ref="insuranceInforItem"></insuranceInfor>
	 */
	import {mapGetters} from 'vuex'
	export default {
		name: 'insuranceInfor',
		props:{
			insselectOK:{
				type: Boolean,
				default:false
			},
		},
		data() {
			return {
				hasinsurance:false,//保险信息是否已经选好
				insurance:{},//保险信息
			}
		},
		computed: {
			...mapGetters(['insurance_kindNAME','insurance_kindID','org_fromNAME',"org_fromID"]),
			//计算税额
			subtotal(){
				let subtotal = Number(this.insurance.jqx_price) + Number(this.insurance.ccs_price) + Number(this.insurance.syx_price) + Number(this.insurance.discount_price) + Number(this.insurance.other_price) 
				// console.log(subtotal)
				 return subtotal
			},
			
		},
		created() {
			let that = this;
			
			that.insurance = that.$store.state.insuranceInfo.obj//重新拿保险数据
			
		},
		watch:{
			//保险具体信息改变
			insurance: {
			 handler(newValue, oldValue) {
				 // console.log('保险信息变化了', newValue, oldValue)
				this.$emit('insuranceInforValChange',this.insurance)
			  },
			  deep: true
			}
		},
		methods: {
			//去选择保险
			goInsurance(){
				uni.navigateTo({
				    url: '../Insuranceinstitutions/Insuranceinstitutions'
				});
			},
			// //失去焦点
			mblur(){
				console.log(event.detail)
				// event.detail = {value: value}
			},
			
			//查看政策
			checkpolicy(){
				alert("暂无")
				// this.$refs.insurancePolicyPopup.open()
			},
			//保险类型
			bindPickChangeType: function(e) {
			    this.insurance.kindIndex = e.target.value
				this.insurance.kind = this.insurance_kindID[e.target.value]
			},
			//机构来源
			bindPickChangeorgFrom: function(e) {
			    this.insurance.org_fromIndex = e.target.value
				this.insurance.org_src = this.org_fromID[e.target.value]
			},
		}
	}
	</script>
<style lang="scss" scoped>
	page{
		background-color: #F5F5F5;
	}
</style>