// import axios from "axios"

// 登录请求第一步创建api文件夹里面再创建login.js文件
// 登录请求第二步 导入 axios 
import axios from '../utils/requery'

// 登录请求第三步 使用箭头函数方法
export const login = (data) => {
    // {...data}代表对象的扩展运算符里面放用户名和密码登录的时候要传数据也就是传参数这个 {account:'admin',password:123456}

    // 登录请求地址/users/checkLogin    方式： post    详情见接口文档

    // 登录请求第四步 正式开始发请求
    return axios.post('/users/checkLogin', { ...data });

}

// 退出登录请求
export const logout = (data) => {
    return axios.post('/users/checkLogin', { ...data });
}
