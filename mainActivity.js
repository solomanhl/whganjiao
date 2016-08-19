define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var allData = require("./js/loadData");

	var Model = function(){
		this.callParent();
		
		//首页新闻
		this.pageNo = 0;
		this.totalPage = 0;
		
		//学习课程
		this.pageNo_study = 0;
		this.totalPage_study = 0;
	};
	
	//路径转换
	Model.prototype.toUrl = function(url){
		return url ? require.toUrl(url) : "";	
	};
	
	Model.prototype.imgDataCustomRefresh = function(event) {
		/*
		 * 1、加载轮换图片数据
		 * 2、根据data数据动态添加carouse组件中的content页面 
		 * 3、如果img已经创建了，只修改属性
		 * 4、第一张图片信息存入localStorage
		 */
		var url = require.toUrl("./main/json/imgData.json");
		allData.loadDataFromFile(url, event.source, true);
		var me = this;
		var carousel = this.comp("carousel1");
		event.source.each(function(obj) {
			var fImgUrl = require.toUrl(obj.row.val("fImgUrl"));
			var fUrl = require.toUrl(obj.row.val("fUrl"));
			if (me.comp('contentsImg').getLength() > obj.index) {
				$(carousel.domNode).find("img").eq(obj.index).attr({
					"src" : fImgUrl,
					"pagename" : fUrl
				});
				if (obj.index == 0) {
					localStorage.setItem("index_BannerImg_src", fImgUrl);
					localStorage.setItem("index_BannerImg_url", fUrl);
				}
			} else {
				carousel.add('<img src="' + fImgUrl + '" class="tb-img1" bind-click="openPageClick" pagename="' + fUrl + '"/>');
			}
		});
	};


	/*
	 * 写首页图片数据缓存的代码 1、数据模型创建时事件
	 * 2、判断有没有localStorage，如果有显示localStorage中的内容，否则显示静态内容。
	 * 3、从服务端获取最新数据和图片，获取之后，更新界面并写入localStorage
	 */
	Model.prototype.modelModelConstruct = function(event){
		/*
		 * 1、数据模型创建时事件 2、加载静态图片或从缓存中加载图片
		 */
		var carousel = this.comp("carousel1");

		var fImgUrl = localStorage.getItem("index_BannerImg_src");
		if (fImgUrl == undefined) {
			$(carousel.domNode).find("img").eq(0).attr({
				"src" : "./main/img/carouselBox61.jpg",
				"pagename" : "./detail.w"
			});
		} else {
			var fUrl = localStorage.getItem("index_BannerImg_url");
			$(carousel.domNode).find("img").eq(0).attr({
				"src" : fImgUrl,
				"pagename" : fUrl
			});
		}
		
		
	
		//2、获取新闻列表
		
		this.pageNo = 1;
		this.getNews(false);
		
		//3.获取课程
		this.pageNo_study = 1;
		this.getCourse(false);
		
		//4.获取课程分类
		this.getCourseGroup();
	};


	// 下划刷新
	Model.prototype.scrollView1PullDown = function(event){
		/*
		 * 1、滚动视图下拉事件 2、刷新data
		 */
		this.comp("imgData").refreshData();
		//		
//		2、获取新闻列表
//		
		this.pageNo = 1;
		this.getNews(false);
	};
	
	//上拉加载下一页
	Model.prototype.scrollView1PullUp = function(event){
//		alert(this.totalPage + "scrollView1PullUp" + this.pageNo);
		if (this.totalPage > this.pageNo){
			this.pageNo ++;
			this.getNews(true);
		}
	};


	// 打开页面
	Model.prototype.openPageClick = function(event) {
		/*
		 * 1、点击组件增加算定义属性：pagename 2、获取自定义属性，打开 对应页面
		 */
		var pageName = event.currentTarget.getAttribute('pagename');
		if (pageName)
			justep.Shell.showPage(require.toUrl(pageName));
	};
	

	Model.prototype.content_homeActive = function(event){
		this.comp("titleBar").set({"title" : "干部教育"});
	};
	
	
	//学习激活
	Model.prototype.content_studyActive = function(event){
		this.comp("titleBar").set({"title" : "学习广场"});
	};
	
	//下拉刷新课程
	Model.prototype.scrollView_studyPullDown = function(event){
		this.pageNo_study = 1;
		this.getCourse(false);
	};
	
	//上拉加载更多课程
	Model.prototype.scrollView_studyPullUp = function(event){
		if (this.totalPage_study > this.pageNo_study){
			this.pageNo_study ++;
			this.getCourse(true);
		}
	};
	
	//获取课程列表
	Model.prototype.getCourse = function (isApend){
		var me = this;
		var study_course = this.comp("study_course");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/course-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"pageNo" : me.pageNo_study,
	        	"typeId" : "1"
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
		        	
	//	        	alert(news.count());
	        	}
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	}


	//获取课程分类
	Model.prototype.getCourseGroup = function (isApend){
		var me = this;
		var course_group = this.comp("course_group");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/course-type-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"pageNo" : "1"
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	var typesObj, pageNoObj;	
	        	pageNoObj = resultData.pageNo;
	        	typesObj = resultData.types;
	        	
//	        	alert(me.totalPage_study);
//	        	alert(contentsObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	if (pageNoObj > 0){
		        	json={"@type" : "table","course_group" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :typesObj };
		        	course_group.loadData(json, false);
		        	
	//	        	alert(news.count());
	        	}
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	}


	//弹出课程分类
	Model.prototype.button_studyMoreClick = function(event){
		var popOver_moreCourse = this.comp("popOver_moreCourse");
		popOver_moreCourse.show();
	};
	
	
	Model.prototype.content_commActive = function(event){
		this.comp("titleBar").set({"title" : "交流广场"});
	};
	

	Model.prototype.content_meActive = function(event){
		this.comp("titleBar").set({"title" : "个人空间"});
	};
	
	
	/*请求新闻列表
	*
	*
	*@param isApend 是否追加数据 boolean
	*
	*
	*/
	Model.prototype.getNews = function (isApend){
		var me = this;
		var news = this.comp("news");
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: "http://whce.whgky.cn/app/content-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"channelId" : "1",
	        	"typeId" : "1",
	        	"pageNo" : me.pageNo
	        },
	        success: function(resultData) {
	        	
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var contentsObj, pageNoObj, totalPageObj;	
	        	contentsObj = resultData.contents;
	        	pageNoObj = resultData.pageNo;
	        	totalPageObj = resultData.totalPage;
	        	
	        	me.pageNo = pageNoObj;
	        	me.totalPage = totalPageObj;
//	        	alert(me.totalPage);
//	        	alert(contentsObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	if (pageNoObj > 0){
//		        	var str = JSON.stringify(contentsObj);
	//	        	var temp = "[{\"id\":4,\"title\":\"中共武汉市委组织部关于印发 2016年全市 干部教育培训工作要点 的通知\",\"description\":\"中共武汉市委组织部关于印发《2016年全市 干部教育培训工作要点》的通知\",\"date\":\"2016-08-16 08:56:54.0\"},{\"id\":4,\"title\":\"中共武汉市委组织部关于印发 2016年全市 干部教育培训工作要点 的通知\",\"description\":\"中共武汉市委组织部关于印发《2016年全市 干部教育培训工作要点》的通知\",\"date\":\"2016-08-16 08:56:54.0\"}]";
//		        	var strs= JSON.parse(str);
	//	        	alert(strs);			        	
		        	json={"@type" : "table","news" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :contentsObj };
		        	news.loadData(json, isApend);
	//	        	alert(news.count());
	        	}
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	    
	    this.comp("list1").refresh();
	}
	


	//点击首页新闻
	Model.prototype.li1Click = function(event){
		var current = event.bindingContext.$object;//获得当前行
		var url = require.toUrl("./newsContentActivity.w");
		var params = {
	        from : "mainActivity",
	        contentId : current.val("id"),
	        data : {
	            // 将data中的一行数据传给对话框
//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
	        }
	    }
		justep.Shell.showPage(url, params);
	};
	


	//点击课程列表
	Model.prototype.li_studyClick = function(event){
		var current = event.bindingContext.$object;//获得当前行
		var url = require.toUrl("./course_showActivity.w");
		var params = {
	        from : "mainActivity",
	        courseId : current.val("id"),
	        userId : "53",
	        data : {
	            // 将data中的一行数据传给对话框
//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
	        }
	    }
		justep.Shell.showPage(url, params);
	};
	



	return Model;
});

$(function(){
	$(".content_home .home_nav a").click(function(){
		$(".content_home .home_nav a .this").removeClass("this")
		$(this).find("span").addClass("this");
	})

	// 首页头部导航切换

	$(".x-panel-bottom a").click(function(){
		$(".x-panel-bottom a .this").removeClass("this")
		$(this).find("span").addClass("this");
	})

	// 底部导航切换

	$(".x-panel-bottom a").click(function(){
		$(".x-panel-bottom a .this").removeClass("this")
		$(this).find("span").addClass("this");
	})

	// 底部导航切换

	// var n=0;

	// $(".content_study .studyMore .btn_more").click(function(){
	// 	if (n%2==0){
	// 		$(".content_study .studyMore .moreCourse").show();
	// 		$("#blackbg").show();
	// 	}else{
	// 		$(".content_study .studyMore .moreCourse").hide();
	// 		$("#blackbg").hide();
	// 	}
	// 	n++;
	// })

	$(".content_study .studyMore .btn_more").click(function(){
		$(".content_study .studyMore .moreCourse").show();
		$("#blackbg").show();
	})

	$("#blackbg").click(function(){
		$("#blackbg").hide();
		$(".content_study .studyMore .moreCourse").hide();
	})

	// 更多课程弹窗


})