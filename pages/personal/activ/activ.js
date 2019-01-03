// pages/personal/activ/activ.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listM: 100,
    listN: 20,
    listS: '动物园门票',
    src: [{
      src: '/images/test/pic7.png'
    }, {
      src: '/images/test/pic7.png'
    }, {
      src: '/images/test/pic7.png'
    }, {
      src: '/images/test/pic7.png'
    }],
    mode: 'aspectFit'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.setNavigationBarTitle("活动明细");
  },

  exchange:function(e){
    console.log(e)
  },
  init() {
    app.request.post({
      url: "",
      isLoading: true,
      data: {
        
      },
      success: (e) => {
        console.log(e)
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
    this.init();
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