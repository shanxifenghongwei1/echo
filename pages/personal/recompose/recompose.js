// pages/personal/recompose/recompose.js 
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1577759731,3108671782&fm=27&gp=0.jpg',
    banner: [{
      imageurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545647890776&di=3a9cf10111e8d6a4a7a282a6225ebb6d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01511c57f9fc0ea84a0d304f5dc0c0.jpg',
      id: 0
    }, {
      imageurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545647890776&di=0b303472176960f650243e0b0dbe7aba&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F013bfa59831b5100000021299193c7.png%402o.png',
      id: 1
    }, {
      imageurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545647890775&di=10ddca3d1e6eda9ce96739f521bd5489&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F018d1b58120836a84a0d304f977625.jpg%402o.jpg',
      id: 2
    }],

    hisc: '育车网络科技有限公司',
    text_introduce: '请输入店铺简介，如果不输入将默认为未修改',
    text_nu: 100,
    type_array: ['个人', '店家', '驾校', '摊点'],
    type_index:1,
    address:'成都市郫都区保利香槟国际'
  },
// 选择店铺类型
  bindPickerChange: function (e) {
    this.setData({
      type_index: e.detail.value
    })
  },

// 表单提交
  formSubmit: function (e) {
    var  address = e.datail.value.address //地址
    var shop_name = e.datail.value.shop_name  //店铺名称
    var shop_module = e.datail.value.shop_module // 店铺简介
    var shop_type = this.data.type_array[type_index]  //店铺类型
    var shop_log = this.data.src //店铺log 图
    var shop_banner = this.data.banner //店铺 banner 图

  },

// 修改商家logo图
  user: function() {
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        this.setData({
          src: tempFilePaths
        })
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },

// 修改商家banner图
  image_exchange: function(e) {
    var data_id = e.currentTarget.dataset.id
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'],  
      sourceType: ['album', 'camera'], 
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        var abc = this.data.banner
        abc.forEach((v) => {
          if (v.id == data_id) {
            v.imageurl = tempFilePaths
          }
        })

        this.setData({
          banner: abc
        })

      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })

  },
  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function(options) {

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