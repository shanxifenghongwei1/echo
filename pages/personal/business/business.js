// pages/personal/business/business.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1109507497,1637582812&fm=27&gp=0.jpg',
    autoplay:true,
    interval:2000,
    vertical:true,
    srcs: []
  },

  qrcode:function(){
  wx.scanCode({
    scanType:"qrCode",
    fail(){
      wx.showToast({
        title: '未识别到二维码',
        icon:"none",
        duration:3000
      })
    },
    success(res){
      wx.showToast({
        title: '识别成功',
        duration: 3000
      })
			app.request.post({
				url: "virtual/useVirtual",
				isLoading: true,
				data: {
					card_sn: res.result 
				},
				success: (e) => {

				}
			})			
    }
  })
  },

	init(myshop_id){
		app.request.post({
			url: "shopcenter/shopcentermsg",
			isLoading: true,
			data: { myshop_id: this.data.myshop_id},
			success: (e) => {
				console.log(e)
				this.setData({
					daymoney: e.daymoney,
					dayorder: e.dayorder
				})
			}
		})
// 广告
		app.request.post({
			url: "shopcenter/getad",
			isLoading: true,
			success: (res) => {
				this.setData({
					srcs:res
				})
			}
		})
	},
	switcher(){
		wx.navigateTo({
			url: '/pages/personal/business/switcher/switcher?myshop_id='+this.data.myshop_id,
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		app.setNavigationBarTitle("商户中心");
		let myshop_id = options.myshop_id
		this.init(myshop_id);
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