// pages/uploading/uploading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //测试云函数
  cloud_add:function(){
    wx.cloud.callFunction({
      name:'add',
      data:{
        a:7,
        b:8
      },
      success:function(res){
        console.log(res)
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  // 上传文件
  uploading:function(){
    //获取临时链接 正则
    // var img_reg = new RegExp('^http://tmp/wx((|[A-Z]|[a-z]|[0-9]|_|.)*)(.jpg$|.png$|.PNG)')
    var img_reg = new RegExp('\.[^.]+?$'); //获取文件名后缀
    wx.chooseImage({
      success: function(res) {
        //正则获取http://tmp/wx ? .jpg 
        console.log(res)
        console.log('333')
        var img_name=Math.random()*10000000
        var filePath = res.tempFilePaths[0];
        console.log(filePath.match(img_reg))
        var cloudPath = "uploading/"+img_name+filePath.match(img_reg)
        console.log(cloudPath)
        // var cloudPath_img = img_reg.exec(res.tempFilePaths[0])[1]
        wx.cloud.uploadFile({
          
          cloudPath:cloudPath,
          filePath:filePath,
          success:res=>{
            console.log("上传成功")
          }
        })
      },
    })
  },
  //上传商品信息
  uploading_good(){
    console.log(11)
    wx.navigateTo({
      url: '../uploading_good/uploading_good',
      success: function(res) {
        console.log('guolaile')
      },
      fail: function(res) {},
      complete: function(res) {
        console.log('haha')
      },
    })
  },
  //上传商品
  add_good:function(){
    console.log('11')
    wx.navigateTo({
      url: '../add_good/add_good',
      success: function(res) {
        console.log('111')
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})