define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");
	require("cordova!cordova-plugin-x-toast");
	
	var allData = require("./js/loadData");
	var global = require("./globalvar");

	var Model = function(){
		this.callParent();
		this.userId;
		this.examId;
		this.pageNo=1;
		this.totalPage=1;
		
		this.upload_themeId;
		this.upload_optionId;
		this.upload_optionIds;
		this.upload_text;
		this.upload_checked;
		
		this.themeId;//题目id
		this.themeType; //题目类型 0单选 1多选  2文本
//		this.optionIds = [];	//选项id数组
//		this.checked = [];	//选择数组
//		this.text = [];	//文本框内容数组
//		
//		this.showSingleTxt = justep.Bind.observable(false);//显示单选文本
//		this.showMultiTxt = justep.Bind.observable(false);//显示多选文本
//		this.showTxt = justep.Bind.observable(false);//显示主观题文本
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

	//获取试题，单题
	Model.prototype.getThemes = function(page, isApend){
		var me = this;
		var data = this.comp("themes");
		var options = this.comp("options");
		
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

	        	//调试 从本地json取本地图片路径
//				var url = require.toUrl("./json/examData.json");
//				var testObj;
//				$.ajaxSettings.async = false;
//				$.getJSON(url, function(data) {
//					testObj = data;
//				});
//				themesObj = testObj.themes;
				//-------------------------
	        	
	        	
	        	json={"@type" : "table", "themes" : {"idColumnName" : "themeId","idColumnType" : "Integer", },"rows" :themesObj };
	        	data.loadData(json, isApend);
	        	data.refreshData();
	        	me.upload_themeId = data.val("upload_themeId");
	        	
//	        	debugger;
	        	//option详细表
	        	options.clear();//清空选项表
				var optionsObj;
				var newOptionStr = "[";
				$.each(themesObj,function(i,item){
//					alert(item.name);
					optionsObj = item.options;
					me.themeId = item.themeId;
					me.themeType = item.type;//全局试题类型0 1 2
					var themeId = item.themeId;
					var name = item.name;
					$.each(optionsObj,function(j,item){
//						alert(item.content);
//						debugger;
						newOptionStr += "{";
						
						newOptionStr = newOptionStr +"\"id\":" + (i*j + j) + ",";
						newOptionStr = newOptionStr +"\"id2\":" + j + ",";
						newOptionStr = newOptionStr +"\"themeId\":" + themeId + ",";
						newOptionStr = newOptionStr +"\"name\":\"" + name + "\",";
						newOptionStr = newOptionStr +"\"content\":\"" + item.content + "\",";
						newOptionStr = newOptionStr +"\"type\":\"" + item.type + "\",";
						newOptionStr = newOptionStr +"\"optionId\":" + item.optionId;
						
						newOptionStr += "},";
					});
					
				});
				
				newOptionStr = newOptionStr.substring(0, newOptionStr.length-1);
				newOptionStr += "]";
//				alert(newOptionStr);

				
				json1={"@type" : "table", "options" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :JSON.parse(newOptionStr) };
	        	options.loadData(json1, false);
	        	options.refreshData();
//		        alert(options.count());
				
//				list_option_single.refresh();
	        	
	        	
//	        	alert(data.count());
	        },
	         error:function (){  
	        	 var msg = "获取数据失败";
	        	 if ( justep.Browser.isX5App ){
					window.plugins.toast.show(msg, "long", "center");
				}else{
					 justep.Util.hint(msg);
				}
	         }
	    });
	};
	
	//现在不用单选组
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
//		this.save();
		if (this.pageNo >1){
			this.getThemes((this.pageNo-1), false);
		}
	};
	
	Model.prototype.button_nextClick = function(event){
//		if (this.type == 0){//单选
//			
//		}else if (this.type == 1){//多选
//		
//		}else if (this.type == 2){//文本
//		
//		}
		if (this.pageNo < this.totalPage){
			this.getThemes((this.pageNo+1), false);
		}
	};
	
	
	Model.prototype.messageDialog1OK = function(event){
//		alert("ok");
		this.exam_finish();
	};
	
	//提交单题 弃用
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
	        	 var msg = "获取数据失败";
	        	 if ( justep.Browser.isX5App ){
					window.plugins.toast.show(msg, "long", "center");
				}else{
					 justep.Util.hint(msg);
				}
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
	        	 var msg = "获取数据失败";
	        	 if ( justep.Browser.isX5App ){
					window.plugins.toast.show(msg, "long", "center");
				}else{
					 justep.Util.hint(msg);
				}
	         }
	    });
	};
	
	Model.prototype.button_submitClick = function(event){
//		alert("click");
		this.comp("messageDialog1").show();
	};
	
	//显示哪种题型
	Model.prototype.showSingleGroup = function(){
//	debugger;
		var themes = this.comp("themes");
		if (themes.count() > 0){
			themes.first();
			var t = themes.val("type");
//			alert(t);
			if (t == 0){
				return true;
			}else{
				return false;
			}
		}
	}
	
	Model.prototype.showMultiGroup = function(){
//	debugger;
		var themes = this.comp("themes");
		if (themes.count() > 0){
			themes.first();
			var t = themes.val("type");
//			alert(t);
			if (t == 1){
				return true;
			}else{
				return false;
			}
		}
	}
	
	Model.prototype.showTXTGroup = function(){
//	debugger;
		var themes = this.comp("themes");
		if (themes.count() > 0){
			themes.first();
			var t = themes.val("type");
//			alert(t);
			if (t == 2){
				return true;
			}else{
				return false;
			}
		}
	}
	
	//单选题-------------
	Model.prototype.radio1Change = function(event){
//	debugger;
		var row = event.bindingContext.$object;//获得当前行
//		alert(row.val("optionId") + row.val("content"));

		var selectedOptionId = row.val("optionId");//获得当前行选项的id
//		var optionIds2 = [];
//		var checked2 = [];	//选择数组
		var options = this.comp("options");
		var text = "";//有文本框的
//		options.first();
//		
//		options.each(function(param){
////		debugger;
//			var curId = param.row.val('optionId');//当前遍历的选项id
//			optionIds2.push(curId);
//			if (selectedOptionId ==  curId){
//				checked2.push(1);
//				options.setValue("checked", true);//回写数据库
//			}else{
//				checked2.push(0);
//				options.setValue("checked", false);//回写数据库
//			}
//			
//		});
		
		options.first();
		for (var i=0; i< options.count(); i++){
//		debugger;
			var cur_oid = options.val("optionId");
	    	if (cur_oid == selectedOptionId){
				options.setValue("checked", true);//回写数据库
				text = options.val("text");
			}else{
				options.setValue("checked", false);//回写数据库
			}
			options.next();
		}

		if (text == undefined){
			text = "";
		}
		this.exam_save_options(this.themeId, selectedOptionId);
	};
	
	Model.prototype.getTextAndSubmit = function(event){
		var row = event.bindingContext.$object;//获得当前行
		var selectedOptionId = row.val("optionId");
		var type = row.val("type");
//		var optionIds2 = [];
//		var text2 = [];
		var text = event.source.get("value");
		if (text == undefined){
			text = "";
		}
		var options = this.comp("options");
//		options.first();
		
//		options.each(function(param){
//			var curId = param.row.val('optionId');//当前遍历的选项id
//			optionIds2.push(curId);
//			if (selectedOptionId ==  curId){
//				if (type == 1){
//					var input1 = event.source.get("value");
//					text2.push(input1);
//				}
//			}else{
//				text2.push("");
//			}
//		});
//		debugger;
		options.first();
		for(var i=0; i<options.count(); i++){
	    	if (options.val("optionId") == selectedOptionId){
				if (type == 1){
//				debugger;
					options.setValue("checked", true);//回写数据库
					options.setValue("text", text);//回写数据库
					text = options.val("text");//再读一次
				}
			}else{
				options.setValue("checked", false);//回写数据库
				options.setValue("text", "");//回写数据库
			}
	    };
//		alert(text);
		if (text == undefined){
			text = "";
		}
		
		this.exam_save_text(this.themeId, selectedOptionId, text);
	}
		
	Model.prototype.input1Change = function(event){
		this.getTextAndSubmit(event);
	};
	
	//input失去焦点
	Model.prototype.input1Blur = function(event){
		var row = event.bindingContext.$object;//获得当前行
	};
	
	//获取单选当前行的input1控件
	Model.prototype.li_option_singleClick = function(event){
//	debugger;
		var input1 = $(event.currentTarget).find("[xid='input1']");
		var radio1 = $(event.currentTarget).find("[xid='radio1']");
//		input1.attr("disabled","disabled");//禁用
//		input1.attr("disabled",false);//启用
//		radio1.checked = "checked";
	};
	
	Model.prototype.showSingleTXT = function (type, checked){
//	debugger;
		if (type == 1 && checked == true){
			return true;
		}else{
			return false;
		}
	}
	//----------------------------------------------
	
		
	//多选------------------------------------------
	Model.prototype.checkbox2Change = function(event){
		//	debugger;
		var row = event.bindingContext.$object;//获得当前行
		var checked = event.checked;
//		alert(row.val("optionId") + row.val("content"));

		var selectedOptionId = row.val("optionId");//获得当前行选项的id
		var selectedOptionIds="";//选择的id集合
//		var optionIds2 = [];
//		var checked2 = [];	//选择数组
		var options = this.comp("options");
		var text = "";//有文本框的
//		options.first();
//		
//		options.each(function(param){
////		debugger;
//			var curId = param.row.val('optionId');//当前遍历的选项id
//			optionIds2.push(curId);
//			if (selectedOptionId ==  curId){
//				checked2.push(1);
//				options.setValue("checked", true);//回写数据库
//			}else{
//				checked2.push(0);
//				options.setValue("checked", false);//回写数据库
//			}
//			
//		});
		
		options.first();
		selectedOptionIds = "";
		for (var i=0; i< options.count(); i++){
//		debugger;
			var cur_oid = options.val("optionId");
	    	if (cur_oid == selectedOptionId){
	    		if (checked){
	    			options.setValue("checked", true);//回写数据库
	    			text = options.val("text");
	    			
	    		}else{
	    			options.setValue("checked", false);//回写数据库
	    		}
				
			}else{
//				options.setValue("checked", false);//回写数据库 多选不是自己的时候不管数据库
			}
			
			if (options.val("checked")){
				selectedOptionIds += cur_oid;	
	    		selectedOptionIds += ",";
			}
			options.next();
		}

		if (text == undefined){
			text = "";
		}
		this.exam_save_options(this.themeId, selectedOptionIds);
	};
	
	//共用单选的input1Change，这个不用
	Model.prototype.input2Change = function(event){
		this.getTextAndSubmit(event);
	};

	Model.prototype.showMultiTXT = function (type, checked){
//	debugger;
		if (type == 2 && checked == true){
			return true;
		}else{
			return false;
		}
	}
	
	//----------------------------------
	
	//文本题-----------------------------
	//共用单选的input1Change，这个不用
	Model.prototype.textarea3Change = function(event){
		this.getTextAndSubmit(event);
	};
	//----------------------------------
	
	//单选多选提交是一样的
	Model.prototype.exam_save_options = function(themeId, optionIds){
//	alert(themeId + "|" + optionIds);
//	debugger;
		var me = this;
//		http://whce.gov.cn/exam/inner_member/option.jspx?themeId=1201&optionIds=1682,1683&userId=4991
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/exam/inner_member/option.jspx",
//	        url: "http://192.168.1.22:8080/app/exam-save.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId,
	        	"themeId" : themeId,
	        	"optionIds" : optionIds,
	        },
	        success: function(resultData) {
//	        	alert(JSON.stringify(resultData));
	        	var result = resultData.result;
	        	if (result == "true"){
	        	
	        	}else{
	        	
	        	}
	        },
	         error:function (){  
	        	 var msg = "获取数据失败";
	        	 if ( justep.Browser.isX5App ){
					window.plugins.toast.show(msg, "long", "center");
				}else{
					 justep.Util.hint(msg);
				}
	         }
	    });
	}

	//带文本框的选项和文本试题是一样的
	Model.prototype.exam_save_text = function(themeId, optionId, text){
	alert(themeId + "|" + optionId + "|" + text);
//	debugger;
		var me = this;
//		http://whce.gov.cn/exam/inner_member/option.jspx?themeId=1201&optionIds=1682,1683&userId=4991
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/exam/inner_member/option_text.jspx",
//	        url: "http://192.168.1.22:8080/app/exam-save.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId,
	        	"themeId" : themeId,
	        	"optionId" : optionId,
	        	"text" : text
	        },
	        success: function(resultData) {
//	        	alert(JSON.stringify(resultData));
	        	var result = resultData.result;
	        	if (result == "true"){
	        	
	        	}else{
	        	
	        	}
	        },
	         error:function (){  
	        	 var msg = "获取数据失败";
	        	 if ( justep.Browser.isX5App ){
					window.plugins.toast.show(msg, "long", "center");
				}else{
					 justep.Util.hint(msg);
				}
	         }
	    });
	}




	return Model;
});