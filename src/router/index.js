import Vue from 'vue'
import VueRouter from 'vue-router'
// 如果我将token存放到了我的vuex里面 路由这里需要引入
// 这样才能拿到我store文件夹里  vuex里面的state   定义的user: {} 里面是role和token
import store from '@/store/index'

// 解决路由跳转重复一个时报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 重定向会导致的报错问题
const originalPushs = VueRouter.prototype.redirect
VueRouter.prototype.redirect = function redirect(location) {
  return originalPushs.call(this, location).catch(err => err)
}

// 路由开始*****************

// 静态路由是我在没有登录的情况下展示的页面   放登录 
const routes = [
  {
    path: '/',
    // meta: { name: '修改密码' },

    component: () => import('@/Login.vue')
  },
  {
    path: '/index',    //意思就是将首页地址/ 重定向到我的/home
    redirect: '/index',
    // meta:{name:'首页'},   //控制面包屑停留在哪一页 第一步先定义再去判断有没有权限登录(都写完这个就可以注销了)
    component: () => import('../views/Layout/main.vue'),
    children: [
      {
        path: '/index',
        component: () => import('../views/index.vue')
      }
    ]

  },

]


// 动态路由 放登陆后展示的页面
const trendsRoute = [


  //前期配置第一步：在views文件夹里面创建组件  然后直接在index.js里面引用组件 //以后都使用路由懒加载，就是用到了这个页面才会加载它,可以提升性能
  {
    path: '/index',    //意思就是将首页地址/ 重定向到我的/home
    redirect: '/index',
    meta: { name: '首页' },
    //  //控制面包屑停留在哪一页 第一步先定义再去判断有没有权限登录(都写完这个就可以注销了)
    component: () => import('../views/Layout/main.vue'),
    children: [
      {
        meta: { name: '首页' },
        path: '/index',
        component: () => import('../views/index.vue')
      }
    ]
  },


  //商品管理
  // 嵌套子路由 举例：点击商品管理展开显示的就是子组件 展开的第一个是商品列表所以第一个子路由显示的是商品列表的路径
  // path是指定的访问的路径 也就是说这些子路由的父级文件夹名称
  {
    path: '/Commodity',
    meta: { name: '商品管理' },
    redirect: "/Commodity/AddCommodity",
    component: () => import('../views/Layout/main.vue'),      //写这个的目的是点击我商品管理下面的任何一个组件的时候  页面都能显示我的左侧导航栏和头部面包屑因为这两个东西都在我的main.vue里面我的main.vue里面已经导入了左侧导航栏Nav和头部面包屑

    //在children里面写上这几个子路由目的是可以点击商品管理然后我的商品列表商品添加商品分类都能来回切换了
    children: [
      {
        meta: { name: '添加商品' },
        path: '/Commodity/AddCommodity',
        component: () => import('../views/Commodity/AddCommodity.vue')
      },
      // (点击CommodityList列表页编辑按钮跳转到EditCommodity第二步)配置跳转路由 注意此路由配置有一些特殊因为我们在编辑每一条的数据的时候需要给传入一个id要不然不能锁定到底去编辑的哪一条数据,因此在配置路由的时候要传入一个参数 /:uid
      {
        path: '/Commodity/EditCommodity/:uid',
        meta: { name: '编辑商品', role: 'super' },
        name: 'EditCommodity',   //(点击CommodityList列表页编辑按钮跳转到EditCommodity第七步)  给这条路由数据起个名字方便定义去跳转 搭配CommodityList里面的第六步使用
        component: () => import('../views/Commodity/EditCommodity.vue')
      },
      {
        meta: { name: '商品分类' },
        path: '/Commodity/CommodityClassify',
        component: () => import('../views/Commodity/CommodityClassify.vue')
      },
      {
        meta: { name: '商品列表' },
        path: '/Commodity/CommodityList',
        component: () => import('../views/Commodity/CommodityList.vue')
      }

    ]
  },


  // 账号管理
  {
    path: '/Account',
    meta: { name: '账号管理', role: ['normal', 'super'] },
    redirect: "/Account/AccountList",
    component: () => import('../views/Layout/main.vue'),      //写这个的目的是点击我账号管理下面的任何一个组件的时候  页面都能显示我的左侧导航栏和头部面包屑因为这两个东西都在我的main.vue里面我的main.vue里面已经导入了左侧导航栏Nav和头部面包屑

    //在children里面写上这几个子路由目的是可以点击账号管理然后我的账号列表添加账号修改密码都能来回切换了
    children: [
      {
        path: '/Account/AccountList',
        meta: { name: '账号列表', role: 'super' },
        component: () => import('../views/Account/AccountList.vue')
      },
      {
        path: '/Account/AddAccount',
        meta: { name: '添加账号', role: 'super' },
        component: () => import('../views/Account/AddAccount.vue')
      },
      // (点击AccountList列表页编辑按钮跳转到EditAccount第二步)配置跳转路由 注意此路由配置有一些特殊因为我们在编辑每一条的数据的时候需要给传入一个id
      // 要不然不能锁定到底去编辑的哪一条数据,因此在配置路由的时候要传入一个参数 /:uid
      {
        path: '/Account/EditAccount/:uid',
        meta: { name: '编辑账号', role: 'super' },
        name: 'EditAccount',   //(点击AccountList列表页编辑按钮跳转到EditAccount第七步)  给这条路由数据起个名字方便定义去跳转 搭配AccountList里面的第六步使用
        component: () => import('../views/Account/EditAccount.vue')
      },
      {
        path: '/Account/TurnPassword',
        meta: { name: '修改密码' },
        component: () => import('../views/Account/TurnPassword.vue')
      },
    ]
  },


  // 销售统计
  {
    path: '/sell',
    redirect: "/sell",
    meta: { name: '销售统计' },
    component: () => import('../views/Layout/main.vue'),      //写这个的目的是点击我账号管理下面的任何一个组件的时候  页面都能显示我的左侧导航栏和头部面包屑因为这两个东西都在我的main.vue里面我的main.vue里面已经导入了左侧导航栏Nav和头部面包屑

    //在children里面写上这几个子路由目的是可以点击账号管理然后我的账号列表添加账号修改密码都能来回切换了
    children: [
      {
        meta: { name: '商品统计' },
        path: '/sell/CommodityStatic',
        component: () => import('../views/sell/CommodityStatic.vue')
      },
      {
        meta: { name: '订单统计' },
        path: '/sell/OrderStatic',
        component: () => import('../views/sell/OrderStatic.vue')
      }

    ]
  },

  // 首页我已经在路由都配置好了下一步我一定记得要去我的Nav.vue里面更改<el-menu-item index="4">


  // 订单管理我已经在路由都配置好了下一步我一定记得要去我的Nav.vue里面更改<el-menu-item index="4">
  {
    path: '/orderList',
    meta: { name: '订单管理' },
    redirect: "/orderList",
    component: () => import('../views/Layout/main.vue'),     //写这个的目的是点击我商品管理下面的任何一个组件的时候  页面都能显示我的左侧导航栏和头部面包屑因为这两个东西都在我的main.vue里面我的main.vue里面已经导入了左侧导航栏Nav和头部面包屑

    children: [
      {
        path: '/orderList',
        meta: { name: '订单列表' },
        component: () => import('../views/orderList.vue')
      }
    ]

  },


  // 店铺管理我已经在路由都配置好了下一步我一定记得要去我的Nav.vue里面更改<el-menu-item index="4">
  {
    path: '/shop',
    meta: { name: '店铺管理' },
    redirect: '/shop',
    component: () => import('../views/Layout/main.vue'),
    children: [
      {
        meta: { name: '店铺管理' },
        path: '/shop',
        component: () => import('../views/shop.vue')

      }
    ]
  }

]

const router = new VueRouter({
  routes
})

// 全局路由守卫 访问的时候检查是否登录
router.beforeEach((to, from, next) => {
  // 如果登录了
  if (store.state.user && store.state.user.token) {
    next()   //直接通过

    //如果没有登录则分为两种情况
  } else {
    // 第一种情况 直接进入我的登录页
    if (to.path == '/login') {
      next()
    } else {
      //第二种情况 否则指定跳到那一页
      next({ path: '/login' })
    }
  }
})

function hasRouter(res, role) {
  if (res.meta && res.meta.role) {
    // 判断有没有权限
    return res.meta.role.includes(role)
  } else {
    return true
  }
}
/**
 * 
 * data 所有动态路由
 * role  登陆人权限
 */
function calcRouters(data = trendsRoute, role = store.state.user && store.state.user.role) {
  // let router;  //  
  let routerList = data.filter(res => {
    // router ='';
    // hasRouter(res,role)
    if (hasRouter(res, role)) {
      // 判断有没有子路由
      if (res.children && res.children.length) {
        res.children = calcRouters(res.children)
      }
      return true
    } else {
      return false
    }
    // 判断需不需要权限判断
    // if (res.meta && res.meta.role) {
    //   // 判断有没有权限
    //   if (res.meta.role.includes(role)) {
    //     // 判断有没有子路由
    //     if (res.children && res.children.length > 1) {
    //       res.children = calcRouters(res.children)
    //     }
    //     router = res;
    //   }
    // } else {
    //   router = res;
    // }
    // if (router) {
    //   return true
    // } else {
    //   return false
    // }

  })
  return routerList
}
// 当 遇到 本身有多个子路由 因权限控制导致路由只有一个子路由
function calcMenus(routerArr) {
  // debugger
  routerArr.forEach(res => {
    if (res.children && res.children.length === 1) {
      // 给有权限但 只有一个子路由时 添加一个空对象
      if (res.meta && res.meta.role) {
        res.children.push({})
      }
    }
  })
  return routerArr
}

export const getRouter = function () {
  // 过滤不要的路由
  let routerArr = calcRouters();
  console.log(routerArr, 'routerArr')
  // addRoute
  routerArr.forEach(res => {
    router.addRoute(res);
  });
  router.addRoute({
    path: '/login',
    // meta: { name: '修改密码' },

    component: () => import('@/Login.vue')
  })
  router.options.routes = routerArr;

  let menus = calcMenus(routerArr)
  store.commit('changeMenus', menus)

}
getRouter()     //千万不能删除这个


// 这句话相当于把路由这个模块给暴露出去了
export default router
