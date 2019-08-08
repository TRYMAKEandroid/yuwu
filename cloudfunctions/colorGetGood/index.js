// 云函数入口文件
const cloud = require('wx-server-sdk')
const MAX_LIMIT = 20

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  const totalResult= await db.collection('goods').where({
    good_id:Number(event.good_id),
    color:event.color
  }).count()
  const total=totalResult.total
  const batchTime=Math.ceil(total/MAX_LIMIT)
  const tasks=[]
  for(let i = 0 ; i<batchTime; i++){
    const promise=db.collection('goods').where({
      good_id:Number(event.good_id),
      color:event.color
    }).skip(i*MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  return (await Promise.all(tasks)).reduce((total,currentValue)=>{
    return{
      data:total.data.concat(currentValue.data),
      errMsg:total.errMsg
    }
  },{data:[],errMsg:null})
}