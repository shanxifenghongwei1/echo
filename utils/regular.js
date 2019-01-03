/**
 * 手机正则验证
 * fasle 手机正确
 * true 手机失败
 */
const regularPhone = n => {
  return !(/^1[34578]\d{9}$/.test(n));
}

/**
 * 纯数字验证
 * code  需要验证的值
 * codeLength  验证位数 ，默认为6
 */
const verificationCode = (code, codeLength = 6) => {
  let reg = /^\d{6}\b/;
  if (codeLength == 4) {
    reg = /^\d{4}\b/;
  }
  return reg.test(code);
}
/**
 * 验证整数或者是小数
 */
function validationNumber(e, num) {
  let regu = /^[0-9]+\.?[0-9]*$/,returnBool=true;

    if (!regu.test(e)) {
      returnBool = false;
    } else {
      if (num == 0) {
        if (e.split('.').length>1) {
          returnBool= false;
        }
      }
      if (e.split('.').length>1) {
        if (e.split('.')[1].length > num) {
          returnBool = false;
        }
      }
    }

  return !returnBool;
}
module.exports = {
  regularPhone: regularPhone,
  verificationCode: verificationCode,
  validationNumber: validationNumber
}