define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
		
		this.contentId;
	};

	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
	    this.contentId = event.params.contentId;
//	    alert(contentId);
	    this.getContent();
	};

	
	/*请求新闻内容
	*
	*
	*@param i
	*
	*
	*/
	Model.prototype.getContent = function (){
		var me = this;
		var content = this.comp("content");
		var output_title = this.comp("output_title");
		var output_date = this.comp("output_date");
		var output_author = this.comp("output_author");
		var output_content = this.comp("output_content")
//		alert(me.contentId);
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/content.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"contentId" : me.contentId
	        },
	        success: function(resultData) {
	        	var idObj, authorObj, titleObj, statusObj, descriptionObj, dateObj, txtObj;	
	        	idObj = resultData.id;
	        	authorObj = resultData.author;
	        	titleObj = resultData.title;
	        	statusObj = resultData.status;
	        	descriptionObj = resultData.description;
	        	dateObj = resultData.date;
	        	txtObj = resultData.txt;

//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
//		        alert(JSON.stringify(resultData));
	        	json={"@type" : "table", "content" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :resultData };
	        	content.loadData(json);
	        	
//	        	alert(resultData.author);
	        	output_title.set({"value" : titleObj});
	        	output_date.set({"value" : dateObj});
	        	output_author.set({"value" : authorObj});
	        	output_content.set({"value" : txtObj});
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	    
	}

	return Model;
});