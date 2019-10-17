new Vue({
    el:"#app",
    data(){
        return{
            Result:[]
        }
    },
    methods:{
        go_page(id){
            goPage(id)
        },
        goPage(url) {
            window.location.href = url;
        }
    },
    mounted(){
        getTokenID();
        var tokenid = sessionStorage.getItem('TokenID');
        this.$nextTick(()=>{
        var that=this;
            $.ajax({ 
                url: Service.Host +"/api/Supplier/SupplierFirstAndTwolevelsClassGetFromSupplierID",
                type: "POST",
                async: true,
                dataType:"json",
                data:{
                    MainSupplierID:'SU190701000001'     //后期修改
                },
                beforeSend: function (request) {
                    request.setRequestHeader("TokenID", tokenid);
                },
                success:function(data){
                    console.log('数据请求成功');
                    var jsonObj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                    console.log(data.Result)    //打印出来每一条对象
                    if(data.Success == 1){
                        that.Result = jsonObj;
                        console.log(jsonObj)    //打印后台返回到的数据
                            //将左侧导航栏数据显示到页面上
                            var arr = $(".left");
                            $.each(jsonObj,function(index,item){
                                OutputLeftData(arr,item);
                            })
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
                error: function(msg){
                    console.log(msg);
                },
            })
        })
    }
})
$(function(){
    $(".contain").on('click','li:eq(0)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(0);
    });
    $(".contain").on('click','li:eq(1)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(130);
    });
    $(".contain").on('click','li:eq(2)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(210);
    });
    $(".contain").on('click','li:eq(3)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(360);
    });
    $(".contain").on('click','li:eq(4)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(650);
    });
    $(".contain").on('click','li:eq(5)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(870);
    });
    $(".contain").on('click','li:eq(6)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(1080);
    });
    $(".contain").on('click','li:eq(7)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(1240);
    });
    $(".contain").on('click','li:eq(8)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(1320);
    });
    $(".contain").on('click','li:eq(9)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(1470);
    });
    $(".contain").on('click','li:eq(10)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(1550);
    });
    $(".contain").on('click','li:eq(11)',function(){
        $(".contain .left li[class*='active']").removeClass("active");
        $(this).addClass("active");
        $(window).scrollTop(1700);
    });
});