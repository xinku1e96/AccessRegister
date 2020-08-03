// function _asyncToGenerator(fn) { return function () 
//   { var gen = fn.apply(this, arguments);
//      return new Promise(function (resolve, reject) { function step(key, arg) { 
//        try { 
//          var info = gen[key](arg); var value = info.value; 
//         } 
//         catch (error) { 
//           reject(error); return; 
//         }
//          if (info.done) { 
//            resolve(value); 
//           } 
//           else { 
//             return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } 
//           } 
//           return step("next"); }); 
//         }; 
//       }
const Base = require('./base.js');
const moment = require('moment'); //引用了moment库,需要安装npm install --save moment
var request = require('request'); //请求api使用
const http = require('https');
const rp = require('request-promise');
var openID;
module.exports = class extends Base {

  getAction() {
    var _this = this;

    async function getOpenID(code) {//用户唯一标识 OpenID 和 会话密钥 session_key
      try {
        const options = {
          method: 'GET',
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          qs: {
            grant_type: 'authorization_code',
            js_code: code,
            secret: "1081d0b48d9fc270702beabe91ff44b4",
            appid: "wxe38f2b6fa235e823"
          }
        };
        let sessionData = await rp(options);
        sessionData = JSON.parse(sessionData);
        // result = await _this.model('thinkjs').add({string:sessionData.openid});  加sql语句
        
        if (!sessionData.openid) {
          return null;
        }
        return sessionData.openid;
        //return sessionData;
        
      } catch (e) {
        return null;
      }
    }
    
   async function getOpenIdAction() {//换取 用户唯一标识 OpenID 和 会话密钥 session_key。
      const code = _this.post('code');//获取前端post数据，此处使用thinkjs
      //const openid= await getOpenID(code);
      // console.log("code:"+code);
      openID= await getOpenID(code);
      console.log("openid:"+openID);
      if (think.isEmpty(openID)) {
        return _this.fail('失败');
      }
    return openID;
    }
    
    getOpenIdAction();
    
  }

  
  async queryAction() {
    var _this2 = this;
    var body1;
    let inorout=_this2.post('inorout');
    let time=_this2.post('time');
    console.log("inorout:"+inorout+",time:"+time+",openID:"+openID);
    let sessionData=await rp.post({url:'http://192.168.100.143:14300/rest/request', 
    form:{'username':'renren','passwd':'renren','requestUri':'http://68.196.9.178:8080/test/rest',
    'params':'token=f6903a966ec7fb886156936cf3e8b0d1&params={\'type\':\'huzheng/register/queryunfinish\',\'params\':{\'openid\':\''+openID+'\'}}'
    }}, function(error, response, body) {
      body1=JSON.parse(body);
      console.log(body1);
    if (!error && response.statusCode == 200 && body1.msg == 'success') {
      return body;
    }
    else{
      return "error";
    }
  });
  sessionData = JSON.parse(sessionData);
   console.log("code:"+sessionData.result);
  if(sessionData.result){
    request.post({url:'http://192.168.100.143:14300/rest/request', 
    form:{'username':'renren','passwd':'renren','requestUri':'http://68.196.9.178:8080/test/rest',
    'params':'token=f6903a966ec7fb886156936cf3e8b0d1&params={\'type\':\'huzheng/inorout/save\',\'params\':{\'openid\':\''+openID+'\',\'time\':\''+time+'\',\'InorOut\':\''+inorout+'\'}}'
    }}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("success");
    }
  })
  }
  return _this2.success(sessionData);
  }

  registerAction() {
    var _this3 = this;
    let name=_this3.post('name');
    let registertime=_this3.post('registertime');
    let company=_this3.post('company');
    let description=_this3.post('description');
    console.log("name:"+name+",time:"+registertime+",company:"+company+",description:"+description+",openID:"+openID);
    request.post({url:'http://192.168.100.143:14300/rest/request', 
    form:{'username':'renren','passwd':'renren','requestUri':'http://68.196.9.178:8080/test/rest',
    'params':'token=f6903a966ec7fb886156936cf3e8b0d1&params={\'type\':\'huzheng/register/save\',\'params\':{\'name\':\''+name+'\',\'company\':\''+company+'\',\'project\':\'\',\'description\':\''+description+'\',\'finished\':\'0\',\'openid\':\''+openID+'\',\'registertime\':\''+registertime+'\'}}'
    }}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      return _this3.json(response);
    }
  })
  }
  reportAction() {
    var _this4 = this;
    let name=_this4.post('name');
    let reporttime=_this4.post('reporttime');
    let company=_this4.post('company');
    let content=_this4.post('content');
    console.log("name:"+name+",time:"+reporttime+",company:"+company+",content:"+content+",openid:"+openID);
    request.post({url:'http://192.168.100.143:14300/rest/request', 
    form:{'username':'renren','passwd':'renren','requestUri':'http://68.196.9.178:8080/test/rest',
    'params':'token=f6903a966ec7fb886156936cf3e8b0d1&params={\'type\':\'huzheng/report/save\',\'params\':{\'openid\':\''+openID+'\',\'name\':\''+name+'\',\'company\':\''+company+'\',\'project\':\'\',\'reporttime\':\''+reporttime+'\',\'content\':\''+content+'\'}}'
    }}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      return _this4.json(response);
    }
  })
  }
};
//# sourceMappingURL=wxopenid.js.map