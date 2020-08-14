import urlConfig from './config.js'

const request = {}
const headers = {}
const PORT1 = '/api'
request.globalRequest = (url, method, data, power) => {
/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
    1 == 不通过access_token校验的接口
    2 == 文件下载接口列表
    3 == 验证码登录 */
        
    switch (power){
        case 1:
            headers['Authorization'] = ''
            break;
        case 2:
            headers['Authorization'] = ''
            break;
        case 3:
            responseType = 'blob'
            break;
        default:
            headers['Authorization'] = `Bearer ${
                this.$store.getters.userInfo
            }`
            headers['TENANT-ID'] = this.$store.getters.userInfo.tenant_id
            break;
    }
            
    return uni.request({
        url: urlConfig + url,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
		if(res[1].data.Code == '0000'||res[1].statusCode == 200){
			return res[1].data
		}else{
			// throw res[1].Msg
			throw '请求报错！';
		}
    }).catch(parmas => {
　　　　　　switch (parmas.Code) {
　　　　　　　　case 401:
　　　　　　　　　　uni.clearStorageSync()
　　　　　　　　　　break
　　　　　　　　default:
　　　　　　　　　　uni.showToast({
　　　　　　　　　　　　title: parmas.Msg,
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　})
　　　　　　　　　　return Promise.reject()
　　　　　　　　　　break
　　　　　　}

　　})
 }
 export default request

