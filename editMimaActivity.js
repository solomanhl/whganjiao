define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");
	
	var global = require("./globalvar");
	require("./js/md5");

	var Model = function(){
		this.callParent();
		
		this.userId;
	};

	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
	    this.userId = event.params.userId;
	    
	    if (justep.Browser.isX5App) 
	    cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
	};
	
	Model.prototype.button_submitClick = function(event){
		var old = this.comp("input_old").val();
		var newp = this.comp("input_new").val();
		var confirm = this.comp("input_confirm").val();
		
		if (old != "" && newp != ""){
			if (newp == confirm){
				var newp_md5 = hex_md5(newp);
//				this.update(newp);
				this.update(newp_md5);
			}
		}
	};

	Model.prototype.update = function(newp){
		var me = this;
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/user-pwd.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"password" : newp,
	        	"userId" : me.userId,
	        	"version" : 1	//0或无老版本不加密，1新版本加密
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
//	        	alert(me.totalPage_study);
//	        	alert(contentsObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	var status = resultData.status;
	        	if (status == 1){
	        		window.plugins.toast.show("修改成功！", "long", "center");
	        		justep.Shell.closePage();
	        	}else{
	        		window.plugins.toast.show("修改失败，请稍后再试！", "long", "center");
	        	}
	        	
	        },
	         error:function (msg){  
	        	 alert("服务器数据错误" + JSON.stringify(msg));
	         }
	    });
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