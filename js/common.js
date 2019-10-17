//跳转本站url
function goPage(url) {
	window.location.href = url;
}

//获取唯一TokenID
function getTokenID() {
	var tokenid = sessionStorage.getItem('TokenID');
	if ($.trim(tokenid) == "") {
		$.ajax({
			type: "post",
			url: Service.Host + "/api/member/SessionTokenIDGet",
			data: {},
			async: false, //同步请求
			timeout: 1000, //超时时间设置，单位毫秒
			dataType: 'json',
			crossDomain: true,
			success: function(data) {
				tokenid = data.Result;
				sessionStorage.setItem('TokenID', tokenid);
				// $.cookie('TokenID', tokenid, {
				//     path: '/'
				// });
				return tokenid;
			},
			error: function(data) {
				console.log('无法连接服务器:' + data.responseText);
				//goPage(WebRoute.Host +WebRoute.User.Login);
			}
		});
	}
}

//判断是否登录,如果没登录跳转登录页
function isLogin(returnurl) {
	var loginState = sessionStorage.getItem('LoginState');
	if ($.trim(loginState) != "1") {
		sessionStorage.setItem('ReturnURL', returnurl);
		//goPage(WebRoute.Host + WebRoute.User.Login);
		goPage(WebRoute.Host + WebRoute.Member.Login);   /*!自己搞的*/
		return false;
	} else {
		return true;
	}
}

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r !== null) return decodeURIComponent(r[2]);
	return null; //返回参数值
}

//判读是否为手机号
function IsMobile(mobile) {
	if (mobile.length == 0) {
		return false;
	}
	if (mobile.length != 11) {
		return false;
	}

	var myreg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|199|198|166)[0-9]{8}$/;
	if (!myreg.test(mobile)) {
		return false;
	} else {
		return true;
	}
}

//判断是否是微信浏览器的函数
function isWeiXin() {
	//window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
	var ua = window.navigator.userAgent.toLowerCase();
	//通过正则表达式匹配ua中是否含有MicroMessenger字符串
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

$(function() {
	jQuery.support.cors = true;
	getTokenID();

	var webtitle = new Vue({
		data: {
			"title": ""
		},
		el: 'title',
		methods: {
			change: function() {
				//改变数据后执行

			}
		},
		computed: {
			//增加动态计算字段
			// title: function() {
			// 	return WebSiteName;
			// }
		}
	});
	 webtitle.title = WebSiteName;

})
