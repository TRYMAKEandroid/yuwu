// pages/add_good/add_good.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_kind:undefined, //商品种类
    good_id:undefined //商品编号id
  },
  //获取商品编号id
  inputGoodId:function(e){
    var value=Number(e.detail.value)
    var pro=e.target.dataset.name
    this.setData({[pro]:value})
    console.log(this.data.good_id)
  },
  //确认商品编号id
  submit_id:function(){
    var that=this
    const db=wx.cloud.database()
    if(that.data.good_id!=undefined){
    db.collection('goods_info').where({
      good_id:that.data.good_id
    }).get({
      success:function(res){
        console.log(res)
        if(res.data.length>0){
        wx.navigateTo({
          url: '../add_good_kind/add_good_kind?kid='+res.data[0].kid+'&good_id='+that.data.good_id,
          success: function(res) {
            console.log('success')
          },
          fail: function(res) {
            console.log('fail')
          },
          complete: function(res) {},
        })
        }else{
          console.log('没有数据')
        }
      },
      fail:function(err){
        console.log(err)
      }
    })
    }else{
      console.log('商品编号不能为空')
    }
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