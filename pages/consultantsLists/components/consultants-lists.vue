<template>
	<view>
		<!-- 暂无数据 -->
		
		<!-- 订单列表 -->
			<view class="consultants-lists">
			<!-- 二手车入库单 -->
			<!-- 收款申请单 -->
			<!-- 二手车评估申请 -->
			<!-- 零售 -->
			<view v-if="consultantslists.length>0" class="consultants-lists-cell" v-for="(item,i) in consultantslists" :key="i">
				<view @click="onClick(item.ID)">
					<view class="row ordernum">
						<view class="ordernumL">
							{{item.ORDER_ID}}
							<text class="attribute">零售</text>
							<text class="date">{{item.ORDER_TIME}}</text>
						</view>
						<view class="ordernumR right state">
							{{states[item.STATUS]}}
						</view>
					</view>
					
					<view class="ordercontant row">
						<view class="col-2">
							<text class="ordername">{{item.BD_NAME}}</text>/{{item.DB_SEX}}
						</view>
						<view class="col-2 right">
							<image @tap.stop="makePhoneCall(item.TEl)" class="orderphone" src="../../../static/images/icons/icon-phone.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="carinfo">
						{{item.OFFICIA_LNAME}}
					</view>
					<view class="row shopnumber">
						<view class="col-2">
							<text class="text">商品数量</text>
							<text class="value">{{item.GOODS_NUM}}</text>
						</view>
						<view class="col-2 edit-more-btn right">
							<image @click.stop="toggleorderedit(item.ID)" class="icon-more " src="../../../static/images/icons/icon_more@2x.png" mode="widthFix"></image>
							<view class="edit-lists ordereditbtn" v-show="ordereditShow">
								<text @click.stop="changeOrder(item.ID,'变更')">变更订单</text>
								<text @click.stop="deleteOrder(item.ID)">删除订单</text>
								<!-- <text @click.stop="changeOrder(item.ID,'复制')">复制订单</text>
								<view v-if="screen==='yes'">
									<text @click.stop="changeOrder(item.ID,'追加')">追加订单</text>
									<text @click.stop="changeOrder(item.ID,'赠送')">赠送订单</text>
									<text @click.stop="changeOrder(item.ID,'升级')">升级订单</text>
								</view>
								<view v-if="screen==='no'">
								<text @click.stop="deleteOrder(item.ID)">删除订单</text>
								</view> -->
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="v-else">
				<nodata :nodata="NODATA"/>
			</view>
			<view class="loadAll" v-if="loadAll">已全部加载完毕</view>
			
			
		</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	import filter from '@/common/filter.js'
	import nodata from "@/components/no-data/no-data.vue"
	export default {
		props: {
			consultantslists: {//
				type: Array,
				default:[]
			},
			NODATA: {//
				type: Boolean,
				default:false
			},
			loadAll: {//
				type: Boolean,
				default:false
			},
		},  
		components:{
			nodata
		},
		data() {
			return {
				ordereditShow:false,
				states:['未提交','审批中','已审核', '驳回'],
			}
		},
		created() {
		},
		methods: {
			//
			godetails(){
				this.restoreInit();
				uni.navigateTo({
				    url: "../autoSalesOrderDetail/autoSalesOrderDetail?jiaose='1'",
					// jiaose='1'顾问
					// jiaose='0'经理
				});
			},
			
			//拨打电话
			makePhoneCall(phone){
				console.log(phone)
				if(phone!=="" && phone !==null){
					uni.makePhoneCall({
						phoneNumber: phone,
						success: () => {
							console.log("成功拨打电话")
						}
					})
				}else{
					uni.showToast({
					    title: '该电话格式不对',
						icon:'none',
					    duration: 2000
					});
				}
				
			},
			// 隐藏所有弹框,弹框恢复所有初始状态
			restoreInit(){
				//隐藏所有订单操作
				const ordertags = document.querySelectorAll('.ordereditbtn');
				const UserdCartags = document.querySelectorAll('.UserdCarbtn');
				const collectionApptags = document.querySelectorAll('.collectionAppbtn');
				const usedcarWaretags = document.querySelectorAll('.usedcarWarebtn');
				filter.hide(ordertags);
				filter.hide(UserdCartags);
				filter.hide(collectionApptags);
				filter.hide(usedcarWaretags);
			},
			//打开订单操作的弹框
			toggleorderedit(orderid){
				if(orderid !== this.ordereditIndex){
					this.ordereditIndex = orderid;//是否打开别的弹框
					this.restoreInit();
				}
				const state = document.querySelectorAll('.ordereditbtn')[orderid].style.display;
				console.log(state);
				console.log(document.querySelectorAll('.ordereditbtn')[orderid-1])
				if(state=="none"){
					document.querySelectorAll('.ordereditbtn')[orderid-1].style.display = 'block'
				}else{
					document.querySelectorAll('.ordereditbtn')[orderid-1].style.display = 'none'
				}
				
			},
			// 编辑订单
			changeOrder(oldorderId,edit){
				console.log("操作的订单id是"+oldorderId) 
				console.log("对订单进行"+edit)
				//对订单进行操作
				this.$store.state.submitorderOps = {
					"oldOrderId":oldorderId,//关联订单的id
					"edit":edit//订单的具体操作【提交/升级/变更/赠送等】
				}
				this.$store.state.shopId = "";
				this.restoreInit();
				//对订单进行操作
				uni.navigateTo({
				    url: "../submitorder/submitorder",
				});
			},
			// 删除订单
			deleteOrder(){
				this.restoreInit();
				uni.showToast({
					icon:"loading",
				    duration: 2000
				});
			},
			//点击列表
			onClick(id) {
				this.$emit('click',id)
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F5;
	}
	.loadAll{
		text-align: center;
		font-size: 26upx;
		color: #70767F;
		padding: 14upx 0 30upx;
	}
</style>