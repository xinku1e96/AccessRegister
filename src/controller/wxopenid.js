const Base = require('./base.js');
const moment = require('moment');//引用了moment库,需要安装npm install --save moment
var request = require('request');  //请求api使用
const http = require('https');

module.exports = class extends Base {
  async getAction() {
    let data = {};
    
    let request_url = 'https://api.weixin.qq.com/sns/jscode2session?appid='
      +'wx50947b9055f9da00'+'&secret='+'ab05a5f8222feca8bc4da6153ac673d4'
      +'&js_code=023CtwRZ17JbrW0J0kQZ1E1DRZ1CtwRK&grant_type=authorization_code';
      request('http://127.0.0.1:8360/wxopenid/get', function (error, response, body) {
        //return this.json(response);
        if (!error && response.statusCode == 200) {
          return this.json("b");
        }else{
          return this.json("a");
        }
      });
     //return this.json(response);

    if(this.isPost){
      
      let PostData = this.post();
       
      let request_url = 'https://api.weixin.qq.com/sns/jscode2session?appid='
      +'wx50947b9055f9da00'+'&secret='+'ab05a5f8222feca8bc4da6153ac673d4'
      +'&js_code='+PostData.code+'&grant_type=authorization_code';
      request(request_url, function (error, response, body) {
        return this.json(response);
        if (!error && response.statusCode == 200) {
        }
      });
      

      /*
      http.get(request_url,function(data){
        var str="";
        data.on("data",function(chunk){
            str+=chunk;//监听数据响应，拼接数据片段
        })
        data.on("end",function(){
           // console.log(str.toString())
            return this.json(str);
        })
    })
    */


      //return PostData;
      let error,response,body;
      let test_url = 'http://www.baidu.com';
request(test_url, function (error, response, body) {
  return this.json(response);
  if (!error && response.statusCode == 200) {
    //return body;
    //console.log(body) // 请求成功的处理逻辑

   // return this.json(body);

  }
  // GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code




});


    }else{

      data.flag = '0';
      data.msg = '出现未知错误，请退出重试1';
    }
    return this.json(data);

    



    return this.json("123");
     
      if (this.isPost) {
      let data = await this.model('thinkjsplus_logger').select();
      //return '1';
      return this.success(data);
    } else {
      return this.json(null);
    }
    
  }
z
  async indexAction() {
    return this.json("123");
     
      if (this.isPost) {
      let data = await this.model('thinkjsplus_logger').select();
      //return '1';
      return this.success(data);
    } else {
      return this.json(null);
    }
    
  }

  async addAction() {
    let data = this.post();
    return this.json(data);
    data.time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    if (think.isEmpty(data.id)) {
     
      let res=null;
      try {
         //保存
        res = await this.model('thinkjsplus_logger').add(data).catch(err => {
          return think.isError(err) ? err : new Error(err);
        });
      } catch (e) {
        return this.fail(1000, e);
      }

      if (think.isError(res)) {
        return this.fail(1000, res.message);
      }
      if (res) {
        this.success(true);
      } else {
        this.success(true);
      }
    } else {
      //更新
      let res = await this.model('thinkjsplus_logger').update(data);
      if (res) {
        this.success(true);
      } else {
        this.success(true);
      }
    }
  }
};