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
				<view @click="godetails(item.ID)">
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
							<image @tap.stop="makePhoneCall(item.COM_PHONE)" class="orderphone" src="../../../static/images/icons/icon-phone.png" mode="widthFix"></image>
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
						</view>
					</view>
				</view>
				
			</view>
			<view class="v-else">
				<nodata :nodata="NODATA"/>
			</view>
			<view class="loadAll" v-if="loadAll">已全部加载完毕</view>
		</view>
		
		<view class="">
			<uni-popup ref="orderedits" type="bottom" :animation="true">
				<view class="uni-list-bd">
					<view class="center uni-list-item" @click="changeOrder('变更','true')" >
						变更订单
					</view>
					<view class="center uni-list-item uni-list-item-disabled" @click="changeOrder('复制','true')" >
						复制订单
					</view>
					<view class="center uni-list-item" @click="changeOrder('追加','true')" >
						追加订单
					</view>
					<view class="center uni-list-item" @click="changeOrder('赠送','true')" >
						赠送订单
					</view>
					<view class="center uni-list-item" @click="changeOrder('升级','true')" >
						升级订单
					</view>
					<view class="center uni-list-item" @click="deleteorder" >
						删除订单
					</view>
				</view>
				<view class="cancelpop" @click="cancel">
					取消
				</view>
			</uni-popup>
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
				orderId:0,//需要操作的订单id
				ordereditShow:false,
				states:['未提交','审批中','已审核', '驳回'],
			}
		},
		methods: {
			toggleorderedit(id){
				this.orderId = id;
				this.$refs.orderedits.open()
			},
			godetails(orderid){
				this.orderId = orderid;
				uni.navigateTo({
				    url: "../autoSalesOrderDetail/autoSalesOrderDetail?id="+orderid+"&isReview='true'",
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
					    title: '此人没有留下联系电话',
						icon:'none',
					    duration: 2000
					});
				}
				
			},
			// 关闭弹框
			cancel(){
				 this.$refs.orderedits.close()
			},
			// 编辑订单
			changeOrder(edit,isOk){
				if(isOk=="true"){
					// //对订单进行操作
					this.$store.state.baseinfo.obj.src_id = this.orderId;
					this.$refs.orderedits.close()
					uni.navigateTo({
					    url: "../autoSalesOrder/autoSalesOrder?edit="+edit,
					});
				}
			},
			// 删除订单
			deleteorder(){
				uni.showToast({
					icon:"loading",
				    duration: 2000
				});
			},
			
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