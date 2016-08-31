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
//	    alert(contentId);

	    if (justep.Browser.isX5App) 
	    cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式

	    this.getData(false);
	};
	
	Model.prototype.getData = function (isApend){
		var me = this;
		var data1 = this.comp("data1");
//		alert(me.contentId);
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/user-edit.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId
	        },
	        success: function(resultData) {
	        	var dataObj;
	        	dataObj = resultData.info;

//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
//		        alert(JSON.stringify(resultData));
	        	json={"@type" : "table", "data1" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :dataObj };
	        	data1.loadData(json, isApend);
	        	data1.first();
	        	
//	        	alert(resultData.author);
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	    
	}

	Model.prototype.button_submitClick = function(event){
		var mobile = this.comp("input1").val();
		var email = this.comp("input2").val();
		
		if (mobile != "" && email != ""){
			this.update(mobile, email);
		}
	};
	
	Model.prototype.update = function (mobile, email){
		var me = this;
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/user-update.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"mobile" : mobile,
	        	"email" : email,
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