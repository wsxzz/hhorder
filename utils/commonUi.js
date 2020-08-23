import Vue from 'vue'
let v = new Vue();


const commonUi = {
	/* 通用toast  信息 */
	toast(msg) {
		v.$eventHub.$emit('showToast', msg)
	},

	/* 显示loading */
	showLoading(title = '正在加载中') {

		v.$eventHub.$emit('showLoading', title)

	},
	/* 隐藏loading */
	hideLoading() {

		v.$eventHub.$emit('hideLoading', '隐藏loading')
	},

	navigateTo(url, success, fail, complete) {
		uni.navigateTo({
			url: url,
			success: res => {
				if (success) {
					success(res)
				}
			},
			fail: (error) => {
				if (fail) {
					fail(error)
				}
			},
			complete: () => {
				if (complete) {
					complete()
				}
			}
		});
	},

	/* 监听是否有网络 */
	isNetConnected() {
		uni.onNetworkStatusChange((res) => {
			console.log(res.isConnected);
			console.log(res.networkType);
		});
	},



}

export default commonUi;
