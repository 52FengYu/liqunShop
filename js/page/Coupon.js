(function (win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width > 640) { // 最大宽度
            width = 640;
        }
        var rem = width / 7.5; //
        docEl.setAttribute('style', 'font-size: ' + rem + 'px !important');
    }

    win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    refreshRem();
})(window);
$(function () {
    jQuery.support.cors = true;
    var vm = new Vue({
        el: '#myCoupon',
        data: function () {
            return {
                couponStatus: 'received', //默认打开页面
                couponList: [],         //优惠券数据
                showLoading: false,     //是否加载
                page: 1,
                pageSize:5,
                infiniteId: +new Date(),
                length:0
            }
        },
        created: function () {
            this.getCouponList();
        },
        methods: {
            getCouponList: function ($state) {
                getTokenID();
                var tokenid = sessionStorage.getItem('TokenID');
                //获取会员代金券信息
                if (this.couponStatus == 'received') {
                    var url = Service.Host + "/api/Member/MemberGiftTokenListGetFromMemberID";
                    $.ajax({
                        url: url,
                        type: "post",
                        data: {
                            pageNo: this.page,
                            pageSize: this.pageSize,
                            IsUse: "N",
                            TimeOut: "N"
                        },
                        beforeSend: function (request) {
                            request.setRequestHeader("TokenID", tokenid);
                        },
                        dataType: "json",
                        crossDomain: true,
                        success: function (json) {
                            console.log("数据加载成功")
                            var jsonObj = eval("(" + json.Result + ")");
                            console.log(jsonObj)
                            if (json.Success == 1) {
                                var jsonList = jsonObj.MemberGiftTokenList;
                                var list = [];
                                for (var i = 0; i < jsonList.length; i++) {
                                    jsonList[i].BeginTime = $.trim(jsonList[i].BeginTime).substring(0, 16);
                                    jsonList[i].EndTime = $.trim(jsonList[i].EndTime).substring(0, 16);
                                    jsonList[i].active = false;
                                    list.push(jsonList[i]);
                                }
                                console.log(list);
                                vm.couponList = vm.couponList.concat(list || []);
                                vm.length=vm.couponList.length;
                                vm.showLoading = false;
                                if ($state != null) {
                                    $state.loaded();//继续加载
                                }

                            }
                            if (json.Success == 0) {
                                vm.showLoading = true;
                                if ($state != null) {
                                    $state.complete();//停止加载
                                }
                            }
                            if (json.Success == -999) {
                                // alert(jsonObj.Message);
                                // that.$toast("请重新登录");
                                window.location.href = "../member/login.html";
                            }

                        },
                        error: function () {
                            //错误处理
                            $.alert('无法连接服务器')
                        }
                    });

                } else if (this.couponStatus == 'used') {
                    var url = Service.Host + "/api/Member/MemberGiftTokenListGetFromMemberID";
                    $.ajax({
                        url: url,
                        type: "post",
                        data: {
                            pageNo: this.page,
                            pageSize: this.pageSize,
                            IsUse: "Y",
                            TimeOut: "N"
                        },
                        beforeSend: function (request) {
                            request.setRequestHeader("TokenID", tokenid);
                        },
                        dataType: "json",
                        crossDomain: true,
                        success: function (json) {
                            if (json.Success == 1) {
                                var jsonObj = eval("(" + json.Result + ")");
                                var jsonList = jsonObj.MemberGiftTokenList;
                                var list = [];
                                for (var i = 0; i < jsonList.length; i++) {
                                    jsonList[i].BeginTime = $.trim(jsonList[i].BeginTime).substring(0, 16);
                                    jsonList[i].EndTime = $.trim(jsonList[i].EndTime).substring(0, 16);
                                    jsonList[i].active = false;
                                    list.push(jsonList[i]);
                                }
                                console.log(list);
                                vm.couponList = vm.couponList.concat(list || []);
                                vm.length=vm.couponList.length;
                                vm.showLoading = false;
                                if ($state != null) {
                                    $state.loaded();//继续加载
                                }
                            }
                            if (json.Success == 0) {
                                vm.showLoading = true;
                                if ($state != null) {
                                    $state.complete();//停止加载
                                }
                            }
                            if (json.Success == -999) {
                                // $.alert("登录失效,请重新登录");
                                // that.$toast("请重新登录");
                                window.location.href = "../member/login.html";
                            }

                        },
                        error: function () {
                            //错误处理
                            // $.alert('无法连接服务器')
                            that.$toast("无法连接至服务器");
                        }
                    });

                } else if (this.couponStatus == 'expired') {
                    var url = Service.Host + "/api/Member/MemberGiftTokenListGetFromMemberID";

                    $.ajax({
                        url: url,
                        type: "post",
                        data: {
                            pageNo: this.page,
                            pageSize: this.pageSize,
                            IsUse: "",
                            TimeOut: "Y"

                        },
                        beforeSend: function (request) {
                            request.setRequestHeader("TokenID", tokenid);
                        },
                        dataType: "json",
                        crossDomain: true,
                        success: function (json) {
                            if (json.Success == 1) {
                                var jsonObj = eval("(" + json.Result + ")");
                                var jsonList = jsonObj.MemberGiftTokenList;
                                var list = [];
                                for (var i = 0; i < jsonList.length; i++) {
                                    jsonList[i].BeginTime = $.trim(jsonList[i].BeginTime).substring(0, 16);
                                    jsonList[i].EndTime = $.trim(jsonList[i].EndTime).substring(0, 16);
                                    jsonList[i].active = false;
                                    list.push(jsonList[i]);
                                }
                                console.log(list);
                                vm.couponList = vm.couponList.concat(list || []);
                                vm.length=vm.couponList.length;
                                vm.showLoading = false;
                                if ($state != null) {
                                    $state.loaded();//继续加载
                                }


                            }
                            if (json.Success == 0) {
                                vm.showLoading = true;
                                if ($state != null) {
                                    $state.complete();//停止加载
                                }
                            }
                            if (json.Success == -999) {
                                // $.alert("登录失效,请重新登录");
                                // that.$toast("请重新登录");
                                window.location.href = "../member/login.html";
                            }
                        },
                        error: function () {
                            //错误处理
                            // $.alert('无法连接服务器')
                            that.$toast("无法连接至服务器");
                        }
                    });
                }
            },
            changeActive: function (item) {
                item.active = !item.active;
            },
            //跳转兑换页面
            go_page: function () {
                window.location.href = "../index/index.html";
            },
            //当属性滚动的时候  加载  滚动加载
            infiniteHandler: function ($state) {
                setTimeout(function () {//发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                    vm.page = vm.page + 1;  //滚动之后加载第二页
                    vm.getCouponList($state);
                }, 500);
            },
            changeType(couponStatus) {
                vm.page = 1;
                vm.couponList = [];
                vm.infiniteId += 1;
                vm.couponStatus = couponStatus;
            },

        }
    })
});