const parts = {
	state: {
		"entry4": [],//精品美容信息
		"entry7": {},//延保产品信息
		"entry8": [],//公司产品信息
		"entry9": [],//套餐产品
		"entry10": [],//代办业务信息
		"entry11": [],//卡券销售信息
	},
	getters: {
		carinfo: state => state.carinfo
	},
	mutations: {
		setentry4M(state, obj) {
			state.entry4.push(obj);
		},
		setentry7M(state, obj) {
			Object.assign(state.entry,obj)
		},
		setentry8M(state, obj) {
			state.entry8.push(obj);
		},
		setentry9M(state, obj) {
			state.entry9.push(obj);
		},
		setentry10M(state, obj) {
			state.entry10.push(obj);
		},
		setentry11M(state, obj) {
			state.entry11.push(obj);
		},
		
	},
	actions: {
		getentry4(context, obj) {
			context.commit('setentry4M', obj)
		},
		getentry7(context, obj) {
			context.commit('setentry7M', obj)
		},
		getentry8(context, obj) {
			context.commit('setentry8M', obj)
		},
		getentry9(context, obj) {
			context.commit('setentry9M', obj)
		},
		getentry10(context, obj) {
			context.commit('setentry10M', obj)
		},
		getentry11(context, obj) {
			context.commit('setentry11M', obj)
		},
	}
}
export default parts
