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
	
	//选项是否选中
	Model.prototype.isChecked = function (checked){
//	debugger;
		if (checked){
			return true;
		}else{
			return false;
		}
	};
	
	//bind-single-image
	Model.prototype.bindSingleImage = function( ischecked){
//	debugger;
		if (ischecked){
			return require.toUrl("./img/radio_bg2.png");
		}else{
			return require.toUrl("./img/radio_bg1.png");
		}
	}
	
	//bind-single-image
	Model.prototype.bindMultiImage = function( ischecked){
//	debugger;
		if (ischecked){
			return require.toUrl("./img/checkbox_bg2.png");
		}else{
			return require.toUrl("./img/checkbox_bg1.png");
		}
	}

	//获取试题，单题
	Model.prototype.getThemes = function(page, isApend){
		var me = this;
		var data = this.comp("themes");
		var options = this.comp("options");
		var button_pre = this.comp("button_pre");
	    var button_next = this.comp("button_next");
	    
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
	        	if (JSON.stringify(themesObj) == "[]"){
	        		alert("没有试题");
	        	}else{
	        		me.comp("output_id").set({"value" : "第" + me.pageNo + "题"});//显示题号
//	        	debugger;
	        		//是否显示上一题 下一题
	        		button_pre.set({"disabled": false});
	        		button_next.set({"disabled": false});
	        		if (resultData.pageNo <= 1){
	        			button_pre.set({"disabled": true});
	        		}
	        		if (resultData.pageNo >= resultData.totalPage){
	        			button_next.set({"disabled": true});
	        		}
	        		
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
					
		        	//这里获取当前题目的答案，更新options表
		        	me.getAnswer(me.userId, me.examId, me.themeId);
	        	}
	        	
	        	
//	        	alert(data.count());
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
	
	//获取当前题答案
	Model.prototype.getAnswer = function(userId, examId, themeId){
		var me = this;
		var data = this.comp("options");
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/exam/getAnswer.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : userId,
	        	"examId" : examId,
	        	"themeId" : themeId
	        },
	        success: function(resultData) {
//	        	alert(JSON.stringify(resultData));
	        	var userOptions = resultData.userOptions;
//	        	alert(JSON.stringify(userOptions))
	        	var userOptions2;
	        	
	        	$.each(userOptions, function(i) {
//				    alert(JSON.stringify(userOptions[i]));
//				    alert(i);
	        		userOptions2 = userOptions[i];
	        		$.each(userOptions2, function(key) {
//	        			alert(key);
//	        			alert(userOptions2[key]);
	        			if (key == "optionId"){
//	        			debugger;
	        				var optionId = userOptions2[key];
//	        				alert(optionId)
	        				//更新options表
//	        				var rows = data.find(['optionId'],[optionId],true,true,true);
//	        				if(rows.length>=0){
//	        					data.setValue('checked', true);
//	        				}
	        				var lRow = data.getLastRow(), row;
	        				data.first();
	        				do{
	        					row = data.getCurrentRow();
	        					if (optionId == data.val('optionId')){
	        						data.setValue('checked', true);
	        					}
	        					data.next();
							}while (lRow != row);
	        			}
	        			
	        		});
				});
	        	data.refreshData();
	        },
	        error: function(e){
	        
	        }
        });
	}
	
	
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
					window.plugins.toast.show(msg, "short", "bottom");
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
	        url: global.server + "/app/exam/finish.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId,
	        	"examId" : me.examId
	        },
	        success: function(resultData) {
//	        	alert(JSON.stringify(resultData));
	        	var status = resultData.status;
	        	var score = resultData.score;
	        	var pass = resultData.pass;
	        	var pass1;
	        	if (pass){
	        		pass1 = "通过";
	        	}else {
	        		pass1 = "未通过";
	        	}
//	        	debugger;
	        	if (status == 1){
	        		var msg = "考试结束，本次考试得分：" + score + "，" + pass1 + "考试";
	        		if (justep.Browser.isX5App){
	        			window.plugins.toast.show(msg , "long", "center");
	        		}else{
						 justep.Util.hint(msg);
					}
	        		justep.Shell.closePage();
	        	}else if (status == -100){	//题目没做完
	        		var doneNo = resultData.count;
	        		if (doneNo == undefined){
	        			doneNo == 0;
	        		}
	        		var diff = me.totalPage - doneNo;
	        		var msg = "您还有" + diff + "题没做完，请做完所有题目后再再交卷。";
	        		if (justep.Browser.isX5App){
	        			window.plugins.toast.show(msg, "long", "center");
	        		}else{
						 justep.Util.hint(msg);
					}
	        	}else{
	        		var msg = "交卷失败，请重新提交";
	        		if (justep.Browser.isX5App){
	        			window.plugins.toast.show(msg, "long", "center");
	        		}else{
						 justep.Util.hint(msg);
					}
	        	}
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
	
	//开始考试
	Model.prototype.startExam = function (examId, userId){
		var me = this;
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/exam/start.jspx",
//	        url: "http://192.168.1.22:8080/app/exam-save.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : userId,
	        	"examId" : examId,
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
					window.plugins.toast.show(msg, "short", "bottom");
				}else{
					 justep.Util.hint(msg);
				}
	         }
	    });
	}
	
	//单选题-------------
	//获取单选选中
	Model.prototype.li_option_singleClick = function(event){
//	debugger;
//		var input1 = $(event.currentTarget).find("[xid='input1']");
//		input1.attr("disabled","disabled");//禁用
//		input1.attr("disabled",false);//启用
//		radio1.checked = "checked";
		var row = event.bindingContext.$object;//获得当前行
		var selectedOptionId = row.val("optionId");
		var options = this.comp("options");
		var text = "";//有文本框的
		
		options.first();
		for (var i=0; i< options.count(); i++){
//		debugger;
	    	if (selectedOptionId == options.val("optionId")){//当前选中行的id == 数据库循环的id
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
		this.exam_save_options(this.themeId, selectedOptionId + ",");
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
	//点击单行
	Model.prototype.li_option_multiClick = function(event){
		var row = event.bindingContext.$object;//获得当前行
		var selectedOptionId = row.val("optionId");
		var selectedOptionIds="";//选择的id集合
		var options = this.comp("options");
		var text = "";//有文本框的
		
		options.first();
		selectedOptionIds = "";
		for (var i=0; i< options.count(); i++){
//		debugger;
	    	if (selectedOptionId == options.val("optionId")){//当前选中行的id == 数据库循环的id
	    		var lastChecked = options.val("checked");
	    		if (lastChecked){
	    			options.setValue("checked", false);//回写数据库
	    		}else{
	    			options.setValue("checked", true);//回写数据库
	    			text = options.val("text");
	    		}
			}
			if (options.val("checked")){
				selectedOptionIds += options.val("optionId");	
	    		selectedOptionIds += ",";
			}
			options.next();
		}

		if (text == undefined){
			text = "";
		}
		this.exam_save_options(this.themeId, selectedOptionIds);
	};
	
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
			var cur_oid = options.val("optionId");//当前行的optionID
	    	if (cur_oid == selectedOptionId){
	    		if (checked){
	    			options.setValue("checked", true);//回写数据库
	    			text = options.val("text");
	    			
	    		}else{
//	    			alert("false")
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
//		alert(selectedOptionIds)
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
	        url: global.server + "/app/exam/option.jspx",
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
					window.plugins.toast.show(msg, "short", "bottom");
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
					window.plugins.toast.show(msg, "short", "bottom");
				}else{
					 justep.Util.hint(msg);
				}
	         }
	    });
	}

	return Model;
});
//
//$(function(){
//	$(".doExam .x-panel-content li span input").attr('checked', false);
//})