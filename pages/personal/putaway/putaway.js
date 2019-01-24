// pages/personal/putaway/putaway.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_array: [],
    type_index: 0,
    mmm: [],
    type_id: 0,
		idd:2			,
    src: '',
    banner: [],
    items: [{
        name: 'USA',
        value: '七天不退'
      },
      {
        name: 'CHN',
        value: '不满减不优惠',
        checked: 'true'
      },
      {
        name: 'BRA',
        value: '仅能使用优惠券'
      },
      {
        name: 'JPN',
        value: '不支持优惠券付款'
      },

    ]

  },

  // 选择产品类型
  bindPickerChange: function(e) {
    console.log(e)
    let ab = this.data.type_array
    ab.forEach((k, v) => {
      if (v == e.detail.value) {
        this.setData({
          idd: ab[v].id
        })
      }
    })
    this.setData({
      type_index: e.detail.value
    })

  },

  // 产品条件
  checkboxChange: function(e) {
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
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          var tempFilePaths = res.tempFilePaths
          this.setData({
            banner: this.data.banner.concat(tempFilePaths)
          })
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
        abc.forEach((v, k) => {
          if (k == data_id) {
            abc[k] = tempFilePaths[0]
          }
        })
        this.setData({
          banner: abc,
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
    if (options.type == 1) {
      this.init(options.goods_id);
			this.setData({
				gotype:options.type
			})
    }
		this.setData({
			myshop_id: options.myshop_id
		})
		// 拿到列表
		app.request.post({
			url: "Shopcenter/getcat",
			isLoading: true,
			success: (res) => {
				console.log(res)
				this.setData({
					type_array: res.tree
				})
			}
		})
  },
  // 拿到商品数据
  init(a) {
    app.request.post({
      url: "merchant/foridbygoods",
      isLoading: true,
      data: {
        goods_id: a
      },
      success: (e) => {
        this.setData({
          goods: e,
          banner: this.data.banner.concat(e.goods_img),
          listimg: e.goods_img,
          src: e.goods_img[0],
          idd: e.cat_id
        })
      }
    })
  },
  // 提交修改
  change(e) {
    // 商品属性
    e.detail.value.cat_id = this.data.idd
    // 缩略图上传
    wx.uploadFile({
      url: 'https://www.nazhua.com.cn/api/shopcenter/uploadimg?goods_id=' + this.data.goods.goods_id,
      filePath: this.data.src[0],
      name: 'goods_thumb',
      success: function(res) {
        app.showtost('缩略图上传成功')
      }
    })
    // 轮播图上传=
    for (var i = 0; i < 3; i++) {
      if (this.data.banner[i] !== this.data.listimg[i]) {
        wx.uploadFile({
          url: 'https://www.nazhua.com.cn/api/shopcenter/uploadimg?goods_id=' + this.data.goods.goods_id + '&page=' + i,
          filePath: this.data.banner[i],
          name: 'goods_img',
          success: function(res) {
            app.showtost('第' + i + '张图片上传成功')
          }
        })
      }
    }
    // 上传文字
    app.request.post({
      url: "Shopcenter/editgoods",
      isLoading: true,
      data: {
        shop_edit: e.detail.value
      },
      success: (e) => {
        console.log(e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
	// 添加商品
	addshopproduct(e){
		// 商品属性
		e.detail.value.cat_id = this.data.idd





// 发送文件
		app.request.post({
			url: "shopcenter/addgoods",
			isLoading: true,
			data: {
				shop_add:e.detail.value
			},
			success: (e) => {
				// 添加缩略图
				wx.uploadFile({
					url: 'https://www.nazhua.com.cn/api/shopcenter/uploadimg?goods_id='+e.goods_id,
					filePath: this.data.src[0],
					name: 'goods_thumb',
					success: function (res) {
						app.showtost('缩略图上传成功')
					}
				})
				// 添加banner图
				for (var i = 0; i < 3; i++) {
					wx.uploadFile({
						url: 'https://www.nazhua.com.cn/api/shopcenter/uploadimg?goods_id=' + e.goods_id + '&page=' + i,
						filePath: this.data.banner[i],
						name: 'goods_img',
						success: function (res) {
							app.showtost('第' + i + '张图片上传成功')
						}
					})
				}

			}
		})
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