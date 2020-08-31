<template>
	<view>
		<view class="textareaM">
			<view class="textareaMin row">
				<view class="textareaML" :class="{'Required':Required}">
					<text v-if="Required" class="Required-star">*</text>
					{{title}}
				</view>
				<view class="textareaMR right">
					<textarea v-model="value1" auto-height="96upx" @blur="getval" placeholder="请输入" />
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
			Required: {//
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
			}
		},
		methods: {
			getval(event){
				let newDate = event.detail.value
				this.$emit('getval',this.fieldName,newDate,this.module)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>