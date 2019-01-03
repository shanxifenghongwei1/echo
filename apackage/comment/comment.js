const app = getApp();
Component({
  data: {
    app:app,
    imageArray: [],
    imgheights: [],
    current: 0,
    commentArrar:[],
    position_commit:1,    //1.隐藏  2.显示
  },
  created(){
   this.prompt = this.selectComponent("#prompt");
    this.page=0;
   this.prompt.funPrompt({
     "type": "init"
   });
 },
  methods: {

    imageLoad(e) { //获取图片真实宽度  
      var imgheights = this.data.imgheights;
      //把每一张图片的对应的高度记录到数组里  
      imgheights[e.target.dataset.id] = app.utils.imageCalculate(e);
      this.setData({
        imgheights: imgheights
      })
    },
    setCommentData(e){
      this.setData({
        commentArrar: e
      });
    },
    //请求接口
    getComment(data){
      if (this.prompt.getJudgePromptType()) {
        return;
      }
      data.page=++this.page;
      app.request.post({
        url: "comment/getMyCommentList",
        data: data,
        success: (e) => {
          if (this.page == 1) {
            this.prompt.funPrompt({
              "type": "dataLoading"
            });
          }
          if (e.length == 0) {
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
          let list = this.data.commentArrar;
          if (list.length > 0) {
            list = list.concat(e);
          } else {
            list = e;
          }
          this.setData({
            commentArrar: list
          })
         }
      })
    },
    bindchange: function (e) {
      this.setData({ current: e.detail.current })
    },
 
    //显示评论图
 
    showCommentImage(e){
      this.setData({
        imageArray: e.currentTarget.dataset.array,
        position_commit:2
      });
    },
 
    hideCommentImage(){
      this.setData({
        position_commit:1
      });
    }
  }
});