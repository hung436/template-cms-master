import {DOMAIN_RES} from './contants'
export const validateEmail = (value = '', length) => {
  let msg = '';
  let regex = /^.+@.+\..+$/;
  let isEmail = regex.test(value.trim());
  if (value.length === 0) {
    msg = 'Email không được để trống!';
  } else if (value.length < length) {
    msg = `Email không được ist hơn ${length} kí tự!`;
  } else if (isEmail === false) {
    msg = 'Email không đúng định dạng!';
  } else {
    msg = '';
  }
  return msg;
};
//params is password and length of password
export const validatePassword = (value = '', min, max) => {
  let msg = '';
  if (value.length === 0) {
    msg = 'Mật khẩu không được để trống!';
  } else if (/\s/.test(value)) {
    msg = `Mật khẩu không được có khoảng trắng!`;
  } else if (value.length < min || value.length > max) {
    msg = `Mật khẩu có độ dài từ ${min} - ${max} ký tự!`;
  } else {
    msg = '';
  }
  return msg;
};
//params password and repeat password
export const validateRePassword = (pass, rePass) => {
  let msg = '';
  if (pass !== rePass) {
    msg = 'Không trùng với mật khẩu!';
  } else {
    msg = '';
  }
  return msg;
};

//params phone
export const validatePhone = (phone) => {
  let msg = '';
  let regex = /^(\+[\d]{11}|0[\d]{9})$/;
  let isPhone = regex.test(phone);
  if (phone.length === 0) {
    msg = 'Số điện thoại không được để trống!';
  } else if (isPhone === false) {
    msg = `Số điện thoại không đúng`;
  } else {
    msg = '';
  }
  return msg;
};

//params value of field and field name to validate
export const validateRequired = (value = '', name = '', length = 0, max = 1000) => {
  let msg = '';
  if (value.length === 0) {
    msg = name + ' không được để trống!';
  } else if (value.length < length) {
    msg = `${name} không được ít hơn ${length} kí tự!`;
  } else if (value.length > max) {
    msg = `${name} không được quá ${max} kí tự!`;
  } else {
    msg = '';
  }
  return msg;
};
//
export const toRawLowercase = (value) => {
  return value.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();

};

export const timeSince = (date) => {
  let time = date * 1000;
  let seconds = Math.floor((new Date().getTime() - time) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + " năm trước";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " tháng trước";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " ngày trước";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " giờ trước";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " phút trước";
  }
  return Math.floor(seconds) + " giây trước";
};

export const sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const toMilliseconds = function (hrs, min, sec) {
  return ((hrs * 60 * 60 + min * 60 + sec) * 1000);
};
export const mapTimeToPoint = function (time) {
  if (time <= 5) {
    return 10
  } else if ((10 - (time - 5)) > 0) {
    return 10 - (time - 5)
  } else {
    return 0
  }
};
export const mapStringToArray = function (times) {
  return String(times).padStart(2, '0').split("");
}

export const formatOnlyDate = function (timestamp) {
  let date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleDateString('vi-GB');
};

export const shuffle = function (arr) {
  let j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}
export const secondsToMinutes = function (time) {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
};
export const isMobile = () => {
  let MobileDetect = require('mobile-detect')
  var md = new MobileDetect(
    'Mozilla/5.0 (Linux; U; Android 4.0.3; en-in; SonyEricssonMT11i' +
    ' Build/4.1.A.0.562) AppleWebKit/534.30 (KHTML, like Gecko)' +
    ' Version/4.0 Mobile Safari/534.30');
  if (md.mobile()) {
    return true
  }else{
    return false
  }
}
export const to_slug = (str) => {
  if (str) {
      // Chuyển hết sang chữ thường
      str = str.toLowerCase();
      // xóa dấu
      str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
      str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
      str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
      str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
      str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
      str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
      str = str.replace(/(đ)/g, 'd');
      // Xóa ký tự đặc biệt
      str = str.replace(/([^0-9a-z-\s])/g, '');
      // Xóa khoảng trắng thay bằng ký tự -
      str = str.replace(/(\s+)/g, '-');

      // xóa phần dự - ở đầu
      str = str.replace(/^-+/g, '');

      // xóa phần dư - ở cuối
      str = str.replace(/-+$/g, '');

      // return
      return str;
  }
}
export const IsAllowRole = function (roles , action_name) {
  let isok = false
  roles.map((v,k)=>{
    if(v.action_name === action_name){
      isok = true
    }
  })
  return isok
};
export const getPathMedia = (path)=>{
  return DOMAIN_RES + path;
}
// <!-- resource_type ==2  : thumb  -->
export const getResFileByType = (list, type) => {
  let file = null
  if(list.length != undefined){
    list.map((v,k)=>{
      if(v.resource_type == type){
        file = v
      }
    })
  }
  return file
}