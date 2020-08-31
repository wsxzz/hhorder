import Vue from 'vue'
import App from './App'

import request from './common/request.js'
import api from './api/index.js'
import url from './common/config.js'
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$url = url
Vue.config.productionTip = false

//引入公共组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)	

import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
Vue.component("uniNavBar", uniNavBar);
import hxNavbar from "@/components/hx-navbar/hx-navbar.vue"
Vue.component("hxNavbar", hxNavbar);

import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
Vue.component("uniPopup", uniPopup);
Vue.component("uniPopupMessage", uniPopup);
Vue.component("uniPopupDialog", uniPopup);
        
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
Vue.component("uniLoadMore", uniLoadMore);

import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
Vue.component("uniNumberBox", uniNumberBox);


App.mpType = 'app'

const app = new Vue({
	...App,
	//挂载
	 store
})
app.$mount()
