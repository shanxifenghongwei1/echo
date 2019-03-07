// pages/personal/business/businessactivechang/businessactivechang.js
const app = getApp()
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
		this.setData({
			shop_id:options.shop_id,
			ac_id:options.ac_id
		})
		this.init(options)
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
	// 获取信息
	init(pos){
		app.request.post({
			url: 'return/getReturnCashInfo',
			data:{
					return_id:pos.ac_id
			},
			success:(res)=>{
				if(res.state==1){
					this.setData({
						active_message:res.return
					})
				}else{
					app.showtost(res.msg)
				}
			
			}
		})
	},
	// 确认修改
	addshopproduct(e){

		let opt = e.detail.value
		if (opt.name == '') {
			app.showtost('请输入活动名称')
		} else if (opt.money == '') {
			app.showtost('请输入活动金额')
		} if (opt.money <= 0) {
			app.showtost('请输入活动金额')
		} if (opt.money > 10000) {
			app.showtost('超出活动金额上限')
		}
		else if (opt.return_money == '') {
			app.showtost('请输入返现金额')
		}
		else if (opt.return_money <= 0) {
			app.showtost('请输入返现金额')
		}
		else if (opt.return_money > 10000) {
			app.showtost('超出返现金额上限')
		}
		else if (opt.periods == '') {
			app.showtost('请输入期数')
		}
		else if (opt.periods <= 0) {
			app.showtost('请输入期数')
		}
		else if (opt.periods >= 100) {
			app.showtost('超出期数上限')
		}
		else if (opt.take_money == '') {
			app.showtost('请输入拿出金额')
		}
		else if (opt.take_money <= 0) {
			app.showtost('请输入拿出金额')
		}
		else if (opt.number == '') {
			app.showtost('请输入人数')
		}
		else if (opt.number < 0) {
			app.showtost('请输入人数')
		}
		else if (opt.number > 100) {
			app.showtost('超出人数上限')
		}
		else if (opt.brief == '') {
			app.showtost('请输入介绍')
		} else {
		app.request.post({
			url: 'return/updateReturnCash',
			data:{
				return_id:this.data.ac_id,
				return_info: opt
			},
			success:(res)=>{
				app.showtost(res.msg)
				if(res.state == 1){
					setTimeout(() => {
						wx.navigateBack({})
					}, 800)
				}
			}
		})
		}
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