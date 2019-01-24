// pages/index/oddments/map/map.js
const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		app.setNavigationBarTitle("地图");
		let shop_id = options.shop_id
		this.init(shop_id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
	init(shop_id){
		app.request.post({
			url: "place/index",
			isLoading: true,
			data: {
				shop_id: shop_id
			},
			success:(e)=>{
				wx.openLocation({
					latitude: e.lat,
					longitude: e.lng,
					name:e.shop_name,
					address:e.address
				})
			}
		})
	},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})