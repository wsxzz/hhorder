const order = {
	state: {
		obj: {
			"basic": {
				"sell_kind": null,
				"order_kind": null,
				"order_channel": null,
				"order_from": null,
				"name": "",
				"sell_org": 0,
				"second_point": 0,
				"is_self": 0,
				"status": 0,
				"pay_type": null,
				"car_kind": null,
				"src_id": 0,
				"adviser": "",
				"adviser_org_id": "",
				"adviser_org_name": "",
				"adviser_department_id": "",
				"adviser_department_name": "",
				"adviser_post_id": "",
				"adviser_post_name": "",
				"adviser_name": ""
			},
			"entry1": {
				"BD_NAME":"",//	个人客户名称
				"COM_PHONE":"",//	个人客户电话
				"CER_ID_NO":"",//	个人客户身份证
				"SOURCE_NATURE":"",//	个人客户来源
				"BD_SEX":"",//	个人客户性别称谓
				"UNIT_NAME":"",//	企业客户名称
				"REGIST_NO":"",//	企业工商号
				"REGISTER_SITE":"",//	企业注册地址
				"customer_id":null,///	是	int	客户ID
				"kind":null,//	是	int	客户类型
				"entrust":0,//	是	int	是否委托；0 否，1 是
				"entrust_name":"",//	否	string	委托人姓名；委托为否时可以不传
				"entrust_phone"	:"",//否	string	委托人电话；委托为否时可以不传
				"entrust_relation":0,//	否	int	与客户关系；委托为否时可以不传
				"entrust_relation_txt":"",//
			},
			"entry2": {},
			"entry3": [
			// 	{
			// 	"brand_id": "",
			// 	"series_id": "",
			// 	"model_id": "",
			// 	"chassis_num": "",
			// 	"trim_id": "",
			// 	"color_id": "",
			// 	"guide_price": 0,
			// 	"final_price":0,
			// 	"kind": null,
			// 	"collection_type": null,
			// 	"is_tax": 0,
			// 	"tax_num": 0,
			// 	"tax_limit": 0,
			// 	"img_url": "",
			// 	"trim_name": "",
			// 	"color_name": ""
			
			
			
			// },
			],
			"entry4": [
			// 	{
			// 	"good_id": null,
			// 	"is_add": 0,
			// 	"is_with": 0,
			// 	"pre_installed": 0,
			// 	"num": 1,
			// 	"guide_price": 0,
			// 	"final_price": 0,
			// 	"good_name": "",
			// 	"img_url": ""
			// },
			],
			"entry5": {
				// "org_id": "",
				// "repayment_type": null,
				// "price": 0,
				// "deadline": 0,
				// "multiple_txt": "",
				// "first_per": 0,
				// "quota": 0,
				// "org_src": "",
				// "qua_id": 0,
				// "info": ""
			},
			"entry6": {
				"name":"",
				"org_id": "",
				"org_src": "",
				"jqx_price": 0,
				"ccs_price": 0,
				"syx_price": 0,
				"discount_price": 0,
				"other_price": 0,
				"info": "",
				"kind": null
			},
			"entry7": {
				// "good_id": null,
				// "org_id": "",
				// "guide_price": 0,
				// "final_price": 0,
				// "num": 1,
				// "org_src": "",
				// "kind": null,
				// "good_name": "",
				// "img_url": ""
			},
			"entry8": [
			// 	{
			// 	"good_id": null,
			// 	"guide_price": 0,
			// 	"final_price": 0,
			// 	"num": 1,
			// 	"good_name": "",
			// 	"img_url": ""
			// },
			],
			"entry9": [
			// 	{
			// 	"good_id": null,
			// 	"guide_price": 0,
			// 	"final_price": 0,
			// 	"num": 1,
			// 	"good_name": "",
			// 	"img_url": ""
			// },
			],
			"entry10": [
			// 	{
			// 	"good_id": null,
			// 	"guide_price": 0,
			// 	"final_price": 0,
			// 	"num": 1,
			// 	"good_name": "",
			// 	"img_url": ""
			// },
			],
			"entry11": [
			// 	{
			// 	"good_id": null,
			// 	"kind": null,
			// 	"classId": null,
			// 	"guide_price": 0,
			// 	"final_price": 0,
			// 	"num": 1,
			// 	"good_name": "",
			// 	"img_url": ""
			// },
			],
			"entry12": {
				"give_type": null,
				"address": "",
				"address_type":null,
				"postcode": "",
				"give_date": "",
				"remark": "",
				"other": "",
				"is_self": 0,
				"other_person": "",
				"info": "",
				"is_place": 0,
				"info2": "",
				"is_other": 0,
			},
			"entry13": {
				"type": null,
				"first_price": 0,
				"last_price": 0
			},
			"entry14": {
				"first_price": 0,
				"last_price": 0,
				"get_price": 0,
				"car_price": 0,
				"goods_price": 0,
				"product_price": 0,
				"commission_price": 0,
				"card_price": 0
			},
			"entry15": {
				"invoice": 0,
				"invoice_public": 0,
				"invoice_sum": 0
			}
		},
		ids:{},
		org_list:[]
	},
	getters: {
	},
	mutations: {
		setorderdateM(state, obj) {
			Object.assign(state.ids,obj)
		},
		setorderobjM(state, obj) {
			Object.assign(state.obj,obj)
		}
	},
	actions: {
		setorderdate(context, obj) {
			context.commit('setorderdateM', obj)
		},
		setorderobj(context, obj) {
			context.commit('setorderobjM', obj)
		}
	}
}
export default order

				



