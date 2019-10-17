new Vue({
    el:"#app",
    data(){
        return{
            Right:[]
        }
    },
    mounted(){
        getTokenID();
        var tokenid = sessionStorage.getItem('TokenID');
        this.$nextTick(()=>{
            var that=this;
            $.ajax({ 
                url: Service.Host + "/api/member/MemberCardInfo",
                type: "POST", 
                async: true,
                dataType:"json",
                data:{
                    
                },
                beforeSend: function (request) {
                    request.setRequestHeader("TokenID", tokenid);
                },
                success:function(data){
                    console.log('数据请求成功');
                    var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                    // that.Right = jsonobj.ProductList;
                    if(data.Success == 1){
                        that.Right = jsonobj;
                        console.log(data.Result)    //打印出来每一条对象
                        console.log(jsonobj)    //打印后台返回到的数据
                    }
                    if(data.Success == 0){
                        vm.showLoading = true;
                        if ($state != null) {
                            $state.complete();//停止加载
                        }
                    }
                    if(data.Success == -999){
                        console.log(jsonobj.Message);
                        window.location.href = '../member/login.html'
                    }
                },
                error:function(msg){
                    console.log(msg)
                }
            })
        })
    },
})
