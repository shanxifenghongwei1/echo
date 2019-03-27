// pages/join/join.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: app,
    cid: 0,
    message: [{
      id: 1,
      text: '商铺入住'
    }, {
      id: 2,
      text: '营销系统'
    }, {
      id: 3,
      text: '成为合伙人'
    }],
    region: ['北京市', '北京市', '东城区'],
    codeText: "发送验证码",
    codeStatus: 0, //  0.待发送验证码   1.发送验证码
    codeTime: null,
    codeSecond: 10,
    checked: true,
    userFrom: {
      phone: "",
      classification: 1,
      shop_personal: 3, //l类型
    }
  },
	onLoad(){
		app.setNavigationBarTitle("商家加盟");
		let opt = wx.getStorageSync('user_info')
		this.setData({
			userInfo:opt
		})
	},

// 拿到你的form_id
	popseare(e) {
		console.log(e)
		console.log('我动了！')
		let formId = e.detail.formId;
		app.request.post({
			url: 'send/getFormId',
			data: {
				form_id: formId
			},
			success: (res) => {
				console.log(res)
			}
		})
	},


  addactive: function(even) {
    let shop_personal = even.target.dataset.id;
    if (even.target.dataset.id == 3) {
      shop_personal = 2;
    } else if (even.target.dataset.id == 1) {
      shop_personal = 3;
    }
    this.setData({
      "userFrom.classification": even.target.dataset.id,
      "userFrom.shop_personal": shop_personal
    })
  },
  bindRegionChange: function(e) {
    this.setData({
      "region": e.detail.value
    })
  },
  radioChange: function(e) {
    this.setData({
      "userFrom.shop_personal": e.detail.value
    })
  },
  /*发送验证码 */
  codeBtn() {
    if (this.data.codeStatus == 1) {
      wx.showToast({
        "title": "正在发送验证码",
        "icon": "none",
      });
      return;
    } else {
      if (app.regular.regularPhone(this.data.userFrom.phone)) {
        wx.showToast({
          "title": "手机号不正确，请重新输入",
          "icon": "none",
        });
        return;
      }
      this.setData({
        codeStatus: 1,
        // codeText: (--this.data.codeSecond) + "秒"
      })

    }
    // this.data.codeTime = setInterval(() => {
    //   if (this.data.codeSecond <= 1) {
    //     clearInterval(this.data.codeTime);
    //     this.setData({
    //       codeStatus: 0,
    //       codeSecond: 10,
    //       codeText: "发送验证码"
    //     })
    //   } else {
    //     this.setData({
    //       codeText: (--this.data.codeSecond) + "秒"
    //     })
    //   }
    // }, 1000);
  },
  bindPhone(e) {

    this.setData({
      "userFrom.phone": e.detail.value
    })
  },
  userFrom(e) {
		this.popseare(e)
    this.data.userFrom.name = e.detail.value.name;
    this.data.userFrom.phone = e.detail.value.phone;
    this.data.userFrom.address = e.detail.value.address;
    this.data.userFrom.code = e.detail.value.code;
    if (this.data.userFrom.name == "") {
      wx.showToast({
        "title": "请输入姓名",
        "icon": "none",
      });
      return;
    }
    if (app.regular.regularPhone(this.data.userFrom.phone)) {
      wx.showToast({
        "title": "手机号不正确，请重新输入",
        "icon": "none",
      });
      return;
    }
    if (this.data.userFrom.address == "") {
      wx.showToast({
        "title": "请输入详细地址",
        "icon": "none",
      });
      return;
    }
    // if (!app.regular.verificationCode(this.data.userFrom.code)) {
    //   wx.showToast({
    //     "title": "验证码不正确",
    //     "icon": "none",
    //   });
    //   return;
    // }
    let address = this.data.userFrom.address;
    this.data.userFrom.address = this.data.region +"&&"+ address;
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.data.userFrom.lat = res.latitude;
        this.data.userFrom.lng = res.longitude;
        app.request.post({
          url: "msg/message",
          isLoading: true,
          data: this.data.userFrom,
         complete: (e) => {
            this.data.userFrom.address = address;
          }
        })
				wx.navigateBack({})
      },
      fail(e) {}
    })
  }
})