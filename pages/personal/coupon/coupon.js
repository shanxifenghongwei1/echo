const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		page:1
  },
	run(){
		wx.switchTab({
			url: '/pages/personal/person/person',
		})
	},
	init() {
    app.request.post({
			url: "virtual/getMyCardList",
      isLoading: true,
      data: {
				page:this.data.page
      },
      success:(e) => {
				if(e.state==2){
				this.setData({
					state:e.state,
					msg:e.msg
				})
				}
				if(e.state==1){
					this.setData({
						vi_list: e.virtual
					})
				}
			
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		app.setNavigationBarTitle("我的券包");
		console.log(options)
		// if (!options.sign){
		// 	this.setData({
		// 		card_id:0
		// 	})
		// }
		// 	let huser_id = options.huser_id
		// 	let idd = options.card_id
		// 	let sign = options.sign
		// 	this.setData({
		// 		card_id: options.card_id
		// 	})
		if (wx.getStorageSync('user_id')){	
			this.init();
		}
  },
  shiyong(e) {
    wx.reLaunch({
			url: '/pages/personal/coupon/mycoupon/mycoupon?joinpage=1&shop_name=' + e.currentTarget.dataset.shop_name + '&titlie=' + e.currentTarget.dataset.card_name + '&card_sn=' + e.currentTarget.dataset.card_sn + '&qr_code=' + e.currentTarget.dataset.qr_code + '&card_id=' + e.currentTarget.dataset.card_id + '&sign=' + e.currentTarget.dataset.sign
    })
		this.setData({
			card_id: e.currentTarget.dataset.card_id
		})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
		
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.dengluzt();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})