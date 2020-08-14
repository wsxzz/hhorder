<template>
	<view>
		<view v-if="mortgageOk" class="mortgage-pro marB20">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					按揭项目
					<text class="blueline"></text>
				</view>
			</view>
			<view class="commom-content marB20">
				<view class="content">
					<view class="list">
						<view class="cell row">
							<view class="notesL">
								额度总计
							</view>
							<view class="notesR right">
								¥0
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="commom-content">
				<view class="content">
					<view class="list">
						<view class="cell split-title">
							贷款信息
						</view>
						<view class="cell row">
							<view class="notesL">
								按揭类型
							</view>
							<view class="notesR right">
								<button v-for="(item,index) in mortgage_kindCodes" :key="index" @click="mortgageType(item.ID,index)"
								 :class="{'on': mortgageProDatas.mortgage_kindIndex==index?true:false}" class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								按揭机构
							</view>
							<view class="notesR right turntootherpage">
								<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
								<picker @change="PickerChangeOrgSrc" :value="mortgageProDatas.org_srcIndex" :range="mortgageProDatas.org_idArrayNAME">
									<view class="uni-input">{{mortgageProDatas.org_idArrayNAME[mortgageProDatas.org_srcIndex]}}</view>
								</picker>
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								机构来源
							</view>
							<view class="notesR right">
								<button v-for="(item,index) in org_fromCodes" :key="index" @click="mortgagesource(item.ID,index)"
								 :class="{'on': mortgageProDatas.org_srcIndex==index?true:false}" class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								还款方式
							</view>
							<view class="notesR right turntootherpage">
								<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
								<picker @change="pickerChangeRepayment" :value="mortgageProDatas.repayment_typeIndex" :range="payback_kindNAME">
									<view class="uni-input">{{payback_kindNAME[mortgageProDatas.repayment_typeIndex]}}</view>
								</picker>
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								首付比例
							</view>
							<view class="notesR right unit">
								<text class="icon-unit">%</text>
								<input class="uni-input" v-model="mortgageProDatas.first_per" placeholder-style="color:#C3C3C3" placeholder="请填写" />
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								贷款额度
							</view>
							<view class="notesR right unit">
								<text class="icon-unit">元</text>
								<input class="uni-input" v-model="mortgageProDatas.quota" placeholder-style="color:#C3C3C3" placeholder="请填写" />
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								贷款期限
							</view>
							<view class="notesR right turntootherpage">
								<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
								<picker @change="pickerMortgageLimit" :value="mortgageProDatas.deadlineIndex" :range="Mortgage_LimitNAME">
									<view class="uni-input">{{Mortgage_LimitNAME[mortgageProDatas.deadlineIndex]}}</view>
								</picker>
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								按揭内容
							</view>
							<view class="notesR right">
								{{Names(entry4)}}
								{{Names(entry8)}}
								{{Names(entry9)}}
								{{Names(entry10)}}
								{{Names(entry11)}}
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								资质要求
							</view>
							<view class="notesR right turntootherpage">
								<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
								<picker @change="pickerChangeQualify" :value="mortgageProDatas.qua_idIndex" :range="Qualification_KindNAME">
									<view class="uni-input">{{Qualification_KindNAME[mortgageProDatas.qua_idIndex]}}</view>
								</picker>
							</view>
						</view>
						<view class="cell row">
								<view class="notesL Required">
									备注说明
								</view>
								<view class="notesR right">
									<textarea v-model="mortgageProDatas.info" placeholder="请输入" />
									</view>
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
	 * mortgagePro 按揭项目
	 * @description 按揭项目组件
	 * @nodata = [true|false] 是否显示
	 * @example 	<mortgagePro  @mortgageProValChange="getmortgageProData"   :hasmortgagePro="baseinfoDatas.paymentMethods==='mortgage'" ref="mortgageProItem"></mortgagePro>
	 */
		import {mapGetters} from 'vuex'
	import filter from '../../../common/filter.js' //filter
	export default {
		name: 'mortgagePro',
		props: {
			mortgageOk:{
				type: Boolean,
				default:false,
			},
		},
		data() {
			return {
				mortgageProDatas:{},
				entry4: this.$store.state.parts.entry4, //精品美容信息
				entry7: this.$store.state.parts.entry7, //延保产品信息
				entry8: this.$store.state.parts.entry8, //公司产品信息
				entry9: this.$store.state.parts.entry9, //套餐产品
				entry10: this.$store.state.parts.entry10, //代办业务信息
				entry11: this.$store.state.parts.entry11 //卡券销售信息
			}
		},
		computed: {
			...mapGetters(['mortgage_kindCodes','org_fromCodes','payback_kindNAME',"payback_kindID","Mortgage_LimitNAME","Mortgage_LimitID","Qualification_KindNAME","Qualification_KindID"]),
			
			Names: function() {
				return function(arr) {
					var str = ""
					arr.forEach((item, index) => {
						str += item.good_name;
					})
					return str
				}
			},
			
			},
		watch: {
		      mortgageProDatas: {
		       handler(newValue, oldValue) {
				  this.$emit('mortgageProValChange',this.mortgageProDatas)
		        },
		        deep: true
		      }
		},
		created() {
			this.mortgageProDatas = this.$store.state.mortgage.obj
			// debugger
			if(this.mortgageProDatas.org_idArrayID.length==0){//按揭机构
				this.getmechanism()
			}
		},
		methods: {
			async getmechanism(){//获取机构
			let self_ = this;
				await self_.$api.HHPlatForm_P_GetMortgageCompany().then(res => {
					// 获得数据 
					res.forEach(function(val, index, arr){
						let name = val.FName;
						if(name.length>14){
							name = name.substring(0,15)+"..."
						}
						self_.mortgageProDatas.org_idArrayNAME.push(name);
						self_.mortgageProDatas.org_idArrayID.push(val.FID);
					});
					self_.mortgageProDatas.org_id = self_.mortgageProDatas.org_idArrayID[0]
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			//按揭类型
			mortgageType(e,index){
					this.mortgageProDatas.mortgage_kindIndex = index;//切换样式
					this.mortgageProDatas.mortgage_kind = e;//
			},
			//机构来源
			mortgagesource(e,index){
					this.mortgageProDatas.org_srcIndex = index;//切换样式
					this.mortgageProDatas.org_src = e;
			},
			// 期限
			pickerMortgageLimit: function(e) {
				this.mortgageProDatas.deadlineIndex = e.target.value
				this.mortgageProDatas.deadline = this.Mortgage_LimitID[e.target.value]
			},
			//资质要求
			pickerChangeQualify: function(e) {
			    this.mortgageProDatas.qua_idIndex = e.target.value
				this.mortgageProDatas.qua_id = this.Qualification_KindID[e.target.value]
			},
			//还款方式
			pickerChangeRepayment: function(e) {
			    this.mortgageProDatas.repayment_typeIndex = e.target.value
				this.mortgageProDatas.repayment_type = this.payback_kindID[e.target.value]
			},
			//按揭机构
			PickerChangeOrgSrc: function(e) {
			    this.mortgageProDatas.org_srcIndex = e.target.value
				this.mortgageProDatas.org_id = this.mortgageProDatas.org_idArrayID[e.target.value]
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F5;
	}
</style>
