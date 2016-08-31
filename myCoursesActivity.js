define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");

	var Model = function(){
		this.callParent();
		
		this.userId;
		
		this.pageNo = 0;
		this.totalPage = 0;
	};

	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
	    this.userId = event.params.userId;
	    
	    if (justep.Browser.isX5App) 
	    cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
	    
	    this.getCourseList(false);
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
	}

	Model.prototype.scrollView1PullDown = function(event){
		this.pageNo = 0;
		this.totalPage = 0;
		this.getCourseList(false);
	};

	Model.prototype.scrollView1PullUp = function(event){
		if (this.pageNo < this.totalPage){
			this.pageNo++;
			this.getCourseList(true);
		}
	};

	return Model;
});