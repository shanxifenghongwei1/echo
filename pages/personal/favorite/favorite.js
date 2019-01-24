// pages/personal/favorite/favorite.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: app,
    lovelist:[],
    page:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  init() {
    app.request.post({
      url: "collection/collectList",
      isLoading: true,
      success: (e) => {
        this.setData({
          lovelist:e
        })
      }
    });
  },
 
  onLoad: function(options) {
		app.setNavigationBarTitle("我的收藏");
    this.init();
   
  },

  onShow: function() {
    
   
  },
	runingoods(e){
		wx.redirectTo({
			url: '/pages/shop/details/details?goods_id=' + e.currentTarget.dataset.goods_id
		})
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
    this.getcoupon();
  },
  getcoupon() {

    if (this.prompt.getJudgePromptType()) {
      return;
    }
    app.request.post({
      url: "collection/collectList",
      // isLoading: true,
      data: {
        page: ++this.data.page
      },
      success: (res) => {

        if (this.data.page == 1) {
          this.prompt.funPrompt({
            "type": "dataLoading"
          });
        }
        if (res.length == 0) {
          let type = "";
          if (this.data.page > 1) {
            type = "dataFinish";
          } else {
            let type = "dataNo";
          }
          this.prompt.funPrompt({
            "type": type
          });
          return;
        }
        let list = this.data.lovelist;
        if (list.length > 0) {
          list = list.concat(res);
        } else {
          list = res;
        }
        this.setData({
          lovelist: this.data.my_coupon.concat(res),
          dataLmy_coupon: list
        })

      }
    })
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