<script>
	
export default {
	 onLaunch: async function() {
		 //获取大量codes
		console.log('App Launch');
		let param = {"codes":["order_kind", "sell_kind","order_channel","order_from","customer_kind","customer_from","customer_relation","mortgage_kind","payback_kind","subscription_type","give_type","address_kind","org_from","insurance_kind","yes_or_no","hangtag_kind","hangtag_stage","car_number_color","insurance_kind","car_kind","car_pay_type","pay_type","car_type","Mortgage_Limit","Qualification_Kind"]}
		await this.$api.HHPF_P_GetBaseEnumByCodes(param).then(res => {
			// 获得数据  
			if(res.Msg=='success'){
				this.$store.dispatch('getcodes', res.Data);
			}else{
				uni.showToast({
				    title: res.Msg,
				    duration: 2000
				})
			}
		 }).catch(res => {
			 console.log(res)
		 　　// 失败进行的操作
		 })
		},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>
<!-- $yy-order-font-size-sm:26upx;
$yy-order-font-size-base:30upx;
$yy-order-font-size-lg:34upx;
/* 背景颜色 */
$yy-order-bg-color:#ffffff;
$yy-order-bg-color-grey:#f8f8f8;
$yy-order-bg-color-blue:#1371F7;

/* 文字颜色 */
$yy-order-txt-base:#17212E;
$yy-order-txt-blue:#1371F7;
$yy-order-txt-grey:#70767F;
$yy-order-txt-orange:#F57C40;
$yy-order-txt-white:#FFFFFF;

// 浅灰色分割底线
$yy-order-border-bottom: 1upx solid  #EFEFEF; -->
<style>
	/* 引入苹方字体 */
	@import url("./common/uni.css");
	/* 引入uni */
	@import './common/uni.css';
	@import './common/font.css';
	/* 引入uni默认样式修改 */
	@import './common/resetuni.css';
	/* 引入common */
	@import './common/common.css';
	/* pingFangSC-Medium */
        
@font-face {
	font-family: pingFangSC-regular;
	font-size: 15upx;
	src: url('/static/uni.ttf');
}	

/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: pingFangSC-regular;
	font-size: 15upx;
	src: url('/static/uni.ttf');
}
/* #endif */

</style>
