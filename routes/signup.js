var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var sha1 = require('sha1');
var UserModel = require('../models/users');

router.get('/', function (req, res) {
    res.render('signup')
});
router.post('/', function (req, res, next) {
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
    UserModel.create(user).then(
        function (result) {
            // 此 user 是插入 mongodb 后的值，包含 _id
            user = result.ops[0];
            // 将用户信息存入 session
            delete user.password;
            req.session.user = user;
        }
    ).catch(function (e) {
        // 注册失败，异步删除上传的头像
        fs.unlink(req.files.avatar.path);
        if (e.message.match('E11000 duplicate key')) {
            return res.redirect('/signup');
        }
        next(e);
    })
    // res.render('signup')
});
module.exports = router;