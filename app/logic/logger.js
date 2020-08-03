
// const Base = require('./base.js');
// const moment = require('moment');//引用了moment库,需要安装npm install --save moment

// module.exports = class extends Base {
//   async listAction() {
//    //   return this.json("123");
//       if (this.isPost) {
//       let data = await this.model('thinkjsplus_logger').select();
//       return this.success(data);
//     } else {
//       return this.json(null);
//     }

//   }

//   async addAction() {
//     let data = this.post();
//     data.time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
//     if (think.isEmpty(data.id)) {

//       let res=null;
//       try {
//          //保存
//         res = await this.model('thinkjsplus_logger').add(data).catch(err => {
//           return think.isError(err) ? err : new Error(err);
//         });
//       } catch (e) {
//         return this.fail(1000, e);
//       }

//       if (think.isError(res)) {
//         return this.fail(1000, res.message);
//       }
//       if (res) {
//         this.success(true);
//       } else {
//         this.success(true);
//       }
//     } else {
//       //更新
//       let res = await this.model('thinkjsplus_logger').update(data);
//       if (res) {
//         this.success(true);
//       } else {
//         this.success(true);
//       }
//     }
//   }
// };
//# sourceMappingURL=logger.js.map