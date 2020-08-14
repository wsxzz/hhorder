<template>
	<view class="">
		<!-- <view class="Commodity-infor marB20">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					商品信息
					<text class="blueline"></text>
				</view>
				<view class="col-2 right">
					<image @click="goshop" class="blueline-icons" src="../../../static/images/icons/icon-public-more2.png" mode="widthFix"></image>
				</view>
			</view> -->
			<view class="commom-content">
				<view v-if="carinfo.length>0" class="content">
					<view class="optionaltitle">
						<label>
							<text class="txt">整车信息</text>
						</label>
					</view>
					<view class="" v-for="(carinfoitem,index) in carinfo " :key="index">
						<view class="goodsinfolist" style="padding-left:0">
							<view class="uni-flex uni-row newcarcell_f">
								<view class="uni-flex goodavatar marR10" style="">
									<img style="width: 100%;" class="goodpicIMG" :src="carinfoitem.goodpic">
								</view>
								<view class="carinfo">
									<view class="carname">
										{{carinfoitem.INTERNAL_NAME}}
									</view>
									<view class="listinfo">
										<text class="title">VIN</text>
										<text class="value"></text>
									</view>
									<view class="listinfo">
										<text class="title">指导价格</text>
										<text class="value">{{carinfoitem.GuidingPrice}}</text>
									</view>

								</view>
							</view>
						</view>
						<view class="list">
							<view class="cell row">
								<view class="notesL">
									成交价
								</view>
								<view class="notesR right unit">
									<text class="icon-unit">元</text>
									<input type="text" v-model="carinfos.final_price" :disabled="false" />
								</view>
							</view>
							<view class="cell row">
								<view class="notesL">
									颜色
								</view>
								
								<view class="notesR right turntootherpage">
							<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<view class="">
								{{carinfoitem.color_name}}
							</view>
						</view>
							</view>
							<view class="cell row">
								<view class="notesL">
									内饰
								</view>
								<view class="notesR right turntootherpage">
									<image class="icon-next" src="../../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
									<view class="">
										{{carinfoitem.trim_name}}
									</view>
								</view>
							</view>
							<view class="cell row">
								<view class="notesL">
									代收购置税
								</view>
								<!-- 默认是 -->
								<view class="notesR right">
									<button @click="purchaseTax(1)" :class="{'on': carinfos.is_tax===1}" class="yybtn mini-btn" size="mini" type="default">是</button>
									<button @click="purchaseTax(0)" :class="{'on': carinfos.is_tax===0}" class="yybtn mini-btn" size="mini" type="default">否</button>
								</view>
							</view>
							<!-- 上面是的时候才出现 -->
							<view v-show="carinfos.is_tax===1" class="cell row">
								<view class="notesL">
									收取方式
								</view>
								<button v-for="(item,index) in car_pay_typeCodes " :key="index" @click="collectionMethod(item.ID,index)" :class="{'on': indexes.car_pay_typeIndex==index?true:false}"
								 class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
							</view>
							<view class="cell row">
								<view class="notesL">
									税率
								</view>
								<view class="notesR right unit">
									<text class="icon-unit">%</text>
									<input class="uni-input" v-model="carinfos.tax_num" placeholder-style="color:#C3C3C3" placeholder="请填写" />
								</view>
							</view>
							<view class="cell row">
								<view class="cellL col-2">
									税额
									<view class="remarks">
										税率以官方收费为准
									</view>
								</view>
								<view class="cellR col-2 right unit">
									<text class="icon-unit">元</text>
									<input class="uni-input" :value="taxlimitm" :disabled="true" />
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>

	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'carinfo',
		props: {
		},
		data() {
			return {
				indexes: {
					car_pay_typeIndex: 0, //
				},
				carinfo: [],//页面
				carinfos: {},//接口
			}
		},
		computed: {
			...mapGetters(['car_kindNAME', "car_pay_typeCodes"]),
			//计算税额
			taxlimitm() {
				let tax_num = this.carinfos.tax_num / 100
				let taxlimitm = this.carinfos.final_price * tax_num
				return taxlimitm
			},
		},
		watch: {
		      carinfo: {
		       handler(newValue, oldValue) {
				  this.$emit('carinfoChange',this.carinfo)
		        },
		        deep: true
		      },
			  carinfos: {
			   handler(newValue, oldValue) {
			  				  this.$emit('carinfosChange',this.carinfos)
			    },
			    deep: true
			  },
		},
		created() {
			this.getcarinfo();
		},
		methods: {
			getcarinfo(){//
				if(this.$store.state.carinfo.obj.model_id!==""){
					this.carinfo[0] = this.$store.state.carinfo.objall 
					this.carinfos = this.$store.state.carinfo.obj
					console.log(this.carinfo[0],"整车")
					console.log(this.carinfos,"整车")
				}
			},
			goshop() {
				uni.navigateTo({
					url: '../shop-Mall/shop-Mall'
				});
			},
			purchaseTax(e){
				this.$store.state.carinfo.obj.is_tax = e;
			},
			//代收购置税收取方式
			collectionMethod(e, index) {
				this.indexes.car_pay_typeIndex = index; //切换样式
			},
		}
	}
</script>

<style>
</style>
