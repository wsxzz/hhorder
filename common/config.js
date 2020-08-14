let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = ''
    // url_config = 'http://117.40.131.154:8001'
    // url_config = 'http://117.40.131.154:8090'
}else{
    // 生产环境
    url_config = ''
}

export default url_config
