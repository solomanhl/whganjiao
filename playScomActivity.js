define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	require("cordova!cordova-plugin-screen-orientation");

	var Model = function(){
		this.callParent();
		
		 this.userId ;
		 this.courseId ;
		 this.url ;
	};

	Model.prototype.modelParamsReceive = function(event){
//		 if (justep.Browser.isX5App) cordova.plugins.screenorientation.setOrientation('landscape');//屏幕方向横屏
		 
		 var context = this.getContext();
		 var me = this;
		 this.userId = event.params.userId;
		 this.courseId = event.params.courseId;
		 this.url =  event.params.url;
//		 alert(this.url);
		 
		 var iframe1 = this.getElementByXid("iframe1");
		 iframe1.src = this.url;
		 var width = document.getElementById("div2").offsetWidth;
		 var height = width * 0.7;
//		 alert(width);
		 iframe1.Height =  height;
//		 iframe1.style.zoom=2;

	};

	Model.prototype.modelUnLoad = function(event){
		if (justep.Browser.isX5App )  cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
		
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