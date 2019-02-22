// pages/personal/person/payrecharge/payrecharge.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: 'wx',
    order: [{
      text: '微信',
      type_id: 'wx'
    }, {
      text: '余额',
      type_id: 'yue'
    }, {
      text: '买单币',
      type_id: 'mdb'
    }, {
      text: '提现',
      type_id: 'tix'
    }],
    money_list: [],
    page: 1
  },


  addorderid: function(e) {
    this.setData({
      cid: e.currentTarget.dataset.id
    })
    this.init();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
  },
  init(cid) {
    app.request.post({
      url: "bill/getAllBill",
      isLoading: true,
      data: {
        page: this.data.page,
        key: this.data.cid
      },
      success: (e) => {
       
        if (e.state == 1) {
          this.setData({
            money_list: e.desc,
            page: e.page
          })
        } else {
          this.setData({
            money_list:[]
          })
        }


      }
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
  message() {
    app.request.post({
      url: "bill/getAllBill",
      data: {
        page: ++this.data.page,
        key: this.data.cid
      },
      success: (e) => {
        if (this.data.page == 1) {
          this.prompt.funPrompt({
            "type": "dataLoading"
          })
          setTimeout(() => {
            this.prompt.funPrompt({
              "type": "dataFinish"
            });
          }, 2000)
        }
        if (e.sort_shop.length == 0) {
          let type = "";
          if (this.page > 1) {
            type = "dataFinish";
          } else {
            let type = "dataNo";
          }
          this.prompt.funPrompt({
            "type": type
          });
          return;
        }

        let list = e.desc

        if (list.length > 0) {
          list = list.concat(this.data.money_list);
        } else {
          list = e.desc;
        }
        this.setData({
          money_list: list
        })
      }
    })
  },


  initii(cid) {
    app.request.post({
      url: "bill/getAllBill",
      isLoading: true,
      data: {
        page: ++this.data.page,
        key: this.data.cid
      },
      success: (e) => {

        if (e.state == 1) {
          this.setData({
            money_list: this.data.money_list.concat(e.desc),
            page: e.page
          })
        } else {
          app.showtost(e.msg);
          this.setData({
            page:1
          })
        }


      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.initii()
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})