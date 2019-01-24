// pages/personal/coupon/mycoupon/mycoupon.js
const app = getApp()
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
		if(options.joinpage==2){
			this.setData({
				joinpage: 2
			})
			this.init(options.card_sn)
		}else if(options.joinpage==1){
			this.init(options.card_sn)
			this.setData({
				joinpage:1
			})
		}
	},
// 
//  
init(asd){
	app.request.post({
		url: "virtual/shareCard",
		isLoading: true,
		data: {
			card_sn:asd
		},
		success: (e) => {
			if(e.state==1){
				this.setData({
					qr_code: e.virtual.qr_code,
					shop_name: e.virtual.shop_name,
					titlie: e.virtual.card_name,
					card_sn: e.virtual.sign
				})
				if(this.data.joinpage==2){
				setTimeout(()=>{
					app.showtost(e.msg)
				},1000)
				} 
				if (this.data.joinpage == 1) {
					// setTimeout(() => {
					// 	app.showtost('点击界面进来的')
					// }, 1000)
				}
			}else{
				setTimeout(() => {
					app.showtost(e.msg)
				}, 1000)
			}
		}
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
		app.setNavigationBarTitle("优惠券详情");
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
			path: '/pages/personal/coupon/mycoupon/mycoupon?card_sn=' + this.data.card_sn + '&joinpage=2',
			imageUrl: this.data.qr_code,
		}
	}
})