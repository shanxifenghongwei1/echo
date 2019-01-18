// pages/personal/business/reviewcenter/reviewcenter.js
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
		this.setData({
			myshop_id: options.myshop_id
		})
		this.getpinglun();
	},
	wherecommit(e) {
		this.setData({
			whereid: e.currentTarget.dataset.id
		})
	},

	showCommentImage(e) {
	
		setTimeout(() => {
			let dataarray = this.data.commentArrar[this.data.whereid].msg_img
			console.log(dataarray)
			wx.previewImage({
				urls: dataarray,
				current: dataarray[e.currentTarget.dataset.id]
			})

		}, 500)
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
	getpinglun: function () {
		app.request.post({
			url: "comment/getCommentList",
			data: {
				shop_id: this.data.myshop_id,
			},
			success: (e) => {
				this.setData({
					commentArrar: e.comment,
					type: e.shop_id
				})
			}
		})
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