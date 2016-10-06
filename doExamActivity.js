define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");
	require("cordova!cordova-plugin-x-toast");
	
	var global = require("./globalvar");

	var Model = function(){
		this.callParent();
		this.userId;
		this.examId;
		this.pageNo=1;
		this.totalPage=1;
		
	};

	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
		this.userId = event.params.userId;
		this.examId = event.params.examId;
//		alert(this.userId + "/" + this.examId);
		
		if (justep.Browser.isX5App) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
		
		this.getThemes(this.pageNo, false);
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

	Model.prototype.getThemes = function(page, isApend){
		var me = this;
		var data = this.comp("themes");
		var options = this.comp("options");
		
		var list_option_single = this.comp("list_option_single");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/exam-theme-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId,
	        	"examId" : me.examId,
	        	"pageNo" : page
	        },
	        success: function(resultData) {
//	        	alert(JSON.stringify(resultData));
	        	var themesObj;
	        	
	        	me.pageNo = resultData.pageNo;
	        	me.totalPage = resultData.totalPage;
	        	themesObj = resultData.themes;
//	        	alert(JSON.stringify(themesObj));

	        	
	        	
	        	
	        	json={"@type" : "table", "themes" : {"idColumnName" : "themeId","idColumnType" : "Integer", },"rows" :themesObj };
	        	data.loadData(json, isApend);
	        	
	        	
	        	//option详细表
				var optionsObj;
				var newOptionStr = "[";
				$.each(themesObj,function(i,item){
//					alert(item.name);
					optionsObj = item.options;
					var themeId = item.themeId;
					var name = item.name;
					$.each(optionsObj,function(j,item){
//						alert(item.content);
						newOptionStr += "{";
						
						newOptionStr = newOptionStr +"\"id\":" + (i*j + j) + ",";
						newOptionStr = newOptionStr +"\"id2\":" + j + ",";
						newOptionStr = newOptionStr +"\"themeId\":" + themeId + ",";
						newOptionStr = newOptionStr +"\"name\":\"" + name + "\",";
						newOptionStr = newOptionStr +"\"content\":\"" + item.content + "\",";
						newOptionStr = newOptionStr +"\"optionId\":" + item.optionId;
						
						newOptionStr += "},";
					});
					newOptionStr = newOptionStr.substring(0, newOptionStr.length-1);
					newOptionStr += "]";
//					alert(newOptionStr);
	
					
					json1={"@type" : "table", "options" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :JSON.parse(newOptionStr) };
		        	options.loadData(json1, isApend);
		        	options.refreshData();
//		        	alert(options.count());
				});
				
//				list_option_single.refresh();
	        	
	        	
//	        	alert(data.count());
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	};
	
	
	Model.prototype.radioGroup_singleChange = function(event){
//		alert("onChage");
		var value = this.comp("radioGroup_single").val();	//这里绑定的是optionId
//		alert(value);
		var options = this.comp("options");
		options.first();
		var count = options.count();//选项数量
		var themeId = options.getValue("themeId");
		var optionIds = [];	//选项id数组
		var checked = [];	//选择数组
		
		options.each(function(param){
			var curId = param.row.val('optionId');
			optionIds.push(curId);
			if (value ==  curId){
				checked.push(1);
			}else{
				checked.push(0);
			}
		});
//		alert(themeId);
//		alert(optionIds);
//		alert(checked);
		this.exam_save(themeId, optionIds, checked);
	}; 
	
	Model.prototype.button_preClick = function(event){
		if (this.pageNo >1){
			this.getThemes((this.pageNo-1), false);
		}
	};
	
	Model.prototype.button_nextClick = function(event){
		if (this.pageNo < this.totalPage){
			this.getThemes((this.pageNo+1), false);
		}
	};
	
	
	Model.prototype.messageDialog1OK = function(event){
//		alert("ok");
		this.exam_finish();
	};
	
	//提交单题
	Model.prototype.exam_save = function (themeId, optionIds, checked){
		var me = this;
		var strOptionIds = "{";
		var strchecked = "{";

		for (var i=0; i<optionIds.length; i++){
			strOptionIds = strOptionIds + optionIds[i] + ",";
			strchecked = strchecked + checked[i] + ",";
		}

		strOptionIds = strOptionIds.substring(0, strOptionIds.length - 1);
		strOptionIds += "}";
		
		strchecked = strchecked.substring(0, strchecked.length - 1);
		strchecked += "}";
		
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/exam-save.jspx",
//	        url: "http://192.168.1.22:8080/app/exam-save.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId,
	        	"themeId" : themeId,
	        	"optionIds" : strOptionIds,
	        	"checked" : strchecked
	        },
	        success: function(resultData) {
//	        	alert(JSON.stringify(resultData));
	        	var result = resultData.result;
	        	if (result == "true"){
	        	
	        	}
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	};
	
	//交卷
	Model.prototype.exam_finish = function (){
		var me = this;
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/exam-finish.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId,
	        	"examId" : me.examId
	        },
	        success: function(resultData) {
//	        	alert(JSON.stringify(resultData));
	        	var result = resultData.result;
	        	if (result == "true"){
	        		if (justep.Browser.isX5App) window.plugins.toast.show("考试结束", "long", "center");
	        		justep.Shell.closePage();
	        	}else{
	        		if (justep.Browser.isX5App) window.plugins.toast.show("交卷失败，请重新提交", "long", "center");
	        	}
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	};
	
	Model.prototype.button_submitClick = function(event){
//		alert("click");
		this.comp("messageDialog1").show();
	};
	
	return Model;
});