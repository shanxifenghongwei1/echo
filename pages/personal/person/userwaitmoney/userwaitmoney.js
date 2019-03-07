// pages/personal/person/userwaitmoney/userwaitmoney.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    istrue: false,
    inputtext: 0.0,
    able: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
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
      values: Number(this.data.zongyue),
      usertext: (Number(this.data.zongyue) * this.data.cash_ratio / 100).toFixed(2),
      inputtext: this.data.zongyue
    })
  },
  // 输入的内容
  inputtap(e) {
    let obj = e.detail
    this.only_num(obj)
    this.setData({
      inputtext: Number(obj.value),
      usertext: (Number(obj.value) * this.data.cash_ratio / 100).toFixed(2)
    })

  },
  only_num(obj) {　　 //得到第一个字符是否为负号
    　　
    var num = obj.value.charAt(0);　　 //先把非数字的都替换掉，除了数字和.
    　　
    obj.value = obj.value.replace(/[^\d\.]/g, '');　　 //必须保证第一个为数字而不是.
    　　
    obj.value = obj.value.replace(/^\./g, '');　　 //保证只有出现一个.而没有多个.
    　　
    obj.value = obj.value.replace(/\.{2,}/g, '.');　　 //保证.只出现一次，而不能出现两次以上
    　　
    obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');　　 //如果第一位是负号，则允许添加
    　　
    if (num == '-') {　　　　
      obj.value = '-' + obj.value;　　
    }

    return obj

    　　
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