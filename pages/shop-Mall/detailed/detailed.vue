<template>
	<view class="shop-Mall">
		<view v-if="Isvehical" class="vehicle-details-bd">
			<view class="vehicle-details">
				<img :src="gooddetail.goodpic" class="w100">
				<view class="carname">
					{{gooddetail.INTERNAL_NAME}}
				</view>
				<view class="proprice">
					<text class="icon-money">￥</text>
					{{gooddetail.Unitprice}}
					<text class="icon-wanyuan">万</text>
					<del class="delprice"> 价格{{gooddetail.Unitprice}}万</del>
				</view>
				<view class="express-fee">
					快递费 0
					&nbsp;&nbsp;
					月销量0
					&nbsp;&nbsp;
					库存0
				</view>
			</view>
			<view class="tabs">
				<view class="tabs-nav row">
					<view class="col-4 tabs-nav-cell center" :class="{on:cur==0}" @click="cur=0">
						商品详情
						<text class="line"></text>
					</view>
					<view class="col-4 tabs-nav-cell center" :class="{on:cur==1}" @click="cur=1">
						商品参数
						<text class="line"></text>
					</view>
					<view class="col-4 tabs-nav-cell center" :class="{on:cur==2}" @click="cur=2">
						商品说明
						<text class="line"></text>
					</view>
					<view class="col-4 tabs-nav-cell center" :class="{on:cur==3}" @click="cur=3">
						竞品
						<text class="line"></text>
					</view>
				</view>
				<view class="tabs-content">
					<view v-show="cur==0">
						<img :src="gooddetail.goodpic" class="w100">
					</view>
					<div v-show="cur==1">
						
						<view class="">
							参数：
						</view>
						<view class="">
							{{gooddetail}}
						</view>
					</div>
					<div v-show="cur==2">内容三</div>
					<div v-show="cur==3">内容四</div>
				</view>

				<view class="tabs-btn">
					<button @click="addcar(gooddetail.goodsID)" class="btn" type="default">立即添加</button>
				</view>

			</view>
		</view>
		
		
		<!-- 非整车 -->
		<view v-else class="vehicle-details-bd">
			<view class="vehicle-details">
				<img :src="gooddetail.goodpic" class="w100">
				<view class="carname">
					{{gooddetail.OFFICEName}}
				</view>
				<view class="proprice">
					<text class="icon-money">￥</text>
					{{gooddetail.Unitprice}}
					<text class="icon-wanyuan">万</text>
					<del class="delprice"> 价格{{gooddetail.Unitprice}}万</del>
				</view>
				<view class="express-fee">
					快递费 0
					&nbsp;&nbsp;
					月销量0
					&nbsp;&nbsp;
					库存0
				</view>
			</view>
			<view class="tabs">
				<view class="tabs-nav row">
					<view class="col-4 tabs-nav-cell center" :class="{on:cur==0}" @click="cur=0">
						商品详情
						<text class="line"></text>
					</view>
					<view class="col-4 tabs-nav-cell center" :class="{on:cur==1}" @click="cur=1">
						商品参数
						<text class="line"></text>
					</view>
					<view class="col-4 tabs-nav-cell center" :class="{on:cur==2}" @click="cur=2">
						商品说明
						<text class="line"></text>
					</view>
					<view class="col-4 tabs-nav-cell center" :class="{on:cur==3}" @click="cur=3">
						竞品
						<text class="line"></text>
					</view>
				</view>
				<view class="tabs-content">
					<view v-show="cur==0">
						<img :src="gooddetail.goodpic" class="w100">
					</view>
					<div v-show="cur==1">
						
						<view class="">
							参数：
						</view>
						<view class="">
							{{gooddetail}}
						</view>
					</div>
					<div v-show="cur==2">内容三</div>
					<div v-show="cur==3">内容四</div>
				</view>
		
				<view class="tabs-btn">
					<button @click="addcar(gooddetail.goodsID)" class="btn" type="default">立即添加</button>
				</view>
		
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapMutations,mapState,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				Isvehical:true,//是否是整车
				goodsID:0,//商品id
				cur: 0 ,//默认选中第一个tab
				gooddetail:{},//详情信息
			}
		},
		computed:{
			...mapGetters(['car_kindCodes'])
		},
		onLoad(ops) {
			this.goodsID = ops.goodsID;
		},
		created() {
			let self_ = this;
			if(self_.$store.state.shop=='Vehicle'){//如果是整车
				self_.getAutoTypeInfo(self_.goodsID);//获取详情
				// self_.$store.state.saleOrderDates.carinfo.model_id = self_.goodsID
				// uni.setNavigationBarTitle({
				// 	title: '车辆详情'
				// })
				
			}else{
				uni.setNavigationBarTitle({
					title: '配饰详情'
				})
				self_.getGoodsInfo(self_.goodsID);//获取详情
			}
			
		},
		methods: {
			getcarKind(){
				let kind = 0;
				this.car_kindCodes.forEach(x=>{
					if(x.NAME=="整车"){
						kind = x.ID
					}
				})
				return kind
			},
			//根据车型商品ID查询车型、车系、品牌信息（整车）
			async getAutoTypeInfo(goodsID){
				let self_ = this;
				let param =  JSON.stringify({ ID: goodsID })
				await self_.$api.HHPlatForm_P_GetAutoTypeInfo(param).then(res => {
					console.log(res)
					// 获得数据 
					// console.log("根据车型商品ID查询车型、车系、品牌信息"+JSON.stringify(res))
					self_.gooddetail = res[0]
					
					//回填详情信息
					
					let carinfoobj = {
						"brand_id": res[0].BrandFID, //	是	string	车辆品牌ID
						"series_id": res[0].SERIES_ID, //	是	string	车系ID
						"model_id":res[0].goodsID, //	是	string	车型ID
						"chassis_num": "", //	是	string	底盘编号，没有时填写空字符串
						
						"guide_price":res[0].GuidingPrice, //	是	int	指导价，单位分
						"final_price":res[0].GuidingPrice, //	是	int	成交价，单位分
						"kind":self_.getcarKind(), //	是	int	商品分类
						"img_url":res[0].goodpic, //	是	string	图片地址
					}
					self_.$store.dispatch('setcarinfoall',res[0])
					self_.$store.dispatch('setcarinfo',carinfoobj)
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			//获取某个商品详细信息(非整车)
			async getGoodsInfo(goodsID){
				let self_ = this;
				let param =  JSON.stringify({ ID: goodsID })
				await self_.$api.HHPlatForm_P_GetGoodsInfo(param).then(res => {
					self_.gooddetail = res[0]//展示详情
					
					if(res[0].GoodType=='1'){//精品
						let ie = {
							good_id:res[0].goodsID,//	是	int	商品ID
							is_add:0,//	是	int	是否加装； 0 否， 1 是
							is_with:0,//	是	int	是否随车；0 否， 1 是
							pre_installed:0,//	是	int	是否预装；0 否， 1 是
							num:0,//	是	int	销售数量
							guide_price:res[0].GuidingPrice,//	是	int	指导价，单位分
							final_price:res[0].GuidingPrice,//	是	int	成交价，单位分
							noswith__price:res[0].GuidingPrice,//b不随车价格 = 成交价
							good_name:res[0].GoodName,//	是	string	商品名称
							img_url:res[0].goodpic,//	是	string	图片地址
						},
						fineBeauty = self_.$store.state.saleOrderDates.fineBeauty;
						if(fineBeauty[0].good_id==null){
							fineBeauty = [];
						}
						fineBeauty.push(ie)
						console.log(fineBeauty)
					}
					if(res[0].GoodType=='2'){//美容
						let ie = {
							good_id:res[0].goodsID,//	是	int	商品ID
							is_add:0,//	是	int	是否加装； 0 否， 1 是
							is_with:0,//	是	int	是否随车；0 否， 1 是
							pre_installed:0,//	是	int	是否预装；0 否， 1 是
							num:0,//	是	int	销售数量
							guide_price:res[0].GuidingPrice,//	是	int	指导价，单位分
							final_price:res[0].GuidingPrice,//	是	int	成交价，单位分
							noswith__price:res[0].GuidingPrice,//b不随车价格 = 成交价
							good_name:res[0].GoodName,//	是	string	商品名称
							img_url:res[0].goodpic,//	是	string	图片地址
						},
						fineBeauty = self_.$store.state.saleOrderDates.fineBeauty;
						if(fineBeauty[0].good_id==null){
							fineBeauty = [];
						}
						fineBeauty.push(ie)
						console.log(fineBeauty)
					}
					if(res[0].GoodType=='3'){//延保
						let ie = {
							good_id:res[0].goodsID,//	是	int	商品ID
							org_id:"",//	是	string	保险机构ID
							org_src:"",//	是	string	机构来源ID
							kind:null,//	是	int	延保类型ID
							num:0,//	是	int	销售数量
							guide_price:res[0].GuidingPrice,//	是	int	指导价，单位分
							final_price:res[0].GuidingPrice,//	是	int	成交价，单位分
							noswith__price:res[0].GuidingPrice,//b不随车价格 = 成交价
							good_name:res[0].GoodName,//	是	string	商品名称
							img_url:res[0].goodpic,//	是	string	图片地址
						},
						Exinsurance = self_.$store.state.saleOrderDates.Exinsurance;
						if(Exinsurance[0].good_id==null){
							Exinsurance = [];
						}
						Exinsurance.push(ie)
						console.log(Exinsurance)
					}
					if(res[0].GoodType=='4'){//公司产品
					// debugger
						let ie = {
							good_id:res[0].goodsID,//	是	int	商品ID
							num:0,//	是	int	销售数量
							guide_price:res[0].GuidingPrice,//	是	int	指导价，单位分
							final_price:res[0].GuidingPrice,//	是	int	成交价，单位分
							noswith__price:res[0].GuidingPrice,//b不随车价格 = 成交价
							good_name:res[0].GoodName,//	是	string	商品名称
							img_url:res[0].goodpic,//	是	string	图片地址
						},
						companyPro = self_.$store.state.saleOrderDates.companyPro;
						if(companyPro[0].good_id==null){
							self_.$store.state.saleOrderDates.companyPro = [];
						}
						self_.$store.state.saleOrderDates.companyPro.push(ie)
						console.log(self_.$store.state.saleOrderDates.companyPro)
					}
					if(res[0].GoodType=='5'){//代办业务
						let ie = {
							good_id:res[0].goodsID,//	是	int	商品ID
							num:0,//	是	int	销售数量
							guide_price:res[0].GuidingPrice,//	是	int	指导价，单位分
							final_price:res[0].GuidingPrice,//	是	int	成交价，单位分
							noswith__price:res[0].GuidingPrice,//b不随车价格 = 成交价
							good_name:res[0].GoodName,//	是	string	商品名称
							img_url:res[0].goodpic,//	是	string	图片地址
						},
						agencyService = self_.$store.state.saleOrderDates.agencyService;
						if(agencyService[0].good_id==null){
							agencyServiceagencyService = [];
						}
						agencyService.push(ie)
						console.log(agencyService)
					}
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			//立即添加
			addcar(goodsID) {
				let self_ = this;
				//修改vuex里面的goodsID
				// self_.$store.state.saleOrder.baseinfoData.ISfirst = false
				uni.navigateTo({
					url: '../../autoSalesOrder/autoSalesOrder'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F9F9F9;
	}
</style>
