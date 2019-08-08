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
  const color=event.color // 颜色
  const size =event.size //尺寸
  const db=cloud.database()
  const result=await db.collection('goods').where({
    color:color,
    size:size
  }).get()
  return{
    result
  }
}