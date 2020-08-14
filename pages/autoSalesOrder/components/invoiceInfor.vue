<template>
	<view>
		<!-- 发票信息 -->
		<view class="invoice-infor marB20">
			<view class="blueline-title row">
				<view class="col-2 blueline-infor">
					发票信息
					<text class="blueline"></text>
				</view>
			</view>
			<view class="commom-content">
				<view class="content">
					<view class="list">
						<view class="cell row">
							<view class="notesL">
								发票总额
							</view>
							<view class="notesR right">
								<input  type="number" v-model="invoiceInforData.invoice_sum"/>
								<!-- ¥{{}} -->
							</view>
						</view>
					<view class="cell row">
						<view class="notesL">
							机动车发票
						</view>
						<view class="notesR right">
							<button @click="HasVehicleInvoice(1)" :class="{'on': invoiceInforData.invoice===1}"   class="yybtn mini-btn" size="mini" type="default">是</button>
							<button @click="HasVehicleInvoice(0)" :class="{'on': invoiceInforData.invoice===0}"   class="yybtn mini-btn" size="mini" type="default">否</button>
						</view>
					</view>
					<view class="cell row">
							<view class="notesL">
								普通发票
							</view>
							<view class="notesR right">
								<button @click="HasGeneralInvoice(1)" :class="{'on': invoiceInforData.invoice_public===1}"  class="yybtn mini-btn" size="mini" type="default">是</button>
								<button @click="HasGeneralInvoice(0)" :class="{'on': invoiceInforData.invoice_public===0}"  class="yybtn mini-btn" size="mini" type="default">否</button>
							</view>
					</view>
					
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	/*
	*
	 * invoiceInfor 发票信息
	 * @description 发票信息组件
	 * @example <invoiceInfor @invoiceInforValChange="getinvoiceInforData"  ref="invoiceInforItem"></invoiceInfor>
	 */
	export default {
		name: 'invoiceInfor',
		data() {
			return {
				invoiceInforData:{},
			}
		},
		watch: {
		      invoiceInforData: {
		       handler(newValue, oldValue) {
				  this.$emit('invoiceInforValChange',this.invoiceInforData)
		        },
		        deep: true
		      }
		},
		created() {
			this.invoiceInforData = this.$store.state.invoiceInfo.obj
			console.log(this.invoiceInforData)
		},
		methods: {
			//机动车发票
			HasVehicleInvoice(e){
				this.invoiceInforData.invoice = e;
			},
			//普通发票
			HasGeneralInvoice(e){
				this.invoiceInforData.invoice_public = e;
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F5;
	}
</style>

