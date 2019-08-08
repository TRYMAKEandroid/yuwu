// pages/test1/test1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos:{},
    
  },
  /***
   * 云获取todos引用
   */
  add: function(){
    const db=wx.cloud.database();
    const todos=db.collection("todos")
    todos.add({
      data:{
        name:"halibote",
        time:new Date("2018-6-3 00:00:00"),
        done:false,
        tag:["je","ke","mi"],
        location:new db.Geo.Point(180,90)
      }
    
      
    }).then(res=>{
      console.log(res)
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