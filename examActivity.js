define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");
	require("cordova!cordova-plugin-x-toast");

	var Model = function(){
		this.callParent();
		
		this.userId;
		this.pageNo_exam = 0;
		this.totalPage_exam = 0;
	};

	
	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
		this.userId = event.params.userId;
		
		if (justep.Browser.isX5App) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
		
		this.getExam(false);
		
	};

	Model.prototype.getExam = function(isApend){
		var me = this;
		var exam = this.comp("exam");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/exam-user-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"pageNo" : me.pageNo_exam,
	        	"userId" : me.userId
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var examuserssObj = resultData.examusers;
	        	var pageNoObj = resultData.pageNo;
	        	var totalPageObj = resultData.totalPage;
	        	
	        	me.pageNo_exam = pageNoObj;
	        	me.totalPage_exam = totalPageObj;
//	        	alert(me.totalPage_study);
//	        	alert(experiencesObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	json={"@type" : "table","exam" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :examuserssObj };
	        	
        		exam.loadData(json, isApend);
	        	
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	}

	
	Model.prototype.scrollView1PullDown = function(event){
		this.pageNo_exam = 0;
		this.totalPage_exam = 0;
		this.getExam(false);
	};

	
	Model.prototype.scrollView1PullUp = function(event){
		if (this.pageNo_exam < this.totalPage_exam){
			this.pageNo_exam++;
			this.getExam(true);
		}
	};

	
	Model.prototype.li1Click = function(event){
		var current = event.bindingContext.$object;//获得当前行
		var examId = current.val("id");
		examId = 2;
//		alert(examId);
		var me = this;
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/exam-user-checked.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId,
	        	"examId" : examId
	        },
	        success: function(resultData) {
	        	var statusObj;	
	        	statusObj = resultData.status;
//	        	alert(statusObj);
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	if (statusObj == 0){
	        		//已完成
	        		if (justep.Browser.isX5App) window.plugins.toast.show("考试已完成", "long", "center");
	        	}else if (statusObj == 1){
	        		//可以考试
	        		me.startExam(examId);
	        	}else if (statusObj == -1){
	        		//已结束
	        		if (justep.Browser.isX5App) window.plugins.toast.show("考试已结束", "long", "center");
	        	}else if (statusObj == -2){
	        		//未开始
	        		if (justep.Browser.isX5App) window.plugins.toast.show("考试未开始", "long", "center");
	        	}else if (statusObj == -100){
	        		//异常
	        		if (justep.Browser.isX5App) window.plugins.toast.show("状态异常，请联系管理员", "long", "center");
	        	}
	        	
//	        	alert(resultData.author);
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	};

	Model.prototype.startExam = function(examId){
		var url = require.toUrl("./doExamActivity.w");
		var params = {
	        from : "examActivity",
	        examId : examId,
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