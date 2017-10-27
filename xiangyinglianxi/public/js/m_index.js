var app = angular.module('app',['ui.router','ngAnimate','ngFileUpload']);
app.run(function ($rootScope) {
	$rootScope.loading = false;//转圈的
	$rootScope.loading1 = false;//遮罩的
	$rootScope.loading2 = false;//发表成功
	$rootScope.loading3 = false;//发表失败
	$rootScope.loading4 = false;//添加成功
	$rootScope.loading5 = false;//添加失败
	// $rootScope.dlok = true;
	$rootScope.caiDan = true;//菜单侧出动画控制
	$rootScope.hot = true;
	$rootScope.ceshi = 'page2';
	$rootScope.what_new = '1';//定义新闻先显示第一个
	$rootScope.fabiao = false;//先显示说两句，true为显示评论框
	$rootScope.className = false;//发布自己的
	$rootScope.what_fb_pl = '1';//定义myhome里已发布先显示
	$rootScope.myhome_email = '1';//定义站内信的先显示
	$rootScope.tianjia = false;//定义添加朋友框的显示
})
//发表评论函数
app.factory('f_b',function ($http,$rootScope,$interval) {
	var second=1;
	return function () {
		$http.post('/fb_pinglun').then(function (response) {
			if (response.data=='1') {
				$rootScope.loading = false;
				$rootScope.loading2 = true;
				// 当提交成功后显示成功框1秒
				 timerHandler =$interval(function(){
				 	if (second==3) {
				 		$interval.cancel(timerHandler);//显示完成后必须使用这个公式清除，否则有后患
				 		$rootScope.loading2 = false;
				 		$rootScope.loading1 = false;
				 		$rootScope.fabiao = !$rootScope.fabiao;
				 	}else{
				 		second++;
				 	}
				 },500)
			}else{
				$rootScope.loading = false;
				$rootScope.loading3 = true;
				// 当提交成功后显示成功框1秒
				 timerHandler =$interval(function(){
				 	if (second==3) {
				 		$interval.cancel(timerHandler);//显示完成后必须使用这个公式清除，否则有后患
				 		$rootScope.loading3 = false;
				 		$rootScope.loading1 = false;
				 	}else{
				 		second++;
				 	}
				 },500)
			}
		})
	}
})
//添加朋友函数
app.factory('tjpengyou',function ($http,$rootScope,$interval) {
	var second=1;
	return function () {
		$http.post('/fb_pinglun').then(function (response) {
			if (response.data=='1') {
				$rootScope.loading = false;
				$rootScope.loading4 = true;
				// 当提交成功后显示成功框1秒
				 timerHandler =$interval(function(){
				 	if (second==3) {
				 		$interval.cancel(timerHandler);//显示完成后必须使用这个公式清除，否则有后患
				 		$rootScope.loading4 = false;
				 		$rootScope.loading1 = false;
				 		$rootScope.tianjia = !$rootScope.tianjia;
				 	}else{
				 		second++;
				 	}
				 },500)
			}else{
				$rootScope.loading = false;
				$rootScope.loading5 = true;
				// 当提交成功后显示成功框1秒
				 timerHandler =$interval(function(){
				 	if (second==3) {
				 		$interval.cancel(timerHandler);//显示完成后必须使用这个公式清除，否则有后患
				 		$rootScope.loading5 = false;
				 		$rootScope.loading1 = false;
				 	}else{
				 		second++;
				 	}
				 },500)
			}
		})
	}
})
//上传图片预览函数
app.factory('photoyulan',function (Upload, $timeout) {
	return function (file, errFiles) {
		var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (ev) {
        	 console.log(ev.target.result)
        }
	}
})
//上传图片函数
app.factory('myf',function (Upload, $timeout) {
	return  function(file, errFiles,myname) {
    	console.log('开始')
    	console.log(file)
        var f = file;
        var errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/photo',
                data: {file: file,name:myname}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                	console.log(response.data)
                    // file.result = response.data;
                    // localStorage.tx = angular.toJson(response.data);
                    // alert('保存成功');
                    // location.reload();
                });
            });
        } 
    }

})

app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/shouye');
	$stateProvider
		.state('index', {
	    	url:"/shouye",
	    	templateUrl:'m_index.html'
    	})
    	.state('index.neirong', {
	    	url:"/:bank/:btnum",
	    	views: {
                    'new_neirong': {
	    					templateUrl:'view2/new_neirong.html'
	    				}
	    			}
    	})    	
    	.state('index.myhome', {
	    	url:"/myhome",
	    	views: {
                    'new_neirong': {
	    					templateUrl:'view2/myhome.html'
	    				}
	    			}
    	})
    	.state('index.myemail', {
	    	url:"/myemail",
	    	views: {
                    'new_neirong': {
	    					templateUrl:'view2/myemail.html'
	    				}
	    			}
    	})
})

app.controller('xy',function ($http,$rootScope,$scope,$stateParams,$state,$interval,f_b,myf,photoyulan,tjpengyou) {
	//添加手机号
	$scope.tjshouji = function () {
		$rootScope.loading = true;//转圈的
		$rootScope.loading1 = true;//遮罩的
		tjpengyou()
	}
	//添加框的显示
	$scope.caidan_tianjia=function () {
		$rootScope.tianjia = !$rootScope.tianjia;
	}
	$scope.hot_button = function () {
		$rootScope.hot = false;
		$rootScope.ceshi = 'page2 page1';
	}
	$scope.hot_fanhui = function () {
		$rootScope.hot = true;
		$rootScope.ceshi = 'page2';
	}
	
	$scope.fanhui = function () {
		$state.go('index')
		$rootScope.what_new = $stateParams.bank;
		$rootScope.hot = false;
		$rootScope.ceshi='page2 page1'
		// history.back();
	}

	$scope.fb = function () {
		$rootScope.loading = true;
		$rootScope.loading1 = true;
		f_b()
		// window.location.reload();
	}
	
	$scope.shuoshuo = function () {
		$rootScope.fabiao = !$rootScope.fabiao;
	}
	$scope.chakan_fabu = function () {
		$rootScope.className = !$rootScope.className
	}
	$scope.myfabu = function () {
		$rootScope.className = !$rootScope.className
	}
	$scope.index_caidan = function () {
		$rootScope.caiDan = false;
		$rootScope.ceshi = 'page2 page';
	}
	$scope.zhezhao_caidan = function () {
		$rootScope.caiDan = true;
		$rootScope.ceshi = 'page2';
	}
	$scope.myhome_caidan = function () {
		$rootScope.caiDan = false;
		$rootScope.ceshi = 'page2 page';
		$state.go('index')
	}

	// 上传图片
	$scope.uploadFiles = myf;
	//预览图片
	$scope.yulanimg = []
	$scope.onloadFiles = function(file) {       //单次提交图片的函数
		$scope.reader = new FileReader()
        $scope.reader.readAsDataURL(file);  //FileReader的方法，把图片转成base64
        $scope.reader.onload = function(ev) {
            $scope.$apply(function(){
                $scope.yulanimg.push(ev.target.result)
                document.querySelector('.myupload').reset();//每次上传后清空file框，确保每次都能调用change事件
            });
        }};


	

})