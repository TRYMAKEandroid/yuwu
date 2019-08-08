// pages/add_good_kind/add_good_kind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_id:undefined, //商品编号id
    good_kind:['未知','食物','衣服','服务'], //商品类型数组
    kid:undefined, //商品id
    color:undefined, //颜色
    size:undefined //尺寸
    
  },
  //根据用户操作input获取用户端的数值，进行保存
  inputValue:function(e){
    var value=e.detail.value
    var pro=e.target.dataset.name
    this.setData({[pro]:value})
  },
  //确认添加
  submit_add:function(){
    console.log(111)
    var that=this
    const db=wx.cloud.database()
    if(that.data.color!=undefined&&that.data.size!=undefined&&that.data.stock!=undefined){ //判断数据是否存在
    wx.showLoading({
      title: '加载中。。',
      mask:true,

    })
    db.collection('goods').where({
      good_id:that.data.good_id
    }).count({
      success:function(res){
        console.log(res)
          db.collection('goods').add({
            data:{
              good_id:that.data.good_id,
              gid:Number(res.total)+1, //利用count（）给添加的商品附加id
              color:that.data.color,
              size:String(that.data.size).toLocaleUpperCase(),
              stock:that.data.stock,
              sale:'0',
            },
            success:function(res){
              console.log('上传成功')
              wx.hideLoading()
              wx.showToast({
                title: '成功上传',
                icon:'success'
              })
            },
            fail:function(err){
              console.log(err)
              wx.hideLoading()
              wx.showToast({
                title: '请重新确认',
                icon:'fail'
              })
            }
          })
       
        
      },
      fail:function(){
        console.log('没有数据')
        wx.hideLoading()
        wx.showToast({
          title: '太快了。。',
          icon:'fail'
        })
      }
    })
      }else{
        console.log('有空')
      }
    
      },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      kid:Number(options.kid),
      good_id:Number(options.good_id)
    })
    
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