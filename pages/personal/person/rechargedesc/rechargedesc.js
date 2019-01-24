// pages/personal/person/rechargedesc/rechargedesc.js
const app = getApp();
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
		app.setNavigationBarTitle('账单明细')
		let desc_sn = options.desc_sn
		let key = options.type
		this.init(desc_sn, key);
  },

  // nazhua: function () {
  //   wx.showToast({
  //     title: '请联系拿抓官方客服哟！',
  //     icon: 'none',
  //     duration: 2000,
  //   })
  // },

callshop:function(e){
  wx.makePhoneCall({
    phoneNumber: e.currentTarget.dataset.iphone,
  })
},

	init(desc_sn,key){
  app.request.post({
      url: "user/mybilldesc",
			isLoading:true,
      data: {
				key: key,
				desc_sn: desc_sn
      },
      success: (e) => {
				if(e.state == 2){
						app.navigateback({
								success:()=>{
									setTimeout(()=>{
										wx.showToast({
											title: e.msg,
											icon: 'none',
											duration: 1000
										})
									},1000)
						}
						})
				}else{
					this.setData({
						es: e
					})
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