// pages/personal/business/productcenter/productcenter.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		banner:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		app.setNavigationBarTitle("产品中心");
		this.setData({
			myshop_id: options.myshop_id
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
		this.init()
	
	},
	init(){
		app.request.post({
			url: "merchant/bygoods",
			isLoading: true,
			data: {
				shangjiaid: this.data.myshop_id
			},
			success: (e) => {
				this.setData({
					goods_list:e.goods
				})
			}
		})
	},


	// 删除商品
	removeproduct(e){
			let goods_id = e.currentTarget.dataset.id
			let index = e.currentTarget.dataset.index
		app.del_msg({
			t:'删除商品',
			c:'确认删除吗？',
			s:(res)=>{
				if (res.confirm) {
					app.request.post({
						url: "shopcenter/delgoods",
						isLoading: true,
						data: {
							goods_id: goods_id
						},
						success: (res) => {
							app.showtost('删除成功')
							let a = this.data.goods_list
							a.splice(index, 1)
							this.setData({
								goods_list: a
							})
						}
					})
				}
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