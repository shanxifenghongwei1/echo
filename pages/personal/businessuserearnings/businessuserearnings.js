// pages/personal/businessuserearnings/businessuserearnings.js
const app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		date:'请选择日期',
		istrue:false,
		turnovermoney:0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			shop_id : options.shop_id
		})
	},
	init(){
		app.request.post({
			url:'business/businessTurnover',
			data:{
				shop_id:this.data.shop_id
			},
			success:(e)=>{
					this.setData({
						turnover: e.turnover,
						data_list:e.dataList
					})
			}
		})
	},
	// 获取当前日期的营业额
	querytime(e){
		console.log(e.detail.value)
		this.setData({
			date:e.detail.value
		})
		app.request.post({
			url:'business/nowTurnover',
			data:{
				shop_id:this.data.shop_id,
				time:this.data.date
			},
			success:(res)=>{
				this.setData({
					turnovermoney: res.turnover
				})
			}
		})
	},
	// 控制日收益显示隐藏
	istrues(){
		if(this.data.istrue == true){
			this.setData({
				istrue:false
			})
		}else{
			this.setData({
				istrue:true
			})
		}
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