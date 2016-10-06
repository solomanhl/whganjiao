define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
		this.userId;
		this.courseId;
		this.url;
	};

	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
		this.userId = event.params.userId;
		this.courseId = event.params.courseId;
		this.url = event.params.url;
//		alert(this.url);
		
		var iframe1 = this.getElementByXid("iframe1");
		 iframe1.src = this.url;
		 
//		if (justep.Browser.isX5App){
//			this.getElementByXid("span1").innerText = "精英在线课程无法在手机上播放！";
//		}
	};

	Model.prototype.modelUnLoad = function(event){
		justep.Shell.fireEvent("onRefreshList", {
				"courseId" : this.courseId, 
				"userId" : this.userId
			});
	};	

	return Model;
});