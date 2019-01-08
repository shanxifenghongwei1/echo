// pages/recharge/recharge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      conten: options.conten,
      payforid: options.payforid,
      shop_id: options.shop_id,
      ac_id: options.ac_id,
      zongyue: options.zongyue
    })
  },
  moneyinthis(e) {
    this.setData({
      usermoney: e.detail.value
    })
  },
  // 买单币活动充值
  mdbhdcz() {
    app.request.post({
      url: "activity/joinnoblecard",
      data: {
        ac_id: this.data.ac_id,
        business_id: this.data.shop_id,
        money: this.data.usermoney
      },
      success: (e) => {
        wx.requestPayment({
          timeStamp: e.timeStamp,
          nonceStr: e.nonceStr,
          package: e.package,
          signType: e.signType,
          paySign: e.paySign,
          success: (res) => {
            app.request.post({
              url: "activity/valimdb",
              data: {
                type: e.type,
                desc_sn: e.desc_sn,
                ac_id:this.data.ac_id
              },
              success: (e) => {
                wx.navigateBack({
                  url: 'shop_id=' + this.data.shop_id,
                  success: () => {
                    wx.showToast({
                      title: '充值成功',
                      duration: 3000,
                      icon: 'success'
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },
  // 买单币充值
  mdbcz() {
    app.request.post({
      url: "activity/joinnoblecard",
      data: {
        business_id: this.data.shop_id,
        money: this.data.usermoney
      },
      success: (e) => {
        wx.requestPayment({
          timeStamp: e.timeStamp,
          nonceStr: e.nonceStr,
          package: e.package,
          signType: e.signType,
          paySign: e.paySign,
          success: (wer) => {
            app.request.post({
              url: "activity/valimdb",
              data: {
                 type: e.type,
                 desc_sn:e.desc_sn
                 },
              success: (e) => {
                wx.navigateBack({
                  url:'shop_id=' + this.data.shop_id,
                  success: () => {
                    wx.showToast({
                      title: '充值成功',
                      duration: 3000,
                      icon: 'success'
                    })
                  }
                })
              }
              })
            

           
          }
        })
      }
    })
  },
  // yecz
  xjcz() {
    app.request.post({
      url: "activity/re_money",
      data: {
        money: this.data.usermoney
      },
      success: (e) => {
        wx.requestPayment({
          timeStamp: e.timeStamp,
          nonceStr: e.nonceStr,
          package: e.package,
          signType: e.signType,
          paySign: e.paySign,
          success: (res) => {
            
            app.request.post({
              url: "activity/valire_money",
              data: {
                desc_sn: e.desc_sn
              },
              success: (e) => {
                wx.switchTab({
                  url: '/pages/personal/person/person',
                  success: () => {
                    wx.showToast({
                      title: '充值成功',
                      duration: 3000,
                      icon: 'success'
                    })
                  }
                })
              }
            })


          }
        })
      }
    })
  },
  // 余额提现
  yetx() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})