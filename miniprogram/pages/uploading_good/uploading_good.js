// pages/uploading_good/uploading_good.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_name:"", //商品名字
    good_title:"", //商品标题
    good_price:Number, //商品价格
    good_image:[], //商品图片
    good_id:Number, //商品编号id
    tempImage:[], //临时商品图片
    kid:Number, //商品类型id
    kname:'', //类型名
    range:[{id:1,name:'食物'},{id:2,name:'衣服'},{id:3,name:'服务'}], //选择类型范围
    index:0 //初始选择类型
  },
  //改变picker触发
  pickerChange:function(e){
      var value=e.detail.value
      this.setData({kid:Number(value)+1})
      for(var item of this.data.range){
        if(item.id===this.data.kid){
          this.setData({kname:item.name})
          console.log(this.data.kid,this.data.kname)

        }
      }
  },
  //获取商品的信息
  inputValue:function(e){ 
      // console.log(e)
      var value=e.detail.value
      var pro=e.target.dataset.name //元素的data-name属性
      this.setData({[pro]:value}) 
  },
  //上传商品图片
  uploading_image:function(){
    var that=this
    wx.chooseImage({
      count:6,
      success: function(res) {
        console.log(res)
        that.setData({tempImage:res.tempFilePaths})
      },
      sizeType:['original','compressed'],
      sourceType:['album','camera']
      
    })
  },
  //删除商品图片
  closeImage:function(e){
    console.log(e.target.dataset)
    var currentIndex=e.target.dataset.currentIndex
    var temp_image=this.data.tempImage
    temp_image.splice(currentIndex,1)
    this.setData({tempImage:temp_image})
  },
  //查看/预览图片
  lookImage:function(e){
    console.log(e)
    console.log(e.target.dataset.imageurl)
    var that = this
    wx.previewImage({
      current:e.target.dataset.imageurl,
      urls: that.data.tempImage,
      success:function(res){
        console.log(res,"cg")
        // console.log(e.detail.dataset.imagetUrl)
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  //提交按钮
  submit:function(){
    console.log('hello')
    var that=this
    var kid=this.data.kid //商品类型id
    var good_name=this.data.good_name //商品名字
    var good_title=this.data.good_title //商品标题
    var good_price=this.data.good_price //商品价格
    var tempImage=this.data.tempImage //临时商品图片
    // console.log(this.data.good_name)
    // console.log(this.data.good_title,this.data.good_price)
    const db=wx.cloud.database()
    const _=db.command
    console.log(111)
    db.collection('goods_info').where({data:{},success:function(){}}).count({success:function(res){
        that.setData({good_id:Number(res.total)+1}) //生成商品id
        console.log(222)
        if(that.data.tempImage.length){ //用户端是否上传了临时 是否有选择图片
            that.uploading(that.data.tempImage) //上传图片
          db.collection('goods_info').add({ //添加数据到数据库
            data: {
              good_id: that.data.good_id,
              kid: that.data.kid,
              good_name: that.data.good_name,
              good_title: that.data.good_title,
              good_price: that.data.good_price,
              good_image: that.data.good_image
            },
            success: function (res) {
              console.log('成功')
              wx.showLoading({
                title: '正在跳转主页请稍等。。。',
              })
              setTimeout(function(){
                wx.switchTab({
                  url: '../index2/index2',
                  success: function (res) { 
                    wx.hideLoading()
                  },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              },1000)
              
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }else{
          console.log('没选择图片')
          wx.showToast({
            title: '没选择图片',
            icon:'none'
            
          })
        }
        
      }
    })
  },
  uploading: function (tempImage) {
    console.log(333)
    var that=this
    //获取临时链接 正则
    // var img_reg = new RegExp('^http://tmp/wx((|[A-Z]|[a-z]|[0-9]|_|.)*)(.jpg$|.png$|.PNG)')
    var img_reg = new RegExp('\.[^.]+?$'); //获取文件名后缀
        //正则获取http://tmp/wx ? 【.jpg】 
        
        var good_images=[]; //随机数图片名字数组
        console.log(444)
        for(var item of tempImage){ //遍历临时图片
        console.log(555)
          var img_name = Math.random() * 10000000 //随机数名字的图片
          
          var filePath = item; //图片源文件路径
          console.log(filePath.match(img_reg))
          var cloudPath = "uploading/" + img_name + filePath.match(img_reg) //图片上传路径
          good_images.push("cloud://yiwu-zengyiting.7969-yiwu-zengyiting/"+cloudPath) //这里致命重要，给上传的数据加云地址
          console.log(cloudPath)
          // var cloudPath_img = img_reg.exec(res.tempFilePaths[0])[1]
          wx.cloud.uploadFile({ //文件上传，这里是图片上传 异步操作
            
            cloudPath: cloudPath,
            filePath: filePath,
            success: res => {
              console.log("上传成功")
              wx.showToast({
                title: '图片上传成功',
                icon:'success'
              })
          }
        })
      }
      this.setData({ good_image: good_images })
      console.log(this.data.good_image)
      
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
