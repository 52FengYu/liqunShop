new Vue({
    el:"#app",
    data(){
        return{
            Result:[],
            Recommend:[],
            flag:true,
            ProductQty:1,
        }
    },
    methods:{
        get:function(){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            var that=this;
            $.ajax({ 
                url: Service.Host +"/api/Product/ProductIndexGet",
                type: "POST",
                async: true,
                dataType:"json",
                data:{
                    ID:decodeURI(location.href).split('&')[1].split('=')[1],
                    MainSupplierID:"SU190701000003",
                },
                beforeSend: function (request) {
                    request.setRequestHeader("TokenID", tokenid);
                },
                success:function(data){
                    var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                    if(data.Success == 1){
                        console.log('数据请求成功');
                        console.log(jsonobj)
                        that.Result = jsonobj;
                        that.Recommend = jsonobj.RecommendProduct
                    }
                    else if(data.Success == 0){
                        that.$toast("数据请求失败了呢");
                        console.log(data)
                        console.log('数据请求失败')
                    }else if(data.Success == -999){
                        // that.$toast("请重新登录");
                        window.location.href = "../member/login.html";
                    }
                },
                error:function(msg){
                    console.log(msg)
                    }
            })
        },
        scroll:function(){
            $(window).scroll(function(){
                if($(window).scrollTop() > 200){
                    $(".top").fadeIn(500);//一秒渐入动画
                }else{
                    $(".top").fadeOut(500);//一秒渐隐动画
                }
            });
        },
        // 收藏
        collection:function(){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            var that=this;
            if(this.flag == true){
                $.ajax({ 
                    url: Service.Host +"/api/member/MemberFollowProductAdd",
                    type: "POST",
                    async: true,
                    dataType:"json",
                    data:{
                        ProductID:decodeURI(location.href).split('&')[1].split('=')[1],
                        MainSupplierID:"SU190701000003",
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        if(data.Success == 1){
                            that.$toast("收藏成功");
                            console.log('添加收藏成功');
                            that.flag=false;
                        }
                        else if(data.Success == 0){
                            console.log(data.Result);
                            that.$toast("添加收藏失败");
                            // console.log('数据请求失败')
                        }else if(data.Success == -999){
                            // that.$toast("请重新登陆");
                            window.location.href = "../member/login.html";
                        }
                    },
                    error:function(msg){
                        console.log(msg)
                    }
                })
            }else{
                $.ajax({ 
                    url: Service.Host +"/api/member/MemberFollowProductDelete",
                    type: "POST",
                    async: true,
                    dataType:"json",
                    data:{
                        ProductID:decodeURI(location.href).split('&')[1].split('=')[1],
                        MainSupplierID:"SU190701000003",
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("TokenID", tokenid);
                    },
                    success:function(data){
                        if(data.Success == 1){
                            console.log('取消收藏成功');
                            that.$toast("取消收藏成功");
                            that.flag=true;
                        }
                        else if(data.Success == 0){
                            console.log(data)
                            that.$toast("取消收藏失败");
                            console.log('数据请求失败')
                        }else if(data.Success == -999){
                            // that.$toast("请重新登录");
                            window.location.href = "../member/login.html";
                        }
                    },
                    error:function(msg){
                        console.log(msg)
                    }
                })
            }
        },
        // 添加购物车
        addShoppingCar:function(){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            var that=this;
            $.ajax({ 
                url: Service.Host +"/api/order/MemberCartAdd",
                type: "POST",
                async: true,
                dataType:"json",
                data:{
                    ProductID:decodeURI(location.href).split('&')[1].split('=')[1],
                    MainSupplierID:"SU190701000003",
                    ProductQty:that.ProductQty,
                    AddProductType:1,
                },
                beforeSend: function (request) {
                    request.setRequestHeader("TokenID", tokenid);
                },
                success:function(data){
                    var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                    if(data.Success == 1){
                        console.log('数据请求成功');
                        that.$toast("成功加入购物车");
                        console.log(jsonobj)
                        that.Result = jsonobj;
                        that.Recommend = jsonobj.RecommendProduct
                        console.log(that.ProductQty)
                        $("#float").animate({bottom: '-40rem'}, "slow");
                    }
                    else if(data.Success == 0){
                        console.log(data)
                        that.$toast(data);
                        console.log('数据请求失败')
                    }else if(data.Success == -999){
                        // that.$toast("请重新登录");
                        window.location.href = "../member/login.html";
                    }
                },
                error:function(msg){
                    console.log(msg)
                    }
            })
        },
        // div滑入滑出
        move:function(){
            $("#float").animate({bottom: '0'}, "slow");
        },
        close:function(){
            $("#float").animate({bottom: '-40rem'}, "slow");
        },
        add:function(){
            if(this.ProductQty < 1000) this.ProductQty++
        },
        sub:function(){
            if(this.ProductQty > 1) this.ProductQty--
        },
        /* 分享底部菜单划入划出 */
        open:function(){
            $(".share").animate({bottom: '4rem'}, "slow");
        },
        clost:function(){
            $(".share").animate({bottom: '-15rem'}, "slow");
        },
        show:function(){
            $(".shadow").css({display:'block'})
        },
        hide:function(){
            $(".shadow").css({display:'none'})
        }
    },
    mounted(){
        this.get();
        this.scroll()
    }
})

 /* 回到顶部 */
 function pageScroll(){
    //把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数）
        window.scrollBy(0,-100);
    //延时递归调用，模拟滚动向上效果
        scrolldelay = setTimeout('pageScroll()',30);
    //获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值
        var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    //判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面）
        if(sTop==0)clearTimeout(scrolldelay);
    }