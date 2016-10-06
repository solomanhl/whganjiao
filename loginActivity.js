define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-x-toast");
	require("cordova!cordova-plugin-screen-orientation");
	
	var global = require("./globalvar");

	var Model = function(){
		this.callParent();
	};

	Model.prototype.button_loginClick = function(event){
		var me = this;
		var username = this.comp("input_user").val();
		var password = this.comp("password1").val();
		
		if (username == "" || password == ""){
			window.plugins.toast.show("请输入用户名或密码", "long", "center");
		}else{
			this.login(username, password);
		}
		
	};


	Model.prototype.login = function (name, pwd){
		var me = this;
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/login.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"username" : name,
	        	"password" : pwd
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var realname = resultData.realname;
	        	var username = resultData.username;
	        	var userId = resultData.userId;
	        	var status = resultData.status;
	        	
//	        	alert(realname);
//	        	alert(username + userId + status);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	var msg;
	        	if (status == 1){
	        		msg = "登录成功";
	        	}else if (status == 0){
	        		msg = "用户名或密码错误";
	        	}else if ( status == -1){
	        		msg = "账户被禁用，请联系管理员";
	        	}else{
	        		msg = "网络错误";
	        	}
	        	
//	        	window.plugins.toast.show(msg, "long", "center");
	        	me.saveLocal(realname, username, userId, pwd, status);
	        	if (status == 1){
	        		justep.Shell.closePage();
	        	}
	        	
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	};
	
	//保存到本地
	Model.prototype.saveLocal = function (realname,username, userid, password, status){
		localStorage.setItem('realname',realname); 
		localStorage.setItem('username',username); 
		localStorage.setItem('userid',userid); 
		localStorage.setItem('password',password);
		localStorage.setItem('status',status); 
	};
	
	Model.prototype.modelLoad = function(event){
		if (justep.Browser.isX5App) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
	};
	
	Model.prototype.modelUnLoad = function(event){
		setTimeout(function(){
			justep.Shell.fireEvent("onRefreshUser", {});
		},5);
	};
	
	return Model;
});