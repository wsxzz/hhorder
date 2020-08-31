<template>
	<view class="">
		<view class="goodsBD">
		<checkbox-group>
			<view class="goods-title">
				 <label>
				       <checkbox value="cb" checked="true" />
					   <text class="txt">{{titles[titlesIndex]}}</text>
				  </label>
			</view>
			<view v-if="shopRole!=='entry7'" v-for="(item,k) in arr" :key="k">
				<view class="goods-content row" >
					<label class="contentBT">
						  <checkbox value="cb" checked="true" />
					 </label>
					 <view class="contentBD row">
						<img class="goodpic" :src="item.img_url">
						<view class="content">
							<view class="name">
								{{item.good_name}}
							</view>
							<view class="other row" v-if="shopRole=='entry3'">
								<view class="otherT">
									VIN
								</view>
								<view class="otherV">
									{{item.chassis_num}}
								</view>
							</view>
							<view class="other row" v-if="shopRole=='entry3'">
								<view class="otherT">
									颜色
								</view>
								<view class="otherV">
									{{item.color_name}}
								</view>
							</view>
							<view class="other row" v-if="shopRole=='entry3'">
								<view class="otherT">
									内饰
								</view>
								<view class="otherV">
									{{item.trim_name}}
								</view>
							</view>
							<view class="other row">
								<view class="otherT">
									指导价格
								</view>
								<view class="otherV">
									{{item.guide_price}}元
								</view>
							</view>
						</view>
					 </view>
				</view>
				<view class="goods-price" v-if="shopRole!=='entry3'">
					<view class="goods-final_price row">
						<view class="final_priceL col-2">
							成交单价	
						</view>
						<view class="final_priceR col-2 right">
							<input :data-k=k class="uni-input" type="number" v-model="item.final_price" placeholder-style="color:#C3C3C3" placeholder="请填写" @blur="getval"/>
						</view>
						<text class="icon-unit">元</text>
					</view>
					
					<view class="goods-price-other row">
						<view class="col-2 row" v-if="shopRole=='entry4'">
							<view class="btns" :class="{'on':item.is_with==1}" @click="iswith(k)">
								随车
							</view>
							<view class="btns" :class="{'on':item.is_add==1}" @click="isadd(k)">
								加装
							</view>
							<view class="btns" :class="{'on':item.pre_installed==1}" @click="preinstalled(k)">
								预装
							</view>
						</view>
						<view class="col-2 goods-price-otherR right">
							<uni-number-box :value="item.num" @change="bindChange($event,item,k)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
			
			<view v-if="shopRole=='entry7'">
				<view class="goods-content row" >
					<label class="contentBT">
						  <checkbox value="cb" checked="true" />
					 </label>
					 <view class="contentBD row">
						<img class="goodpic" :src="obj.img_url">
						<view class="content">
							<view class="name">
								{{obj.good_name}}
							</view>
							<view class="other row">
								<view class="otherT">
									指导价格
								</view>
								<view class="otherV">
									{{obj.guide_price}}元
								</view>
							</view>
						</view>
					 </view>
				</view>
				<view class="goods-price" v-if="shopRole!=='entry3'">
					<view class="goods-final_price row">
						<view class="final_priceL col-2">
							成交单价	
						</view>
						<view class="final_priceR col-2 right">
							<input :data-k=0 class="uni-input" type="number" v-model="obj.final_price" placeholder-style="color:#C3C3C3" placeholder="请填写" @blur="getval"/>
						</view>
						<text class="icon-unit">元</text>
					</view>
					
					<view class="goods-price-other row">
						<view class="col-2 goods-price-otherR right">
							<uni-number-box :value="obj.num" @change="bindChange($event,obj,0)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</checkbox-group>
		</view>
	</view>
	
	
</template>

<script>
		export default {
			props: {
				obj: {//
					type: Object,
					default:()=>{}
				},
				arr: {//
					type: Array,
					default:()=>[]
				},
				titlesIndex:{
					type: Number,
					default:0
				},
				shopRole:{
					type: String,
					default:"entry4"
				},
			},
			data() {
				return {
					titles:['整车信息','精品美容产品','延保产品','公司产品','代办业务','套餐产品','卡券销售'],
					values:["entry3","entry4","entry7","entry8","entry10","entry9","entry11"]
				}
			},
			
			methods:{
				getval(event){
					let shopRole = this.shopRole
					let newDate = event.detail.value
					let index = Number(event.currentTarget.dataset.k) 
					this.$emit('getfinalPrice',shopRole,newDate,index)
				}	,
				iswith(k){
					this.$emit('iswith',k)
				},
				isadd(k){
					this.$emit('isadd',k)
				},
				preinstalled(k){
					this.$emit('preinstalled',k)
				},
				bindChange($event,item,k){
					let shopRole = this.shopRole
					this.$emit('bindChange',$event,item,k,shopRole)
				}
			}
		}
</script>

<style>
</style>
