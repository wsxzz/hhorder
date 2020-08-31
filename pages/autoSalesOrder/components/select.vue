<template>
	<view>
		<view class="selectM">
				<view class="selectMin row">
					<view class="selectML" :class="{'Required':Required}">
						<text v-if="Required" class="Required-star">*</text>
						{{title}}
					</view>
					<view class="selectMR right turntootherpage">
						<image class="icon-next" :src="imgPro" mode="widthFix"></image>
					
						<view v-if="type=='select'">
							<!-- {{CODES}}
							{{value}} -->
							<view v-for="(item,y) in CODES" :key="item.ID" v-if="item.ID==value">
								<picker :data-current="module" :id="fieldName" @change="PickChange" :value="y" :range-key="'NAME'"
								 :range="CODES">
									<view class="uni-input">{{CODES[y].NAME}}</view>
								</picker>
							</view>
						</view>
						<view v-if="type=='select2'">
							<view v-for="(item,y) in CODES" :key="item.FNumber" v-if="item.FID==FIDvalue">
								<picker :data-current="module" :id="fieldName" @change="PickChange" :value="y" :range-key="'FName'"
								 :range="CODES">
									<view class="uni-input">{{CODES[y].FName}}</view>
								</picker>
							</view>
						</view>
						<view v-if="type=='date'">
							<picker mode="date" :value="value" :start="start" :end="endDate" @change="bindDateChange">
								<view class="">{{Datevalue}}</view>
							</picker>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			Required: {//
				type: Boolean,
				default:false
			},
			title: {//
				type: String,
				default:""
			},
			CODES: {//
				type: Array,
				default:()=>[]
			},
			fieldName:{
				type: String,
				default:""
			},
			Datevalue:{
				type: String,
				default:""
			},
			module:{
				type: String,
				default:""
			},
			value:{
				type: Number,
				default:0
			},
			FIDvalue:{
				type: String,
				default:""
			},
			type:{
				type: String,
				default:"select"
			},
			start:{
				type: String,
				default:"select"
			},
			endDate:{
				type: String,
				default:"select"
			},
		},  
		data() {
			return {
				imgPro:'../../static/images/icons/icon-public-next.png',
			}
		},
		methods: {
			PickChange(e){
				let fieldName = e.target.id
				let cur = e.target.dataset.current
				let newIndex = e.target.value;
				this.$emit('PickMFun',fieldName,newIndex,cur)
			},
			bindDateChange: function(e) {
				this.$emit('bindDateChange',"give_date",e.target.value,"give")
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>