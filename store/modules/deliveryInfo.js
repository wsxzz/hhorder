const deliveryInfo = {
	state: {
		insselectOK:false,
		obj:{
			"give_type":null	,//是	int	交付方式
			"give_typeIndex":0	,//是	int	交付方式
			"address":"",//是	string	取/送货地址，没有时填写空字符串
			"address_type":0,//	是	int	地址类型，无时填0
			"address_typeIndex":0,//	是	int	地址类型，无时填0
			"postcode":"",//	是	string	邮编，没有时填写空字符串
			"give_date":"",//	是	string	约定交期，YYYY-MM-DD
			"remark":"",//	是	string	交期备注，没有时填写空字符串
			"other":0,//	是	string	其他约定，没有时填写空字符串
			"is_self":0,//	是	int	联系人类型；1 客户自己, 0 其他
			"other_person":"",//	是	string	联系人，没有时填写空字符串
			"info":"",//	是	string	备注，没有时填写空字符串
			"is_place":0,//	是	int	二手车置换，无时填0
			"info2":"",//是	string	二手车备注，没有时填写空字符串
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
export default deliveryInfo
