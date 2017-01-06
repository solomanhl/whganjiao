define(function(require){
	var $ = require("jquery");
	
	require("cordova!cordova-plugin-screen-orientation");
	
	var global = require("./globalvar");
	
	var Model = function(){
		this.callParent();
		
		this.server = global.server;
		this.isloading = justep.Bind.observable(false);//是否显示正在加载的动画框
		
		this.pageNo_exam = 0;
		this.totalPage_exam = 0;
		
		this.userId;
		this.loaded = false;
	};
	
	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		var me = this;
		this.userId = event.params.userId;
		
		if (justep.Browser.isX5App) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
		
		if (this.userId != undefined && !this.loaded)
			this.isloading.set(true);
			this.getExam(false);
	};
	
	Model.prototype.getExam = function(isApend){
		var me = this;
		var peixun = this.comp("peixun");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/trainingclass-user-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"pageNo" : me.pageNo_exam,
	        	"userId" : me.userId,
//	        	"trainingclassId" : 1
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var trainingclassusersObj = resultData.trainingclassusers;
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
	        	
	        	json={"@type" : "table","peixun" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :trainingclassusersObj };
	        	
        		peixun.loadData(json, isApend);
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

	//显示培训班状态
	Model.prototype.setStatus = function (status){
		var rtn;
		switch (status){
			case 0 : rtn = "已加入";
				break;
			case 1 : rtn = "学习中";
				break;
			case 2 : rtn = "已完成";
				break;
			case 3 : rtn = "未通过";
				break;
			case 4 : rtn = "通过";
				break;
			default: rtn = "";
		}
		return rtn;
	}
	
	Model.prototype.bindStatusCSS = function( status ){
		switch (status){
			case 0: return "status1" ;//蓝色
				break;
			case 1: return "status1" ;//蓝色
				break;
			case 2: return "status2" ; 	//绿色
				break;
			case 3: return "status3" ;//灰色
				break;
			case 4: return "status3" ;//灰色
				break;
			default : return "status3"; 
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
		//全部可以进
		var url = require.toUrl("./myCoursesActivity.w");
		var params = {
	        from : "peixunActivity",
	        userId : this.userId,
	        trainingclassId : current.val("id"),
	        data : {
	            // 将data中的一行数据传给对话框
//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
	        }
	    }
		justep.Shell.showPage(url, params);
		
//		if(current.val("status") == 1){
//			//学习中
//			var url = require.toUrl("./myCoursesActivity.w");
//			var params = {
//		        from : "peixunActivity",
//		        userId : this.userId,
//		        trainingclassId : current.val("id"),
//		        data : {
//		            // 将data中的一行数据传给对话框
//	//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
//		        }
//		    }
//			justep.Shell.showPage(url, params);
//		}else{
//			var msg = "该培训班不在学习周期";
//        	 if ( justep.Browser.isX5App ){
//				window.plugins.toast.show(msg, "short", "bottom");
//			}else{
//				 justep.Util.hint(msg);
//			}
//		}
		
	};

	Model.prototype.modelLoad = function(event){
		//监听返回键
 		document.addEventListener('backbutton', function(){
 			justep.Shell.closePage();
 		}, false);
 		$(window).on('beforeunload', function(){
 			document.removeEventListener('backbutton', listener, false);
 	    });
		//添加事件
		justep.Shell.on("onRefreshList", this.onRefreshList, this);
	};

	Model.prototype.modelUnLoad = function(event){
		//卸载事件
		justep.Shell.off("onRefreshList", this.onRefreshList);
	};
	
	Model.prototype.onRefreshList = function(event){
		this.userId = event.userId;
	    this.from = event.from;
	    this.trainingclassId = event.trainingclassId;
	    
	    if (this.userId != undefined && !this.loaded)
			this.getExam(false);
	};

	Model.prototype.getServerImg = function(path){
		var rtn = "";
		if (path != "" && path !=null){
			rtn = this.server + path;
		}
		return rtn;
	};
	
	return Model;
});
