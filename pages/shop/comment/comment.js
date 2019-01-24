const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageArray: [],
    score: {
      "goods": 0,
      "service": 0,
      "environment": 0,
    },
		is_anonymous:2,
    user_img: [],
    commentText: "",
    checked: 2 //1.真实发表  2.匿名发表
  },

  onLoad: function(options) {
    let order_id = options.order_id
    this.setData({
      order_id: options.order_id
    })
    this.init(order_id)
  },
  onShow: function() {

  },
  // 请求页面数据
  init(order_id) {
    app.request.post({
      url: "comment/getShop",
      isLoading: true,
      data: {
        order_id: order_id
      },
      success: (e) => {
        console.log(e)
        this.setData({
          shop_name: e.shop.shop_name,
          goods: e.goods,
          order_mode: e.order_mode
        })
      }
    })
  },
  /*
   * 是否匿名 
   */
  checkboxChange(e) {
    this.data.checked = 1;
    if (e.detail.value == 2) {
      this.data.checked = 2;
    }
		// 匿名为2
		this.setData({
			is_anonymous: this.data.checked
		})
  },

  /*
   *收藏按钮
   */
  commentScore(e) {
    let key = "score." + e.target.dataset.key;
    this.setData({
      [key]: e.target.dataset.index + 1
    })
  },

  /*
   * 输入评论
   */
  bindinput(e) {
    this.setData({
      commentText: e.detail.value
    })
  },


  /*
   * 图片上传
   */
  uploadImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: (res) => {
        let imgArray = this.data.imageArray;
        imgArray.push(res.tempFilePaths);
        this.setData({
          imageArray: imgArray
        })
      }
    })
  },

  /*
   * 删除图片
   */
  delCommentImage(e) {
    let index = e.target.dataset.index;
    let imgArray = this.data.imageArray;
    imgArray.splice(index, 1);
    this.setData({
      imageArray: imgArray
    })
  },
  /*提交评论 */
  addComment() {
    var that = this
    var user_img = this.data.imageArray
    console.log(this.data.imageArray)

    var ass = '';
    var i = 0
    // for (var i = 0; i < this.data.imageArray.length; i++) {
    wx.showToast({
      title: '正在上传第' + i + '张图片',
      icon: 'success',
      mask: 'true'
    })
    wx.uploadFile({
      url: 'https://www.nazhua.com.cn/api/comment/upload',
      filePath: this.data.imageArray[i][0],
      name: 'file',
      success: (res) => {
        i++
        ass += res.data + ','
        if (i < this.data.imageArray.length) {
         
          wx.uploadFile({
						url: 'https://www.nazhua.com.cn/api/comment/upload',
            filePath: this.data.imageArray[i][0],
            name: 'file',
            success: (res) => {
              i++
              ass += res.data + ','
              if (i < this.data.imageArray.length) {
               
								console.log('图片' + i + '上传完成')
                wx.uploadFile({
									url: 'https://www.nazhua.com.cn/api/comment/upload',
                  filePath: this.data.imageArray[i][0],
                  name: 'file',
                  success: (res) => {
                    i++
                    ass += res.data + ','
                    if (i <= this.data.imageArray.length) {
                    
											console.log('图片' + i + '上传完成')
                      app.request.post({
                        url: "comment/index",
                        isLoading: true,
                        data: {
                          order_id: that.data.order_id,
                          content: that.data.commentText,
                          user_img: ass,
													is_anonymous: that.data.is_anonymous
                        },
                        success: (e) => {
                          wx.showToast({
                            title: '评论成功',
                            icon: 'success',
                            mask: 'true'
                          })
                          wx.switchTab({
                            url: '/pages/personal/order/order',
                          })
                        }
                      })

                    } else {
											console.log('图片' + i + '上传完成')
                      app.request.post({
                        url: "comment/index",
                        isLoading: true,
                        data: {
                          order_id: that.data.order_id,
                          content: that.data.commentText,
													is_anonymous: that.data.is_anonymous,
                          user_img: ass
                        },
                        success: (e) => {
                          wx.showToast({
                            title: '评论成功',
                            icon: 'success',
                            mask: 'true'
                          })
                          wx.switchTab({
                            url: '/pages/personal/order/order',
                          })
                        }
                      })

                    }
                  }
                })

              } else {
                console.log('图片' + i + '上传完成')
                app.request.post({
                  url: "comment/index",
                  isLoading: true,
                  data: {
                    order_id: that.data.order_id,
                    content: that.data.commentText,
										is_anonymous: that.data.is_anonymous,
                    user_img: ass
                  },
                  success: (e) => {
                    wx.showToast({
                      title: '评论成功',
                      icon: 'success',
                      mask: 'true'
                    })
                    wx.switchTab({
                      url: '/pages/personal/order/order',
                    })
                  }
                })

              }
            }
          })

        } else {
          console.log('图片' + i + '上传完成')
          app.request.post({
            url: "comment/index",
            isLoading: true,
            data: {
              order_id: that.data.order_id,
              content: that.data.commentText,
							is_anonymous: that.data.is_anonymous,
              user_img: ass
            },
            success: (e) => {
              wx.showToast({
                title: '评论成功',
                icon: 'success',
                mask: 'true'
              })
              wx.switchTab({
                url: '/pages/personal/order/order',
              })
            }
          })

        }
      }
    })
    wx.showToast({
      title: '正在上传内容',
      icon: 'success',
      mask: 'true'
    })
  }
})