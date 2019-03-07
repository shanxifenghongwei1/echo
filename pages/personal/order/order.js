// pages/order/order.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: 2,
		discu:false,
    order: [{
      text: '已完成',
      type_id: 1
    }, {
      text: '待支付',
      type_id: 2
    }, {
      text: '待评论',
      type_id: 4
    }, {
      text: '已取消',
      type_id: 3
    }],
    shop: [],
    state: '待评论',

    page: 1
  },
// 申请退款
	sqtk(e){
		console.log(e)
		this.setData({
			discu:true,
			orders_id:e.currentTarget.dataset.id
		})
	},
	// 输入的内容
	textar(e) {
		this.setData({
			textera: e.detail.value
		})
	},
// 提交申请
	adddiscuss(e){
		app.request.post({
			url: 'refund/refund',
			data:{ 
				order_id: this.data.orders_id,
				reason: this.data.textera
			},
			success:(res)=>{
				app.showtost(res.msg)
				if(res.state == 1 ){
					this.setData({
						discu: false
					})
				}
			}
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
			})
		}
	},
  // 商品删除的函数
  consolea(e) {
    let order_id = e.currentTarget.dataset.order_id
    let index = e.currentTarget.dataset.index
		var that = this
    wx.showModal({
      title: '提示',
      content: '确认删除订单吗？',
      showCancel: true,
      cancelText: '确认',
      confirmText: '取消',
      success: function(as) {
        if (as.cancel == true) {
          app.request.post({
            url: "order/delete_order",
            isLoading: true,
            data: {
              order_id: order_id, //"订单Id",
            },
            success: (res) => {
              if (res.state == 1) {
                app.showtost(res.msg)
                let a = that.data.shop
								console.log(a)
								a.splice(index,1)
								console.log(a)
                that.setData({
                  shop: a
                })
              } else if (res.state == 2) {
                app.showtost(res.msg)
              }
            }
          })
        }
      },
    })
  },

  addorderid: function(e) {
    this.setData({
      cid: e.currentTarget.dataset.id,
			page:1
    })
    this.init();
  },
  // 取消订单
  removeorderlist(e) {
		let order_id = e.currentTarget.dataset.order_id
		let index = e.currentTarget.dataset.index
		console.log(index)
		
		wx.showModal({
			title: '提示',
			content: '是否取消该订单？',
			success:(ass)=>{
				if (ass.confirm) {
					wx.showLoading({
						title: '正在取消',
						mask: true
					})
					app.request.post({
						url: "order/cancel_order",
						isLoading: true,
						data: {
							order_id: order_id, //"订单Id",
						},
						success: (res) => {
							wx.hideLoading()
							if (res.state == 1) {
								app.showtost('取消成功')
								let a = this.data.shop
								console.log(a)
								a.splice(index, 1)
								this.setData({
									shop: a
								})
							} else if (res.state == 2) {
								app.showtost(res.msg)
							}
						}
					})


				}
			}
		})

   
	
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.setNavigationBarTitle("我的订单");
  },
  storygoodslist(e) {
    this.setData({
      order_id: e.currentTarget.dataset.order_id,
    })

    var that = this

    function zhifu() {
      app.request.post({
        url: "pay/payShop",
        isLoading: true,
        data: {
          order_id: that.data.order_id, //"订单Id",
        },
        success: (e) => {
          wx.requestPayment({
            timeStamp: e.timeStamp,
            nonceStr: e.nonceStr,
            package: e.package,
            signType: e.signType,
            paySign: e.paySign,
            success: (res) => {
              app.request.post({
                url: "pay/editOrderStatus",
                isLoading: true,
                data: {
                  order_id: that.data.order_id, //"订单Id",
                },
                success: (e) => {
                  app.status.pay_order = 1
                  that.onLoad();
                }
              })
            }
          })
        }
      })
    }
    zhifu();



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  runjump(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/shop/details/details?goods_id=' + e.currentTarget.dataset.goods_id,
    })
  },
  runshop(e) {
    wx.navigateTo({
      url: '/pages/index/oddments/oddments?shop_id=' + e.currentTarget.dataset.shop_id,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
		let states = wx.getStorageSync('states')
		if(states == 1){
			this.setData({
				cid: states
			})
		}

    app.dengluzt()
    this.init();

  },

  init(cid) {
    app.request.post({
      url: "order/orderList",
      isLoading: true,
      data: {
        page: this.data.page,
        order_type: this.data.cid
      },
      success: (e) => {
        this.setData({
          shop: e.order,
          page: 1
        })
      }
    })
  },
  // 我的订单分页
  scrolltolower() {
    // if (this.prompt.getJudgePromptType()) {
    //   return;
    // }
    app.request.post({
      url: "order/orderList",
      data: {
        page: ++this.data.page,
        order_type: this.data.cid
      },
      success: (e) => {

        if (this.page == 1) {
          this.prompt.funPrompt({
            "type": "dataLoading"
          });
        }
        if (e.order.length == 0) {
          let type = "";
          if (this.page > 1) {
            type = "dataFinish";
          } else {
            let type = "dataNo";
          }
          this.prompt.funPrompt({
            "type": type
          });
          return;
        }

        let list = this.data.shop;

        if (list.length > 0) {
          list = list.concat(e.order);
        } else {
          list = e.order;
        }
        this.setData({
          shop: list
        })
      }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.scrolltolower();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})