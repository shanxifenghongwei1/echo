// pages/personal/business/businessactiveadd/businessactiveadd.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        id: '19',
        value: '现金券',
        checked: 'true'
      },
			
      {
        id: '17',
        value: '产品券'
      },
      {
        id: '16',
        value: '满减券'
      },
    ],
		region: [],
    atems: [{
        id: '1',
        value: '是',
      },
      {
        id: '0',
        value: '否',
        checked: 'true'
      }
    ],
    istrue: 7,
    mode: 8,
    shopping: false,
    index: 0,
		indexs:0,
		customItem:'全部',
    date: '',
  },
  radioChange(e) {
    this.setData({
      mode: e.detail.value
    })
  },
  // 是否
  radioChanges(e) {
    this.setData({
      istrue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var timestamp = Date.parse(new Date());

    timestamp = timestamp / 1000;
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    this.setData({
      shop_id: options.shop_id,
      start: '' + Y + '-' + M + '-' + D,
      date: '' + Y + '-' + M + '-' + D,
      dates: '' + Y + '-' + M + '-' + D
    })
    console.log(this.data.start)
    this.init()
  },
  addshopmoney(e) {
		e.detail.value.address = this.data.region
		e.detail.value.sale_type = this.data.sale_type
		e.detail.value.goods_id = this.data.goods_id
    console.log(e.detail.value)
    app.request.post({
      url: 'virtual/addVirtual',				
      data: {
        virtual: e.detail.value,
        shop_id: this.data.shop_id
      },
      success: (res) => {
				if(res.state == 1){
				wx.navigateBack({
					delta: 1,
					success:()=>{
						setTimeout(()=>{
							app.showtost(res.msg);
						},100)
					}
				})
				}else if(res.state == 2){
					app.showtost(res.msg)
				}
      }
    })
  },
  init() {
    app.request.post({
      url: 'virtual/getGoodsList',
      data: {
        shop_id: this.data.shop_id
      },
      success: (res) => {
        this.setData({
          goods: res.goods,
					goods_id:res.goods[0].goods_id
        })
      }
    })

		app.request.post({
			url: "user/getcat",
			success: (e) => {
				let c = e.cat
			c.forEach((k,v)=>{
						if(k.id==0){
							k.cat_name = '无'
						}
				})
				this.setData({
					navArray: c
				})
			}
		})



  },
  bindPickerChange(e) {
    let b = this.data.goods
    b.forEach((k, v) => {
      if (v == e.detail.value) {
        this.setData({
          goods_id: k.goods_id
        })
      }
    })
    this.setData({
      index: e.detail.value
    })
  },
	bindPickerChanges(e) {
		let b = this.data.navArray
		b.forEach((k, v) => {
			if (v == e.detail.value) {
				this.setData({
					sale_type: k.id
				})
			}
		})
		this.setData({
			indexs: e.detail.value
		})
	},
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChanges(e) {
    this.setData({
      dates: e.detail.value
    })
  },
	bindRegionChange(e) {
		this.setData({
			region: e.detail.value
		})
		
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