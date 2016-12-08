define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var global = require("./globalvar");
	
	require("cordova!cordova-plugin-screen-orientation");

	var Model = function(){
		this.callParent();
		
		 this.userId ;
		 this.courseId ;
		 this.trainingclassId;
		 this.url ;
		 this.times = 0;//进入timer的次数
	};

	Model.prototype.modelParamsReceive = function(event){
//		 if (justep.Browser.isX5App) cordova.plugins.screenorientation.setOrientation('landscape');//屏幕方向横屏
		 
		 var context = this.getContext();
		 var me = this;
		 this.userId = event.params.userId;
		 this.courseId = event.params.courseId;
		 this.trainingclassId = event.params.trainingclassId;
		 this.url =  event.params.url;
//		 alert(this.url);
		 
		 var iframe1 = this.getElementByXid("iframe1");
		 iframe1.src = this.url;
		 var width = document.getElementById("div2").offsetWidth;
		 var height = width * 0.7;
		 iframe1.Height =  height;

	};

	Model.prototype.modelUnLoad = function(event){
		if (justep.Browser.isX5App )  cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
		justep.Shell.fireEvent("onRefreshCourse", {
				"courseId" : this.courseId, 
				"userId" : this.userId,
				"trainingclassId":this.trainingclassId
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

	Model.prototype.timer1Timer = function(event){
		var me = this;
		var timer1 = this.comp("timer1");
//		alert(timer1.get("times"));
		this.times ++;
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/course/inner_member/play_clear.jspx",
//	        url: "http://192.168.1.22:8080/app/online.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId,
	        	"courseId" : me.courseId,
	        	"times": timer1.get("interval") / 1000 * me.times 
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
//	        	var statusObj = resultData.status;
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (errData){  
	        	 alert("服务器数据错误：" + JSON.stringify(errData));
	         }
	    });
	};

	return Model;
});