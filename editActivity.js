define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-x-toast");
	require("cordova!cordova-plugin-screen-orientation");
	
	var global = require("./globalvar");

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
	    
	    if (justep.Browser.isX5App) 
	    cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
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
		        url: global.server + "/app/course-experience-save.jspx",
		        contentType: "application/json; charset=utf-8",
		        dataType: "jsonp",
		        jsonp: "CallBack",
		        data: {
		        	"courseId" : me.courseId,
		        	"userId" : me.userId,
//		        	"courseId" : 1,
//		        	"userId" : 53,
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
		        		if (justep.Browser.isX5App)
		        			window.plugins.toast.show("发表成功！", "long", "center");
		        		justep.Shell.closePage();
		        	}else{
		        		if (justep.Browser.isX5App)
		        			window.plugins.toast.show("发表失败，请稍后再试！", "long", "center");
		        	}
		        	
		        },
		         error:function (msg){  
		        	 alert("服务器数据错误" + JSON.stringify(msg));
		         }
		    });
		}
		
		
	}

	Model.prototype.modelUnLoad = function(event){
		justep.Shell.fireEvent("onRefreshCourse", {
				"courseId" : this.courseId, 
				"userId" : this.userId
			});
	};

	Model.prototype.modelLoad = function(event){
		//监听返回键
 		document.addEventListener('backbutton', function(){
 			justep.Shell.closePage();
 		}, false);
 		$(window).on('beforeunload', function(){
 			document.removeEventListener('backbutton', listener, false);
 	    });
	};

	return Model;
});