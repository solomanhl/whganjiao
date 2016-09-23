define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");

	var Model = function(){
		this.callParent();
		this.userId;
	};

	Model.prototype.modelParamsReceive = function(event){
		
		var context = this.getContext();
		var me = this;
	    this.userId = event.params.userId;
//	    alert(this.userId);
		
		if (justep.Browser.isX5App) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
		
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
		
		$.ajax({
	        type: "get",
	        "async" : false,//异步
	        url: "http://whce.whgky.cn/app/user-archives.jspx",
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
	        	
        		dangan.loadData(json, isApend);
	        	dangan.first();
//	        	alert("数据" + dangan.count());
	        	var ranking = dangan.getValue("ranking");
	        	if (ranking == 0) ranking = "-";
	        	
	        	var titleValue = "截至<b>" + dangan.getValue("date") + "</b>为止，您总共选修<b>" +  dangan.getValue("courseAll") + "</b>门课程，已学完<b>" 
					+  dangan.getValue("coursefinish") + "</b>门<b>，" +  ( dangan.getValue("courseAll") - dangan.getValue("coursefinish")) 
					+ "</b>门未完成，累计参加<b>" +  dangan.getValue("examAll") + "</b>次测试，修满<b>" +  dangan.getValue("examAll") 
					+ "</b>学时，您的学时在全市排名<b>" +  ranking + "</b>，祝您学有所成！";
					
				outTitle.set({value : titleValue});
				$("b").css("color","#dd0000");
				$("b").css("font-weight","normal");
				
	        	dataTables1.reload();
	        	dataTables2.reload();
	        	dataTables3.reload();
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	    
	    

	}
	


	return Model;
});