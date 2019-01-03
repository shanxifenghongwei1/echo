//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    navArray:["全部","家电","母婴","服饰","保健品","医疗"],
    navActive:0,
    dataList:[
      { "title": "富安娜家纺 四件套水洗棉纯棉全棉床品套件床单被套 纯色简约单双人 暖茶1米8/2米床(230*229cm)橙色", "images": "/images/test/test.jpg", "jifen": "456", "goumai": "28"},
      { "title": "20", "images": "/images/test/test.jpg", "jifen": "456", "goumai": "28" },
        { "title": "220", "images": "/images/test/test.jpg", "jifen": "456", "goumai": "28" },
          { "title": "320", "images": "/images/test/test.jpg", "jifen": "456", "goumai": "28" },
      { "title": "富安娜家纺 四件套水洗棉纯棉全棉床品套件床单被套 纯色简约单双人 暖茶1米8/2米床(230*229cm)橙色", "images": "/images/test/test.jpg", "jifen": "456", "goumai": "28" },
      { "title": "20", "images": "/images/test/test.jpg", "jifen": "456", "goumai": "28" },
      { "title": "220", "images": "/images/test/test.jpg", "jifen": "456", "goumai": "28" },
      { "title": "320", "images": "/images/test/test.jpg", "jifen": "456", "goumai": "28" },
    ]
  },
  onLoad: function () {
    app.setNavigationBarTitle("商家分类");
  },
  getUserInfo: function(e) {
    
  },navClick(e){
    this.setData({
      navActive: e.target.dataset.index
    })
  }
})
