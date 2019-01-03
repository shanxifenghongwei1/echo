const app = getApp()
const commentJson = require("../../../datatest/commit.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    app: app,
    swiperHeight: 0, //滑动高度
    buyStatus: 0, //显示购买   0.隐藏   1.显示
    navActive: 0,
    navArray: [{
      name: "活动",
      id: "list0"
    }, {
      name: "商品",
      id: "list1"
    }, {
      name: "评论",
      id: "list2"
    }],
    ticketArray: [],
    toView: '',
    shopObj: {},
    scrollHeight: 0,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    app.setNavigationBarTitle("商家首页");
    this.setData({
      shop_id:options.shop_id,
      juli: options.juli
    })
  },

  onShow() {
    // 引用组件
    // this.comment = this.selectComponent("#comment");
    // this.comment.setData({
    //   position_commit: 1, //评论图片不显示
    // });
    this.init(app.globalData.shopId);
    this.scrolltolower();
  },

  getpinglun:function(){
    app.request.post({
      url: "comment/getCommentList",
      data: {
        shop_id: this.data.shop_id,
        page:this.data.page
      },
      success: (e) => {
      
        this.setData({
          commentArrar: e,
          type: e.shop_id
        })
        
      }
    })
  },


  init(shopId) {
    
    app.request.post({
      url: "merchant/bygoods",
      isLoading: true,
      data: {
        shangjiaid: this.data.shop_id
      },
      success: (e) => {
        app.setNavigationBarTitle(e.shop_name);
        this.setData({
          shopObj: e,
          ticketArray: e.youhui
        })
      }
    });
    //计算高度
    app.utils.computeScrollViewHeight((e) => {
      this.setData({
        scrollHeight: e
      });
    })

    this.getpinglun();
  },
  /*店铺id */
  addOrder(e) {
    app.request.post({
      url: "order/index",
      isLoading: true,
      data: {
        virtual_id: e.currentTarget.dataset.id,
        shop_id: app.globalData.shopId,
        order_type: app.status.orderType.shop
      },
      success: (e) => {
        wx.redirectTo({
          url: '/pages/scattered/pay/pay?orderType=' + app.status.orderType.shop + '&order_id=' + e.order_id + "&orderObj=" + this.data.shopObj
        });
      }
    })
  },

  // 组件中拿到shop_id并发送出去
  scrolltolower() {
    // console.log(this.comment)
    // this.comment.getComment({
    //   shop_id: app.globalData.shopId
    // })
    // this.comment.setCommentData()
  },
  /*
   * 拨打电话
   */
  makePhoneCall(e) {
    app.utils.makePhoneCall("" + e.currentTarget.dataset.phone);
  },

  imageLoad(e) { //获取图片真实宽度  
    this.setData({
      swiperHeight: app.utils.imageCalculate(e)
    })
  },
  jumpTo: function (e) {
    // 获取标签元素上自定义的 data-opt 属性的值
    this.setData({
      toView: e.currentTarget.dataset.opt,
      navActive: e.currentTarget.dataset.id
    });
  },
  /*分享 */
  onShareAppMessage: function () {
    return {
      title: this.data.shopObj.shop_name,
      path: '/pages/index/index?shopId=' + app.globalData.shopId,
      imageUrl: this.data.shopObj.shop_logo
    }
  }
})