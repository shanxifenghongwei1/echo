// pages/personal/person/payrecharge/payrecharge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:'wx',
    order: [{ text: '微信', type_id: 'wx' }, { text: '余额', type_id: 'yue' }, { text: '买单币', type_id:'mdb' }, { text: '提现', type_id: 'tix' }],
    money_list: [{
      push_money: 40000,
      get_money: 500000,
      pay_type: '微信',
      pay_state: '支付成功',
      pay_time: '7月18日 9:25'
    }, {
      push_money: 30,
      get_money: 40,
      pay_type: '支付宝',
      pay_state: '支付成功',
      pay_time: '7月20日 9:25'
    }],
    page:0
  },

 
  addorderid: function (e) {
    this.setData({
      cid: e.currentTarget.dataset.id
    })
    this.init();
  },
 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
  },
  init(cid) {
    app.request.post({
      url: "user/mybill",
      isLoading: true,
      data: {
        page: this.data.page,
        key: this.data.cid
      },
      success: (e) => {
        console.log(e)
        this.setData({
            money_list:e.desc
        })
      }
    })
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