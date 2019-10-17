new Vue({
    el:"#app",
    data(){
        return{
            newData:'',
        }
    },
     created(){
        getTokenID();
        var tokenid = sessionStorage.getItem('TokenID');
        this.$nextTick(()=>{
            var that=this;
            $.ajax({
                url:'http://wsappservice.liqunshop.com'+"/api/member/MemberInformationGetFromMemberID",
                type:'POST',
                async:true,
                dataType:'json',
                data:{

                },
                beforeSend: function (request) {
                    request.setRequestHeader("TokenID", tokenid);
                },
                success:function(data){
                    console.log(data.Success)
                    if(data.Success == 1){
                        var jsonobj = eval("(" + data.Result + ")")	
                        that.newData = jsonobj
                        that.newData.MemberName = that.newData.MemberList[0].MemberName
                        that.newData.MemberType = that.newData.MemberList[0].MemberType 
                        that.newData.MemberPoint = that.newData.MemberList[0].MemberPoint 
                        that.newData.Balance = that.newData.MemberList[0].Balance
                        console.log(that.newData)   //data数据
                        console.log(that.newData.MemberName)    //会员名
                        console.log(that.newData.MemberType)    //会员类型
                        console.log(that.newData.MemberPoint)   //积分
                        console.log(that.newData.Balance)   //余额
                        console.log(data.Success)
                    }
                    if(data.Success == 0){
                        console.log("数据请求失败，请重试")
                        that.$toast("数据请求失败，请重试");
                    }
                    if(data.Success == -999){
                        console.log("请重新登录");
                        // that.$toast("请重新登录");
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