import common from "/utils/request.js"
import regular from "/utils/regular.js"
import utils from "/utils/utils.js"
App({
  globalData: {
    userInfo: {},
    shopId: 85, //店铺id
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
      goods: 2,
    },
    pay_order: 2,
    dengluzhuangtai: 3
  },
  dengluzt() {
    if (this.status.dengluzhuangtai == 3 && !wx.getStorageSync('user_id')) {
      wx.navigateTo({
        url: '/pages/dengl/dengl',
      })
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
  }
})