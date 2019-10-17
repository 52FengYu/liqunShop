new Vue({
    el:"#app",
    data(){
        return{
            Right:[],
            num:0,
            msg:"",
            firstPlayFlag:true
        }
    },
    mounted(){
        getTokenID();
        var tokenid = sessionStorage.getItem('TokenID');
        var that=this;
        if(this.firstPlayFlag){
            this.firstPlayFlag=false;
            $.ajax({ 
                url: Service.Host +"/api/Product/ProductSearch",
                type: "POST",
                async: true,
                dataType:"json",
                data:{
                    ClassID:1908010470,				//在获取到item中id之后获取到的右侧列表详情数据
                    MainSupplierID:'SU190701000003',
                },
                beforeSend: function (request) {
                    request.setRequestHeader("TokenID", tokenid);
                },
                success:function(data){
                    console.log('数据请求成功');
                    var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                    that.Right = jsonobj.ProductList;
                    console.log(data.Result + '2222')    //打印出来每一条对象
                    console.log(jsonobj)    //打印后台返回到的数据
                },
                error:function(msg){
                    console.log(msg)
                }
            })
        }
    },
    methods:{
        //点击放大镜进行搜索
        search:function(){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            var that=this;
            //根据二级列表传过来的id，渲染搜索出来的产品
            $.ajax({ 
                url: 'http://wsappservice.liqunshop.com'+"/api/Product/ProductSearch",
                type: "POST",
                async: true,
                dataType:"json",
                data:{
                    KeyWord:that.msg,				
                    MainSupplierID:'SU190701000003',
                },
                beforeSend: function (request) {
                    request.setRequestHeader("TokenID", tokenid);
                },
                success:function(data){
                    console.log('数据请求成功');
                    console.log(that.msg)
                    var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                    that.Right = jsonobj.ProductList;
                },
                error:function(msg){
                    console.log(msg)
                }
            })
        },
        //销量排序
        Sales:function(e){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            var that=this;
            //根据二级列表传过来的id，渲染搜索出来的产品
            if(that.msg){
                $.ajax({ 
                    url: 'http://wsappservice.liqunshop.com'+"/api/Product/ProductSearch",
                    type: "POST",
                    async: true,
                    dataType:"json",
                    data:{
                        KeyWord:that.msg, 
                        OrderKey:'SALETOTAL',
                        OrderBy:'DESC',					//排序规则 DESC 倒序 ASC 正序
                        MainSupplierID:'SU190701000003',
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        console.log('数据请求成功');
                        var url = e.srcElement.baseURI
                        var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                        that.Right = jsonobj.ProductList;
                    },
                    error:function(msg){
                        console.log(msg)
                    }
                })
            }else{
                $.ajax({ 
                    url: 'http://wsappservice.liqunshop.com'+"/api/Product/ProductSearch",
                    type: "POST",
                    async: true,
                    dataType:"json",
                    data:{
                        ClassID:1908010470,
                        OrderKey:'SALETOTAL',
                        OrderBy:'DESC',					//排序规则 DESC 倒序 ASC 正序
                        MainSupplierID:'SU190701000003',
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        console.log('数据请求成功');
                        var url = e.srcElement.baseURI
                        var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                        that.Right = jsonobj.ProductList;
                    },
                    error:function(msg){
                        console.log(msg)
                    }
                })
            }
        },
        //综合排序
        comprehensive:function(e){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            var that=this;
            if(that.msg){
                $.ajax({ 
                    url: 'http://wsappservice.liqunshop.com'+"/api/Product/ProductSearch",
                    type: "POST",
                    async: true,
                    dataType:"json",
                    data:{
                        KeyWord:that.msg, 
                        MainSupplierID:'SU190701000003',
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        console.log('数据请求成功');
                        var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                        that.Right = jsonobj.ProductList;
                    },
                    error:function(msg){
                        console.log(msg)
                    }
                })
            }else{
                $.ajax({ 
                    url: 'http://wsappservice.liqunshop.com'+"/api/Product/ProductSearch",
                    type: "POST",
                    async: true,
                    dataType:"json",
                    data:{
                        ClassID:1908010470,
                        MainSupplierID:'SU190701000003',
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        console.log('数据请求成功');
                        var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                        that.Right = jsonobj.ProductList;
                    },
                    error:function(msg){
                        console.log(msg)
                    }
                })
            }
        },
        //价格排序
         Price:function(e){
            // var num = 0;
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            var that=this;
            if(that.msg){
                $(this).stop(false,false);
                if(this.num++ %2 == 0){
                    $.ajax({ 
                        url: 'http://wsappservice.liqunshop.com'+"/api/Product/ProductSearch",
                        type: "POST",
                        async: true,
                        dataType:"json",
                        data:{
                            MainSupplierID:'SU190701000003',
                            KeyWord:that.msg, 
                            OrderKey:'MEMBERPRICE',					//在获取到item中id之后获取到的右侧列表详情数据
                            OrderBy:'ASC',							//排序规则 DESC 倒序 ASC 正序
                        },
                        beforeSend: function (request) {
                            request.setRequestHeader("TokenID", tokenid);
                        },
                        success:function(data){
                            console.log('数据请求成功');
                            var url = e.srcElement.baseURI
                            console.log('升序');
                            that.$toast("升序");
                            var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                            that.Right = jsonobj.ProductList;
                        },
                        error:function(msg){
                            console.log(msg)
                            }
                        })
                    }else{
                        $.ajax({ 
                            url: 'http://wsappservice.liqunshop.com'+"/api/Product/ProductSearch",
                            type: "POST",
                            async: true,
                            dataType:"json",
                            data:{
                                MainSupplierID:'SU190701000003',
                                KeyWord:that.msg, 
                                OrderKey:'MEMBERPRICE',					//在获取到item中id之后获取到的右侧列表详情数据
                                OrderBy:'DESC',							//排序规则 DESC 倒序 ASC 正序
                            },
                            beforeSend: function (request) {
                                request.setRequestHeader("TokenID", tokenid);
                            },
                            success:function(data){
                                console.log('数据请求成功');
                                var url = e.srcElement.baseURI
                                console.log('降序');
                                that.$toast("降序");
                                var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                                that.Right = jsonobj.ProductList;
                            },
                            error:function(msg){
                                console.log(msg)
                            }
                        })
                    }
            }else{
                $(this).stop(false,false);
                if(this.num++ %2 == 0){
                    $.ajax({ 
                        url: 'http://wsappservice.liqunshop.com'+"/api/Product/ProductSearch",
                        type: "POST",
                        async: true,
                        dataType:"json",
                        data:{
                            MainSupplierID:'SU190701000003',
                            ClassID:1908010470,
                            OrderKey:'MEMBERPRICE',					//在获取到item中id之后获取到的右侧列表详情数据
                            OrderBy:'ASC',							//排序规则 DESC 倒序 ASC 正序
                        },
                        beforeSend: function (request) {
                            request.setRequestHeader("TokenID", tokenid);
                        },
                        success:function(data){
                            console.log('数据请求成功');
                            var url = e.srcElement.baseURI
                            console.log('升序');
                            that.$toast("升序");
                            var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                            that.Right = jsonobj.ProductList;
                        },
                        error:function(msg){
                            console.log(msg)
                            }
                        })
                    }else{
                        $.ajax({ 
                            url: 'http://wsappservice.liqunshop.com'+"/api/Product/ProductSearch",
                            type: "POST",
                            async: true,
                            dataType:"json",
                            data:{
                                MainSupplierID:'SU190701000003',
                                ClassID:1908010470,
                                OrderKey:'MEMBERPRICE',					//在获取到item中id之后获取到的右侧列表详情数据
                                OrderBy:'DESC',							//排序规则 DESC 倒序 ASC 正序
                            },
                            beforeSend: function (request) {
                                request.setRequestHeader("TokenID", tokenid);
                            },
                            success:function(data){
                                console.log('数据请求成功');
                                var url = e.srcElement.baseURI
                                console.log('降序');
                                that.$toast("降序");
                                var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                                that.Right = jsonobj.ProductList;
                            },
                            error:function(msg){
                                console.log(msg)
                            }
                        })
                    }
            }
        }
    },
})
//button按钮动态添加active
$(".Top button").click(function(){
    $(".Top button").removeClass("active");
    $(this).addClass("active");
})