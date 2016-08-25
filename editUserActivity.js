define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
		
		this.userId;
	};

	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
	    this.userId = event.params.userId;
//	    alert(contentId);

//	    this.getData(false);
	};
	
	Model.prototype.getData = function (isApend){
		var me = this;
		var data1 = this.comp("data1");
//		alert(me.contentId);
		$.ajax({
	        type: "get",
	        "async" : false,
//	        url: "http://whce.whgky.cn/app/user-edit.jspx",
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

	return Model;
});