/*var app = angular.module('app',[]);
app.controller('myhome',function ($scope) {
	if (!localStorage.weiba) {return;}
	$scope.denglu=true;
	$scope.touxiang = '/touxiang/00.jpg'
	$scope.myname = angular.fromJson(localStorage.weiba).name
})*/

var app = angular.module('fileUpload', ['ngFileUpload']);

app.run(function ($rootScope) {
	$rootScope.ceshide = '哈哈'
})

app.factory('myf',function (Upload, $timeout) {
	return  function(file, errFiles,myname) {
    	console.log('开始')
        var f = file;
        var errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/photo',
                data: {file: file,name:myname}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    localStorage.tx = angular.toJson(response.data);
                    alert('保存成功');
                    location.reload();
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        } 
    }

})

app.factory('myfactory',function () {
	return {
		toux:'/touxiang/mytouxiang.jpg'
	}
})

app.controller('myhome',function ($scope,$timeout,$rootScope,myf) {
	$scope.uploadFiles = myf;
	console.log($rootScope.ceshide)
	if (!localStorage.weiba) {$scope.touxiang = '/touxiang/00.jpg'; return;}
	if (localStorage.weiba) {
		console.log(localStorage)
		$scope.denglu=true;
		$scope.touxiang =  '/touxiang/mytouxiang.jpg'
		$scope.myname = angular.fromJson(localStorage.weiba).name
	}
})

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout','myfactory', function ($scope, Upload, $timeout,myfactory) {
    $scope.uploadFiles = function(file, errFiles) {
    	console.log('开始')
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/photo',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    console.log(response.data)
                    localStorage.tx = angular.toJson(response.data);
                    console.log(localStorage)
                   
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }   
    }
}]);




