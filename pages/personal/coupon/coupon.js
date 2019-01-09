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
	init(idd, huser_id) {
    // wx.request({
    // 	url: 'https://www.sdhcnet.com/api/virtual/index',
    // 	data:{
    // 			user_id:11,
    // huser_id: this.data.user_id,
    // 	card_id: this.data.card_id
    // 	},
    // 	method:'POST',
    // 	success:(e)=>{
    // 		console.log(e)
    // 		this.setData({
    //       vi_list: e.data.virtual,
    //     })
    // 	}
    // })
	
    app.request.post({
      url: "virtual/index",
      isLoading: true,
      data: {
        huser_id:huser_id,
        card_id:idd
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
		let huser_id = options.huser_id
		let idd = options.card_id
		
    this.setData({
      card_id: options.card_id
    })
		this.init(idd, huser_id);
  },
  shiyong(e) {
    wx.reLaunch({
	
      url: '/pages/personal/coupon/mycoupon/mycoupon?shop_name=' + e.currentTarget.dataset.shop_name + '&titlie=' + e.currentTarget.dataset.card_name + '&card_sn=' + e.currentTarget.dataset.card_sn + '&qr_code=' + e.currentTarget.dataset.qr_code + '&card_id=' + e.currentTarget.dataset.card_id
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