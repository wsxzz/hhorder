(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-search-search"],{"08c6":function(t,e,n){"use strict";var a={hxNavbar:n("3efb").default,uniSearchBar:n("8ad3").default,noData:n("0e86").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"n_customer"},["1"==t.role?n("v-uni-view",[n("hx-navbar",{staticClass:"hx-navbarr",staticStyle:{"padding-top":"var(--status-bar-height)"},attrs:{back:!0,fixed:!0}},[n("v-uni-view",{staticClass:"ctn5",staticStyle:{width:"100%"}},[n("uni-search-bar",{attrs:{radius:"100",placeholder:"姓名/手机号",clearButton:"auto",cancelButton:"auto"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.search1.apply(void 0,arguments)}},model:{value:t.keyword1,callback:function(e){t.keyword1=e},expression:"keyword1"}})],1)],1),n("v-uni-view",{},[t.customerlist.length>0?n("v-uni-view",{staticClass:"n_customerlist"},[t._l(t.customerlist,(function(e,a){return n("v-uni-view",{key:a},[n("v-uni-view",{staticClass:"n_customercell row",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.handClick(e.ID)}}},[n("v-uni-view",{staticClass:"detials"},[n("v-uni-view",{staticClass:"name"},[n("v-uni-text",{domProps:{innerHTML:t._s(e.BD_NAME)}}),t._v("/"),n("v-uni-text",{staticClass:"sex",domProps:{innerHTML:t._s(e.BD_SEX)}})],1),n("v-uni-view",{staticClass:"phone",domProps:{innerHTML:t._s(e.COM_PHONE)}})],1),n("v-uni-view",{staticClass:"data",domProps:{innerHTML:t._s(t.formateDate(e.ADD_DATE))}})],1)],1)})),t.loadall?n("v-uni-view",{staticClass:"Finished-loading"},[t._v("已全部加载完毕")]):t._e()],2):t._e()],1)],1):t._e(),"2"==t.role?n("v-uni-view",[n("hx-navbar",{staticClass:"hx-navbarr",staticStyle:{"padding-top":"var(--status-bar-height)"},attrs:{back:!0,fixed:!0}},[n("v-uni-view",{staticClass:"ctn5",staticStyle:{width:"100%"}},[n("uni-search-bar",{attrs:{radius:"100",placeholder:"公司名称",clearButton:"auto",cancelButton:"auto"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.search2.apply(void 0,arguments)}},model:{value:t.keyword2,callback:function(e){t.keyword2=e},expression:"keyword2"}})],1)],1),t.UnitCustomerlist.length>0?n("v-uni-view",{staticClass:"n_customerlist"},[t._l(t.UnitCustomerlist,(function(e,a){return n("v-uni-view",{key:a},[n("v-uni-view",{staticClass:"n_customercell row",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.handClick(e.ID)}}},[n("v-uni-view",{staticClass:"detials"},[n("v-uni-view",{staticClass:"name"},[n("v-uni-text",{domProps:{innerHTML:t._s(e.UNIT_NAME)}})],1),n("v-uni-view",{staticClass:"phone",domProps:{innerHTML:t._s(e.TEl)}})],1),n("v-uni-view",{staticClass:"data",domProps:{innerHTML:t._s(t.formateDate(e.FCreateTime))}})],1)],1)})),t.loadall?n("v-uni-view",{staticClass:"Finished-loading"},[t._v("已全部加载完毕")]):t._e()],2):t._e()],1):t._e(),n("no-data",{attrs:{nodata:t.nodata}})],1)},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))},"0e86":function(t,e,n){"use strict";n.r(e);var a=n("c763"),i=n("b0a4");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("bac7");var o,s=n("f0c5"),c=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"1bb326b8",null,!1,a["a"],o);e["default"]=c.exports},"15f2":function(t,e,n){t.exports=n.p+"static/img/bg_No_record.4fbf9fb8.png"},"3da0":function(t,e,n){"use strict";var a=n("9432"),i=n.n(a);i.a},4407:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-searchbar[data-v-a3289658]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;position:relative;padding:%?16?%;background-color:#fff}.uni-searchbar__box[data-v-a3289658]{display:-webkit-box;display:-webkit-flex;display:flex;box-sizing:border-box;overflow:hidden;position:relative;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:36px;padding:5px 8px 5px 0;border-width:.5px;border-style:solid;border-color:#c8c7cc}.uni-searchbar__box-icon-search[data-v-a3289658]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;width:32px;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:grey}.uni-searchbar__box-search-input[data-v-a3289658]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?28?%;color:#333}.uni-searchbar__box-icon-clear[data-v-a3289658]{-webkit-box-align:center;-webkit-align-items:center;align-items:center;line-height:24px;padding-left:5px}.uni-searchbar__text-placeholder[data-v-a3289658]{font-size:%?28?%;color:grey;margin-left:5px}.uni-searchbar__cancel[data-v-a3289658]{padding-left:10px;line-height:36px;font-size:14px;color:#333}',""]),t.exports=e},"4b30":function(t,e,n){"use strict";var a=n("ee27");n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("8f95")),r={name:"UniSearchBar",components:{uniIcons:i.default},props:{placeholder:{type:String,default:"请输入搜索内容"},radius:{type:[Number,String],default:5},clearButton:{type:String,default:"auto"},cancelButton:{type:String,default:"auto"},cancelText:{type:String,default:"取消"},bgColor:{type:String,default:"#F8F8F8"},maxlength:{type:[Number,String],default:100}},data:function(){return{show:!1,showSync:!1,searchVal:""}},watch:{searchVal:function(){this.$emit("input",{value:this.searchVal})}},methods:{searchClick:function(){var t=this;this.show||(this.searchVal="",this.show=!0,this.$nextTick((function(){t.showSync=!0})))},clear:function(){this.searchVal=""},cancel:function(){this.$emit("cancel",{value:this.searchVal}),this.searchVal="",this.show=!1,this.showSync=!1,uni.hideKeyboard()},confirm:function(){uni.hideKeyboard(),this.$emit("confirm",{value:this.searchVal})}}};e.default=r},"5d40":function(t,e,n){"use strict";n.r(e);var a=n("08c6"),i=n("b701");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);var o,s=n("f0c5"),c=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"3f24eabc",null,!1,a["a"],o);e["default"]=c.exports},"770c":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.no-data[data-v-1bb326b8]{padding-top:%?314?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;text-align:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.no-data .no-data-img[data-v-1bb326b8]{display:block;width:%?400?%}.no-data .no-data-text[data-v-1bb326b8]{margin-top:%?12?%;color:#70767f}',""]),t.exports=e},"8a68":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"no-data",props:{nodata:{type:Boolean,default:!0}},data:function(){return{}},methods:{}};e.default=a},"8ad3":function(t,e,n){"use strict";n.r(e);var a=n("e7b0"),i=n("e590");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("3da0");var o,s=n("f0c5"),c=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"a3289658",null,!1,a["a"],o);e["default"]=c.exports},9432:function(t,e,n){var a=n("4407");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("414e0e54",a,!0,{sourceMap:!1,shadowMode:!1})},"982e":function(t,e,n){"use strict";var a=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var i=a(n("c964")),r=a(n("d9f2")),o={data:function(){return{nodata:!1,loadall:!1,role:"1",keyword1:"",keyword2:"",customerlist:[],UnitCustomerlist:[]}},computed:{formateDate:function(){return function(t){return r.default.formateDate2(t)}}},onLoad:function(t){console.log(t.role),this.role=t.role},created:function(){switch(r.default.tabbarRequired("false"),uni.showLoading({title:"加载中"}),this.role){case"1":this.getCustomer("");break;case"2":this.GetUnitCustomer("");break;default:uni.showToast({title:"出错误啦，返回上一个页面",duration:2e3});break}},methods:{search1:function(){this.getCustomer("")},search2:function(){this.GetUnitCustomer("")},getCustomer:function(t){var e=this;return(0,i.default)(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e,a={name:t,pageIndex:1,pageSize:50},n.next=4,e.$api.HHPF_P_GetCustomer(a).then((function(t){e.customerlist=t.Data.list,uni.hideLoading(),t.Data.list.length>0?e.nodata=!1:e.nodata=!0})).catch((function(t){console.log(t)}));case 4:case"end":return n.stop()}}),n)})))()},GetUnitCustomer:function(t){var e=this;return(0,i.default)(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a={name:t,pageIndex:1,pageSize:50},n.next=3,e.$api.HHPF_P_GetUnitCustomer(a).then((function(t){console.log("获取客户档案公司"+t),e.UnitCustomerlist=t.Data.list,uni.hideLoading(),t.Data.list.length>0?e.nodata=!1:e.nodata=!0})).catch((function(t){console.log(t)}));case 3:case"end":return n.stop()}}),n)})))()},handClick:function(t){var e=this;return(0,i.default)(regeneratorRuntime.mark((function n(){var a,i,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e,uni.showLoading({title:"稍等一下，马上好了"}),i=JSON.stringify({ID:t,CusType:a.role}),r=a.role,n.next=6,a.$api.HHPlatForm_P_GetCustomerInfoByID(i).then((function(e){console.log(e,"resresres"),a.$store.state.order.obj.entry1.customer_id=t,a.$store.state.order.obj.entry1.REGISTER_SITE="1"==r?0:1,"1"==r?(a.$store.state.order.obj.entry1.BD_NAME=e[0].BD_NAME,a.$store.state.order.obj.entry1.COM_PHONE=e[0].COM_PHONE,a.$store.state.order.obj.entry1.CER_ID_NO=e[0].CER_ID_NO,a.$store.state.order.obj.entry1.REGISTER_SITE=e[0].CUSTOMER_TYPE):(a.$store.state.order.obj.entry1.UNIT_NAME=e[0].UNIT_NAME,a.$store.state.order.obj.entry1.REGIST_NO=e[0].REGIST_NO,a.$store.state.order.obj.entry1.REGISTER_SITE=e[0].REGISTER_SITE,a.$store.state.order.obj.entry1.REGISTER_SITE=e[0].REGIST_NO),uni.hideLoading(),uni.navigateTo({url:"../test/test"})})).catch((function(t){console.log(t)}));case 6:case"end":return n.stop()}}),n)})))()},Check:function(){this.$refs.popup.open()},closepopup:function(){this.$refs.popup.close()}}};e.default=o},b0a4:function(t,e,n){"use strict";n.r(e);var a=n("8a68"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},b701:function(t,e,n){"use strict";n.r(e);var a=n("982e"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},bac7:function(t,e,n){"use strict";var a=n("c8ed"),i=n.n(a);i.a},c763:function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.nodata?a("v-uni-view",{staticClass:"no-data"},[a("v-uni-image",{staticClass:"no-data-img",attrs:{src:n("15f2"),mode:"widthFix"}}),a("v-uni-view",{staticClass:"no-data-text"},[t._v("暂无记录")])],1):t._e()},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))},c8ed:function(t,e,n){var a=n("770c");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("4df8b1ea",a,!0,{sourceMap:!1,shadowMode:!1})},e590:function(t,e,n){"use strict";n.r(e);var a=n("4b30"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},e7b0:function(t,e,n){"use strict";var a={uniIcons:n("8f95").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-searchbar"},[n("v-uni-view",{staticClass:"uni-searchbar__box",style:{borderRadius:t.radius+"px",backgroundColor:t.bgColor},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.searchClick.apply(void 0,arguments)}}},[n("uni-icons",{staticClass:"uni-searchbar__box-icon-search",attrs:{color:"#999999",size:"18",type:"search"}}),t.show?n("v-uni-input",{staticClass:"uni-searchbar__box-search-input",attrs:{focus:t.showSync,placeholder:t.placeholder,maxlength:t.maxlength,"confirm-type":"search",type:"text"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)}},model:{value:t.searchVal,callback:function(e){t.searchVal=e},expression:"searchVal"}}):n("v-uni-text",{staticClass:"uni-searchbar__text-placeholder"},[t._v(t._s(t.placeholder))]),t.show&&("always"===t.clearButton||"auto"===t.clearButton&&""!==t.searchVal)?n("v-uni-view",{staticClass:"uni-searchbar__box-icon-clear",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clear.apply(void 0,arguments)}}},[n("uni-icons",{attrs:{color:"#999999",size:"24",type:"clear"}})],1):t._e()],1),"always"===t.cancelButton||t.show&&"auto"===t.cancelButton?n("v-uni-text",{staticClass:"uni-searchbar__cancel",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.cancel.apply(void 0,arguments)}}},[t._v(t._s(t.cancelText))]):t._e()],1)},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}))}}]);