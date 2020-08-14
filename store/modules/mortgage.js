const mortgage = {
	state: {
		mortgageOk:false,
		obj:{
			"org_id":"",//	是	string	按揭机构ID
			"org_idIndex":0,//	是	string	按揭机构ID
			"org_idArrayNAME":[],//	是	string	按揭机构ID
			"org_idArrayID":[],//	是	string	按揭机构ID
			"mortgage_kind":null,//类型
			"mortgage_kindIndex":0,//类型
			"repayment_type":null,//	是	int	还款方式ID
			"repayment_typeIndex":0,//	是	int	还款方式ID
			"price"	:0,//是	int	按揭金额，单位分
			"deadline":null,	//是	int	贷款期限ID
			"deadlineIndex":0,	//是	int	贷款期限ID
			"multiple_txt":"",//	是	string	按揭内容；将多个内容ID，用逗号进行连接，例如：1,2,3,4
			"first_per":0,//	是	int	首付比例%，23.54%，填写23.56
			"quota":0,	//是	int	贷款额度，单位分
			"org_src":"",//	是	string	按揭机构来源ID
			"org_srcIndex":0,//	是	string	按揭机构来源ID
			"qua_id":null,//是	int	资质ID
			"qua_idIndex":0,//是	int	资质ID
			"info":"",	//是	string	备注
		}
		
	},
	getters: {
		// carinfo: state => state.carinfo
	},
	mutations: {
		setbaseinfoM(state, obj) {
			// state.entry4.push(obj);
			Object.assign(state.obj,obj)
		}
		// setorder_kindIndexM(state, obj) {
		// 	state.order_kind = obj.order_kind
		// 	state.order_kindIndex = obj.order_kindIndex
		// },
		
	},
	actions: {
		getbaseinfo(context, obj) {
			context.commit('setbaseinfoM', obj)
		}
	}
}
export default mortgage
