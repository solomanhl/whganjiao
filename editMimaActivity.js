define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");

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
		
		if (old != "" && newp != ""){
			this.update(newp);
		}
	};

	Model.prototype.update = function(newp){
		var me = this;
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/user-pwd.jspx?userId=53&=1",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"password" : newp,
	        	"userId" : me.userId
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

	return Model;
});