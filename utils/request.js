const app = getApp();
let host = {
  image: "https://www.sdhcnet.com/", //图片域名
  resources: "https://www.sdhcnet.com/applets/", //静态资源域名
  request: "https://www.nazhua.net/api/", //请求域名
}
/**
 * 封装ajax的post请求
 * ajaxJson.path 请求地址
 * ajaxJson.data 请求json对象
 * ajaxJson.method 请求方式  默认post
 * ajaxJson.isLoading  true 显示loading
 * ajaxJson.success   请求成功执行方法  可不填,不填全局提示弹窗
 * ajaxJson.complete  始终会执行的方法   可不填
 * ajaxJson.globalJudge 返回状态判断  true：请求处判断逻辑
 */
let requestPost = ajaxJson=> {
  if (ajaxJson.isLoading) { //为ture 显示loading
    wx.showLoading({
      title: '加载中',
    })
  }
  if (ajaxJson.data==undefined){
    ajaxJson.data={};
   
  }
  ajaxJson.data["user_id"] = wx.getStorageSync('user_id')
  wx.request({
    url: host.request + ajaxJson.url,
    data: ajaxJson.data,
    method: ajaxJson.method != undefined ? jaxJson.method : "post",
    dataType: "json",
    success(result) {
      if (ajaxJson.globalJudge == true) { //在请求调用处，处理所有逻辑
        ajaxJson.callBack(result.data);
      }
      if (result.data.code == 1) { //请求成功
        if (typeof ajaxJson.success === "function") {
          ajaxJson.success(result.data.data);
        }else{
          wx.showToast({
            "title": result.data.msg,
            "icon": "success",
          });
        }
      } else if (result.code == 2) { //整体出错
				if (typeof ajaxJson.success === "function") {
					ajaxJson.success(result.data.data);
				}else{
          wx.showToast({
            "title": result.data.msg,
            "icon":"none",
          });
				}
      }else { //未知错误
				
				if (typeof ajaxJson.success === "function") {
					ajaxJson.success(result.data.data);
				}else{
          wx.showToast({
            "title": "发生错误，请稍候再试",
            "icon": "none",
          });
				}
      }
    },
    complete: function(res) {
      if (ajaxJson.isLoading == true && typeof ajaxJson.success === "function") {
        wx.hideLoading();
      }
      if (typeof ajaxJson.complete === "function") {
        ajaxJson.complete(res);
      }
    }
  })
};
module.exports = {
  host: host,
  post: requestPost
};