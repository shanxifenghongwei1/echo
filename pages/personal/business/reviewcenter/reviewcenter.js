// pages/personal/business/reviewcenter/reviewcenter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    istrue: false,
    goodstrue: false,
    discu: false
  },
  // 店铺评论的显示隐藏
  istrues() {
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
  // 商品的显示隐藏
  goodstrues() {
    if (this.data.goodstrue == true) {
      this.setData({
        goodstrue: false
      })
    } else {
      this.setData({
        goodstrue: true
      })
    }
  },

  // 关闭打开回复框
  discuss(e) {

    if (this.data.discu == true) {
      this.setData({
        discu: false,
        msg_id: e.currentTarget.dataset.id
      })
    } else {
      this.setData({
        discu: true,
        msg_id: e.currentTarget.dataset.id
      })
    }
  },


  // 提交评论
  adddiscuss(e) {

    if (this.data.textera.length < 6) {
      app.showtost('字数不少于6')
    } else {
      app.request.post({
        url: 'noblemsg/shopreplay',
        data: {
          msg_id: this.data.msg_id,
          desc: this.data.textera
        },
        success: (res) => {
          app.showtost(res.msg)
          if (res.state == 1) {
            this.setData({
              discu: false
            })
            this.getpinglun()
						this.shop_commesnt(this.data.goods_id);
          }
        }
      })

    }
  },

  textar(e) {
    this.setData({
      textera: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      shop_id: options.shop_id
    })
    this.getgoodslist();
    this.getpinglun();
  },
  // 点击的是哪个图片？
  wherecommit(e) {
    this.setData({
      whereid: e.currentTarget.dataset.id
    })
  },
  // 图片点击查看
  showCommentImage(e) {
    setTimeout(() => {
      let dataarray = this.data.commentArrar[this.data.whereid].msg_img
      wx.previewImage({
        urls: dataarray,
        current: dataarray[e.currentTarget.dataset.id]
      })
    }, 500)
  },

  // 获取商品评论
  lookgoodscomment(e) {
    let goods_id = e.currentTarget.dataset.id
    this.setData({
      cid: e.currentTarget.dataset.cid,
      goods_id: e.currentTarget.dataset.id
    })
		this.shop_commesnt(goods_id);

  },

  // 商品评论
  shop_commesnt(goods_id) {
    app.request.post({
      url: "comment/getGoodsCommentList",
      data: {
        goods_id: goods_id,
        page: 1
      },
      success: (e) => {
        this.setData({
          comment_list: e.comment,
        })
      }
    })
  },
  // 获取商品列表
  getgoodslist() {
    app.request.post({
      url: "merchant/bygoods",
      isLoading: true,
      data: {
        shangjiaid: this.data.shop_id
      },
      success: (e) => {
        this.setData({
          goods_list: e.goods
        })
      }
    })
  },
  // 获取店铺评论
  getpinglun: function() {
    app.request.post({
      url: "comment/getCommentList",
      data: {
        shop_id: this.data.myshop_id,
      },
      success: (e) => {
        this.setData({
          commentArrar: e.comment,
          type: e.shop_id
        })
      }
    })
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