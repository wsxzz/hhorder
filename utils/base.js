import JSEncrypt from 'jsencrypt';
import {
	getDic,
	getRegion
} from '@/utils/auth.js'

import * as dd from 'dingtalk-jsapi';

import Vue from 'vue'
let v = new Vue();

/* 基本工具类 */
const vs = {
	/* 工具类 */
	/* 是否微信客户端 */
	isWeixin() {
		// #ifdef MP-WEIXIN
		return true
		// #endif
		return false;
	},


	/* 是否是APP */
	isApp() {
		// #ifdef APP-PLUS
		return true
		// #endif
		return false
	},

	/* 是否是钉钉 */
	isDingTalk() {
		if (v.$base.isApp()) {
			return false
		}
		// 先判断是否是在钉钉中运行此应用
		if (dd.env.platform != 'notInDingTalk') {
			return true
		}
		return false
	},

	getQueryString(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	},


	/* 是否是Android 客户端 */
	isAnaroid() {
		return uni.getSystemInfoSync().platform === 'android'
	},

	isIos() {
		return uni.getSystemInfoSync().platform == 'ios'
	},

	/* 是否是网页H5 */
	isH5() {
		// #ifdef H5
		return true;
		// #endif
		return false;
	},

	randomFor4(max) {

		if (this.isEmpty(max)) {
			max = 4
		}
		var num = "";
		for (var i = 0; i < max; i++) {
			num += Math.floor(Math.random() * 10)
		}
		return num;
	},

	random() {
		return Math.ceil(Math.random() * 1000000);
	},
	/* 路由跳转 */
	navigateTo(url, fn) {
		uni.navigateTo({
			url: url,
			success: res => {
				if (fn) {
					fn
				}
			},
			fail: () => {},
			complete: () => {}
		});
	},
	//校验手机号码：必须以数字开头，除数字外，可含有“-”
	isMobile(str) {
		var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
		if (!myreg.test(str)) {
			return false;
		} else {
			return true;
		}
	},
	/* 隐藏中间四位电话号 */
	hidMiddlePhone(str) {
		var reg = /^(\d{3})\d*(\d{4})$/;
		return str.replace(reg, '$1****$2');
	},

	/**
	 * @param {Object} dataList 数组
	 * @param {Object} fieldName 查找的属性名
	 * @param {Object} keyWords 模糊匹配的关键字
	 */
	findObjByWords(dataList, fieldName, keyWords) {
		let object = dataList.find(x => x[fieldName] == keyWords)
		if (!v.$base.isEmpty(object)) {
			return object
		} else {
			return {}
		}
	},


	/* 身份证号合法性验证 */
	//支持15位和18位身份证号
	//支持地址编码、出生日期、校验位验证
	IdentityCodeValid(code) {
		var city = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外"
		};
		var tip = "";
		var pass = true;

		if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
			tip = "身份证号格式错误";
			pass = false;
		} else if (!city[code.substr(0, 2)]) {
			tip = "地址编码错误";
			pass = false;
		} else {
			//18位身份证需要验证最后一位校验位
			if (code.length == 18) {
				code = code.split('');
				//∑(ai×Wi)(mod 11)
				//加权因子
				var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
				//校验位
				var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for (var i = 0; i < 17; i++) {
					ai = code[i];
					wi = factor[i];
					sum += ai * wi;
				}
				var last = parity[sum % 11];
				if (parity[sum % 11] != code[17]) {
					tip = "校验位错误";
					pass = false;
				}
			}
		}
		//if(!pass) alert(tip);
		return pass;
	},

	getDataDic() {
		return JSON.parse(getDic())
	},

	//银行卡号码检测
	luhnCheck(bankno) {
		var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
		var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
		var newArr = new Array();
		for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
			newArr.push(first15Num.substr(i, 1));
		}
		var arrJiShu = new Array(); //奇数位*2的积 <9
		var arrJiShu2 = new Array(); //奇数位*2的积 >9
		var arrOuShu = new Array(); //偶数位数组
		for (var j = 0; j < newArr.length; j++) {
			if ((j + 1) % 2 == 1) { //奇数位
				if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
				else arrJiShu2.push(parseInt(newArr[j]) * 2);
			} else //偶数位
				arrOuShu.push(newArr[j]);
		}

		var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
		var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
		for (var h = 0; h < arrJiShu2.length; h++) {
			jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
			jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
		}

		var sumJiShu = 0; //奇数位*2 < 9 的数组之和
		var sumOuShu = 0; //偶数位数组之和
		var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
		var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
		var sumTotal = 0;
		for (var m = 0; m < arrJiShu.length; m++) {
			sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
		}

		for (var n = 0; n < arrOuShu.length; n++) {
			sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
		}

		for (var p = 0; p < jishu_child1.length; p++) {
			sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
			sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
		}
		//计算总和
		sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

		//计算luhn值
		var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
		var luhn = 10 - k;

		if (lastNum == luhn) {

			return true;
		} else {

			return false;
		}
	},

	/* 将1234567890转换成一二三四五六七八九零 */
	shuziChange(n) {
		// 提供中文数字
		var cnum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

		var s = '';
		n = '' + n; // 数字转为字符串
		for (var i = 0; i < n.length; i++) {
			s += cnum[parseInt(n.charAt(i))];
		}
		return s;

	},

	/**
	 * 判断字符串是否是金钱
	 */
	validMoney(money) {
		var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		if (reg.test(money)) {
			return true;
		} else {
			return false;
		};
		//000 错
		//0 对
		//0. 错
		//0.0 对
		//050 错
		//00050.12错
		//70.1 对
		//70.11 对
		//70.111错
		//500 正确
	},
	/* 判断是否为空 */
	isEmpty(msg) {
		if (msg == undefined || msg == 'undefined' || null == msg || 'null' == msg || '' == msg) {
			return true;
		} else {
			return false
		}
	},

	/*  */
	cloneObj(obj) {
		var copy = (obj instanceof Array) ? [] : {};
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) {
				copy[attr] = typeof(obj[attr]) === 'object' ? this.cloneObj(obj[attr]) : obj[attr];
			}
		}
		return copy;
	},

	/**
	 *  判断传入参数的类型，以字符串的形式返回
	 *  @obj：数据
	 **/
	dataType(obj) {
		if (obj === null) return "Null";
		if (obj === undefined) return "Undefined";
		return Object.prototype.toString.call(obj).slice(8, -1);
	},


	/* 将对象中null 数据替换成‘’ */
	dealObjectValue(obj) {
		var param = {};
		if (obj === null || obj === undefined || obj === "") return param;
		for (var key in obj) {
			if (this.dataType(obj[key]) === "Object") {
				param[key] = dealObjectValue(obj[key]);
			} else if (obj[key] == null || obj[key] == undefined || obj[key] === "null") {
				param[key] = ''
			} else {
				param[key] = obj[key];
			}
		}
		return param;
	},


	//str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
	insert_flg(str) {
		var newstr = "";
		for (var i = 0; i < str.length; i++) {
			var char = str[i];
			if (i == 1) {
				char = char + ':';
			}
			newstr += char
		}
		return newstr;
	},
	/* 根据时间错 获取 YYYY-MM-DD HH:mm:ss */
	formatDateTime(inputTime) {
		var date = null;
		if (inputTime == '') {

			date = new Date();
		} else {
			date = new Date(inputTime);
		}
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
	},

	/* 根据时间错获取 十 分 */
	formatTime(inputTime) {
		var date = null;
		if (inputTime == '') {

			date = new Date();
		} else {
			date = new Date(inputTime);
		}
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return h + ':' + minute;
	},

	/*根据时间错获取日期*/
	formatDate(inputTime) {
		var date = null;
		if (inputTime == '') {

			date = new Date();
		} else {
			date = new Date(inputTime);
		}
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d;
	},

	getTimestamp() {
		var timestamp = (new Date()).getTime();
		return timestamp
	},

	deepCopy(o) {
		if (o instanceof Array) {
			var n = [];
			for (var i = 0; i < o.length; ++i) {
				n[i] = deepCopy(o[i]);
			}
			return n;

		} else if (o instanceof Object) {
			var n = {}
			for (var i in o) {
				n[i] = deepCopy(o[i]);
			}
			return n;
		} else {
			return o;
		}
	},

	/* 根据key  设置某个值¬ */
	setStorageByKey(key, value) {
		uni.setStorageSync(key, value)
	},

	/* 根据key  存储值 */
	getStorageByKey(key) {
		return uni.getStorageSync(key)
	},

	/* 移除某个key */
	removeStorageByKey(key) {
		uni.removeStorageSync(key);
	},
	/* 清除所有缓存 */
	clearStorageAll() {
		uni.clearStorageSync()
	},

	format(Date) {
		var Y = Date.getFullYear();
		var M = Date.getMonth() + 1;
		M = M < 10 ? '0' + M : M; // 不够两位补充0
		var D = Date.getDate();
		D = D < 10 ? '0' + D : D;
		var H = Date.getHours();
		H = H < 10 ? '0' + H : H;
		var Mi = Date.getMinutes();
		Mi = Mi < 10 ? '0' + Mi : Mi;
		var S = Date.getSeconds();
		S = S < 10 ? '0' + S : S;
		return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;
	},
	getRsaCode(str) {
		let pubKey =
			`MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+qyoKFVePsvGQ9/RJJC9FT9FYF6kxuJ1l53P8GHMzTU9Jbbk2k///Hf5cpX8iP6laV24OT1KGLab/kUuUlT+1BSR4OsAUshASqYQbvzqSHn8DWJ9owovh3461Rksc1uS2xGABKzjcDi3nwHLkJ50bSLWpRxAKA+6TXo7mH0E4bQIDAQAB`; // ES6 模板字符串 引用 rsa 公钥
		let encryptStr = new JSEncrypt();
		encryptStr.setPublicKey(pubKey); // 设置 加密公钥
		let data = encryptStr.encrypt(str.toString()); // 进行加密
		return data;
	},
	createDictList(code, type) {

		let resp = v.$base.getStorageByKey(String(code))
		if (!v.$base.isEmpty(resp)) {
			return JSON.parse(resp)
		}

		if (v.$base.isEmpty(getDic())) return []
		let dict = JSON.parse(getDic())
		let obj = dict[code];
		let res = [];
		if (type) {
			if (obj instanceof Object) {
				res = obj.map(x => ({
					text: x.codeCnDesc,
					value: x.codeEnDesc
				}));

				v.$base.setStorageByKey(String(code), JSON.stringify(res))
			}
		} else {
			if (obj instanceof Object) {

				res = obj.map(x => ({
					text: x.codeCnDesc,
					value: x.codeId
				}));
				v.$base.setStorageByKey(String(code), JSON.stringify(res))
			}
		}
		return res;
	},


	/* 分享功能 */
	shareApp(params) {
		let scene = params.scene
		let linkUrl = params.linkUrl
		let title = params.title
		let imageUrl = params.imageUrl
		let openPopup = params.openPopup

		if (v.$base.isApp()) {
			uni.share({
				provider: "weixin",
				scene: scene,
				href: linkUrl,
				title: title,
				summary: "",
				imageUrl: imageUrl,
				success: (res) => {
					openPopup = false
				},
				fail: (err) => {
					openPopup = false
				}
			});
		} else if (v.$base.isDingTalk()) {

			v.$dd.biz.util.share({
				type: 0, //分享类型，0:全部组件 默认；1:只能分享到钉钉；2:不能分享，只有刷新按钮
				url: linkUrl,
				title: title,
				content: '',
				image: imageUrl,
				onSuccess: () => {
					//onSuccess将在调起分享组件成功之后回调
					/**/
				},
				onFail: (err) => {}
			})
		} else {
			v.$commonUi.toast('当前环境不支持分享')
		}
	},

	/* 创建城市字典 */
	createRegion() {
		let dict = getRegion()
		let provinces = [];
		dict.forEach((item, index) => {
			let city = []
			item.city.forEach((obj, pos) => {
				let area = []
				obj.dist.forEach((areaObj, i) => {
					let params = {
						'label': areaObj.distName,
						'value': areaObj.distId,
					}
					area.push(params)
				})
				let params = {
					'label': obj.cityName,
					'value': obj.cityId,
					'children': area
				}
				city.push(params)
			})
			let params = {
				'label': item.provinceName,
				'value': item.provinceId,
				'children': city
			}
			provinces.push(params)
		})

		return provinces;
	},

	createDictText(val, code, type) {
		let resp = v.$base.getStorageByKey(String(val))
		if (!v.$base.isEmpty(resp)) {
			return resp
		}

		if (v.$base.isEmpty(getDic())) return ''

		let dict = JSON.parse(getDic())

		let obj = dict[code];
		let res = '';
		if (!val) return res;
		if (type) {
			if (obj instanceof Object) {
				let target = obj.find(x => x.codeEnDesc == val);
				res = target ? target.codeCnDesc || '' : val;
				v.$base.setStorageByKey(String(val), res)
			}
		} else {
			if (obj instanceof Object) {
				let target = obj.find(x => x.codeId == val);
				res = target ? target.codeCnDesc || '' : val;
				v.$base.setStorageByKey(String(val), res)
			}
		}
		return res;
	},

}

export default vs;
