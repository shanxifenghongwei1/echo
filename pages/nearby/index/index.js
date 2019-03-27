//获取应用实例
const app = getApp()

Page({
  data: {
    app: app,
    areaText: "请选择您当前位置",
    navArray: ["全部", "家电", "母婴", "服饰", "保健品", "医疗"],
    navActive: 0,
		// 小星星
		stars: [0, 1, 2, 3, 4],
		normalSrc: '/images/test/normal.png',
		selectedSrc: '/images/test/selected.png',
		halfSrc: '/images/test/half.png',
		key: 3.2,//评分
		// 小星星
    imgUrls: [
      'banner.jpg',
      'banner.jpg',
      'banner.jpg'
    ],
    jingwei: null,
    swiperHeight: 0, //滑动高度
    dataList: [],
    scrollHeight: 0,
    yeson: 0,
    istrues: false,
    page: 1,
		// 动画内容出现
		anima: false,
		// 根据id跳转
		gotothis:'',
  },
	onReady() {
		this.prompt = this.selectComponent("#prompt");
		this.animation = wx.createAnimation({
			duration:500
		})
	},
// 动画
	translate(){
		this.animation.translateY(140).step()
		this.setData({
			animation: this.animation.export()
		 })
		 setTimeout(()=>{
			 this.setData({
				 anima: true
			 })
		 },300)
	},

  roaming() {
    // 用户自己选择地址
    wx.chooseLocation({
      success: (e) => {
        if (e.name) {
          this.setData({
            areaText: e.name,
            jwdu: e
          })
          this.repositionings(e);
        } else {
          this.setData({
            areaText: '请选择您当前位置'
          })
        }
      }
    })
  },
  // 将选择的地址发送过去
  repositionings(e) {
    app.request.post({
      url: "user/getaddress",
      data: {
        lat: e.latitude,
        lng: e.longitude
      },
      success: (e) => {
        this.ruset();
      }
    })
  },
	// 获取banner图
  addbanner() {
		app.request.post({
			url: "ad/getAd",
			success: (e) => {
				this.setData({
					banner: e.banner,
					left: e.left,
					promests:e.is_show,
					right_bottom: e.right_bottom,
					right_top: e.right_top,
				})
			}
		})

  },
 
  // 搜索栏
  jump() {
		wx.navigateTo({
			url:'/pages/nearby/sousuo/sousuo',
		})
  },
  onLoad(option) {
    app.setNavigationBarTitle("附近商家");
    let share = wx.getStorageSync('share')
    this.page = 0;
    app.utils.computeScrollViewHeight((e) => {
      this.setData({
        scrollHeight: e,
        share: share
      });
    });
    this.getgoodsList();
    app.dengluzt()
		this.init();

  },

  // 商品的菜单列表选择
  getgoodsList: function() {
    app.request.post({
      url: "user/getcat",
      data: {},
      success: (e) => {
        this.setData({
          navArray: e.cat
        })
      }
    })
  },
  init() {
    // 获取用户位置信息

    wx.getLocation({
      type: 'wgs84',
			fail:(asd)=>{
				console.log(asd+'用户点击了否')
			},
      success: (e) => {
        this.jingwei = e;
        this.setData({
          jwdu: e
        })
        // 拿着经纬度去发请求后台了
        this.getdizhi(e);
        //  第一页的数据
        this.ruset();
        //  分页的数据
      }
    });



  },
  onShow: function() {

		this.look_user_getsetting();
		this.addbanner();

  },

// 判断用户是否授权
look_user_getsetting(){
	wx.getSetting({
		success: (res) => {
			if (!res.authSetting['scope.userLocation']) {
				this.ifnogetadress()
			} else {
				this.setData({
					istrues: false
				})
			}
		}
	})
},



ifnogetadress(){
  var that = this
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {

					that.setData({
						istrues: false
					})
					wx.getLocation({
						type: 'wgs84',
						success: (e) => {
							that.jingwei = e;
							that.setData({
								jwdu: e
							})
							// 拿着经纬度去发请求后台了
							that.getdizhi(e);
							//  第一页的数据
							that.ruset();

							that.roaming();
						}
					});


         
        }else{
					that.setData({
						istrues: true
					})
        }
      }
    })

},

  osd() {

    var that = this
    wx.openSetting({
      success: (as) => {
				that.setData({
					istrues: false
				})
        console.log(as)
        if (as.authSetting['scope.userLocation']) {

          wx.getLocation({
            type: 'wgs84',
            success: (e) => {
              that.jingwei = e;
              that.setData({
                jwdu: e,
                istrues: false
              })
              // 拿着经纬度去发请求后台了
              that.getdizhi(e);
              //  第一页的数据
              that.ruset();
              //  分页的数据
            }
          });
        }
      }
    })
  },
  qwas() {
    if (this.data.istrues == true) {
      this.setData({
        istrues: false
      })
    }
  },
  // 传给后台位置
  getdizhi(latlon) {
    app.request.post({
      url: "user/getaddress",
			
      data: {
        lat: latlon.latitude,
        lng: latlon.longitude,
				
      },
      success: (e) => {
        this.setData({
          areaText: e.address
        })

      }
    })
  },
  // 从数据那儿获取数据
  ruset() {
    app.request.post({
      url: "user/nobleaddress",
      data: {
        page: 1,
        lat: this.data.jwdu.latitude,
        lng: this.data.jwdu.longitude,
        keywords: this.data.navActive
      },
      success: (e) => {
        this.setData({
          dataList: e.sort_shop,
					// key:
        })
      }
    })
  },
  makePhoneCall(e) {
    app.utils.makePhoneCall("" + e.currentTarget.dataset.phone);
  },
  navClick(e) {
		// console.log(e)
		// JSON.stringify(e)
		this.setData({
			anima:false,
			navActive:e.currentTarget.dataset.index,
			gotothis:'q'+ e.currentTarget.dataset.index
		})
    // this.setData({
    //   navActive: e.target.dataset.index
    // })
    this.ruset();

  },
  imageLoad(e) { //获取图片真实宽度  
    this.setData({
      swiperHeight: app.utils.imageCalculate(e)
    })
  },
// 点击banner图跳转
	go_banner(e){

		wx.navigateTo({
			url:e.currentTarget.dataset.img,
		})
	},

// 左面 第一张小图
	left_go_img(e){
	
		wx.navigateTo({
			url:e.currentTarget.dataset.id,
		})
	},

// 右面 上面 的图
	right_go_img(e){
		wx.navigateTo({
			url: e.currentTarget.dataset.id,
		})
	},

// 右面 下面 的图
	right_go_img_bottom(e){
		wx.navigateTo({
			url: e.currentTarget.dataset.id,
		})
	},


// 下拉刷新
	bindscrolltouppers(){
	wx.startPullDownRefresh()
	},

  // 商品分页
  scrolltolower() {

    app.request.post({
      url: "user/nobleaddress",
      data: {
        page: ++this.data.page,
        lat: this.jingwei.latitude,
        lng: this.jingwei.longitude,
        keywords: this.data.navActive
      },
      success: (e) => {
        if (this.data.page == 1) {
          this.prompt.funPrompt({
            "type": "dataLoading"
          });
        }
        if (e.sort_shop.length == 0) {
          let type = "";
          if (this.page > 1) {
            type = "dataFinish";
          } else {
            let type = "dataNo";
          }
          this.prompt.funPrompt({
            "type": type
          });
          return;
        }

        let list = e.sort_shop

        if (list.length > 0) {
					list = this.data.dataList.concat(list);
        } else {
          list = e.sort_shop;
        }
        this.setData({
          dataList: list
        })
      }
    })
  },
  clickTabBar(e) {
    let juli = e.currentTarget.dataset.di
    if (this.data.yeson == 0) {
      if (app.globalData.shopType == app.status.shopType.shop_status_Type) {
        app.globalData.shopId = e.currentTarget.dataset.id;
      }
      wx.switchTab({
        url: '/pages/index/index',
        success: () => {
          wx.setStorageSync('diliweizhi', juli)
        }
      })
    } else if (this.data.yeson == 20) {
      console.log('已经有了')
    }
  },
	// 上啦触底
  onReachBottom: function() {
    this.scrolltolower();
  },
	/**
	* 页面相关事件处理函数--监听用户下拉动作
	*/
	onPullDownRefresh: function () {
		wx.showNavigationBarLoading()
		app.request.post({
			url: "user/nobleaddress",
			isLoading: true,
			data: {
				page: 1,
				lat: this.data.jwdu.latitude,
				lng: this.data.jwdu.longitude,
				keywords: this.data.navActive,
				is_refresh_class: 1
			},
			success: (e) => {
				this.setData({
					dataList: e.sort_shop,
					page:1
				})
				wx.hideNavigationBarLoading()
				wx.stopPullDownRefresh()
			}
		})
	},
})