const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageArray: [],
		scoresa: 5,
    score: {
      "goods": 0,
			
      "service": 0,
      "environment": 0,
    },
		is_anonymous:2,
    user_img: [],
    commentText: "",
    checked: 1 //1.真实发表  2.匿名发表
  },

  onLoad: function(options) {
    let order_id = options.order_id
    this.setData({
      order_id: options.order_id
    })
    this.init(order_id)
  },
  onShow: function() {
		this.starts = this.selectComponent("#starts");
		this.setData({
			startsesa: this.starts
		})
  },
	show_key(){
		this.setData({
			scoresa: this.data.startsesa.data.key
		})
		console.log(this.data.startsesa.data.key)
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
			sizeType: ['original', 'compressed'],
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
	if(this.data.commentText.length < 6 ){
		app.showtost('最少评论6个字哦')
	}else{
    var that = this
    var user_img = this.data.imageArray
    var ass = '';
    var i = 0
		if (user_img[i] ) {
			wx.showToast({
				title: '正在上传第' + i + '张图片',
				icon: 'success',
				mask: 'true'
			})

			// 第一张图上传
			wx.uploadFile({
				url: 'https://www.nazhua.net/api/comment/upload',
				filePath: this.data.imageArray[i][0],
				name: 'file',
				success: (res) => {
					i++
					ass += res.data + ','
					// 第二张图上传
					if (i < this.data.imageArray.length) {
						wx.uploadFile({
							url: 'https://www.nazhua.net/api/comment/upload',
							filePath: this.data.imageArray[i][0],
							name: 'file',
							success: (res) => {
								i++
								ass += res.data + ','
								// 第三章图上传
								if (i < this.data.imageArray.length) {
									console.log('图片' + i + '上传完成')
									wx.uploadFile({
										url: 'https://www.nazhua.net/api/comment/upload',
										filePath: this.data.imageArray[i][0],
										name: 'file',
										success: (res) => {
											i++
											ass += res.data + ','
											// 判断上传三张图后上传文字
											if (i <= this.data.imageArray.length) {
												console.log('图片' + i + '上传完成')
												app.request.post({
													url: "comment/index",
													isLoading: true,
													data: {
														order_id: that.data.order_id,
														content: that.data.commentText,
														score: this.data.scoresa,
														user_img: ass,
														is_anonymous: that.data.is_anonymous
													},
													success: (lol) => {
														if (lol.state == 1) {
															wx.switchTab({
																url: '/pages/personal/order/order',
															})
															setTimeout(() => {
																wx.showToast({
																	title: lol.msg,
																	icon: 'success',
																	mask: 'true',
																	duration: 1500
																})
															}, 500)

														} else {
															app.showtost(lol.msg)
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
														score: this.data.scoresa,
														user_img: ass
													},
													success: (lol) => {
														if (lol.state == 1) {
															wx.switchTab({
																url: '/pages/personal/order/order',
															})
															setTimeout(() => {
																wx.showToast({
																	title: lol.msg,
																	icon: 'success',
																	mask: 'true',
																	duration: 1500
																})
															}, 500)

														} else {
															app.showtost(lol.msg)
														}
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
											score: this.data.scoresa,
											user_img: ass
										},
										success: (lol) => {
											if (lol.state == 1) {
												wx.switchTab({
													url: '/pages/personal/order/order',
												})
												setTimeout(() => {
													wx.showToast({
														title: lol.msg,
														icon: 'success',
														mask: 'true',
														duration: 1500
													})
												}, 500)

											} else {
												app.showtost(lol.msg)
											}
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
								score: this.data.scoresa,
								user_img: ass
							},
							success: (lol) => {
								if (lol.state == 1) {
									wx.switchTab({
										url: '/pages/personal/order/order',
									})
									setTimeout(() => {
										wx.showToast({
											title: lol.msg,
											icon: 'success',
											mask: 'true',
											duration: 1500
										})
									}, 500)

								} else {
									app.showtost(lol.msg)
								}
							}
						})
					}
				}
			})
		 } else{
			app.request.post({
				url: "comment/index",
				isLoading: true,
				data: {
					order_id: that.data.order_id,
					content: that.data.commentText,
					is_anonymous: that.data.is_anonymous,
					score: this.data.scoresa,
					user_img: ''
				},
				success: (lol) => {
if(lol.state == 1){
					wx.navigateBack({ url:'?cid=1' })
					setTimeout(() => {
						wx.showToast({
							title: lol.msg,
							icon: 'success',
							mask: 'true',
							duration:1500
						})},500)

}else{
	app.showtost(lol.msg)
}
				}
			})
		 }
		
  }
	}

})