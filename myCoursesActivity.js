define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");
	
	var global = require("./globalvar");

	var Model = function(){
		this.callParent();
		
		this.server = "http://whce.whgky.cn";
		this.server = global.server;
		this.isloading = justep.Bind.observable(false);//是否显示正在加载的动画框
		
		this.loaded = false;
		
		this.userId;
		this.from;
		this.trainingclassId;//培训课程集id
		
		this.pageNo = 0;
		this.totalPage = 0;
	};
	
	//转换课程的图服务器图片路径
	Model.prototype.getServerImg = function(path){
		var rtn = "";
		if (path != "" && path !=null){
			rtn = this.server + path;
		}
		return rtn;
	};

	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
//		alert(1);
		
		if (justep.Browser.isX5App) cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
	    
	    this.userId = event.params.userId;
	    this.from = event.params.from;
	    
	    if (this.from == "mainActivity" && !this.loaded ){
	    	localStorage.setItem('courselist_classCache',json);
	    	//加载本地缓存
			var courselistCache = localStorage.getItem("courselistCache");
			if (courselistCache != undefined){
				this.comp("course").loadData(courselistCache, false);
			}
	    	this.isloading.set(true);
	    	this.getCourseList(false);//我的课程
	    	this.loaded = true;
	    }else if (this.from = "peixunActivity" && !this.loaded){
	    	this.trainingclassId = event.params.trainingclassId;
	    	if (this.trainingclassId != undefined){
	    		//加载本地缓存
				var courselist_classCache = localStorage.getItem("courselist_classCache");
				if (courselist_classCache != undefined){
					//存在有不同的培训班，不适合调取缓存
//					this.comp("course").loadData(courselist_classCache, false);
				}
	    		this.isloading.set(true);
	    		this.getCourseList_class(false);//培训班的课程
	    		this.loaded = true;
	    	}
	    }
	    
	};
	
	
	Model.prototype.getCourseList = function(isApend){
		var me = this;
		var course = this.comp("course");
//		alert(this.userId);
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/user-course-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"pageNo" : me.pageNo,
	        	"userId" : me.userId
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var coursesObj = resultData.courses;
	        	var pageNoObj = resultData.pageNo;
	        	var totalPageObj = resultData.totalPage;
	        	
	        	me.pageNo = pageNoObj;
	        	me.totalPage = totalPageObj;
//	        	alert(me.pageNo);
//	        	alert(experiencesObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	json={"@type" : "table","course" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :coursesObj };
	        	localStorage.setItem('courselistCache',json);
        		course.loadData(json, isApend);
	        	me.isloading.set(false);
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 me.isloading.set(false);
	        	 var msg = "获取数据失败";
	        	 if ( justep.Browser.isX5App ){
					window.plugins.toast.show(msg, "short", "bottom");
				}else{
					 justep.Util.hint(msg);
				}
	         }
	    });
	};
	
	//课程状态
	Model.prototype.getcourseStatus = function (status){
		switch (status){
			case -1: return "" ; //未加入
				break;
			case 0: return "已加入" ;
				break;
			case 1: return "学习中" ;
				break;
			case 2: return "已完成" ;
				break;
			default : return ""; 
		}

	};
	
	//
	Model.prototype.bindStatusCSS = function( status ){
		switch (status){
			case -1: return "status1" ; //未加入
				break;
			case 0: return "status2" ;
				break;
			case 1: return "status3" ;
				break;
			case 2: return "status4" ;
				break;
			default : return "status1"; 
		}

	}
	
	Model.prototype.getCourseList_class = function(isApend){
		var me = this;
		var course = this.comp("course");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/trainingclass-course-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId,
	        	"pageNo" : me.pageNo,
	        	"trainingclassId" : me.trainingclassId
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var coursesObj = resultData.courses;
	        	var pageNoObj = resultData.pageNo;
	        	var totalPageObj = resultData.totalPage;
	        	
	        	me.pageNo = pageNoObj;
	        	me.totalPage = totalPageObj;
//	        	alert(me.totalPage_study);
//	        	alert(experiencesObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	json={"@type" : "table","course" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :coursesObj };
	        	localStorage.setItem('courselist_classCache',json);
        		course.loadData(json, isApend);
	        	me.isloading.set(false);
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 me.isloading.set(false);
	        	 var msg = "获取数据失败";
	        	 if ( justep.Browser.isX5App ){
					window.plugins.toast.show(msg, "short", "bottom");
				}else{
					 justep.Util.hint(msg);
				}
	         }
	    });
	};
	
	//显示课程状态
	Model.prototype.setStatus = function (status){
		var rtn;
		switch (status){
			case -1 : rtn = ""; //未加入
				break;
			case 0 : rtn = "已选课";
				break;
			case 1 : rtn = "学习中";
				break;
			case 2 : rtn = "已完成";
				break;
			default: rtn = "";
		}
		return rtn;
	}

	Model.prototype.scrollView1PullDown = function(event){
		this.pageNo = 0;
		this.totalPage = 0;
		if (this.from == "mainActivity"){
	    	this.getCourseList(false);//我的课程
	    }else if (this.from = "peixunActivity"){
	    	this.getCourseList_class(false);//培训班的课程
	    }
	};

	Model.prototype.scrollView1PullUp = function(event){
		if (this.pageNo < this.totalPage){
			this.pageNo++;
			if (this.from == "mainActivity"){
		    	this.getCourseList(true);//我的课程
		    }else if (this.from = "peixunActivity"){
		    	this.getCourseList_class(true);//培训班的课程
		    }
		}
	};

	Model.prototype.li1Click = function(event){
		localStorage.setItem('my_CoursesActivity_userId',this.userId); 
		localStorage.setItem('my_CoursesActivity_from',this.from); 
		localStorage.setItem('my_CoursesActivity_trainingclassId',this.trainingclassId); 
		
		var current = event.bindingContext.$object;//获得当前行
//		alert(current.val("id"));
		var status = current.val("status");
		var url = require.toUrl("./course_showActivity.w");
		var params = {
	        from : this.from,
	        courseId : current.val("courseId"),
	        trainingclassId : this.trainingclassId,
	        userId : this.userId,
	        data : {
	            // 将data中的一行数据传给对话框
//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
	        }
	    }
		justep.Shell.showPage(url, params);
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
		justep.Shell.on("onRefreshCourseList", this.onRefreshCourseList, this);
	};


	Model.prototype.modelUnLoad = function(event){
		//卸载事件
		justep.Shell.off("onRefreshCourseList", this.onRefreshCourseList);
		
		justep.Shell.fireEvent("onRefreshList", {"from" : this.from,
									"userId" : this.userId,
									"trainingclassId" : this.trainingclassId});
	};
	
	Model.prototype.onRefreshCourseList = function(event){
		this.userId = event.userId;
//	    this.from = event.from;
	    this.trainingclassId = event.trainingclassId;
//	    alert(this.trainingclassId);
	    
	    if (this.trainingclassId > 0 && !this.loaded){
	    	this.getCourseList_class(false);//培训班的课程
	    	this.loaded = true;
	    }else if (   this.userId > 0 && !this.loaded){
//	    	alert(this.loaded);
	    	this.getCourseList(false);//我的课程
	    	this.loaded = true;
	    }
	};


	return Model;
});