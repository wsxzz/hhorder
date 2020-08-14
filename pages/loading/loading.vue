<template>
	<view>
		<view class="">
			正在加载。。。。
		</view>
	</view>
</template>

<script>
	import filter from '../../common/filter.js'//基本信息
	export default {
		data() {
			return {
				datatest1:'测试111',
				appId:'cyx'
			}
		},
		created(){
			filter.tabbarRequired("false");
		  let self = this
		  let isapp = false//当前是否是app环境
		  // console.log(window);
		  if(isapp){
				uni.setStorageSync('roleType', null);
				const u = navigator.userAgent;//获取机型
			    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			    self.datatest = isiOS
			    // 1、刷新页面进入判断是否cookie存在并且缓存也存在
			    // 2、判断cookie值和缓存的值相等并且缓存不为空
			      if(uni.getStorageSync('roleType')!==null){
			  		self.redirectToWhere(uni.getStorageSync('roleType'));//跳转到订单首页
			        return
			      } else {
			  		uni.setStorageSync('roleType', null);
			  		uni.setStorageSync('jwt', null);
			  		uni.setStorageSync('adviser', null);
			  		uni.setStorageSync('companyId', null);
			      }
			  //根据机型进入不同方法
			  	  if (isiOS) {
			  		window.getLonginMessage = (data) => {
			  		  self.datatest1 = data
			  		  data = JSON.parse(data)
			  		uni.setStorageSync('roleType', data.roleType);
			  		uni.setStorageSync('appId', data.appId);
			  		uni.setStorageSync('jwt', data.jwt);
					uni.setStorageSync('adviser', data.userId);//顾问id
					uni.setStorageSync('companyId', data.companyId);//顾问id
					
					uni.hideLoading()
					self.redirectToWhere(data.roleType);//跳转到订单首页
			  	    }
			  	  } else {
					  // alert("anzhuo");
			  		let data = window.Android.getLonginMessage()
			  		self.datatest1 = data
			  		data = JSON.parse(data)
			  	   uni.setStorageSync('roleType', data.roleType);
			  	   uni.setStorageSync('appId', data.appId);
			  	   uni.setStorageSync('jwt', data.jwt);
			  	   uni.setStorageSync('adviser', data.userId);//顾问id
				   uni.setStorageSync('companyId', data.companyId);//顾问id
				   // uni.hideLoading()
				   self.redirectToWhere(data.roleType);//跳转到订单首页
			  	  }
		  }else{
			  //测试数据
				  // let roleType = "10061013,10061019"
				  // let jwt = ``
				  // uni.setStorageSync('roleType', roleType);
				  // uni.setStorageSync('appId', self.appId);
				  // uni.setStorageSync('jwt',jwt);
				  // uni.setStorageSync('adviser','nzIAAAAAhdaA733t');//顾问id
				  // uni.setStorageSync('companyId','nzIAAAAACMDM567U');//顾问id
				  this.$store.state.orgID = uni.getStorageSync('companyId');
				  this.$store.state.adviser = uni.getStorageSync('companyId');
				  self.redirectToWhere(roleType);//跳转到订单首页
		  }
		},
		methods: {
			redirectToWhere(roleType){
				// var str = "10061003,10061012,10061015"
				// var str = "10061013"
			
				if(roleType.indexOf("10061003") != -1 || roleType.indexOf("10061012") != -1 || roleType.indexOf("10061015") != -1){
					console.log("跳转顾问的订单")
					uni.redirectTo({
						url: '../consultantsLists/consultantsLists'
					});
				}else if(roleType.indexOf("10061013") != -1 || roleType.indexOf("10061019") != -1 ){
					console.log("跳转经理的订单")
					uni.redirectTo({
						url: '../managerlist/managerlist'
					});
				}else{
					uni.showToast({
					    title: '网络加载慢，请返回其他模块',
					    duration: 2000
					});
				}
				
			},
		}
			
	}
</script>

<style lang="scss">
	.apitestlist{
		view{
			text-align: center;
		}
	}
</style>
