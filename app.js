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
        url: '/pages/dengl/dengl',
      })
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
  //多张图片上传
  uploadimg:function (data){
    var that = this,
    i=data.i ? data.i : 0,//当前上传的哪张图片
    success=data.success ? data.success : 0,//上传成功的个数
    fail=data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',//这里根据自己的实际情况改
      formData: null,//这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp)
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    })
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
				// this.request.post({
				// 	url: "pay/editOrderStatus",
				// 	isLoading: true,
				// 	data: {
				// 		order_id: e.order_id,
				// 		pay_mode: e.pay_mode
				// 	},
				// 	success:()=>{
				// 		wx.switchTab({
				// 			url: '/pages/personal/order/order',
				// 			success: () => {
				// 				this.status.pay_order = 1,
				// 				wx.showToast({
				// 					title: '支付成功',
				// 					duration:2000,
				// 					mask:true
				// 				})
				// 			}
				// 		})
				// 	}
				// })
			
				}
		})
	},

	showtost(title){
		wx.showToast({
			title: title,
			icon:'none',
			mask:true,
			duration:3000
		})
	},
	showmodal(t,c){
		wx.showModal({
			title:t,
			content: c,
			confirmText:'确定'
		})
	},
  /*设置小程序标题 */
  setNavigationBarTitle(titile) {
    wx.setNavigationBarTitle({
      title: titile
    })
  }
})