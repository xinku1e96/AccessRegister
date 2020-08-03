function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
const moment = require('moment'); //引用了moment库,需要安装npm install --save moment

module.exports = class extends Base {
  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      return _this.json("123");

      if (_this.isPost) {
        let data = yield _this.model('thinkjsplus_logger').select();
        //return '1';
        return _this.success(data);
      } else {
        return _this.json(null);
      }
    })();
  }

  addAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let data = _this2.post();
      return _this2.json(data);
      data.time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      if (think.isEmpty(data.id)) {

        let res = null;
        try {
          //保存
          res = yield _this2.model('thinkjsplus_logger').add(data).catch(function (err) {
            return think.isError(err) ? err : new Error(err);
          });
        } catch (e) {
          return _this2.fail(1000, e);
        }

        if (think.isError(res)) {
          return _this2.fail(1000, res.message);
        }
        if (res) {
          _this2.success(true);
        } else {
          _this2.success(true);
        }
      } else {
        //更新
        let res = yield _this2.model('thinkjsplus_logger').update(data);
        if (res) {
          _this2.success(true);
        } else {
          _this2.success(true);
        }
      }
    })();
  }
};
//# sourceMappingURL=logger.js.map