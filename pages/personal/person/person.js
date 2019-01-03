const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoBtn: true,
    userInfo: {
      "avatarUrl": app.host.resources + "userAvatar.jpg",
      "nickName": "",
      user_money: 0
    }
  },
  makePhoneCall: function(e) {
    app.utils.makePhoneCall("87654321000" + e.currentTarget.dataset.phone);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    this.init();
  },

  init() {

    // 我的余额
    app.request.post({
      url: "user/mymoney",
      success: (e) => {

        this.setData({
          user_money: e.user_money
        })
      }
    })
  },

  onLoad: function(options) {
    app.setNavigationBarTitle("个人中心");
    
    let that = this;
    wx.getSetting({
      success(res) {
        let nickName = "点击头像登录";
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          nickName = "正在登录";
          wx.getUserInfo({
            success(res) {
              app.userLogin({
                userInfo: res.userInfo,
                callback: (resource) => {
                  that.setData({
                    userInfoBtn: false,
                    userInfo: res.userInfo
                  })
                }
              });
            }
          })
        }
        that.setData({
          "userInfo.nickName": nickName
        })
      }
    })
  },
  getCodeUserInfo(e) {
    let that = this;
    app.userLogin({
      userInfo: e.detail.userInfo,
      callback: (resource) => {
        that.setData({
          userInfoBtn: false,
          userInfo: e.detail.userInfo
        })
      }
    }, true);
  },
})