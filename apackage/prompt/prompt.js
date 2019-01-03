Component({
  data: {
    type: ""
  },
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  methods: {
    funPrompt(e) {
      this.setData({
        "type": e.type
      })
    },
    /**
     * 是否可加载数据
     * ture：不可加载
     * fals：可加载
     */
    getJudgePromptType(){
      if (this.data.type ==="dataFinish"){
        return true;
      }
      if (this.data.type ==="dataNo"){
        return true;
      }
      return false;
    }
  }
});