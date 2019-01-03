// pages/personal/helptext/helptextdetail/helptextdetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usertext: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  this.init(options);
  app.setNavigationBarTitle(options.name);
  },
  init: function(options) {
    app.request.post({
      url: "problem/index",
      isLoading: true,
      data: {
        key: options.key
      },
      success: (e) => {
        let a = e.text ;
        let opt = '<div>' 
        let iop = '</div>'
        var ccc = {name:e.name,text:opt+a+iop}
        this.setData({
          usertext: ccc
        })
      }
    });
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