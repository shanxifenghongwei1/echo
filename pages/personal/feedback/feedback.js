// pages/personal/feedback/feedback.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
      id: '遇到问题',
        value: '遇到问题',
        checked: 'true'
      },
      {
        id: '功能建议',
        value: '功能建议'
      },
    ],
    texr_area_value: '',
    text_introduce: '比如在()情况下，小程序出现了()异常。 小提示：最少输入10个字',
    number: 0,
    phone:''
  },
  // 表单字数验证
  addmove: function(e) {
    this.setData({
      number: e.detail.cursor
    })
    if (e.detail.cursor > 100) {

      wx.showToast({
        title: '最多能输入100个字哦',
        icon: 'none',
        duration: 2000
      })
    }

  },

  input_user_iphone:function(iven){
    this.setData({
      phone:iven.detail.value
    })
     
  },

  // 表单提交
  formSubmit: function(e) {
    if (this.data.number < 10) {
      wx.showToast({
        title: '最少输入10个字哦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (app.regular.regularPhone(this.data.phone)) {
      wx.showToast({
        "title": "手机号不正确，请重新输入",
        "icon": "none",
      });
      return;
    }
    
    console.log(e)
    let type = e.detail.value.radio_group
    let desc = e.detail.value.shop_module
    let iPhone = e.detail.value.iphone

    app.request.post({
      url: "suggest/suggest",
      isLoading: true,
      data: {
        type: type,
        desc: desc,
        iphone: iPhone
      },
			success:(res)=>{
				wx.navigateBack({})
			}
    })

  },


  // 遇到问题/功能建议
  radioChange(e) {
    if (e.detail.value == '遇到问题') {
      this.setData({
        text_introduce: '比如在()情况下，小程序出现了()异常。小提示：最少输入10个字'
      })
    } else if (e.detail.value == '功能建议') {
      this.setData({
        text_introduce: '比如我希望加入/完善()功能，因为()。 小提示：最少输入10个字'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		app.setNavigationBarTitle("意见反馈");
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