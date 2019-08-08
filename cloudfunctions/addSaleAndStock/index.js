// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  const data=event.data.result.data // 数据
  let sale=0
  let stock=0
  for(let key of data){
    sale+=Number(key.sale)
    stock+=Number(key.stock)
  }
  return {
    saleTotal:sale,
    stockTotal:stock
  }
}