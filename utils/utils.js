const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/*计算图片高度*/
const imageCalculate = e => {
  var imgwidth = e.detail.width,
    imgheight = e.detail.height,
    //宽高比  
    ratio = imgwidth / imgheight;
  //计算的高度值  
  return 750 / ratio;
}
const makePhoneCall = e => {

  wx.makePhoneCall({
    phoneNumber: e // 仅为示例，并非真实的电话号码
  })
}
const turnInt = e => {
  return paraseInt(e);
}
/**
 * 计算高度
 */
const computeScrollViewHeight = (callback) => {
  let that = this;
  wx.getSystemInfo({
    success: function (res) {
      let clientHeight = res.windowHeight,
        clientWidth = res.windowWidth,
        rpxR = 750 / clientWidth;
      callback(clientHeight * rpxR);
    }
  });
}
module.exports = {
  formatTime: formatTime,
  imageCalculate: imageCalculate,
  turnInt: turnInt,
  makePhoneCall: makePhoneCall,
  computeScrollViewHeight: computeScrollViewHeight
}