// pages/order/order.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
	data: {
		cid: 1,
		// order: [{ text: '已完成', type_id: 1 }, { text: '待支付', type_id: 2 }, { text: '待评论', type_id: 4 }, { text: '已取消', type_id: 3 }],
		shop: [],
		state: '待评论',
		page: 1
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
	onLoad: function (options) {
		app.setNavigationBarTitle("我的店铺订单");
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
		
		this.init();

	},

	init(cid) {
		app.request.post({
			url: "order/getOrderList",
			isLoading: true,
			data: {
				page: this.data.page,
				business_id:this.data.shop_id
			},
			success: (e) => {
				this.setData({
					shop:e.order
				})
			}
		})
	},
	// 我的订单分页

  /**
   * 生命周期函数--监听页面隐藏
   */
	onHide: function () {

	},
	onLoad: function (options) {
		this.setData({
			shop_id:options.shop_id
		})
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