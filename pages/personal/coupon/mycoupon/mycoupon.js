// pages/personal/coupon/mycoupon/mycoupon.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	run() {
		wx.switchTab({
			url: '/pages/personal/person/person',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
			this.setData({
				card_sn: options.card_sn,
				qr_code: options.qr_code,
				shop_name: options.shop_name,
				titlie: options.titlie,
				card_id:options.card_id
			})
	},
// 
//  

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		var huser_id = wx.getStorageSync('user_id')
		this.setData({
			huser_id: huser_id
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
		return {
			title:'您的朋友送给你' + this.data.titlie,
			path: '/pages/personal/coupon/coupon?card_id=' + this.data.card_id + '&huser_id=' + this.data.huser_id,
			imageUrl: this.data.qr_code
		}
		success:(e)=>{
				wx.showToast({
					title: 'wdwdwdawdawdaw',
				})
		}
	}
})