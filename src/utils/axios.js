import axios from "axios"
import { Toast } from "zarm"

const MODE = import.meta.env.MODE // 环境变量

axios.defaults.baseURL = MODE === "development" ? "/api" : "http://api.chennick.wang" // 判断运行在开发环境还是生产环境
axios.defaults.withCredentials = true // 允许请求携带认证
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest" // 请求头
axios.defaults.headers["Authorization"] = `${localStorage.getItem("token") || ""}` // 服务端鉴权需要的token
axios.defaults.headers.post["Content-Type"] = "application/json" // post请求头

// 响应拦截器
axios.interceptors.response.use(res => {
    if(typeof res.data !== "object") {
        Toast.fail("服务端异常！")
        return Promise.reject(res)
    }
    if(res.data.code !== 200) {
        if(res.data.msg) Toast.fail(res.data.msg)
        if(res.data.code === 401) window.location.href = "/login"
        return Promise.reject(res.data)
    }
    return res.data
})

export default axios
