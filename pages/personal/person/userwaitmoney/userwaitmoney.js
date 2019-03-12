// pages/personal/person/userwaitmoney/userwaitmoney.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    istrue: false,
    inputtext: '',
    able: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.business_id) {
      this.setData({
        business_id: options.business_id,
        shanghu: true
      })

    }
    this.setData({
      zongyue: Number(options.zongyue),

    })
    this.init()
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

  },
  init() {
    app.request.post({
      url: "cash/bankList",
      success: (e) => {
        this.setData({
          blankCard: e.list,
          numbers: e.list[0].number,
          type: e.list[0].type,
          cid: e.list[0].id,
          cash_ratio: e.cash_ratio
        })
      }
    })
  },
  // 点击切换银行卡
  setcid(e) {
    this.setData({
      cid: e.currentTarget.dataset.cid,
      numbers: e.currentTarget.dataset.numbers,
      type: e.currentTarget.dataset.type,
      istrue: false
    })
  },
  // 全部提现
  any_go() {
    this.setData({
			inputtext: (Number(this.data.zongyue) - this.data.zongyue * 3 / 100).toFixed(2),
      usertext: (Number(this.data.zongyue) * this.data.cash_ratio / 100).toFixed(2),
    })
  },
  // 输入的内容
  inputtap(e) {
		e.detail.value = e.detail.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		e.detail.value = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
		if (e.detail.value.indexOf(".") < 0 && e.detail.value != "") {
			e.detail.value = parseFloat(e.detail.value);
		} else if (e.detail.value.indexOf(".") == 0) {
			e.detail.value = e.detail.value.replace(/[^$#$]/g, "0.");
			e.detail.value = e.detail.value.replace(/\.{2,}/g, ".");
		}
		this.setData({
			inputtext: e.detail.value,
			usertext: (Number(e.detail.value) * this.data.cash_ratio / 100).toFixed(2)
		})

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  text() {
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
  // 点击充值
  submits() {

    if (this.data.inputtext < 10) {
      app.showtost('最少提现金额为10元')
    } else {

      app.request.post({
        url: "cash/cash",
        data: {
          cash_money: this.data.inputtext,
          bank_id: this.data.cid,
          business_id: this.data.business_id,
        },
        success: (e) => {
          console.log(e)
          if (e.state == 1) {
            wx.switchTab({
              url: '/pages/personal/person/person',
              success: function() {
                setTimeout(() => {
                  wx.showToast({
                    title: '申请成功',
                    duration: 2000
                  })
                }, 1000)
              }
            })
          } else {
            setTimeout(() => {
              wx.showToast({
                title: e.msg,
                icon: 'none',
                duration: 2000
              })
            }, 1000)

          }

        }
      })
    }
  },

  // 商家提现
  // shop_submits(){
  // 	app.request.post({
  // 		url: "cash/cash",
  // 		data: {
  // 			cash_money: this.data.usermoney,
  // 			bank_id: this.data.bank_id,
  // 			business_id: this.data.business_id
  // 		},
  // 		success: (e) => {
  // 			console.log(e)
  // 			if (e.state == 1) {
  // 				wx.switchTab({
  // 					url: '/pages/personal/person/person',
  // 					success: function () {
  // 						setTimeout(() => {
  // 							wx.showToast({
  // 								title: '申请成功',
  // 								duration: 2000
  // 							})
  // 						}, 1000)
  // 					}
  // 				})
  // 			} else {
  // 				setTimeout(() => {
  // 					wx.showToast({
  // 						title: e.msg,
  // 						icon: 'none',
  // 						duration: 2000
  // 					})
  // 				}, 1000)

  // 			}

  // 		},
  // 		fail: (sb) => {

  // 		}
  // 	})
  // },
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