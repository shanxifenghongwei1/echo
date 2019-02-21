// pages/personal/business/businessactiveadd/businessactiveadd.js
const app = getApp()

var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
//获取年份  
var Y = date.getFullYear();
//获取月份  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//获取当日日期 
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        id: '1',
        value: '充值活动',
        checked: 'true'
      },
      {
        id: '2',
        value: '支付活动'
      },
    ],
		czje: '充值',
		lengthss:6,
		page:1,
    really: false,
    date: Y + '-' + M + '-' + D,
    time: Y + '-' + M + '-' + D,
		valurl:'不赠送',
		card_id: 0,
  },

  // 活动类型的值
  radioChange(e) {
    this.setData({
      ac_type: e.detail.value
    })
		if(e.detail.value == 1){
			this.setData({
				czje: '充值'
			})
		}else if(e.detail.value == 2){
			this.setData({
				czje: '消费',
			})
		}
  },


// 优惠券触底事件
	roll() {
		app.request.post({
			url: "virtual/getBusinessVirtualList",
			data: {
				page: ++this.data.page,
				shop_id: this.data.shop_id
			},
			success: (res) => {
				console.log(res)
				if(res.cirtual == 1 ){
				this.setData({
					virtuall: this.data.virtuall.concat(res.virtual)
				})
				}else{
					virtuall: this.data.virtuall
					app.showtost('没有更多啦')
				}
			}
		})
	},
  // 控制优惠券选择
  resally() {
    if (this.data.really == true) {
      this.setData({
        really: false
      })
    } else {
      this.setData({
        really: true
      })
    }

  },

	// 活动开始时间
	bigintime(e){
		this.setData({
			date:e.detail.value
		})
	},

	// 活动结束时间
	endtime(e){
		this.setData({
			time:e.detail.value
		})
	},
	// 修改优惠券选择的内容
	gaincontent(e){
		this.setData({
			valurl:e.currentTarget.dataset.content,
			card_id:e.currentTarget.dataset.id,
			really:false,
		})
	},
// 不赠送
	dont(){
		this.setData({
			valurl:'不赠送',
			card_id:0,
			really:false
		})
	},
	// 获取优惠券
	init(){
		app.request.post({
			url: "virtual/getBusinessVirtualList",
			isLoading: true,
			data: {
				page:this.data.page,
				shop_id:this.data.shop_id
			},
			success: (res) => {
					this.setData({
						virtuall:res.virtual,
						page:1
					})
			}
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		this.setData({
			shop_id:options.shop_id
		})
  },

	// 提交
	addshopproduct(e){
	

		console.log(e.detail.value)
		let con = e.detail.value
		con.virtual_id = this.data.card_id
		con.business_id = this.data.shop_id

		let money = e.detail.value.money.split('')
		let give_money = e.detail.value.give_money.split('')
		if (money.length <= 0 ){
			app.showtost('请输入用户充值金额')
		} else if (give_money.length <= 0){
			app.showtost('请输入赠送金额')
		} else if (e.detail.value.ac_title == ''){
			app.showtost('请输入活动标题')
		} else if (e.detail.value.ac_brief == '') {
			app.showtost('请输入活动简介')
		} else if (e.detail.value.ac_tontent == '') {
			app.showtost('请输入活动内容')
		} else if (e.detail.value.ac_etime == e.detail.value.ac_stime) {
			app.showtost('请重新规划活动时间')
		}else{
			app.request.post({
				url: "activity/addActivity",
				data: con,
				success: (res) => {
					if (res.state == 1) {
						wx.navigateBack({
							success: () => {
								setTimeout(() => {
									app.showtost(res.msg)
								})
							}
						})
					}else{
						app.showtost(res.msg)
					}
				}
			})
		}
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
		this.init();
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