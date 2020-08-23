import Vue from 'vue'
let v = new Vue();

export function dataArr() {
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
		}
		]
}