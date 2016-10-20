define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
//	var ShellImpl = require('$UI/system/lib/portal/shellImpl');

	require("cordova!cordova-plugin-screen-orientation");
//	require("cordova!cordova-plugin-inappbrowser");
	
	var global = require("./globalvar");
 
	var Model = function(){
		this.callParent();
		
//		this.server = "http://whce.whgky.cn";
		this.server = global.server;
		
		this.from;
		this.trainingclassId;
		this.courseId;//课程id
		this.userId;//用户id
		this.shapeId;//课件类型
		this.pretime;//开始时间
		
		this.loaded = false;//页面加载完成
		
		//评论
		this.pageNo_comment = 0;
		this.totalPage_comment = 0;
	};

	
	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
	    this.courseId = event.params.courseId;
	    this.userId = event.params.userId;
//	    this.from = event.params.from;
	    this.trainingclassId = event.params.trainingclassId;
//	    alert(this.trainingclassId +  "/" + this.userId)

//	    if (justep.Browser.isX5App) 
//	    cordova.plugins.screenorientation.setOrientation('unlock');//屏幕方向解锁

	    if (this.userId >0 ){
	    	if ( !this.loaded){
	    		this.getCourse();
	    		this.getComment(false);
	    		this.loaded = true;
	    	}
	    	
	    }
		
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
	        url: global.server + "/app/course.jspx",
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
	        	/*
					0：动画
					1：华点通三分频
					2：中经三分频
					3：单视频
					4：精品三分频
					5：图书
	        	*/
//	        	var url = "http://movie.ks.js.cn/flv/other/1_0.mp4";
	        	var url = me.server + course.getValue("path");
				var type = '->video/mp4';
				var img = me.server + course.getValue("titleImg");
				
				//从第几秒开始
				var times = course.getValue("times");
				if (times == null){
					times = 0;
				}
				me.pretime = times;
				
				me.shapeId = course.getValue("shapeId");;
//				alert(me.shapeId);
//				me.shapeId = 2;
				if (me.shapeId == 3){
					var flashvars={
						f:url,
						c:0,
						p:0,	//不自动播放
						g:times,	//视频直接g秒开始播放
						i:img,	//初始化图片
						lv:1,	//锁定进度条，不让拖动
					};
					me.ckPlayer(url, type, img, times, flashvars);
				}else if (me.shapeId == 4){
				//精英在线课件不支持手机
//					url = "http://whce.whgky.cn/course/lessionnew/gc/GC31I3314035_1405/index.html?url=whce.whgky.cn/course/inner_member/jinyinzaixian/o_play_log.jspx&userId=24311&courseID=6472";
						var flashvars={
//				        f:'http://whce.whgky.cn/course/lessionnew/gc/GC31I3314035_1405/index.html?url=[$url]&userId=[$uid]&courseID=[$cid]',
//				        a:'whce.whgky.cn/course/inner_member/jinyinzaixian/o_play_log.jspx|24311|6472',
//				        s:1,
				        c:0,
				        p:0,	//不自动播放
				        g:times,	//视频直接g秒开始播放
						i:img,	//初始化图片
						lv:1,	//锁定进度条，不让拖动
				    };
				    me.ckPlayer(url, type, img, times, flashvars);
				}else if (me.shapeId == 2){
				//中经三分频，scorm
//					url = "http://whce.whgky.cn/course/lessionnew/gc/GC31I3314035_1405/index.html?url=whce.whgky.cn/course/inner_member/jinyinzaixian/o_play_log.jspx&userId=24311&courseID=6472";
						var flashvars={
//				        f:'http://whce.whgky.cn/course/lessionnew/gc/GC31I3314035_1405/index.html?url=[$url]&userId=[$uid]&courseID=[$cid]',
//				        a:'whce.whgky.cn/course/inner_member/jinyinzaixian/o_play_log.jspx|24311|6472',
//				        s:1,
				        c:0,
				        p:0,	//不自动播放
				        g:times,	//视频直接g秒开始播放
						i:img,	//初始化图片
						lv:1,	//锁定进度条，不让拖动
				    };
				    me.ckPlayer(url, type, img, times, flashvars);
				}else{
					var flashvars={
						f:url,
						c:0,
						p:0,	//不自动播放
						g:times,	//视频直接g秒开始播放
						i:img,	//初始化图片
						lv:1,	//锁定进度条，不让拖动
					};
					me.ckPlayer(url, type, img, times, flashvars);
				}
				
//				alert(url + img);
				
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
	        url: global.server + "/app/course-experience-list.jspx",
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

	Model.prototype.ckPlayer = function(url, type, img, times, flashvars){
		var me = this;
		var width = parseInt(document.getElementById("comm_top").offsetWidth * 0.96);
		var height = parseInt(width * 10 / 16);
//		alert(width);
		
//		var flashvars={
//			f:url,
//			c:0,
//			p:0,	//不自动播放
//			g:times,	//视频直接g秒开始播放
//			i:img,	//初始化图片
//			lv:1,	//锁定进度条，不让拖动
//		};
//		alert(JSON.stringify(flashvars));
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
			if ( time % 10 == 0 ){//10S
				//当前时间大于开始时间，回传进度
				if (time > times){
					me.sendTime(time);
				}
				
			}
		});
			
	}
	
	
	//回传课程时间
	Model.prototype.sendTime = function (time){
		var me = this;
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/course-play-times.jspx",
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
	        url: global.server + "/app/course-play-end.jspx",
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
//		justep.Shell.setIsSinglePage(true);
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
		        userId : this.userId,
		        trainingclassId : this.trainingclassId
		    }
			justep.Shell.showPage(url, params);
	};


	Model.prototype.modelUnLoad = function(event){
		
		if (justep.Browser.isX5App ) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
		
		//卸载事件
		justep.Shell.off("onRefreshCourse", this.onRefreshCourse);
		
//		alert(this.from);
		justep.Shell.fireEvent("onRefreshCourseList", {
									"userId" : this.userId,
									"trainingclassId" : this.trainingclassId});
	};
	
	Model.prototype.onRefreshCourse = function(event){
		this.courseId = event.courseId;//课程id
		this.userId = event.userId;//用户id
		this.trainingclassId = event.trainingclassId;//培训班id
		
		if (this.userId != null && this.userId != null && this.userId != undefined){
			if (!this.loaded){
				this.getCourse();
				this.getComment(false);
				this.loaded = true;
			}
	    	
	    }
//		alert(this.userId);
		
		
	};


	Model.prototype.modelLoad = function(event){
		//监听返回键
 		document.addEventListener('backbutton', function(){
 			justep.Shell.closePage();
 		}, false);
 		$(window).on('beforeunload', function(){
 			document.removeEventListener('backbutton', listener, false);
 	    });
		//添加事件
		justep.Shell.on("onRefreshCourse", this.onRefreshCourse, this);
	};
	
	//计算已经看过的时间
	Model.prototype.calcTime = function (value){
		var theTime = parseInt(value);// 秒
	    var theTime1 = 0;// 分
	    var theTime2 = 0;// 小时
	    if(theTime > 60) {
	        theTime1 = parseInt(theTime/60);
	        theTime = parseInt(theTime%60);
	            if(theTime1 > 60) {
	            theTime2 = parseInt(theTime1/60);
	            theTime1 = parseInt(theTime1%60);
	            }
	    }
	        var result = ""+parseInt(theTime)+"秒";
	        if(theTime1 > 0) {
	        result = ""+parseInt(theTime1)+"分"+result;
	        }
	        if(theTime2 > 0) {
	        result = ""+parseInt(theTime2)+"小时"+result;
	        }
	    return result;
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

		
		//通过服务器页面代理，解决跨域问题。  可用！！！！！！！！！！！！！！！！
//		var url = "http://whce.whgky.cn/app/course-flash-play.jspx";
//		var options = "location=no,toolbar=yes";
//		window.open(url,'_blank', options);//新scorm，弹出浏览器

		if (this.shapeId == 4){
			//精英在线
			//通过服务器页面代理，
//			var course = this.comp("course");
//			var path = course.getValue("path");
//			var url = this.server + path + "?url=whce.whgky.cn/course/inner_member/jinyinzaixian/o_play_log.jspx&userId=" + this.userId + "&courseID=" + this.courseId;
//			var options = "location=no,toolbar=yes";
//			window.open(url,'_blank', options);//，弹出浏览器
			
			
			var url = require.toUrl("./playJinYinActivity.w");
			var course = this.comp("course");
			var path = course.getValue("path");
//			path = "/course/lessionnew/gc/GC31I3314035_1405/index.html";
			var params = {
		        from : "course_showActivity",
		        courseId : this.courseId,
		        userId : this.userId,
		        trainingclassId : this.trainingclassId,
		        url : this.server + path + "?url=" + global.server + "/course/inner_member/jinyinzaixian/o_play_log.jspx&userId=" + this.userId + "&courseID=" + this.courseId
		    };
			justep.Shell.showPage(url, params);
			
		}else if (this.shapeId == 2){
			//中经三分频，老scorm内核，不支持手机
			//通过服务器页面代理，
//			var course = this.comp("course");
//			var path = course.getValue("path");
//			var url = this.server + "/course/course_inner_member_play_scorm_app.htm?courseId=" + this.courseId + "&URL="  + path+ "&pretime=" + this.pretime + "&status=2";
//			var options = "location=no,toolbar=yes";
//			window.open(url,'_blank', options);//，弹出浏览器

			var url = require.toUrl("./playScomActivity.w");
			var course = this.comp("course");
			var path = course.getValue("path");
			//path = "/course/lessionnew/gc/GC16A2916025_1605/index.html";
			var params = {
		        from : "course_showActivity",
		        courseId : this.courseId,
		        userId : this.userId,
		        trainingclassId : this.trainingclassId,
		        url : this.server + "/course/course_inner_member_play_scorm_app.htm?courseId=" + this.courseId + "&URL="  + path+ "&pretime=" + this.pretime + "&status=2",
		    };
			justep.Shell.showPage(url, params);
//		}
		
		
	};
}

	return Model;
});