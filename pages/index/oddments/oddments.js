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
    areshure: true,
    toView: '',
    shopObj: {},
    scrollHeight: 0,
    // 小星星
		stars: [0, 1, 2, 3, 4],
		normalSrc: '/images/test/normal.png',
		selectedSrc: '/images/test/selected.png',
		halfSrc: '/images/test/half.png',
		key: 3.2,//评分
		// 小星星
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  wherecommit(e) {
    this.setData({
      whereid: e.currentTarget.dataset.id
    })
  },


  // form_id的获取
  clickFormView(event) {

  },

  // 去导航地图
  try_go_map() {
    app.request.post({
      url: "place/index",
      isLoading: true,
      data: {
        shop_id: this.data.shop_id
      },
      success: (e) => {
        wx.openLocation({
          latitude: e.lat,
          longitude: e.lng,
          name: e.shop_name,
          address: e.address
        })
      }
    })
  },

  // 简介的显示
  displayer() {
    if (this.data.areshure == true) {
      this.setData({
        areshure: false
      })
    } else {
      this.setData({
        areshure: true
      })
    }


  },

  showCommentImage(e) {
    // e.currentTarget.dataset.id
    setTimeout(() => {
      let dataarray = this.data.commentArrar[this.data.whereid].msg_img
      wx.previewImage({
        urls: dataarray,
        current: dataarray[e.currentTarget.dataset.id]
      })

    }, 500)
  },
  onLoad: function(options) {
    app.setNavigationBarTitle("商家首页");
    this.setData({
      shop_id: options.shop_id,
      juli: options.juli,
      hot: options.hot,
      one_starts:options.starts
    })
    this.init(app.globalData.shopId);
  },

  popseare(e) {
    console.log(e)
    console.log('我动了！')
    let formId = e.detail.formId;
    app.request.post({
      url: 'send/getFormId',
      data: {
        form_id: formId
      },
      success: (res) => {
        console.log(res)
      }
    })

  },
  givemoneytome(e) {

    console.log(e)
    this.popseare(e)


    wx.navigateTo({
      url: '/pages/personal/person/recharges/recharge?payforid=1&conten=' + e.currentTarget.dataset.id + '&shop_id=' + e.currentTarget.dataset.shop + '&ac_id=' + e.currentTarget.dataset.ac,
    })
  },
  givemoneytohe(e) {

    console.log(e)
    this.popseare(e)

    wx.navigateTo({
      url: '/pages/personal/person/recharges/recharge?payforid=5&conten=' + e.currentTarget.dataset.id + '&shop_id=' + e.currentTarget.dataset.shop + '&ac_id=' + e.currentTarget.dataset.ac + '&money=' + e.currentTarget.dataset.money,
    })
  },
  returncash(e) {

    console.log(e)
    this.popseare(e)

    wx.navigateTo({
      url: '/pages/personal/person/recharges/recharge?payforid=6&conten=' + e.currentTarget.dataset.id + '&shop_id=' + e.currentTarget.dataset.shop + '&ac_id=' + e.currentTarget.dataset.ac,
    })
  },
  onShow() {

    this.scrolltolower();
  },

  getpinglun: function() {
    app.request.post({
      url: "comment/getCommentList",
      data: {
        shop_id: this.data.shop_id,
        page: this.data.page
      },
      success: (e) => {
        this.setData({
          commentArrar: e.comment,
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
    console.log(e)
    this.popseare(e)

    wx.navigateTo({
      url: '/pages/scattered/pay/pay?shop_id=' + this.data.shop_id + '&card_id=' + e.currentTarget.dataset.card_id + '&order_type=1' + '&shop_image=' + e.currentTarget.dataset.shop_image + '&shop_name=' + e.currentTarget.dataset.shop_name + '&act_name=' + e.currentTarget.dataset.act_name
    })

  },

  // 组件中拿到shop_id并发送出去
  scrolltolower() {

  },

  // 充值
  addmoney(e) {

    this.popseare(e)
    wx.navigateTo({
      url: '/pages/personal/person/recharges/recharge?payforid=3&shop_id=' + this.data.shop_id
    })
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
  jumpTo: function(e) {
    // 获取标签元素上自定义的 data-opt 属性的值
    this.setData({
      toView: e.currentTarget.dataset.opt,
      navActive: e.currentTarget.dataset.id
    });
  },
  /*分享 */
  onShareAppMessage: function() {

    return {
      title: this.data.shopObj.shop_name,
      path: '/pages/index/index?shopId=' + this.data.shop_id,
      imageUrl: this.data.shopObj.shop_logo
    }

  }
})