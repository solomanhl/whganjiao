define(function(require){
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
		
		this.pageNo_exam = 0;
		this.totalPage_exam = 0;
	};
	
	Model.prototype.modelParamsReceive = function(event){
		this.getExam(false);
	};
	
	Model.prototype.getExam = function(isApend){
		var me = this;
		var peixun = this.comp("peixun");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/trainingclass-user-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"pageNo" : me.pageNo_exam
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

	return Model;
});
