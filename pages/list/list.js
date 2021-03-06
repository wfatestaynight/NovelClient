Page({
  data:{
    // text:"这是一个页面"
    datas:"",
    scrollTop: 0,

    uphide:true,
    downhide:false,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("list==== onLoad,url=",options.url);
    wx.setNavigationBarTitle({
        title: "章节列表"
    })
    var newRegExp = new RegExp("-", 'gm'); 
    var v1 = options.url.replace(newRegExp,"/")
    var that = this;
    wx.request({
        url:"https://fsnsaber.cn/GetChpListJson",
        data: {
            url:v1
        },
        success:function(res){
          console.log("==== res=",res);
           that.setData({datas:res.data});
           console.log("res.data=",res.data);

           //var chp = that.data.datas;
           //console.log("chp=",chp);
        },
        fail: function(err){  
        console.log("list https请求失败了:",err); 
        wx.showModal({
          title: '章节目录请求失败',
          content: '网络问题，请重试',
          showCancel: false,
        }) 
      } 
    });
    
  },
  onReady:function(){
    // 页面渲染完成
     //console.log(this.data.datasList);
  },
  onShow:function(){
    // 页面显示
    //console.log(this.data.datasList);
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  clickShowContent:function(event){
    console.log("clickShowContent====="+event.target.id);
    var dat = this.data.datas;
    var url = dat.ret[event.target.id].churl;
    console.log("url ="+url);
    var newRegExp = new RegExp("/", 'gm'); 
    var v1 = url.replace(newRegExp,"-");
    var v2 = v1.replace(".","+");
    console.log("v2 = "+v2);
     wx.navigateTo({url:"../content/content?data="+v2});
  },
  invertedOrder:function(){
    //console.log("this.data.datas.ret.length = "+this.data.datas.ret.length);
    if(this.data.datas.ret.length <= 1)
        return ;
    var listOld = this.data.datas.ret;
    var data = this.data.datas;
    var listNew = [];
    var i = 0;
    for(i = listOld.length - 1;i >= 0;i--){
        listNew.push(listOld[i]);
    }
    data.ret = listNew;
    this.setData({datas:data});
  },
  PageUp:function(){
    this.setData({
      scrollTop: 0
    })
  },
  PageDown:function(){
    var that = this;
    var length = that.data.datas.ret.length;
    
    this.setData({
      scrollTop: length/22*1000
    })
  },
  scroll: function (e, res) {
    // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
    if (e.detail.scrollTop > 200) {
      this.setData({
        uphide: false
      });
    } else {
      this.setData({
        uphide: true
      });
    }
  }

})