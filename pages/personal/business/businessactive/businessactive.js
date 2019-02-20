// pages/personal/business/businessactive/businessactive.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    istrue: false,
    page: 1,
		runistrue:false,
		runpage:1,
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
// 活动分页
  addinit() {
    app.request.post({
      url: "activity/getBusinessActivityList",
      data: {
        shop_id: this.data.shop_id,
        page: ++this.data.page
      },
      success: (e) => {
        if (e.state == 1) {
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
				page: this.data.runpage
			},
			success: (e) => {
				this.setData({
					runmoney:e.return,
					runpage:1
				})
			}
		})
	},

	// 排队返现活动的显示隐藏
	runistru(){
		if(this.data.runistrue == true){
			this.setData({
				runistrue:false
			})
		}else{
			this.setData({
				runistrue:true
			})
		}
	},

	// 排队返现分页
	runactve(){
		app.request.post({
			url: "return/getBusinessReturnList",
			data: {
				shop_id: this.data.shop_id,
				page: ++this.data.runpage
			},
			success: (e) => {
				if(e.return.length > 0){
					this.setData({
						runmoney: this.data.runmoney.concat(e.return),
					})
				}else{
						app.showtost('没有更多啦')
				}
			}
		})
	},
	// 删除活动
	removeac(e){
		let index = e.currentTarget.dataset.index
		let abc = this.data.activity
wx.showModal({
	title: '重要提示',
	content: '确定要删除吗？',
	showCancel:true,
	success:(e)=>{
		if (e.confirm) { 
		
			abc.forEach((k, v) => {
				if (index == v) {
					this.setData({
						ac_id: k.ac_id
					})
				}
			})
			app.request.post({
				url: 'activity/deleteActivity',
				data: {
					ac_id: this.data.ac_id
				},
				success: (res) => {
					app.showtost(res.msg)
				}
			})
			abc.splice(index, 1)
			this.setData({
				activity: abc
			})
		} else if (e.cancel) {

		}
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