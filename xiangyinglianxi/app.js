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
var router = require("./controller/router.js");
var db = require("./model/db.js");


//模板引擎
app.set('views',path.join(__dirname,'public'));
app.engine('.html',ejs.__express);
app.set("view engine","html");

//静态页面
app.use(express.static('./public'))

app.post('/dl_post',router.dl_post)
app.post('/fb_pinglun',function (req,res,next) {
	console.log('1')
	res.send('1')
})
app.post('/photo',function (req,res,next) {
	res.send('1')
})
app.get('/index',function (req,res,next) {
	var u = req.headers['user-agent'].toLowerCase();;
	var ua = u.match(/(iphone|ipod|ipad|android)/);
	// console.log(ua)
	if(ua){
		res.render('m_index')
	}else{
		res.render('p_index')
	}
})
app.get('/',function (req,res,next) {
	res.render('one_index')
})
/*http.listen(3000,function () {
	console.log('监听3000中...')
})*/

http.listen(3000,'127.0.0.1',function () {
	console.log('监听80中...')
})
