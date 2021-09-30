import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '@/Layout/main'
import Setting from '@/Layout/setting.vue'

Vue.use(VueRouter)
const routes = [
  { 
    path: "*", 
    component:()=>import("../views/PageNotFound.vue"), 
  },
  {
    path:'/login',
    component:()=>import("@/Layout/login"),
    children: [
      {
        path: '',
        component:()=>import("@/views/login.vue"),
      },
    ],
  },
  {
    path:'/',
    name:'Main',
    component:MainLayout,
    redirect:'/index',
    children:[
      {
        path:'index',
        name: "index",
        component:()=>import("@/views/index.vue"),
        meta: { requiresAuth: false }, // 不需驗證
        // children: [
        //   {
        //     path:'power',
        //     name: "power",
        //     component:()=>import("@/views/index.vue"),
        //   },
        //   {
        //     path:'thermometers',
        //     name: "thermometers",
        //     component:()=>import("@/views/thermometers.vue"),
        //   },
        // ]
      },
      {
        path:'history',
        name: "history",
        meta: { requiresAuth: false }, // 不需驗證
        component:()=>import("@/views/history.vue"),
      },
      {
        path:'userManagement',
        name: "userManagement",
        meta: { requiresAuth: false }, // 不需驗證
        component:()=>import("../views/userManagement.vue"),
      },
      {
        path:'alarmManagement',
        name: "alarmManagement",
        meta: { requiresAuth: false }, // 不需驗證
        component:()=>import("@/views/alarmManagement.vue"),
      },
      {
        path:'setup',
        name: "setup",
        component:Setting,
        meta: { requiresAuth: true }, // 需驗證
        children: [
          {
            path:'EquipmentSetup',
            name: "EquipmentSetup",
            component:()=>import("../views/Setup/EquipmentSetup.vue"),
          },
          {
            path:'InternetSetup',
            name: "InternetSetup",
            component:()=>import("../views/Setup/InternetSetup.vue"),
          },
          {
            path:'AlarmSendSetup',
            name: "AlarmSendSetup",
            component:()=>import("../views/Setup/AlarmSendSetup.vue"),
          },
          {
            path:'SystemSetup',
            name: "SystemSetup",
            component:()=>import("../views/Setup/SystemSetup.vue"),
          },
        ]
      },
      
    ]
  },
  
]

const router = new VueRouter({
  base: "/",
  routes
})


router.beforeEach((to, from, next) => {
  // 如果 router 轉跳的頁面需要驗證 requiresAuth: true
  // console.log('to=', to.fullPath, '| from=', from.fullPath);
  if (to.matched.some(record => {
    return record.meta.requiresAuth;
  })) {
    if (
      to.fullPath.includes("/setup") && 
      !localStorage.getItem("UserInfo")
    ){
      // 轉跳到 login page
      next({ path: '/index' });
    } else {
      next(); // 往下繼續執行
    }
  } else {
    next(); // 往下繼續執行
  }
});



export default router
