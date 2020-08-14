<template>
	<view>
		<view @click="go()">
			选择完毕商品啦
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			go(){
				this.$store.dispatch('getcar',{'name':'zz'})
				// uni.navigateTo({
				//     url: 'test?id=1&name=uniapp'
				// });
			}
		}
	}
</script>

<style>

</style>
