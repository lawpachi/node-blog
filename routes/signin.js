var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
// GET /signin 登录页
router.get('/', function(req, res, next) {
    res.render('signin');
  });
  module.exports = router;