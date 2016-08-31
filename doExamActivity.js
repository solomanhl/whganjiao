define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");

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
	        url: "http://whce.whgky.cn/app/exam-theme-list.jspx",
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
		var value = this.comp("radioGroup_single").val();
//		alert(value);
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
	
	return Model;
});