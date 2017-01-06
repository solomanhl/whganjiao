define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var global = require("./globalvar");

	var Model = function(){
		this.callParent();
		this.server = global.server;
		
		this.shouldShowSearch = justep.Bind.observable(true);
		
		this.from;
		this.userId = 0;
		
		this.name="";
		this.teacher="";
		this.pageNo_study = 0;
		this.totalPage_study = 0;
	};
	
	Model.prototype.modelParamsReceive = function(event){
		var context = this.getContext();
		this.from = event.params.from;
		this.userId = event.params.userId;
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
		justep.Shell.on("onRefreshCourseList", this.onRefreshCourseList, this);
	};	
	
	Model.prototype.modelUnLoad = function(event){
		//卸载事件
		justep.Shell.off("onRefreshCourseList", this.onRefreshCourseList);
	};	
	
	Model.prototype.onRefreshCourseList = function(event){
		this.userId = event.userId;
//	    this.from = event.from;
	    
	};

	//转换课程的图服务器图片路径
	Model.prototype.getServerImg = function(path){
		var rtn = "";
		if (path != "" && path !=null){
			rtn = this.server + path;
		}
		return rtn;
	};
	
	//获取课程列表
	Model.prototype.getCourse = function (isApend){
		var me = this;
		var study_course = this.comp("study_course");
//		alert(this.typeId_study);
		
		$.ajax({
	        type: "get",
	        "async" : false,
//	        url: "http://bbxionglei.xicp.net:23502" + "/app/course-list.jspx",
//	        url: "http://weifang.imwork.net:23575" + "/app/course-list.jspx",
	        url: me.server + "/app/course-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"pageNo" : me.pageNo_study,
//	        	"typeId" : me.typeId_study,
//	        	"shapeId" : 3	//3单视频
	        	"name" : me.name,
	        	"teacher" : me.teacher
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	var coursesObj, pageNoObj, totalPageObj;	
	        	coursesObj = resultData.courses;
	        	pageNoObj = resultData.pageNo;
	        	totalPageObj = resultData.totalPage;
	        	
	        	me.pageNo_study = pageNoObj;
	        	me.totalPage_study = totalPageObj;
//	        	alert(me.totalPage_study);
//	        	alert(contentsObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	if (pageNoObj > 0){
		        	json={"@type" : "table","study_course" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :coursesObj };
		        	study_course.loadData(json, isApend);
		        	me.shouldShowSearch.set(false);
	//	        	alert(news.count());
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
	
	Model.prototype.button1Click = function(event){
		var s = this.comp("input1").val();
		if (s != undefined && $.trim(s) != ""){
			this.name = s;
			this.teacher = s;
			this.getCourse(false);
		}	
		
	};	
	
	Model.prototype.li1Click = function(event){
		var me = this;
		var current = event.bindingContext.$object;//获得当前行
		var url = require.toUrl("./course_showActivity.w");
		var params = {
	        from : "searchActivity",
	        courseId : current.val("id"),
//	        userId : "53",
	        userId : me.userId,
	        data : {
	            // 将data中的一行数据传给对话框
//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
	        }
	    }
//	    justep.Shell.setIsSinglePage(false);
		justep.Shell.showPage(url, params);
	};	
	
	return Model;
});