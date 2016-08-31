define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");

	var Model = function(){
		this.callParent();
		
		this.userId;
	};

	//修改信息
	Model.prototype.div_xinxiClick = function(event){
		this.edit();
	};
	
	Model.prototype.edit = function(){
		var url = require.toUrl("./editUserActivity.w");
			var params = {
		        from : "personalActivity",
		        userId : this.userId
		    }
			justep.Shell.showPage(url, params);
	};

	//修改密码
	Model.prototype.div_mimaClick = function(event){
		this.change();
	};
	
	Model.prototype.change = function(){
		var url = require.toUrl("./editMimaActivity.w");
			var params = {
		        from : "personalActivity",
		        userId : this.userId
		    }
			justep.Shell.showPage(url, params);
	};

	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
		this.userId = event.params.userId;
		
		if (justep.Browser.isX5App) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
	};

	Model.prototype.modelUnLoad = function(event){
		setTimeout(function(){
			justep.Shell.fireEvent("onRefreshUser", {});
		},5);
	};

	Model.prototype.button_exitClick = function(event){
		localStorage.setItem('username',""); 
		localStorage.setItem('userid',""); 
		localStorage.setItem('password',"");
		localStorage.setItem('status',""); 
		justep.Shell.closePage();
	};

	return Model;
});