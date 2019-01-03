// pages/personal/coupon/coupon.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_coupon: [],
    page: 0,
    taxtalgin: false,
    card_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },


  formSubmit(e) {
    this.init(e);
  },

  init(e) {
    var card_id = this.data.card_id
    app.request.post({
      url: "user/givecard",
      isLoading: true,
      data: {
        card_id: card_id,
        nickname: e.detail.value.pinput
      },
      success: (res) => {
        let imgArray = this.data.my_coupon;
        imgArray.splice(this.index, 1);
        this.setData({
          my_coupon: imgArray,
          taxtalgin: false
        })
      }
    });
  },
  /**
   *
   * 生命周期函数--监听页面初次渲染完成
   */
  present(e){ 
    this.index = e.currentTarget.dataset.index;
    this.setData({
      taxtalgin:true,
      card_id: e.currentTarget.dataset.card_id
    })

  },

  colsess(){
    this.setData({
      taxtalgin: false
    })
  },


  onReady: function() {
    this.prompt = this.selectComponent("#prompt");
    this.prompt.funPrompt({
      "type": "init"
    });
    this.getcoupon();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getcoupon();
  },

  getcoupon() {
    
    if (this.prompt.getJudgePromptType()) {
      return;
    }
    app.request.post({
      url: "user/mycard",
      // isLoading: true,
      data: {
        page: ++this.data.page
      },
      success: (res) => {
        
          if (this.data.page == 1) {
            this.prompt.funPrompt({
              "type": "dataLoading"
            });
          }
          if (res.length == 0) {
            let type = "";
            if (this.data.page > 1) {
              type = "dataFinish";
            } else {
              let type = "dataNo";
            }
            this.prompt.funPrompt({
              "type": type
            });
            return;
          }
        let list = this.data.my_coupon;
          if (list.length > 0) {
            list = list.concat(res);
          } else {
            list = res;
          }
          this.setData({
            my_coupon: this.data.my_coupon.concat(res),
            dataLmy_coupon: list
          })
       
      }
    })
  }

})