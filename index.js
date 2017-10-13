var path = require('path');
var express = require('express');

var config = require('config-lite')(__dirname);
var routes = require('./routes');


var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 路由
routes(app);


if (module.parent) {
  module.exports = app;
} else {
  // 监听端口，启动程序
  app.listen(config.port, function () {
    console.log(`istening on port ${config.port}`);
  });
}
