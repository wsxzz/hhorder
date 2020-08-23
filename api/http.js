import AppConfig from "./config.js";

class Http {
  constructor(arg) {
    this.debugger = false;
  }
  async sleep(timeLen) {
    return new Promise(resolve => {
      setTimeout(resolve, timeLen);
    });
  }
  /**
   * 发送请求
   */
  async ajax({
    url,
    method,
    data = {},
    _config = {}
  }) {
    const config = {
      isLoading: false,
      showError: true,
      ..._config
    }
    let requestUrl = AppConfig.requsetUrl + url;
    if (url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1) {
      requestUrl = url;
    }
    if (config.isLoading) {
      await uni.showLoading({
        title: "加载中",
        mask: true
      });
    }
    const [err, res] = await uni.request({
      url: requestUrl,
      method,
      data,
      header: {
        "content-type": "application/json;charset=UTF-8",
        // 'appId': 'cyx',
        // 'userAgent': 'pc',
        // 'Authorization':'Bearer ' + Auth.getToken(),
        // "jwt": Auth.getToken(),
        // 'userId': Auth.getUserId(),
        // 'ownerCode': ''
      }
    });
    const responseText = JSON.stringify(res.data);
    if (responseText.length > 19999) {
      console.log('http 请求 响应:' + responseText.substr(0, 999) + ' 数据超长');
    } else {
      console.log("http 请求 响应: ", JSON.parse(responseText));
    }
    if (config.isLoading) {
      await this.sleep(300);
      await uni.hideLoading();
    }
    if (err) {
      // 请求发送时候失败
      uni.showToast({
        title: '请求发送失败, 请检查您的网络',
        position: 'bottom',
        icon: 'none'
      });
      // plus.nativeUI.toast('请求发送失败, 请检查您的网络');
      return null;
    }
    const resultCode = res.data.resultCode;
    const returnCode = res.data.returnCode;
    if (!(resultCode === 200 || returnCode === '0')) {
      if (config.showError) {
        const errMsg = res.data.errMsg || res.data.message || res.data.error || res.data.errcode;
        uni.showToast({
          title: String(errMsg),
          position: 'bottom',
          icon: 'none'
        });
        // plus.nativeUI.toast(String(errMsg));
      }
      return [true, res.data];
    }
    return [false, res.data];
  }
  async get(url, data, _config) {
    const method = "GET";
    return await this.ajax({
      url,
      method,
      data: { ...data,
        t: new Date().getTime()
      },
      _config
    });
  }

  async post(url, data, _config) {
    const method = "POST";
    return await this.ajax({
      url,
      method,
      data: { ...data,
        t: new Date().getTime()
      },
      _config
    });
  }
  
  async delete(url,data,_config){
    const method = "DELETE";
    return await this.ajax({
      url,
      method,
      data,
      _config
    })
  }
}
export default new Http();
