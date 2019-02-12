// pages/personal/business/bussinessuservoucher/bussinessuservoucher.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	init(){
		app.request.post({
			url: 'recharge/getRechargeList',
			data:{
				shop_id:this.data.shop_id,
				page:1
			},
			success:(e)=>{
				this.setData({
					recharge: e.recharge,
					total_money: e.total_money
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			shop_id:options.shop_id
		})
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