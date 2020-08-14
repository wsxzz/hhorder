<template>
	<view>
		<view class="blueline-title row">
			<view class="col-2 blueline-infor">
				基本信息
				<text class="blueline"></text>
			</view>
		</view>
		<view class="marB20 commom-content">
			<view class="content">
				<view class="list">
					<view class="cell row">
						<view class="notesL">
							订单类型
						</view>
						<view class="notesR right">
							<button v-for="(item,index) in order_kindCodes" :key="index" @click="orderType(item.ID,index)" :class="{'on': indexs.order_kindIndex==index?true:false}"  class="yybtn mini-btn" size="mini" type="default" v-if="item.NAME!=='多车'">
							{{item.NAME=='单车'? '整车':item.NAME}}
						</button>
						</view>
					</view>
					<view class="cell row">
						<view class="notesL">
							销售类型
						</view>
						<view class="notesR right turntootherpage">
							<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<picker @change="PickChangeSell_kind" :value="indexs.sell_kindIndex" :range="sell_kindNAME">
								<view class="uni-input">{{sell_kindNAME[indexs.sell_kindIndex]}}</view>
							</picker>
						</view>
					</view>
					
					<view class="cell row">
						<view class="notesL">
							车辆类型
						</view>
						<view class="notesR right">
							<button v-for="(item,index) in car_typeCodes" :key="index" @click="vehicleType(item.ID,index)" :class="{'on': indexs.car_typeIndex==index?true:false}"  class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
						</view>
					</view>
					
					<view class="cell row">
						<view class="notesL">
							付款方式
						</view>
						<view class="notesR right">
							<button v-for="(item,index) in pay_typeCodes" :key="index" @click="paymentMethod(item.ID,index)" :class="{'on': indexs.pay_typeIndex==index?true:false}"  class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
						</view>
					</view>
					
					<view class="cell row">
						<view class="notesL">
							订单渠道
						</view>
						<view class="notesR right turntootherpage">
							<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<picker @change="PickChangeorder_channel" :value="indexs.order_channelIndex" :range="order_channelNAME">
								<view class="uni-input">{{order_channelNAME[indexs.order_channelIndex]}}</view>
							</picker>
						</view>
					</view>
					
					<view class="cell row">
						<view class="notesL">
							订单来源
						</view>
						
						<view class="notesR right">
							<button  v-for="(item,index4) in order_fromCodes " :key="index4"  @click="orderSource(item.ID,index4)"  :class="{'on': indexs.order_fromIndex==index4?true:false}"  class="yybtn mini-btn" size="mini" type="default" v-if="item.NAME!=='线下活动'">
							{{item.NAME=='线下日常'? '线下':item.NAME}}
						</button>
						</view>
					</view>
					<view v-if="indexs.order_fromIndex==3" class="cell row">
						<view class="notesL Required">
							<text class="Required-star">*</text>
							代售组织
						</view>
						<view class="notesR right">
							 <input class="uni-input" v-model="indexs.name" placeholder-style="color:#C3C3C3" placeholder="请填写"/>
						</view>
					</view>
					
					<view class="cell row">
						<view class="notesL">
							客户类型
						</view>
						<view class="notesR right">
							<button v-for="(item,index) in customer_kindCodes" :key="index" @click="customerType(item.ID,index)" :class="{'on': indexs.customer_kindIndex==index?true:false}"  class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
		export default {
			name: 'baseinfo',
			data() {
				return {
					indexs:{}
				}
			},
			
			computed:{
				...mapGetters(['sell_kindID','sell_kindNAME','order_kindCodes',"order_kindID","order_channelID","order_channelNAME","order_fromCodes",'order_fromID',"pay_typeCodes","pay_typeNAME",'pay_typeID',"car_typeCodes",'car_typeID',"customer_kindCodes","customer_kindID","customer_kindNAME"])
			},
			
			watch: {
			      indexs: {
			       handler(newValue, oldValue) {
					  this.$emit('baseinfoChange',this.indexs)
			        },
			        deep: true
			      },
			},
			onShow() {
				
			},
			created() {
			
				this.indexs = this.$store.state.baseinfo.obj
				// this.getinit();
			},
			methods: {
				//销售类型
				PickChangeSell_kind(e){
					this.indexs.sell_kindIndex = e.target.value //切换样式
					this.indexs.sell_kind = this.sell_kindID[e.target.value ];//id
				},
				// 订单类型
				orderType(e,index){
					this.indexs.order_kindIndex = index;//切换样式
					this.indexs.order_kind = e;//id
					if(index==2){//非整车
					
						this.$store.state.shop = 'noVehicle'
					}else{
						this.$store.state.shop = 'Vehicle'
					}
				},
				
				//车辆类型
				vehicleType(e,index){
					this.indexs.car_typeIndex = index;//切换样式
					this.indexs.car_kind = e;//id
				},
				//付款方式
				paymentMethod(e,index){
					this.indexs.pay_typeIndex = index;//切换样式
					this.indexs.pay_type = e;//id
					this.indexs.pay_typeNAME = this.pay_typeNAME[index];//name
					
					if(this.indexs.pay_typeNAME=="按揭消费"){
						this.$store.state.mortgage.mortgageOk = true
					}else{
						this.$store.state.mortgage.mortgageOk = false
					}
					
				},
				//订单渠道
				PickChangeorder_channel(e){
					this.indexs.order_channelIndex = e.target.value //切换样式
					this.indexs.order_channel = this.order_channelIDe[e.target.value ];//id
				},
				//订单来源
				orderSource(e,index){
					this.indexs.order_fromIndex = index;//切换样式
					this.indexs.order_from = e;//id
				},
				//客户类型
				customerType(e,index){
					this.indexs.customer_kindIndex = index;//切换样式
					this.indexs.customer_kind = e;//id
					this.indexs.customer_kindNAME = this.customer_kindNAME[index]
					this.$store.state.customerInfo.seletOk = false
				},
			}
		}
	</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F5;
	}
</style>