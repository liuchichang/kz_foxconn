(function(t){function e(e){for(var a,r,s=e[0],i=e[1],u=e[2],l=0,p=[];l<s.length;l++)r=s[l],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&p.push(o[r][0]),o[r]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a]);d&&d(e);while(p.length)p.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],a=!0,r=1;r<n.length;r++){var s=n[r];0!==o[s]&&(a=!1)}a&&(c.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},r={app:0},o={app:0},c=[];function s(t){return i.p+"js/"+({}[t]||t)+"."+{"chunk-2d0f104b":"7ee3d0e0","chunk-65a05d3c":"03d4035f","chunk-160154d4":"8176e6d6","chunk-3ef2a23e":"0dfaf35a","chunk-26a98b5b":"d1079620","chunk-5a87e90c":"7559a0d6","chunk-cad97d20":"a9a3d3a7","chunk-2fa56174":"cb375870","chunk-3a1fbfa9":"f86c40b9","chunk-7dd384e7":"242428b6","chunk-54130282":"488d2eb5","chunk-016a0736":"e67e8463","chunk-a4902754":"54c24494","chunk-b8939c24":"3472f0e6","chunk-d1e4e570":"de0530e3","chunk-acd97948":"256f44e9"}[t]+".js"}function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n={"chunk-65a05d3c":1,"chunk-160154d4":1,"chunk-3ef2a23e":1,"chunk-26a98b5b":1,"chunk-5a87e90c":1,"chunk-cad97d20":1,"chunk-2fa56174":1,"chunk-3a1fbfa9":1,"chunk-7dd384e7":1,"chunk-54130282":1,"chunk-016a0736":1,"chunk-a4902754":1,"chunk-b8939c24":1,"chunk-d1e4e570":1,"chunk-acd97948":1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=new Promise((function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-2d0f104b":"31d6cfe0","chunk-65a05d3c":"e65bfa0c","chunk-160154d4":"3d21e468","chunk-3ef2a23e":"ae670125","chunk-26a98b5b":"01ddb15d","chunk-5a87e90c":"4a1f0b7a","chunk-cad97d20":"d37a3c29","chunk-2fa56174":"a36cb206","chunk-3a1fbfa9":"a370c308","chunk-7dd384e7":"748c3323","chunk-54130282":"3b25da7b","chunk-016a0736":"4778067e","chunk-a4902754":"73c3862b","chunk-b8939c24":"b6508e99","chunk-d1e4e570":"7d8bdc4b","chunk-acd97948":"905b7a65"}[t]+".css",o=i.p+a,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var u=c[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===o))return e()}var p=document.getElementsByTagName("style");for(s=0;s<p.length;s++){u=p[s],l=u.getAttribute("data-href");if(l===a||l===o)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var a=e&&e.target&&e.target.src||o,c=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=a,delete r[t],d.parentNode.removeChild(d),n(c)},d.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(d)})).then((function(){r[t]=0})));var a=o[t];if(0!==a)if(a)e.push(a[2]);else{var c=new Promise((function(e,n){a=o[t]=[e,n]}));e.push(a[2]=c);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=s(t);var p=new Error;u=function(e){l.onerror=l.onload=null,clearTimeout(d);var n=o[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;p.message="Loading chunk "+t+" failed.\n("+a+": "+r+")",p.name="ChunkLoadError",p.type=a,p.request=r,n[1](p)}o[t]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/kz_foxconn/",i.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var p=0;p<u.length;p++)e(u[p]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"076b":function(t,e,n){"use strict";n("d10c")},"143b":function(t,e,n){"use strict";n("e617")},"475c":function(t,e,n){t.exports=n.p+"img/foxconn_logo.1927dbbc.svg"},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("router-view",{ref:"view"}),n("v-snackbar",{attrs:{color:t.snackDanger?"#FF3B3B":"#4CAF50"},scopedSlots:t._u([{key:"action",fn:function(e){var a=e.attrs;return[n("v-btn",t._b({attrs:{color:"white",text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",a,!1),[t._v(" Close ")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackText)+" ")])],1)},o=[],c=(n("d3b7"),{name:"MainLayout",components:{},data:function(){return{afterUpdated:!0,snackDanger:!0,snackbar:!1,snackText:""}},computed:{UserInfo:{get:function(){return JSON.parse(localStorage.getItem("UserInfo"))}}},watch:{},mounted:function(){var t=this;this.$root.$on("message",(function(e){t.snackDanger=!0,t.message(e)})),this.$root.$on("info",(function(e){t.snackDanger=!1,t.message(e)})),this.UserInfo?(this.StartPageLoading(),this.$store.state.logining=!0,this.$api.Users.GetMyInfo(this.UserInfo.Passcode).then((function(){var e={id:t.UserInfo.id,password:t.UserInfo.password};t.Signin(e)})).catch((function(){t.clearUser(),t.StopPageLoading()}))):this.clearUser()},methods:{message:function(t){this.snackbar=!0,this.snackText=t},clearUser:function(){localStorage.removeItem("UserInfo"),this.$store.state.UserInfo=null,this.$refs.view&&this.$refs.view.$forceUpdate(),this.$store.state.logining=!1},Signin:function(t){var e=this;this.StartPageLoading(),this.$api.Users.Signin(t).then((function(n){var a=n.data;a.id=t.id,a.password=t.password,localStorage.setItem("UserInfo",JSON.stringify(a)),e.$store.dispatch("pushUserInfo",a)})).finally((function(){e.StopPageLoading(),e.$store.state.logining=!1}))}}}),s=c,i=(n("034f"),n("2877")),u=n("6544"),l=n.n(u),p=n("8336"),d=n("2db4"),f=Object(i["a"])(s,r,o,!1,null,null,null),m=f.exports;l()(f,{VBtn:p["a"],VSnackbar:d["a"]});n("3ca3"),n("ddb0"),n("caad"),n("2532");var h=n("8c4f"),g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{id:"inspire"}},[n("main",[n("AppBar",{attrs:{UserInfo:t.UserInfo}}),n("v-main",[n("v-container",{attrs:{fluid:""}},[n("router-view")],1)],1),n("SideMenu",{attrs:{UserInfo:t.UserInfo}})],1)])},v=[],S=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-navigation-drawer",{staticClass:"menu",class:{"full-height":t.isFullHeight},attrs:{app:"",floating:"",height:"100%"},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",{staticClass:"py-3",attrs:{nav:"",rounded:""}},[t._l(t.items,(function(e,a){return[e.subItems?n("v-list-group",{key:a,staticClass:"group",attrs:{"prepend-icon":e.icon,value:!0,group:e.path},scopedSlots:t._u([{key:"activator",fn:function(){return[n("v-list-item-content",[n("v-list-item-title",{staticClass:"list-item"},[t._v(t._s(e.title))])],1)]},proxy:!0}],null,!0)},t._l(e.subItems,(function(e,a){return n("v-list-item",{key:a,staticClass:"subMenu",attrs:{dense:"",link:"",to:e.path},on:{click:function(n){return t.pathTo(e.path)}}},[n("v-list-item-icon",[n("v-icon",[t._v(t._s(e.icon))])],1),n("v-list-item-content",[n("v-list-item-title",{staticClass:"list-item",domProps:{textContent:t._s(e.title)}})],1)],1)})),1):n("v-list-item",{key:a,attrs:{link:"",to:e.path},on:{click:function(n){return t.pathTo(e.path)}}},[n("v-list-item-icon",{},[n("v-icon",{},[t._v(t._s(e.icon))])],1),n("v-list-item-content",[n("v-list-item-title",{staticClass:"list-item",domProps:{textContent:t._s(e.title)}})],1)],1)]}))],2)],1)},b=[],k=(n("159b"),n("7db0"),n("b0c0"),n("95bf")),y={name:"side-menu",data:function(){return{drawer:!1,item:0,color:"primary",background:!1,permanent:!1,temporary:!0,selectedItem:null}},props:{UserInfo:{type:Object}},computed:{isFullHeight:function(){return this.$vuetify.breakpoint.mdAndDown?"isFullHeight":""},items:{get:function(){var t=this.UserInfo?this.UserInfo.Identity:"Visitor",e=[];return k.forEach((function(n){n.auth.find((function(e){return e===t}))&&e.push(n)})),e},set:function(){}}},mounted:function(){var t=this;this.$root.$on("openDrawer",(function(e){return t.drawer=e})),this.$vuetify.breakpoint.width>=1200?this.drawer=!0:this.drawer=!1,window.addEventListener("resize",(function(){t.$vuetify.breakpoint.name}))},methods:{pathTo:function(t){this.$router.push({path:t}).catch((function(t){if("NavigationDuplicated"!=t.name)throw t}))}}},U=y,I=(n("c4cc"),n("132d")),w=n("8860"),T=n("56b0"),O=n("da13"),B=n("5d23"),A=n("34c3"),_=n("f774"),C=Object(i["a"])(U,S,b,!1,null,"10133af9",null),V=C.exports;l()(C,{VIcon:I["a"],VList:w["a"],VListGroup:T["a"],VListItem:O["a"],VListItemContent:B["a"],VListItemIcon:A["a"],VListItemTitle:B["c"],VNavigationDrawer:_["a"]});var L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app-bar",{staticClass:"user-app-bar",attrs:{color:"#011F4E",height:"64",absolute:"",flat:""}},[t.loading?a("v-progress-linear",{attrs:{absolute:"",top:"",color:"primary",indeterminate:""}}):t._e(),t.$vuetify.breakpoint.mdAndDown?a("v-app-bar-nav-icon",{on:{click:function(e){return e.stopPropagation(),t.openDrawer.apply(null,arguments)}}}):t._e(),a("v-toolbar-title",[a("img",{staticClass:"logo header",attrs:{src:n("475c")}})]),a("p",{directives:[{name:"show",rawName:"v-show",value:!t.$vuetify.breakpoint.mobile,expression:"!$vuetify.breakpoint.mobile"}],staticClass:"first-item-text my-0"},[t._v(t._s(t.company_name))]),a("v-spacer"),t.user?a("v-menu",{attrs:{"close-on-content-click":!1,"nudge-width":250,bottom:"","offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,r=e.attrs;return[a("v-btn",t._g(t._b({attrs:{large:"",depressed:"",color:"#ffffff"}},"v-btn",r,!1),n),[t._v(" "+t._s(t.user.Name)+" "),a("v-icon",[t._v("mdi-account-circle")])],1)]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[a("v-card",{staticClass:"pa-5"},[a("v-card-title",[a("v-row",[a("v-chip",{attrs:{dark:"",color:t.userColor(),dense:""}},[t._v(t._s(t.userAuthText()))]),a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:t.logout}},[t._v("登出")])],1)],1),a("v-list",[a("v-list-item",{staticClass:"px-0"},[a("v-list-item-avatar",[a("v-icon",{attrs:{"x-large":""}},[t._v("mdi-account-circle")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(t.user.Name))]),a("v-list-item-subtitle",{},[t._v(t._s(t.user.Email))])],1)],1)],1)],1)],1):a("v-btn",{attrs:{"x-large":"",text:"",color:"#ffffff",loading:!t.user&&t.logining},on:{click:t.login}},[t._v(" 登入 "),a("v-icon",[t._v("mdi-account-circle-outline ")])],1)],1)},x=[],D={name:"AppBar",data:function(){return{menu:!1}},props:{UserInfo:{type:Object}},computed:{company_name:{get:function(){return Object({NODE_ENV:"production",BASE_URL:"/kz_foxconn/"}).VUE_APP_COMPANY_NAME}},user:{get:function(){return this.UserInfo},set:function(){}},loading:{get:function(){return this.$store.state.loading},set:function(){}},logining:{get:function(){return this.$store.state.logining},set:function(){}}},mounted:function(){},watch:{user:{immediate:!0,deep:!0,handler:function(t){}}},methods:{openDrawer:function(){this.$root.$emit("openDrawer",!0)},login:function(){this.$router.push({path:"/login"})},showAccountInfo:function(){},userColor:function(){switch(this.user.Identity){case"Developer":return"primary";case"Installer":return"primary";case"Manager":return"primary";case"Operator":return"primary";default:return"#383838"}},userAuthText:function(){switch(this.user.Identity){case"Developer":return"開發人員";case"Installer":return"安裝人員";case"Manager":return"管理人員";case"Operator":return"操作人員";default:return"無登入人員"}},logout:function(){var t=this;this.StartPageLoading(),this.$api.Users.Signout(this.user.Passcode).then((function(){t.user=null,t.ForceInitial(),t.Info("登出成功！")}))}}},P=D,$=(n("143b"),n("40dc")),G=n("5bc1"),E=n("b0af"),M=n("99d9"),N=n("cc20"),R=n("8270"),j=n("e449"),q=n("8e36"),F=n("0fd9"),H=n("2fa4"),z=n("2a7f"),J=Object(i["a"])(P,L,x,!1,null,"77b2a8a7",null),Q=J.exports;l()(J,{VAppBar:$["a"],VAppBarNavIcon:G["a"],VBtn:p["a"],VCard:E["a"],VCardTitle:M["d"],VChip:N["a"],VIcon:I["a"],VList:w["a"],VListItem:O["a"],VListItemAvatar:R["a"],VListItemContent:B["a"],VListItemSubtitle:B["b"],VListItemTitle:B["c"],VMenu:j["a"],VProgressLinear:q["a"],VRow:F["a"],VSpacer:H["a"],VToolbarTitle:z["a"]});var W={name:"mainLayout",components:{SideMenu:V,AppBar:Q},data:function(){return{}},computed:{UserInfo:{get:function(){return this.$store.state.UserInfo}}},watch:{},mounted:function(){},methods:{}},K=W,Y=(n("076b"),n("7496")),X=n("a523"),Z=n("f6c4"),tt=Object(i["a"])(K,g,v,!1,null,null,null),et=tt.exports;l()(tt,{VApp:Y["a"],VContainer:X["a"],VMain:Z["a"]});var nt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("router-view")],1)},at=[],rt={name:"setup"},ot=rt,ct=Object(i["a"])(ot,nt,at,!1,null,null,null),st=ct.exports;l()(ct,{VApp:Y["a"]}),a["a"].use(h["a"]);var it=[{path:"*",component:function(){return n.e("chunk-acd97948").then(n.bind(null,"a5b5"))}},{path:"/login",component:function(){return n.e("chunk-2d0f104b").then(n.bind(null,"9f9a"))},children:[{path:"",component:function(){return Promise.all([n.e("chunk-65a05d3c"),n.e("chunk-d1e4e570")]).then(n.bind(null,"dd7b"))}}]},{path:"/",name:"Main",component:et,redirect:"/index",children:[{path:"index",name:"index",component:function(){return Promise.all([n.e("chunk-65a05d3c"),n.e("chunk-3ef2a23e"),n.e("chunk-26a98b5b"),n.e("chunk-cad97d20"),n.e("chunk-2fa56174")]).then(n.bind(null,"1e4b"))},meta:{requiresAuth:!1}},{path:"history",name:"history",meta:{requiresAuth:!1},component:function(){return Promise.all([n.e("chunk-65a05d3c"),n.e("chunk-3ef2a23e"),n.e("chunk-26a98b5b"),n.e("chunk-cad97d20"),n.e("chunk-3a1fbfa9")]).then(n.bind(null,"43c4"))}},{path:"userManagement",name:"userManagement",meta:{requiresAuth:!1},component:function(){return Promise.all([n.e("chunk-65a05d3c"),n.e("chunk-3ef2a23e"),n.e("chunk-26a98b5b"),n.e("chunk-5a87e90c")]).then(n.bind(null,"f26b"))}},{path:"alarmManagement",name:"alarmManagement",meta:{requiresAuth:!1},component:function(){return Promise.all([n.e("chunk-65a05d3c"),n.e("chunk-3ef2a23e"),n.e("chunk-26a98b5b"),n.e("chunk-cad97d20"),n.e("chunk-7dd384e7")]).then(n.bind(null,"361b"))}},{path:"setup",name:"setup",component:st,meta:{requiresAuth:!0},children:[{path:"EquipmentSetup",name:"EquipmentSetup",component:function(){return Promise.all([n.e("chunk-65a05d3c"),n.e("chunk-3ef2a23e"),n.e("chunk-54130282"),n.e("chunk-016a0736")]).then(n.bind(null,"3b2d"))}},{path:"InternetSetup",name:"InternetSetup",component:function(){return Promise.all([n.e("chunk-65a05d3c"),n.e("chunk-160154d4")]).then(n.bind(null,"f530"))}},{path:"AlarmSendSetup",name:"AlarmSendSetup",component:function(){return Promise.all([n.e("chunk-65a05d3c"),n.e("chunk-54130282"),n.e("chunk-a4902754")]).then(n.bind(null,"8df8"))}},{path:"SystemSetup",name:"SystemSetup",component:function(){return Promise.all([n.e("chunk-65a05d3c"),n.e("chunk-b8939c24")]).then(n.bind(null,"2335"))}}]}]}],ut=new h["a"]({mode:"history",base:"/",routes:it});ut.beforeEach((function(t,e,n){t.matched.some((function(t){return t.meta.requiresAuth}))&&t.fullPath.includes("/setup")&&!localStorage.getItem("UserInfo")?n({path:"/index"}):n()}));var lt=ut,pt=n("f309");a["a"].use(pt["a"]);var dt={},ft=new pt["a"](dt),mt=n("2f62");a["a"].use(mt["a"]);var ht=new mt["a"].Store({state:{UserInfo:null,loading:!1,logining:!1},mutations:{pushUserInfo:function(t,e){t.UserInfo=e}},actions:{pushUserInfo:function(t,e){t.commit("pushUserInfo",e)},RemoveUserInfo:function(){this.state.UserInfo=null}},getters:{GetUserInfo:function(t){return t.UserInfo}},modules:{}}),gt=(n("99af"),{mainBaseUrl:"http://demo002.kzsi.com.tw/api"}),vt=n("bc3a"),St=n.n(vt),bt={Signin:function(t){return St.a.post("".concat(gt.mainBaseUrl,"/Users/Signin"),t)},GetMyInfo:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/Users/GetMyInfo?passcode=").concat(t))},GetUser:function(t,e){return St.a.get("".concat(gt.mainBaseUrl,"/Users/GetMyInfo?passcode=").concat(t,"&userId=").concat(e))},GetUsers:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/Users/GetUsers?passcode=").concat(t))},UpdateInfo:function(t,e){return St.a.patch("".concat(gt.mainBaseUrl,"/Users/UpdateInfo?passcode=").concat(t),e)},AddUser:function(t,e){return St.a.post("".concat(gt.mainBaseUrl,"/Users/AddUser?passcode=").concat(t),e)},EditUser:function(t,e){return St.a.patch("".concat(gt.mainBaseUrl,"/Users/EditUser?passcode=").concat(t),e)},DeleteUser:function(t,e){var n={userId:e};return St.a.delete("".concat(gt.mainBaseUrl,"/Users/DeleteUser?passcode=").concat(t),{params:n})},ResetPassword:function(t,e){var n={userId:e};return St.a.get("".concat(gt.mainBaseUrl,"/Users/ResetPassword?passcode=").concat(t),{params:n})},Signout:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/Users/Signout?passcode=").concat(t))}},kt={GetDeviceSettings:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/DevSettings/DeviceSettings?passcode=").concat(t))},SaveDeviceSettings:function(t,e){return St.a.patch("".concat(gt.mainBaseUrl,"/DevSettings/DeviceSettings?passcode=").concat(t),e)}},yt={GetAlarmGroups:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/AlaSettings/GetAlarmGroups?passcode=").concat(t))},GetAlarmSettings:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/AlaSettings/AlarmSettings?passcode=").concat(t))},SaveText:function(t,e){return St.a.patch("".concat(gt.mainBaseUrl,"/AlaSettings/Text?passcode=").concat(e),t)},SaveEmail:function(t,e){return St.a.patch("".concat(gt.mainBaseUrl,"/AlaSettings/Email?passcode=").concat(e),t)},SaveLine:function(t,e){return St.a.patch("".concat(gt.mainBaseUrl,"/AlaSettings/Line?passcode=").concat(e),t)}},Ut={NetworkStatus:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/NetSettings/NetworkStatus?passcode=").concat(t))},NetworkSettings:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/NetSettings/NetworkSettings?passcode=").concat(t))},SetNetworkStatus:function(t,e){return St.a.patch("".concat(gt.mainBaseUrl,"/NetSettings/NetworkSettings?passcode=").concat(t),e)}},It={GetSysSettings:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/SysSettings/SystemSettings?passcode=").concat(t))},ChangeHostname:function(t,e){var n=JSON.stringify(e),a={headers:{Accept:"application/json","Content-Type":"application/json-patch+json"}};return St.a.patch("".concat(gt.mainBaseUrl,"/SysSettings/ChangeHostname?passcode=").concat(t),n,a)},SysReboot:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/SysSettings/Reboot?passcode=").concat(t))},SysReset:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/SysSettings/ResetSystem?passcode=").concat(t))},SysUpdate:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/SysSettings/UpdateSystem?passcode=").concat(t))},ExportSysSettings:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/SysSettings/ExportSettings?passcode=").concat(t))},ImportSysSettings:function(t,e){var n={headers:{"Content-Type":"multipart/form-data"}};return St.a.post("".concat(gt.mainBaseUrl,"/SysSettings/ImportSettings?passcode=").concat(t),e,n)}},wt=St.a.CancelToken,Tt=wt.source(),Ot={GetDevices:function(){return St.a.get("".concat(gt.mainBaseUrl,"/Devices/GetStatus"),{cancelToken:Tt.token})},GetDevices2:function(){return St.a.get("".concat(gt.mainBaseUrl,"/Devices/GetStatus2"),{cancelToken:Tt.token})},cancel:function(){Tt.cancel("cancelled")},start:function(){wt=St.a.CancelToken,Tt=wt.source()}},Bt={GetContents:function(){return St.a.get("".concat(gt.mainBaseUrl,"/Alarm/GetContents"))},Search:function(t,e,n){var a={startTime:t,endTime:e,contents:n};return St.a.put("".concat(gt.mainBaseUrl,"/Alarm/GetLogs"),a)},MultiDelete:function(t,e){var n={logId:e};return St.a.delete("".concat(gt.mainBaseUrl,"/Alarm/DeleteLogs?passcode=").concat(t),{params:n})},Delete:function(t,e){var n={logId:e};return St.a.delete("".concat(gt.mainBaseUrl,"/Alarm/DeleteLog?passcode=").concat(t),{params:n})}},At={GetTags:function(){return St.a.get("".concat(gt.mainBaseUrl,"/Logs/TagNames"))},Search:function(t,e,n){var a={tagIds:t,endTime:e,days:n};return St.a.put("".concat(gt.mainBaseUrl,"/Logs/TagLogs"),a)},GetQueryTitle:function(t,e){return St.a.get("".concat(gt.mainBaseUrl,"/Logs/GetQueryTitle?deviceId=").concat(t,"&valueId=").concat(e))},GetQueryOptions:function(){return St.a.get("".concat(gt.mainBaseUrl,"/Logs/GetQueryOptions"))},GetLogs:function(t,e,n,a){return St.a.get("".concat(gt.mainBaseUrl,"/Logs/GetLogs?deviceId=").concat(t,"&valueId=").concat(e,"&startTime=").concat(n,"&endTime=").concat(a))}},_t={LayoutSettings:function(t,e){return St.a.post("".concat(gt.mainBaseUrl,"/LaySettings/LayoutSettings?passcode=").concat(t),e)},GetLayoutSettings:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/LaySettings/LayoutSettings?passcode=").concat(t))}},Ct=St.a.CancelToken,Vt=Ct.source(),Lt={GetDisplay:function(){return St.a.get("".concat(gt.mainBaseUrl,"/AirCon/Display"),{cancelToken:Vt.token})},GetSettings:function(t){return St.a.get("".concat(gt.mainBaseUrl,"/AirCon/Settings?passcode=").concat(t),{cancelToken:Vt.token})},UpdateSettings:function(t,e){return St.a.patch("".concat(gt.mainBaseUrl,"/AirCon/Settings?passcode=").concat(e),t)},GetOperateNameValue:function(t,e,n){return St.a.get("".concat(gt.mainBaseUrl,"/AirCon/Operate/").concat(t,"/").concat(e,"?passcode=").concat(n))},GetOperateName:function(t,e,n){return St.a.get("".concat(gt.mainBaseUrl,"/AirCon/Operate/").concat(t,"?passcode=").concat(e),{cancelToken:Vt.token})},cancel:function(){Vt.cancel("cancelled")},start:function(){Ct=St.a.CancelToken,Vt=Ct.source()}},xt={Users:bt,DevSettings:kt,AlaSettings:yt,NetSettings:Ut,SysSettings:It,Devices:Ot,Alarm:Bt,Logs:At,LaySettings:_t,AirCon:Lt},Dt=n("a925"),Pt={methods:{StartPageLoading:function(){this.$store.state.loading=!0},StopPageLoading:function(){this.$store.state.loading=!1},Info:function(t){this.$root.$emit("info",t)},Alarm:function(t){this.$root.$emit("message",t)},Initial:function(t){"User's passcode is time out."===t.response.data||"This passcode is invalid."===t.response.data?(this.$store.state.loading=!1,this.$store.state.UserInfo=null,localStorage.removeItem("UserInfo"),this.$router.push({path:"/"}),this.$root.$emit("message","Passcode失效，請重新登入")):this.$root.$emit("message",t.response.data)},ForceInitial:function(){this.$store.state.loading=!1,this.$store.state.UserInfo=null,localStorage.removeItem("UserInfo"),this.$router.push({path:"/"}),location.reload()},Translate:function(t,e,n){var a,r;switch(t){case"DigitalOutputs":switch(e){case"DigitalOutput":a=n?"On":"Off",r=n?"red":"black"}break;case"DigitalInputs":switch(e){case"DigitalInput":a=n?"On":"Off",r=n?"green":"black"}break;case"UPSs":switch(e){case"InputStatus":a=n?"正常":"異常",r=n?"green":"red"}break}var o={text:a,color:r};return o}}};a["a"].use(Dt["a"]);var $t={"en-US":{},"zh-TW":{DigitalOutputs:{DigitalOutput:"數位輸出"},DigitalInputs:{DigitalInput:"數位輸入"},AnalogInputs:{AnalogInput:"類比輸入"},UPSs:{BypassVoltage:"旁路電壓",BypassVoltageR:"旁路電壓(R相)",BypassVoltageS:"旁路電壓(S相)",BypassVoltageT:"旁路電壓(T相)",BypassFrequency:"旁路頻率",BatteryVoltage:"電池電壓",BatteryCurrent:"電池電流",BatteryCapacity:"電池容量",InputStatus:"輸入狀態",InputFrequency:"輸入頻率",InputFrequencyR:"輸入頻率(R相)",InputFrequencyS:"輸入頻率(S相)",InputFrequencyT:"輸入頻率(T相)",InputVoltage:"輸入電壓",InputVoltageR:"輸入電壓(R相)",InputVoltageS:"輸入電壓(S相)",InputVoltageT:"輸入電壓(T相)",OutputCurrent:"輸出電流",OutputCurrentR:"輸出電流(R相)",OutputCurrentS:"輸出電流(S相)",OutputCurrentT:"輸出電流(T相)",OutputFrequency:"輸出頻率",OutputLoad:"輸出負載",OutputLoadR:"輸出負載(R相)",OutputLoadS:"輸出負載(S相)",OutputLoadT:"輸出負載(T相)",OutputPower:"輸出功率",OutputPowerR:"輸出功率(R相)",OutputPowerS:"輸出功率(S相)",OutputPowerT:"輸出功率(T相)",OutputVoltage:"輸出電壓",OutputVoltageR:"輸出電壓(R相)",OutputVoltageS:"輸出電壓(S相)",OutputVoltageT:"輸出電壓(T相)"},PowerMeters:{Current:"電流",CurrentR:"電流(R相)",CurrentS:"電流(S相)",CurrentT:"電流(T相)",Energy:"能耗",Frequency:"頻率",Power:"功率",Voltage:"電壓",VoltageR:"電壓(R相)",VoltageS:"電壓(S相)",VoltageT:"電壓(T相)"},THMeters:{Temperature:"溫度",Humidity:"濕度"},PDUs:{Current:"電流",CurrentR:"電流(R相)",CurrentS:"電流(S相)",CurrentT:"電流(T相)",Power:"功率",PowerR:"功率(R相)",PowerS:"功率(S相)",PowerT:"功率(T相)",Voltage:"電壓",VoltageR:"電壓(R相)",VoltageS:"電壓(S相)",VoltageT:"電壓(T相)"},EquipSetUp:{IsNormalOpen:"常開",IsOnAlarm:"On 警報",IsNot:"反相",AlarmGroupIds:"警報群組",UpperLimitAlarm:"上限警報",LowerLimitAlarm:"下限警報",Unit:"單位",DigitalInputs:"數位輸入",DigitalOutputs:"數位輸出",AnalogInputs:"類比輸入",UPSs:"不斷電系統",THMeters:"溫溼度",PDUs:"電力插座",PowerMeters:"集合式電錶"},UserInfo:{Developer:"開發人員",Manager:"管理人員",Installer:"安裝人員",Operator:"操作人員"}}},Gt=new Dt["a"]({locale:"zh-TW",fallbackLocale:"en-US",messages:$t,silentTranslationWarn:!0});a["a"].prototype.$api=xt,a["a"].config.productionTip=!1,a["a"].use(Dt["a"]),a["a"].mixin(Pt),new a["a"]({vuetify:ft,router:lt,store:ht,i18n:Gt,render:function(t){return t(m)}}).$mount("#app")},5916:function(t,e,n){},"85ec":function(t,e,n){},"95bf":function(t){t.exports=JSON.parse('[{"index":0,"title":"首頁","icon":"mdi-home","path":"/index","auth":["Developer","Manager","Installer","Operator","Visitor"]},{"index":1,"title":"歷史資料","icon":"mdi-file-document-multiple","path":"/history","auth":["Developer","Manager","Installer","Operator","Visitor"]},{"index":2,"title":"警報管理","icon":"mdi-bell","path":"/alarmManagement","auth":["Developer","Manager","Installer","Operator","Visitor"]},{"index":3,"title":"人員管理","icon":"mdi-card-account-details","path":"/userManagement","auth":["Developer","Manager","Installer","Operator"]},{"index":4,"title":"設定","icon":"mdi-cog","path":"/setup","auth":["Developer","Installer"],"subItems":[{"index":41,"title":"啟用設備設定","icon":"mdi-view-grid","path":"/setup/EquipmentSetup"},{"index":42,"title":"網路設定","icon":"mdi-web","path":"/setup/InternetSetup"},{"index":43,"title":"警報發送設定","icon":"mdi-send-circle","path":"/setup/AlarmSendSetup"},{"index":44,"title":"系統設定","icon":"","path":"/setup/SystemSetup"}]}]')},c4cc:function(t,e,n){"use strict";n("5916")},d10c:function(t,e,n){},e617:function(t,e,n){}});
//# sourceMappingURL=app.3d196c0c.js.map