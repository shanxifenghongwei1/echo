// pages/sousuo/sousuo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [{
        goods: '水果',
        goodsId: 1
      },
      {
        goods: '橘子',
        goodsId: 2
      },
      {
        goods: '米面粮油',
        goodsId: 3
      }
    ],
    sea_list: [{
      text: '商品',
      id: 1
    }, {
      text: '店铺',
      id: 2
    }],
    cid: 1,
		page:1,
    istrue: true,
		dataList:[],
    userinput: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    this.getsearchList();
		let crr = wx.getStorageSync('storyList_shop')
		console.log(crr)
		if (crr.length <= 0) {
			this.setData({
				content: true
			})
		}
  },
  onLoad: function(options) {

  },
  search: function(e) {
    this.setData({
      userinput: e.detail.value
    })
    if (e.detail.value.length > 0) {
      this.setData({
        istrue: false
      })
      return;
    }
    if (e.detail.value.length == 0) {
      this.setData({
        istrue: true
      })
      return;
    }
  },

idonno(e){

console.log('点击开始')

	this.setData({
		istrue: false
	})
	let storyList_shop = wx.getStorageSync('storyList_shop')
	if (this.data.cid == 2) {
		app.request.post({
			url: 'user/nobleaddress',
			isLoading: true,
			data: {
				shop_name: e.detail.value,
				page: this.data.page
			},
			success: (res) => {
				console.log('请求了接口')
				if (res.msg == 1) {
					this.setData({
						dataList: res.sort_shop,
						searchList: e.detail.value
					})
					if (storyList_shop instanceof Array) {
						if (storyList_shop.length >= 10) {
							storyList_shop.unshift(e.detail.value)
							storyList_shop.pop()
							wx.setStorageSync('storyList_shop', storyList_shop)
						} else {
							storyList_shop.push(e.detail.value)
							wx.setStorageSync('storyList_shop', storyList_shop)
						}
					} else {
						let array = []
						array.push(e.detail.value)
						let story = wx.setStorageSync('storyList_shop', array)
					}

				} else {
					this.setData({
						trytext: '无相关店铺',
						dataList: []
					})
				}

			}
		})
	} else if (this.data.cid == 1) {
		app.request.post({
			url: 'merchant/selegoods',
			isLoading: true,
			data: {
				goods_name: e.detail.value,
				page: this.data.page
			},
			success: (res) => {

				if (res.msg == 1) {
					this.setData({
						sele_goods: res.sele_goods,
						searchList: e.detail.value
					})
					// 王历史里面存
					if (storyList_shop instanceof Array) {
						if (storyList_shop.length >= 10) {
							storyList_shop.unshift(e.detail.value)
							storyList_shop.pop()
							wx.setStorageSync('storyList_shop', storyList_shop)
						} else {
							storyList_shop.push(e.detail.value)
							wx.setStorageSync('storyList_shop', storyList_shop)
						}
					} else {
						let array = []
						array.push(e.detail.value)
						let story = wx.setStorageSync('storyList_shop', array)
					}

				} else {
					this.setData({
						trytext: '无相关产品',
						sele_goods: []
					})
				}

			}
		})
	}
},
  // 点击搜索
  gosearch(e) {

		this.setData({
			istrue:false
		})
    let storyList_shop = wx.getStorageSync('storyList_shop')
    if (this.data.cid == 2) {
      app.request.post({
        url: 'user/nobleaddress',
        isLoading: true,
        data: {
          shop_name: this.data.userinput,
          page: this.data.page
        },
        success: (res) => {
          if (res.msg == 1) {
            this.setData({
              dataList: res.sort_shop,
							searchList: this.data.userinput
            })
            if (storyList_shop instanceof Array) {
              if (storyList_shop.length >= 10) {
                storyList_shop.unshift(this.data.userinput)
                storyList_shop.pop()
                wx.setStorageSync('storyList_shop', storyList_shop)
              } else {
                storyList_shop.push(this.data.userinput)
                wx.setStorageSync('storyList_shop', storyList_shop)
              }
            } else {
              let array = []
              array.push(this.data.userinput)
              let story = wx.setStorageSync('storyList_shop', array)
            }

          } else {
            this.setData({
              trytext: '无相关店铺',
              dataList: []
            })
          }

        }
      })
    } else if (this.data.cid == 1) {
      app.request.post({
        url: 'merchant/selegoods',
        isLoading: true,
        data: {
          goods_name: this.data.userinput,
          page: this.data.page
        },
        success: (res) => {
 
          if (res.msg == 1) {
            this.setData({
              sele_goods: res.sele_goods,
							searchList: this.data.userinput
            })
			// 王历史里面存
						if (storyList_shop instanceof Array) {
							if (storyList_shop.length >= 10) {
								storyList_shop.unshift(this.data.userinput)
								storyList_shop.pop()
								wx.setStorageSync('storyList_shop', storyList_shop)
							} else {
								storyList_shop.push(this.data.userinput)
								wx.setStorageSync('storyList_shop', storyList_shop)
							}
						} else {
							let array = []
							array.push(this.data.userinput)
							let story = wx.setStorageSync('storyList_shop', array)
						}

          } else {
            console.log('sads')
            this.setData({
              trytext: '无相关产品',
              sele_goods: []
            })
          }

        }
      })
    }


  },

  // 切换搜索模式
  barter(e) {
    this.setData({
      cid: e.currentTarget.dataset.id
    })
  },
// 展示历史
  getsearchList() {
    let arr = wx.getStorageSync('storyList_shop')
    var hash = [];
		for (var i = 0; i < arr.length; i++) {
			if (arr.indexOf(arr[i]) == i) {
				hash.push(arr[i]);
			}
		}
    
    this.setData({
      searchList: hash
    })

  },

  // 点击历史
  cesrch(e) {
		this.setData({
			userinput:e.currentTarget.dataset.id,
			page:1
		})
    if (this.data.cid == 2) {
      app.request.post({
        url: 'user/nobleaddress',
        isLoading: true,
        data: {
          shop_name: this.data.userinput,
          page:this.data.page
        },
        success: (res) => {
          if (res.msg == 1) {
            this.setData({
              dataList: res.sort_shop,
							istrue:false
            })
          }
        }
      })

    } else if (this.data.cid == 1) {
      app.request.post({
        url: 'merchant/selegoods',
        isLoading: true,
        data: {
					goods_name: this.data.userinput,
          page: this.data.page
        },
        success: (res) => {
          if (res.msg == 1) {
            this.setData({
              sele_goods: res.sele_goods,
							istrue:false
            })		
          }
        }
      })
    }
  },

	// 商店分页
shop_pages(){
	app.request.post({
		url: 'user/nobleaddress',
		isLoading: true,
		data: {
			shop_name: this.data.userinput,
			page: ++this.data.page
		},
		success: (res) => {
			if (res.msg == 1) {
				this.setData({
					dataList: this.data.dataList.concat(res.sort_shop),
				})
			}
		}
	})
},
// 商品分页
goods_pages(){
	app.request.post({
		url: 'merchant/selegoods',
		isLoading: true,
		data: {
			goods_name: this.data.userinput,
			page: ++this.data.page
		},
		success: (res) => {
			if (res.msg == 1) {
				this.setData({
					sele_goods: this.data.sele_goods.concat(res.sele_goods)
				})
			}
		}
	})
},
// 删除历史
	deletes(){
		wx.setStorageSync("storyList_shop", [])
		this.setData({
			searchList:[],
			content:true
		})
	},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
		this.shop_pages();
		this.goods_pages()
	},
})