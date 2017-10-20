var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var winston = require('winston');
var expressWinston = require('express-winston');


var app = express();

app.listen(3030, function() {
    console.log('开始监听')
})
