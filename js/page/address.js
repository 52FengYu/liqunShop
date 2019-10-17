new Vue({
    el:"#app",
    data(){
        return{
            Result:[],  //存放请求到的地址列表
        }
    },
    methods:{
        // 获取收货地址列表
        getAddress:function($state){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            this.$nextTick(()=>{
            var that=this;
                $.ajax({ 
                    url: Service.Host +"/api/member/MemberReceiveAddrGet",
                    type: "POST",
                    async: true,
                    dataType:"json",
                    data:{
                        ReceiveType:"S"
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        console.log('数据请求成功');
                        var jsonObj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                        if(data.Success == 1){
                            that.Result = jsonObj;
                            console.log(that.Result)
                        }else if(data.Success == 0){
                            console.log("数据请求失败")
                            if ($state != null) {
                                $state.complete();//停止加载
                            }
                        }else if(data.Success == -999){
                            alert('登录已过期，请重新登录');
                            window.location.href = "../member/login.html";
                        }
                },
                error:function(msg){
                    console.log('数据请求失败')
                    console.log(msg)
                    }
                })
            })
        },
        //删除收货地址
        geditAddress:function(e){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            this.$nextTick(()=>{
            var that=this;
            //	通过点击一级列表，带着id请求二级列表	在Class.html中LowLevers里面的item
                $.ajax({ 
                    url: Service.Host +"/api/member/MemberReceiveAddrDel",
                    type: "POST",
                    async: true,
                    dataType:"json",
                    data:{
                        ID:e.target.id,
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        console.log(data.Success)
                        var jsonObj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                        if(data.Success == 1){
                            that.Result = jsonObj;
                            console.log(that.Result)
                            console.log('删除成功')
                            window.location.reload()
                        }
                        if(data.Success == 0){
                            console.log("数据请求失败")
                        }
                        if(data.Success == -999){
                            alert('登录已过期，请重新登录');
                            window.location.href = "../member/login.html";
                        }
                },
                error:function(msg){
                    console.log('数据请求失败')
                    console.log(msg)
                    }
                })
            })
        },
    },
    mounted(){
        this.getAddress()
    }
})