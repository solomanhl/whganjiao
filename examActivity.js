define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");
	require("cordova!cordova-plugin-x-toast");

	var global = require("./globalvar");
	
	var Model = function(){
		this.callParent();
		
		this.server = global.server;
		
		this.isloading = justep.Bind.observable(false);//是否显示正在加载的动画框
		this.userId;
		this.pageNo_exam = 0;
		this.totalPage_exam = 0;
	};

	
	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
		this.userId = event.params.userId;
		
		if (justep.Browser.isX5App) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
		
		 this.isloading.set(true);
		this.getExam(false);
//		debugger;
	};
	
		
	Model.prototype.modelActive = function(event){
//		考试页doexame返回到本页面会触发
//		debugger; 
		this.isloading.set(true);
		this.getExam(false);
	};

	Model.prototype.getExam = function(isApend){
		var me = this;
		var exam = this.comp("exam");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/exam-user-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"pageNo" : me.pageNo_exam,
	        	"userId" : me.userId
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var examuserssObj = resultData.examusers;
	        	var pageNoObj = resultData.pageNo;
	        	var totalPageObj = resultData.totalPage;
	        	
	        	me.pageNo_exam = pageNoObj;
	        	me.totalPage_exam = totalPageObj;
//	        	alert(me.totalPage_study);
//	        	alert(experiencesObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	json={"@type" : "table","exam" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :examuserssObj };
	        	
        		exam.loadData(json, isApend);
	        	 me.isloading.set(false);
	        	
//	        	alert("评论数据" + comment.count());
	        	
	        },
	         error:function (){  
	        	 me.isloading.set(false);
	        	 var msg = "获取数据失败";
	        	 if ( justep.Browser.isX5App ){
					window.plugins.toast.show(msg, "short", "bottom");
				}else{
					 justep.Util.hint(msg);
				}
	         }
	    });
	}

	//显示考试状态
	Model.prototype.setStatus = function (status){
		var rtn;
		switch (status){
			case 0 : rtn = "已加入";
				break;
			case 1 : rtn = "进行中";
				break;
			case 2 : rtn = "已结束";
				break;
			default: rtn = "";
		}
		return rtn;
	}
	
	Model.prototype.bindStatusCSS = function( status ){
		switch (status){
			case 0: return "status0" ;
				break;
			case 1: return "status1" ;
				break;
			case 2: return "status2" ;
				break;
			default : return "status2"; 
		}

	}
	
	Model.prototype.shouldShowScore = function (status){
		if (status == 1 || status == 2){
			return true;
		}else{
			return false;
		}
	}
	
	Model.prototype.scrollView1PullDown = function(event){
		this.pageNo_exam = 0;
		this.totalPage_exam = 0;
		this.getExam(false);
	};

	
	Model.prototype.scrollView1PullUp = function(event){
		if (this.pageNo_exam < this.totalPage_exam){
			this.pageNo_exam++;
			this.getExam(true);
		}
	};

	
	Model.prototype.li1Click = function(event){
		var current = event.bindingContext.$object;//获得当前行
//debugger;
		var examId = current.val("id");
//		examId = 3;
//		alert(examId);
		var me = this;
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/exam-user-checked.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userId,
	        	"examId" : examId
	        },
	        success: function(resultData) {
	        	var statusObj;	
	        	statusObj = resultData.status;
//	        	alert(statusObj);
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);

	        	//调试都可以进
	        	
//	        	me.startExam(examId);
	        	//----------
	        	
	        	var msg = "";
	        	if (statusObj == 1){
	        		//可以考试 考试中
	        		me.startExam(examId);
	        	}else if (statusObj == 2){
	        		//已完成 还是可以考试
	        		me.startExam(examId);
	        	}else if (statusObj == 3){
	        		//已完成 还有重试次数，还是可以考试,先提示，确认进入考试
	        		me.comp("messageDialog1").show({
	        			message : "您上次考试分数为"  + resultData.socre + "分，合格分数是" + resultData.passscore + "分，是否清空分数再考一次？",
	        			inputValue : examId
	        		});
	        		//me.startExam(examId);
	        	}else if (statusObj == -1){
	        		msg = "测试次数已超过最大限制!";
	        	}else if (statusObj == -2){
	        		msg = "培训班未完成!";
	        	}else if (statusObj == -3){
	        		msg = "未加入培训班!";
	        	}else if (statusObj == -4){
	        		msg = "考试完成，未通过!";
	        	}else{
	        		msg = "系统异常！";
	        	}
	        	
	        	if (msg != ""){
	        		if ( justep.Browser.isX5App ){
						window.plugins.toast.show(msg, "short", "bottom");
					}else{
						 justep.Util.hint(msg);
					}
	        	}

				
//	        	alert(resultData.author);
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
	
	//选“确定”，清空分数，重新考试。
	Model.prototype.messageDialog1OK = function(event){
	var examId = event.source.inputValue;
//	debugger;
		this.startExam(examId);
	};

	Model.prototype.startExam = function(examId){
		var me = this;
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/exam/start.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : this.userId,
	        	"examId" : examId,
	        },
	        success: function(resultData) {
	        	if (resultData.status == 0){
	        		var url = require.toUrl("./doExamActivity.w");
					var params = {
				        from : "examActivity",
				        examId : examId,
				        userId : me.userId,
				        rtimes : resultData.rtimes,//考试剩余时间
				        data : {
				            // 将data中的一行数据传给对话框
			//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
				        }
				    }
					justep.Shell.showPage(url, params);
	        	}else if(resultData.status == -100){//不能考试
	        	
	        	}else{
	        	
	        	}
	        },
	        error: function(e){
	        
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
	
	Model.prototype.getServerImg = function(path){
		var rtn = "";
		if (path != "" && path !=null){
			rtn = this.server + path;
		}
		return rtn;
	};
	
	//考试是否通过
	Model.prototype.isPass = function (pass){
		if (pass){
			return "通过";
		}else {
			return "未通过";
		}
	}

	
	return Model;
});