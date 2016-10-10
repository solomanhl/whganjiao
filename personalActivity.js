define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");
	
	var global = require("./globalvar");

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
		localStorage.setItem('realname',""); 
		localStorage.setItem('username',""); 
		localStorage.setItem('userid',""); 
		localStorage.setItem('password',"");
		localStorage.setItem('status',""); 
		
		var me = this;
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/logout.jspx",
//	        url: "http://192.168.1.22:8080/app/logout.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId
//	        	"userId" : 2982
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
//	        	var statusObj = resultData.status;
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
		
		
		justep.Shell.closePage();
	};

	Model.prototype.div_banghzuClick = function(event){
		var url = require.toUrl("./helpIndexActivity.w");
			var params = {
		        from : "personalActivity",
		    }
			justep.Shell.showPage(url, params);
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