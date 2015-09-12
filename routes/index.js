var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');

var router = express.Router();

//连接数据库demo
mongoose.connect("mongodb://127.0.0.1/demo");
/* GET home page. */

var result = {
  code: "",
  message: "success",
  data: {}
}

router.get('/', function (req, res) {
  // console.log(users);
  //查询文档(find())
  User.fetch(function (err, users) {
    if (err) { console.log(err) };
    res.render('index', { title: 'Nodejs-Express-Mongodb', list: users });
  })
});

router.post('/add', function (req, res) {
  var _user = req.body;
  console.log(_user);
  var use = new User(_user);
  //添加文档
  use.save(function (err, user) {
    if (err) {
      console.log(err);
      // res.end("error");
      result.code = "1";
      result.message = "error";
      result.data = err;
      res.end(JSON.stringify(result));
    };
    result.code = "0";
    result.message = "success";
    res.end(JSON.stringify(result));
  })
});

router.post('/del', function (req, res) {
  var id = req.body.id;
  console.log(id);
  //通过id移除文档
  User.remove({ _id: id }, function (err) {
    if (err) {
      console.log(err)
      result.code = "1";
      result.message = "error";
      result.data = err;
      res.end(JSON.stringify(result));
    };
    result.code = "0";
    result.message = "success";
    res.end(JSON.stringify(result));
  });
})

router.post('/updata', function (req, res) {
  var user = req.body;
  var use = new User(user);
  //更新文档
  use.save(function (err, uu) {
    if (err) {
      console.log(err)
      result.code = "1";
      result.message = "error";
      result.data = err;
      res.end(JSON.stringify(result));
    };
    result.code = "0";
    result.message = "success";
    res.end(JSON.stringify(result));
  })
})

module.exports = router;
