<template>
	<view>
		<!-- 筛选框 -->
		<view class="screen-bd">
			<view class="screen-bd-in ">
				<view class="row pad borderB">
				<view class="col-2">
					<view class="screen marR40" :class="{'on': screendates.subStatus==='no'}" @click="submissionStatus('no')">
						<button class="mini-btn" size="mini">未提交</button>
					</view>
					<view class="screen" :class="{'on': screendates.subStatus==='yes'}" @click="submissionStatus('yes')">
						<button class="mini-btn" size="mini">已提交</button>
					</view>
				</view>
				<view class="col-2 right">
					<text @click="openscreen">筛选</text>
					<text class="iconfont" @click="openscreen">&#xe67f;</text>
				</view>
				</view>
				<view v-show="filterCriteria">
					<view class="dialogcontent">
						<view class="tlt">
							筛选时段
						</view>
						<view class="cont controw">
							<view class="right filterperiod">
								<biaofun-datetime-picker
									placeholder="开始日期"
									defaultValue=""
									start="2000-02-03"
									end="2100-10-28"
									fields="day"
									@change="changeStarttimePicker"
								></biaofun-datetime-picker>
								<image class="iconcalendar" src="../../../static/images/icons/icon_calendar.png" mode="widthFix"></image>
							</view>
							<view class="separator">
								-
							</view>
							<view class="right filterperiod">
								<biaofun-datetime-picker
									placeholder="结束日期"
									defaultValue=""
									start="2000-02-03"
									end="2100-10-28"
									fields="day"
									@change="changeEndtimePicker"
								></biaofun-datetime-picker>
								<image class="iconcalendar" src="../../../static/images/icons/icon_calendar.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="tlt">
							订单类型
						</view>
						<view class="cont"><!--  -->
							<view class="btns btnsSm" :class="{'btnsActive': screendates.orderTypes==='retail'}" @click="orderType('retail')">
								零售
							</view>
							<view class="btns btnsMm" :class="{'btnsActive': screendates.orderTypes==='usedcarAssessment'}" @click="orderType('usedcarAssessment')">
								二手车评估申请单
							</view>
							<view class="btns btnsSm" :class="{'btnsActive': screendates.orderTypes==='collection'}" @click="orderType('collection')">
								收款申请单
							</view>
							<view class="btns btnsMm" :class="{'btnsActive': screendates.orderTypes==='retausedcarWarehousingil'}" @click="orderType('retausedcarWarehousingil')">
								二手车入库单
							</view>
						</view>
					</view>
					<view class="btns row">
						<view class="resetBtn col-2" @click="reset">
							重置
						</view>
						<view class="comfirmBtn col-2" @click="comfirm">
							确定
						</view>
					</view>
				</view>
				
			</view>
			<view class="mask" v-show="filterCriteria"></view>
		</view>
			
	</view>
</template>

<script>
	/*
	*
	 * screen 经理列表筛选框
	 * @description 经理列表筛选框
	 * @example<screen @comfirm="comfirm" @changeState="changeState" ></screen>
	 */
	import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';//时间组件
	export default {
		name: 'screen',
		components:{
			biaofunDatetimePicker,
		},
		data() {
				return {
					filterCriteria:false,
					screendates:{
						subStatus:'',//已提与未提按钮
						orderTypes:'retail',//订单类型
						starttime:'',
						endtime:'',
					},
				}
		},
		methods: {
			// 打开筛选框
			openscreen(){
				this.filterCriteria = true;
			},
			// 关闭筛选框
			closescreen(){
				this.filterCriteria = false;
				this.reset();//关掉后重置（恢复默认值）
			},
			/**
			 * 确认选择日期时间
			 * @param {Object} date 日期数据
			 */
			// 开始时间
			changeStarttimePicker(date) {
				console.log('开始时间：', date.f1);
				this.screendates.starttime = date.f1;
			},
			// 结束时间
			changeEndtimePicker(date) {
				console.log('结束时间：',date.f1);
				this.screendates.endtime = date.f1;
			},
			reset(){
				this.screendates.orderTypes = "retail";
				this.screendates.starttime = "";
				this.screendates.endtime = "";
			},
			//已经提交与未提交的按钮的状态
			submissionStatus(state){
				this.screendates.subStatus = state;
				this.$emit('changeState',this.screendates.subStatus)
				this.closescreen();
			},
			//订单类型
			orderType(e){
				// console.log("订单类型"+e);
				this.screendates.orderTypes = e;
			},
			comfirm(){
				this.$emit('comfirm',this.screendates)
				this.closescreen();
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F5;
	}
</style>

	