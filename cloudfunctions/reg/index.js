// 云函数入口文件
const cloud = require('wx-server-sdk')

const {
  ImageClient
} = require('image-node-sdk');

cloud.init()

let AppId = '1300909291'; // 腾讯云 AppId
let SecretId = 'AKIDDEz4uUxvrY0EzWkqdHkzz0lGWXO0QdjZ'; // 腾讯云 SecretId
let SecretKey = 'kGWdWBbuynMgqlQq8ByWmtlmYAXfX9k7'; // 腾讯云 SecretKey

// 云函数入口函数
exports.main = async (event, context) => {


  let idCardImageUrl =event.src;

  let imgClient = new ImageClient({ AppId, SecretId, SecretKey });
  let result;
  try{ 
    result = await imgClient.ocrBizCard({
      data: {
        url_list: [idCardImageUrl]
      }
    })
  }catch(e){
    return {'error': true}
  }
   
  return result.body
    

  {"code":0,
  "message":"OK",
  "seq":"0142fc5f - 33f1 - 4e7d - 9137 - d8d443ce334c", "url":"https://7465-test-5rimo-1300916245.tcb.qcloud.la/1576398287801card.png",
  "data":[
    {"item":"英文姓名",
     "value":"Lanzhou Ruixingda",
     "confidence":1},
    {"item":"姓名",
    "value":"张耀新",
    "confidence":0.9999984502792358},
    {"item":"职位",
    "value":"息工程师",
    "confidence":0.9930568933486938},
    {"item":"公司",
    "value":"兰州瑞兴达投资管理有限责任公司",   "confidence":0.9999984502792358},
    {"item":"英文公司",
    "value":"Lanzhou Rulxingda Investment Management Co..Ltd","confidence":0.9953472018241882},
    {"item":"地址","value":"兰州市安宁区银滩路206-236号(警备区对面)","confidence":0.3150922656059265},{"item":"邮编","value":"730070","confidence":0.9993846416473389},{"item":"邮箱","value":"LZZYX8@126.com","confidence":0.9974580407142639},{"item":"网址","value":"www.shruinan.com","confidence":0.9987088441848755},{"item":"手机","value":"13919488926","confidence":0.9998711347579956},{"item":"电话","value":"0931-7672088-8882","confidence":0.9998414516448975},{"item":"传真","value":"7671799","confidence":0.999963641166687}]}]}"
  
}



 
let idCardImageUrl = 'http://images.cnitblog.com/blog/454646/201306/07090518-029ff26fac014d72a7786937e8319c78.jpg';
let imgClient = new ImageClient({ AppId, SecretId, SecretKey });
imgClient.ocrIdCard({
  data: {
    url_list: [idCardImageUrl]
  }
}).then((result) => {
  console.log(result.body)
}).catch((e) => {
  console.log(e);
});