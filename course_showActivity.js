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
		this.getComment(false);
	};
	
	//获取课程信息
	Model.prototype.getCourse = function (){
		var me = this;
		var course = this.comp("course");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/course.jspx",
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
	        	
//	        	alert(me.totalPage_study);
//	        	alert(contentsObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	json={"@type" : "table", "course" : {"idColumnName" : "id", "idColumnType" : "Integer", },"rows" : resultData };
	        	course.loadData(json, false);
	        	
//	        	alert(course.count());
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
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
	        	"pageNo" : "1"
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
	        	
	        	
//	        	alert(comment.count());
	        	
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

	return Model;
});