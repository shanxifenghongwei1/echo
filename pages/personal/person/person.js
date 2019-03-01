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
    app.utils.makePhoneCall("02867876665");
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
				url: '/pages/personal/person/userwaitmoney/userwaitmoney?payforid=4&zongyue='+ this.data.user_money,
			})
		}
	},
  /**
   * 生命周期函数--监听页面加载
   */
	oanduan(){
		app.showtost('该功能在开发中，敬请期待')
	},
  onShow: function() {
    let usermane = wx.getStorageSync('user_info')
    this.setData({
      userInfo: usermane
    })
    this.init();
  
  },

  init() {
    // 我的余额
    app.request.post({
      url: "user/mymoney",
      isLoading:false,
      success: (e) => {
        this.setData({
          user_money: e.user_money,
					// business:e.is_merchant,
        })
				let change_shop_id = wx.getStorageSync('change_my_shop_id')

				if (change_shop_id){
					this.setData({
						myshop_id: change_shop_id
					})
				}else{
					this.setData({
						myshop_id: e.myshop_id[0].id
					})
				}
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
  },


	
})