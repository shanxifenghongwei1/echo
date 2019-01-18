// pages/personal/business/switcher/switcher.js
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
	onLoad: function (options) {
		console.log(options)
		app.setNavigationBarTitle("账号切换");
		this.setData({
			cid: options.myshop_id
		})
		this.init();
	},
	switchon(e){
		
		this.setData({
			cid: e.currentTarget.dataset.id
		})

		wx.redirectTo({
			url: '/pages/personal/business/business?myshop_id=' + e.currentTarget.dataset.id
		})


	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	
	},
	init(){
		app.request.post({
			url: "shopcenter/getbusiness",
			isLoading: true,
			data: {

			},
			success: (e) => {
				console.log(e)
				this.setData({
					shop_list:e,
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

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