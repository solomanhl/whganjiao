//课程
//	选择课件 courseJoined
//	学习课件 courseLearning
//	完成课件 courseFinished
//	获得总学时 times
//考试
//	参加 examJoined
//	考试 examLearning
//	完成 examFinished
//	通过 0
//培训班
//	参加 trainingclassJoined
//	学习 trainingclassLearning
//	完成 trainingclassFinished

//课程
//	选择课件 courseJoined
//	学习课件 courseLearning
//	完成课件 courseFinished
//	课程获得学时 times
//考试
//	参加 examJoined
//	考试 examLearning
//	完成 examFinished
//	通过 0
//	考试获得学时 examcredithour
//	
//培训班
//	参加 trainingclassJoined
//	学习 trainingclassLearning
//	完成 trainingclassFinished
	
	
define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");
	
	var global = require("./globalvar");

	var Model = function(){
		this.callParent();
		this.isloading = justep.Bind.observable(false);//是否显示正在加载的动画框
		this.userId;
	};

	Model.prototype.modelParamsReceive = function(event){
		
		var context = this.getContext();
		var me = this;
	    this.userId = event.params.userId;
//	    alert(this.userId);
		
		if (justep.Browser.isX5App) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
		
		//加载本地缓存
		var danganCache = localStorage.getItem("danganCache");
		if (danganCache != undefined){
			this.comp("dangan").loadData(danganCache, false);
		}
		this.isloading.set(true);
		this.getData(false);
	};
	
	
	Model.prototype.modelLoad = function(event){
		
	};
	
	
	//获取个人培训记录
	Model.prototype.getData = function(isApend){
		var me = this;
		var dangan = this.comp("dangan");
		var outTitle = this.comp("output_title");
		var dataTables1 = this.comp("dataTables1");
		var dataTables2 = this.comp("dataTables2");
		var dataTables3 = this.comp("dataTables3");
//		alert(this.userId);
		$.ajax({
	        type: "get",
	        "async" : false,//异步
	        url: global.server + "/app/user-archives.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
//	        	"pageNo" : me.pageNo_exam
//	        	"trainingclassId" : 1
	        	"userId" : me.userId
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var archivesObj = resultData.archives;
	        	
//	        	alert(JSON.stringify(archivesObj));
//	        	alert(experiencesObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	json={"@type" : "table","dangan" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :archivesObj };
	        	
	        	localStorage.setItem('danganCache',json);
        		dangan.loadData(json, isApend);
	        	dangan.first();
//	        	alert("数据" + dangan.count());
	        	var ranking = dangan.getValue("ranking");
	        	if (ranking == undefined) ranking = "-";
	        	
	        	var titleValue = "截至<b>" + dangan.getValue("date") + "</b>为止，您总共选修<b>" +  dangan.getValue("coursejoined") + "</b>门课程，已学完<b>" 
					+  dangan.getValue("coursefinish") + "</b>门，<b>" +  ( dangan.getValue("coursejoined") - dangan.getValue("coursefinish")) 
					+ "</b>门未完成，累计参加<b>" +  dangan.getValue("examjoined") + "</b>次测试，修满<b>" +  dangan.getValue("examcredithour") 
					+ "</b>学时，您的学时在全市排名<b>" +  ranking + "</b>，祝您学有所成！";
					
				outTitle.set({value : titleValue});
				$("b").css("color","#dd0000");
				$("b").css("font-weight","normal");
				
	        	dataTables1.reload();
	        	dataTables2.reload();
	        	dataTables3.reload();
	        	
	        	me.isloading.set(false);
	        },
	         error:function (){  
	        	 me.isloading.set(false);
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