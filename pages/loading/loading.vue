<template>
 <view class="">
 	
 </view>
  
</template>

<script>
	import filter from '../../common/filter.js'//基本信息
	export default {
		data() {
			return {
				// datatest:'测试',
				datatest1:'测试111',
				// bgImg:'bg',
				// count:0,
				// step:true,
				appId:'cyx',
			}
		},
		created(){
			uni.showLoading({
			    title: '页面努力加载中'
			})
		filter.tabbarRequired("true");
		  let self = this
		  let isapp = false//当前是否是app环境
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
					self.$store.state.orgID = uni.getStorageSync('companyId');
					self.$store.state.adviser = uni.getStorageSync('adviser');
					uni.hideLoading()
					self.redirectToWhere(data.roleType);//跳转到订单首页
			  	    }
			  	  } else {
			  		let data = window.Android.getLonginMessage()
			  		self.dtatest1 = data
			  		data = JSON.parse(data)
			  	   uni.setStorageSync('roleType', data.roleType);
			  	   uni.setStorageSync('appId', data.appId);
			  	   uni.setStorageSync('jwt', data.jwt);
			  	   uni.setStorageSync('adviser', data.userId);//顾问id
				   uni.setStorageSync('companyId', data.companyId);//顾问id
				   self.$store.state.orgID = uni.getStorageSync('companyId');
				   self.$store.state.adviser = uni.getStorageSync('adviser');
				   // alert("登陆获取的roleType是"+);
				   alert("登陆获取的companyId是"+data.companyId+"登陆获取的roleType是"+data.roleType);
				   // uni.hideLoading()
				   self.redirectToWhere(data.roleType);//跳转到订单首页
			  	  }
		  }else{
			  // debugger
			  //测试数据
				  // let roleType = "10061013,10061019"
				  let roleType = "10061003"
				  let jwt = ``
				  uni.setStorageSync('roleType', roleType);
				  uni.setStorageSync('appId', self.appId);
				  uni.setStorageSync('jwt',jwt);
				  uni.setStorageSync('adviser','nzIAAAAAhdaA733t');//顾问id
				  uni.setStorageSync('companyId','nzIAAAAACMDM567U');//组织FId
				  self.$store.state.orgID = uni.getStorageSync('companyId');
				  self.$store.state.adviser = uni.getStorageSync('adviser');
				  alert("登陆获取的companyId是"+self.$store.state.orgID+"登陆获取的roleType是"+self.$store.state.adviser);
				  self.redirectToWhere(roleType);//跳转到订单首页
		  }
		},
		methods: {
			redirectToWhere(roleType){
				
				// var str = "10061003,10061012,10061015"
				// var str = "10061013"
			
				if(roleType.indexOf("10061003") != -1 || roleType.indexOf("10061012") != -1 || roleType.indexOf("10061015") != -1){
					// alert("即将跳转顾问的订单");
					console.log("跳转顾问的订单")
					uni.hideLoading()
					uni.redirectTo({
						url: '../consultantsLists/consultantsLists'
					});
				}else if(roleType.indexOf("10061013") != -1 || roleType.indexOf("10061019") != -1 ){
					// alert("即将跳转经理的订单");
					console.log("跳转经理的订单")
					uni.hideLoading()
					uni.redirectTo({
						url: '../managerlist/managerlist'
					});
				}else{
					uni.hideLoading()
					uni.showToast({
					    title: '网络加载慢，请返回其他模块',
					    duration: 2000
					});
				}
				
			},
			
			// 10061003 服务顾问
			// 10061012 网销顾问
			// 10061015 展厅顾问
			// 以上三个和涉及集销一体权限的跳转顾问的订单
			
			
			// 10061013 展厅经理
			// 10061019 网销经理
			// 以上两个和涉及集销一体权限的跳转经理的订单
			// //获取销售类型
			// async Getsell_kind(){
			// 	let param = {"codes":["sell_kind"]}
			// 	await this.$api.HHPF_P_GetBaseEnumByCodes(param).then(res => {
			// 		// 获得数据 
			// 		console.log("获取客户档案"+res) 
			// 	 }).catch(res => {
			// 		 console.log(res)
			// 	 　　// 失败进行的操作
			// 	 })
			// },
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
