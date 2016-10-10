define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");
	
	var global = require("./globalvar");

	var Model = function(){
		this.callParent();
		
		this.server = "http://whce.whgky.cn";
		this.server = global.server;
		
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
	    
	    if (this.from == "mainActivity"){
	    	this.getCourseList(false);//我的课程
	    }else if (this.from = "peixunActivity"){
	    	this.trainingclassId = event.params.trainingclassId;
	    	this.getCourseList_class(false);//培训班的课程
	    }
	    
	};
	
	Model.prototype.modelActive = function(event){
//		alert(2);
		this.userId = localStorage.getItem("my_CoursesActivity_userId");
		this.from = localStorage.getItem("my_CoursesActivity_from");
		this.trainingclassId = localStorage.getItem("my_CoursesActivity_trainingclassId");
		
		if (this.from == "mainActivity"){
	    	this.getCourseList(false);//我的课程
	    }else if (this.from == "peixunActivity"){
//	    	this.trainingclassId = event.params.trainingclassId;
//	    	alert(this.trainingclassId);
	    	this.getCourseList_class(false);//培训班的课程
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
	        	
        		course.loadData(json, isApend);
	        	
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	};
	
	//课程状态
	Model.prototype.getcourseStatus = function (status){
		switch (status){
			case 0: return "" ;break;
			default : return ""; break;
		}
		return status;
	};
	
	Model.prototype.getCourseList_class = function(isApend){
		var me = this;
		var course = this.comp("course");
//		alert(this.trainingclassId);
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/trainingclass-course-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
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
	        	
        		course.loadData(json, isApend);
	        	
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	};

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
	    this.from = event.from;
	    this.trainingclassId = event.trainingclassId;
//	    alert(this.from);
//	    if (this.from == "mainActivity"){
//	    	this.getCourseList(false);//我的课程
//	    }else if (this.from = "peixunActivity"){
//	    	this.getCourseList_class(false);//培训班的课程
//	    }
	};


	return Model;
});