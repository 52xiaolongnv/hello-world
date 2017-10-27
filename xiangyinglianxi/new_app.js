var http = require('http');

http.createServer(function(req,res){
	console.log('1')
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello Aliyun Node.js\n');
}).listen(80,'103.76.85.128',function () {
	console.log('ok')
});