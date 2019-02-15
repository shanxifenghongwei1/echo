//获取应用实例
const app = getApp()

Page({
  data: {
    app: app,
    areaText: "请选择您当前位置",
    navArray: ["全部", "家电", "母婴", "服饰", "保健品", "医疗"],
    navActive: 0,
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
    page: 1
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
	addbanner(){
		app.request.post({
			url: "ad/index",
			data:{
				position_id:2
			},
			success: (e) => {
			
				this.setData({
					imgUrls:e
				})
			}
		})
	},
	addbanners() {
		app.request.post({
			url: "ad/index",
			data: {
				position_id: 1
			},
			success: (e) => {
				this.setData({
					smallbanner: e
				})
			}
		})
	},
  // 搜索栏
  jump() {

  },
  onLoad(option) {
    app.setNavigationBarTitle("附近商家");
		let share = wx.getStorageSync('share')
    this.page = 0;
    app.utils.computeScrollViewHeight((e) => {
      this.setData({
        scrollHeight: e , 
				share:share
      });
    });
    this.getgoodsList();
    this.init();
	

  },
  onReady() {
    this.prompt = this.selectComponent("#prompt");
    // this.prompt.funPrompt({
    //   "type": "init"
    // });
  },
  // 商品的菜单列表选择
  getgoodsList:function(){
    app.request.post({
      url: "user/getcat",
      data: {},
      success: (e) => { 
        this.setData({
          navArray:e.cat
        })
      }
    })
  },
  init() {
    // 获取用户位置信息
    wx.getLocation({
      type: 'wgs84',
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
		this.addbanner();
		this.addbanners();
    app.dengluzt()
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
          dataList: e.sort_shop
        })

      }
    })
  },
  makePhoneCall(e) {
    app.utils.makePhoneCall("" + e.currentTarget.dataset.phone);
  },
  navClick(e) {
    this.setData({
      navActive: e.target.dataset.index
    })
    this.ruset();
    
  },
  imageLoad(e) { //获取图片真实宽度  
    this.setData({
      swiperHeight: app.utils.imageCalculate(e)
    })
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
          list = list.concat(this.data.dataList);
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
	onReachBottom:function(){
		this.scrolltolower();
	}
})