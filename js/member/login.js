function showImgValidateCode() {
	getTokenID();
	var tokenid = sessionStorage.getItem('TokenID');
	if ($.trim(tokenid) != "") {
		var windowUrl = window.URL || window.webkitURL; //处理浏览器兼容性
		var xhr = new XMLHttpRequest();
		xhr.open("POST", Service.Host + "/api/member/GetValidateCode?t=" + (new Date()).getTime(), true);
		xhr.responseType = "blob";
		xhr.setRequestHeader("TokenID", tokenid);
		xhr.onload = function() {
			if (this.status == 200) {
				var blob = this.response;
				$('#imgValidateCode').load(function(e) {
					windowUrl.revokeObjectURL($('#imgValidateCode').src);
				}).attr("src", windowUrl.createObjectURL(blob));
				$('#imgValidateCode1').load(function(e) {
					windowUrl.revokeObjectURL($('#imgValidateCode').src);
				}).attr("src", windowUrl.createObjectURL(blob));
			}
		}
		xhr.send();
	}
}

$(function() {
	//获取登录成功后返回路径
	var _returnURL = getUrlParam("ReturnURL");
	if ($.trim(_returnURL) != "") {
		sessionStorage.setItem("ReturnURL", _returnURL);
	} else {
		_returnURL = sessionStorage.getItem("ReturnURL");
	}

	showImgValidateCode();

	var vm = new Vue({
		el: '#app',
		data: function() {
			return {
				type: "account",
				membername: "",
				isimgCode: false,
				pwd: "",
				mobile: "",
				time: 60,
				isMobileCode: false,
				imgValidCode: "",
				mobileValidCode: ""
			}
		},
		components: {},
		created: function() {

		},
		mounted: function() {
			window.vm = this;
		},
		computed: {

		},
		methods: {
			change: function(type) {
				this.type = type;
			},
			memberNamePwdLogin: function() {
				//用户名密码登录 
				getTokenID();
				var tokenid = sessionStorage.getItem('TokenID');
				if ($.trim(tokenid) === "") {
					$.alert('登录失败!')
					return false;
				} else {
					var _memberName = this.membername;
					if ($.trim(_memberName) === "") {
						$.alert('请输入账号/手机号!');
						return false;
					}
					var _pwd = this.pwd;
					if ($.trim(_pwd) === "") {
						$.alert('请输入密码!');
						return false;
					}
					var _imgCode = this.imgValidCode;
					if (this.isimgCode && $.trim(_imgCode) === "") {
						$.alert('图形验证码!');
						return false;
					}
					$.ajax({
						type: "post",
						url: Service.Host + "/api/member/MemberLogin",
						data: {
							MemberName: _memberName,
							MemberPwd: md5(_pwd),
							ImgVerifyCode: _imgCode
						},
						beforeSend: function(request) {
							request.setRequestHeader("TokenID", tokenid);
						},
						timeout: 10000, //超时时间设置，单位毫秒
						dataType: 'json',
						crossDomain: true,
						success: function(data) {
							if (data.Success == 0) {
								var result = JSON.parse(data.Result);
								if (result.IsVerifyCode === '1') {
									vm.isimgCode = true;
									sessionStorage.setItem("IsImageCode", "1");
								}
								vm.imgValidCode = '';
								$.alert(result.Message);
							} else if (data.Success == 1) {
								//执行成功
								sessionStorage.setItem("IsImageCode", "0");
								if ($.trim(_returnURL) === "") {
									goPage(WebRoute.Host + WebRoute.Index);
								} else {
									goPage(_returnURL);
								}
							}
							showImgValidateCode();
						},
						error: function(data) {
							var errormessage = '';
							if (!$.trim(data.responseText) == '') {
								var sl = data.responseText.length;
								if (sl > 30) {
									errormessage = data.responseText.substring(0, 30);
								} else {
									errormessage = data.responseText;
								}
							}
							$.alert('无法连接服务器:' + errormessage)
						}
					});
				}
			},
			getVCode: function() {
				//发送短息验证码
				getTokenID();
				var tokenid = sessionStorage.getItem('TokenID');
				if ($.trim(tokenid) === "") {
					$.alert('短信发送失败!')
					return false;
				} else {
					if ($.trim(this.mobile) == '') {
						$.alert('请输入手机号!');
						return false;
					}
					if ($.trim(this.imgValidCode) == '') {
						$.alert('请输入图形验证码!');
						return false;
					}
					this.isMobileCode = true
					$.ajax({
						type: "post",
						url: Service.Host + "/api/member/SendMobileValidateCode",
						data: {
							Mobile: this.mobile,
							ImgVerifyCode: this.imgValidCode,
							IsReg: "0"
						},
						beforeSend: function(request) {
							request.setRequestHeader("TokenID", tokenid);
						},
						timeout: 10000, //超时时间设置，单位毫秒
						dataType: 'json',
						crossDomain: true,
						success: function(data) {
							if (data.Success == 0) {
								$.alert(data.Result)
								vm.time = 0;
							} else if (data.Success == 1) {
								//短信发送成功

							}
							showImgValidateCode();
						},
						error: function(data) {
							var errormessage = '';
							if (!$.trim(data.responseText) == '') {
								var sl = data.responseText.length;
								if (sl > 30) {
									errormessage = data.responseText.substring(0, 30);
								} else {
									errormessage = data.responseText;
								}
							}
							$.alert('无法连接服务器:' + errormessage)
						}
					});
				}

				var settime = setInterval(function() {
					vm.time -= 1
					if (vm.time <= 0) {
						clearInterval(settime)
						vm.time = 60
						vm.isMobileCode = false
					}
				}, 1000)
			},
			memberMobileLogin: function() {
				//手机短信快捷登录
			}
		}
	})

	if (sessionStorage.getItem("IsImageCode") === "1") {
		vm.isimgCode = true;
	}

	//更换校验码
	$("#imgValidateCode").click(function() {
		showImgValidateCode();
	});

	$("#imgValidateCode1").click(function() {
		showImgValidateCode();
	});

	$('body').css('display', 'block');
})
