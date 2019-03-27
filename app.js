import common from "/utils/request.js"
import regular from "/utils/regular.js"
import utils from "/utils/utils.js"
import promise from "/utils/promise.js"

App({
  globalData: {
    userInfo: {},
    shopId: 129, //店铺id
    shopType: 0, //首次进入店铺方式    0.附近活动进入   1.分享进入二维码进入
    voucher: {
      "fullFeduction": 16, //满减
      "fullGift": 18 //满赠 
    },
		stashop:0
  },
  status: {
    shopType: { //进入店铺方式
      shop_status_Type: 0,
      shop_share_Type: 1
    },
    typeCollection: { //商品收藏状态  1.收藏  2.取消收藏
      collection: 1,
      cancel: 2
    },
    orderType: { //下单方式   1.店铺下蛋   2.商品下蛋  
      shop: 1,
      goods: 2,
    },
    pay_order: 2,
    dengluzhuangtai: 3
  },
  dengluzt() {
    if (!wx.getStorageSync('user_id')) {
			wx.navigateTo({
				url:'/pages/dengl/dengl',
			})
			// wx.reLaunch({
      //   url: '/pages/dengl/dengl',
      // })
    }
  },
  host: common.host,
  regular: regular,
  utils: utils,
  request: {
    post: common.post
  },
  onHide() {
    this.globalData.shopType = this.status.shopType.shop_status_Type;
  },
	wxPromisify:function (fn) {
		return function (obj = {}) {
			return new Promise((resolve, reject) => {
				obj.success = function (res) {
					//成功
					resolve(res)
				}
				obj.fail = function (res) {
					//失败
					reject(res)
				}
				fn(obj)
			})
		}
	},
	subdue(datass){
		var that = this
		this.request.post({
			url: "pay/balance_pay",
			isLoading: true,
			data: {
				order_id: datass.order_id, //"订单Id",
				order_number: datass.goods_number, //"订单数量",
				order_money: datass.order_money, //"支付的金额",
				virtual_id: 0, //"优惠券Id",
				order_type: datass.order_type
			},
			success: (e) => {
				}
		})
	},
// 多图上传
	upload_img(data){
		wx.uploadFile({
			url: data.url,
			filePath: data.path,
			name: data.name,
			success: (res) => {
				res = data.success(res)
			}
		})
	},
// 多图上传
  upload_imgs(data){
		var i = data.i ? data.i : 0;
		var url = data.n_url ? data.url+data.n_url + i : data.url;
		wx.uploadFile({
			url:url,
			filePath: data.banner[i],
			name: data.name,
			success: (res) => {
				if (res.statusCode == 200 && i < data.banner.length ) {
					data.i = i+1;
					res = data.success(res)
					this.upload_imgs(data);
				} else {
					console.log('完成')
				}
			}
		})
	},




	showtost(title){
		wx.showToast({
			title: title,
			icon:'none',
			mask:true,
			duration:2000
		})
	},
	showmodal(t,c){
		wx.showModal({
			title:t,
			content: c,
			confirmText:'确定'
		})
	},
	navigateback(back){
		wx.navigateBack({
			delta:back.dalta?"":1,
			success:back.success
		})
	},
	backnavig(back){
		wx.navigateBack({
			success:back.success
		})
	},
	del_msg(yes){
		wx.showModal({
			title: yes.t,
			content: yes.c,
			success:yes.s
		})
	},
	formatTimeTwo: function(number, format) {

		var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
		var returnArr = [];

		var date = new Date(number * 1000);
		returnArr.push(date.getFullYear());
		returnArr.push(formatNumber(date.getMonth() + 1));
		returnArr.push(formatNumber(date.getDate()));

		returnArr.push(formatNumber(date.getHours()));
		returnArr.push(formatNumber(date.getMinutes()));
		returnArr.push(formatNumber(date.getSeconds()));

		for(var i in returnArr) {
	format = format.replace(formateArr[i], returnArr[i]);
}
return format;
},
  /*设置小程序标题 */
  setNavigationBarTitle(titile) {
    wx.setNavigationBarTitle({
      title: titile
    })
  }
})