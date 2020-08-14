<template>
	<view>
		<!-- 客户信息 -->
		<view class="customer-Infor">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					客户信息
					<text class="blueline"></text>
				</view>
				<view class="col-2 right">
					<image @click="selectCustomers" class="blueline-icons" src="../../../static/images/icons/icon-Line-qiehuan.png"
					 mode="widthFix"></image>
				</view>
			</view>

			<view>
				<!--  -->
				<view v-if="cusselectOK">
				<view v-if="baseinfo.customer_kindNAME=='个人'" class="content">
					<view class="cell-headportrait row">
						<view class="col-2 row">
							<image class="character" src="../../../static/images/icons/character.png" mode="widthFix"></image>
							<view class="name">
								{{entry1.customer_name}}
							</view>
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2 Required">
							<text class="Required-star">*</text>
							客户电话
						</view>
						<view class="infoR col-2 right">
							<input class="uni-input" :value="entry1.customer_phone" :disabled="false" />
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2 Required">
							<text class="Required-star">*</text>
							身份证号
						</view>
						<view class="infoR col-2 right">
							<input class="uni-input" :disabled="false" :value="entry1.customer_IDcard" />
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2 Required">
							<text class="Required-star">*</text>
							客户来源
						</view>
						<view class="infoR col-2 right turntootherpage">
							<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<picker @change="sourceChange" :value="entry1.customer_fromIndex" :range="customer_fromNAME">
								<view class="uni-input">{{customer_fromNAME[entry1.customer_fromIndex]}}</view>
							</picker>
						</view>
					</view>
					
					
					<view v-if="customer_relationNAME.length !==0" class="info row">
						<view class="infoL col-2 Required">
							<text class="Required-star">*</text>
							与车主关系
						</view>
						<view class="infoR col-2 right turntootherpage">
							<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<picker @change="relationshipChange1" :value="entry2.relation" :range="customer_relationNAME">
								<view class="uni-input">{{customer_relationNAME[entry2.relationIndex]}}</view>
							</picker>
						</view>
					</view>
					
					<view class="ownerinfo">
						<view class="title">
							车主信息
						</view>
						<view class="list">
							<view class="cell row">
								<view class="cellL col-2">
									车主姓名
								</view>
								<view class="cellR col-2 right">
									<input class="uni-input" v-model="entry2.name" placeholder-style="color:#C3C3C3" placeholder="请输入" />
								</view>
							</view>
							<view class="cell row">
								<view class="cellL col-2">
									车主电话
								</view>
								<view class="cellR col-2 right">
									<input class="uni-input" v-model="entry2.phone" value="" placeholder-style="color:#C3C3C3" placeholder="请输入" />
								</view>
							</view>
							<view class="cell row">
								<view class="cellL col-2">
									证件类型
								</view>
								<view class="cellR col-2 right">
									身份证
								</view>
							</view>
							<view class="cell row">
								<view class="cellL col-2">
									证件号码
								</view>
								<view class="cellR col-2 right">
									<input class="uni-input" v-model="entry2.identity" value="" placeholder-style="color:#C3C3C3"
									 placeholder="请输入" />
								</view>
							</view>
						</view>
					</view>
				</view>

				<view v-else  class="content">
						<view class="cell-headportrait row">
							<view class="row">
								<image class="character" src="../../../static/images/icons/character.png" mode="widthFix"></image>
								<view class="name">
									{{entry1.company_NAME}}
								</view>
							</view>
							
						</view>
						<view class="info row">
							<view class="infoL col-2">
								委托人姓名
							</view>
							<view class="infoR col-2 right">
								<input class="uni-input" v-model="entry1.entrust_name" placeholder-style="color:#C3C3C3" placeholder="请输入"/>
							</view>
						</view>
						<view class="info row">
							<view class="infoL col-2">
								委托人电话
							</view>
							<view class="infoR col-2 right">
								<input class="uni-input"  v-model="entry1.entrust_phone"  value="" placeholder-style="color:#C3C3C3" placeholder="请输入"/>
							</view>
						</view>
						<view class="info row">
							<view class="infoL col-2">
								机构代码
							</view>
							<view class="infoR col-2 right">
								<input class="uni-input"  :value="entry1.company_CODE" :disabled="true" />
							</view>
						</view>					
						<view class="info row">
							<view class="infoL col-2">
								注册地址
							</view>
							<view class="infoR col-2 right">
								<input class="uni-input"  :value="entry1.company_ADDRESS" :disabled="true" />
							</view>
						</view>
						
						<view v-if="customer_relationNAME.length !==0" class="info row">
							<view class="infoL col-2 Required">
								<text class="Required-star">*</text>
								委托关系
							</view>
							<view class="infoR col-2 right turntootherpage">
								<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
								<picker @change="relationshipChange2" :value="entry1.relationIndex" :range="customer_relationNAME">
									<view class="uni-input">{{customer_relationNAME[entry1.relationIndex]}}</view>
								</picker>
							</view>
						</view>
						<view class="ownerinfo">
							<view class="title">
								上牌信息
							</view>
							<view class="list">
								<view class="cell row">
									<view class="cellL col-2">
										公司名称
									</view>
									<view class="cellR col-2 right">
										<input class="uni-input"  :value="entry1.company_NAME" :disabled="true" />
									</view>
								</view>
								<view class="cell row">
									<view class="cellL col-2">
										营业执照
									</view>
									<view class="cellR col-2 right">
										<input class="uni-input" :value="entry1.company_REGIST_NO" :disabled="true" />
									</view>
								</view>
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
	 * customerInfor 客户信息
	 * @description 客户信息组件
	 * @nodata = [true|false] 是否显示
	 * @example <no-data text="true"></no-data>
	 */
	import {mapGetters} from 'vuex'
	export default {
		name: 'customerInfor',
		props:{
			cusselectOK:{
				type: Boolean,
				default:false
			}
		},
		computed:{
			...mapGetters(['customer_fromID','customer_fromNAME','customer_relationNAME',"customer_relationID"])
		},
		data() {
			return {
				baseinfo:{},
				entry1:{},
				entry2:{}
			}
		},
		created() {
			// debugger
			var that = this;
			// that.$nextTick(() => {
				
			// });
			that.seletOk = that.$store.state.customerInfo.seletOk
			that.baseinfo = that.$store.state.baseinfo.obj
			that.entry1 = that.$store.state.customerInfo.entry1
			that.entry2 = that.$store.state.customerInfo.entry2
			
			if(that.entry1.customer_id!==0){//调接口获取客户信息
			// debugger
				if(that.baseinfo.customer_kindNAME=="个人"){
					that.getCustomerInfoByID(that.entry1.customer_id,'1')
					that.entry1.entrust = 0
				}else{
					that.getCustomerInfoByID(that.entry1.customer_id,'2')
					that.entry1.entrust = 1
				}
				
			}
		},
		watch: {
			entry1: {
				handler(newValue, oldValue) {
					this.$emit('entry1Change', this.entry1)
				},
				deep: true
			},
			entry2: {
				handler(newValue, oldValue) {
					this.$emit('entry2Change', this.entry2)
				},
				deep: true
			},
			
		},
		methods: {
			//客户详情
			async getCustomerInfoByID(id, CusType) {
				let that = this
				let param = JSON.stringify({
					ID: id,
					CusType: CusType
				})
				// ugger
				await that.$api.HHPlatForm_P_GetCustomerInfoByID(param).then(res => {

					if (CusType == '1') {
						
						that.entry1.customer_name = res[0].BD_NAME // 客户姓名
						that.entry1.customer_phone = res[0].COM_PHONE // 客户电话
						that.entry1.customer_IDcard = res[0].CER_ID_NO // 客户身份证号
					}else{
						that.entry1.company_NAME = res[0].UNIT_NAME//单位名称
						that.entry1.company_CODE = res[0].REGIST_NO//organizationCode
						that.entry1.company_ADDRESS = res[0].REGISTER_SITE//注册地址
						that.entry1.company_REGIST_NO = res[0].REGIST_NO//营业执照
					}
					
				}).catch(res => {
					console.log(res)
					// 失败进行的操作
				})
			},
			//客户信息
			selectCustomers() {
				// debugger
				// 去客户列表页面
				let role = '1'
				if(this.baseinfo.customer_kindNAME!=="个人"){
					role = '2'
				}
				// debugger
				uni.navigateTo({
					url: "../search/search?role=" + role
				});
			},
			//客户来源
			sourceChange: function(e) {
				this.entry1.customer_fromIndex = e.target.value
			},
			//与车主关系
			relationshipChange1: function(e) {
				this.entry2.relationIndex = e.target.value
				this.entry2.relation = this.customer_relationID[e.target.value ];//id
				this.entry1.relation = this.customer_relationID[e.target.value ];//id
			},
			relationshipChange2: function(e) {
				this.entry1.relationIndex = e.target.value
				this.entry1.relation = this.customer_relationID[e.target.value ];//id
				this.entry2.relation = this.customer_relationID[e.target.value ];//id
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
	}
</style>
