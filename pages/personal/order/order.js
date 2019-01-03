// pages/order/order.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: 2,
    order: [{ text: '已完成', type_id: 1 }, { text: '待支付', type_id: 2 }, { text: '待使用', type_id: 4 }, { text: '已取消', type_id: 3} ],
    shop: [{
      id: 0,
      text: '舞东风-水云阁店',
      money: 15,
      shopnumber: 1,
      shopdistribution: '达达专送',
      thistime: '15:19'
    }, {
      id: 0,
      text: '舞东风-水云阁店',
      money: 15,
      shopnumber: 1,
      shopdistribution: '达达专送',
      thistime: '15:19'
    }],
    state: '待评论',
    page:1
  },
  addorderid: function(e) {
    this.setData({
      cid: e.currentTarget.dataset.id
    })
    this.init();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.setNavigationBarTitle("我的订单");
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

  init(){
    app.request.post({
      url: "order/orderList",
      isLoading: true,
      data:{
        page:this.data.page,
        order_type:this.data.cid
      },
      success: (e) => {
       this.setData({
         shop:e.order
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
        page: ++this.page,
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