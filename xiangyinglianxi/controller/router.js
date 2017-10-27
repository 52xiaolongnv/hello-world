var formidable = require('formidable');
var alluser = require('../model/alluser.js');


exports.dl_post = function (req,res,next) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		alluser.findOne({"name":fields.name},function (err,result) {
			if (result==null) {res.send('-1');return}
			else{
				if (result.pwd!=fields.pwd) {
					res.send('-2')
					return;
				};
			res.send('1')}
		})
	})
}