// pages/personal/business/businessactive/businessactive.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    istrue: false,
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      shop_id: options.shop_id
    })

  },

  // 获取活动
  init() {
    app.request.post({
      url: "activity/getBusinessActivityList",
      data: {
        shop_id: this.data.shop_id,
        page: this.data.page
      },
      success: (res) => {
        this.setData({
          activity: res.activity,
          page: 1
        })
      }
    })
  },

  addinit() {
    app.request.post({
      url: "activity/getBusinessActivityList",
      data: {
        shop_id: this.data.shop_id,
        page: ++this.data.page
      },
      success: (e) => {
        if (state == 1) {
          this.setData({
            activity: this.data.activity.concat(e.activity)
          })
        } else {
          app.showtost('没有更多')
        }
      }
    })
  },

  // 活动隐藏
  activ() {
    if (this.data.istrue == true) {
      this.setData({
        istrue: false
      })
    } else {
      this.setData({
        istrue: true
      })
    }
  },

	// 排队返现活动
	inits(){
		app.request.post({
			url: "return/getBusinessReturnList",
			data: {
				shop_id: this.data.shop_id,
				page: 1
			},
			success: (e) => {
					console.log(e)
			}
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
    this.init()
		this.inits()
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