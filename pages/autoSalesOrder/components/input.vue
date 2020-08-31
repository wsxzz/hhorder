<template>
	<view>
		<view class="inputM">
			<view class="inputMin row">
				<view class="inputML" :class="{'Required':Required}">
					<text v-if="Required" class="Required-star">*</text>
					{{title}}
				</view>
				<view class="inputMR right" :class="{'unit':unit}">
					<text v-if="unit" class="icon-unit">{{unitIcon}}</text>
					<input v-if="!ISnumber" class="uni-input" type="text" v-model="value1" placeholder-style="color:#C3C3C3" placeholder="请填写" @blur="getval"/>
					<input v-if="ISnumber" class="uni-input" type="number" v-model="value2" placeholder-style="color:#C3C3C3" placeholder="请填写" @blur="getval"/>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		props: {
			title: {//
				type: String,
				default:""
			},
			value: {//
				type: String,
				default:""
			},
			valueNum: {//
				type: Number,
				default:0
			},
			Required: {//
				type: Boolean,
				default:false
			},
			unit: {//
				type: Boolean,
				default:false
			},
			unitIcon: {//
				type: String,
				default:""
			},
			ISnumber: {//
				type: Boolean,
				default:true
			},
			fieldName:{
				type: String,
				default:""
			},
			module:{
				type: String,
				default:""
			},
		},  
		data() {
			return {
				value1:this.value,
				value2:this.valueNum,
			}
		},
		computed:{
		},
		methods: {
			getval(event){
				let newDate = event.detail.value
				if(this.ISnumber){
					newDate = Number(newDate)
				}
				this.$emit('getval',this.fieldName,newDate,this.module)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>