<template>
	<view class="submitorder-content">
		<view class="blueline-title row">
			<view class="col-2 blueline-infor">
				基本信息
				<text class="blueline"></text>
			</view>
		</view>
		<view class="marB20 commom-content">
			<view class="content">
				<view class="list">
					<view v-for="(itemP, index) in dataList" :key="index">
						<view class="cell row" v-if="itemP.isHave">
							<view class="notesL">
								{{itemP.title}}
							</view>
							<view class="notesR right" v-if="itemP.type == 'radioM'">
								<button v-for="(item,i) in itemP.CODES" :key="i" 
									@click="radioMFun(itemP.fieldName,item.ID)"
									:class="{'on': item.ID==itemP.value?true:false}"
									class="yybtn mini-btn" size="mini" type="default">
									{{item.NAME}}
								</button>
							</view>
						</view>
						
					</view>
					
				</view>
			</view>
		</view>
		<view class="" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapGetters} from 'vuex'
	import { UpdateAutoSalesOrder } from '@/api/test/index.js';
	import { idsArr,codesArr } from './js/index.js';
	import { dataArr } from './js/data.js';
	import fn from '../../common/filter.js'
	
	export default {
		data() {
			return {
				dataList:dataArr(),
				param: {
					"basic": {}, //销售订单基础数据
					"entry1": {}, //客户补充信息
					"entry2": {}, //车主信息
					"entry3": [], //车辆销售信息
					"entry4": [], //精品美容信息
					"entry5": {}, //按揭信息
					"entry6": {}, //保险信息
					"entry7": {}, //延保产品信息
					"entry8": [], //公司产品信息
					"entry9": [], //套餐产品
					"entry10": [], //代办业务信息
					"entry11": [], //卡券销售信息
					"entry12": {}, //交付信息
					"entry13": {}, //款项信息
					"entry14": {}, //支付信息
					"entry15": {}, //发票信息
				}
			}
		},
		created() {
			console.log(idsArr(),"idsArr")
			console.log(codesArr(),"codesArr")
			this.getvalues()
		},
		methods:{
			async getvalues() {
			  // const [err, res] = await UpdateAutoSalesOrder({
			  //   appId: 'cyx',
			  // });
			  let param = {
				  basic:{
					 order_kind: 7
				  }
			  }
			  
			  
			},
			radioMFun(fieldName,newID) {
				let Dates = this.dataList.find(item => item.fieldName == fieldName);
				Dates.value = newID
			},
			submit(){
				this.param.basic.order_kind = this.dataList.find(item => item.fieldName == 'order_kind').value
				console.log(this.param)
			},
		}
	}
</script>

<style scoped>
	page {
		background-color: #f0f0f0;
	}
</style>
