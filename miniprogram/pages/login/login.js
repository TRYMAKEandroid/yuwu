// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断该功能版本是否支持
    canIUse:wx.canIUse("button.open-type.getUserInfo"),
    //用户头像
    user_avatar:'cloud://yiwu-zengyiting.7969-yiwu-zengyiting/my-image.jpg',
    
  },
  // 微信登陆
  user_login(){
    wx.login({
      success:function(res){
          console.log(res)
      }
    })
  },
  //验证用户是否授权过
  user_setting(){
    var that=this
    wx.getSetting({ //验证是否授权api
      success:function(auth){ 
        console.log(auth)
        if(auth.authSetting["scope.userInfo"]){ //授权过
          wx.switchTab({
            url: '../../pages/index2/index2',
            success: function (res) { console.log('成功') },
            fail: function (res) { },
            complete: function (res) { console.log('hehe') },
          })
          const db=wx.cloud.database(); //创建云数据对象，进行查询
          db.collection('user_info').where({
            openid:getApp().globalData.openid
          }).get({
            success:function(res){
              if(res.data.length>0){ //结果是否存在
              var leng=res.data.length
              //信息存储到全局变量userInfo
              getApp().globalData.userInfo=res.data[leng-1]
              console.log(getApp().globalData.userInfo)
              // 跳转主页
              
              }else{ //不存在就把授权取消掉
                delete auth.authSetting['scope.userInfo']
                console.log("用户未授权")
                console.log(auth)
              }
            }
          })
        }else{//没有授权
          console.log("用户未授权")
        }
      }
    })
  },
  //微信授权登陆
  getUserInfo:function(e){
    var that=this
    console.log(e)
    if(e.detail.userInfo){
    const db=wx.cloud.database(); //创建云数据对像，添加授权人信息
    db.collection("user_info").add({
      data:{
        openid:getApp().globalData.openid, //用户唯一标识
        nickName:e.detail.userInfo.nickName, //名字
        avatarUrl:e.detail.userInfo.avatarUrl, //头像
        province:e.detail.userInfo.province, //省
        city:e.detail.userInfo.city //城市
        },
      success:function(res){
        //验证授权
        that.user_setting()
        console.log('成功获取,保存到云端',res)
       }
     })
    }else{
      console.log('用户拒接授权')
    }
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
// 用户授权
this.user_login();
//验证授权
this.user_setting()
var userInfo=getApp().globalData.userInfo
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