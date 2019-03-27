const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: app,
    areyouok: 1,
    orderType: 0, //订单支付方式  1.店铺下单  2.商品下单
    order_money: 0,
    boolIntegration: false,
    ischecked: false,
    myisclo: true,
    iloveyou: 3,
    card_id: 0,
    userCanLook: 0,
    textcenter: false,
    // payformoney:0,
    hidden: true,
    youhuitext: '',
    radioItems: [{
        name: '微信支付',
        value: '9'
      },
      {
        name: '余额支付',
        value: '6'
      },
      {
        name: '买单币支付',
        value: '3',
        checked: 'true'
      }
    ]
  },
  //商品 数量加
  add_number() {
    this.setData({
      goods_number: ++this.data.goods_number,
      sure_pay: (this.data.goods_price * this.data.goods_number).toFixed(2)
    })
    this.meedUserSee()
  },
  // 商品数量
  goods_number(e) {
    this.setData({
      goods_number: e.detail.value,

    })
  },
  // 商品数量减少
  subtract_number() {
    if (this.data.goods_number >= 2) {
      this.setData({
        goods_number: this.data.goods_number - 1,
        sure_pay: (this.data.goods_price * this.data.goods_number).toFixed(2)
      })
    }
    this.meedUserSee()
  },
  // 选择支付方式
  radioChange: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
        this.setData({
          iloveyou: this.data.radioItems[i].value
        })
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
    if (this.data.order_type == 1) {
      this.shop_user_look()
    } else if (this.data.order_type == 2) {
      this.meedUserSee()
    }
  },
  // 点击传优惠券内容
  givemoneytome(e) {
    this.setData({
      youhuitext: e.currentTarget.dataset.id,
      virtual: e.currentTarget.dataset.ac,
      shop_id: e.currentTarget.dataset.shop,
      reduce_money: e.currentTarget.dataset.moneys,
      textcenter: false,
      ischecked: true,
    })
    this.shop_user_look()
  },
  // 优惠券点击弹出列表
  runjumpthis() {
    this.setData({
      textcenter: true
    })
  },
  // 获取用户手机号
  getPhoneNumber: function(e) {
    var that = this
    if (this.data.code.length < 0) {
      wx.login({
        success: function(res) {
          var code = res.code;
          that.setData({
            code: code,
          })
        }
      });
    } else {
      if (e.detail.encryptedData.length > 0) {
        var that = this;
        //发起请求解密手机号
        app.request.post({
          url: "user/getiphone",
          data: {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            code: this.data.code,
          },
          success: (as) => {
            console.log(as);
            if (as.msg !== 1) {
              wx.showModal({
                title: '获取失败',
                content: '您的状态已过期了哟请重新授权',
              })
              wx.login({
                success: function(res) {
                  var code = res.code;
                  that.setData({
                    code: code,
                  })
                }
              });
            } else {
              wx.showModal({
                title: '成功',
                content: '小拿抓将为您提供更多优质服务!',
              })
              wx.setStorageSync('iphone', as.phone_type)
              that.setData({
                hidden: false,
              })
            }
          }
        })
      }
    }
  },
  // 关闭优惠券
  closessa() {
    this.setData({
      textcenter: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 获取用户手机号
    wx.login({
      success: (res) => {
        var code = res.code;
        this.setData({
          code: code,
        })
      }
    });

    let a = wx.getStorageSync('iphone')
    console.log('这是' + a)
    if (a == 1) {
      this.setData({
        hidden: false
      })
    }


    app.setNavigationBarTitle("支付");
    console.log(options)
    if (!options.card_id) {
      this.setData({
        card_id: 0
      })
    } else {
      this.setData({
        card_id: options.card_id,
      })
    }
    this.setData({
      order_money: options.order_money,
      order_id: options.order_id,
      shop_image: options.shop_image,
      shop_id: options.shop_id,
      order_type: options.order_type,
      shop_name: options.shop_name,
      goods_image: options.goods_image,
      goods_keywords: options.goods_keywords,
      goods_name: options.goods_keywords,
      goods_number: options.goods_number,
      goods_price: options.goods_price,
      act_name: options.act_name
      // goods_moneypay: Number(this.data.goods_number) * Number(this.data.goods_price)
    })
    this.init(options);
    this.user_exch()
    if (options.order_type == 2) {
      this.meedUserSee()
    }


  },
  onShow: function() {
    this.getusershopvirtual()
  },

  // 不选择
  nohave_exchange() {
    this.setData({
      youhuitext: '',
      textcenter: false,
      ischecked: false,
      virtual: 0
    })
    this.shop_user_look()
  },

  // 获取优惠券
  getuservirtual() {
    app.request.post({
      url: "virtual/getMyVirtualList",
      // isLoading: true,
      data: {
        shop_id: this.data.shop_id,
        money: Number(this.data.payformoney),
        page: 1
      },
      success: (res) => {
        if (res.state == 1) {
          this.setData({
            uservirtual: res.virtual
          })
          if (res.virtual.length == 0) {
            this.setData({
              ischecked: false,
              uservirtual: [],
              virtual: 0,
              youhuitext: ''
            })
          }
        } else if (res.state == 2) {
          this.setData({
            ischecked: false,
            uservirtual: [],
            virtual: 0,
            youhuitext: ''
          })
          // app.showtost(res.msg)
        }

      }
    })
  },
  // 阅读并同意用户协议
  checkboxChange(e) {
    this.setData({
      areyouok: e.detail.value.length
    })
  },
  getusershopvirtual() {
    app.request.post({
      url: "virtual/getMyVirtualList",
      // isLoading: true,
      data: {
        shop_id: this.data.shop_id,
        money: Number(this.data.a_pa_money),
        page: 1
      },
      success: (res) => {
        if (res.state == 1) {
          this.setData({
            uservirtual: res.virtual
          })
          if (res.virtual.length == 0) {
            this.setData({
              ischecked: false,
              virtual: 0,
              youhuitext: ''
            })
          }
        } else if (res.state == 2) {
          // app.showtost(res.msg)
        }

      }
    })
  },
  // 输入框输入多少钱？
  shurumoney(e) {

    e.detail.value = e.detail.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    e.detail.value = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    if (e.detail.value.indexOf(".") < 0 && e.detail.value != "") {
      e.detail.value = parseFloat(e.detail.value);
    } else if (e.detail.value.indexOf(".") == 0) {
      e.detail.value = e.detail.value.replace(/[^$#$]/g, "0.");
      e.detail.value = e.detail.value.replace(/\.{2,}/g, ".");
    }

    if (Number(e.detail.value) < Number(this.data.act_name)) {
      wx.showToast({
        title: '该活动充值最少充值' + this.data.act_name + '元',
        icon: 'none'
      })
    } else {
      if (this.data.dis.id != 0) {
        this.setData({
          payformoney: e.detail.value,
        })
      }
    }

    this.setData({
      payformoney: e.detail.value,
    })
    this.getuservirtual()
    this.shop_user_look()
  },

  // 商品*--*需要显示的钱数{}

  meedUserSee(price) {
    app.request.post({
      url: 'pay/calcu_price',
      data: {
        price: this.data.goods_price * this.data.goods_number,
        type: this.data.iloveyou,
        business_id: this.data.shop_id
      },
      success: (res) => {
        this.setData({
          userCansee: res.price,
          integralUS: res.integral,
          qwert: res.dis,
          sure_pay: (this.data.goods_price * this.data.goods_number).toFixed(2)
        })
      }
    })
  },

  // 店铺支付需要显示的钱数目
  shop_user_look() {
    if (this.data.payformoney == '') {
      this.setData({
        payformoney: 0
      })
    }
    app.request.post({
      url: 'pay/calcu_price',
      data: {
        price: this.data.payformoney,
        type: this.data.iloveyou,
        business_id: this.data.shop_id,
        virtual_id: this.data.virtual
      },
      success: (res) => {
        this.setData({
          userCanLook: res.price,
          integralS: res.integral
        })
      }
    })
  },

  // 用户身上的买单币///or/余额
  init(options) {
    app.request.post({
      url: "pay/getUserMoney",
      isLoading: true,
      data: {
        shop_id: options.shop_id
      },
      success: (res) => {
        this.setData({
          pay_bill: res.pay_bill,
          user_money: res.user_money,

        })
      }
    })
  },
  // 商家支付
  shangjiapay(pop) {
    if (this.data.payformoney < 1) {
      app.showtost('最少支付一元')
    } else if (this.data.payformoney) {
      wx.showLoading({
        title: '正在验证金额',
        mask: true
      })
      app.request.post({
        url: "pay/Wx_Shop_pay",
        // isLoading: true,
        data: {
          discount_id: this.data.dis.id,
          order_number: 1, //"订单数量",
          order_money: this.data.payformoney, //"支付的金额",
          order_type: this.data.order_type,
          shop_id: this.data.shop_id,
          pay_mode: this.data.iloveyou,
          virtual_id: this.data.virtual
        },
        success: (e) => {
          if (e.state !== 1) {
            wx.hideLoading({
              success: (pppp) => {
                let t = '失败'
                let c = e.msg
                app.showmodal(t, c);
              }
            })
            return false;
          }
          if (e.pay_mode == 9) {
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
                    order_id: e.order_id, //"订单Id",
                    virtual_id: this.data.virtual
                  },
                  success: (e) => {
                    wx.setStorageSync('states', 1)
                    wx.switchTab({
                      url: '/pages/personal/order/order?states=1',
                      success: function() {
												wx.hideLoading({
													success: () => {
														setTimeout(() => {
															wx.showToast({
																title: '支付成功',
																mask: true,
																icon: 'success',
																duration: 2000,
															})
														}, 500)
													}
												})
                      }
                    })

                  }
                })
              },
              fail: () => {


                app.request.post({
                  url: 'order/del_order',
                  data: {
                    order_id: e.order_id
                  },
                  success: (led) => {
                    if (led.state == 1) {
                      wx.showToast({
                        title: '取消支付',
                        icon: 'none'
                      })
                    }
                  }
                })



              }
            })
          } else {
            app.request.post({
              url: "pay/editOrderStatus",
              // isLoading: true,
              data: {
                formid: pop.detail.formId,
                order_id: e.order_id, //"订单Id",
                pay_mode: e.pay_mode,
                virtual_id: this.data.virtual
              },
              success: (e) => {
                wx.setStorageSync('states', 1)
                wx.switchTab({
                  url: '/pages/personal/order/order',
                  success: () => {
                      wx.hideLoading({
                        success: () => {
                          setTimeout(() => {
                            wx.showToast({
                              title: '支付成功',
															mask:true,
                              icon: 'success',
                              duration: 2000,
                            })
                          }, 500)
                        }
                      })
                  }
                })


              }
            })
          }

        }
      })
      // Number(this.data.payformoney) <= Number(this.data.pay_bill)
    } else {
      wx.showToast({
        title: '金额不能为空',
        icon: 'none'
      })
    }
  },
  // 商品支付
  payClick() {
    var that = this

    function zhifu() {
      app.request.post({
        url: "pay/Wx_pay",
        isLoading: true,
        data: {
          discount_id: that.data.dis.id,
          order_id: that.data.order_id, //"订单Id",
          order_number: that.data.goods_number, //"订单数量",
          order_money: that.data.userCansee, //"支付的金额",
          virtual_id: that.data.virtual,
          order_type: that.data.order_type,
          pay_mode: that.data.iloveyou,
        },
        success: (e) => {
          if (e.state !== 1) {
            let t = '失败'
            let c = e.msg
            app.showmodal(t, c);
            return false;
          }
          if (e.pay_mode == 9) {
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
                    wx.setStorageSync('states', 1)
                    wx.switchTab({
                      url: '/pages/personal/order/order?',
                      success: function() {
                        setTimeout(() => {
                          app.showtost('支付成功')
                        }, 200)
                      }
                    })
                  }
                })
              },
              fail: () => {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none'
                })
              }
            })
          } else {
            app.request.post({
              url: "pay/editOrderStatus",
              isLoading: true,
              data: {
                order_id: that.data.order_id, //"订单Id",
                pay_mode: e.pay_mode,
                virtual_id: that.data.virtual
              },
              success: (e) => {
                wx.setStorageSync('states', 1)
                wx.switchTab({
                  url: '/pages/personal/order/order',
                  success: () => {
                    wx.setStorageSync('states', 1)
                    wx.switchTab({
                      url: '/pages/personal/order/order?',
                      success: function() {
                        setTimeout(() => {
                          app.showtost('支付成功')
                        }, 300)
                      }
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
    zhifu();



  },
  // 获取用户折扣限度
  user_exch() {
    app.request.post({
      url: 'order/get_dis',
      data: {
        business_id: this.data.shop_id
      },
      success: (res) => {
        if (res.dis) {
          this.setData({
            dis: res.dis,
            qwert: res.dis.dis_number
          })
        } else {
          this.setData({
            dis: {
              dis_number: 10,
              id: 0
            },
          })
        }

      }
    })
  },

  buyherd: function() {

  },

  /*
   * 是否使用积分
   */
  switch1Change(e) {
    this.setData({
      boolIntegration: e.detail.value
    })
  }
})