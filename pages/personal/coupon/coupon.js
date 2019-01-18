const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
	run(){
		wx.switchTab({
			url: '/pages/personal/person/person',
		})
	},
	init(idd, huser_id, sign) {
    app.request.post({
      url: "virtual/index",
      isLoading: true,
      data: {
        huser_id:huser_id,
        card_id:idd,
				sign: sign
      },
      success:(e) => {
				this.setData({
          vi_list: e.virtual,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		console.log(app.status.dengluzhuangtai+'登录状态的值')
		console.log(options)
		if (!options.sign){
			this.setData({
				card_id:0
			})
		}
			let huser_id = options.huser_id
			let idd = options.card_id
			let sign = options.sign
			this.setData({
				card_id: options.card_id
			})

		if (wx.getStorageSync('user_id')){	
			this.init(idd, huser_id, sign);
		}
		
		

  },
  shiyong(e) {
    wx.reLaunch({
			url: '/pages/personal/coupon/mycoupon/mycoupon?shop_name=' + e.currentTarget.dataset.shop_name + '&titlie=' + e.currentTarget.dataset.card_name + '&card_sn=' + e.currentTarget.dataset.card_sn + '&qr_code=' + e.currentTarget.dataset.qr_code + '&card_id=' + e.currentTarget.dataset.card_id + '&sign=' + e.currentTarget.dataset.sign
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