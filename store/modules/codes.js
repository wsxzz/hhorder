const codes = {
	state: {
		codes:[],
	},
	getters: {
		sell_kindCodes:state => state.codes.filter(item=>item.CODE==="sell_kind"),//	获取销售类型
		sell_kindID:state => state.codes.filter(item=>item.CODE==="sell_kind").map(item =>
		{
			return item.ID
		}),//销售类型ID
		sell_kindNAME:state => state.codes.filter(item=>item.CODE==="sell_kind").map(item =>
		{
			return item.NAME
		}),//销售类型名字
		
		order_kindCodes:state => state.codes.filter(item=>item.CODE==="order_kind"),//	获取订单类型
		order_kindID:state => state.codes.filter(item=>item.CODE==="order_kind").map(item =>
		{
			return item.ID
		}),//订单类型ID
		order_kindNAME:state => state.codes.filter(item=>item.CODE==="order_kind").map(item =>
		{
			return item.NAME
		}),//订单类型名字
		
		order_channelCodes:state => state.codes.filter(item=>item.CODE==="order_channel"),//	获取订单渠道类型
		order_channelID:state => state.codes.filter(item=>item.CODE==="order_channel").map(item =>
		{
			return item.ID
		}),//订单渠道ID
		order_channelNAME:state => state.codes.filter(item=>item.CODE==="order_channel").map(item =>
		{
			return item.NAME
		}),//订单渠道名字
		
		order_fromCodes:state => state.codes.filter(item=>item.CODE==="order_from"),//	订单来源类型
		order_fromID:state => state.codes.filter(item=>item.CODE==="order_from").map(item =>
		{
			return item.ID
		}),//订单来源ID
		order_fromNAME:state => state.codes.filter(item=>item.CODE==="order_from").map(item =>
		{
			return item.NAME
		}),//订单来源名字
		
		customer_kindCodes:state => state.codes.filter(item=>item.CODE==="customer_kind"),//		客户类型
		customer_kindID:state => state.codes.filter(item=>item.CODE==="customer_kind").map(item =>
		{
			return item.ID
		}),//客户类型ID
		customer_kindNAME:state => state.codes.filter(item=>item.CODE==="customer_kind").map(item =>
		{
			return item.NAME
		}),//客户类型名字
		
		customer_fromCodes:state => state.codes.filter(item=>item.CODE==="customer_from"),//		客户来源类型
		customer_fromID:state => state.codes.filter(item=>item.CODE==="customer_from").map(item =>
		{
			return item.ID
		}),//客户来源ID
		customer_fromNAME:state => state.codes.filter(item=>item.CODE==="customer_from").map(item =>
		{
			return item.NAME
		}),//客户来源名字
		
		customer_relationCodes:state => state.codes.filter(item=>item.CODE==="customer_relation"),//		与客户关系类型
		customer_relationID:state => state.codes.filter(item=>item.CODE==="customer_relation").map(item =>
		{
			return item.ID
		}),//与客户关系ID
		customer_relationNAME:state => state.codes.filter(item=>item.CODE==="customer_relation").map(item =>
		{
			return item.NAME
		}),//与客户关系名字
		
		mortgage_kindCodes:state => state.codes.filter(item=>item.CODE==="mortgage_kind"),//		按揭类型类型
		mortgage_kindID:state => state.codes.filter(item=>item.CODE==="mortgage_kind").map(item =>
		{
			return item.ID
		}),//按揭类型ID
		mortgage_kindNAME:state => state.codes.filter(item=>item.CODE==="mortgage_kind").map(item =>
		{
			return item.NAME
		}),//按揭类型名字
		
		payback_kindCodes:state => state.codes.filter(item=>item.CODE==="payback_kind"),//还款方式类型
		payback_kindID:state => state.codes.filter(item=>item.CODE==="payback_kind").map(item =>
		{
			return item.ID
		}),//还款方式ID
		payback_kindNAME:state => state.codes.filter(item=>item.CODE==="payback_kind").map(item =>
		{
			return item.NAME
		}),//还款方式名字
		
		card_kindCodes:state => state.codes.filter(item=>item.CODE==="card_kind"),//卡券类型
		card_kindID:state => state.codes.filter(item=>item.CODE==="card_kind").map(item =>
		{
			return item.ID
		}),//卡券类型ID
		card_kindNAME:state => state.codes.filter(item=>item.CODE==="card_kind").map(item =>
		{
			return item.NAME
		}),//卡券类型名字
		
		subscription_typeCodes:state => state.codes.filter(item=>item.CODE==="subscription_type"),//		订金方式类型
		subscription_typeID:state => state.codes.filter(item=>item.CODE==="subscription_type").map(item =>
		{
			return item.ID
		}),//订金方式ID
		subscription_typeNAME:state => state.codes.filter(item=>item.CODE==="subscription_type").map(item =>
		{
			return item.NAME
		}),//订金方式名字
		
		give_typeCodes:state => state.codes.filter(item=>item.CODE==="give_type"),//交付方式

		give_typeID:state => state.codes.filter(item=>item.CODE==="give_type").map(item =>
		{
			return item.ID
		}),//交付方式ID
		give_typeNAME:state => state.codes.filter(item=>item.CODE==="give_type").map(item =>
		{
			return item.NAME
		}),//交付方式名字
		
		address_kindCodes:state => state.codes.filter(item=>item.CODE==="address_kind"),//地址类型
		address_kindID:state => state.codes.filter(item=>item.CODE==="address_kind").map(item =>
		{
			return item.ID
		}),//地址类型ID
		address_kindNAME:state => state.codes.filter(item=>item.CODE==="address_kind").map(item =>
		{
			return item.NAME
		}),//地址类型名字
		
		org_fromCodes:state => state.codes.filter(item=>item.CODE==="org_from"),//机构来源
		org_fromID:state => state.codes.filter(item=>item.CODE==="org_from").map(item =>
		{
			return item.ID
		}),//机构来源ID
		org_fromNAME:state => state.codes.filter(item=>item.CODE==="org_from").map(item =>
		{
			return item.NAME
		}),//机构来源名字
		
		insurance_kindCodes:state => state.codes.filter(item=>item.CODE==="insurance_kind"),//		保险类型类型
		insurance_kindID:state => state.codes.filter(item=>item.CODE==="insurance_kind").map(item =>
		{
			return item.ID
		}),//保险类型ID
		insurance_kindNAME:state => state.codes.filter(item=>item.CODE==="insurance_kind").map(item =>
		{
			return item.NAME
		}),//保险类型名字
		
		hangtag_kindCodes:state => state.codes.filter(item=>item.CODE==="hangtag_kind"),//上牌类型
		hangtag_kindID:state => state.codes.filter(item=>item.CODE==="hangtag_kind").map(item =>
		{
			return item.ID
		}),//上牌类型ID
		hangtag_kindNAME:state => state.codes.filter(item=>item.CODE==="hangtag_kind").map(item =>
		{
			return item.NAME
		}),//上牌类型名字
		
		hangtag_stageCodes:state => state.codes.filter(item=>item.CODE==="hangtag_stage"),//		上牌阶段类型
		hangtag_stageID:state => state.codes.filter(item=>item.CODE==="hangtag_stage").map(item =>
		{
			return item.ID
		}),//上牌阶段ID
		hangtag_stageNAME:state => state.codes.filter(item=>item.CODE==="hangtag_stage").map(item =>
		{
			return item.NAME
		}),//上牌阶段名字
		
		car_number_colorCodes:state => state.codes.filter(item=>item.CODE==="car_number_color"),//		车牌颜色类型
		car_number_colorID:state => state.codes.filter(item=>item.CODE==="car_number_color").map(item =>
		{
			return item.ID
		}),//车牌颜色ID
		car_number_colorNAME:state => state.codes.filter(item=>item.CODE==="car_number_color").map(item =>
		{
			return item.NAME
		}),//车牌颜色名字
		
		InsuranceExtend_KindCodes:state => state.codes.filter(item=>item.CODE==="InsuranceExtend_Kind"),//		延保类型类型
		InsuranceExtend_KindID:state => state.codes.filter(item=>item.CODE==="InsuranceExtend_Kind").map(item =>
		{
			return item.ID
		}),//延保类型ID
		InsuranceExtend_KindNAME:state => state.codes.filter(item=>item.CODE==="InsuranceExtend_Kind").map(item =>
		{
			return item.NAME
		}),//延保类型名字
		
		car_kindCodes:state => state.codes.filter(item=>item.CODE==="car_kind"),//车辆销售-分类类型
		car_kindID:state => state.codes.filter(item=>item.CODE==="car_kind").map(item =>
		{
			return item.ID
		}),//车辆销售-分类ID
		car_kindNAME:state => state.codes.filter(item=>item.CODE==="car_kind").map(item =>
		{
			return item.NAME
		}),//车辆销售-分类名字
		
		car_pay_typeCodes:state => state.codes.filter(item=>item.CODE==="car_pay_type"),//车辆销售-收取方式类型
		car_pay_typeID:state => state.codes.filter(item=>item.CODE==="car_pay_type").map(item =>
		{
			return item.ID
		}),//车辆销售-收取方式D
		car_pay_typeNAME:state => state.codes.filter(item=>item.CODE==="car_pay_type").map(item =>
		{
			return item.NAME
		}),//保险类型名字
		
		pay_typeCodes:state => state.codes.filter(item=>item.CODE==="pay_type"),//车辆销售-收取方式类型
		pay_typeID:state => state.codes.filter(item=>item.CODE==="pay_type").map(item =>
		{
			return item.ID
		}),//车辆销售-收取方式D
		pay_typeNAME:state => state.codes.filter(item=>item.CODE==="pay_type").map(item =>
		{
			return item.NAME
		}),//保险类型名字
		
		
		car_typeCodes:state => state.codes.filter(item=>item.CODE==="car_type"),//车辆销售-收取方式类型
		car_typeID:state => state.codes.filter(item=>item.CODE==="car_type").map(item =>
		{
			return item.ID
		}),//车辆销售-收取方式D
		car_typeNAME:state => state.codes.filter(item=>item.CODE==="car_type").map(item =>
		{
			return item.NAME
		}),//保险类型名字
		
		Mortgage_LimitCodes:state => state.codes.filter(item=>item.CODE==="Mortgage_Limit"),//车辆销售-收取方式类型
		Mortgage_LimitID:state => state.codes.filter(item=>item.CODE==="Mortgage_Limit").map(item =>
		{
			return item.ID
		}),//车辆销售-收取方式D
		Mortgage_LimitNAME:state => state.codes.filter(item=>item.CODE==="Mortgage_Limit").map(item =>
		{
			return item.NAME
		}),//保险类型名字
		
		ReceivingApply_KindCodes:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Kind"),//车辆销售-收取方式类型
		ReceivingApply_KindID:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Kind").map(item =>
		{
			return item.ID
		}),//车辆销售-收取方式D
		ReceivingApply_KindNAME:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Kind").map(item =>
		{
			return item.NAME
		}),//保险类型名字
		ReceivingApply_Member_KindCodes:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Member_Kind"),//车辆销售-收取方式类型
		ReceivingApply_Member_KindID:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Member_Kind").map(item =>
		{
			return item.ID
		}),//车辆销售-收取方式D
		ReceivingApply_Member_KindNAME:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Member_Kind").map(item =>
		{
			return item.NAME
		}),//保险类型名字
		Qualification_KindCodes:state => state.codes.filter(item=>item.CODE==="Qualification_Kind"),//车辆销售-收取方式类型
		Qualification_KindID:state => state.codes.filter(item=>item.CODE==="Qualification_Kind").map(item =>
		{
			return item.ID
		}),//车辆销售-收取方式D
		Qualification_KindNAME:state => state.codes.filter(item=>item.CODE==="Qualification_Kind").map(item =>
		{
			return item.NAME
		}),//保险类型名字
		ReceivingApply_ProjectCodes:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Project"),//车辆销售-收取方式类型
		ReceivingApply_ProjectID:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Project").map(item =>
		{
			return item.ID
		}),//车辆销售-收取方式D
		ReceivingApply_ProjectNAME:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Project").map(item =>
		{
			return item.NAME
		}),//保险类型名字
		ReceivingApply_Project_KindCodes:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Project_Kind"),//车辆销售-收取方式类型
		ReceivingApply_Project_KindID:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Project_Kind").map(item =>
		{
			return item.ID
		}),//车辆销售-收取方式D
		ReceivingApply_Project_KindNAME:state => state.codes.filter(item=>item.CODE==="ReceivingApply_Project_Kind").map(item =>
		{
			return item.NAME
		}),//保险类型名字
		
		Acquisition_KindCodes:state => state.codes.filter(item=>item.CODE==="Acquisition_Kind"),//车辆销售-收取方式类型
		Acquisition_KindID:state => state.codes.filter(item=>item.CODE==="Acquisition_Kind").map(item =>
		{
			return item.ID
		}),//车辆销售-收取方式D
		Acquisition_KindNAME:state => state.codes.filter(item=>item.CODE==="Acquisition_Kind").map(item =>
		{
			return item.NAME
		}),//保险类型名字
		
	},
	mutations: {
		getcodes(state, obj) {
			state.codes = obj
		},
	},
	actions: {
		getcodes(context, obj) {
			context.commit('getcodes', obj)
		},
	}
}

export default codes
