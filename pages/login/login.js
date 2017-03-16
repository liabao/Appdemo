// pages/login/login.js
//获取应用实例
Page({
  data:{
    username:'',
    pwd:''
  },
  getUsername:function (e){
    this.setDate({username:e.detail.value});
  },
  getPwd:function(e){
    this.setDate({pwd: e.datail.value});
  },
  login:function (){
    var username = this.data.username;
    var pwd = this.data.pwd;
    if(username == '' || pwd == ''){
     wx.showModal({
       title:'错误',
       content:'用户名或密码为空',
       showCancel:false
     })
    }else{
      wx.request({
        url: 'https://www.baidu.com/',
        data: {
          username:username,
          pwd:pwd,
          cmd:'login'
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          console.log(res)
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  }
})