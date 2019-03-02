// pages/personal/business/moneyback/moneyback.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		istrue:false,
		discu: false,
		page:1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			shop_id:options.shop_id
		})
	},
	// 输入的内容
	textar(e) {
		this.setData({
			textera: e.detail.value
		})
	},
	// 关闭打开回复框
	discuss(e) {
		if (this.data.discu == true) {
			this.setData({
				discu: false,
			})
		} else {
			this.setData({
				discu: true,
				ids_user:e.currentTarget.dataset.ids
			})
		}
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},
	// 获得条目、
	init() {
		app.request.post({
			url: 'refund/getShopRefund',
			data: {
				shop_id:this.data.shop_id,
				page: this.data.page
			},
			success: (res) => {
				this.setData({
					refund:res.refund,
					// time: app.formatTimeTwo(res.refund.d_time, 'Y/M/D h:m:s')
				})
			}
		})
	},

//商家审核
//business_confirm 1：通过审核 2 驳回 
	adddiscuss(){
		console.log(this.data.ids_user)
		app.request.post({
					url: 'refund/businessConfirm',
					data: {
						refund_id: this.data.ids_user,
						business_confirm:1,
						reply: this.data.textera
					},
					success: (res) => {
						app.showtost(res.msg)
						if(res.state==1){
							this.setData({
								discu:false
							})
						}
					}
				})
	},
// 驳回
	i_dont_agree(){
		app.request.post({
			url: 'refund/businessConfirm',
			data: {
				refund_id: this.data.ids_user,
				business_confirm: 2,
				reply: this.data.textera
			},
			success: (res) => {
				app.showtost(res.msg)
				if (res.state == 1) {
					this.setData({
						discu: false
					})
				}
			}
		})
	},

	// 点谁谁出现
	look_detailed(e){
		if (e.currentTarget.dataset.id == this.data.cid){
				this.setData({
					cid:0
				})
		}else{
			this.setData({
				cid: e.currentTarget.dataset.id
			})
		}

	},
	// 分页
	inits() {
		app.request.post({
			url: 'refund/getShopRefund',
			data: {
				shop_id: this.data.shop_id,
				page: ++ this.data.page
			},
			success: (res) => {
				if(res.state == 1){
				this.setData({
					refund:this.data.refund.concat(res.refund),
					// time: app.formatTimeTwo(res.refund.d_time, 'Y/M/D h:m:s')
				})
				}else{
					app.showtost('没有更多啦')
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
		this.inits()
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})