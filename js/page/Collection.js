new Vue({
    el:"#app",
    data(){
        return{
            selected:'1',
            Result:[],
            page:1,
            PageSize:5,
            showMore:false,
        }
    },
    methods:{
        getList:function($state){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            this.$nextTick(()=>{
            var that=this;
                $.ajax({ 
                    url: Service.Host +"/api/member/MemberFollowProductPageListGet",
                    type: "POST",
                    async: true,
                    dataType:"json",
                    data:{
                        PageIndex:this.page,
                        PageSize:this.PageSize
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        console.log('数据请求成功');
                        var jsonObj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                        console.log(data.Success)
                         if(data.Success == 1){
                             if(data.Result.IsSell='Y'){
                                 that.Result = jsonObj;
                                 console.log(data.Result)    //打印出来每一条对象
                                 console.log(jsonObj)    //打印后台返回到的数据
                             }
                         }else if(data.Success == 0){
                            console.log("数据加载失败");
                            showMore = true
                            console.log(data.Result)
                            if($state != null){
                                $state.complete();//停止加载
                            }
                        }else if(data.Success == -999){
                            alert(jsonObj.Message);
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
        go_page: function (id) {
            goPage(id);
        },
        CancelCollection:function(){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
                $.ajax({ 
                    url: Service.Host +"/api/member/MemberFollowProductDelete",
                    type: "POST",
                    async: true,
                    dataType:"json",
                    data:{
                        ProductID:event.srcElement.baseURI.slice(52,66),
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        console.log(data.Result)    
                        console.log(data.Success)   
                        window.location.reload();   //刷新当前页面
                    },
                    error:function(msg){
                        console.log('数据请求失败')
                        console.log(msg)
                        }
                })
        },
    },
    created:function(){
        this.getList()
    }
})