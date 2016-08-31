define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");

	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
		if (justep.Browser.isX5App) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
	};

	return Model;
});