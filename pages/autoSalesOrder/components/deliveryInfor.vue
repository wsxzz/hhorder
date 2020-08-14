<template>
	<view>
		<!-- 交付信息 -->
		<view class="marB20">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					交付信息
					<text class="blueline"></text>
				</view>
			</view>
			
			<view class="commom-content marB20">
				<view class="content">
					<view class="list">
						<view class="cell row">
							<view class="notesL">
								约定交期
							</view>
							<view class="notesR right turntootherpage">
								<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
								 <text @click="onShowDatePicker('date')">{{deliveryInforData.give_date}}</text>
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								交期备注
							</view>
							<view class="notesR right">
								 <input  v-model="deliveryInforData.remark"  class="uni-input" placeholder-style="color:#C3C3C3" placeholder="请填写" />
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								交付方式        
							</view>
							<view class="notesR right">
								<button v-for="(item,index) in give_typeCodes" :key="index" @click="deliveryMethod(item.ID,index)" :class="{'on': deliveryInforData.give_typeIndex==index?true:false}"  class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								地址类型
							</view>
							<view class="notesR right">
								
								<button v-for="(item,index) in address_kindCodes" :key="index" @click="addressType(item.ID,index)" :class="{'on':deliveryInforData.address_typeIndex==index?true:false}"  class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
						</view>
						</view>
						<view class="cell row">
							<view class="addressL">
								取/送货地址
							</view>
							<view class="addressR right">
								 <textarea  v-model="deliveryInforData.address"  auto-height="96upx"  placeholder="请输入地址" />
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								邮编
							</view>
							<view class="notesR right">
								 <input  v-model="deliveryInforData.postcode"  class="uni-input" placeholder-style="color:#C3C3C3" placeholder="请填写" />
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								联系人
							</view>
							<view class="notesR right">
								<button @click="contacts(1)" :class="{'on': deliveryInforData.is_self===1}"  class="yybtn mini-btn" size="mini" type="default">客户</button>
								<button @click="contacts(0)" :class="{'on': deliveryInforData.is_self===0}"  class="yybtn mini-btn" size="mini" type="default">其他</button>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			<view class="commom-content">
				<view class="content">
					<view class="list">
						<view class="cell split-title">
							其他约定
						</view>
						<view class="cell row">
							<view class="notesL">
								与客户约定
							</view>
							<view class="notesR right">
								<button @click="hasAgreement(1)" :class="{'on': deliveryInforData.other===1}"  class="yybtn mini-btn" size="mini" type="default">有</button>
								<button @click="hasAgreement(0)" :class="{'on': deliveryInforData.other===0}"  class="yybtn mini-btn" size="mini" type="default">无</button>
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								备注
							</view>
						</view>
						<view class="cell">
							<textarea  v-model="deliveryInforData.info"  width="100%"  maxlength="128" placeholder="请输入内容 (最多128个字)"/>
						</view>
						<view class="cell row">
							<view class="notesL">
								二手车置换
							</view>
							<view class="notesR right">
								<button @click="hasUsedCar(1)" :class="{'on': deliveryInforData.is_place===1}"   class="yybtn mini-btn" size="mini" type="default">有</button>
								<button @click="hasUsedCar(0)" :class="{'on': deliveryInforData.is_place===0}"   class="yybtn mini-btn" size="mini" type="default">无</button>
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								备注
							</view>
						</view>
						<view class="cell">
							<textarea v-model="deliveryInforData.info2" width="100%"  maxlength="128" placeholder="请输入内容 (最多128个字)"/>
						</view>
					</view>
				</view>
			</view>
		</view>
		 <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	/*
	*
	 * deliveryInfor 交付信息
	 * @description 交付信息组件
	 * @example<deliveryInfor @deliveryInforValChange="getdeliveryInforData"  ref="deliveryInforItem"></deliveryInfor>
	 */
	// import MxDatePicker from "../../../components/mx-datepicker/mx-datepicker.vue";
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import {mapGetters} from 'vuex'
	export default {
		name: 'deliveryInfor',
		props: {
		},
		components: {
		      MxDatePicker,
					
		        },
			computed:{
				...mapGetters(['give_typeCodes',"address_kindCodes"]),
			},
		data() {
			return {
				showPicker: false,
				type: 'rangetime',
				value: '',
				deliveryInforData:{},
			}
		},
		watch: {
		      deliveryInforData: {
		       handler(newValue, oldValue) {
				  this.$emit('deliveryInforValChange',this.deliveryInforData)
		        },
		        deep: true
		      }
		},
		created() {
			// debugger
			this.deliveryInforData =  this.$store.state.deliveryInfo.obj
			this.deliveryInforData.give_date = '2020-01-01'
		},
		methods: {
			onShowDatePicker(type){//显示
			    this.type = type;
			    this.showPicker = true;
			    this.value = this[type];
			},
			onSelected(e) {//选择
			    this.showPicker = false;
			    if(e) {
			        this[this.type] = e.value; 
					this.deliveryInforData.give_date = e.value.replace(new RegExp("/","gm"),"-")
			    }
			},
			//交付方式
			deliveryMethod(e,index){
					this.deliveryInforData.give_typeIndex = index;//切换样式
					this.deliveryInforData.give_type = e;
			},
			//地址类型
			addressType(e,index){
					this.deliveryInforData.address_typeIndex = index;//切换样式
					this.deliveryInforData.address_type = e;
			},
			//联系人
			contacts(e){
				this.deliveryInforData.is_self = e;
			},
			//与客户约定
			hasAgreement(e){
				this.deliveryInforData.other = e;
			},
			//二手车置换
			hasUsedCar(e){
				this.deliveryInforData.is_place = e;
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F5;
	}
</style>
