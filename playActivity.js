define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	// require("cordova!cordova-plugin-screen-orientation");

	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
// 		cordova.plugins.screenorientation.setOrientation('landscape');//横屏模式
// //		cordova.plugins.screenorientation.setOrientation('unlock');//屏幕方向解锁
		
// 		//监听返回键
// 		document.addEventListener('backbutton', function(){
// //			alert("backbutton");
// 			justep.Shell.closePage();
// 		}, false);
// 		$(window).on('beforeunload', function(){
// 			document.removeEventListener('backbutton', listener, false);
// 	    });
		
		var url = "http://movie.ks.js.cn/flv/other/1_0.mp4";
		var type = '->video/mp4';
		this.ckPlayer(url, type);
	};
	
	Model.prototype.ckPlayer = function(url, type){
		
		var flashvars={
			f:url,
			c:0,
			p:1,	//自动播放
			g:0	//视频直接g秒开始播放
		};
		var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
		var video=[url + type];//html5支持
		CKobject.embed('/ckplayer/ckplayer.swf','a1','ckplayer_a1','100%','100%',true,flashvars,video,params);
//		CKobject.embedSWF('/ckplayer/ckplayer.swf','a1','ckplayer_a1','100%','100%',flashvars,params);

	}
	

	
	Model.prototype.modelUnLoad = function(event){
		// cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
	};
	

	
	return Model;
});

$(function(){
	$(".x-panel-content #div1 #a1").width($(window).width());
})




