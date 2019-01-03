// pages/personal/putaway/putaway.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_array: ['服装', '百货', '水果', '小吃', '医药', '汽车', '保健', '饮食'],
    type_index: 1,
    src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545730695846&di=7c53955e7781353d3dfca5a0bd509d33&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F47%2F03%2F53574339d206e4d.jpg',
    banner: [],



    items: [
      { name: 'USA', value: '七天不退' },
      { name: 'CHN', value: '不满减不优惠', checked: 'true' },
      { name: 'BRA', value: '仅能使用优惠券' },
      { name: 'JPN', value: '不支持优惠券付款' },
      
    ]

  },
  // 选择产品类型
  bindPickerChange: function(e) {
    this.setData({
      type_index: e.detail.value
    })
  },

  // 产品条件
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  // 修改商家logo图
  user: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        this.setData({
          src: tempFilePaths
        })
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },

  // 添加商家banner图
  addimageones: function(e) {
    if (this.data.banner.length >= 3) {
      wx.showToast({
        title: '最多能添加3张哦',
        icon: 'none',
        duration: 2000
      })
    } else {
      var banner = []
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          var tempFilePaths = res.tempFilePaths
          tempFilePaths.forEach((v, k) => {
            let a = {
              img: v,
              id: k
            }
            banner.push(a)
          })
          this.setData({
            banner: banner
          })
          console.log(this.data.banner.length)
        }
      })
    }
  },


  // 修改商家banner图
  image_exchange: function(e) {

    var data_id = e.currentTarget.dataset.id
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        var abc = this.data.banner
        abc.forEach((v) => {
          if (v.id == data_id) {
            v.img = tempFilePaths
          }
        })

        this.setData({
          banner: abc
        })

      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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