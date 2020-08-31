<template>
	<view>
		<view class="radioM">
			<view class="row radioMin">
				<view class="radioML">
					{{title}}
				</view>
				<view class="radioMR right">
					<button v-for="(item,i) in CODES" :key="i" @click="radiosMFun(fieldName,item.ID,module)" :class="{'on': item.ID==value?true:false}"
					 class="yybtn mini-btn" size="mini" type="default">
						{{item.NAME}}
					</button>
					
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
			CODES: {//
				type: Array,
				default:[]
			},
			fieldName:{
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
		},  
		data() {
			return {
			}
		},
		methods: {
			radiosMFun(fieldName,ID,module){
				this.$emit('radiosMFun',fieldName,ID,module)
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>