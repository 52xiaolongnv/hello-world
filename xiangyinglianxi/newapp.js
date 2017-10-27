var express = require("express");
var app = express();
//io公式
var http = require('http').Server(app);

var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var session = require('express-session');
// var router = require("./controller/router.js");
var formidable = require('formidable');
// var db = require("./model/db.js");
var shebei = require('ua-parser-js');



//模板引擎
app.set('views',path.join(__dirname,'public'));
app.engine('.html',ejs.__express);
app.set("view engine","html");

//静态页面
app.use(express.static('./public'))


app.get('/',function (req,res,next) {
	console.log(req.ip + ';' + req.ips +';' + new Date + ';')
	res.render('404')
})
/*http.listen(3000,function () {
	console.log('监听3000中...')
})*/

http.listen(80,'103.76.85.128',function () {
	console.log('监听80中...')
})
