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
	import filter  from '../../../common/filter.js' //列表
	import {
		mapMutations,
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				Isvehical: true, //是否是整车
				goodsID: 0, //商品id
				cur: 0, //默认选中第一个tab
				gooddetail: {}, //详情信息
			}
		},
		computed: {
			...mapGetters(['car_kindCodes'])
		},
		onShow() {
			filter.tabbarRequired("false"); //不带tabbar
		},
		onLoad(ops) {
			this.goodsID = ops.goodsID;
		},
		created() {
			let self_ = this;
			if (self_.$store.state.shop == 'Vehicle') { //如果是整车
				self_.getAutoTypeInfo(self_.goodsID); //获取详情
				// self_.$store.state.saleOrderDates.carinfo.model_id = self_.goodsID
				// uni.setNavigationBarTitle({
				// 	title: '车辆详情'
				// })

			} else {
				uni.setNavigationBarTitle({
					title: '配饰详情'
				})
				self_.getGoodsInfo(self_.goodsID); //获取详情
			}

		},
		methods: {
			getcarKind() {
				let kind = 0;
				this.car_kindCodes.forEach(x => {
					if (x.NAME == "整车") {
						kind = x.ID
					}
				})
				return kind
			},
			//根据车型商品ID查询车型、车系、品牌信息（整车）
			async getAutoTypeInfo(goodsID) {
				let self_ = this;
				let param = JSON.stringify({
					ID: goodsID
				})
				await self_.$api.HHPlatForm_P_GetAutoTypeInfo(param).then(res => {
					// debugger

					// 获得数据 
					// console.log("根据车型商品ID查询车型、车系、品牌信息"+JSON.stringify(res))
					self_.gooddetail = res[0]
					console.log(res[0], "res[0]")
					//回填详情信息

					let carinfoobj = {
						"trim_id": self_.$store.state.test.param.entry3[0].trim_id,
						"color_id": self_.$store.state.test.param.entry3[0].color_id,
						"trim_name": self_.$store.state.test.param.entry3[0].trim_name,
						"color_name": self_.$store.state.test.param.entry3[0].color_name,	
						"officia_lname": res[0].OFFICIA_LNAME,
						"brand_id": res[0].BrandFID, //	是	string	车辆品牌ID
						"series_id": res[0].SERIES_ID, //	是	string	车系ID
						"model_id": res[0].goodsID, //	是	string	车型ID
						"chassis_num": "", //	是	string	底盘编号，没有时填写空字符串

						"guide_price": res[0].GuidingPrice, //	是	int	指导价，单位分
						"final_price": res[0].GuidingPrice, //	是	int	成交价，单位分
						"kind":64 , //	是	int	商品分类
						"img_url": res[0].goodpic, //	是	string	图片地址
						"collection_type": 65,
						"is_tax": 1,
						"tax_num": 0,
						"tax_limit": 0,
					}
					// debugger
					
					self_.$store.state.test.param.entry3[0] = carinfoobj
					
				
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
