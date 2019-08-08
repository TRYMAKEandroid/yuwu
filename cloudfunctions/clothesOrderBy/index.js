// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => { // 该函数用来处理数值的分配，data为需要处理的衣服商品的数据 返回商品颜色匹配和商品尺寸匹配
  // const wxContext = cloud.getWXContext()
  const data = event.res.result.data
  const color_assign2=[] //商品颜色分配2
  const un_color_assign2=[] //未完成库存的商品颜色分配2
  const color_assign = [] //商品颜色分配
  const size_assign = [] //商品尺寸分配
  const un_size_assign =[] //未完成排序的商品尺寸分配
  // const size_assgin_index = 0 //商品分配的唯一索引尺寸
  const l_rule_size_assign = ['xs','s', 'm', 'l', 'xl', 'xxl', 'xxxl'] //衣服尺寸的排列顺序固定规则 小写
  const u_rule_size_assign = l_rule_size_assign.join(',').toLocaleUpperCase().split(',')  //同上 大写
  // var  i = 0
  for (let key of data) {
    
    
    if (color_assign.indexOf(key.color, 0) === -1) {
      color_assign.push(key.color)
      un_color_assign2.push({
        color:key.color,
        stock:0
      })
      // color_assign2[i]['color'] = key.color
      // color_assign2[i]['stock'] = key.stock
      

    }
 
    if (un_size_assign.indexOf(String(key.size).toLocaleUpperCase(), 0) === -1) {
      un_size_assign.push(key.size)
    }
    // i++
  }
  for (let i = 0; i < un_color_assign2.length; i++) {
    let stock = 0
    // color_assign2.push(un_color_assign2.length)
    for (let key of data) {

      if (un_color_assign2[i].color === key.color) {
        stock += Number(key.stock)
      } else {
        continue
      }
    }
    color_assign2.push({
      color: un_color_assign2[i].color,
      stock: stock
    })
  }
  // var un_size_assign=[l,m,s,xl,xxl]
  for (let i = 0; i < u_rule_size_assign.length; i++) {
    console.log(i)
    // console.log(size_assign2.indexOf(size_assign[i],0))
    if (un_size_assign.indexOf(u_rule_size_assign[i], 0) >= 0) { //通过数组indexOf来查找固定数组尺寸的排列顺序 用的大写
      size_assign.push({size:u_rule_size_assign[i],stock:null})
    } else {
      continue
    }

    // size_assgin_index++
    
  }
  return {
    color_assign: color_assign,
    size_assign: size_assign,
    color_assign2:color_assign2,
    un_color_assign2:un_color_assign2,
    un_size_assign:un_size_assign
  }
  console.log(color_assign, size_assign)
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
  
}