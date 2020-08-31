import Vue from 'vue'
import fn from '../../../common/filter.js'
let v = new Vue();

export function dataBaseArr() {
	return [{
			type: 'radioM',
			title: '订单类型',
			value:5 ,
			placeholder: '',
			fieldName: 'order_kind',
			CODES:[{
					"ID": 5,
					"PARENT_ID": 0,
					"CODE": "order_kind",
					"NAME": "整车",
					"SORTNO": 0,
					"VAL_NUM": null
				},{
					"ID": 7,
					"PARENT_ID": 0,
					"CODE": "order_kind",
					"NAME": "非整车",
					"SORTNO": 0,
					"VAL_NUM": null
				}],
			isHave: true
		},
		{
			type: 'selectM',
			title: '销售类型',
			value:3 ,
			placeholder: '',
			fieldName: 'sell_kind',
			CODES:v.$store.state.codes.filter(item => item.CODE === "sell_kind"),
			isHave: true
		},
		{
			type: 'radioM',
			title: '车辆类型',
			value:69 ,
			placeholder: '',
			fieldName: 'car_type',
			CODES:v.$store.state.codes.filter(item => item.CODE === "car_type"),
			isHave: true
		},
		{
			type: 'selectM',
			title: '订单渠道',
			value:8 ,
			placeholder: '',
			fieldName: 'order_channel',
			CODES:v.$store.state.codes.filter(item => item.CODE === "order_channel"),
			isHave: true
		},
		{
			type: 'radioM',
			title: '付款方式',
			value: 67,
			placeholder: '',
			fieldName: 'pay_type',
			CODES:v.$store.state.codes.filter(item => item.CODE === "pay_type"),
			isHave: true
		},
		{
			type: 'radioM',
			title: '订单来源',
			value: 12,
			placeholder: '',
			fieldName: 'order_from',
			CODES:[{
					"ID": 11,
					"PARENT_ID": 0,
					"CODE": "order_from",
					"NAME": "线上",
					"SORTNO": 0,
					"VAL_NUM": null
				},{
					"ID": 12,
					"PARENT_ID": 0,
					"CODE": "order_from",
					"NAME": "线下",
					"SORTNO": 0,
					"VAL_NUM": null
				},{
					"ID": 14,
					"PARENT_ID": 0,
					"CODE": "order_from",
					"NAME": "代交车",
					"SORTNO": 0,
					"VAL_NUM": null
				}],
			isHave: true
		},
		{
			type: 'inputM',
			carOWN:true,
			title: '活动名称',
			numberVal:false,//是否是数字类型
			value:"" ,
			placeholder:'请输入',
			disabled:false,//不可修改
			fieldName: 'name',
			isHave: false
		},
		{
			type: 'radioM',
			title: '客户类型',
			value: 15,
			placeholder: '',
			fieldName: 'customer_kind',
			CODES:v.$store.state.codes.filter(item => item.CODE === "customer_kind"),
			isHave: true
		},
		]
}

export function dataCustomerArr() {//个人
	return [{
			type: 'IMgtextM',
			title: '个人客户姓名',
			value:"" ,
			numberVal:false,//是否是数字类型
			disabled:true,//不可修改
			Required:false,
			fieldName: 'bd_name',
			isHave: true
		},{
			type: 'textM',
			title: '客户电话',
			value:"" ,
			numberVal:false,//是否是数字类型
			Required:true,
			disabled:true,//不可修改
			fieldName: 'com_phone',
			isHave: true
		},
		{
			type: 'textM',
			title: '身份证号',
			value:"" ,
			numberVal:false,//是否是数字类型
			Required:true,
			disabled:true,//不可修改
			fieldName: 'cer_id_no',
			isHave: true
		},
		{
			type: 'selectM',
			title: '客户来源',
			value:17 ,
			placeholder: '',
			Required:true,
			fieldName: 'customer_from',
			CODES:v.$store.state.codes.filter(item => item.CODE === "customer_from"),
			isHave: true
		},
		{
			type: 'selectM',
			title: '与车主关系',
			value:21 ,
			placeholder: '',
			Required:true,
			fieldName: 'relation',
			CODES:v.$store.state.codes.filter(item => item.CODE === "customer_relation"),
			isHave: true
		},
		{
			type: 'title',
			title: '车主信息',
			value:"车主信息" ,
			Required:false,
			fieldName:'',
			isHave: true
		},
		{
			type: 'inputM',
			title: '车主姓名',
			numberVal:false,//是否是数字类型
			value:"" ,
			isphone:false,
			Required:false,
			fieldName: 'name',
			isHave: true
		},
		{
			type: 'inputM',
			title: '车主电话',
			value:"" ,
			Required:false,
			numberVal:false,//是否是数字类型
			fieldName: 'phone',
			isHave: true
		},
		{
			type: 'textM',
			title: '证件类型',
			value:"身份证" ,
			numberVal:false,//是否是数字类型
			Required:false,
			fieldName:'identityC',
			isHave: true
		},
		{
			type: 'inputM',
			title: '证件号码',
			value:"" ,
			Required:false,
			isphone:false,
			numberVal:false,//是否是数字类型
			placeholder:'请输入证件号码',
			fieldName: 'identity',
			isHave: true
		},
		]
}

export function dataCustomerUnitArr() {//单位
	return [{
			type: 'IMgtextM',
			title: '企业客户名称',
			value:"" ,
			Required:false,
			disabled:true,//不可修改
			numberVal:false,//是否是数字类型
			fieldName: 'unit_name',
			isHave: true
		},
		{
			type: 'inputM',
			title: '委托人姓名',
			Required:false,
			numberVal:false,//是否是数字类型
			value:"" ,
			fieldName: 'entrust_name',
			isHave: true
		},
		{
			type: 'inputM',
			title: '委托人电话',
			Required:false,
			numberVal:false,//是否是数字类型
			value:"" ,
			fieldName: 'entrust_phone',
			isHave: true
		},{
			type: 'textM',
			title: '机构代码',
			value:"" ,
			Required:false,
			disabled:true,//不可修改
			numberVal:false,//是否是数字类型
			fieldName: 'regist_no',
			isHave: true
		},{
			type: 'textM',
			title: '注册地址',
			value:"" ,
			Required:false,
			disabled:true,//不可修改
			numberVal:false,//是否是数字类型
			fieldName: 'register_site',
			isHave: true
		},
		{
			type: 'selectM',
			title: '委托关系',
			value:21 ,
			Required:false,
			placeholder: '',
			fieldName: 'entrust_relation',
			CODES:v.$store.state.codes.filter(item => item.CODE === "customer_relation"),
			isHave: true
		},
		{
			type: 'title',
			title: '上牌信息',
			value:"上牌信息" ,
			fieldName:'',
			Required:false,
			isHave: true
		},
		{
			type: 'textM',
			title: '公司名称',
			Required:false,
			value:"" ,
			isunit:false,//单位
			disabled:true,//不可修改
			numberVal:false,//是否是数字类型
			fieldName: 'unit_name1',
			isHave: true
		},{
			type: 'textM',
			title: '营业执照',
			value:"" ,
			Required:false,
			disabled:true,//不可修改
			isunit:false,//单位
			numberVal:false,//是否是数字类型
			fieldName: 'regist_no1',
			isHave: true
		}
		]
}
export function dataInvoiceArr() {//发票
	return [{
			type: 'inputM',
			title: '发票总额',
			numberVal:true,//是否是数字类型
			value:0,
			fieldName: 'invoice_sum',
			isHave: true
		},
		{
			type: 'radioM',
			title: '机动车发票',
			value:0 ,
			placeholder: '',
			fieldName: 'invoice',
			CODES:[{
					"ID": 1,
					"CODE": "invoice",
					"NAME": "是",
				},{
					"ID": 0,
					"CODE": "invoice",
					"NAME": "否",
				}],
			isHave: true
		},
		{
			type: 'radioM',
			title: '普通发票',
			value:0 ,
			placeholder: '',
			fieldName: 'invoice_public',
			CODES:[{
					"ID": 1,
					"CODE": "invoice_public",
					"NAME": "是",
				},{
					"ID": 0,
					"CODE": "invoice_public",
					"NAME": "否",
				}],
			isHave: true
		},
		]
}

export function dataPriceArr() {//款项
	return [
		{
			type: 'radioM',
			title: '订金方式',
			value:38 ,
			addClass:false,//增加样式
			placeholder: '',
			fieldName: 'subscription_type',
			CODES:v.$store.state.codes.filter(item => item.CODE === "subscription_type"),
			isHave: true
		},{
			type: 'inputM',
			title: '订金',
			addClass:false,//增加样式
			numberVal:true,//是否是数字类型
			value:0,
			fieldName: 'first_price',
			isHave: true
		},
		{
			type: 'textM',
			title: '尾款',
			addClass:false,//增加样式
			value:0,
			isunit:false,//单位
			numberVal:true,//是否是数字类型
			fieldName: 'last_price',
			Required:false,
			isHave: true
		},
		{
			type: 'textM',
			title: '应收总额',
			value:0,
			numberVal:true,//是否是数字类型
			addClass:true,//增加样式
			isunit:false,//单位
			fieldName: 'get_price',
			Required:false,
			isHave: true
		},
		{
			type: 'textM',
			title: '整车款',
			addClass:false,//增加样式
			value:0,
			isunit:false,//单位
			numberVal:true,//是否是数字类型
			fieldName: 'car_price',
			Required:false,
			isHave: true
		},
		{
			type: 'textM',
			title: '精品美容款',
			addClass:false,//增加样式
			value:0,
			isunit:false,//单位
			numberVal:true,//是否是数字类型
			fieldName: 'goods_price',
			Required:false,
			isHave: true
		},
		{
			type: 'textM',
			title: '产品款',
			addClass:false,//增加样式
			isunit:false,//单位
			value:0,
			numberVal:true,//是否是数字类型
			fieldName: 'product_price',
			Required:false,
			isHave: true
		},
		{
			type: 'textM',
			title: '代办款',
			addClass:false,//增加样式
			value:0,
			isunit:false,//单位
			numberVal:true,//是否是数字类型
			fieldName: 'commission_price',
			Required:false,
			isHave: true
		},
		{
			type: 'textM',
			title: '卡劵款',
			isunit:false,//单位
			addClass:false,//增加样式
			value:0,
			numberVal:true,//是否是数字类型
			fieldName: 'card_price',
			Required:false,
			isHave: true
		},
		]
}


export function dataGiveArr() {//交付
	return [
		{
			type: 'dateM',
			title: '约定交期',
			value:fn.CurentTime() ,
			start:fn.CurentTime(),//开始日期
			endDate:"2030-01-01",//结束日期
			fieldName: 'give_date',
			isHave: true
		},
		{
			type: 'textareaM',
			title: '交期备注',
			value:"" ,
			fieldName: 'remark',
			isHave: true
		},
		{
			type: 'radioM',
			title: '交付方式',
			value:41 ,
			placeholder: '',
			fieldName: 'give_type',
			CODES:v.$store.state.codes.filter(item => item.CODE === "give_type"),
			isHave: true
		},
		{
			type: 'radioM',
			title: '地址类型',
			value: 44,
			placeholder: '',
			fieldName: 'address_kind',
			CODES:v.$store.state.codes.filter(item => item.CODE === "address_kind"),
			isHave: true
		},
		{
			type: 'textareaM',
			title: '取/送货地址',
			value:"" ,
			fieldName: 'address',
			isHave: true
		},
		{
			type: 'inputM',
			title: '邮编',
			value:"" ,
			fieldName: 'postcode',
			isHave: true
		},
		{
			type: 'radioM',
			title: '联系人',
			value: 1,
			placeholder: '',
			fieldName: 'is_self',
			CODES:[{
					"ID": 1,
					"CODE": "is_self",
					"NAME": "客户",
				},{
					"ID": 0,
					"CODE": "is_self",
					"NAME": "其他",
				}],
			isHave: true
		},
		{
			type: 'radioM',
			title: '与客户约定',
			value:0 ,
			placeholder: '',
			fieldName: 'is_other',
			CODES:[{
					"ID": 1,
					"CODE": "is_other",
					"NAME": "有",
				},{
					"ID": 0,
					"CODE": "is_other",
					"NAME": "无",
				}],
			isHave: true
		},
		{
			type: 'textareaM',
			title: '备注',
			value:"" ,
			fieldName: 'info',
			isHave: true
		},
		{
			type: 'radioM',
			title: '二手车置换',
			value: 0,
			placeholder: '',
			fieldName: 'is_place',
			CODES:[{
					"ID": 1,
					"CODE": "is_place",
					"NAME": "有",
				},{
					"ID": 0,
					"CODE": "is_place",
					"NAME": "无",
				}],
			isHave: true
		},
		{
			type: 'textareaM',
			title: '备注',
			value:"" ,
			fieldName: 'info2',
			isHave: true
		},
		
		]
}

export function dataRepaymentArr() {//按揭
	return [
		{
			type: 'inputM',
			title: '额度总计',
			numberVal:true,//是否是数字类型
			value:0,
			unit:"元",//单位
			isunit:true,//单位
			Required:false,
			addClass:false,//增加样式
			fieldName: 'price',
			isHave: true
		},
		{
			type: 'radioM',
			title: '按揭类型',
			value: 1,
			placeholder: '',
			fieldName: 'org_type',
			CODES:[{
					"ID": 1,
					"CODE": "org_type",
					"NAME": "厂家",
				},{
					"ID": 2,
					"CODE": "org_type",
					"NAME": "银行",
				},{
					"ID": 3,
					"CODE": "org_type",
					"NAME": "信贷",
				},{
					"ID": 4,
					"CODE": "org_type",
					"NAME": "集团",
				}],
			isHave: true
		},
		{
			type: 'selectM2',
			title: '按揭机构',
			value:"nzIAAAADLbA9BT3K" ,
			placeholder: '',
			fieldName: 'org_id',
			CODES:v.$store.state.org_list1,
			isHave: true
		},
		{
			type: 'radioM',
			title: '机构来源',
			value:26 ,
			placeholder: '',
			fieldName: 'org_from',
			CODES:v.$store.state.codes.filter(item => item.CODE === "org_from"),
			isHave: true
		},
		{
			type: 'selectM',
			title: '还款方式',
			value:33 ,
			placeholder: '',
			fieldName: 'repayment_type',
			Required:false,
			CODES:v.$store.state.codes.filter(item => item.CODE === "payback_kind"),
			isHave: true,
			
		},
		{
			type: 'inputM',
			title: '首付比例',
			numberVal:true,//是否是数字类型
			value:0,
			unit:"%",//单位
			isunit:true,//单位
			addClass:false,//增加样式
			Required:false,
			fieldName: 'first_per',
			isHave: true
		},
		{
			type: 'textM',
			title: '贷款额度',
			numberVal:true,//是否是数字类型
			value:0,
			unit:"元",//单位
			isunit:true,//单位
			addClass:false,//增加样式
			Required:false,
			fieldName: 'quota',
			isHave: true
		},
		{
			type: 'selectM',
			title: '贷款期限',
			value:71 ,
			placeholder: '',
			fieldName: 'deadline',
			Required:false,
			CODES:v.$store.state.codes.filter(item => item.CODE === "Mortgage_Limit"),
			isHave: true
		},
		{
			type: 'textM',
			title: '按揭内容',
			value:"" ,
			placeholder: '',
			isunit:false,//单位
			fieldName: 'multiple_txt',
			isHave: true
		},
		{
			type: 'selectM',
			title: '资质要求',
			value:84 ,
			placeholder: '',
			fieldName: 'qua_id',
			Required:false,
			CODES:v.$store.state.codes.filter(item => item.CODE === "Qualification_Kind"),
			isHave: true
		},
		{
			type: 'textareaM',
			title: '备注说明',
			value:"" ,
			fieldName: 'info',
			isHave: true
		}
		]
}


export function dataInsuranceArr() {//保险
	return [
		{
			type: 'IMgtextM',
			title: 'test',
			value:"test" ,
			disabled:true,//不可修改
			Required:false,
			fieldName: 'org_name',
			isHave: true
		},
		{
			type: 'selectM',
			title: '保险类型',
			value:47 ,
			placeholder: '',
			fieldName: 'kind',
			Required:false,
			CODES:v.$store.state.codes.filter(item => item.CODE === "insurance_kind"),
			isHave: true
		},
		{
			type: 'inputM',
			title: '交强险',
			Required:false,
			numberVal:true,//是否是数字类型
			value:0,
			unit:"元",//单位
			isunit:true,//单位
			addClass:false,//增加样式
			fieldName: 'jqx_price',
			isHave: true
		},
		{
			type: 'inputM',
			title: '车船险',
			Required:false,
			numberVal:true,//是否是数字类型
			value:0,
			unit:"元",//单位
			isunit:true,//单位
			addClass:false,//增加样式
			fieldName: 'ccs_price',
			isHave: true
		},
		{
			type: 'inputM',
			title: '商业险',
			Required:false,
			numberVal:true,//是否是数字类型
			value:0,
			unit:"元",//单位
			isunit:true,//单位
			addClass:false,//增加样式
			fieldName: 'syx_price',
			isHave: true
		},
		{
			type: 'inputM',
			title: '保险优惠',
			Required:false,
			numberVal:true,//是否是数字类型
			value:0,
			unit:"元",//单位
			isunit:true,//单位
			addClass:false,//增加样式
			fieldName: 'discount_price',
			isHave: true
		},
		{
			type: 'inputM',
			title: '其他金额',
			Required:false,
			numberVal:true,//是否是数字类型
			value:0,
			unit:"元",//单位
			isunit:true,//单位
			addClass:false,//增加样式
			fieldName: 'other_price',
			isHave: true
		},
		{
			type: 'textareaM',
			title: '备注',
			value:"" ,
			fieldName: 'info',
			isHave: true
		}
		]
}


export function dataCarInfoArr() {//整车
	return [
		{
			type: 'inputM',
			title: '成交价',
			numberVal:true,//是否是数字类型
			value:0,
			unit:"元",//单位
			addClass:false,//增加样式
			Required:false,
			fieldName: 'final_price',
			isHave: true
		},
		{
			type: 'radioM',
			title: '待收购置税',
			value: 1,
			placeholder: '',
			fieldName: 'is_tax',
			CODES:[{
					"ID": 1,
					"CODE": "is_tax",
					"NAME": "是",
				},{
					"ID": 0,
					"CODE": "is_tax",
					"NAME": "否",
				}],
			isHave: true
		},
		{
			type: 'radioM',
			title: '收取方式',
			value:65 ,
			placeholder: '',
			fieldName: 'collection_type',
			CODES:v.$store.state.codes.filter(item => item.CODE === "car_pay_type"),
			isHave: true
		},
		{
			type: 'inputM',
			title: '税率',
			Required:false,
			numberVal:true,//是否是数字类型
			value:0,
			unit:"%",//单位
			addClass:false,//增加样式
			fieldName: 'tax_num',
			isHave: true
		},
		{
			type: 'textM',
			title: '税额',
			Required:false,
			numberVal:true,//是否是数字类型
			value:0,
			unit:"元",//单位
			isunit:true,//单位
			addClass:false,//增加样式
			fieldName: 'tax_limit',
			isHave: true
		}
		]
}