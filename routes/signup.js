var express = require('express');
var path = require('path');
var router = express.Router();
var sha1 = require('sha1');
var UserModel = require('../models/users');

router.get('/', function (req, res) {
    res.render('signup')
});
router.post('/', function (req, res) {
    var name = req.fields.name;
    var gender = req.fields.gender;
    var bio = req.fields.bio;
    var avatar = req.files.avatar.path.split(path.sep).pop();
    var password = req.fields.password;
    var repassword = req.fields.repassword;
    // 明文密码加密
    password = sha1(password);
    // 待写入数据库的用户信息
    var user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    };
     UserModel.create(user);
    // res.render('signup')
});
module.exports = router;