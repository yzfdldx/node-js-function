const getCookie = (name) => { // 获取cookie
  let start;
  let end;
  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(`${name}=`); // name + "="
    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(";", start); // eslint-disable-line
      if (end === -1) end = document.cookie.length;
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
};

const setCookie = (name, value, expiredays) => { // 设置cookie
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  // name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString())
  document.cookie = `${name}=${escape(value)}` +
  `${(expiredays == null) ? '' : ';expires='}` +
  `${exdate.toGMTString()}`;
};

const deepCopy = (source) => { // 对象拷贝
  let result;
  if (source.constructor === Array) {
    result = [];
    for (const key in source) { // eslint-disable-line
      result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
    }
  } else {
    result = {};
    for (const jsonkey in source) { // eslint-disable-line
      result[jsonkey] = typeof source[jsonkey] === 'object' ? deepCopy(source[jsonkey]) : source[jsonkey]; // eslint-disable-line
    }
  }
  return result;
};

const webHashFn = (key) => { // 获取对应的hash值
  let result = '';
  const Hash = window.location.hash.split('#/')[1];
  if (Hash) {
    const Hash2 = Hash.split('?');
    if (Hash2[0]) {
      const webData = Hash2[0].split('/');
      if (webData[key]) {
        result = webData[key];
      }
    }
  }
  return result;
};

const strToJson = (str) => { // dd=12&sss=343434?ca => {dd:12,sss:343434}
  if (!str) return {};
  const Idname = str.split('?')[0];
  const nowWwwData = Idname.split('&');
  const outData = {};
  if (nowWwwData.length > 1) {
    nowWwwData.map((item) => {
      const nowData = item.split('=');
      const key = nowData[0];
      const value = nowData[1];
      // outData[key] = value;
      outData[key] = value && value.indexOf('(/)') !== -1 ? value.split('(/)').join('&') : value;
      return null;
    });
  }
  return outData;
};

const shuziFn = (num) => {
  if (!/^\d*(\.\d*)?$/.test(num)) { alert("Number is wrong!"); return "Number is wrong!"; } // eslint-disable-line
  const AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九"); // eslint-disable-line
  const BB = new Array("", "十", "百", "千", "万", "亿", "点", ""); // eslint-disable-line
  const a = (`${num}`).replace(/(^0*)/g, "").split("."); // eslint-disable-line
  let k = 0;
  let re = '';
  for (let i = a[0].length - 1; i >= 0; i--) { // eslint-disable-line
    switch (k) { // eslint-disable-line
      case 0: re = BB[7] + re; break;
      case 4: if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0])) // eslint-disable-line
        re = BB[4] + re; break;
      case 8: re = BB[5] + re; BB[7] = BB[5]; k = 0; break;
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re; // eslint-disable-line
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re; k++; // eslint-disable-line
  }
  if (a.length > 1) { // eslint-disable-line
    re += BB[6];
    for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)]; // eslint-disable-line
  }
  return re;
};

const susi = (val, baifenbi) => {
  let outData = 0;
  if (val) {
    const sz = parseFloat(val);
    if (baifenbi) {
      if (`${sz}` === 'NaN') {
        outData = val;
      } else {
        const sz1 = sz * 100;
        let nowLength = `${sz1}`.indexOf('.') !== -1 ? `${sz1.toFixed(2)}` : `${sz1}`;
        let nowLength2 = '';
        let nowLength3 = '';
        nowLength.replace(/(.+)(\.\d+$)/g, ($0, $1, $2) => {
          nowLength2 = `${$1}`;
          nowLength3 = $2;
          return $0;
        });
        if (!nowLength3) {
          nowLength2 = nowLength;
        }
        nowLength = nowLength2.replace(/(\d{1,3})(?=(\d{3})+$)/g, ($1) => {
          return $1 = $1 + ','; // eslint-disable-line
        });
        outData = nowLength + nowLength3 + '%';
      }
    } else {
      if (`${sz}` === 'NaN') {
        outData = val;
      } else {
        let nowLength = `${sz}`.indexOf('.') !== -1 ? `${sz.toFixed(2)}` : `${sz}`;
        let nowLength2 = '';
        let nowLength3 = '';
        nowLength.replace(/(.+)(\.\d+$)/g, ($0, $1, $2) => {
          nowLength2 = `${$1}`;
          nowLength3 = $2;
          return $0;
        });
        if (!nowLength3) {
          nowLength2 = nowLength;
        }
        nowLength = nowLength2.replace(/(\d{1,3})(?=(\d{3})+$)/g, ($1) => {
          return $1 = $1 + ','; // eslint-disable-line
        });
        outData = nowLength + nowLength3 + '';
      }
    }
  } else if (baifenbi) {
    outData = '0%';
  }
  return outData;
};

export default {
  DeepCopy: deepCopy,
  WebHashFn: webHashFn,
  GetCookie: getCookie,
  SetCookie: setCookie,
  StrToJson: strToJson,
  ShuziFn: shuziFn,
  SuZi: susi,
};