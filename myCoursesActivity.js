define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");

	var Model = function(){
		this.callParent();
		
		this.userId;
		this.from;
		this.trainingclassId;//培训课程集id
		
		this.pageNo = 0;
		this.totalPage = 0;
	};

	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
		
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
	
	Model.prototype.getCourseList = function(isApend){
		var me = this;
		var course = this.comp("course");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/user-course-list.jspx",
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
			case 0: return "" break;
			default : return "" break;
		}
	};
	
	Model.prototype.getCourseList_class = function(isApend){
		var me = this;
		var course = this.comp("course");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/trainingclass-course-list.jspx",
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
		var current = event.bindingContext.$object;//获得当前行
		var status = current.val("status");
		var url = require.toUrl("./course_showActivity.w");
		var params = {
	        from : "myCoursesActivity",
	        courseId : current.val("id"),
	        userId : this.userId,
	        data : {
	            // 将data中的一行数据传给对话框
//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
	        }
	    }
		justep.Shell.showPage(url, params);
	};

	return Model;
});