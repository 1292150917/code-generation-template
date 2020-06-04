/*
 * @Descripttion: 
 * @version: 
 * @Author: 
 * @Date: 2019-11-27 14:35:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-03 22:15:43
 */
import axios from "axios";
const host = process.env.NODE_ENV === 'production' ? `http://127.0.0.1:8020/` : 'http://127.0.0.1:8020/'  //本地调试时 
axios.interceptors.request.use(config => {
    return config
}, () => {
    return
})
// 参数1：地址，参数2：参数，参数3：成功回调函数，参数4：失败回调函数
function $http({ url, data, method = 'get', success }) {
    // 为了避免他们没有传参的参数而报错
    // 有发送方式就为发送方式  没的话就默认get
    // 这里是判断 由于axios的get和post发送方法不同  post是data发送  get是params发送 
    var params = method.toUpperCase() == 'GET' ? data : {}
    sessionStorage.host = host
    // 统一参数
    data.ip = ""
    data.timestamp = ''
    data.useragent = ''
    data.auth = ''
    data.userid = sessionStorage.userid
    data.structid = sessionStorage.structid
    return new Promise((resolve, reject) => {
        axios({
            url: host + url,
            method: method,
            data: data,
            params: params,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.status !== 0 && response.data.status != 999 && url !=='patientpayment/' && url!=='queryrefundamount/') {
                this.$alert(`${response.data.errordesc}`, '警告',{
                    type: 'warning'
                })
            }
            if (response.data.status == 999 && url !== 'savepatientDiagnosisInfo/') {
                this.$alert(`服务器异常！错误代码(${url})`)
            }
            resolve(response.data)
          if(success){
            success(response.data)
          }
            // 成功回调函数

        }).catch((error) => {
            console.log(error)
            // 失败回调函数
            // this.$alert(`网络连接失败！请尝试刷新页面！错误代码(${url})`)
            if (error) {
                error(error)
            }
            reject(error)
        })
    })


}

export default $http
