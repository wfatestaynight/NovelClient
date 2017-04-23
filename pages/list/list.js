Page({
  data:{
    // text:"这是一个页面"
    datas:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("list==== onLoad,URL=",options.url);
     var newRegExp = new RegExp("-", 'gm'); 
    var v1 = options.url.replace(newRegExp,"/")
    var that = this;
    wx.request({
        url:"https://fsnsaber.cn/GetNovelInfoJson?go="+v1,
        success:function(res){
          console.log("==== res=",res);
           that.setData({datas:res.data});
           console.log("res.data=",res.data);
           var chp = that.data.datas;
           console.log("chp=",chp);
        },
        fail: function(err){  
        console.log("list https请求失败了:",err);  
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
    console.log("====="+event.target.id);
    var dat = this.data.datas;
    var url = dat.list[event.target.id].churl.substring(19);
    var newRegExp = new RegExp("/", 'gm'); 
    var v1 = url.replace(newRegExp,"-");
    var v2 = v1.replace(".","+");
    console.log("v2 = "+v2);
     wx.navigateTo({url:"../content/content?data="+v2});
  },
  invertedOrder:function(){
    if(this.data.datas.list.length <= 1)
        return ;
    var listOld = this.data.datas.list;
    var data = this.data.datas;
    var listNew = [];
    var i = 0;
    for(i = listOld.length - 1;i >= 0;i--){
        listNew.push(listOld[i]);
    }
    data.list = listNew;
    this.setData({datas:data});
  }
})