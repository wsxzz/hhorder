const customerInfo = {
	state: {
		seletOk:false,
		entry1:{
			"customer_id":0,//	是	int	客户ID
			"kind":null,//	是	int	客户类型
			"entrust":0,//是	int	是否委托；0 否，1 是
			"customer_name":"",//	是	int	客户名称
			"customer_phone":"",//	是	int	客户名称
			"customer_IDcard":"",//	是	int	客户名称
			"customer_from":null,//	是	int	客户来源
			"customer_fromID":"",//	是	int	客户来源
			"customer_fromIndex":0,//	是	int	客户来源
			"customer_fromNAME":[],//	是	int	客户来源
			"company_NAME":"",//	公司名称
			"company_CODE":"",//	机构
			"company_ADDRESS":"",//	注册地址
			"company_REGIST_NO":"",//	营业执照
			"relation":0,//	是	int	与客户关系
			"relationIndex":0,//与客户关系
			"entrust_name":"",//	否	string	委托人姓名；委托为否时可以不传
			"entrust_phone":"",//string	委托人电话；委托为否时可以不传
			"entrust_relation":0,//	否	int	与客户关系；委托为否时可以不传
			"entrust_relation_txt":"",//	否	string	与客户关系是其他是，进行补充填写；委托为否时可以不传
			
		},
		entry2:{
			"name":"",//	是	string	车主姓名
			"phone":"",//	是	string	车主电话
			"identity":"",//	是	string	车主身份证
			"relationArrayNAME":[],//与客户关系
			"relationArrayID":[],//与客户关系
			"relationIndex":0,//与客户关系
			"relation":0,//	是	int	与客户关系
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
export default customerInfo
