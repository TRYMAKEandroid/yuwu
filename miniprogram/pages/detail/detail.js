// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商品信息
    good_info:[],//商品id详情
    good_goods:{}, //商品id的商品详情
    isHidden:false, //是否隐藏mask-layer
    openData:null, //商品浮层的animationData
    openStyle:null, //商品浮层的style 主要控制滑动的
    goodIndex:null, ///选择商品索引
    saleTotal:0, //销售量
    stockTotal:0, //存货量
    choose_color:null, //选择商品色
    choose_size:null, //选择商品尺寸
    choose_stock:null //选择商品库存

  },
  //获取商品信息
  getGoodInfo:function(id){
    var that = this
    const db=wx.cloud.database()
    const _=db.command
    console.log('11')
    db.collection('goods_info').where({
      
        good_id:_.eq(Number(id))
      
    }).get({
      success:function(goods_info){
        console.log(goods_info)
        that.setData({good_info:goods_info.data[0]})
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  // 打开购买浮层
  openSupernatant:function(){
    this.setData({
      openStyle:'100rpx'
      
    })
    var that=this
    var animation=wx.createAnimation({
      duration:200,
      delay:0,
      timingFunction:'ease'
    })
    animation.translateY(9999).step()
    this.setData({openData:animation.export(),isHidden:true})
    setTimeout(function(){
    animation.translateY(0).step()
    that.setData({openData:animation.export()})
    },50)
  },
  //关闭购买浮层
  closeSupernatant:function(){
    // this.setData({isHidden:false})
    var that = this
    var animation= wx.createAnimation({
      duration:500,
      delay:0,
      timingFunction:'ease'
    })
    animation.translateY(9999).step()
    this.setData({openData:animation.export()})
    setTimeout(function(){
      
      that.setData({isHidden:false})
    },200)
  },
  //选择商品颜色
  chooseColor:function(e){
    this.setData({sizeIndex:null})
    var that = this
    this.setData({goodIndex:Number(e.target.dataset.goodindex)})
    wx.cloud.callFunction({
      name:'colorGetGood',
      data:{
        good_id:this.data.good_id,
        color:e.target.dataset.color

      },
      success:function(res){
        console.log(res)
        wx.cloud.callFunction({
          name:'chooseColorAfter',
          data:{
            data:res,
            raw_size_assign:that.data.good_goods.size_assign
          },success:function(res){
            console.log(that.data.good_goods)
            var size_assign="good_goods.size_assign"
            var good_goods=that.data.good_goods
           
            good_goods.size_assign = res.result.choose_color_after_size_assign
            console.log(good_goods)
            that.setData({
              good_goods:good_goods
            })
          }
        })
      }
    })
    console.log(e)
    this.setData({
      choose_color:e.target.dataset.color,
      choose_size:null,
      choose_stock:null
    })

  },
  //选择商品尺寸
  chooseSize:function(e){
    var that = this
    console.log(e)
    this.setData({
      sizeIndex:e.target.dataset.sizeindex
    })
    if(this.data.choose_color!=null){
      this.setData({
        choose_size:e.target.dataset.size
      })
    }
    wx.cloud.callFunction({
      name:'ColorSizeGetGood',
      data:{
        color:that.data.choose_color,
        size:that.data.choose_size
      },
      success:function(res){
        console.log(res.result.result.data)
        that.setData({
          choose_stock:res.result.result.data[0].stock
        })
        console.log(that.data.choose_stock)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({good_id:options.id})
    this.getGoodInfo(options.id)
    const db=wx.cloud.database(); //测试接口的
    const $=db.command.aggregate
    // db.collection('goods').limit().get({success:function(res){
    //   console.log(res.data)
    // }})
    wx.cloud.callFunction({ //通过商品id获取该商品所有数组
      name:'getGood',
      data:{
        good_id:options.id
      },
      success:function(res){
       wx.cloud.callFunction({
         name:'addSaleAndStock',
         data:{
           data:res
         },
         success:function(res){
           console.log(res)
           that.setData({
             saleTotal:res.result.saleTotal,
             stockTotal:res.result.stockTotal
           })
         }
       })
       wx.cloud.callFunction({
         name:'clothesOrderBy',
         data:{
           res:res
         },
         success:function(res){
           console.log(res)
           
           that.setData({
             good_goods:res.result
           })
            
         }
       })
      },
      fail:function(err){
        console.log(err)
      }
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