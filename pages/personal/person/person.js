const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
 
    userInfo: {},
  },
// 电话号码
  makePhoneCall: function(e) {
    app.utils.makePhoneCall("87654321000" + e.currentTarget.dataset.phone);
  },
	
	blancked(){
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
		}else{
			wx.navigateTo({
				url: '/pages/personal/person/recharges/recharge?payforid=4&zongyue='+ this.data.user_money,
			})
		}
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    let usermane = wx.getStorageSync('user_info')
    this.setData({
      userInfo: usermane
    })
    this.init();
    app.dengluzt();
  },

  init() {
    // 我的余额
    app.request.post({
      url: "user/mymoney",
      isLoading:false,
      success: (e) => {
        this.setData({
          user_money: e.user_money,
					business:e.is_merchant,
					myshop_id:e.myshop_id
        })
      }
    })

		app.request.post({
			url: "cash/bankList",
			success: (e) => {
				if (e.length==0) {
						this.setData({
							aaa:0
						})
				}else if(e.length>0){
					this.setData({
						aaa:1
					})
				}
			}
		})
  },

  onLoad: function(options) {
		console.log('二维码收到的')
		console.log(options)
		this.setData({
			scene:options.scene
		})
    app.setNavigationBarTitle("个人中心");
    app.dengluzt();
		this.adsinit();
  },

adsinit(){
	app.request.post({
		url: "user/nobleaddress",
		data: {
			words: '海底捞',
		},
		success: (sss) => {
			console.log(sss)
			var shop_data = sss.sort_shop;
			this.setData({
				shop_data: shop_data
			})
		}
	})
}
	
})