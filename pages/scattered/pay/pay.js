const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: app,
		areyouok:0,
    orderType: 0, //订单支付方式  1.店铺下单  2.商品下单
    order_money: 0,
    boolIntegration: false,
		ischecked: false,
    myisclo: true,
    iloveyou: 3,
    card_id: 0,
		textcenter:false,
		youhuitext:'',
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
  },

// 点击传优惠券内容
	givemoneytome(e){
			this.setData({
				youhuitext:e.currentTarget.dataset.id,
				virtual: e.currentTarget.dataset.ac,
				shop_id: e.currentTarget.dataset.shop,
				reduce_money: e.currentTarget.dataset.moneys,
				textcenter:false,
				ischecked:true,
				a_pa_money: this.data.goods_price - e.currentTarget.dataset.moneys < 0 ? 0 : this.data.goods_price - e.currentTarget.dataset.moneys
			})
	},

	// 优惠券点击弹出列表
	runjumpthis() {
		this.setData({
			textcenter: true
		})
	},

	// 关闭优惠券
	closessa(){
		this.setData({
			textcenter:false
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.setNavigationBarTitle("支付");
    if (!options.card_id) {
      this.setData({
        card_id: 0
      })
    } else {
      this.setData({
        card_id: options.card_id,
      })
    }
		console.log('从那边传来的shop_id')
		console.log(options)
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
  },
  onShow: function() {
		this.getusershopvirtual()
  },
	getuservirtual(){
		app.request.post({
			url: "virtual/getMyVirtualList",
			isLoading: true,
			data: {
				shop_id: this.data.shop_id,
				money: Number(this.data.payformoney),
				page:1
			},
			success:(res)=>{
				if(res.state==1){
					this.setData({
						uservirtual: res.virtual
					})
				}else if(res.state==2){
					app.showtost(res.msg)
				}	
				if (res.virtual.length==0){
					this.setData({
						ischecked:false,
						virtual:0,
						youhuitext:''
					})
				}
			}
		})
	},
	checkboxChange(e){
		this.setData({
			areyouok: e.detail.value.length
		})
	},
	getusershopvirtual() {
		app.request.post({
			url: "virtual/getMyVirtualList",
			isLoading: true,
			data: {
				shop_id: this.data.shop_id,
				money: Number(this.data.goods_price),
				page: 1
			},
			success: (res) => {
				if (res.state == 1) {
					this.setData({
						uservirtual: res.virtual
					})
				} else if (res.state == 2) {
					// app.showtost(res.msg)
				}
				if (res.virtual.length == 0) {
					this.setData({
						ischecked: false,
						virtual: 0,
						youhuitext: ''
					})
				}
			}
		})
	},
  shurumoney(e) {
		
    if (Number(e.detail.value) < Number(this.data.act_name)) {
      wx.showToast({
        title: '该活动充值最少充值' + this.data.act_name + '元',
        icon: 'none'
      })
    } else {
      this.setData({
        payformoney: e.detail.value
      })
    }
    this.setData({
      payformoney: e.detail.value,
    })
		this.getuservirtual()
  },
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
          user_money: res.user_money
        })
      }
    })
  },
  // 商家支付
  shangjiapay() {
    if (this.data.payformoney) {
      app.request.post({
        url: "pay/Wx_Shop_pay",
        isLoading: true,
        data: {
          order_number: 1, //"订单数量",
          order_money: this.data.payformoney, //"支付的金额",
          order_type: this.data.order_type,
          shop_id: this.data.shop_id,
          pay_mode: this.data.iloveyou,
					virtual_id:this.data.virtual
        },
        success: (e) => {
					if(e.state!==1){
						let t = '失败'
						let c = e.msg
						app.showmodal(t,c);
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
											success: function () {
												setTimeout(() => {
												app.showtost('支付成功')
											}, 100)
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
                order_id: e.order_id, //"订单Id",
                pay_mode: e.pay_mode,
								virtual_id: this.data.virtual
              },
              success: (e) => {							
								wx.setStorageSync('states', 1)
									wx.switchTab({
										url: '/pages/personal/order/order',
										success: () => {
											setTimeout(() => {
											wx.showToast({
												title: '支付成功',
												icon: 'success',
												duration: 2000,
											})
										}, 1000)
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
            order_id: that.data.order_id, //"订单Id",
            order_number: 1, //"订单数量",
            order_money: that.data.order_money, //"支付的金额",
						virtual_id: that.data.virtual,
            order_type: that.data.order_type,
						pay_mode :that.data.iloveyou,
          },
          success: (e) => {
						if (e.state !== 1) {
							let t = '失败'
							let c = e.msg
							app.showmodal(t, c);
							return false;
						}
           if(e.pay_mode == 9){
						 wx.requestPayment({
							 timeStamp: e.timeStamp,
							 nonceStr: e.nonceStr,
							 package: e.package,
							 signType: e.signType,
							 paySign: e.paySign,
							 success: (res) => {
								 app.showtost('支付成功')
								 app.request.post({
									 url: "pay/editOrderStatus",
									 isLoading: true,
									 data: {
										 order_id: that.data.order_id, //"订单Id",
									 },
									 success: (e) => {
										 wx.setStorageSync('states', 1)
										 wx.switchTab({
											 url: '/pages/personal/order/order?states=1',
											 success: function() {
												 setTimeout(()=>{
													 app.showtost('支付成功')	 
												 })
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
					 }
					 else{
						 app.request.post({
							 url: "pay/editOrderStatus",
							 isLoading: true,
							 data: {
								 order_id: that.data.order_id, //"订单Id",
								 pay_mode:e.pay_mode,
								 virtual_id: that.data.virtual
							 },
							 success: (e) => {
								 wx.setStorageSync('states', 1)
								 wx.switchTab({
									 url: '/pages/personal/order/order',
									 success: () => {
										 wx.setStorageSync('states', 1)
											 wx.switchTab({
												 url: '/pages/personal/order/order?states=1',
												 success: function () {
														 app.showtost('支付成功')
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