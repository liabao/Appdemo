// pages/Home/Home.js
Page({
  data:{
    collectionDataSource:[],//首页collectionView数据
    imageArray:[],//轮播图数据
    iconArray:[]//icon数组
  },
  onLoad:function(options){
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    this.getDataFromService();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  shopImageDidClick(par){
    var index = parseInt(par.currentTarget.id)
    var shop = this.data.collectionDataSource[index]
    wx.navigateTo({
      url: '../shopDetail/shopDetail?id=' + shop.id + "&title=" + shop.title,
      success: function(res){
      },
      fail: function() {
      },
      complete: function() {
      }
    })
  },
  runLoopImageDid(par){
    var index = par.currentTarget.id;
    var imageDic = this.data.imageArray[index];
    this.pushOtherController(imageDic);
  },
  // 添加商品按钮被点击
  addButtonClick:function(id){
      var index = parseInt(id.currentTarget.id);
      var shop = this.data.collectionDataSource[index];
      var index = parseInt(id.currentTarget.id);
     var shop = this.data.collectionDataSource[index];
     var buy = shop["buy"];
     var stock = shop["stock"];
     if (buy < stock){
       buy += 1;
     }else{
       wx.showToast({
         title:"库存不足",
          duration:2000,
       });
     }
     shop["buy"] = buy;
     console.log(shop);
     this.data.collectionDataSource[index] = shop;
      this.setData({
          collectionDataSource : this.data.collectionDataSource
      })
  },
  // 减少商品按钮被点击
  reduceButtonClick:function(id){
     var index = parseInt(id.currentTarget.id);
     var shop = this.data.collectionDataSource[index];
     var buy = shop["buy"];
     if (buy > 0){
       buy -= 1;
     }
     shop["buy"] = buy;
     console.log(shop);
     this.data.collectionDataSource[index] = shop;
      this.setData({
          collectionDataSource : this.data.collectionDataSource
      })
  },



// 轮播图跳转
pushOtherController(obj){
  wx.showToast({
    title:"您点击了"+ obj.event_mark,
    duration:2000,
  })
  // 0 不跳转
  if(obj.event_mark == 0){
    return;
  }
  // 3跳转到商品分组
  if(obj.event_mark == 3){
    wx.navigateTo({
      url: '../group/group?par='+ obj.event_memo + "&title="+obj.product_group_title,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
},




  // 从服务器拉取数据
  getDataFromService(){
    // 获取轮播头数据
    this.getCarouseData();
    this.getHotGoodData();
  },

// 获取首页热门商品数据
getHotGoodData(){
  var that = this;
  wx.request({
    url: 'http://www.jiuyunda.net:90/api/v1/product/list?id=56c45924c2fb4e2050000022',
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
        that.updateHotGoodData(res.data);
    },
    fail: function() {
            wx.showToast({
                title:"获取数据失败",
                duration:2000,
            })
    },
    complete: function() {
    }
  })
},
// 处理热门商品数据
updateHotGoodData(data){
    for(var i = 0; i< data.length;i++){
    var obj = data[i];
    obj["buy"] = 0;
  }
  this.setData({
          collectionDataSource : data
  })
},
// 处理数据
updateDataSource:function(data){
  wx.showToast({
              title:"获取数据成功",
              duration:2000,
  })
  var imageArray = data.carousel_list;
  for(var i = 0;i < imageArray.length;i++){
    var obj = imageArray[i];
    obj.img = "http://www.jiuyunda.net:90"+obj.img;
  }
  var iconArray = data.icon_list;
  this.setData({
    imageArray:imageArray,
    iconArray:iconArray
  })
},
// 获取轮播头icon数据
getCarouseData(){
  var page = this;
      wx.request({
        url: 'http://www.jiuyunda.net:90/api/v2/home_page/index?userinfo_id=56c45924c2fb4e2050000022',
        data: {},
        method: 'GET', 
        success: function(res){
          // 拿到返回的数据，处理数据
            page.updateDataSource(res.data)
        },
        fail: function() {
          // fail
          wx.showToast({
              title:"获取数据失败",
              duration:2000,
          })
        },
        complete: function() {
        }
      })
}
})