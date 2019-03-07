// pages/personal/business/business.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1109507497,1637582812&fm=27&gp=0.jpg',
    autoplay:true,
    interval:2000,
    vertical:true,
    srcs: []
  },
  qrcode:function(){
		var that = this
  wx.scanCode({
    scanType:"qrCode",
    fail(){
      wx.showToast({
        title: '未识别到二维码',
        icon:"none",
        duration:3000
      })
    },
    success(res){
			console.log('二维码拿到的')
			console.log(res)
			app.request.post({
				url: "virtual/useVirtual",
				isLoading: true,
				data: {
					card_sn: res.result,
					shop_id: that.data.myshop_id
				},
				success: (e) => {
					setTimeout(() => {
						app.showtost('识别成功')
					}, 100)
				}
			})	
    }
  })
  },
	moveid(e){
		this.setData({
			hexiao:e.detail.value
		})
	},
	eliminate(){
		app.request.post({
			url: "virtual/useVirtual",
			isLoading: true,
			data: {
				card_sn: this.data.hexiao,
				shop_id: this.data.myshop_id
			},
			success: (e) => {
				setTimeout(() => {
					if(e.state == 1){
						this.setData({
							hexiao: ''
						})
					app.showtost('识别成功')
					}else if(e.state == 2){
						app.showtost(e.msg)
					}
				}, 100)
			}
		})	
	},
	init(myshop_id){
		app.request.post({
			url: "shopcenter/shopcentermsg",
			isLoading: true,
			data: { shop_id: myshop_id},
			success: (e) => {
				this.setData({
					myshop_id: myshop_id,
					daymoney: e.daymoney,
					dayorder: e.dayorder,
					anyone_orshop:e
				})
			}
		})
// 广告
		app.request.post({
			url: "shopcenter/getad",
			isLoading: true,
			success: (res) => {
				this.setData({
					srcs:res
				})
			}
		})
	},
	switcher(){
		wx.redirectTo({
			url: '/pages/personal/business/switcher/switcher?myshop_id='+this.data.myshop_id,
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		
		app.setNavigationBarTitle("商户中心");
		let myshop_id = options.myshop_id
		this.setData({
			myshop_id: myshop_id,
		})
		this.init(myshop_id);
		// this.showneworder();
  },
	//新的订单响铃
	// showneworder: function () {
	// 	let that = this;
	// 	that.ordercount();
	// 	if (this.data.myshop_id) {
	// 		var a = setInterval(function () {
	// 			that.ordercount();
	// 		}, 6000)
	// 	}
	// },
	//获取响铃次数
	// ordercount: function () {
	// 	app.request.post({
	// 		url: "order/get_new_order",
	// 		data: {
	// 			shop_id: this.data.myshop_id
	// 		},
	// 		success: (e) => {
	// 			if (e.count !== 0) {
	// 				for (var i = 0; i < e.count; i++) {
	// 					var innerAudioContext = wx.createInnerAudioContext()
	// 					innerAudioContext.autoplay = true
	// 					innerAudioContext.src = 'https://www.nazhua.com.cn/upload/music/dd.mp3'
	// 					innerAudioContext.onPlay(() => {
	// 						console.log('开始播放')
	// 					})
	// 					wx.vibrateLong();
	// 				}
	// 			}
	// 		}
	// 	})
	// },
	initses(){
		app.request.post({
			url:'cash/bankList',
			data:{
				bussiness_id:this.data.myshop_id
			},
			success:(res)=>{
					if(res.list.length > 0){
						this.setData({
							aaa:1
						})
					}else{
						this.setData({
							aaa:0
						})
					}
			}
		})
	},


	blancked() {
		if (this.data.aaa == 0) {
			wx.navigateTo({
				url: "/pages/personal/bandcard/addbandcard/addbandcard",
				success: function () {
					setTimeout(() => {
						wx.showToast({
							title: '请您先绑定银行卡再提现',
							icon: 'none',
							duration: 3000,
							mask: true,
						})
					}, 500)
				}
			})
		} else {
			app.request.post({
				url:'business/getBusinessMoney',
				data:{
					shop_id:this.data.myshop_id
				},
				success: (res) => {
			
			wx.navigateTo({
				url: '/pages/personal/person/userwaitmoney/userwaitmoney?zongyue=' + res.cash_money + '&business_id=' + this.data.myshop_id,
			})
				}
			})
		}
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		this.initses();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})