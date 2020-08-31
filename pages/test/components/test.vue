<template>
	<view class="" style="padding-top: 100upx;">
		{{values}}--{{"---"}}
		<input v-model="value3" @blur="check"/>
	</view>
	
	
</template>

<script>
		export default {
			props: {
				values: {//
					type: String,
					default:"321341"
				},
			},
			data() {
				return {
					value3: ''
				}
			},
			watch:{
				 values(val, oldVal) {
				    this.value3 = val;
				 }
			},
			created() {
				this.value3 = this.values
			},
			methods:{
				check(event){
					// if(this.value3 == '15'){
					if(event.detail.value == '15'){
						console.log("格式不对")
						this.$emit('check','')
					}
				},
			}
		}
</script>

<style>
</style>
