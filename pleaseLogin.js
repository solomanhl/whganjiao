define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.jumpToLogin = function(){
//		justep.Shell.setIsSinglePage(true);
		var url = require.toUrl("./loginActivity.w");
		var params = {
	        from : "mainActivity",
	        userId : this.userid
	    }
		justep.Shell.showPage(url, params);
	};
	Model.prototype.button1Click = function(event){
		this.jumpToLogin();
	};
	return Model;
});