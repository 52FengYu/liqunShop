let vm = new Vue({
    el:"#app",
    data(){
        return{
            Result:[],
            listData: [],
            sumBalance: 0,//所有礼品卡剩余金额
            page: 1,
            pageSize: 5,
            showLoading: false,
            TimeOut:"N",
        }
    },
    created: function () {
        this.getList();
    },
   methods:{
        getList:function($state){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            this.$nextTick(()=>{
                var that=this;
                $.ajax({ 
                    url: Service.Host + "/api/Member/MemberGiftCardListGetFromMemberID",
                    type: "POST", 
                    async: true,
                    dataType:"json",
                    data:{
                        pageNo:this.page,
                        pageSize:this.pageSize,
                        TimeOut:this.TimeOut
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        console.log('数据请求成功');
                        var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                        // that.Result = jsonobj.ProductList;
                        if(data.Success == 1){
                            var list = jsonobj.MemberGiftCardList;
                            if(vm.TimeOut == "N"){
                                list=[];
                                for(var i = 0;i < jsonobj.MemberGiftCardList.length; i++){
                                    if(jsonobj.MemberGiftCardList[i].Amount == 0){
                                        jsonobj.MemberGiftCardList[i].cardStyle="gray"
                                    }else if(jsonobj.MemberGiftCardList[i].Amount > 0 && jsonobj.MemberGiftCardList[i].Amount < 500){
                                        console.log("金额（0，500）")
                                        jsonobj.MemberGiftCardList[i].cardStyle="blue"
                                        console.log(jsonobj.MemberGiftCardList[i].cardStyle)
                                    }else if(jsonobj.MemberGiftCardList[i].Amount >= 500 && jsonobj.MemberGiftCardList[i].Amount < 1000){
                                        jsonobj.MemberGiftCardList[i].cardStyle="red"
                                    }else{
                                        jsonobj.MemberGiftCardList[i].cardStyle="purple"
                                    }
                                    list.push(jsonobj.MemberGiftCardList[i]);
                                }
                            }
                            that.Result = jsonobj;
                            console.log(data.Result + '2222')    //打印出来每一条对象
                            console.log(that.Result)    //打印后台返回到的数据
                        }
                        if(data.Success == 0){
                            console.log(vm.sumBalance)
                            vm.showLoading = true;
                            if(vm.TimeOut == "N"){
                                vm.TimeOut = "Y";
                                vm.page = 0;
                                if($state != null){
                                    $state.loaded()
                                }
                                return;
                            }
                            if($state != null){
                                $state.complete()
                            }
                        }
                        if(data.Success == -999){
                            alert(jsonobj.Message);
                            window.location.href = "../../view/member/login.html"
                        }
                    },
                    error:function(msg){
                        console.log(msg)
                    }
                })
            })
        },
        //卡片颜色
        getColor:function(item){
            console.log("这里执行了")
            return 'card-' + item.cardStyle
        },
        //跳转页面
        go_page: function (id) {
            goPage(id);
        },
    }
})