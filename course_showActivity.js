define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
//	var ShellImpl = require('$UI/system/lib/portal/shellImpl');

	require("cordova!cordova-plugin-screen-orientation");
//	require("cordova!cordova-plugin-inappbrowser");
 
	var Model = function(){
		this.callParent();
		
		this.server = "http://whce.whgky.cn";
		
		this.courseId;//课程id
		this.userId;//用户id
		
		//评论
		this.pageNo_comment = 0;
		this.totalPage_comment = 0;
	};

	
	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
	    this.courseId = event.params.courseId;
	    this.userId = event.params.userId;
	    this.from = event.params.from;
//	    alert(this.courseId +  "/" + this.userId);

	    if (justep.Browser.isX5App) 
	    cordova.plugins.screenorientation.setOrientation('unlock');//屏幕方向解锁

	    this.getCourse();
		this.getComment(false);
		
		
	};
	
	
	Model.prototype.modelModelConstruct = function(event){
//		alert("onConstruct");
//		this.getCourse();
//		this.getComment(false);
	};
	
	//获取课程信息
	Model.prototype.getCourse = function (){
		var me = this;
		var course = this.comp("course");
//		alert(this.courseId + "|" + this.userId);
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/course.jspx",
//	        url: "http://192.168.1.22:8080/app/course.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"courseId" : me.courseId,
	        	"userId" : me.userId
//	        	"courseId" : 1,
//	        	"userId" : 53
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
//	        	alert(me.totalPage_study);
//	        	alert(contentsObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
//	        	var str = "{\"course\":[{\"id\":13,\"absract\":\"123143234234\"}]}";
//	        	var strObj = JSON.parse(str);
	        	var courseObj = resultData.courses;
	        	json={"@type" : "table", "course" : {"idColumnName" : "id", "idColumnType" : "Integer", },"rows" : courseObj };
	        	course.loadData(json, false);
	        	course.first();
	        	
	        	//这里要判断课程类型mp4、精英在线、scorm
//	        	var url = "http://movie.ks.js.cn/flv/other/1_0.mp4";
	        	var url = me.server + course.getValue("path");
				var type = '->video/mp4';
				var img = me.server + course.getValue("titleImg");
				
				//从第几秒开始
				var times = course.getValue("times");
				if (times == null){
					times = 0;
				}
//				alert(url + img);
				me.ckPlayer(url, type, img, times);
//	        	alert("课程数据" + course.getValue("times"));
	        	
	        },
	         error:function (msg){  
	        	 alert("服务器数据错误" + JSON.stringify(msg));
	         }
	    });
	}

	//获取课程评论
	Model.prototype.getComment = function (isApend){
		var me = this;
		var comment = this.comp("comment");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/course-experience-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"courseId" : me.courseId,
	        	"pageNo" : me.pageNo_comment
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var experiencesObj = resultData.experiences;
	        	var pageNoObj = resultData.pageNoObj;
	        	var totalPageObj = resultData.totalPage;
	        	
	        	me.pageNo_comment = pageNoObj;
	        	me.totalPage_comment = totalPageObj;
//	        	alert(me.totalPage_study);
//	        	alert(experiencesObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	json={"@type" : "table","comment" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :experiencesObj };
	        	
        		comment.loadData(json, isApend);
	        	
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	}

	Model.prototype.scrollView_userCommentPullDown = function(event){
		this.getComment(false);
	};

	Model.prototype.scrollView_userCommentPullUp = function(event){
		if (this.pageNo_comment < this.totalPage_comment){
			this.pageNo_comment++;
			this.getComment(true);
		}
	};
	
	//classhour转换成学时
	Model.prototype.classhourToXueshi = function (seconds){
//		alert(seconds);
		var h = (seconds / 3600).toFixed(1);//小数点后1位
		return h;
	};

	Model.prototype.ckPlayer = function(url, type, img, times){
		var me = this;
		var width = parseInt(document.getElementById("comm_top").offsetWidth * 0.96);
		var height = parseInt(width * 10 / 16);
//		alert(width);
		
		var flashvars={
			f:url,
			c:0,
			p:0,	//不自动播放
			g:times,	//视频直接g秒开始播放
			i:img,	//初始化图片
			lv:1,	//锁定进度条，不让拖动
		};
		var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
		var video=[url + type];//html5支持
		CKobject.embed('/ckplayer/ckplayer.swf','a1','ckplayer_a1',width,height,true,flashvars,video,params); 
//		CKobject.embedSWF('/ckplayer/ckplayer.swf','a1','ckplayer_a1','100%','100%',flashvars,params);
		
		CKobject.getObjectById('ckplayer_a1').addListener('play',function playHandler(){
		    //没有任何参数，但运行到这里则确认视频已暂停
//			    alert("play");
		});
			
		CKobject.getObjectById('ckplayer_a1').addListener('pause',function pauseHandler(){
		    //没有任何参数，但运行到这里则确认视频已暂停
//			    alert("pause");
		});
			
		CKobject.getObjectById('ckplayer_a1').addListener('ended',function endedHandler(){
		    //没有任何参数，但运行到这里则确认视频已暂停
//			    alert("ended");
			me.sendEnd();
		});
		
		CKobject.getObjectById('ckplayer_a1').addListener('time',function endedHandler(Number){
		    //没有任何参数，但运行到这里则确认视频已暂停
//			    alert(Number);
			var time = Math.round(Number);
			if ( time % 60 == 0 ){//一分钟
				//回传进度
				me.sendTime(time);
			}
		});
			
	}
	
	//回传课程时间
	Model.prototype.sendTime = function (time){
		var me = this;
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/course-play-times.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"courseId" : me.courseId,
	        	"userId" : me.userId,
	        	"times" : time
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var id = resultData.id;
	        	var status = resultData.status;
	        	var name = resultData.name;
	        	var path = resultData.path;
	        	
//	        	alert(me.totalPage_study);
//	        	alert(experiencesObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	};
	
	//看完视频回传状态
	Model.prototype.sendEnd = function (){
		var me = this;
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/course-play-end.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"courseId" : me.courseId,
	        	"userId" : me.userId
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var id = resultData.id;
	        	var status = resultData.status;
	        	var name = resultData.name;
	        	var path = resultData.path;
	        	
//	        	alert(me.totalPage_study);
//	        	alert(experiencesObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	};
	
	//点击播放
	Model.prototype.div1Click = function(event){
		//去播放之前先切换成横屏模式
		if (justep.Browser.isX5App ) 
		cordova.plugins.screenorientation.setOrientation('landscape');//横屏模式
//		ShellImpl.isSinglePage = true;
		justep.Shell.setIsSinglePage(true);
		var url = require.toUrl("./playActivity.w");
			var params = {
		        from : "course_showActivity",
		    }
			justep.Shell.showPage(url, params);
	};

	//点击写评论
	Model.prototype.button_commentClick = function(event){
		var url = require.toUrl("./editActivity.w");
			var params = {
		        from : "course_showActivity",
		        courseId : this.courseId,
		        userId : this.userId
		    }
			justep.Shell.showPage(url, params);
	};


	Model.prototype.modelUnLoad = function(event){
		
		if (justep.Browser.isX5App ) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
	};


	Model.prototype.modelLoad = function(event){
		//监听返回键
// 		document.addEventListener('backbutton', function(){
// 			justep.Shell.closePage();
// 		}, false);
// 		$(window).on('beforeunload', function(){
// 			document.removeEventListener('backbutton', listener, false);
// 	    });
	};

	//点击播放器外层的div
	Model.prototype.ckplayerClick = function(event){
		
		//如果播放类型是调用别人的网页，则弹出新页面
//		alert("");
//		_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
//		_blank: Opens in the InAppBrowser.
//		_system: Opens in the system's web browser.
//		window.open("http://whce.whgky.cn/u/cms/www/lesson01/study.html",'_self');//scorm，可以放，但是画面不全，类似iframe100%
//		window.open("http://whce.whgky.cn/u/cms/www/lesson01/study.html", '_self', 'enableViewportScale=yes,zoom=yes');//同上
		
//		window.open("http://whce.whgky.cn/u/cms/www/lesson02/index.html",'_self');//精英在线，白屏


		//通过服务器页面代理，解决跨域问题。
		var url = "http://whce.whgky.cn/app/course-flash-play.jspx";
		var options = "location=no,toolbar=yes";
		window.open(url,'_blank', options);//新scorm，弹出浏览器
		

		//scorm视频
//		var url = require.toUrl("./playScomActivity.w");
//			var params = {
//		        from : "course_showActivity",
//		        courseId : this.courseId,
//		        userId : this.userId,
////		        url : "http://whce.whgky.cn/u/cms/www/lesson01/study.html" //scorm，可以播放，但是不能缩放
//		        url : "http://whce.whgky.cn/app/course-flash-play.jspx" //新版scorm，要解决跨域问题
////		        url : "http://whce.whgky.cn/u/cms/www/lesson02/index.html" //精英在线，手机不能播放
//		    };
//			justep.Shell.showPage(url, params);
	};


	return Model;
});