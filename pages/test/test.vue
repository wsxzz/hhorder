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
					<view class="cell row">
						<view class="notesL">
							订单类型
						</view>
						<view class="notesR right">
							<button v-for="(item,index) in codes.order_kindCodes" :key="index" @click="ids.order_kindID=item.ID" :class="{'on': item.ID==ids.order_kindID?true:false}"
							 class="yybtn mini-btn" size="mini" type="default" v-if="item.NAME!=='多车'">
								{{item.NAME=='单车'? '整车':item.NAME}}
							</button>
						</view>
					</view>
					<view class="cell row">
						<view class="notesL">
							销售类型
						</view>
						<view class="notesR right turntootherpage">
							<image class="icon-next" src="../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<view v-for="(item,index) in codes.sell_kindCodes" :key="item.ID" v-if="item.ID==ids.sell_kindID">
								<picker @change="PickChangeSell_kind" :value="index" :range-key="'NAME'" :range="codes.sell_kindCodes">
									<view class="uni-input">{{codes.sell_kindCodes[index].NAME}}</view>
								</picker>
							</view>
						</view>
					</view>

					<view class="cell row">
						<view class="notesL">
							车辆类型
						</view>
						<view class="notesR right">
							<button v-for="(item,index) in codes.car_typeCodes" :key="index" @click="ids.car_typeID=item.ID" :class="{'on': item.ID==ids.car_typeID?true:false}"
							 class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
						</view>
					</view>

					<view class="cell row">
						<view class="notesL">
							付款方式
						</view>
						<view class="notesR right">
							<button v-for="(item,index) in codes.pay_typeCodes" :key="index" @click="ids.pay_typeID=item.ID" :class="{'on': item.ID==ids.pay_typeID?true:false}"
							 class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
						</view>
					</view>

					<view class="cell row">
						<view class="notesL">
							订单渠道
						</view>
						<view class="notesR right turntootherpage">
							<image class="icon-next" src="../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<view v-for="(item,index) in codes.order_channelCodes" :key="item.ID" v-if="item.ID==ids.order_channelID">
								<picker @change="PickChangeorder_channel" :value="index" :range-key="'NAME'" :range="codes.order_channelCodes">
									<view class="uni-input">{{codes.order_channelCodes[index].NAME}}</view>
								</picker>
							</view>
						</view>
					</view>

					<view class="cell row">
						<view class="notesL">
							订单来源
						</view>

						<view class="notesR right">
							<button v-for="(item,index4) in codes.order_fromCodes " :key="index4" @click="ids.order_fromID=item.ID" :class="{'on': item.ID==ids.order_fromID?true:false}"
							 class="yybtn mini-btn" size="mini" type="default" v-if="item.NAME!=='线下活动'">
								{{item.NAME=='线下日常'? '线下':item.NAME}}
							</button>
						</view>
					</view>
					<view v-if="ids.order_fromID==14" class="cell row">
						<view class="notesL Required">
							<text class="Required-star">*</text>
							代售组织
						</view>
						<view class="notesR right">
							<input class="uni-input" v-model="param.basic.name" placeholder-style="color:#C3C3C3" placeholder="请填写" />
						</view>
					</view>

					<view class="cell row">
						<view class="notesL">
							客户类型
						</view>
						<view class="notesR right">
							<button v-for="(item,index) in codes.customer_kindCodes" :key="index" @click="ids.customer_kindID=item.ID"
							 :class="{'on':item.ID==ids.customer_kindID?true:false}" class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
						</view>
					</view>

				</view>
			</view>
		</view>

		<!-- 款项欣欣 -->
		<view class="payment-infor marB20">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					款项信息
					<text class="blueline"></text>
				</view>
			</view>
			<view class="commom-content">
				<view class="content marB20">
					<view class="list">
						<view class="cell row">
							<view class="notesL">
								订金方式
							</view>
							<view class="notesR right">
								<button v-for="(item,index) in codes.subscription_typeCodes" :key="index" @click="ids.subscription_typeID=item.ID"
								 :class="{'on':item.ID==ids.subscription_typeID?true:false}" class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">
								{{ids.subscription_typeID===39? "定金" : "订金"}}
							</view>
							<view class="notesR right">
								<input type="number" class="uni-input" v-model.number="param.entry13.first_price" placeholder-style="color:#C3C3C3"
								 placeholder="请填写" />
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">
								尾款
							</view>
							<view class="notesR right">
								{{last_price}}元
							</view>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="list">
						<view class="cell row">
							<view class="notesL Required">

								应收总额
							</view>
							<view class="notesR right">
								{{totalPrice}}元
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								整车款
							</view>
							<view class="notesR right">
								{{param.entry14.car_price}}元
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								精品美容款
							</view>
							<view class="notesR right">
								{{entryArrPrice(param.entry4)}}元
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								产品款
							</view>
							<view class="notesR right">
								{{entryArrPrice(param.entry8)}}元
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								套餐款
							</view>
							<view class="notesR right">
								{{entryArrPrice(param.entry9)}}元
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								代办款
							</view>
							<view class="notesR right">
								{{entryArrPrice(param.entry10)}}元
							</view>
						</view>
						<view class="cell row">
							<view class="notesL Required">

								卡券款
							</view>
							<view class="notesR right">
								{{entryArrPrice(param.entry11)}}元
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>




		<!-- 保险信息 -->
		<view class="Insurance-infor">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					保险信息
					<text class="blueline"></text>
				</view>
				<view class="col-2 right">
					<image @click="goInsurance" class="blueline-icons" src="../../static/images/icons/icon-public-more2.png" mode="widthFix"></image>
				</view>
			</view>
			<view v-show="param.entry6.org_id!==''">
				<view class="Insurance-infor-title">
					{{param.entry6.name}}
				</view>
				<view class="Insurance-infor-list">
					<view class="cell row">
						<view class="col-2">
							交强险
						</view>
						<view class="cellR col-2 right">
							<input type="number" v-model.number="param.entry6.jqx_price" @blur="mblur" />
						</view>
					</view>
					<view class="cell row">
						<view class="col-2">
							车船税
						</view>
						<view class="cellR col-2 right">
							<input type="number" v-model.number="param.entry6.ccs_price" @blur="mblur" />
							<!-- 0 <text>元</text> -->
						</view>
					</view>

					<view class="cell row">
						<view class="col-2">
							商业险
						</view>
						<view class="cellR col-2 right">
							<input type="number" v-model.number="param.entry6.syx_price" @blur="mblur" />
						</view>
					</view>
					<view class="cell row">
						<view class="col-2">
							其他
						</view>
						<view class="cellR col-2 right">
							<input type="number" v-model.number="param.entry6.other_price" @blur="mblur" />
						</view>
					</view>
					<view class="cell row">
						<view class="col-2">
							保险类型
						</view>
						<view class="cellR col-2 right turntootherpage">
							<image class="icon-next" src="../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<view v-for="(item,index) in codes.insurance_kindCodes" :key="item.ID" v-if="item.ID==ids.insurance_kindID">
								<picker @change="PickChangeinsurance_kind" :value="index" :range-key="'NAME'" :range="codes.insurance_kindCodes">
									<view class="uni-input">{{codes.insurance_kindCodes[index].NAME}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="cell row">
						<view class="col-2">
							保险优惠
							<view class="tax-rate">
								税率以官方收费为准
							</view>
							<view class="view-policy" @click="checkpolicy">
								查看政策
							</view>
						</view>
						<view class="cellR col-2 right">
							<input type="number" v-model.number="param.entry6.discount_price" />
						</view>
					</view>

					<view class="cell row">
						<view class="col-2">
							备注
						</view>
						<view class="cellR col-2 right">
							<textarea v-model="param.entry6.info" placeholder="请填写" auto-height />
							</view>
					</view>
					<view class="row">
						<view class="subtotal right">
							<text class="subtotaltxt">小计</text>
							<text class="subtotalicon">¥</text>
							<text class="subtotalmoney">{{subtotal}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		


		<!-- 关联原有订单 -->
		<!-- !addOrder -->
		<view class="">
			<view v-if="false" class="related-old-order">
				<view class="headtitle row">
					<view class="headtitleL col-2">
						关联原有订单
					</view>
					<view class="col-2 right">
						<image class="icon-qiehuan" src="../../static/images/icons/icon-Line-qiehuan.png" mode="widthFix" @click="godetils(orderDetail.basic[0].ID)"></image>
					</view>
				</view>
				<view class="old-order-list pad">
					<view class="cell-1">
						<text class="ordernum">{{orderDetail.basic[0].ORDER_ID}}</text>
						<text class="orderstate">{{states[orderDetail.basic[0].STATUS]}}</text>
					</view>
					<view class="name">
						{{orderDetail.entry1[0].BD_NAME}}
					</view>
					<view class="carinfo">
						{{orderDetail.entry3[0].OFFICIA_LNAME}}
					</view>
					<view class="shopnums">
						<text class="nums">
							商品数量
							<text class="num">1</text>
						</text>
						<text class="date">{{orderDetail.basic[0].ORDER_TIME}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="customer-Infor">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					客户信息
					<text class="blueline"></text>
				</view>
				<view class="col-2 right">
					<image @click="selectCustomers" class="blueline-icons" src="../../static/images/icons/icon-Line-qiehuan.png" mode="widthFix"></image>
				</view>
			</view>

			<view v-if="param.entry1.customer_id!==null">
				<view v-if="ids.customer_kindID==15" class="content">
					<view class="cell-headportrait row">
						<view class="col-2 row">
							<image class="character" src="../../static/images/icons/character.png" mode="widthFix"></image>
							<view class="name">
								{{param.entry1.BD_NAME}}
							</view>
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2 Required">
							<text class="Required-star">*</text>
							客户电话
						</view>
						<view class="infoR col-2 right">
							<input class="uni-input" :value="param.entry1.COM_PHONE" :disabled="false" />
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2 Required">
							<text class="Required-star">*</text>
							身份证号
						</view>
						<view class="infoR col-2 right">
							<input class="uni-input" :disabled="false" :value="param.entry1.CER_ID_NO" />
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2 Required">
							<text class="Required-star">*</text>
							客户来源
						</view>
						<view class="infoR col-2 right turntootherpage">
							<image class="icon-next" src="../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<view v-for="(item,index) in codes.customer_fromCodes" :key="item.ID" v-if="item.ID==ids.customer_fromID">
								<picker @change="PickChangecustomer_from" :value="index" :range-key="'NAME'" :range="codes.customer_fromCodes">
									<view class="uni-input">{{codes.customer_fromCodes[index].NAME}}</view>
								</picker>
							</view>
						</view>
					</view>



					<view class="info row">
						<view class="infoL col-2 Required">
							<text class="Required-star">*</text>
							与车主关系
						</view>
						<view class="infoR col-2 right turntootherpage">
							<image class="icon-next" src="../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<view v-for="(item,index) in codes.customer_relationCodes" :key="item.ID" v-if="item.ID==ids.relationID">
								<picker @change="PickChangerelations" :value="index" :range-key="'NAME'" :range="codes.customer_relationCodes">
									<view class="uni-input">{{codes.customer_relationCodes[index].NAME}}</view>
								</picker>
							</view>
						</view>
					</view>

					<view class="ownerinfo">
						<view class="title">
							车主信息
						</view>
						<view class="list">
							<view class="cell row">
								<view class="cellL col-2">
									车主姓名
								</view>
								<view class="cellR col-2 right">
									<input class="uni-input" v-model="param.entry2.name" placeholder-style="color:#C3C3C3" placeholder="请输入" />
								</view>
							</view>
							<view class="cell row">
								<view class="cellL col-2">
									车主电话
								</view>
								<view class="cellR col-2 right">
									<input class="uni-input" v-model="param.entry2.phone" value="" placeholder-style="color:#C3C3C3" placeholder="请输入" />
								</view>
							</view>
							<view class="cell row">
								<view class="cellL col-2">
									证件类型
								</view>
								<view class="cellR col-2 right">
									身份证
								</view>
							</view>
							<view class="cell row">
								<view class="cellL col-2">
									证件号码
								</view>
								<view class="cellR col-2 right">
									<input class="uni-input" v-model="param.entry2.identity" value="" placeholder-style="color:#C3C3C3"
									 placeholder="请输入" />
								</view>
							</view>
						</view>
					</view>
				</view>

				<view v-else class="content">
					<view class="cell-headportrait row">
						<view class="row">
							<image class="character" src="../../static/images/icons/character.png" mode="widthFix"></image>
							<view class="name">
								{{param.entry1.UNIT_NAME}}
							</view>
						</view>

					</view>
					<view class="info row">
						<view class="infoL col-2">
							委托人姓名
						</view>
						<view class="infoR col-2 right">
							<input class="uni-input" v-model="param.entry1.entrust_name" placeholder-style="color:#C3C3C3" placeholder="请输入" />
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2">
							委托人电话
						</view>
						<view class="infoR col-2 right">
							<input class="uni-input" v-model="param.entry1.entrust_phone" value="" placeholder-style="color:#C3C3C3"
							 placeholder="请输入" />
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2">
							机构代码
						</view>
						<view class="infoR col-2 right">
							<input class="uni-input" :value="param.entry1.REGIST_NO" :disabled="true" />
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2">
							注册地址
						</view>
						<view class="infoR col-2 right">
							<input class="uni-input" :value="param.entry1.REGISTER_SITE" :disabled="true" />
						</view>
					</view>

					<view class="info row">
						<view class="infoL col-2 Required">
							<text class="Required-star">*</text>
							委托关系
						</view>
						<view class="infoR col-2 right turntootherpage">
							<image class="icon-next" src="../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
							<view v-for="(item,index) in codes.customer_relationCodes" :key="item.ID" v-if="item.ID==ids.entrust_relation">
								<picker @change="PickChangeentrustrelations" :value="index" :range-key="'NAME'" :range="codes.customer_relationCodes">
									<view class="uni-input">{{codes.customer_relationCodes[index].NAME}}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="ownerinfo">
						<view class="title">
							上牌信息
						</view>
						<view class="list">
							<view class="cell row">
								<view class="cellL col-2">
									公司名称
								</view>
								<view class="cellR col-2 right">
									<input class="uni-input" :value="param.entry1.UNIT_NAME" :disabled="true" />
								</view>
							</view>
							<view class="cell row">
								<view class="cellL col-2">
									营业执照
								</view>
								<view class="cellR col-2 right">
									<input class="uni-input" :value="param.entry1.REGIST_NO" :disabled="true" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="Commodity-infor marB20">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					商品信息
					<text class="blueline"></text>
				</view>
				<view class="col-2 right">
					<image @click="goshop" class="blueline-icons" src="../../static/images/icons/icon-public-more2.png" mode="widthFix"></image>
				</view>
			</view>
		</view>	
		<view  class="commom-content">
			<view v-if="param.entry3.length>0"   class="content">
				<view class="optionaltitle">
					<label>
						<text class="txt">整车信息</text>
					</label>
				</view>
				<view class="" v-for="(carinfoitem,carinfoindex) in param.entry3 " :key="carinfoindex">
					<view class="goodsinfolist" style="padding-left:0">
						<view class="uni-flex uni-row newcarcell_f">
							<view class="uni-flex goodavatar marR10" style="">
								<img style="width: 100%;" class="goodpicIMG" :src="carinfoitem.img_url">
							</view>
							<view class="carinfo">
								<view class="carname">
									{{carinfoitem.INTERNAL_NAME}}
								</view>
								<view class="listinfo">
									<text class="title">VIN</text>
									<text class="value">{{carinfoitem.chassis_num}}</text>
								</view>
								<view class="listinfo">
									<text class="title">指导价格</text>
									<text class="value">{{carinfoitem.guide_price}}</text>
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
								<input type="text" v-model="carinfoitem.final_price" :disabled="false" />
							</view>
						</view>
						<view class="cell row">
							<view class="notesL">
								颜色
							</view>

							<view class="notesR right turntootherpage">
								<image class="icon-next" src="../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
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
								<image class="icon-next" src="../../static/images/icons/icon-public-next.png" mode="widthFix"></image>
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
								<button @click="purchaseTax(1,carinfoindex)" :class="{'on': carinfoitem.is_tax===1}" class="yybtn mini-btn"
								 size="mini" type="default">是</button>
								<button @click="purchaseTax(0,carinfoindex)" :class="{'on': carinfoitem.is_tax===0}" class="yybtn mini-btn"
								 size="mini" type="default">否</button>
							</view>
						</view>
						<!-- 上面是的时候才出现 -->
						<view v-show="carinfoitem.is_tax===1" class="cell row">
							<view class="notesL">
								收取方式
							</view>
							<button v-for="(item,index) in codes.car_pay_typeCodes " :key="index" @click="ids.car_pay_typeID=item.ID"
							 :class="{'on': item.ID==ids.car_pay_typeID?true:false}" class="yybtn mini-btn" size="mini" type="default">{{item.NAME}}</button>
						</view>

						<view class="cell row">
							<view class="notesL">
								税率
							</view>
							<view class="notesR right unit">
								<text class="icon-unit">%</text>
								<input class="uni-input" v-model="carinfoitem.tax_num" placeholder-style="color:#C3C3C3" placeholder="请填写" />
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
								<input class="uni-input" :value="taxlimitm(carinfoindex)" :disabled="true" />
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		
		<view class="Commodity-infor marB20">
			<view class="Commodity-infor-nonvehical ">
				<!-- 精品美容 -->
				<view class="">
					<view v-if="param.entry4.length>0" class="commom-content marB20">
						<view class="content">
							<view class="optionaltitle">
								<label>
									<text class="txt">精品美容</text>
								</label>
							</view>
							<view>
								<view v-for="(item ,i_fineBeauty) in param.entry4" :key="i_fineBeauty">
									<view class="goodsinfolist">
										<view class="uni-flex uni-row newcarcell_f">
											<view class="uni-flex goodavatar marR10" style="">
												<img style="width: 100%;" :src="item.img_url" />
											</view>
											<view class="carinfo">
												<view class="carname">
													{{item.good_name}}
												</view>
												<view class="listinfo">
													<text class="title">指导价格</text>
													<text class="value"> {{item.guide_price}}</text>
												</view>
											</view>
										</view>
									</view>
									<view class="">
										<view class="row">
											<view class="col-2">
												成交单价
											</view>
											<view class="col-2 right">
												{{item.final_price}}元
											</view>
										</view>
										<view class="row followCar">
											<view class="col-2">
												<text class="followCarbtn" :class="{'on': item.is_add===1}" @click="isadd(i_fineBeauty)">加装</text>
												<text class="followCarbtn" :class="{'on': item.is_with===1}" @click="isWith(i_fineBeauty)">随车</text>
												<text class="followCarbtn" :class="{'on': item.pre_installed===1}" @click="preInstalled(i_fineBeauty)">预装</text>
											</view>
											<view class="col-2 numberright">
												<view class="number-box row">
													<view class="reduce" @click="changenumber('reduce',item.num,i_fineBeauty,'fineBeauty')">
														<text class="iconfont">&#xe603;</text>
													</view>
													<view class="numberbox">
														<text class="number">{{item.num}}</text>
													</view>
													<view class="increase" @click="changenumber('increase',item.num,i_fineBeauty,'fineBeauty')">
														<text class="iconfont">&#xe602;</text>
													</view>
												</view>
					
											</view>
										</view>
									</view>
								</view>
								<view class="row">
									<view class="subtotal right">
										<text class="subtotaltxt">小计</text>
										<text class="subtotalicon">¥</text>
										<text class="subtotalmoney">
											{{subtotalPriceTotal('fineBeauty')}}
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 延保产品 -->
				<view class="">
					<!--  -->
					<view v-if="JSON.stringify(param.entry7) !== '{}'" class="commom-content marB20">
						<view class="content">
							<view class="optionaltitle">
								<label>
									<text class="txt">延保产品</text>
								</label>
							</view>
							<view>
								<view>
									<view class="goodsinfolist">
										<view class="uni-flex uni-row newcarcell_f">
											<view class="uni-flex goodavatar marR10" style="">
												<img style="width: 100%;" :src="param.entry7.img_url" />
											</view>
											<view class="carinfo">
												<view class="carname">
													{{param.entry7.good_name}}
												</view>
												<view class="listinfo">
													<text class="title">指导价格</text>
													<text class="value"> {{param.entry7.guide_price}}</text>
												</view>
											</view>
										</view>
									</view>
									<view class="">
										<view class="row">
											<view class="col-2">
												成交单价
											</view>
											<view class="col-2 right">
												{{param.entry7.final_price}}元
											</view>
										</view>
										<view class="row followCar">
											<view class="col-2 numberright">
												<view class="number-box row">
													<view class="reduce" @click="changenumber('reduce',param.entry7.num,0,'Exinsurance')">
														<text class="iconfont">&#xe603;</text>
													</view>
													<view class="numberbox">
														<text class="number">{{param.entry7.num}}</text>
													</view>
													<view class="increase" @click="changenumber('increase',param.entry7.num,0,'Exinsurance')">
														<text class="iconfont">&#xe602;</text>
													</view>
												</view>
					
											</view>
										</view>
									</view>
								</view>
					
								<view class="row">
									<view class="subtotal right">
										<text class="subtotaltxt">小计</text>
										<text class="subtotalicon">¥</text>
										<text class="subtotalmoney">
											{{subtotalPriceTotal('Exinsurance')}}
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 公司产品 -->
				<view class="">
					<!--  -->
					<view v-if="param.entry8.length>0" class="commom-content marB20">
						<view class="content">
							<view class="optionaltitle">
								<label>
									<text class="txt">公司产品</text>
								</label>
							</view>
							<view>
								<view v-for="(item ,i_companyPro) in param.entry8" :key="i_companyPro">
									<view class="goodsinfolist">
										<view class="uni-flex uni-row newcarcell_f">
											<view class="uni-flex goodavatar marR10" style="">
												<img style="width: 100%;" :src="item.img_url" />
											</view>
											<view class="carinfo">
												<view class="carname">
													{{item.good_name}}
												</view>
												<view class="listinfo">
													<text class="title">指导价格</text>
													<text class="value"> {{item.guide_price}}</text>
												</view>
											</view>
										</view>
									</view>
									<view class="">
										<view class="row">
											<view class="col-2">
												成交单价
											</view>
											<view class="col-2 right">
												{{item.final_price}}元
											</view>
										</view>
										<view class="row followCar">
											<view class="col-2 numberright">
												<view class="number-box row">
													<view class="reduce" @click="changenumber('reduce',item.num,i_companyPro,'companyPro')">
														<text class="iconfont">&#xe603;</text>
													</view>
													<view class="numberbox">
														<text class="number">{{item.num}}</text>
													</view>
													<view class="increase" @click="changenumber('increase',item.num,i_companyPro,'companyPro')">
														<text class="iconfont">&#xe602;</text>
													</view>
												</view>
					
											</view>
										</view>
									</view>
								</view>
					
								<view class="row">
									<view class="subtotal right">
										<text class="subtotaltxt">小计</text>
										<text class="subtotalicon">¥</text>
										<text class="subtotalmoney">
											{{subtotalPriceTotal('companyPro')}}
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 套餐产品 -->
				<view class="">
					<!--  -->
					
					<view v-if="param.entry9.length>0" class="commom-content marB20">
						<view class="content">
							<view class="optionaltitle">
								<label>
									<text class="txt">套餐产品</text>
								</label>
							</view>
							<view>
								<view v-for="(item ,i_Setmeal) in param.entry9" :key="i_Setmeal">
									<view class="goodsinfolist">
										</label>
										<view class="uni-flex uni-row newcarcell_f">
											<view class="uni-flex goodavatar marR10" style="">
												<img style="width: 100%;" :src="item.img_url" />
											</view>
											<view class="carinfo">
												<view class="carname">
													{{item.good_name}}
												</view>
												<view class="listinfo">
													<text class="title">指导价格</text>
													<text class="value"> {{item.guide_price}}</text>
												</view>
											</view>
										</view>
									</view>
									<view class="">
										<view class="row">
											<view class="col-2">
												成交单价
											</view>
											<view class="col-2 right">
												{{item.final_price}}元
											</view>
										</view>
										<view class="row followCar">
											<view class="col-2 numberright">
												<view class="number-box row">
													<view class="reduce" @click="changenumber('reduce',item.num,i_Setmeal,'Setmeal')">
														<text class="iconfont">&#xe603;</text>
													</view>
													<view class="numberbox">
														<text class="number">{{item.num}}</text>
													</view>
													<view class="increase" @click="changenumber('increase',item.num,i_Setmeal,'Setmeal')">
														<text class="iconfont">&#xe602;</text>
													</view>
												</view>
					
											</view>
										</view>
									</view>
								</view>
					
								<view class="row">
									<view class="subtotal right">
										<text class="subtotaltxt">小计</text>
										<text class="subtotalicon">¥</text>
										<text class="subtotalmoney">
											{{subtotalPriceTotal('Setmeal')}}
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 代办业务 -->
				<view class="">
					<!--  -->
					<view v-if="param.entry10.length>0" class="commom-content marB20">
						<view class="content">
							<view class="optionaltitle">
								<label>
									<!-- <checkbox value="vehicle" /> -->
									<text class="txt">代办业务</text>
								</label>
							</view>
							<view>
								<view v-for="(item ,i_agencyService) in param.entry10" :key="i_agencyService">
									<view class="goodsinfolist">
										<view class="uni-flex uni-row newcarcell_f">
											<view class="uni-flex goodavatar marR10" style="">
												<img style="width: 100%;" :src="item.img_url" />
											</view>
											<view class="carinfo">
												<view class="carname">
													{{item.good_name}}
												</view>
												<view class="listinfo">
													<text class="title">指导价格</text>
													<text class="value"> {{item.guide_price}}</text>
												</view>
											</view>
										</view>
									</view>
									<view class="">
										<view class="row">
											<view class="col-2">
												成交单价
											</view>
											<view class="col-2 right">
												{{item.final_price}}元
											</view>
										</view>
										<view class="row followCar">
											<view class="col-2 numberright">
												<view class="number-box row">
													<view class="reduce" @click="changenumber('reduce',item.num,i_agencyService,'agencyService')">
														<text class="iconfont">&#xe603;</text>
													</view>
													<view class="numberbox">
														<text class="number">{{item.num}}</text>
													</view>
													<view class="increase" @click="changenumber('increase',item.num,i_agencyService,'agencyService')">
														<text class="iconfont">&#xe602;</text>
													</view>
												</view>
					
											</view>
										</view>
									</view>
								</view>
					
								<view class="row">
									<view class="subtotal right">
										<text class="subtotaltxt">小计</text>
										<text class="subtotalicon">¥</text>
										<text class="subtotalmoney">
											{{subtotalPriceTotal('agencyService')}}
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 卡券销售 -->
				<view class="">
					<view v-if="false" class="commom-content marB20"></view>
				</view>	
			</view>
		</view>
				
				
				
				
				
				
				
				
				
				
				
				
				









	<view class="" @click="submit">
		提交
	</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import fn from '../../common/filter.js'
	export default {
		name: 'baseinfo',
		data() {
			return {
				addOrder: false,
				ids: {},
				codes: {}, //所有的细分codes
				stateCodes: [], //所有codes
				obj: {}, //页面数据
				subtotal:0,//保险小记
				totalPrice:0,//应收总额
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
		computed: {
			//计算税额
			taxlimitm() {
				return function(index) {
					let tax_num = this.param.entry3[index].tax_num / 100
					let taxlimitm = this.param.entry3[index].final_price * tax_num
					return taxlimitm
				}

			},
			//非整车的每个小记
			subtotalPriceTotal(name) {
				// debugger
				return function(name) {
					let self_ = this,
						total = 0,
						obj = [];
					switch (name) {
						case 'fineBeauty':
							obj = self_.param.entry4
							break;
						case 'companyPro':
							obj = self_.param.entry8
							break;
						case 'Setmeal':
							obj = self_.param.entry9
							break;
						case 'agencyService':
							obj = self_.param.entry10
							break;
						case 'Cardvoucher':
							obj = self_.param.entry11
							break;
						case 'Exinsurance':
							obj = self_.param.entry7
							break;
					}
					if(name!=="Exinsurance"){
						obj.forEach(function(key) {
							total += Number(key.num) * Number(key.final_price);
						});
					}else{
						total  =  Number(obj.num) * Number(obj.final_price);
					}
					
					return total
				}
			},
			entryArrPrice: function() {
				return function(arr) {
					var total = 0
					arr.forEach((item, index) => {
						total += Number(item.num) * Number(item.final_price);
					})
					return total
				}
			},
			//尾款
			last_price() {
				let last_price = this.totalPrice - this.param.entry13.first_price
				this.param.entry13.last_price = last_price
				return last_price
			},
		},
		
		created() {
			let that = this;
			that.stateCodes = that.$store.state.codes
			that.getCodessss(that.stateCodes);
			if (that.addOrder) {
				that.param = that.$store.state.order.obj
			} else {
				that.getAutoSalesOrder(37)
			}
			// that.getCodes() //
		},
		methods: {
			submit() { //提交
				let that = this
				console.log(that.param)
			},
			//------------基本点击事件开始---------//
			PickChangeSell_kind(e) {
				this.ids.sell_kindID = this.codes.sell_kindCodes[e.target.value].ID //切换样式
			},
			PickChangeorder_channel(e) {
				this.ids.order_channelID = this.codes.order_channelCodes[e.target.value].ID //切换样式
			},
			PickChangecustomer_from(e) {
				this.ids.customer_fromID = this.codes.customer_fromCodes[e.target.value].ID //切换样式
			},
			PickChangerelations(e) {
				this.ids.relationID = this.codes.customer_relationCodes[e.target.value].ID //切换样式
			},
			PickChangeentrustrelations(e) {
				this.ids.entrust_relation = this.codes.customer_relationCodes[e.target.value].ID //切换样式
			},
			PickChangeinsurance_kind(e) {
				this.ids.insurance_kindID = this.codes.insurance_kindCodes[e.target.value].ID //切换样式
			},

			purchaseTax(e, index) {
				// debugger
				this.param.entry3[index].is_tax = e //切换样式
			},
			//计算保险小记
			subtotalmethod(){
				let subtotal = Number(this.param.entry6.jqx_price) + Number(this.param.entry6.ccs_price) + Number(this.param.entry6.syx_price) + Number(this.param.entry6.discount_price) + Number(this.param.entry6.other_price) 
				// console.log(subtotal)
				 return subtotal
			},
			// 是否加装
			isadd(index) {
				let self_ = this;
				if (self_.param.entry4[index].is_add == 0) {
					self_.param.entry4[index].is_add = 1
				} else if (self_.param.entry4[index].is_add == 1) {
					self_.param.entry4[index].is_add = 0
				}
			},
			//是否随车
			isWith(index) {
				let self_ = this;
				if (self_.param.entry4[index].is_with == 0) {
					self_.param.entry4[index].is_with = 1
					self_.param.entry4[index].final_price = 0 //成交单价
				} else if (self_.param.entry4[index].is_with == 1) {
					self_.param.entry4[index].is_with = 0
					self_.param.entry4[index].final_price = self_.param.entry4[index].guide_price //成交单价
				}
			},
			//是否预装
			preInstalled(index) {
				let self_ = this;
				if (self_.param.entry4[index].pre_installed == 0) {
					self_.param.entry4[index].pre_installed = 1
				} else if (self_.param.entry4[index].pre_installed == 1) {
					self_.param.entry4[index].pre_installed = 0
				}
			},
//商品非整车（随车）
					changenumber(type, value, index, arr) {
						let self_ = this,
							value_new = 0;
						if (type === "reduce" && value > 0) { //减少
							value_new = value - 1
						}
						if (type === "reduce" && value == 0) { //减少
							value_new = 0
						}
						if (type === "increase") { //增加
							value_new = Number(value) + Number(1)
						}
			
			
						switch (arr) {
							case 'fineBeauty':
								self_.param.entry4[index].num = value_new;
								break;
							case 'Exinsurance':
								self_.param.entry7.num = value_new;
								break;
							case 'companyPro':
								self_.param.entry8[index].num = value_new;
								break;
							case 'Setmeal':
								self_.param.entry9[index].num = value_new;
								break;
							case 'agencyService':
								self_.param.entry10[index].num = value_new;
								break;
							case 'Cardvoucher':
								self_.param.entry11[index].num = value_new;
								break;
			
						}
					},


			//------------基本点击事件结束---------//

			paramInintID() {
				let that = this
				console.log("我应该后出现")
				let obj_basic_ids = { //收集basic需要的id
					"sell_kind": that.ids.sell_kindID,
					"order_kind": that.ids.order_kindID,
					"order_channel": that.ids.order_channelID,
					"order_from": that.ids.order_fromID,
					"pay_type": that.ids.pay_typeID,
					"car_kind": that.ids.car_kindID,
				}
				Object.assign(that.param.basic, obj_basic_ids)

				let obj_entry1_ids = { //收集entry1需要的id
					"kind": that.ids.customer_kindID, //客户类型
					"entrust_relation": that.ids.entrust_relation, //委托关系
				}
				if (that.ids.customer_kindID == 16) { //如果是单位
					obj_entry1_ids = { //收集entry1需要的id
						"kind": that.ids.customer_kindID, //客户类型
						"entrust_relation": that.ids.entrust_relation, //委托关系
					}
				}
				Object.assign(that.param.entry1, obj_entry1_ids)

				let obj_entry2_ids = { //收集entry2需要的id
					"relation": that.ids.relationID, //与客户关系
				}
				Object.assign(that.param.entry2, obj_entry2_ids)

				if (that.param.entry3.length > 0) {
					let obj_entry3_ids = { //收集entry3需要的id
						"collection_type": that.ids.car_pay_typeID,
						"kind": that.ids.order_kindID,
					}
					Object.assign(that.param.entry3[0], obj_entry3_ids)
				}
				if (that.ids.pay_typeID == 68) {

					let obj_entry5_ids = { //收集entry5需要的id
						"repayment_type": that.ids.payback_kindID, //还款方式
					}
					Object.assign(that.param.entry5, obj_entry5_ids)
				}
				
				// debugger

				if (JSON.stringify(that.param.entry6) !== "{}") {
					let obj_entry6_ids = { //收集entry6需要的id
						"org_src": that.ids.org_fromID_6,
						"kind": that.ids.insurance_kindID
					}
					Object.assign(that.param.entry6, obj_entry6_ids)
				}

				let obj_entry12_ids = { //收集entry12需要的id
					"give_type": that.ids.give_typeID,
					"address_type": that.ids.address_kindID,
				}
				Object.assign(that.param.entry12, obj_entry12_ids)

				let obj_entry13_ids = { //收集entry12需要的id
					"type": this.ids.subscription_typeID
				}

				Object.assign(that.param.entry13, obj_entry13_ids)
			},
			paramInintOBJ() {
				let that = this;
				let obj_basic = {
					"adviser": that.$store.state.adviser,
					"adviser_org_id": that.$store.state.orgID,
					"adviser_org_name": that.$store.state.OrgName,
					"adviser_department_id": that.$store.state.DeptID,
					"adviser_department_name": that.$store.state.DeptName,
					"adviser_post_id": that.$store.state.JOB_ID,
					"adviser_post_name": that.$store.state.JOB_NAME,
					"adviser_name": that.$store.state.B_NAME
				}
				Object.assign(that.param.basic, obj_basic)

				let obj_entry1 = {
					"customer_id": null,
					"entrust": 0,
				}
				if (that.ids.customer_kindID == 16) { //如果是单位
					obj_entry1 = {
						"customer_id": null,
						"entrust": 1,
						"entrust_name": "",
						"entrust_phone": "",
						"entrust_relation_txt": "",
					}
				}
				Object.assign(that.param.entry1, obj_entry1)

				let obj_entry2 = {
					"name": "",
					"phone": "",
					"identity": ""
				}
				Object.assign(that.param.entry2, obj_entry2)

				if (that.param.entry3.length > 0) {
					let obj_entry3 = {
						"OFFICIA_LNAME": "", //官方名称
					}
					Object.assign(that.param.entry3, obj_entry2)
				}


				if (that.ids.pay_typeID == 68) { //按揭消费
					let obj_entry5 = {
						// "org_id": "",//调取接口
						// "repayment_type": null,
						"price": 0,
						"deadline": 0,
						"multiple_txt": "",
						"first_per": 0,
						"quota": 0,
						"org_src": "",
						"qua_id": 0,
						"info": ""
					}
					Object.assign(that.param.entry5, obj_entry5)

					let obj_entry12 = {
						"give_date": fn.CurentTime(), //当前时间
					}
					Object.assign(that.param.entry12, obj_entry12)
				}


			},
			// 获取销售订单数据
			getAutoSalesOrder(id) {
				let that = this;
				uni.showLoading({
					icon: 'loading',
					title: '加载中'
				});
				let param = {
					"id": id
				}
				this.$api.HHPF_P_GetAutoSalesOrder(param).then(res => {
					// 获得数据 
					console.log("获取销售订单数据" + res.Data)
					if (res.Msg == 'success') {
						// that.obj = res.Data
						let obj_basic = {
							"name": res.Data.basic[0].NAME,
							"sell_org": res.Data.basic[0].SELL_ORG,
							"second_point": res.Data.basic[0].SECOND_POINT,
							"is_self": res.Data.basic[0].IS_SELF,
							"adviser": res.Data.basic[0].ADVISER,
							"status": res.Data.basic[0].STATUS,
							"src_id": res.Data.basic[0].ID,
							"adviser_org_id": res.Data.basic[0].ADVISER_ORG_ID,
							"adviser_org_name": res.Data.basic[0].ADVISER_ORG_NAME,
							"adviser_department_id": res.Data.basic[0].ADVISER_DEPARTMENT_ID,
							"adviser_department_name": res.Data.basic[0].ADVISER_DEPARTMENT_NAME,
							"adviser_post_id": res.Data.basic[0].ADVISER_POST_ID,
							"adviser_post_name": res.Data.basic[0].ADVISER_POST_NAME,
							"adviser_name": res.Data.basic[0].ADVISER_NAME
						}
						Object.assign(that.param.basic, obj_basic)
						let obj_entry1 = {
							"customer_id": res.Data.entry1[0].CUSTOMER_ID,
							"entrust": 0,
							"BD_NAME": res.Data.entry1[0].BD_NAME, //	个人客户名称
							"COM_PHONE": res.Data.entry1[0].COM_PHONE, //	个人客户电话
							"CER_ID_NO": res.Data.entry1[0].CER_ID_NO, //	个人客户身份证
							"SOURCE_NATURE": res.Data.entry1[0].SOURCE_NATURE, //	个人客户来源
							"BD_SEX": res.Data.entry1[0].BD_SEX, //	个人客户性别称谓
							"UNIT_NAME": res.Data.entry1[0].UNIT_NAME, //	企业客户名称
							"REGIST_NO": res.Data.entry1[0].REGIST_NO, //	企业工商号
							"REGISTER_SITE": res.Data.entry1[0].REGISTER_SITE, //	企业注册地址
						}
						if (that.param.entry1.kind == 16) { //如果是单位
							obj_entry1 = {
								"customer_id": res.Data.entry1[0].CUSTOMER_ID,
								"entrust": 1,
								"entrust_name": res.Data.entry1[0].ENTRUST_NAME,
								"entrust_phone": res.Data.entry1[0].ENTRUST_PHONE,
								"entrust_relation_txt": res.Data.entry1[0].ENTRUST_RELATION_TXT,
							}
						}
						Object.assign(that.param.entry1, obj_entry1)


						let obj_entry2 = {
							"name": res.Data.entry2[0].NAME,
							"phone": res.Data.entry2[0].PHONE,
							"identity": res.Data.entry2[0].IDENTITY
						}
						Object.assign(that.param.entry2, obj_entry2)

						if (res.Data.entry3.length > 0) {
							let obj_entry3 = [];
							obj_entry3[0] = {
								"brand_id": res.Data.entry3[0].BRAND_ID,
								"series_id": res.Data.entry3[0].SERIES_ID,
								"model_id": res.Data.entry3[0].MODEL_ID,
								"chassis_num": res.Data.entry3[0].CHASSIS_NUM,
								"trim_id": res.Data.entry3[0].TRIM_ID,
								"color_id": res.Data.entry3[0].COLOR_ID,
								"guide_price": res.Data.entry3[0].GUIDE_PRICE,
								"final_price": res.Data.entry3[0].FINAL_PRICE,
								"kind": res.Data.entry3[0].KIND,
								"is_tax": res.Data.entry3[0].IS_TAX,
								"tax_num": res.Data.entry3[0].TAX_NUM,
								"tax_limit": res.Data.entry3[0].TAX_LIMIT,
								"img_url": res.Data.entry3[0].IMG_URL,
								"trim_name": res.Data.entry3[0].TRIM_NAME,
								"color_name": res.Data.entry3[0].KIND_NAME,

								"OFFICIA_LNAME": res.Data.entry3[0].OFFICIA_LNAME, //官方名称

							}
							Object.assign(that.param.entry3, obj_entry3)

						}
						if (res.Data.entry4.length > 0) {
							let obj_entry4 = []
							res.Data.entry4.forEach(x => {
								obj_entry4.push({
									"good_id": x.GOOD_ID,
									"is_add": x.IS_ADD,
									"is_with": x.IS_WITH,
									"pre_installed": x.PRE_INSTALLED,
									"num": x.NUM,
									"guide_price": x.GUIDE_PRICE,
									"final_price": x.FINAL_PRICE,
									"good_name": x.GOOD_NAME,
									"img_url": x.IMG_URL
								})
							})
							Object.assign(that.param.entry4, obj_entry4)
						}
						if (res.Data.entry8.length > 0) {
							let obj_entry8 = []
							res.Data.entry8.forEach(x => {
								obj_entry8.push({
									"good_id": x.GOOD_ID,
									"guide_price": x.GUIDE_PRICE,
									"final_price": x.FINAL_PRICE,
									"num": x.NUM,
									"good_name": x.GOOD_NAME,
									"img_url": x.IMG_URL
								})
							})
							Object.assign(that.param.entry8, obj_entry8)
						}
						if (res.Data.entry9.length > 0) {
							let obj_entry9 = []
							res.Data.entry9.forEach(x => {
								obj_entry9.push({
									"good_id": x.GOOD_ID,
									"guide_price": x.GUIDE_PRICE,
									"final_price": x.FINAL_PRICE,
									"num": x.NUM,
									"good_name": x.GOOD_NAME,
									"img_url": x.IMG_URL
								})
							})
							Object.assign(that.param.entry9, obj_entry9)
						}
						if (res.Data.entry10.length > 0) {
							let obj_entry10 = []
							res.Data.entry10.forEach(x => {
								obj_entry10.push({
									"good_id": x.GOOD_ID,
									"guide_price": x.GUIDE_PRICE,
									"final_price": x.FINAL_PRICE,
									"num": x.NUM,
									"good_name": x.GOOD_NAME,
									"img_url": x.IMG_URL
								})
							})
							Object.assign(that.param.entry10, obj_entry10)
						}
						if (res.Data.entry5.length > 0) {
							let obj_entry5 = {
								"org_id": res.Data.entry5[0].ORG_ID,
								"price": res.Data.entry5[0].PRICE,
								"multiple_txt": res.Data.entry5[0].MULTIPLE_TXT,
								"first_per": res.Data.entry5[0].FIRST_PER,
								"quota": res.Data.entry5[0].QUOTA,
								"info": res.Data.entry5[0].INFO
							}
							Object.assign(that.param.entry5, obj_entry5)
						}
						if (res.Data.entry6.length > 0) {
							let obj_entry6 = {
								"name": res.Data.entry6[0].ORG_NAME,
								"org_id": res.Data.entry6[0].ORG_ID,
								"jqx_price": res.Data.entry6[0].JQX_PRICE,
								"ccs_price": res.Data.entry6[0].CCS_PRICE,
								"syx_price": res.Data.entry6[0].SYX_PRICE,
								"discount_price": res.Data.entry6[0].DISCOUNT_PRICE,
								"other_price": res.Data.entry6[0].OTHER_PRICE,
								"info": res.Data.entry6[0].INFO
							}
							Object.assign(that.param.entry6, obj_entry6)
						}
						that.subtotal = that.subtotalmethod();
						if (res.Data.entry7.length > 0) {
							let obj_entry7 = {
								"good_id": res.Data.entry7[0].GOOD_ID,
								"org_id": res.Data.entry7[0].ORG_ID,
								"guide_price": res.Data.entry7[0].GUIDE_PRICE,
								"final_price": res.Data.entry7[0].FINAL_PRICE,
								"num": res.Data.entry7[0].NUM,
								"org_src": res.Data.entry7[0].ORG_SRC,
								"kind": res.Data.entry7[0].KIND,
								"good_name": res.Data.entry7[0].GOOD_NAME,
								"img_url": res.Data.entry7[0].IMG_URL
							}
							Object.assign(that.param.entry7, obj_entry7)
						}
						if (res.Data.entry12.length > 0) {
							let obj_entry12 = {
								"address": res.Data.entry12[0].ADDRESS,
								"postcode": res.Data.entry12[0].POSTCODE,
								"give_date": res.Data.entry12[0].GIVE_DATE,
								"remark": res.Data.entry12[0].REMARK,
								"other": res.Data.entry12[0].OTHER,
								"is_self": res.Data.entry12[0].IS_SELF,
								"other_person": res.Data.entry12[0].OTHER_PERSON,
								"info": res.Data.entry12[0].INFO,
								"is_place": res.Data.entry12[0].IS_PLACE,
								"info2": res.Data.entry12[0].INFO2
							}
							Object.assign(that.param.entry12, obj_entry12)
						}
						if (res.Data.entry13.length > 0) {
							let obj_entry13 = {
								"first_price": res.Data.entry13[0].FIRST_PRICE,
								"last_price": res.Data.entry13[0].LAST_PRICE
							}
							Object.assign(that.param.entry13, obj_entry13)
						}
						if (res.Data.entry14.length > 0) {
							let obj_entry14 = {
								"first_price": res.Data.entry14[0].FIRST_PRICE,
								"last_price": res.Data.entry14[0].LAST_PRICE,
								"get_price": res.Data.entry14[0].GET_PRICE,
								"car_price": res.Data.entry14[0].CAR_PRICE,
								"goods_price": res.Data.entry14[0].GOODS_PRICE,
								"product_price": res.Data.entry14[0].PRODUCT_PRICE,
								"commission_price": res.Data.entry14[0].COMMISSION_PRICE,
								"card_price": res.Data.entry14[0].CARD_PRICE
							}
							Object.assign(that.param.entry14, obj_entry14)
						}
						if (res.Data.entry15.length > 0) {
							let obj_entry15 = {
								"invoice": res.Data.entry15[0].INVOICE,
								"invoice_public": res.Data.entry15[0].INVOICE_PUBLIC,
								"invoice_sum": res.Data.entry15[0].INVOICE_SUM
							}
							Object.assign(that.param.entry15, obj_entry15)
						}
					that.getids(res.Data);
					}
					uni.hideLoading();
				}).catch(res => {
					console.log(res)
					// 失败进行的操作
				})
			},
			// getCodes() {
			// 	uni.showLoading({
			// 		title: '加载中'
			// 	});
			// 	let that = this;
			// 	//获取大量codes
			// 	let param = {
			// 		"codes": ["order_kind", "sell_kind", "order_channel", "order_from", "customer_kind", "customer_from",
			// 			"customer_relation", "mortgage_kind", "payback_kind", "subscription_type", "give_type", "address_kind",
			// 			"org_from", "insurance_kind", "hangtag_kind", "hangtag_stage", "car_number_color", "insurance_kind",
			// 			"car_kind", "car_pay_type", "pay_type", "car_type", "Mortgage_Limit", "Qualification_Kind"
			// 		]
			// 	}
			// 	this.$api.HHPF_P_GetBaseEnumByCodes(param).then(res => {
			// 		// debugger
			// 		// 获得数据  
			// 		if (res.Msg == 'success') {
			// 			// that.stateCodes = res.Data
			// 			that.getCodessss(res.Data);
			// 			uni.hideLoading();
			// 		} else {
			// 			uni.showToast({
			// 				title: res.Msg,
			// 				duration: 2000
			// 			})
			// 		}
			// 	}).catch(res => {})
			// },
			getCodessss(codes) { //获取所有用到的codes
			console.log(codes,"codes")
				this.codes = {
					sell_kindCodes: codes.filter(item => item.CODE === "sell_kind"),
					order_kindCodes: codes.filter(item => item.CODE === "order_kind"),
					order_channelCodes: codes.filter(item => item.CODE === "order_channel"),
					order_fromCodes: codes.filter(item => item.CODE === "order_from"),
					customer_kindCodes: codes.filter(item => item.CODE === "customer_kind"),
					customer_fromCodes: codes.filter(item => item.CODE === "customer_from"),
					customer_relationCodes: codes.filter(item => item.CODE === "customer_relation"),
					mortgage_kindCodes: codes.filter(item => item.CODE === "mortgage_kind"),
					payback_kindCodes: codes.filter(item => item.CODE === "payback_kind"),
					subscription_typeCodes: codes.filter(item => item.CODE === "subscription_type"),
					give_typeCodes: codes.filter(item => item.CODE === "give_type"),
					address_kindCodes: codes.filter(item => item.CODE === "address_kind"),
					org_fromCodes: codes.filter(item => item.CODE === "org_from"),
					insurance_kindCodes: codes.filter(item => item.CODE === "insurance_kind"),
					hangtag_kindCodes: codes.filter(item => item.CODE === "hangtag_kind"),
					hangtag_stageCodes: codes.filter(item => item.CODE === "hangtag_stage"),
					car_number_colorCodes: codes.filter(item => item.CODE === "car_number_color"),
					car_kindCodes: codes.filter(item => item.CODE === "car_kind"),
					car_pay_typeCodes: codes.filter(item => item.CODE === "car_pay_type"),
					pay_typeCodes: codes.filter(item => item.CODE === "pay_type"),
					car_typeCodes: codes.filter(item => item.CODE === "car_type"),
					Mortgage_LimitCodes: codes.filter(item => item.CODE === "Mortgage_Limit"),
					Qualification_KindCodes: codes.filter(item => item.CODE === "Qualification_Kind"),
				}
				this.getids(this.codes)
			},
			getids(codess) { //
				let that = this
				if (that.addOrder) { //如果是新增新的订单
					that.ids = {
						sell_kindID: codess.sell_kindCodes[0].ID,
						order_kindID: codess.order_kindCodes[0].ID,
						order_channelID: codess.order_channelCodes[0].ID,
						order_fromID: codess.order_fromCodes[0].ID,
						customer_kindID: codess.customer_kindCodes[0].ID,
						entrust_relation: codess.customer_relationCodes[0].ID, //委托关系
						customer_fromID: codess.customer_fromCodes[0].ID,
						relationID: codess.customer_relationCodes[0].ID, //客户关系
						mortgage_kindID: codess.mortgage_kindCodes[0].ID, //按揭类型
						payback_kindID: codess.payback_kindCodes[0].ID,
						subscription_typeID: codess.subscription_typeCodes[0].ID,
						give_typeID: codess.give_typeCodes[0].ID,
						address_kindID: codess.address_kindCodes[0].ID,
						org_fromID_5: codess.org_fromCodes[0].ID,
						org_fromID_6: codess.org_fromCodes[0].ID,
						insurance_kindID: codess.insurance_kindCodes[0].ID,
						car_kindID: codess.car_kindCodes[0].ID,
						car_pay_typeID: codess.car_pay_typeCodes[0].ID,
						pay_typeID: codess.pay_typeCodes[0].ID,
						car_typeID: codess.car_typeCodes[0].ID,
						Mortgage_LimitID: codess.Mortgage_LimitCodes[0].ID,
						Qualification_KindID: codess.Qualification_KindCodes[0].ID,

					}
					that.paramInintID();
					that.paramInintOBJ()
				} else {
					console.log("我应该先到")
					this.ids = {
						sell_kindID: codess.basic[0].SELL_KIND, //销售类型
						order_kindID: codess.basic[0].ORDER_KIND, //订单类型
						order_channelID: codess.basic[0].ORDER_CHANNEL, //订单渠道
						order_fromID: codess.basic[0].ORDER_FROM, //订单来源
						pay_typeID: codess.basic[0].PAY_TYPE, //付款方式
						// car_kindID:codess.basic[0].CAR_KIND,//车辆类型
						car_kindID: codess.basic[0].CAR_KIND, //车辆类型

						customer_kindID: codess.entry1[0].KIND, //客户类型
						entrust_relation: codess.entry1[0].ENTRUST_RELATION, //委托关系
						customer_fromID: this.codes.customer_fromCodes[0].ID,

						relationID: codess.entry2[0].RELATION, //客户关系

					}
					if (codess.entry3.length > 0) {
						this.ids.car_pay_typeID = codess.entry3[0].COLLECTION_TYPE ////车辆销售-收取方式
					}
					if (codess.entry5.length > 0) {
						this.ids.mortgage_kindID = this.codes.mortgage_kindCodes[0].ID //按揭类型
						this.ids.payback_kindID = codess.entry5[0].REPAYMENT_TYPE //还款方式
						this.ids.Mortgage_LimitID = codess.entry5[0].DEADLINE //按揭期数
						this.ids.org_fromID_5 = codess.entry5[0].ORG_SRC //机构来源
						this.ids.Qualification_KindID = codess.entry5[0].QUA_ID //按揭资质要求
					}
					if (codess.entry6.length > 0) {
						this.ids.org_fromID_6 = codess.entry6[0].ORG_SRC
						this.ids.insurance_kindID = codess.entry6[0].KIND
					}
					if (codess.entry12.length > 0) {
						this.ids.give_typeID = codess.entry12[0].GIVE_TYPE
						this.ids.address_kindID = codess.entry12[0].ADDRESS_TYPE
					}
					if (codess.entry13.length > 0) {
						this.ids.subscription_typeID = codess.entry13[0].TYPE
					}
					that.paramInintID();
				}

				console.log(this.ids, "ids")
				console.log(this.param, "ids")
				
			},
		}
	}
</script>

<style scoped>
page{
	background-color: #f0f0f0;
}
</style>
