// pages/recharge/recharge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		money:'20%' ,
		background:0
  },
  //点击选择银行卡

  checked_bank(e) {
    this.setData({
      background: e.currentTarget.dataset.id,
      bank_id: e.currentTarget.dataset.bank_id
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      conten: options.conten,
      payforid: options.payforid,
      shop_id: options.shop_id,
      ac_id: options.ac_id,
      zongyue: options.zongyue
    });
    this.mybanklist();
  },

  moneyinthis(e) {
		if(Number(e.detail.value)>=1){
			this.setData({
				usermoney: e.detail.value,
				money: Number(e.detail.value)*20/100+'元'
			})
		}else{
			wx.showToast({
				title: '最少输入1元哦',
			})
			this.setData({
				usermoney: e.detail.value
			})
		}
  },
  //我的银行卡
  mybanklist() {
    app.request.post({
      url: "cash/bankList",
      success: (e) => {
				console.log('拿到银行卡')
        console.log(e)
				if(this.data.payforid == 4){
					if (e.length == 0) {
						wx.switchTab({
							url: "/pages/personal/person/person",
							success: function () {
								wx.showToast({
									title: '请您先绑定银行卡',
									icon: 'none',
									duration: 3000,
									mask: true,
								})
							}
						})
					} else {
						this.setData({
							bank_list: e
						})
					}
				}

      }
    })
  },

  // 买单币活动充值
  mdbhdcz() {
		if (!this.data.usermoney){
					wx.showToast({
						title: '请输入金额',
					})
		} else  {
    wx.showToast({
      title: '正在提交',
      icon: 'success',
      duration: 2000,
      mask: true
    })
    app.request.post({
      url: "activity/joinnoblecard",
      data: {
        ac_id: this.data.ac_id,
        business_id: this.data.shop_id,
        money: this.data.usermoney
      },
      success: (e) => {
        wx.requestPayment({
          timeStamp: e.timeStamp,
          nonceStr: e.nonceStr,
          package: e.package,
          signType: e.signType,
          paySign: e.paySign,
          success: (res) => {
            // console.log(res)
            app.request.post({
              url: "activity/valimdb",
              data: {
                type: e.type,
                desc_sn: e.desc_sn,
                ac_id: this.data.ac_id
              },
              success: (e) => {
                // console.log(e)
                wx.navigateBack({
                  url: 'shop_id=' + this.data.shop_id,
                  success: () => {
                    wx.showToast({
                      title: '充值成功',
                      duration: 3000,
                      icon: 'success'
                    })
                  }
                })
              }
            })
          },
          fail: (sb) => {
            app.request.post({
              url: "activity/valimdb",
              data: {
                type: e.type,
                desc_sn: e.desc_sn,
                pay_state: 2,
                ac_id: this.data.ac_id
              },
              success: (sbyh) => {
                wx.showToast({
									title: '充值失败',
									icon:'none'
								})
              }
            })
          }
        })
      }
    })
		}
  },
  // 买单币充值
  mdbcz() {
		if (!this.data.usermoney) {
			wx.showToast({
				title: '请输入金额',
				icon: 'none'
			})
		}else{
			wx.showToast({
				title: '正在提交',
				icon: 'success',
				duration: 2000,
				mask: true
			})
    app.request.post({
      url: "activity/joinnoblecard",
      data: {
        business_id: this.data.shop_id,
        money: this.data.usermoney
      },
      success: (e) => {
        wx.requestPayment({
          timeStamp: e.timeStamp,
          nonceStr: e.nonceStr,
          package: e.package,
          signType: e.signType,
          paySign: e.paySign,
          success: (wer) => {
            app.request.post({
              url: "activity/valimdb",
              data: {
                type: e.type,
                desc_sn: e.desc_sn
              },
              success: (e) => {
                wx.navigateBack({
                  url: 'shop_id=' + this.data.shop_id,
                  success: () => {
                    wx.showToast({
                      title: '充值成功',
                      duration: 3000,
                      icon: 'success'
                    })
                  }
                })
              }
            })
          },
          fail: (sb) => {
            app.request.post({
              url: "activity/valimdb",
              data: {
                type: e.type,
                desc_sn: e.desc_sn,
                pay_state: 2,
                ac_id: ''
              },
              success: (sbyh) => {
								wx.showToast({
									title: '充值失败',
									icon: 'none'
								})
              }
            })
          }
        })
      }
    })
		}
  },
  // yecz
  xjcz() {
		if (!this.data.usermoney) {
			wx.showToast({
				title: '请输入金额',
				icon: 'none'
			})
		}else{
			wx.showToast({
				title: '正在提交',
				icon: 'success',
				duration: 2000,
				mask: true
			})
    app.request.post({
      url: "activity/re_money",
      data: {
        money: this.data.usermoney
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
              url: "activity/valire_money",
              data: {
                desc_sn: e.desc_sn
              },
              success: (e) => {
                wx.switchTab({
                  url: '/pages/personal/person/person',
                  success: () => {
                    wx.showToast({
                      title: '充值成功',
                      duration: 3000,
                      icon: 'success'
                    })
                  }
                })
              }
            })
          },
          fail: (sb) => {
            app.request.post({
							url: "activity/valire_money",
              data: {
                type: e.type,
                desc_sn: e.desc_sn,
                pay_state: 2
              },
              success: (sbyh) => {
                wx.showToast({
									title: '充值失败',
									icon:'none'
								})
              }
            })
          }

        })
      }
    })
		}
  },
  // 余额提现
  // yetx() {
	// 	if (!this.data.usermoney) {
	// 		wx.showToast({
	// 			title: '请输入金额',
	// 			icon: 'none'
	// 		})
	// 	}else{
	// 		wx.showToast({
	// 			title: '正在提交',
	// 			icon: 'success',
	// 			duration: 3000,
	// 			mask: true
	// 		})
  //   app.request.post({
  //     url: "activity/joinnoblecard",
  //     data: {
  //       business_id: this.data.shop_id,
  //       money: this.data.usermoney
  //     },
  //     success: (e) => {
  //       wx.requestPayment({
  //         timeStamp: e.timeStamp,
  //         nonceStr: e.nonceStr,
  //         package: e.package,
  //         signType: e.signType,
  //         paySign: e.paySign,
  //         success: (wer) => {
  //           app.request.post({
  //             url: "activity/valimdb",
  //             data: {
  //               type: e.type,
  //               desc_sn: e.desc_sn
  //             },
  //             success: (e) => {
  //               wx.navigateBack({
  //                 url: 'shop_id=' + this.data.shop_id,
  //                 success: () => {
  //                   wx.showToast({
  //                     title: '充值成功',
  //                     duration: 3000,
  //                     icon: 'success'
  //                   })
  //                 }
  //               })
  //             }
  //           })
  //         },
  //         fail: (sb) => {
  //           app.request.post({
  //             url: "activity/valimdb",
  //             data: {
  //               type: e.type,
  //               desc_sn: e.desc_sn,
  //               pay_state: 2,
  //               ac_id: ''
  //             },
  //             success: (sbyh) => {
	// 							wx.showToast({
	// 								title: '充值失败',
	// 								icon: 'none'
	// 							})
  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
	// 	}
  // },
  // yetx
  xjtx() {
		if (!this.data.usermoney) {
			wx.showToast({
				title: '请输入金额',
				icon:'none'
			})
		}else{
			wx.showToast({
				title: '正在提交',
				icon: 'none',
				duration: 2000,
				mask: true
			})
    app.request.post({
      url: "cash/cash",
      data: {
        cash_money: this.data.usermoney,
        bank_id: this.data.bank_id
      },
      success: (e) => {
          console.log(e)
					if(e.msg==1){
						wx.switchTab({
							url: '/pages/personal/person/person',
							success: function () {
								wx.showToast({
									title: '申请成功',
									duration:2000
								})
							}
						})	
					}else{
						wx.showToast({
							title: '失败了，请您检查网络后再试',
							duration: 2000
						})
					}
						
      },
      fail: (sb) => {

      }
    })
		}
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