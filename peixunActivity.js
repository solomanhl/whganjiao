define(function(require){
	var $ = require("jquery");
	
	require("cordova!cordova-plugin-screen-orientation");
	
	var global = require("./globalvar");
	
	var Model = function(){
		this.callParent();
		
		this.pageNo_exam = 0;
		this.totalPage_exam = 0;
		
		this.userId;
	};
	
	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
		this.userId = event.params.userId;
		
		if (justep.Browser.isX5App) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
		
		if (this.userId != undefined)
			this.getExam(false);
	};
	
	Model.prototype.getExam = function(isApend){
		var me = this;
		var peixun = this.comp("peixun");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/trainingclass-user-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"pageNo" : me.pageNo_exam,
	        	"userId" : me.userId,
//	        	"trainingclassId" : 1
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var trainingclassusersObj = resultData.trainingclassusers;
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
	        	
	        	json={"@type" : "table","peixun" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :trainingclassusersObj };
	        	
        		peixun.loadData(json, isApend);
	        	
	        	
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
		var url = require.toUrl("./myCoursesActivity.w");
		var params = {
	        from : "peixunActivity",
	        userId : this.userId,
	        trainingclassId : current.val("id"),
	        data : {
	            // 将data中的一行数据传给对话框
//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
	        }
	    }
		justep.Shell.showPage(url, params);
	};

	Model.prototype.modelLoad = function(event){
		//添加事件
		justep.Shell.on("onRefreshList", this.onRefreshList, this);
	};

	Model.prototype.modelUnLoad = function(event){
		//卸载事件
		justep.Shell.off("onRefreshList", this.onRefreshList);
	};
	
	Model.prototype.onRefreshList = function(event){
		this.userId = event.userId;
	    this.from = event.from;
	    this.trainingclassId = event.trainingclassId;
	    
	    if (this.userId != undefined)
			this.getExam(false);
	};

	return Model;
});
