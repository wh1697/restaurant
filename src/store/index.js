// vuex第一步
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// 使用vuex把登录之后获取到的后端的信息保存起来 第八步
import createPersistedState from 'vuex-persistedstate'
//首页的echarts图数据存放到vuex里面 第三步 因为第二步骤已经发起了异步请求这块必须要引入接口地址 把await的方法写{}里面
import { totaldata } from '@/api/totaldata'

// 使用vuex把登录之后获取到的后端的信息保存起来 第九步   
// import { login } from "@/api/login.js";

export default new Vuex.Store({
    state: {
        // 使用vuex把登录之后获取到的后端的信息保存到user里面 第一步    //这个变量user: {} 用来存储登录后的信息 
        user: {},   //登录页面存储  role  token 到vuex   

        //首页的echarts图数据存放到vuex里面第一步 
        echarts: {},   // 定义一个对象里面包括xData和orderData

        menus: [],//导航栏菜单

        info: {}  //定义商品列表点击的哪条数据(很重要第一步 存)


    },
    getters: {

    },

    actions: {
        //首页的echarts图数据存放到vuex里面 第二步  在vuex里面进行的actions里面进行异步请求
        // 从index.vue里的methods把异步请求步骤复制过来记得一定要传一个参数context 代表所有的store里面的东西 最后通过commit触发mutations里面的方法changeEcharts
        async getTotaldata(context) {
            let { xData, orderData } = await totaldata();
            context.commit('changeEcharts', { xData, orderData })
            // this.xData = xData;
            // this.orderData = orderData;
            // this.aa();
        },
    },

    mutations: {
        // 使用vuex把登录之后获取到的后端的信息保存起来 第二步  //在mutations里面去修改state里面的值 

        // 第二步(法二)在定义的方法内 去修改 state内定义的变量
        // user_info是登录页面传递过来的值let user_info={}
        // state指的是上面定义那个那个
        saveUser(state, user_info) {
            state.user = user_info
        },

        changeMenus(state, menus) {
            state.menus = [...menus]
        },

        chartData(state) {
            // state.token = '';
            // state.role = '';
            state.menus = []
        },

        //首页的echarts图数据存放到vuex里面 第四步 把请求到的值赋值到state里面定义的echarts: {}里面 
        changeEcharts(state, { xData, orderData }) {
            // 首页的echarts图数据存放到vuex里面 第五步 修改state里面某个属性的参数
            state.echarts = { xData, orderData }
        },

        // (很重要第二步 存) 下一步去商品列表的编辑按钮那里
        changeInfo(state, data) {
            state.info = { ...data }
        }

    },


    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            reducer(val) {
                // 此时，当count发生改变的时候，就会调用此函数，并且val的值为当前state对象，return的值为当前本地存储的value值（本地存储的key值为vuex）
                return {
                    user: val.user,
                    menus: val.menus
                }
            }
        })
    ]

    // 使用vuex把登录之后获取到的后端的信息保存起来 第七步
    // plugins: [
    //     // veux持久化配置
    //     createpersistedstate({
    //         storage: window.sessionStorage,
    //         reducer(state) {
    //             return {
    //                 user: state.user,
    //                 menus: state.menus
    //             }
    //         }

    //     })
    // ]
})

// export default {
//     state:{
//         token:123
//     }
// }


