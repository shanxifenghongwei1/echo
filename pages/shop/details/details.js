const commentJson = require("../../../datatest/commit.js");
const app = getApp()
Page({
  data: {
    app: app,
    buyStatus: 0, //显示购买   0.隐藏   1.优惠券  2.参数
    scrollStatus: 1, //显示顶部导航   1.隐藏  2.显示
    buy: {}, //商品型号信息
    ticketArray: [], //可用折扣券
    ticket: {}, //选中的折扣券
    buyNum: 1, //商品购买数量
    typeCollection: 0,
    goodsObj: null, //商品详细信息 
    scrollHeight: 0, //页面可用高度
    topNav: "goodsComment" //锚点Id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.setNavigationBarTitle("产品详情");
    this.options = options;
    this.init(options);
  },
  onShow() {
    this.comment = this.selectComponent("#comment");
    this.comment.setData({
      position_commit: 1, //评论图片不显示
    });
    this.comment.getComment({
      goods_id: this.options.goods_id
    })
  },
  /**
   * 上拉刷新评论
   */
  scrolltolower() {
    this.comment.getComment({
      goods_id: this.options.goods_id
    })
  },
  /*
   * 初始化请求
   */
  init(options) {
    app.request.post({
      url: "merchant/foridbygoods",
      isLoading: true,
      data: {
        goods_id: options.goods_id
      },
      success: (e) => {
        let ticketArray = [];
        Array.from(e.youhui).filter(p => {
          if (e.shop_price >= p.card_money) {
            ticketArray.push(p);
          }
        });
        this.setData({
          
          goodsObj: e,
          buy: e.goods_type[0],
          ticketArray: ticketArray,
          ticket: ticketArray[0],
          typeCollection: e.collection_type
        })
      }
    })
    app.utils.computeScrollViewHeight((e) => {
      this.setData({
        scrollHeight: e
      });
    })
  },
  /**
   * 商品购买
   */
  buyClick() {
    app.request.post({
      url: "order/index",
      isLoading: true,
      data: {
        goods_id: this.data.goodsObj.goods_id,
        virtual_id: this.data.ticket.card_id != undefined ? this.data.ticket.card_id : 0,
        shop_id: this.data.goodsObj.id,
        goods_number:1,
        order_type: app.status.orderType.goods
      },
      success: (e) => {
        wx:wx.setStorageSync('ourdermessage', e)
        wx.redirectTo({
          url: '/pages/scattered/pay/pay?orderType=' + app.status.orderType.goods + '&order_id=' + e.order_id + "&orderObj=" + this.data.goodsObj
        });
      }
    })
  },

  /**
   * 折扣券选择
   */
  ticketClick(e) {
    this.setData({
      ticket: e.currentTarget.dataset.item,
      buyStatus: 0
    });
  },
  /*
   * 商品收藏操作
   */
  editCollection() {
    // 1.收藏  2.取消收藏
    app.request.post({
      url: "collection/index",
      isLoading: true,
      data: {
        goods_id: this.data.goodsObj.goods_id
      },
      success: (e) => {
        this.setData({
          typeCollection: e.type
        });
      }
    })
  },
  /**
   * 商品型号选择
   */
  specificationsClick(e) {
    this.setData({
      buy: e.currentTarget.dataset.item,
      buyNum: 1,
    });
  },
  /*
   * 产品数量加减
   */
  calculateClick(e) {
    let num = this.data.buyNum;
    if (e.target.id == "1") {
      num -= 1;
    } else {
      num += 1;
    }
    if (num >= 1 && num <= this.data.mode_stock) {
      this.setData({
        "buy.buyNum": num
      });
      this.data.buyNum = num;
    }
  },
  /*
   *获取顶部导航选择器，进行锚点滚动
   */
  jumpTo: function(e) {
    this.setData({
      topNav: e.currentTarget.dataset.id
    });
  },
  /**
   * 滚动条距离，显示顶部导航
   */
  bindscroll(event) {
    if (event.detail.scrollTop >= (this.data.swiperHeight / 2)) {
      this.setData({
        scrollStatus: 2
      })
    } else {
      this.setData({
        scrollStatus: 1
      })
    }
  },

  /**
   * 获取图片真实宽度
   */
  imageLoad(e) {
    this.setData({
      swiperHeight: app.utils.imageCalculate(e)
    })
  },

  /**
   * 隐藏显示购买弹窗
   */
  buyDailog(e) {

    this.setData({
      buyStatus: e.currentTarget.dataset.buystatus
    })
  },
  /**
   * 拨打电话
   */
  makePhoneCall(e) {
    app.utils.makePhoneCall("" + e.currentTarget.dataset.phone);
  },
  /**
   * 分享
   */
  onShareAppMessage: function() {
    return {
      title: this.data.goodsObj.goods_name,
      path: '/pages/shop/details/details?goods_id=' + this.data.goodsObj.goods_id,
      imageUrl: this.data.goodsObj.goods_thumb
    }
  },
})