export default getinit(){
									let that = this;
									uni.showLoading({
									    title: '加载中'
									});
									debugger
									// if(that.sell_kindID.length>0){
									// 	that.indexs.sell_kind = that.sell_kindID[that.indexs.sell_kindIndex]	
									// }
									// if(that.order_kindID.length>0){
									// 	that.indexs.order_kind = that.order_kindID[that.indexs.order_kindIndex]	
									// }
									if(
									that.order_kindID.length>0&&
									that.order_channelID.length>0&&
									that.order_fromID.length>0&&
									that.car_kindID.length>0&&
									that.customer_kindID.length>0&&
									that.pay_typeID.length>0
									){
									that.indexs.sell_kind = that.sell_kindID[that.indexs.sell_kindIndex]
									that.indexs.order_kind = that.order_kindID[that.indexs.order_kindIndex]
									that.indexs.order_channel = that.order_channelID[that.indexs.order_channelIndex]
									that.indexs.order_from = that.order_fromID[that.indexs.order_fromIndex]
									that.indexs.car_kind = that.car_kindID[that.indexs.car_kindIndex]
									that.indexs.customer_kind = that.customer_kindID[that.indexs.customer_kindIndex]
									that.indexs.pay_type = that.pay_typeID[that.indexs.pay_typeIndex]
										// uni.hideToast();
										uni.hideLoading()
										console.log(that.indexs,"22222")
										// return
									}else{
										// that.getinit()
									}
									// if(that.indexs.sell_kind!==null&&that.indexs.order_kind!==null){
									// 	uni.hideLoading()
									// 		console.log(that.indexs,"22222")
									// }
									
									
								},