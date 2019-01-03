// pages/personal/observer/observer.js
const app = getApp();
Page({
  data: {
    scrollHeight: 0
  },
  onLoad() {
    app.utils.computeScrollViewHeight((e) => {
      this.setData({
        scrollHeight: e
      });
    })
  },
  onReady() {
    setTimeout(() => {
      this.comment = this.selectComponent("#comment");
      this.comment.setData({
        position_commit: 1, //评论图片不显示
      });
      this.scrolltolower();
    }, 1000)

  },
  scrolltolower() {
    this.comment.getComment({})
  }
})