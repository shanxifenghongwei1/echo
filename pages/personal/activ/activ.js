// pages/personal/activ/activ.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listM: 100,
    listN: 20,
    listS: '动物园门票',
    src: [{
      src: '/images/test/pic7.png'
    }, {
      src: '/images/test/pic7.png'
    }, {
      src: '/images/test/pic7.png'
    }, {
      src: '/images/test/pic7.png'
    }],
    mode: 'aspectFit',
		my_active:[],
		cid:7,
		page:1,
		order: [{ text: '排队返现', type_id: 7 }, { text: '充值活动', type_id: 4 }, { text: '支付活动', type_id: 1 }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.setNavigationBarTitle("活动明细");
  },
	addorderid: function (e) {
		this.setData({
			cid: e.currentTarget.dataset.id
		})
		this.init();
	},
  exchange:function(e){
    console.log(e)
  },
  init() {
    app.request.post({
      url: "return/index",
      isLoading: true,
      data: {
        return_type:this.data.cid,
				page:this.data.page
      },
      success: (e) => {
				if(e.state == 1){
					this.setData({
						my_active:e.return_cash,
						page:1
					})
				}
				if(e.state==2){
          app.showtost(e.msg);
          this.setData({
            page: 1,
						my_active: []
          })
				}
      }
    })
  },
	initii(){
		app.request.post({
			url: "return/index",
			isLoading: true,
			data: {
				return_type: this.data.cid,
				page: ++this.data.page
			},
			success: (e) => {
				if (e.state == 1) {
					this.setData({
						my_active: this.data.my_active.concat(e.return_cash),
					})
				}
				if (e.state == 2) {
					app.showtost(e.msg);
          this.setData({
            page: 1
          })
				}
			}
		})
	},
	goshop(e){
			wx.navigateTo({
				url: '/pages/index/oddments/oddments?shop_id='+ e.currentTarget.dataset.id,
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
    this.init();
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
		this.initii()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
   
  }
})