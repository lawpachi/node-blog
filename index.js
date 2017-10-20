var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var winston = require('winston');
var config = require('config-lite')(__dirname);
var expressWinston = require('express-winston');


var app = express();
// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
    keepExtensions: true// 保留后缀
}));
app.use('/', require('./routes/signin'));
app.use('/signup', require('./routes/signup'));
app.listen(config.port, function () {
    console.log('开始监听')
})
