<template>
	<view class="customerorderdetails custom-header">
		<!-- 自定义头部 -->
		<view class="uniyy-page-head">
			<hx-navbar :back="true" title="客户订单明细" color="#ffffff" :background-color="[[65, 197, 255],[19, 113, 247]]"
			 background-color-linear-deg="45">
			   <!-- <view  slot="right" @click="goprintcontract">打印合同</view> -->
			</hx-navbar>
		</view>
		<!-- 客户订单基本信息 -->
		<view class="baseinfo">
			<view class="baseinfo-bg"></view>
			<view class="content">
				<view class="row ordernumT">
					<view class="ordernum">
						客户订单编号: {{orderDetail.basic[0].ORDER_ID}}
						<text class="time">开单时间{{orderDetail.basic[0].ORDER_TIME}}</text>
					</view>
					<view class="state right">
						{{states[orderDetail.basic[0].STATUS]}}
					</view>
				</view>
				<view class="_list">
					<view class="_cell row">
						<view class="col-2 title">
							订单类型
						</view>
						<view class="col-2 value right">
							{{orderDetail.basic[0].ORDER_KIND_NAME}}
						</view>
					</view>
					<view class="_cell row">
						<view class="col-2 title">
							销售类型
						</view>
						<view class="col-2 value right">
							{{orderDetail.basic[0].SELL_KIND_NAME}}
						</view>
					</view>
					<view class="_cell row">
						<view class="col-2 title">
							车辆类型
						</view>
						<view class="col-2 value right">
							{{orderDetail.basic[0].CAR_KIND_NAME}}
						</view>
					</view>
					<view class="_cell row">
						<view class="col-2 title">
							付款方式
						</view>
						<view class="col-2 value right">
							{{orderDetail.basic[0].PAY_TYPE_NAME}}
						</view>
					</view>
					<view class="_cell row">
						<view class="col-2 title">
							订单渠道
						</view>
						<view class="col-2 value right">
							{{orderDetail.basic[0].ORDER_CHANNEL_NAME}}
						</view>
					</view>
					<view class="_cell row">
						<view class="col-2 title">
							活动名称
						</view>
						<view class="col-2 value right">
							{{orderDetail.basic[0].NAME}}
						</view>
					</view>
					<view class="_cell row">
						<view class="col-2 title">
							订单来源
						</view>
						<view class="col-2 value right">
							{{orderDetail.basic[0].ORDER_FROM_NAME}}
						</view>
					</view>

					<view class="_cell row">
						<view class="col-2 title">
							代售组织
						</view>
						<view class="col-2 value right">
							{{orderDetail.basic[0].SELL_ORG_NAME}}
						</view>
					</view>
					<view class="_cell row">
						<view class="col-2 title">
							客户类型
						</view>
						<view class="col-2 value right">
							{{orderDetail.entry1[0].KIND_NAME}}
						</view>
					</view>

				</view>
			</view>
		</view>
		<view v-if="orderDetail.relation.length !== 0" class="related-old-order">
			<view class="title">
				关联原有订单
			</view>
			<view class="old-order-list pad">
				<view class="cell-1">
					<text class="ordernum">{{orderDetail.relation[0].ORDER_ID}}</text>
					<text class="orderstate">{{orderDetail.relation[0].STATUS}}</text>
				</view>
				<view class="name">
					{{orderDetail.relation[0].BD_NAME}}
				</view>
				<view class="carinfo">
					{{orderDetail.relation[0].OFFICIA_LNAME}}
				</view>
				<view class="shopnums">
					<text class="nums">
						商品数量
						<text class="num">{{orderDetail.relation[0].NUM}}</text>
					</text>
					<!-- <text class="date">{{orderDetail.relation[0].}}</text> -->
				</view>
			</view>
		</view>
		<!-- 客户信息 -->
		<!-- 个人 -->

		<view v-if="orderDetail.entry1.length>0">
			<view class="customer-Infor" v-if="orderDetail.entry1[0].KIND_NAME=='个人'">

				<view class="blueline-title">
					客户信息
					<text class="blueline"></text>
				</view>
				<view class="content">
					<view class="cell-headportrait row">
						<image class="character" src="../../static/images/icons/character.png" mode="widthFix"></image>
						<view class="name">
							{{orderDetail.entry1[0].BD_NAME}}
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2">
							客户电话
						</view>
						<view class="infoR col-2 right">
							{{orderDetail.entry1[0].COM_PHONE}}
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2">
							身份证号
						</view>
						<view class="infoR col-2 right">
							{{orderDetail.entry1[0].CER_ID_NO}}
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2">
							客户来源
						</view>
						<view class="infoR col-2 right">
							{{orderDetail.entry1[0].SOURCE_NATURE}}
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2 ">
							与车主关系
						</view>
						<view class="infoR col-2 right">
							{{orderDetail.entry2[0].RELATION_NAME}}
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
									{{orderDetail.entry2[0].NAME}}
								</view>
							</view>
							<view class="cell row">
								<view class="cellL col-2">
									车主电话
								</view>
								<view class="cellR col-2 right">
									{{orderDetail.entry2[0].PHONE}}
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
									{{orderDetail.entry2[0].IDENTITY}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 客户类型为单位时 -->

			<view class="customer-Infor" v-if="orderDetail.entry1[0].KIND_NAME=='单位'">
				<view class="blueline-title">
					客户信息
					<text class="blueline"></text>
				</view>
				<view class="content">
					<view class="cell-headportrait row">
						<image class="character" src="../../static/images/car.png" mode="widthFix"></image>
						<view class="name">
							{{orderDetail.entry1[0].UNIT_NAME}}
						</view>
					</view>

					<view class="info row">
						<view class="infoL col-2">
							委托人姓名
						</view>
						<view class="infoR col-2 right">
							{{orderDetail.entry1[0].ENTRUST_NAME}}
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2">
							委托人电话
						</view>
						<view class="infoR col-2 right">
							{{orderDetail.entry1[0].ENTRUST_PHONE}}
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2">
							机构代码
						</view>
						<view class="infoR col-2 right">
							{{orderDetail.entry1[0].REGIST_NO}}
						</view>
					</view>
					<view class="info row">
						<view class="infoL addressL">
							注册地址
						</view>
						<view class="infoR addressR">
							{{orderDetail.entry1[0].REGISTER_SITE}}
						</view>
					</view>
					<view class="info row">
						<view class="infoL col-2 ">
							委托关系
						</view>
						<view class="infoR col-2 right">
							{{orderDetailS.relation1}}
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
									{{orderDetail.entry1[0].UNIT_NAME}}
								</view>
							</view>
							<view class="cell row">
								<view class="cellL col-2">
									营业执照
								</view>
								<view class="cellR col-2 right">
									{{orderDetail.entry1[0].REGIST_NO}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品信息	 -->
		<view class="commodity-Infor">
			<!-- 整车信息 -->
			<view v-if="orderDetail.entry3.length>0">
				<view class="blueline-title">
					商品信息
					<text class="blueline"></text>
				</view>
				<view class="goodsinfolist pad">
					<view class="uni-flex uni-row newcarcell_f">
						<view class="uni-flex goodavatar marR10" style="">
							<image src="../../static/images/car.jpg" mode="widthFix"></image>
						</view>
						<view class="carinfo">
							<view class="carname">
								{{orderDetail.entry3[0].OFFICIA_LNAME}}
							</view>
							<view class="listinfo">
								<text class="title">VIN</text>
								<text class="value">{{orderDetail.entry3[0].CHASSIS_NUM}}</text>
							</view>
							<view class="listinfo">
								<text class="title">指导价格</text>
								<text class="value">{{orderDetail.entry3[0].GUIDE_PRICE}}</text>
							</view>

						</view>
					</view>
				</view>
				<view class="list">
					<view class="cell row">
						<view class="cellL col-2">
							成交价
						</view>
						<view class="price cellR col-2 right">
							<text class="icon-yuan">¥</text>
							{{orderDetail.entry3[0].FINAL_PRICE}}
						</view>
					</view>
					<view class="cell row">
						<view class="cellL col-2">
							内饰
						</view>
						<view class="cellR col-2 right">
							{{orderDetail.entry3[0].TRIM_NAME}}
						</view>
					</view>
					<view class="cell row">
						<view class="cellL col-2">
							颜色
						</view>
						<view class="cellR col-2 right">
							{{orderDetail.entry3[0].COLOR_NAME}}
						</view>
					</view>
					<view class="cell row">
						<view class="cellL col-2">
							待收购置税
						</view>
						<view class="cellR col-2 right">

							{{orderDetail.entry3[0].IS_TAX==0?"否":"是"}}
						</view>
					</view>
					<view class="cell row">
						<view class="cellL col-2">
							收取方式
						</view>
						<view class="cellR col-2 right">
							{{orderDetail.entry3[0].COLLECTION_TYPE}}
						</view>
					</view>
					<view class="cell row">
						<view class="cellL col-2">
							税率
						</view>
						<view class="cellR col-2 right">
							{{orderDetail.entry3[0].TAX_NUM }}
						</view>
					</view>
					<view class="cell row">
						<view class="cellL col-2">
							税额
							<text class="tips">税率以官方收费为准</text>
						</view>
						<view class="cellR col-2 right">
							¥{{orderDetail.entry3[0].TAX_LIMIT}}
						</view>
					</view>
				</view>
			</view>
			<!-- 非整车信息 -->
			<view class="additional">
				<!-- 精品美容 -->
				<view v-if="orderDetail.entry4.length!==0" class="additional-cell">
					<view class="additional_title">
						精品美容
					</view>
					<view v-for="(item,i_4) in orderDetail.entry4" :key="i_4">
						<view class="goodsinfolist pad">
							<view class="uni-flex uni-row newcarcell_f">
								<view class="uni-flex goodavatar marR10" style="">
									<image src="../../static/images/car.jpg" mode="widthFix"></image>
								</view>
								<view class="carinfo">
									<view class="carname">
										<!-- {{item.}} -->
									</view>
									<view class="listinfo">
										<text class="title">加装</text>
										<text class="value">{{item.IS_ADD==1?'是':'否'}}</text>
									</view>
									<view class="listinfo">
										<text class="title">随车</text>
										<text class="value">{{item.IS_ADD==1?'是':'否'}}</text>
									</view>

									<view class="listinfo">
										<text class="title">指导价格</text>
										<text class="value">{{item.GUIDE_PRICE}}</text>
									</view>

								</view>
							</view>
						</view>
						<view class="actual-price">
							<view class="actual-price-cell row">
								<view class="cellL col-2">
									成交价
								</view>
								<view class="price cellR col-2 right">
									¥{{item.FINAL_PRICE}} X {{item.NUM}}
								</view>
							</view>
						</view>
						<view class="actual-price">
							<view class="sum right">
								小计<text class="icon-yuan">¥</text>
								<text class="money">{{novehicalsubtotal(orderDetail.entry4)}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 延保产品 -->
				<view v-if="orderDetail.entry7.length!==0" class="additional-cell">
					<view class="additional_title">
						延保产品
					</view>
					<view v-for="(item,i_7) in orderDetail.entry7" :key="i_7">
						<view class="goodsinfolist pad">
							<view class="uni-flex uni-row newcarcell_f">
								<view class="uni-flex goodavatar marR10" style="">
									<image src="../../static/images/car.jpg" mode="widthFix"></image>
								</view>
								<view class="carinfo">
									<view class="carname">
										{{item.KIND_NAME}}|{{item.ORG_NAME}}
									</view>
									<view class="listinfo">
										<text class="title">机构来源</text>
										<text class="value">{{item.ORG_SRC_NAME}}</text>
									</view>
									<view class="listinfo">
										<text class="title">延保产品</text>
										<text class="value"></text>
									</view>

									<view class="listinfo">
										<text class="title">指导价格</text>
										<text class="value">{{item.GUIDE_PRICE}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="actual-price">
							<view class="actual-price-cell row">
								<view class="cellL col-2">
									成交价
								</view>
								<view class="price cellR col-2 right">
									¥{{item.FINAL_PRICE}} X {{item.NUM}}
								</view>
							</view>
						</view>
					</view>
					<view class="actual-price">
						<view class="sum right">
							小计<text class="icon-yuan">¥</text>
							<text class="money">{{novehicalsubtotal(orderDetail.entry7)}}</text>
						</view>
					</view>
				</view>
				<!-- 公司产品 -->
				<view v-if="orderDetail.entry8.length!==0" class="additional-cell">
					<view class="additional_title">
						公司产品
					</view>
					<view v-for="(item,i_8) in orderDetail.entry8" :key="i_8">
						<view class="goodsinfolist pad">
							<view class="uni-flex uni-row newcarcell_f">
								<view class="uni-flex goodavatar marR10" style="">
									<image src="../../static/images/car.jpg" mode="widthFix"></image>
								</view>
								<view class="carinfo">
									<view class="carname">
										产品系列｜产品名称
									</view>
									<view class="listinfo">
										<text class="title">指导价格</text>
										<text class="value">{{item.GUIDE_PRICE}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="actual-price">
							<view class="actual-price-cell row">
								<view class="cellL col-2">
									成交价
								</view>
								<view class="price cellR col-2 right">
									¥{{item.FINAL_PRICE}} X {{item.NUM}}
								</view>
							</view>
						</view>
					</view>
					<view class="actual-price">
						<view class="sum right">
							小计<text class="icon-yuan">¥</text>
							<text class="money">{{novehicalsubtotal(orderDetail.entry8)}}</text>
						</view>
					</view>
				</view>
				<!-- 套餐产品 -->
				<view v-if="orderDetail.entry9.length!==0" class="additional-cell">
					<view class="additional_title">
						套餐产品
					</view>
					<view v-for="(item,i_9) in orderDetail.entry9" :key="i_9">
						<view class="goodsinfolist pad">
							<view class="uni-flex uni-row newcarcell_f">
								<view class="uni-flex goodavatar marR10" style="">
									<image src="../../static/images/car.jpg" mode="widthFix"></image>
								</view>
								<view class="carinfo">
									<view class="carname">
										套餐名称
									</view>
									<view class="listinfo">
										<text class="title">指导价格</text>
										<text class="value">{{item.GUIDE_PRICE}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="actual-price">
							<view class="actual-price-cell row">
								<view class="cellL col-2">
									成交价
								</view>
								<view class="price cellR col-2 right">
									¥{{item.FINAL_PRICE}} X {{item.NUM}}
								</view>
							</view>
						</view>
					</view>
					<view class="actual-price">
						<view class="sum right">
							小计<text class="icon-yuan">¥</text>
							<text class="money">{{novehicalsubtotal(orderDetail.entry9)}}</text>
						</view>
					</view>
				</view>
				<!-- 代办业务 -->
				<view v-if="orderDetail.entry10.length!==0" class="additional-cell">
					<view class="additional_title">
						代办业务
					</view>
					<view v-for="(item,i_10) in orderDetail.entry10" :key="i_10">
						<view class="goodsinfolist pad">
							<view class="uni-flex uni-row newcarcell_f">
								<view class="uni-flex goodavatar marR10" style="">
									<image src="../../static/images/car.jpg" mode="widthFix"></image>
								</view>
								<view class="carinfo">
									<view class="carname">
										代办业务名称
									</view>
									<view class="listinfo">
										<text class="title">指导价格</text>
										<text class="value">{{item.GUIDE_PRICE}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="actual-price">
							<view class="actual-price-cell row">
								<view class="cellL col-2">
									成交价
								</view>
								<view class="price cellR col-2 right">
									¥{{item.FINAL_PRICE}} X {{item.NUM}}
								</view>
							</view>
						</view>
					</view>
					<view class="actual-price">
						<view class="sum right">
							小计<text class="icon-yuan">¥</text>
							<text class="money">{{novehicalsubtotal(orderDetail.entry10)}}</text>
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 保险信息 -->
		<view class="commodity-Infor" v-if="orderDetail.entry6.length !== 0">
			<view class="Insurance-infor marB20">
				<view class="blueline-title">
					保险信息
					<text class="blueline"></text>
				</view>
				<view class="content">
					<view class="list">
						<view class="cell row">
							<view class="cellL col-2">
								交强险
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry6[0].JQX_PRICE}}
							</view>
						</view>
						<view class="cell row">
							<view class="cellL col-2">
								车船税
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry6[0].CCS_PRICE}}
							</view>
						</view>
						<view class="cell row">
							<view class="cellL col-2">
								商业险
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry6[0].SYX_PRICE}}
							</view>
						</view>
						<view class="cell row">
							<view class="cellL col-2">
								其他
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry6[0].OTHER_PRICE}}
							</view>
						</view>
						<view class="cell row">
							<view class="cellL col-2">
								保险优惠
								<text class="policy">税率以官方收费为准</text>
								<!-- <text class="policybtn">查看政策</text> -->
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry6[0].DISCOUNT_PRICE}}
							</view>
						</view>
						<view class="sum right">
							小计<text class="icon-yuan">¥</text>
							<text class="money">{{subtotal}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 款项信息 -->
		<view class="commodity-Infor" v-if="orderDetail.entry13.length !== 0">
			<view class="Payment-infor">
				<view class="blueline-title">
					款项信息
					<text class="blueline"></text>
				</view>
				<view class="content marB20" >
					<view class="list">
						<view class="cell row">
							<view class="cellL col-2">
								订金方式
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry13[0].FIRST_PRICE}}
							</view>
						</view>
						<view class="cell row">
							<view class="cellL col-2">
								定金
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry13[0].TYPE}}
							</view>
						</view>
						<view class="cell row">
							<view class="cellL col-2">
								尾款
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry13[0].LAST_PRICE}}
							</view>
						</view>
					</view>
				</view>
				<view class="content" v-if="orderDetail.entry14.length !== 0">
					<view class="list">
						<view class="cell row">
							<view class="cellL col-2">
								应收总额
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry14[0].GET_PRICE}}
							</view>
						</view>
						<view class="cell row">
							<view class="cellL col-2">
								整车款
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry14[0].CAR_PRICE}}
							</view>
						</view>
						<view class="cell row">
							<view class="cellL col-2">
								精品美容款
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry14[0].GOODS_PRICE}}
							</view>
						</view>
						<view class="cell row">
							<view class="cellL col-2">
								产品款
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry14[0].PRODUCT_PRICE}}
							</view>
						</view>
						<view class="cell row">
							<view class="cellL col-2">
								代办款
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry14[0].COMMISSION_PRICE}}
							</view>
						</view>
						<view class="cell row">
							<view class="cellL col-2">
								卡劵款
							</view>
							<view class="cellR col-2 right">
								¥{{orderDetail.entry14[0].CARD_PRICE}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 交付信息 -->
		<view v-if="orderDetail.entry12.length !== 0" class="delivery-infor commom-content">
			<view class="blueline-title">
				交付信息
				<text class="blueline"></text>
			</view>
			<view class="content">
				<view class="list">
					<view class="cell row">
						<view class="cellL col-2">
							约定交期
						</view>
						<view class="cellR col-2 right">
							{{orderDetail.entry12[0].GIVE_DATE}}
						</view>
					</view>

					<view class="cell row">
						<view class="cellL notesL ">
							交期备注
						</view>
						<view class="cellR notesR  right">
							{{orderDetail.entry12[0].REMARK}}
						</view>
					</view>

					<view class="cell row">
						<view class="cellL col-2">
							交付方式
						</view>
						<view class="cellR col-2 right">
							{{orderDetailS.GIVE_TYPE}}
						</view>
					</view>
					<view class="cell row">
						<view class="cellL col-2">
							地址类型
						</view>
						<view class="cellR col-2 right">
							{{orderDetailS.address_kind}}
						</view>
					</view>

					<view class="cell row">
						<view class="cellL notesL">
							取/送货地址
						</view>
						<view class="cellR notesR right">
							{{orderDetail.entry12[0].ADDRESS}}
						</view>
					</view>
					<view class="cell row">
						<view class="cellL col-2">
							邮编
						</view>
						<view class="cellR col-2 right">
							{{orderDetail.entry12[0].POSTCODE}}
						</view>
					</view>
					<view class="cell row">
						<view class="cellL col-2">
							联系人
						</view>
						<view class="cellR col-2 right">
							{{orderDetail.entry12[0].OTHER_PERSON}}
						</view>
					</view>

				</view>
			</view>
		</view>
		<!-- 其他约定 -->
		<view v-if="orderDetail.entry12.length !== 0" class="other-conventions commom-content">
			<view class="other-conventions-title">
				其他约定
			</view>
			<view class="content">
				<view class="list">
					<view class="cell row">
						<view class="cellL col-2">
							与客户约定
						</view>
						<view class="cellR col-2 right">
							{{orderDetail.entry12[0].OTHER==0? '否':'是'}}
						</view>
					</view>

					<view class="cell row">
						<view class="cellL notesL">
							备注
						</view>
						<view class="cellR notesR right">
							{{orderDetail.entry12[0].INFO}}
						</view>
					</view>
					<view class="cell row">
						<view class="cellL col-2">
							二手车置换
						</view>
						<view class="cellR col-2 right">
							{{orderDetail.entry12[0].IS_PLACE==0? '否':'是'}}
						</view>
					</view>
					<view class="cell row">
						<view class="cellL notesL">
							备注
						</view>
						<view class="cellR notesR right">
							{{orderDetail.entry12[0].INFO2}}
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
	import filter from '../../common/filter.js' //基本信息
	export default {
		data() {
			return {
				orderId: '', //订单id
				orderDetail: {}, //订单详情
				states: ['未提交', '审批中', '已审核', '驳回'], //状态
				type: 'top',
				content: '',
				isReview: true, //是否是审核信息
				Isdisabled: true, //是否确定按钮可点
				remarks: "", //备注
			}
		},
		computed: {
			...mapGetters(['Mortgage_LimitCodes', "car_pay_typeCodes", "give_typeCodes", "address_kindCodes",'customer_relationCodes']),
			orderDetailS() {
				let orderDetailS = {
					car_pay_typeName: "", //收取方式
					DEADLINE: '', //贷款期限
					GIVE_TYPE: "", //交付方式
					address_kind: "", //地址类型
					relation1: "", // 委托关系,
				}
				this.customer_relationCodes.forEach(x => {
					if (this.orderDetail.entry1[0].ENTRUST_RELATION == x.ID) { //
						orderDetailS.relation1 = x.NAME
					}
				})

				this.car_pay_typeCodes.forEach(x => {
					if (this.orderDetail.entry3.length > 0) {
						if (this.orderDetail.entry3[0].COLLECTION_TYPE == x.ID) {
							orderDetailS.car_pay_typeName = x.NAME
						}
					}

				})
				this.Mortgage_LimitCodes.forEach(x => {
					if (this.orderDetail.entry5.length > 0) {
						if (this.orderDetail.entry5[0].DEADLINE == x.ID) {
							orderDetailS.DEADLINE = x.NAME
						}
					}
				})
				this.give_typeCodes.forEach(x => {
					if (this.orderDetail.entry12.length > 0) {
						if (this.orderDetail.entry12[0].GIVE_TYPE == x.ID) {
							orderDetailS.GIVE_TYPE = x.NAME
						}
					}
				})
				this.address_kindCodes.forEach(x => {
					if (this.orderDetail.entry12.length > 0) {
						if (this.orderDetail.entry12[0].ADDRESS_TYPE == x.ID) {
							orderDetailS.address_kind = x.NAME
						}
					}
				})

				return orderDetailS
			},
			//计算税额
			subtotal() {
				let jqx_price = Number(this.orderDetail.entry6[0].JQX_PRICE);
				let ccs_price = Number(this.orderDetail.entry6[0].CCS_PRICE);
				let syx_price = Number(this.orderDetail.entry6[0].SYX_PRICE);
				let discount_price = Number(this.orderDetail.entry6[0].DISCOUNT_PRICE);
				let other_price = Number(this.orderDetail.entry6[0].OTHER_PRICE);

				let subtotal = jqx_price + ccs_price + syx_price + discount_price + other_price;

				return subtotal
			},
			novehicalsubtotal() { //非整车每个产品的小记
				return function(arr) {
					let total = 0;
					console.log(arr)
					arr.forEach(function(x) {
						total += Number(x.FINAL_PRICE) * Number(x.NUM)
					});
					return total
				}
			}
		},
		onShow() {
			filter.tabbarRequired("false"); //不带tabbar
		},
		onLoad(ops) {
			// debugger
			const isReview = (ops.isReview == 'true' ? true : false);
			const orderid = ops.id;
			// alert("拿到的id是"+orderid+"拿到的isReview是"+isReview)
			// const isReview = false;//测试数据
			// const orderid = 72;//测试数据
			this.isReview = isReview
			this.orderId = orderid
		},
		created() {
			uni.showLoading({
				icon: 'loading',
				title: '加载中'
			});
			// alert("created的id"+this.orderId)
			this.getAutoSalesOrder(this.orderId); //根据订单id查询详情
		},
		methods: {
			backlist(){
				if(this.isReview){
					uni.redirectTo({
					    url: '../consultantsLists/consultantsLists'
					});
				}else{
					uni.redirectTo({
					    url: '../managerlist/managerlist'
					});
				}
				
			},
			// 获取销售订单数据
			async getAutoSalesOrder(id) {
				// alert("getAutoSalesOrder方法的id是"+id)
				let param = {
					"id": id
				}
				await this.$api.HHPF_P_GetAutoSalesOrder(param).then(res => {
					// 获得数据 
					console.log("获取销售订单数据" + res.Data)
					if (res.Msg == 'success') {
						this.orderDetail = res.Data
					}
					uni.hideLoading();
				}).catch(res => {
					console.log(res)
					// 失败进行的操作
				})
			},
			// 底部弹框
			toggle(type, content) {
				this.content = content //
				this.type = type
				this.$refs.popup.open()


			},
			// 底部弹框是否弹出的状态：true弹出 false关闭
			change(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			},
			// 关闭弹框
			closepopup() {
				this.$refs.popup.close();
			},
			//备注
			bindTextAreaBlur: function(e) {
				//(最多32个字)
				if (e.detail.value.length > 0 && e.detail.value.length < 32) {
					this.Isdisabled = false
				} else if (e.detail.value.length > 32) {
					this.Isdisabled = true
					uni.showToast({
						title: '最多32个字',
						duration: 2000
					});
				}

			},
			//审核订单时的底部按钮
			comfirm() {
				//如果是同意
				if (this.content == "agree") {
					console.log("同意的备注是" + this.remarks)
					this.remarks = ""; //清空
					this.Isdisabled = true
					//如果是驳回
				} else if (this.content == "reject") {
					console.log("驳回的备注是" + this.remarks)
					this.remarks = ""; //清空
					this.Isdisabled = true
				}
				this.$refs.popup.close();
				// 跳转列表
				uni.redirectTo({ //关闭当前页面
					url: '../consultantsLists/consultantsLists'
				});
			}
		}

	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
	}
</style>
