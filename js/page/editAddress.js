var vm = new Vue({
    el:"#app",
    data(){
        return{
            ReceiveMan:decodeURI(location.href).split('&')[6].split('=')[1],
            ReceiveMobile:decodeURI(location.href).split('&')[5].split('=')[1],
            addressPoint:'',
            AddrX:'',
            AddrY:'',
            ReceiveAddr:''
        }
    },
    methods:{
        animate(){
            if (this.userMobile.length == 0) {
                alert('请确认后重新输入')
                return false;
            }
            if (this.userMobile.length != 11) {
                alert('请确认后重新输入')
                return false;
            }
            var myreg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|199|198|166)[0-9]{8}$/;
            if (!myreg.test(this.userMobile)) {
                alert('请确认后重新输入')
                return false;
            } else {
                return true;
            }
        },
        edit:function(){
            getTokenID();
            var tokenid = sessionStorage.getItem('TokenID');
            var that=this;
            $.ajax({ 
                url: Service.Host +"/api/member/MemberReceiveAddrUpdate",
                type: "POST",
                async: true,
                dataType:"json",
                data:{
                    ReceiveMan:that.ReceiveMan,
                    ReceiveMobile:that.ReceiveMan,
                    AddrX:that.AddrX,
                    AddrY:that.AddrY,
                    ReceiveAddr:that.ReceiveAddr,
                    ReceiveAreaID:that.ReceiveAreaID,
                    ID:that.ID,
                },
                beforeSend: function (request) {
                    request.setRequestHeader("TokenID", tokenid);
                },
                success:function(data){
                    var jsonobj = eval("(" + data.Result + ")")	//将数据解析成json字符串的形式
                    if(data.Success == 1){
                        console.log('数据请求成功');
                        console.log(that.ReceiveMan),
                        console.log(that.ReceiveMobile),
                        console.log(that.AddrX)
                        console.log(that.AddrY)
                        console.log(that.addressPoint+that.ReceiveAddr)
                        window.location.href = "../page/address.html";
                    }
                    else if(data.Success == 0){
                        console.log(data)
                        console.log(that.ReceiveMan),
                        console.log(that.ReceiveMobile),
                        console.log(that.AddrX)
                        console.log(that.AddrY)
                        console.log(that.addressPoint+that.ReceiveAddr)
                        console.log('数据请求失败')
                    }else if(data.Success == -999){
                        alert('登录已过期，请重新登录');
                        window.location.href = "../member/login.html";
                    }
                },
                error:function(msg){
                    console.log(msg)
                    }
            })
        }
    },
    mounted(){
        console.log('ReceiveMan',decodeURI(location.href).split('&')[6].split('=')[1])
        console.log('ReceiveMobile',decodeURI(location.href).split('&')[5].split('=')[1])           
        console.log('AddrX',decodeURI(location.href).split('&')[1].split('=')[1])
        console.log('AddrY',decodeURI(location.href).split('&')[2].split('=')[1])
        console.log('ReceiveAddr',decodeURI(location.href).split('&')[3].split('=')[1])
        console.log('ReceiveAreaID',decodeURI(location.href).split('&')[4].split('=')[1])
        console.log('ID',decodeURI(location.href).split('&')[7].split('=')[1])                      
    }
})

 /*字数限制*/  
 $("#area").on("input propertychange", function() {  
    var $this = $(this),  
        _val = $this.val(),  
        count = "";  
    if (_val.length > 50) {  
        $this.val(_val.substring(0, 50));  
    }  
    count = 50 - $this.val().length;  
    $("#text-count").text(count);  
});  