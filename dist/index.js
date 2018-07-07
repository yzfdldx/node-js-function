'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var _arguments = arguments;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getCookie = function getCookie(name) {
	// 获取cookie
	var start = void 0;
	var end = void 0;
	if (document.cookie.length > 0) {
		start = document.cookie.indexOf(name + '='); // name + "="
		if (start !== -1) {
			start = start + name.length + 1;
			end = document.cookie.indexOf(";", start); // eslint-disable-line
			if (end === -1) end = document.cookie.length;
			return unescape(document.cookie.substring(start, end));
		}
	}
	return '';
};

var setCookie = function setCookie(name, value, expiredays) {
	// 设置cookie
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	// name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString())
	document.cookie = name + '=' + escape(value) + ('' + (expiredays == null ? '' : ';expires=')) + ('' + exdate.toGMTString());
};

var deepCopy = function deepCopy(source) {
	// 对象拷贝
	var result = void 0;
	if (source.constructor === Array) {
		result = [];
		for (var key in source) {
			// eslint-disable-line
			result[key] = _typeof(source[key]) === 'object' ? deepCopy(source[key]) : source[key];
		}
	} else {
		result = {};
		for (var jsonkey in source) {
			// eslint-disable-line
			result[jsonkey] = _typeof(source[jsonkey]) === 'object' ? deepCopy(source[jsonkey]) : source[jsonkey]; // eslint-disable-line
		}
	}
	return result;
};

var webHashFn = function webHashFn(key) {
	// 获取对应的hash值
	var result = '';
	var Hash = window.location.hash.split('#/')[1];
	if (Hash) {
		var Hash2 = Hash.split('?');
		if (Hash2[0]) {
			var webData = Hash2[0].split('/');
			if (webData[key]) {
				result = webData[key];
			}
		}
	}
	return result;
};

var strToJson = function strToJson(str) {
	// dd=12&sss=343434?ca => {dd:12,sss:343434}
	if (!str) return {};
	var Idname = str.split('?')[0];
	var nowWwwData = Idname.split('&');
	var outData = {};
	if (nowWwwData.length > 1) {
		nowWwwData.map(function (item) {
			var nowData = item.split('=');
			var key = nowData[0];
			var value = nowData[1];
			// outData[key] = value;
			outData[key] = value && value.indexOf('(/)') !== -1 ? value.split('(/)').join('&') : value;
			return null;
		});
	}
	return outData;
};

var shuziFn = function shuziFn(num) {
	if (!/^\d*(\.\d*)?$/.test(num)) {
		alert("Number is wrong!");return "Number is wrong!";
	} // eslint-disable-line
	var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九"); // eslint-disable-line
	var BB = new Array("", "十", "百", "千", "万", "亿", "点", ""); // eslint-disable-line
	var a = ('' + num).replace(/(^0*)/g, "").split("."); // eslint-disable-line
	var k = 0;
	var re = '';
	for (var i = a[0].length - 1; i >= 0; i--) {
		// eslint-disable-line
		switch (k) {// eslint-disable-line
			case 0:
				re = BB[7] + re;break;
			case 4:
				if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0])) // eslint-disable-line
					re = BB[4] + re;break;
			case 8:
				re = BB[5] + re;BB[7] = BB[5];k = 0;break;
		}
		if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re; // eslint-disable-line
		if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;k++; // eslint-disable-line
	}
	if (a.length > 1) {
		// eslint-disable-line
		re += BB[6];
		for (var _i = 0; _i < a[1].length; _i++) {
			re += AA[a[1].charAt(_i)];
		} // eslint-disable-line
	}
	return re;
};

var susi = function susi(val, baifenbi) {
	var outData = 0;
	if (val) {
		var sz = parseFloat(val);
		if (baifenbi) {
			if ('' + sz === 'NaN') {
				outData = val;
			} else {
				var sz1 = sz * 100;
				var nowLength = ('' + sz1).indexOf('.') !== -1 ? '' + sz1.toFixed(2) : '' + sz1;
				var nowLength2 = '';
				var nowLength3 = '';
				nowLength.replace(/(.+)(\.\d+$)/g, function ($0, $1, $2) {
					nowLength2 = '' + $1;
					nowLength3 = $2;
					return $0;
				});
				if (!nowLength3) {
					nowLength2 = nowLength;
				}
				nowLength = nowLength2.replace(/(\d{1,3})(?=(\d{3})+$)/g, function ($1) {
					return $1 = $1 + ','; // eslint-disable-line
				});
				outData = nowLength + nowLength3 + '%';
			}
		} else {
			if ('' + sz === 'NaN') {
				outData = val;
			} else {
				var _nowLength = ('' + sz).indexOf('.') !== -1 ? '' + sz.toFixed(2) : '' + sz;
				var _nowLength2 = '';
				var _nowLength3 = '';
				_nowLength.replace(/(.+)(\.\d+$)/g, function ($0, $1, $2) {
					_nowLength2 = '' + $1;
					_nowLength3 = $2;
					return $0;
				});
				if (!_nowLength3) {
					_nowLength2 = _nowLength;
				}
				_nowLength = _nowLength2.replace(/(\d{1,3})(?=(\d{3})+$)/g, function ($1) {
					return $1 = $1 + ','; // eslint-disable-line
				});
				outData = _nowLength + _nowLength3 + '';
			}
		}
	} else if (baifenbi) {
		outData = '0%';
	}
	return outData;
};

var getclass = function getclass(oparent, sclass) {
	var arr = [];
	var aElem = oparent.getElementsByTagName('*');
	var re = new RegExp('(^|\\s)' + sClass + '(\\s|$)', 'g');
	for (var i = 0; i < aElem.length; i++) {
		if (re.test(aElem[i].className)) {
			arr.push(aElem[i]);
		}
	}
	return arr;
};

var getStyle = function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj)[attr];
	}
};

var startMove = function startMove(obj, json, times, fx, cbFn) {
	if (obj.arr) {
		obj.arr.push(_arguments);
	}
	if (obj.timer) {
		return;
	}
	var t = 0;
	var d = times;
	var objB = {};
	var objC = {};
	obj.arr = [];
	for (var attr in json) {
		if (attr == 'opacity') {
			objB[attr] = parseInt(getStyle(obj, attr)) || 1;
		}
		objB[attr] = parseInt(getStyle(obj, attr)) || 0;
		objC[attr] = json[attr] - objB[attr];
	}
	var startTime = now();
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var changeTime = now();
		t = Math.min(changeTime - startTime, d);
		for (var attr in json) {
			var value = Tween[fx](t, objB[attr], objC[attr], d);
			if (attr == 'opacity') {
				obj.style.opacity = value;
			} else {
				obj.style[attr] = value + 'px';
			}
		}
		if (t == d) {
			clearInterval(obj.timer);
			obj.timer = null;
			if (cbFn) {
				cbFn.call(obj);
			}
			var arg = obj.arr.pop();
			if (arg) {
				startMove.apply(window, arg);
			}
		}
	}, 15);
	function getStyle(obj, attr) {
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj)[attr];
		}
	}
	function now() {
		return new Date().getTime();
	}
	var Tween = {
		linear: function linear(t, b, c, d) {
			//匀速
			return c * t / d + b;
		},
		easeIn: function easeIn(t, b, c, d) {
			//加速曲线
			return c * (t /= d) * t + b;
		},
		easeOut: function easeOut(t, b, c, d) {
			//减速曲线
			return -c * (t /= d) * (t - 2) + b;
		},
		easeBoth: function easeBoth(t, b, c, d) {
			//加速减速曲线
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t + b;
			}
			return -c / 2 * (--t * (t - 2) - 1) + b;
		},
		easeInStrong: function easeInStrong(t, b, c, d) {
			//加加速曲线
			return c * (t /= d) * t * t * t + b;
		},
		easeOutStrong: function easeOutStrong(t, b, c, d) {
			//减减速曲线
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeBothStrong: function easeBothStrong(t, b, c, d) {
			//加加速减减速曲线
			if ((t /= d / 2) < 1) {
				return c / 2 * t * t * t * t + b;
			}
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		elasticIn: function elasticIn(t, b, c, d, a, p) {
			//正弦衰减曲线（弹动渐入）
			if (t === 0) {
				return b;
			}
			if ((t /= d) == 1) {
				return b + c;
			}
			if (!p) {
				p = d * 0.3;
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else {
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		elasticOut: function elasticOut(t, b, c, d, a, p) {
			//正弦增强曲线（弹动渐出）
			if (t === 0) {
				return b;
			}
			if ((t /= d) == 1) {
				return b + c;
			}
			if (!p) {
				p = d * 0.3;
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else {
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		elasticBoth: function elasticBoth(t, b, c, d, a, p) {
			if (t === 0) {
				return b;
			}
			if ((t /= d / 2) == 2) {
				return b + c;
			}
			if (!p) {
				p = d * (0.3 * 1.5);
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else {
				var s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			if (t < 1) {
				return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			}
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
		},
		backIn: function backIn(t, b, c, d, s) {
			//回退加速（回退渐入）
			if (typeof s == 'undefined') {
				s = 1.70158;
			}
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		backOut: function backOut(t, b, c, d, s) {
			if (typeof s == 'undefined') {
				s = 3.70158; //回缩的距离
			}
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		backBoth: function backBoth(t, b, c, d, s) {
			if (typeof s == 'undefined') {
				s = 1.70158;
			}
			if ((t /= d / 2) < 1) {
				return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
			}
			return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
		},
		bounceIn: function bounceIn(t, b, c, d) {
			//弹球减振（弹球渐出）
			return c - Tween['bounceOut'](d - t, 0, c, d) + b;
		},
		bounceOut: function bounceOut(t, b, c, d) {
			if ((t /= d) < 1 / 2.75) {
				return c * (7.5625 * t * t) + b;
			} else if (t < 2 / 2.75) {
				return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
			} else if (t < 2.5 / 2.75) {
				return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
			}
			return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
		},
		bounceBoth: function bounceBoth(t, b, c, d) {
			if (t < d / 2) {
				return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
			}
			return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
		}
	};
};

exports.default = {
	DeepCopy: deepCopy,
	WebHashFn: webHashFn,
	GetCookie: getCookie,
	SetCookie: setCookie,
	StrToJson: strToJson,
	ShuziFn: shuziFn,
	SuZi: susi,
	GetClass: getclass,
	GetStyle: getStyle,
	StartMove: startMove
};