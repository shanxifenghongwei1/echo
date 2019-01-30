// pages/personal/business/businessdiscount/businessdiscount.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		page:1,
		istrue:true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			shop_id:options.shop_id
		})
	},
	hide(){
		if(this.data.istrue==true){
			this.setData({
				istrue: false
			})
		}else{
			this.setData({
				istrue: true
			})
		}
	
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	// 获取优惠券
init(){
	app.request.post({
		url: "virtual/getBusinessVirtualList",
		data:{
			shop_id:this.data.shop_id,
			page:this.data.page
		},
		success: (e) => {
				this.setData({
					virtual:e.virtual
				})
		}
	})
},


// 分页
	addinit() {
		app.request.post({
			url: "virtual/getBusinessVirtualList",
			data: {
				shop_id: this.data.shop_id,
				page: ++this.data.page
			},
			success: (e) => {
				if(e.state==2){
					this.setData({
						virtual: this.data.virtual
					})
				}else if(e.state==1){
					this.setData({
						virtual: this.data.virtual.concat(e.virtual)
					})
				}
			
			}
		})
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.init()
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
		this.addinit()
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})