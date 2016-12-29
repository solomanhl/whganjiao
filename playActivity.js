define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var global = require("./globalvar");
	
	 require("cordova!cordova-plugin-screen-orientation");

	var Model = function(){
		this.callParent();
		
		this.courseId;//课程id
		this.userId;//用户id
	};

		
	Model.prototype.modelModelConstruct = function(event){
		if (justep.Browser.isX5App) 
 		cordova.plugins.screenorientation.setOrientation('landscape');//横屏模式
 //		cordova.plugins.screenorientation.setOrientation('unlock');//屏幕方向解锁
	};
	
	Model.prototype.modelLoad = function(event){

		
 		//监听返回键
 		document.addEventListener('backbutton', function(){
 			justep.Shell.closePage();
 		}, false);
 		$(window).on('beforeunload', function(){
 			document.removeEventListener('backbutton', listener, false);
 	    });
		
		var url = "http://movie.ks.js.cn/flv/other/1_0.mp4";
		var type = '->video/mp4';
		this.ckPlayer(url, type);
		
//		this.comp("titleBar1").set({"visible" : false});
		$("#titleBar1").attr('visible', false); 
	};
	
	Model.prototype.ckPlayer = function(url, type){
		var width = document.getElementById("div1").offsetWidth;
//		var height = width * 10
//		alert(width);
		
		var flashvars={
			f:url,
			c:0,
			p:1,	//自动播放
			g:0	//视频直接g秒开始播放
		};
		var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
		var video=[url + type];//html5支持
		CKobject.embed('/ckplayer/ckplayer.swf','a1','ckplayer_a1',width,'100%',true,flashvars,video,params);
//		CKobject.embedSWF('/ckplayer/ckplayer.swf','a1','ckplayer_a1','100%','100%',flashvars,params);

	}
	

	
	Model.prototype.modelUnLoad = function(event){
		if (justep.Browser.isX5App) 
		 cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
		 
		 justep.Shell.fireEvent("onRefreshCourse", {
				"courseId" : this.courseId, 
				"userId" : this.userId
			});
	};
	

	Model.prototype.div1Click = function(event){
//		this.comp("titleBar1").set({"visible" : true});
		$("#titleBar1").attr('visible', true); 
	};
	

	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
	    this.courseId = event.params.courseId;
	    this.userId = event.params.userId;
	};
	

	return Model;
});

$(function(){
	$(".x-panel-content #div1 #a1").width($(window).width());
})




