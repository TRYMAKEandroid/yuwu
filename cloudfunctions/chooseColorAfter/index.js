// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => { //接收data 和原尺寸分配raw_size_assign
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  const data=event.data.result.data //选择商品颜色后的数据
  const raw_size_assign=event.raw_size_assign //原尺寸分配
  const choose_color_after_size_assign=[] //选择颜色后的尺寸分配
  for(let i = 0 ; i <raw_size_assign.length;i++){
    let stock=0
    for(let key of data){
      if(String(raw_size_assign[i].size).toLocaleUpperCase()===key.size||String(raw_size_assign[i].size).toLocaleUpperCase()===key.size){
        stock+=Number(key.stock)
      }else{
        continue
      }
    }
    choose_color_after_size_assign.push({
      size:raw_size_assign[i].size,
      stock:stock
    })
  }
  return {choose_color_after_size_assign:choose_color_after_size_assign}
}