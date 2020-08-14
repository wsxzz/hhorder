const invoiceInfo = {
	state: {
		obj: {
			"invoice":0,//	是	int	机动车发票，需要开为1，不需要 0
			"invoice_public":0,//	是	int	普通发票，需要开为1，不需要 0
			"invoice_sum":0,//	是	int	发票总额，单位分，无时填0
		}
	},
	getters: {
		// carinfo: state => state.carinfo
	},
	mutations: {
		
	},
	actions: {
		// setcarinfo(context, obj) {
		// 	context.commit('setcarinfoM', obj)
		// },
		// setcarinfoall(context, obj) {
		// 	context.commit('setcarinfoallM', obj)
		// },
	}
}
export default invoiceInfo
