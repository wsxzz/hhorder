<template>
	<view>
		<!-- 订单列表 -->
			<view class="">
			<view class="manager-list" >
				<view class="manager-lists-cell" v-if="consultantslists.length>0" v-for="(item,i) in consultantslists" :key="i">
					<view @click="godetails(item.ID)">
						<view class="row ordernum">
							<view class="col-2">
								{{item.ORDER_ID}}
								<text class="date">{{item.ORDER_TIME}}</text>
							</view>
							<view  class="col-2 right state">
								{{states[item.STATUS]}}
							</view>
						</view>
						
						<view class="ordercontant row">
							<view class="col-2">
								<text class="ordername">{{item.BD_NAME}}</text>/{{item.DB_SEX}}
							</view>
						</view>
						<view class="carinfo">
							{{item.OFFICIA_LNAME}}
						</view>
						<view class="row shopnumber">
							<view class="col-2">
								<text class="text">商品数量</text>
								<text class="value">{{item.GOODS_NUM}}</text>
								<!-- <text class="consult-btn" @click.stop="Check(item.id)">查阅</text> -->
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
				    url: "../autoSalesOrderDetail/autoSalesOrderDetail?id="+orderid+"&isReview='false'",
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
				uni.showToast({
				    title: '此功能待完善，请尝试其他的操作',
				    duration: 2000
				});
				// if(isOk=="true"){
				// 	// //对订单进行操作
				// 	this.$store.state.baseinfo.obj.src_id = this.orderId;
				// 	this.$refs.orderedits.close()
				// 	uni.navigateTo({
				// 	    url: "../autoSalesOrder/autoSalesOrder?edit="+edit,
				// 	});
				// }
			},
			async deleteorder(id){
				let param = {
								"id": this.orderId
							}
				await this.$api.HHPF_P_DeleteAutoSalesOrder(param).then(res => {
					// 获得数据  
					if(res.Msg=="success"){
						uni.showToast({
						    title: '删除成功啦',
						    duration: 3000
						});
						this.$refs.orderedits.close()
						this.$emit('reloadlist')
					}
				 }).catch(res => {
					 console.log(res)
					 uni.showToast({
					     title:es.Msg,
					     duration: 2000
					 });
				 　　// 失败进行的操作
				 })
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