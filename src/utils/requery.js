// src/utils/request.js
/* 
作用：
1.axios的基础设置(请求url,提交内容的类型-表单方式，超时时间，)
2.配置请求拦截器
3.配置响应拦截器 
*/

// 导入axios
import axios from 'axios'
// 把json格式的对象转为url参数形式
// 因为，默认axiox发送数据是采用json方式，本项目中的接品采用的是url参数形式
// {username:"jack"} = > /user?username=jack
import qs from 'qs'

import store from '../store/index'

// A：基本配置
// element-ui 消息提示插件
import { Message } from 'element-ui'



// A1 全局默认配置
axios.defaults.baseURL = 'http://127.0.0.1:5000/';
axios.defaults.timeout = '5000' // 超时时间

// 不用qs,就用这个
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//A2 授权(token)
/* 
除了登录以外，所有的接口在请求的时候，需要添加token（令牌）。
token在登录成功后，后端有返回的，需要自己保存起来。
在请求拦截器里面加上即可。
*/
//获取token
// let info = localStorage.getItem("user_info")?JSON.parse(localStorage.getItem("user_info")):null;
// let token = info?.token;
console.log(store)
// let token = store.state.token||""
// let token = store && store.state && store.state.user && store.state.user.token || ""

//B !!!在定义拦截器的时候，需要先通看一下接口文档，了解后端返回的数据的大部分的格式

//添加请求拦截器:发请求前，把一些基础的，公共的放这里处理了
axios.interceptors.request.use(
    function (config) {
        //把请求的数据转为 url形式：user?username=jack
        config.data = qs.stringify(config.data);

        // console.log("token",token)


        // 在发送请求之前做些什么？自定义一个请求头，带上token
        let token = store && store.state && store.state.user && store.state.user.token || ""
        if (token) {
            // config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTUsImN0aW1lIjoiMjAyMC0wNS0xOVQwOTowMDo1OC4wMDBaIiwiYWNjb3VudCI6ImFkbWluIiwicGFzc3dvcmQiOiI2NjYiLCJ1c2VyR3JvdXAiOiLotoXnuqfnrqHnkIblkZgiLCJpbWdVcmwiOiIxNTkwMzczMzQ3OTA3LmpwZyIsImlhdCI6MTY3ODc4MDc4OCwiZXhwIjoxNjc5Mzg1NTg4fQ.4ZfOercFKhZcZgBXOZiZLn5jsD7bf5fWDatiBMdxo64";
            config.headers.Authorization = token;
        }
        return config;
    },
    function (error) {
        // 对请求错误做些什么,返回Promise对象，并状态设置为reject
        return Promise.reject(error);
    }
);

//C 添加响应拦截器:收到响应后，做一些基础的处理，方便后面的开发
axios.interceptors.response.use(
    function (response) {
        /* 
          axios返回的结果：
          {config:"",header:"",data:"",request:"",status:200/500/401}
          status http状态码，200成功
        */
        console.log(response)

        if (response.status !== 200) {
            Message.error('网络连接失败')
            return Promise.reject(error);
        }

        //过滤/处理 响应的数据，从axios的data中取到我们想要的数据
        //返回想要的数据，返回一promise对象，状态为resolve，拿axios中的data
        return Promise.resolve(response.data);

        // (注销的80-98的原因是 因为本项目的账号列表返回的接口中没有code 如果使用这个就会原样返回接口---在响应的拦截器里面只需要判断网络有没有问题能不能返回200网络状态 因此只需要77行这一行代码就够了)*****
        //  if (response.data && response.data.code !== undefined && response.data.msg !== undefined) {
        //     let { code, msg } = response.data; //取状态码，提示信息

        //     if (code === 0) {
        //         //返回想要的数据，返回一promise对象，状态为resolve
        //         return Promise.resolve(response.data);
        //     }
        //     //不成功，返回提示信息
        //     Message.error(msg);
        //     return Promise.reject(response.data.msg);
        // }

        //不成功，返回提示信息
        // Message.error(msg);
        // return Promise.reject(response.data.msg);

        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        // return Promise.resolve(response);
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

//export
export default axios;