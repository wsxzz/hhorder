const baseinfo = {
	state: {
		obj:{
			"sell_kind":null,//	是	int	销售类型
			"sell_kindIndex":0,//	是	int	销售类型
			"sell_kindNAME":"",//	是	int	销售类型
			"order_kind":null,//	是	int	订单类型
			"order_kindIndex":0,//	是	int	订单类型
			"order_kindIndexNAME":"",//	是	int	订单类型
			"order_channel":null,//	是	int	订单渠道
			"order_channelIndex":0,//	是	int	订单渠道
			"order_from":null,//	是	int	订单来源
			"order_fromIndex":0,//	是	int	订单来源
			"name":"",//	是	string	活动名称/代交组织
			"sell_org":0,//	是	int	销售组织
			"second_point":0,//	是	int	二级网点
			"is_self":0,//	是	int	是否车主本人；0 否，1 是
			"adviser":"",//	"是	string	顾问人员ID
			"status":0,//	是int	订单状态；1 未提交(草稿)，2 审批中， 3 已审核， 4 驳回
			"pay_type":null,//	是	int	付款方式
			"pay_typeIndex":0,//	是	int	付款方式
			"pay_typeNAME":"",//	是	int	付款方式
			"car_kind":null,//	是	int	车辆类型
			"car_typeIndex":0,//	是	int	车辆类型
			"customer_kind":null,//客户类型
			"customer_kindIndex":0,//客户类型
			"customer_kindNAME":"个人",//客户类型
			"src_id":0,//	int	关联订单ID，无关联，填0
			"adviser_org_id": "",
			"adviser_org_name": "",
			"adviser_department_id": "",
			"adviser_department_name": "",
			"adviser_post_id": "",
			"adviser_post_name": "",
			"adviser_name": ""
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
export default baseinfo
