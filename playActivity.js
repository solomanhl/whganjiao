define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
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
	

	
	return Model;
});