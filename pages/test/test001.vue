<template>
	<test :values="values" @check="check"/>
</template>

<script>
	import test from './components/test.vue' //列表
	export default {
		components: {
			test
		},
		data() {
			return {
				values:"150323123"
			}
		},
		methods:{
			check(val){
				// debugger
				this.values = val
				console.log(val)
			}
		}
	}
</script>

<style>
</style>
