const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dengluzhuangtai: 3,
    userInfo: {},
  },

  makePhoneCall: function(e) {
    app.utils.makePhoneCall("87654321000" + e.currentTarget.dataset.phone);
  },
	
	
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    let usermane = wx.getStorageSync('user_info')
    this.setData({
      userInfo: usermane
    })
    this.init();
    app.dengluzt();
  },

  init() {
    // 我的余额
    app.request.post({
      url: "user/mymoney",
      isLoading:false,
      success: (e) => {
        this.setData({
          user_money: e.user_money,
					business:e.is_merchant,
					myshop_id:e.myshop_id
        })
      }
    })
  },

  onLoad: function(options) {
    app.setNavigationBarTitle("个人中心");
    app.dengluzt();
  },
})