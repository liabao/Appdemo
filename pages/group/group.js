Page({
  data:{
    leftDataSource : [],
    selectItem:0,
    rightDataSource:[],
    allDataSource:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.requestDataFromServe();
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  // 右侧列表被点击
  rightListClick(par){
    this.setData({
      selectItem:par.currentTarget.id
    })
    this.updataRightDataBy(this.data.leftDataSource[this.data.selectItem][0].category_name)
  },

  reduceImageClick(par){
    console.log('点击了')
      var index = parseInt(par.currentTarget.id);
      var obj = this.data.rightDataSource[index];
      console.log(obj)
      if (obj.buy > 0){
        obj.buy -= 1;
        this.setData({
            rightDataSource:this.data.rightDataSource
        })
      } 
    },
  addImageDidClick(par){
    console.log('点击了')
    var index = parseInt(par.currentTarget.id);
    var obj = this.data.rightDataSource[index];
    if (obj.buy < obj.stock){
      obj.buy += 1;
    }else{
      wx.showToast({
        title:"库存不足",
          duration:2000,
      });
    }
    this.setData({
      rightDataSource:this.data.rightDataSource
    })
  },



  requestDataFromServe(){
    var that = this;
    wx.request({
      url: 'http://www.jiuyunda.net:90/api/v2/product/product_list',
      data: {
        "userinfo_id" : "56c45924c2fb4e2050000022"
      },
      method: 'GET', 
      success: function(res){
          console.log(res)
          that.updateData(res)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  updateData(res){
    // 整理左侧分类数据
      var data = new Array;
        for (var key in res.data.category_contitions){
          data.push(res.data.category_contitions[key]);
        }
        // 存储所有右侧数据
        var goodList = new Array;
        for ( var i = 0 ; i < res.data.product_list.length;i++){
          var obj = res.data.product_list[i];
          obj["buy"] = 0;
          goodList.push(obj)
        }
        this.setData({
          leftDataSource:data,
          allDataSource:goodList
        })
        // 整理右侧列表数据
        this.updataRightDataBy(data[0][0].category_name)
  },
  updataRightDataBy(text){ 
    var temp = new Array;
    for(var i = 0;i < this.data.allDataSource.length;i++){
      var obj = this.data.allDataSource[i];
      if (text == obj.category_name){
        temp.push(obj)
      }
    }
    console.log(temp)
    this.setData({
      rightDataSource:temp
    })

    console.log(this.data.rightDataSource)
  }
})