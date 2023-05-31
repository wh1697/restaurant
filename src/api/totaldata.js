// echarts图表发起请求第一步 引用拦截器
import axios from "@/utils/requery";
// echarts图表发起请求第二步  发起get请求
export const totaldata = ()=>{
    return axios.get('/order/totaldata')
}
