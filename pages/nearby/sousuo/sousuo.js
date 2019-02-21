// pages/sousuo/sousuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [
      { goods: 'qqq', goodsId: 1 },
      { goods: 'aaaa', goodsId: 2 },
      { goods: 'www', goodsId: 3 }
			],
    userinput: "",
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    this.setData({
      isShow: false
    })
  },
  onLoad: function (options) {

  },
  shousuo: function (e) {
    this.setData({
      userinput: e.detail.value
    })
  },

  ss: function () {
    this.setData({
      isShow: true
    })
  },
  neirong: function () {
    let goodsList = [{"A":"你好"},{"B":"小明"}]
    wx.setStorageSync("goodsList", goodsList)  //把数据存入本地
    wx.navigateTo({
      url: "../neirong/neirong",
    })
  },

})