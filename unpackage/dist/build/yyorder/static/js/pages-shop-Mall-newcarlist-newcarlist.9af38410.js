(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shop-Mall-newcarlist-newcarlist"],{"0355":function(t,n,e){"use strict";e.r(n);var i=e("34ce"),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);n["default"]=a.a},3187:function(t,n,e){"use strict";e.r(n);var i=e("5639"),a=e("0355");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("b384");var o,s=e("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"75c8ba15",null,!1,i["a"],o);n["default"]=c.exports},"34ce":function(t,n,e){"use strict";var i=e("ee27");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("96cf");var a=i(e("c964")),r=i(e("d9f2")),o=i(e("3a99")),s={components:{newcarlist:o.default},data:function(){return{screenCondition:"",maskShow:!1,screenConditionTxt:"",currentCondition:"",ISmodel:!1,list:[],brandlist:[],Serieslist:[],typeList:[],brandId:"",carSeriesId:""}},created:function(){r.default.tabbarRequired("false"),this.GetAllBrand()},methods:{GetAllBrand:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$api.HHPF_P_GetAllBrand().then((function(n){t.brandlist=n,t.list=n})).catch((function(t){console.log(t)}));case 2:case"end":return n.stop()}}),n)})))()},GetSeriesByBrand:function(t){var n=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=JSON.stringify({BrandFID:t}),e.next=3,n.$api.HHPF_P_GetSeriesByBrand(i).then((function(t){n.Serieslist=t,n.list=t})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e)})))()},GetAutoTypeListbySeriesFID:function(t){var n=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=JSON.stringify({SeriesFID:t}),e.next=3,n.$api.HHPlatForm_P_GetAutoTypeListbySeriesFID(i).then((function(t){n.list=t,n.typeList=t})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e)})))()},initpage:function(){this.screenCondition=""},close:function(){this.maskShow=!1,this.ISmodel=!1,this.list=this.brandlist,this.Serieslist=[],this.typeList=[],this.screenCondition=""},screenConditionClick:function(t){this.maskShow=!0,this.screenCondition=t},priceSort:function(t){"asce"==t?(console.log("升序"),this.screenConditionTxt="价格由低到高"):"desc"==t&&(console.log("降序"),this.screenConditionTxt="价格由高到低"),this.close()},goNextCondition:function(t){var n=this;n.list;""==n.currentCondition?(n.currentCondition="车系",n.GetSeriesByBrand(t),n.ISmodel=!1):"车系"==n.currentCondition?(n.currentCondition="车型",n.GetAutoTypeListbySeriesFID(t),n.ISmodel=!0):"车型"==n.currentCondition&&(n.currentCondition="",n.close(),uni.navigateTo({url:"../detailed/detailed?goodsID="+t}))},goback:function(){var t=this;"车系"==t.currentCondition?(t.currentCondition="",t.list=t.brandlist,t.ISmodel=!1):"车型"==t.currentCondition&&(t.currentCondition="车系",t.list=t.Serieslist,t.ISmodel=!1)},search:function(t){uni.showToast({title:"搜索："+t.value,icon:"none"})}}};n.default=s},"3a99":function(t,n,e){"use strict";e.r(n);var i=e("8238"),a=e("b895");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);var o,s=e("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"2cc3b106",null,!1,i["a"],o);n["default"]=c.exports},"3da0":function(t,n,e){"use strict";var i=e("9432"),a=e.n(i);a.a},"431c":function(t,n,e){"use strict";var i=e("ee27");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("96cf");var a=i(e("c964")),r={props:{},data:function(){return{datalist:[]}},created:function(){this.getBrandInfoByOrgID(this.$store.state.orgID)},methods:{getBrandInfoByOrgID:function(t){var n=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=JSON.stringify({OrgID:t}),e.next=3,n.$api.HHPlatForm_P_GetBrandInfoByOrgID(i).then((function(t){n.getSeriesByBrand(t[0].FID)})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e)})))()},getSeriesByBrand:function(t){var n=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=JSON.stringify({BrandFID:t}),e.next=3,n.$api.HHPF_P_GetSeriesByBrand(i).then((function(t){n.datalist=t})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e)})))()},selModelList:function(t){uni.navigateTo({url:"../modelist/modelist?id="+t+"&Vehicle=true"})}}};n.default=r},4407:function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-searchbar[data-v-a3289658]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;position:relative;padding:%?16?%;background-color:#fff}.uni-searchbar__box[data-v-a3289658]{display:-webkit-box;display:-webkit-flex;display:flex;box-sizing:border-box;overflow:hidden;position:relative;-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:36px;padding:5px 8px 5px 0;border-width:.5px;border-style:solid;border-color:#c8c7cc}.uni-searchbar__box-icon-search[data-v-a3289658]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;width:32px;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:grey}.uni-searchbar__box-search-input[data-v-a3289658]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?28?%;color:#333}.uni-searchbar__box-icon-clear[data-v-a3289658]{-webkit-box-align:center;-webkit-align-items:center;align-items:center;line-height:24px;padding-left:5px}.uni-searchbar__text-placeholder[data-v-a3289658]{font-size:%?28?%;color:grey;margin-left:5px}.uni-searchbar__cancel[data-v-a3289658]{padding-left:10px;line-height:36px;font-size:14px;color:#333}',""]),t.exports=n},"4b30":function(t,n,e){"use strict";var i=e("ee27");e("a9e3"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("8f95")),r={name:"UniSearchBar",components:{uniIcons:a.default},props:{placeholder:{type:String,default:"请输入搜索内容"},radius:{type:[Number,String],default:5},clearButton:{type:String,default:"auto"},cancelButton:{type:String,default:"auto"},cancelText:{type:String,default:"取消"},bgColor:{type:String,default:"#F8F8F8"},maxlength:{type:[Number,String],default:100}},data:function(){return{show:!1,showSync:!1,searchVal:""}},watch:{searchVal:function(){this.$emit("input",{value:this.searchVal})}},methods:{searchClick:function(){var t=this;this.show||(this.searchVal="",this.show=!0,this.$nextTick((function(){t.showSync=!0})))},clear:function(){this.searchVal=""},cancel:function(){this.$emit("cancel",{value:this.searchVal}),this.searchVal="",this.show=!1,this.showSync=!1,uni.hideKeyboard()},confirm:function(){uni.hideKeyboard(),this.$emit("confirm",{value:this.searchVal})}}};n.default=r},5639:function(t,n,e){"use strict";var i={uniSearchBar:e("8ad3").default},a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",[e("v-uni-view",{staticClass:"shop-Mall",class:{bodyw100:t.maskShow}},[e("v-uni-view",{staticClass:"classification"},[e("uni-search-bar",{attrs:{radius:"100",placeholder:"请输入",clearButton:"auto",cancelButton:"auto"},on:{confirm:function(n){arguments[0]=n=t.$handleEvent(n),t.search.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"sortFilter"},[e("v-uni-view",{staticClass:"screen-bd "},[e("v-uni-view",{staticClass:"screen-bd-in pad"},[e("v-uni-view",{staticClass:"row "},[e("v-uni-view",{staticClass:"col-2"},[e("v-uni-text",{staticClass:"screen marR40",class:{on:"brand"===t.screenCondition},on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.screenConditionClick("brand")}}},[t._v("品牌"),e("v-uni-text",{staticClass:"iconfont"},[t._v(t._s("brand"===t.screenCondition?"":""))])],1),e("v-uni-text",{staticClass:"screen",class:{on:"price"===t.screenCondition},on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.screenConditionClick("price")}}},[t._v("价格"),e("v-uni-text",{staticClass:"iconfont"},[t._v(t._s("price"===t.screenCondition?"":""))])],1)],1)],1),e("v-uni-scroll-view",{staticClass:"listsscroll",attrs:{"scroll-y":"true"}},[e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:"brand"===t.screenCondition,expression:"screenCondition==='brand'"}],staticClass:"lists"},[e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:""!=t.currentCondition,expression:"currentCondition!=''"}],staticClass:"list-cell"},[e("v-uni-text",{staticClass:"iconfont"},[t._v("")]),e("v-uni-text",{staticClass:"currentConditionT",on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.goback.apply(void 0,arguments)}}},[t._v(t._s(t.currentCondition))])],1),t._l(t.list,(function(n,i){return e("v-uni-view",{key:i,staticClass:"list-cell row"},[t.ISmodel?t._e():e("v-uni-view",{staticClass:"txt",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.goNextCondition(n.FID)}}},[t._v(t._s(n.NAME))]),t.ISmodel?e("v-uni-view",{staticClass:"txt",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.goNextCondition(n.goodsID)}}},[t._v(t._s(n.OFFICIA_LNAME))]):t._e(),e("v-uni-view",{staticClass:"iconbtn right"},[e("v-uni-text",{staticClass:"iconfont"},[t._v("")])],1)],1)}))],2)],1),e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:"price"===t.screenCondition,expression:"screenCondition==='price'"}],staticClass:"lists"},[e("v-uni-view",{staticClass:"list-cell center",on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.priceSort("asce")}}},[t._v("价格由低到高")]),e("v-uni-view",{staticClass:"list-cell center",on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.priceSort("desc")}}},[t._v("价格由高到低")])],1)],1),e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.maskShow,expression:"maskShow"}],staticClass:"mask",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.close.apply(void 0,arguments)}}})],1),e("v-uni-view",{staticClass:"screen-condition"},[t._v(t._s(t.screenConditionTxt))])],1),e("newcarlist")],1)],1)],1)},r=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return i}))},"674f":function(t,n,e){t.exports=e.p+"static/img/car.63c6f473.png"},7046:function(t,n,e){var i=e("9b9d");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("eb9dfa90",i,!0,{sourceMap:!1,shadowMode:!1})},8238:function(t,n,e){"use strict";var i,a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",{},[i("v-uni-view",{staticClass:"newcarlist_s",staticStyle:{display:"block"}},[t.datalist.length>0?i("v-uni-view",{staticClass:"uni-gri-s"},t._l(t.datalist,(function(n,a){return i("v-uni-view",{key:a,staticClass:"uni-grid-item-s",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.selModelList(n.FID)}}},[i("v-uni-image",{staticClass:"proImage",attrs:{src:e("674f"),mode:"widthFix"}}),i("v-uni-view",{staticClass:"carinfo"},[i("v-uni-view",{staticClass:"proname"},[t._v(t._s(n.NAME))]),i("v-uni-view",{staticClass:"proprice"},[i("v-uni-text",{staticClass:"icon-money"},[t._v("￥")]),t._v("0"),i("v-uni-text",{staticClass:"icon-wanyuan"},[t._v("万")])],1),i("v-uni-view",{staticClass:"pronum"},[t._v("0人付款")])],1)],1)})),1):i("v-uni-view",[t._v("暂无数据")])],1)],1)},r=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return i}))},"8ad3":function(t,n,e){"use strict";e.r(n);var i=e("e7b0"),a=e("e590");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("3da0");var o,s=e("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"a3289658",null,!1,i["a"],o);n["default"]=c.exports},9432:function(t,n,e){var i=e("4407");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("414e0e54",i,!0,{sourceMap:!1,shadowMode:!1})},"9b9d":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-75c8ba15]{background-color:#f9f9f9}.bodyw100[data-v-75c8ba15]{width:100%;height:%?1200?%;overflow:hidden}.listsscroll[data-v-75c8ba15]{max-height:%?600?%}body.?%PAGE?%[data-v-75c8ba15]{background-color:#f9f9f9}',""]),t.exports=n},b384:function(t,n,e){"use strict";var i=e("7046"),a=e.n(i);a.a},b895:function(t,n,e){"use strict";e.r(n);var i=e("431c"),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);n["default"]=a.a},e590:function(t,n,e){"use strict";e.r(n);var i=e("4b30"),a=e.n(i);for(var r in i)"default"!==r&&function(t){e.d(n,t,(function(){return i[t]}))}(r);n["default"]=a.a},e7b0:function(t,n,e){"use strict";var i={uniIcons:e("8f95").default},a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"uni-searchbar"},[e("v-uni-view",{staticClass:"uni-searchbar__box",style:{borderRadius:t.radius+"px",backgroundColor:t.bgColor},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.searchClick.apply(void 0,arguments)}}},[e("uni-icons",{staticClass:"uni-searchbar__box-icon-search",attrs:{color:"#999999",size:"18",type:"search"}}),t.show?e("v-uni-input",{staticClass:"uni-searchbar__box-search-input",attrs:{focus:t.showSync,placeholder:t.placeholder,maxlength:t.maxlength,"confirm-type":"search",type:"text"},on:{confirm:function(n){arguments[0]=n=t.$handleEvent(n),t.confirm.apply(void 0,arguments)}},model:{value:t.searchVal,callback:function(n){t.searchVal=n},expression:"searchVal"}}):e("v-uni-text",{staticClass:"uni-searchbar__text-placeholder"},[t._v(t._s(t.placeholder))]),t.show&&("always"===t.clearButton||"auto"===t.clearButton&&""!==t.searchVal)?e("v-uni-view",{staticClass:"uni-searchbar__box-icon-clear",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.clear.apply(void 0,arguments)}}},[e("uni-icons",{attrs:{color:"#999999",size:"24",type:"clear"}})],1):t._e()],1),"always"===t.cancelButton||t.show&&"auto"===t.cancelButton?e("v-uni-text",{staticClass:"uni-searchbar__cancel",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.cancel.apply(void 0,arguments)}}},[t._v(t._s(t.cancelText))]):t._e()],1)},r=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return i}))}}]);