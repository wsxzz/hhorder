<template>
	<view class="pages continer">
		<!-- 保险机构 -->
		<view class="uni-list uni-list-reset">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
					<view class="jgradio"><!--  -->
						<radio :value="item.FID+'-'+item.FName+'-'+item.FNumber" :checked="index === current" />
					</view>
					<view class="">{{item.FName}}</view>
				</label>
			</radio-group>
		</view>
		
		<!-- 底部按钮 -->
		<view class="footer">
			<view class="halfline"></view>
			<view class="uni-flex uni-row pad">
				<view class="fontsize12 notes h39" style="-webkit-flex: 1;flex: 1;">
					商品数量: {{items.length}}
				</view>
				<view class="text fillet39 right" style="-webkit-flex: 1;flex: 1;">
					<button @click="reset" class="mini-btn w82 h39 marR8" type="default" size="mini">重置</button>
					<button @click="handClickgetInsurance" class="mini-btn w82 h39 " type="primary" size="mini">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InsuranceINFO:"",
				items: [],
				current: 0
			}
		},
		created() {
			this.getInsuranceCompany();//获取保险机构列表
		},
		methods: {
			//获取保险机构列表
			async getInsuranceCompany(){
				await this.$api.HHPlatForm_P_GetInsuranceCompany().then(res => {
					// 获得数据 
					// console.log("获取保险机构列表"+res) 
					this.items = res
				 }).catch(res => {
					 console.log(res)
				 　　// 失败进行的操作
				 })
			},
			// 切换保险公司
			radioChange(evt) {
				console.log(evt.detail.value)
				this.InsuranceINFO = evt.detail.value;
			},
			// 重置
			reset(){
				console.log("重置")
			},
			// 确定
			handClickgetInsurance(){
				console.log(this.InsuranceINFO)
				this.$store.state.insuranceInfo.insselectOK = true
				this.$store.state.insuranceInfo.obj.org_id = this.InsuranceINFO.split('-')[0]
				this.$store.state.insuranceInfo.obj.org_src = this.InsuranceINFO.split('-')[2]
				this.$store.state.insuranceInfo.obj.name = this.InsuranceINFO.split('-')[1]
				// 返回新增订单
				uni.navigateTo({
				    url: '../autoSalesOrder/autoSalesOrder'
				});
				
			}
		}
	}
</script>

<style lang="scss">
.jgradio uni-radio{
	position: absolute;
	top: 11px;
	left: 15px;
}
</style>
