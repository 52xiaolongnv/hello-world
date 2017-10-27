var app = angular.module('app',['ui.router','fengzhuan','tm.pagination']);

/*app.run(function (lunbotu) {
  lunbotu(function (callback) {
    localStorage.lunbotu =angular.toJson(callback)
  })
})*/



app.run(function ($rootScope,$location,lunbotu) {
   $rootScope.$on('$locationChangeStart',function(){
    if ($location.url()=='/index') {
                    console.log(localStorage.lunbotu)
                    lunbotu(function (callback) {
                        $(function(){
                          $("#mySlide").mySlide(callback,3000);//3000是秒数
                      })
                    })
                    // var arr = angular.fromJson(localStorage.lunbotu)
                       /*var arr=[//模拟ajax请求的数据
                        {imgurl:"img/home/1.jpg",href:"#",text:"Picture 1 information"},
                        {imgurl:"img/home/2.jpg",href:"#",text:"Picture 2 information"},
                        {imgurl:"img/home/3.jpg",href:"#",text:"Picture 3 information"},
                        {imgurl:"img/home/4.jpg",href:"#",text:"Picture 4 information"}
                    ];
                    $(function(){
                        $("#mySlide").mySlide(arr,3000);//3000是秒数
                    })*/
                  }
  })
})

app.run(function ($rootScope,keepdl) {
  if (localStorage.weiba && angular.fromJson(localStorage.weiba).keep==1) {
    $rootScope.keepdl = true;$rootScope.name=angular.fromJson(localStorage.weiba).name;$rootScope.myphoto=angular.fromJson(localStorage.weiba).myphoto
  }
  else{$rootScope.keepdl=false}
})

// 封装IO
app.factory('socket', function ($rootScope) {
    var socket = io();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  });

app.controller('aaaa',function ($scope,$http,$state) {
  console.log("jj")
})

app.config(function($stateProvider,$urlRouterProvider){
   $urlRouterProvider.otherwise('/index');
   $stateProvider
        .state('index', {
            url:"/index",
            templateUrl:'index.html',
            // cache:false,//刷新用的，貌似可以不要，先保留着
            controller:'index'
        })
        .state('index.denglu', {
            url:'/denglu',
            views: {
                    'neirong': {
                    templateUrl: function () {
                      if (!angular.fromJson(localStorage.weiba)) {return 'view/denglu.html'}
                      else{console.log(angular.fromJson(localStorage.weiba));alert('非法操作');window.location="/"}
                    },
                    controller:'denglu'
                  }
                }
        })
        .state('index.luntan',{
          url:'/luntan',
          abstract: true,
          views:{
            'neirong':{
              templateUrl:'view/luntan.html',
              controller:'luntan'
            }
          }
        })         
        .state('index.rizhi',{
          url:'/rizhi',
          abstract: true,
          views:{
            'neirong':{
              templateUrl:'view/rizhi.html',
              
            }
          }
        })         
        .state('index.rizhi.dianzi',{
          // params:{"page":null},
          url:'/dianzi/:page',
          
          templateUrl:'view/dianzi.html',
          controller:'rizhiyouping'
            
          
        })         
        .state('index.rizhi.dianzi.comment2',{
          // params:{"page":null},
          url:'/:id',
 
          templateUrl:'view/comment2.html',
          controller:'rizhiyouping2'
            
          
        })        
        .state('index.luntan.mao',{
          url:'/mao/:page',
          templateUrl:'view/mao.html',
          controller:'lt'

        })        
        .state('index.luntan.luoli',{
          url:'/luoli',
          templateUrl:'view/luoli.html',
          controller:'lt2'
        })        
        .state('index.luntan.neihan',{
          url:'/neihan',
          templateUrl:'view/neihan.html',
          controller:'lt2'
        })        
        .state('index.luntan.mao.comment',{
          
          url:'/:id',
          templateUrl:'view/comment.html',
          controller:'lt2'
        })        
        .state('index.luntan.luoli.comment',{
          url:'/:id',
          templateUrl:'view/comment.html',
          controller:'lt'
        })        
        .state('index.luntan.neihan.comment',{
          url:'/:id',
          templateUrl:'view/comment.html',
          controller:'lt'
        })

        .state('index.renmen',{
          url:'/remen/:bti/:neirong',
          views:{
            'neirong':{
              templateUrl:'view/remen.html',
              controller:'liebiaozhu'
            }
          }
        })        
        .state('index.zuixindongtai',{
          url:'/zuixindongtai/:bti/:neirong',
          views:{
            'neirong':{
              templateUrl:'view/zuixindongtai.html',
              controller:'liebiaozhu'
            }
          }
        })        
        .state('index.xinfayoup',{
          url:'/xinfayoup/:bti/:neirong',
          views:{
            'neirong':{
              templateUrl:'view/xinfayoup2.html',
              controller:'liebiaozhu'
            }
          }
        })
/*        .state('index.luntan.lt',{
          url:'/:name',

          templateUrl:'view/lt.html',
          controller:'lt'
            
          
        })*/
        .state('yy', {
            url:"/hehe",
            controllerProvider:function ($state) {
              $state.go('qq')
            }
        })
        .state('qq', {
            url:'/uu',
            templateUrl:'ceshi.html' 
        })
})

app.controller('index',function ($rootScope,$scope,$http,$state,socket,$location,$timeout,zuixindongtai,remen,xinfayoup,weibo,huoyue) {
    console.log(typeof(localStorage.weiba))
    console.log(localStorage.weiba)

    weibo(function (callback) {
      $scope.weibo = callback
    })

    // When we see a new msg event from the server
    socket.on('new-msg', function (message) {
        console.log(message)
        $scope.weibo.splice(0,1);
        $scope.weibo.push(message);
    });
    socket.on('qw', function (message) {
        console.log(message)
        $scope.messages.splice(0,0,message);
    });
    // Tell the server there is a new message
    // 回车发送
/*    $scope.broadcast = function(ev) {
      if(ev.keyCode!==13){return;}
      console.log($scope.message)
        socket.emit('broadcast-msg', {message: $scope.message,yonghuname:angular.fromJson(localStorage.weiba).name});
        // $scope.messages.push($scope.message);
        $scope.message = '';
    };*/
    //按键发送
  $scope.fabu = function (neirong) {
    if (!neirong || $scope.keepdl!=true) {return;}
    //先存入数据库，成功后再广播
    $http.post('/addweibo',{'name':angular.fromJson(localStorage.weiba).name,'neirong':neirong}).then(function (response) {
       if (response.data == '1') {
        socket.emit('broadcast-msg', {'name':angular.fromJson(localStorage.weiba).name,'neirong':neirong});
      }else{
        alert('出错')
        return;
      }
    })
  };


    $scope.myhome = function () {
      if (!localStorage.weiba) {alert('尚未登录');return;}
      window.location="/myhome"
    }
  
    $scope.tuichu = function () {
      console.log('1')
      localStorage.removeItem('weiba');
      location.reload();
    }
  // socket.on('liaotian',function (msg) {
  //     console.log(msg)
  //     $scope.shuoshuo.splice(0,0,msg)
  //     console.log('执行了')
  //     console.log($scope.shuoshuo)
  //   })
  // $scope.fasong = function (wenzhang) {
  //   socket.emit('liaotian',{"nameone":"测试","neirong":wenzhang})
  //   // this.shuoshuo.splice(0,0,{"nameone":"测试","neirong":wenzhang})
  // }
  
  $scope.enter = function (ev) {
    if(ev.keyCode==13){alert('jj')}
  }
  
/*  $scope.tuichu = function () {
    $scope.yonghu = false;
    localStorage.removeItem('weiba')
  }*/
  $scope.aa = function () {
    $http.post('/tianjia',$scope.zhuce).then(function (response) {
      if(response.data.keep == 1){
          localStorage.weiba = angular.toJson(response.data);alert('注册成功');console.log(response);location.reload();
  
        }else{
          alert('错误');
        }
    })
  }
  $scope.qq = function () {
    $http.post('/denglu',$scope.denglu).then(function (response) {
      if(response.data == 1){alert('登录成功');location.reload();}else{alert('错误');}
    })
    // window.location="/";
  }
  //广播轮播
  $scope.$watch('$viewContentLoaded', function() {
            var box=document.getElementById("div1"),can=true;
            box.innerHTML+=box.innerHTML;
            box.onmouseover=function(){can=false};
            box.onmouseout=function(){can=true};
            new function (){
             var stop=box.scrollTop%18==0&&!can;
             if(!stop)box.scrollTop==parseInt(box.scrollHeight/2)?box.scrollTop=0:box.scrollTop++;
             setTimeout(arguments.callee,box.scrollTop%18?10:1500);
            };
/*            var arr=[//模拟ajax请求的数据
                {imgurl:"img/home/1.jpg",href:"#",text:"Picture 1 information"},
                {imgurl:"img/home/2.jpg",href:"#",text:"Picture 2 information"},
                {imgurl:"img/home/3.jpg",href:"#",text:"Picture 3 information"},
                {imgurl:"img/home/4.jpg",href:"#",text:"Picture 4 information"}
            ];
            $(function(){
                $("#mySlide").mySlide(arr,3000);//3000是秒数
            })*/
        });
  // $scope.$apply('')
/*  $rootScope.$on('$locationChangeStart',function(){ 路由加载前 
    $state.reload();
  })*/
/*  $rootScope.$on('$locationChangeSuccess',function(){  路由加载后
    console.log($location.url())
    // if ($location.url()=='/index/luntan') {$state.go('index.luntan',{},{reload:true})}用go 跳到页面并刷新路由
    if ($location.url()=='/index') {
      // $state.go('index',{},{reload:true})
            $timeout(function(){ 利用timeout的apply进行重载
                console.log('1')
　　　　　　　　　var arr=[//模拟ajax请求的数据
                {imgurl:"img/home/1.jpg",href:"#",text:"Picture 1 information"},
                {imgurl:"img/home/2.jpg",href:"#",text:"Picture 2 information"},
                {imgurl:"img/home/3.jpg",href:"#",text:"Picture 3 information"},
                {imgurl:"img/home/4.jpg",href:"#",text:"Picture 4 information"}
            ];
            $(function(){
                $("#mySlide").mySlide(arr,3000);//3000是秒数
            })
　　　　},100)
    }


  })*/
/*    $scope.aui = function () {
        console.log('开始')
        $http.post('/huoyue').then(function (response) {
      console.log(response.data)
    })
  }*/

  $scope.ceshide = function () {
    $http.post('/ceshide').then(function (response) {
      console.log(response.data)
    })
  }

  zuixindongtai(function (callback) {
    $scope.zuixindongtai = callback;
  })  
  remen(function (callback) {
    $scope.remen = callback;
  })
  xinfayoup(function (callback) {
    $scope.xinfayoup = callback;
  })

  huoyue(function (callback) {
    $scope.huoyue = callback;
  })

})


app.controller('luntan',function ($scope,$state,$timeout,$http,$stateParams,luntanmao,luntanluoli,luntanneihan) {


  $scope.name = 'ok';
  luntanmao(function (callback) {
    // $scope.mao = callback;
    localStorage.mao =angular.toJson(callback)
    $scope.oo = [];
    $scope.oi = 0; 
    $scope.ou = 5;
    $scope.iu = function (i) {
      $scope.a = Math.ceil(i.length / 5)
      for ($scope.ss=0;$scope.ss<$scope.a;$scope.ss++){
        $scope.oo.push({'content':i.slice($scope.oi,$scope.ou)})
        $scope.oi +=5;
        $scope.ou +=5;
      }
      return $scope.oo
    }
    // localStorage.mao =angular.toJson($scope.iu(callback))

    // console.log($scope.iu(callback))
  })  

  luntanluoli(function (callback) {
    console.log('begin')
    $scope.luoli = callback;
  })  

  luntanneihan(function (callback) {
    console.log('begin')
    $scope.neihan = callback;
  }) 
/*  $scope.neihan = [
    {"biaoti":"1内涵人号已售编号已售编号已售编号已售"},
    {"biaoti":"2内涵人号已售编号已售编号已售编号已售"},
    {"biaoti":"3内涵人号已售编号已售编号已售编号已售"}
  ];  
  $scope.luoli = [
    {"biaoti":"1萝莉人号已售编号已售编号已售编号已售"},
    {"biaoti":"2萝莉人号已售编号已售编号已售编号已售"},
    {"biaoti":"3萝莉人号已售编号已售编号已售编号已售"}
  ];*/

})

app.controller('lt',function ($scope,$state,$timeout,$stateParams) {
  //js字符串转数字法：在前面写'+'号即可
  $scope.mao = angular.fromJson(localStorage.mao).slice((+$stateParams.page-1)*5,+$stateParams.page*5)
  
  console.log(angular.fromJson(localStorage.mao))

   $scope.paginationConf = {
      currentPage: +$stateParams.page,//当前所在的页（…默认第1页）
      totalItems: angular.fromJson(localStorage.mao).length,//总共有多少条记录（不用说了吧）
      itemsPerPage: 5,//每页展示的数据条数（…默认15条）
      pagesLength: 15,//分页条目的长度（如果设置建议设置为奇数）
      perPageOptions: [10, 20, 30, 40, 50],//每页展示的数据条数（…默认15条）
      onChange: function(){
        }
    };

})

app.controller('lt2',function ($scope,$state,$timeout,$stateParams) {
  $scope.bti = angular.fromJson(localStorage.mao)[parseInt($stateParams.id)].CatTitle
  $scope.nrong = angular.fromJson(localStorage.mao)[parseInt($stateParams.id)].CatText


})



app.controller('denglu',function ($scope,$http,dengl) {
  // if (keepdl) {window.location="/";}
  dengl()
  $scope.zhuce={};
  $scope.denglu = {};
  $scope.qq = function () {
    $http.post('/denglu',$scope.denglu).then(function (response) {
      if(response.data == '1'){localStorage.weiba =angular.toJson({"keep":"1","name":$scope.denglu.name});console.log(localStorage.weiba);alert('登录成功');window.location="/";return;}
      if (response.data == '-1') {alert('无此用户,请注册');return;}
      if (response.data == '-2') {alert('密码错误');return;}
      else{alert('错误');}
    })
    // window.location="/";location.reload()
  }
  $scope.aa = function () {
    $http.post('/zhuce',$scope.zhuce).then(function (response) {
      if(response.data == '1'){
          localStorage.weiba = angular.toJson({"keep":"1","name":$scope.zhuce.name});alert('注册成功');console.log(localStorage.weiba);window.location="/";
          return;
        }
      if (response.data == '-1') {
        alert('用户名已存在');
        return;
      }
      else{
          alert('290错误');
          return;
        }
    })
  }

})

app.controller('liebiaozhu',function ($scope,$state,$timeout,$stateParams) {
  console.log($stateParams.bti)
  console.log($stateParams.neirong)
  $scope.bti = $stateParams.bti;
  $scope.nrong = $stateParams.neirong;
})

app.controller('rizhiyouping',function ($scope,$state,$timeout,$stateParams,rizhiyouping) {

  rizhiyouping(function (callback) {
    $scope.biaoti = callback
    localStorage.rizhiyouping =angular.toJson(callback)
  })
  $scope.ara = function (a,i,id) {
     $state.go('index.rizhi.dianzi.comment2',{title:a,text:i,id:id})
  }
 
  console.log(typeof(parseInt($stateParams.id)))

  
  // $scope.text = $stateParams.text

})

app.controller('rizhiyouping2',function ($scope,$state,$timeout,$stateParams) {
  $scope.title = angular.fromJson(localStorage.rizhiyouping)[parseInt($stateParams.id)].title
  $scope.text = angular.fromJson(localStorage.rizhiyouping)[parseInt($stateParams.id)].text
 
})

