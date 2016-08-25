define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-x-toast");

	var Model = function(){
		this.callParent();
		
		this.courseId;//课程id
		this.userId;//用户id
	};

	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
	    this.courseId = event.params.courseId;
	    this.userId = event.params.userId;
	};

	Model.prototype.button1Click = function(event){
		this.send();
	};
	
	Model.prototype.send = function (){
		var me = this;
		var txt = this.comp("textarea1").val();
		
		if (txt != ""){
			$.ajax({
		        type: "get",
		        "async" : false,
		        url: "http://whce.whgky.cn/app/course-experience-save.jspx",
		        contentType: "application/json; charset=utf-8",
		        dataType: "jsonp",
		        jsonp: "CallBack",
		        data: {
	//	        	"courseId" : me.courseId,
	//	        	"userId" : me.userId
		        	"courseId" : 1,
		        	"userId" : 53,
		        	"content" : txt
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
		        	
		        	var status = resultData.status;
		        	
		        	if (status == 1){
		        		window.plugins.toast.show("发表成功！", "long", "center");
		        		justep.Shell.closePage();
		        	}else{
		        		window.plugins.toast.show("发表失败，请稍后再试！", "long", "center");
		        	}
		        	
		        },
		         error:function (msg){  
		        	 alert("服务器数据错误" + JSON.stringify(msg));
		         }
		    });
		}
		
		
	}

	return Model;
});