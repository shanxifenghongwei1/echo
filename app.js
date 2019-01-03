import common from "/utils/request.js"
import regular from "/utils/regular.js"
import utils from "/utils/utils.js"
App({
  globalData: {
    userInfo: {},
    shopId: 38, //店铺id
    shopType: 0, //首次进入店铺方式    0.附近活动进入   1.分享进入二维码进入
    voucher: {
      "fullFeduction": 16, //满减
      "fullGift": 18 //满赠 
    },
  },
  status: {
    shopType: { //进入店铺方式
      shop_status_Type: 0,
      shop_share_Type: 1
    },
    typeCollection: { //商品收藏状态  1.收藏  2.取消收藏
      collection: 1,
      cancel: 2
    },
    orderType: { //下单方式   1.店铺下蛋   2.商品下蛋  
      shop: 1,
      goods: 2
    }
},
host: common.host,
regular: regular,
utils: utils,
request: {
  post: common.post
},
onHide() {
  this.globalData.shopType = this.status.shopType.shop_status_Type;
},
/*设置小程序标题 */
setNavigationBarTitle(titile) {
  wx.setNavigationBarTitle({
    title: titile
  })
},
/**
 * 保存用户的登陆信息
 * userObj 请求相关信息
 * isLoading 是否显示loading,默认不显示
 */
userLogin(userObj, isLoading = false) {
  wx.login({
    success: (res) => {
      if (res.code) {
        this.request.post({
          url: "user/login",
          isLoading: isLoading,
          data: {
            code: res.code,
            userInfo: userObj.userInfo
          },
          success: (e) => {
            this.globalData.userInfo = userObj.userInfo;
            wx.setStorageSync('user_id', e.user_id);
            wx.setStorageSync('user_info', userObj.userInfo);
            userObj.callback(e);
          }
        })
      } else {
        wx.showToast({
          "title": "失败了，请稍候再试！",
          "icon": "none",
        });
      }
    }
  });
}
})