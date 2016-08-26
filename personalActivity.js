define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
		
		this.userId = 53;
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

	return Model;
});