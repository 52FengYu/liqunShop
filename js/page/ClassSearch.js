    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var url = window.location.search;
        var r = url.substr(1).match(reg);
        if(r != null) return unescape(r[2]);
        return null;
    }
    new Vue({
        el:"#app",
        data(){
            return{
                left:[],
                Right:[],
                num:0,
                firstPlayFlag: true
            }
        },
        methods:{
            showData1:function(e){
                getTokenID();
                var tokenid = sessionStorage.getItem('TokenID');
                    var that=this;
                    //根据二级列表传过来的id，渲染搜索出来的产品
                    $.ajax({ 
                        url: Service.Host +"/api/Product/ProductSearch",
                        type: "POST",
                        async: true,
                        dataType:"json",
                        data:{
                            //ClassID:e.target.id,	
                            ClassID:decodeURI(location.href).split('&')[2].split('=')[1],				//在获取到item中id之后获取到的右侧列表详情数据
                            MainSupplierID:'SU190701000003',
                        },
                        beforeSend: function (request) {
                            request.setRequestHeader("TokenID", tokenid);
                        },
                        success:function(data){
                            console.log('数据请求成功');
                            console.log(e.target.id)
                            console.log(that.left[0].ID)	//输出左侧列表的第一条数据的id
                            var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                            that.Right = jsonobj.ProductList;
                            
                            console.log(data.Result + '2222')    //打印出来每一条对象
                            console.log(that.Right)    //打印后台返回到的数据
                        },
                        error:function(msg){
                            console.log(msg)
                            }
                    })
            },
            //销量排序
            Sales:function(e){
                //console.log(e)
                getTokenID();
                var tokenid = sessionStorage.getItem('TokenID');
                    var that=this;
                    //根据二级列表传过来的id，渲染搜索出来的产品
                    $.ajax({ 
                        url: Service.Host +"/api/Product/ProductSearch",
                        type: "POST",
                        async: true,
                        dataType:"json",
                        data:{
                            ClassID:decodeURI(location.href).split('&')[2].split('=')[1],
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
                            console.log(url.slice(80,90))
                            var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                            that.Right = jsonobj.ProductList;
                            //console.log(data.Result + '2222')    //打印出来每一条对象
                            //console.log(that.Right)    //打印后台返回到的数据
                        },
                        error:function(msg){
                            console.log(msg)
                            }
                    })
            },
            //综合排序
            comprehensive:function(e){
                console.log(e)
                getTokenID();
                var tokenid = sessionStorage.getItem('TokenID');
                    var that=this;
                    //根据二级列表传过来的id，渲染搜索出来的产品
                    $.ajax({ 
                        url: Service.Host +"/api/Product/ProductSearch",
                        type: "POST",
                        async: true,
                        dataType:"json",
                        data:{
                            ClassID:decodeURI(location.href).split('&')[2].split('=')[1],
                            MainSupplierID:'SU190701000003',
                        },
                        beforeSend: function (request) {
                            request.setRequestHeader("TokenID", tokenid);
                        },
                        success:function(data){
                            console.log('数据请求成功');
                            var url = e.srcElement.baseURI
                            console.log(url.slice(80,90))
                            var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                            that.Right = jsonobj.ProductList;
                            //console.log(data.Result + '2222')    //打印出来每一条对象
                            //console.log(that.Right)    //打印后台返回到的数据
                        },
                        error:function(msg){
                            console.log(msg)
                            }
                    })
            },
            //价格排序
             Price:function(e){
                getTokenID();
                var tokenid = sessionStorage.getItem('TokenID');
                    var that=this;
                    $(this).stop(false,false);
                    if(this.num++ %2 == 0){
                        $.ajax({ 
                                url: Service.Host +"/api/Product/ProductSearch",
                                type: "POST",
                                async: true,
                                dataType:"json",
                                data:{
                                    MainSupplierID:'SU190701000003',
                                    ClassID:decodeURI(location.href).split('&')[2].split('=')[1],
                                    OrderKey:'MEMBERPRICE',					//在获取到item中id之后获取到的右侧列表详情数据
                                    OrderBy:'ASC',							//排序规则 DESC 倒序 ASC 正序
                                },
                                beforeSend: function (request) {
                                    request.setRequestHeader("TokenID", tokenid);
                                },
                                success:function(data){
                                    console.log('数据请求成功');
                                    var url = e.srcElement.baseURI
                                    console.log(url.slice(80,90))
                                    console.log('升序');
                                    var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                                    that.Right = jsonobj.ProductList;
                                    //console.log(data.Result + '2222')    //打印出来每一条对象
                                    //console.log(that.Right)    //打印后台返回到的数据
                                },
                                error:function(msg){
                                    console.log(msg)
                                    }
                            })
                            
                    }else{
                        $.ajax({ 
                                url: Service.Host +"/api/Product/ProductSearch",
                                type: "POST",
                                async: true,
                                dataType:"json",
                                data:{
                                    MainSupplierID:'SU190701000003',
                                    ClassID:decodeURI(location.href).split('&')[2].split('=')[1],
                                    OrderKey:'MEMBERPRICE',					//在获取到item中id之后获取到的右侧列表详情数据
                                    OrderBy:'DESC',							//排序规则 DESC 倒序 ASC 正序
                                },
                                beforeSend: function (request) {
                                    request.setRequestHeader("TokenID", tokenid);
                                },
                                success:function(data){
                                    console.log('数据请求成功');
                                    var url = e.srcElement.baseURI
                                    console.log(url.slice(80,90))
                                    console.log('降序');
                                    var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                                    that.Right = jsonobj.ProductList;
                                    //console.log(data.Result + '2222')    //打印出来每一条对象
                                    //console.log(that.Right)    //打印后台返回到的数据
                                },
                                error:function(msg){
                                    console.log(msg)
                                    }
                            })
                        
                    }
                } 
        },
        beforeUpdate(){
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
                            //ClassID:e.target.id,	
                            ClassID:that.left[0].ID,				//在获取到item中id之后获取到的右侧列表详情数据
                            MainSupplierID:'SU190701000003',
                        },
                        beforeSend: function (request) {
                            request.setRequestHeader("TokenID", tokenid);
                        },
                        success:function(data){
                            // console.log('数据请求成功');
                            // console.log(e.target.id)
                            // console.log(that.left[0].ID)	//输出左侧列表的第一条数据的id
                            var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                            that.Right = jsonobj.ProductList;
                            
                            //console.log(data.Result + '2222')    //打印出来每一条对象
                            //console.log(that.Right)    //打印后台返回到的数据
                        },
                        error:function(msg){
                            console.log(msg)
                            }
                    })
                }
        },
        mounted(){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            this.$nextTick(()=>{
            var that=this;
            //	通过点击一级列表，带着id请求二级列表	在Class.html中LowLevers里面的item
                $.ajax({ 
                    url: Service.Host +"/api/Supplier/SupplierClassGetFromFID",
                    type: "POST",
                    async: true,
                    dataType:"json",
                    data:{
                        MainSupplierID:'SU190701000003',	//后期修改
                        FID:getUrlParam("id")						//LowLevers中item的id
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        console.log('数据请求成功');
                        var jsonObj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                        that.left = jsonObj;
                        //console.log(data.Result + '444')    //打印出来每一条对象
                        //console.log(jsonObj)    //打印后台返回到的数据
                    },
                error:function(msg){
                    console.log(msg)
                    }
                })
            })
        }
    })
    $(".Top button").click(function(){
        $(".Top button").removeClass("active");
        $(this).addClass("active");
    })