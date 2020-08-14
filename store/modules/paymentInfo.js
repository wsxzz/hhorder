const paymentInfo = {
	state: {
		insselectOK:false,
		entry13:{
			type:null,//	是	int	订金方式
			typeIndex:0,//	是	int	订金方式
			first_price:0,//	是	int	订金/定金，单位分，无时填0
			last_price:0,//	是	int	尾款，单位分，无时填0
		},
		entry14:{
			first_price:0,//	是	int	订金(反写收款类型为整车订金的收款金额)，单位分，无时填0
			last_price:0,//	是	int	尾款(反写除整车订金的收款金)额合计，单位分，无时填0
			get_price:0,//	是	int	已收总额：订金+尾款，单位分，无时填0
			car_price:0,//	是	int	整车款，单位分，无时填0
			goods_price	:0,//是	int	商品款，单位分，无时填0
			product_price:0,//	是	int	产品款，单位分，无时填0
			commission_price:0,//	是	int	代办款，单位分，无时填0
			card_price:0,//	是	int	卡券款，单位分，无时填0
		}
		
	},
	getters: {
		// carinfo: state => state.carinfo
	},
	mutations: {
		setentry14M(state, obj) {
			Object.assign(state.entry14,obj)
		},
	},
	actions: {
		setentry14(context, obj) {
			context.commit('setentry14M', obj)
		},
	}
}
export default paymentInfo
