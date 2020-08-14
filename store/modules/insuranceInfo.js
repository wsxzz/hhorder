const insuranceInfo = {
	state: {
		insselectOK:false,
		obj:{
			"org_id":"",//	是	string	机构ID
			"org_src":"",//		是	string	机构来源编号
			"org_fromIndex":0,//是	int	机构来源编号
			"jqx_price":0,//	是	int	交强险预估，单位分
			"ccs_price":0,//	是	int	车船险预估，单位分
			"syx_price"	:0,//是	int	商业险预估，单位分
			"discount_price":0,//	是	int	保险优惠，单位分，无填0
			"other_price":0,//	是	int	其他金额，单位分，无填0
			"info":	"",//	是	string	备注，没有时填写空字符串
			"kind":	null,//是	int	保险类型
			"kindIndex":0,//是	int	保险类型
			
			'name':"",
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
export default insuranceInfo
