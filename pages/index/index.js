const app = getApp()
const commentJson = require("../../datatest/commit.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    juli: '20km',
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
    scene:56,
		page:1
  },
  /**
   * 生命周期函数--监听页面加载
   */
	runnearby(){
		wx.switchTab({
			url:'/pages/nearby/index/index'
		})
	},
  onLoad: function(options) {
		console.log(options)
		console.log('这是分享进来的数据--------')
    app.setNavigationBarTitle("商家首页");
    const scene = decodeURIComponent(options.scene)
    if (scene == 'undefined'){
      console.log('啥也没穿')
    } else if (scene.length > 1){
			console.log(scene)
      this.setData({
        scene: scene
      })
      app.globalData.shopId = scene
			wx.setStorageSync('share', 2)
      app.globalData.shopType = app.status.shopType.shop_share_Type;
      console.log('传了东西')
    }
// 二维码
// 通过分享方式进入，店铺Id一直不变
    if (options.shopId != undefined) {
      console.log('分享进来的啊')
      app.globalData.shopId = options.shopId;
			wx.setStorageSync('share', 2)
      app.globalData.shopType = app.status.shopType.shop_share_Type;  
    }
    // 请求整个页面的数据
    this.init(options.shopId);
  },
  onShow() {
    app.dengluzt()
		this.getpinglun()
    let a = wx.getStorageSync('diliweizhi')
    this.setData({
      juli: a
    })
  },
  onPageScroll: function(e) {
    if (e.detail.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
	wherecommit(e) {
		this.setData({
			whereid: e.currentTarget.dataset.id
		})
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
	getpinglun: function () {
		app.request.post({
			url: "comment/getCommentList",
			data: {
				shop_id: app.globalData.shopId,
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
  // 返回顶部
  top:function(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  init() {
    app.request.post({
      url: "merchant/bygoods",
      isLoading: true,
      data: {
        shangjiaid: app.globalData.shopId ////数据
      },
      success: (e) => {
        app.setNavigationBarTitle(e.shop_name);
        this.setData({
          shopObj: e,
          ticketArray: e.youhui,
          goods1: e.goods
        })
      }
    });
    //计算高度
    app.utils.computeScrollViewHeight((e) => {
      this.setData({
        scrollHeight: e
      });
    })
  },
  /*店铺id */
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
	addmoney(e) {
		wx.navigateTo({
			url: '/pages/personal/person/recharges/recharge?payforid=3&shop_id=' + app.globalData.shopId
		})
	},
	addOrder(e) {
		console.log(e)
		wx.navigateTo({
			url: '/pages/scattered/pay/pay?shop_id=' + app.globalData.shopId + '&card_id=' + e.currentTarget.dataset.card_id + '&order_type=1' + '&shop_image=' + e.currentTarget.dataset.shop_image + '&shop_name=' + e.currentTarget.dataset.shop_name,
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
      path: '/pages/index/index?shopId=' + app.globalData.shopId,
      imageUrl: this.data.shopObj.shop_logo
    }
    console.log('分享成功了呀')
  }
})