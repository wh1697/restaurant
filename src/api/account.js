// 账号管理相关的请求

// 1.把拦截器import一下
import axios from '@/utils/requery.js'


// 2.添加账号(用于AddAccount 页面)
// data是要传的参数见接口文档 也就是里面要添加的数据对象
// {
//     account:'admin',
//     password:123,
//     userGroup:''
// }

export const add = (data)=>{
    return axios.post('/users/add',{...data})
}

// 3.获取账号列表(用于AccountList 页面)  get请求{params:{...data}}需要传参数的写法
export const list=(data)=>{
    return axios.get('/users/list',{params:{...data}})

}

// 4.获取个人的账号信息用于点击编辑按钮去修改账号列表里面的某一条数据(用于EditAccount 页面) 需要传参数
export const getInfo = (data)=>{
    return axios.get('/users/account-info',{params:{...data}}); 
}

// 5.保存修改好的内容再次显示到账号列表AccountList里面第一步(用于EditAccount 页面)
export const saveAccount = (data)=>{
    return axios.post('/users/edit',{...data})
}


// 6.账号列表点击删除按钮发请求  第一步
export const delAccount = (data)=>{
    return axios.get('/users/del',{params:{...data}})
}

// 7.(批量删除第三步)
export const delAllAccount = (data)=>{
    return axios.get('/users/batchdel',{params:{...data}})
}

// 8.商品添加
export const addCommodity = (data)=>{
    return axios.post('/goods/add',{...data})
}

// 9.商品列表
export const commodityList=(data)=>{
    return axios.get('/goods/list',{params:{...data}})
}


// 10.商品列表点击删除按钮发请求  第一步
export const delCommodity=(data)=>{
    return axios.get('/goods/del',{params:{...data}})
}

// 11.商品分类点击删除按钮发请求 第一步
export const delClassify=(data)=>{
    return axios.get('/goods/delcate',{params:{...data}})
}


// 12.获取商品列表点击编辑按钮的某一条信息  用于点击编辑按钮去修改商品列表里面的某一条数据(用于EditCommodity 页面) 需要传参数
export const getCommodity = (data)=>{
    return axios.post('/goods/edit',{...data}); 
}

// 13.获取订单列表第一步(用于orderList 页面) 
export const getOrder=(data)=>{
    return axios.get('/order/list',{params:{...data}})
}

