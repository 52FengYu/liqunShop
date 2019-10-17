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
			}
		}
		xhr.send();
	}
}

$(function() {

	showImgValidateCode();

	var vm = new Vue({
		el: '.main',
		data: function() {
			return {
				mobile: '',
				pwd: '',
				surepwd: '',
				imgValidCode: '',
				mobileValidCode: '',
				isCode: false,
				time: 60,
				servercheck: false,
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
					this.isCode = true
					$.ajax({
						type: "post",
						url: Service.Host + "/api/member/SendMobileValidateCode",
						data: {
							Mobile: this.mobile,
							ImgVerifyCode: this.imgValidCode,
							IsReg: "1"
						},
						beforeSend: function(request) {
							request.setRequestHeader("TokenID", tokenid);
						},
						timeout: 10000, //超时时间设置，单位毫秒
						dataType: 'json',
						crossDomain: true,
						success: function(data) {
							if (data.Success == 0) {
								$.alert(data.Result);
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
						vm.isCode = false
					}
				}, 1000)
			},
			register: function() {
				//注册提交 
				if (!$('#server-check')[0].checked) {
					$.alert('请阅读并同意《利群网商服务条款》');
					return false;
				}
				if ($.trim(this.mobileValidCode) == '') {
					$.alert('请输入短信验证码!');
					return false;
				}
				if ($.trim(this.pwd) == '') {
					$.alert('请输入登录密码!');
					return false;
				}
				if ($.trim(this.pwd) != $.trim(this.surepwd)) {
					$.alert('两次输入的密码不一致，请重新输入!');
					return false;
				}
				getTokenID();
				var tokenid = sessionStorage.getItem('TokenID');
				$.ajax({
					type: "post",
					url: Service.Host + "/api/member/MemberRegister",
					data: {
						Mobile: this.mobile,
						MobileVerifyCode: this.mobileValidCode,
						Password: md5(this.pwd),
						Source: "1"
					},
					beforeSend: function(request) {
						request.setRequestHeader("TokenID", tokenid);
					},
					timeout: 10000, //超时时间设置，单位毫秒
					dataType: 'json',
					crossDomain: true,
					success: function(data) {
						if (data.Success == 0) {
							$.alert(data.Result, '注册失败');
						} else if (data.Success == 1) {
							//短信发送成功
							goPage(WebRoute.Host + WebRoute.Index);
						}
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
		}
	});

	//更换校验码
	$("#imgValidateCode").click(function() {
		vm.imgValidCode = '';
		showImgValidateCode();
	});


	$('body').css('display', 'block');
});
