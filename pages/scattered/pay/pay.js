const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: app,
    orderType: 0, //订单支付方式  1.店铺下单  2.商品下单
    order_money:0,
    boolIntegration: false,
    myisclo:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.setNavigationBarTitle("支付");

    this.init(options);

  },
  onShow:function(){

    let abc=wx.getStorageSync("ourdermessage")
    this.setData({
      abc:abc,
      order_type:abc.order_type
    })
    console.log(this.data.abc)

  },
  init(options) {
    // 历史页面里面传过来的东西
    // console.log(options)
    // 判断类型
    this.setData({
      orderType: options.orderType,
      orderObj: options.orderObj
    })
    // 发送请求拿到数据
  },
  payClick() {
   //店铺下订单  验证价格是否正确
    // if (options.orderType == app.status.orderType.shop) {
    //   //验证价格 是否是价格
    //   if (app.regular.validationNumber(this.data.order_money, 0)) {
    //     wx.showToast({
    //       "title": "金额格式不正确",
    //       "icon": "none",
    //     });
    //     return;
    //   }
    // }
    var that = this
    function zhifu() {
    app.request.post({
      url: "pay/Wx_pay",
      isLoading: true,
      data: {
        order_id:that.data.abc.order_id,         //"订单Id",
        order_number:that.data.abc.goods.goods_number,           //"订单数量",
        order_money: that.data.abc.goods.order_money,      //"支付的金额",
        virtual_id: 0,         //"优惠券Id",
        order_type:that.data.abc.order_type
      },
      success: (e) => {
       
        wx.requestPayment({
          timeStamp: e.timeStamp,
          nonceStr: e.nonceStr,
          package: e.package,
          signType: e.signType,
          paySign: e.paySign,
          success:(res)=>{
              console.log('成功了！')
            app.request.post({
              url: "pay/editOrderStatus",
              isLoading: true,
              data: {
                order_id: that.data.abc.order_id,         //"订单Id",
              },
              success: (e) => {
                  wx.switchTab({
                    url: '/pages/personal/order/order',
                    success:()=>{
                      app.status.pay_order=1
                    }
                    
                  })
              }
            })

          }
        })
      }
    })

}
zhifu();

  },

  buyherd:function(){
    
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