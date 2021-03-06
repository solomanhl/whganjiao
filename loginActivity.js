define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-x-toast");
	require("cordova!cordova-plugin-screen-orientation");
	
	var global = require("./globalvar");
	require("./js/md5");

	var Model = function(){
		this.callParent();
	};

	Model.prototype.button_loginClick = function(event){
		var me = this;
		var username = this.comp("input_user").val();
		var password = this.comp("password1").val();
		var paas_md5 = hex_md5(password);
//		alert(paas_md5);
		
		if (username == "" || password == ""){
			window.plugins.toast.show("请输入用户名或密码", "long", "center");
		}else{
//			this.login(username, password);
			this.login(username, paas_md5);
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
	        	"password" : pwd,
	        	"version" : 1	//0或无老版本不加密，1新版本加密
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
	        	
	        	if ( justep.Browser.isX5App ){
					window.plugins.toast.show(msg, "short", "bottom");
				}else{
					 justep.Util.hint(msg);
				}
				
	        	me.saveLocal(realname, username, userId, pwd, status);
	        	if (status == 1){
	        		justep.Shell.closePage();
	        	}
	        	
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 var msg = "获取数据失败";
	        	 if ( justep.Browser.isX5App ){
					window.plugins.toast.show(msg, "short", "bottom");
				}else{
					 justep.Util.hint(msg);
				}
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
		//监听返回键
 		document.addEventListener('backbutton', function(){
 			justep.Shell.closePage();
 		}, false);
 		$(window).on('beforeunload', function(){
 			document.removeEventListener('backbutton', listener, false);
 	    });
	};
	
	Model.prototype.modelUnLoad = function(event){
		setTimeout(function(){
			justep.Shell.fireEvent("onRefreshUser", {});
		},5);
	};
	
	return Model;
});