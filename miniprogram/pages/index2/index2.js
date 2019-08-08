// pages/index2/index2.js
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    //轮播图列表
    swiperList:[],
    //商品列表
    goodlist:[]
    
  },
  // 获取轮播图
  getSwiper:function(){
    var that = this
    // console.log("111")
    const db=wx.cloud.database();
    db.collection('swipers').where({
     marteral:"steel"
    }).get({
      success:function(res){
        that.setData({swiperList:res.data})
        console.log(that.data.swiperList)
      }
    })
  },
  // 获取商品列表
  getGood:function(){
    var that = this
    
    const db=wx.cloud.database();
    db.collection('goods_info').where({

    }).get({
      success:function(res){
        console.log(res)
        that.setData({goodList:res.data})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiper();
    this.getGood()
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
    this.getSwiper()
    this.getGood()
    wx.stopPullDownRefresh()
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