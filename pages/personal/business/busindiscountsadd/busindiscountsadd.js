// pages/personal/business/busindiscountsadd/busindiscountsadd.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		order: [{ text: '免费', type_id: 1 }, { text: '区域类型', type_id: 2 }, ],
		cid:1,
		region: ['四川省', '成都市', '全部'],
		customItem: '全部',
		navActive: 0,
		display:false,
		items: [{
			id: '9',
			value: '微信支付',
			checked: 'true'
		},
		{
			id: '6',
			value: '余额支付'
		}
		],
		pay_mode:9,
		goodnumber:1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			shop_id:options.shop_id
		})
		this.getgoodsList()
		this.init();
	},
	// 头部选择类型
	addorderid: function (e) {
		this.setData({
			cid: e.currentTarget.dataset.id
		})
		this.init();
	},
// 省市区选择器
	bindRegionChange(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			region: e.detail.value
		})
	},
	// 类型选择
	navClick(e) {
		this.setData({
			navActive: e.target.dataset.index
		})
		// this.ruset();
	},
	// 商品的菜单列表获取
	getgoodsList: function () {
		app.request.post({
			url: "user/getcat",
			success: (e) => {
				this.setData({
					navArray: e.cat
				})
			}
		})
	},
	//获取优惠券
	init(){
		app.request.post({
			url: "buy_virtual/index",
			data: {
				shop_id:this.data.shop_id,
				type_id:this.data.cid,
				page:1
			},
			success: (e) => {
				this.setData({
					virtual: e.virtual
				})
			}
		})
	},
	//控制购买弹窗弹出
	alentbuy(e){
			this.setData({
				display:true,
				x:e.currentTarget.dataset.id,
				card_sn: e.currentTarget.dataset.card_sn
			})
	},
	// 控制弹窗关闭
	closepage(){
		
		this.setData({
			display: false,
			goodnumber:0
		})
	},
	// 商品数量
	inputcenter(e){
		if (this.data.goodnumber >= this.data.virtual[this.data.x].sale_number) {
			app.showtost('该店铺一次只能购买' + this.data.virtual[this.data.x].sale_number + '张')
		} else {
			if (this.data.goodnumber > this.data.virtual[this.data.x].card_number) {
				app.showtost('该店铺还剩' + this.data.virtual[this.data.x].card_number +'张')
			} 
		}
		this.setData({
			goodnumber: e.detail.value
		})
	},
	// 加数量
	add(e){

		if (this.data.goodnumber >= this.data.virtual[this.data.x].sale_number) {
			app.showtost('该店铺只有' + this.data.virtual[this.data.x].sale_number +'张在出售')
		} else {
		if(this.data.goodnumber > 100 ){
				app.showtost('最多能买100张')
		}else{
			this.setData({
				goodnumber: this.data.goodnumber + 1
			})
		}
		}

	},
	// 减数量
	loss(){
		if(this.data.goodnumber > 1){
			this.setData({
				goodnumber: this.data.goodnumber - 1
			})
		}
	},
	// 确定购买
	buyv(){
		app.request.post({
			url: "buy_virtual/buyVirtual",
			data: {
				shop_id: this.data.shop_id,
				pay_mode:this.data.pay_mode,
				number: this.data.goodnumber,
				card_sn:this.data.card_sn
			},
			success: (e) => {
					if(e.state==1){
						app.request.post({
							url: "buy_virtual/buyVirtual",
							data: {
								order_id:	e.order_id,
								pay_mode:	e.pay_mode
							},
							success:(res)=>{
									if(res.state==1){
										console.log(res)
									}else if(res.state==2){
										app.showtost(e.msg)
									}
							}
						})


					}else if(e.state==2){
						app.showtost(e.msg)
					}
			}
		})
	},
// 支付方式
	radioChange(e) {
		this.setData({
			pay_mode: e.detail.value
		})
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