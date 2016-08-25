define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
		
		
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
	    
	    this.getCourse();
		this.getComment(false);
	};
	
	Model.prototype.modelModelConstruct = function(event){
//		this.getCourse();
//		this.getComment(false);
	};
	
	//获取课程信息
	Model.prototype.getCourse = function (){
		var me = this;
		var course = this.comp("course");
		
		$.ajax({
	        type: "get",
	        "async" : false,
//	        url: "http://whce.whgky.cn/app/course.jspx",
	        url: "http://192.168.1.22:8080/app/course.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
//	        	"courseId" : me.courseId,
//	        	"userId" : me.userId
	        	"courseId" : 1,
	        	"userId" : 53
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
	        	course.last();
	        	
//	        	alert("课程数据" + course.count());
	        	
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


	//点击播放
	Model.prototype.div1Click = function(event){
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

	return Model;
});