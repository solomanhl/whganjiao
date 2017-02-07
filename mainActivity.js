define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
//	var allData = require("./js/loadData");
	
	var global = require("./globalvar");
	require("cordova!cordova-plugin-screen-orientation");

	var Model = function(){
		this.callParent();
		
//		this.server = "http://whce.whgky.cn";
		this.server = global.server;
		this.isloading = justep.Bind.observable(false);
		
		//用户登录信息
		this.username = "";
		this.realname="";
		this.userid = 0;
		this.password="";
		this.status = 0;
		
		//首页新闻
		this.pageNo = 0;
		this.totalPage = 0;
		this.channelId = 1;//1通知公告 2工作动态 3干教咨询
		this.typeId = 1;
		
		//学习课程
		this.pageNo_study = 0;
		this.totalPage_study = 0;
		this.typeId_study = ""; //课程分类默认1
		this.popshow = 0;//课程分类下拉框是否显示
		this.shouldShowSearch = justep.Bind.observable(false);//是否显示搜索框
		this.showLogin = justep.Bind.observable(false);//显示登录
		this.showContent = justep.Bind.observable(false);//显示内容
		
		this.showCourse = justep.Bind.observable(true);//显示课程
		this.showClass = justep.Bind.observable(false);//显示培训班
		this.showExam = justep.Bind.observable(false);//显示考试
		
		//交流页
		this.pageNo_communicate = 0;
    	this.totalPage_communicate = 0;
	};
	
	//路径转换
	Model.prototype.toUrl = function(url){
		return url ? require.toUrl(url) : "";	
	};
	
	Model.prototype.newsCustomRefresh = function(event) {
		this.pageNo = 1;
		this.isloading.set(true);
		this.getNews(false);
	}
	
	Model.prototype.imgDataCustomRefresh = function(event) {
		/*
		 * 1、加载轮换图片数据
		 * 2、根据data数据动态添加carouse组件中的content页面 
		 * 3、如果img已经创建了，只修改属性
		 * 4、第一张图片信息存入localStorage
		 */
		//从本地json取本地图片路径
//		var url = require.toUrl("./main/json/imgData.json");
//		allData.loadDataFromFile(url, event.source, true);

		//从服务器取远程图片路径
		this.getFocusNews();
		
		
//		var me = this;
//		var carousel = this.comp("carousel1");
//		event.source.each(function(obj) {
//			var fImgUrl = require.toUrl(obj.row.val("fImgUrl"));
//			var fUrl = require.toUrl(obj.row.val("fUrl"));
//			alert(fImgUrl);
//			if (me.comp('contentsImg').getLength() > obj.index) {
//				$(carousel.domNode).find("img").eq(obj.index).attr({
//					"src" : fImgUrl,
//					"pagename" : fUrl
//				});
//				if (obj.index == 0) {
//					localStorage.setItem("index_BannerImg_src", fImgUrl);
//					localStorage.setItem("index_BannerImg_url", fUrl);
//				}
//			} else {
//				carousel.add('<img src="' + fImgUrl + '" class="tb-img1" bind-click="openPageClick" pagename="' + fUrl + '"/>');
//			}
//		});
	};

	//获取首页图片焦点新闻
	Model.prototype.getFocusNews = function(){
		var me = this;
		var data = this.comp("imgData");
//		alert(this.typeId_study);
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/content-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"typeId" : 3,
	        	"channelId" : 2	
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	var contentsObj;	
	        	contentsObj = resultData.contents;
//	        	alert(me.totalPage_study);
//	        	alert(contentsObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	if (contentsObj.length > 0){
		        	var json={"@type" : "table","imgData" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :contentsObj };
		        	data.loadData(json, false);
		        	
					var carousel = me.comp("carousel1");
			//		event.source.each(function(obj) {
					$.each(contentsObj,function(i,item)  {
			//			var fImgUrl = require.toUrl(obj.row.val("fImgUrl"));
			//			var fUrl = require.toUrl(obj.row.val("fUrl"));
						var fImgUrl = me.server + item.typeImg;
						var forcusid = item.id;
						var title = item.title;
//						alert(me.comp('contentsImg').getLength() + "/" + i);
//						if (me.comp('contentsImg').getLength() > obj.index) {
						if (me.comp('contentsImg').getLength() > i) {
//							$(carousel.domNode).find("img").eq(obj.index).attr({
							$(carousel.domNode).find("img").eq(i).attr({
								"src" : fImgUrl,
//								"pagename" : fUrl,
								"forcusid" : forcusid
							});
							
//							if (obj.index == 0) {
							if (i == 0) {
								localStorage.setItem("index_BannerImg_src", fImgUrl);
//								localStorage.setItem("index_BannerImg_url", fUrl);
								localStorage.setItem("forcusid", forcusid);
								localStorage.setItem("title", title);
							}
						} else {
//							carousel.add('<img src="' + fImgUrl + '" class="tb-img1" bind-click="openPageClick" pagename="' + fUrl + '"/>');
							carousel.add('<img src="' + fImgUrl + '" class="tb-img1" bind-click="openPageClick" forcusid="' + forcusid + '"/>');
						}
					});
					
	//	        	alert(news.count());
	        	}
	        	
	        },
	         error:function (){  
	        	 alert("服务器数据错误");
	         }
	    });
	};

	/*
	 * 写首页图片数据缓存的代码 1、数据模型创建时事件
	 * 2、判断有没有localStorage，如果有显示localStorage中的内容，否则显示静态内容。
	 * 3、从服务端获取最新数据和图片，获取之后，更新界面并写入localStorage
	 */
	Model.prototype.modelModelConstruct = function(event){
		if (justep.Browser.isX5App) 
		cordova.plugins.screenorientation.setOrientation('portrait');//竖屏模式
//		alert("onConstruct");
		/*
		 * 1、数据模型创建时事件 2、加载静态图片或从缓存中加载图片
		 */
		var carousel = this.comp("carousel1");

		var fImgUrl = localStorage.getItem("index_BannerImg_src");
		if (fImgUrl == undefined) {
//			$(carousel.domNode).find("img").eq(0).attr({
//				"src" : "./main/img/carouselBox61.jpg",
//				"pagename" : "./detail.w"
//			});
		} else {
			var fUrl = localStorage.getItem("index_BannerImg_url");
			$(carousel.domNode).find("img").eq(0).attr({
				"src" : fImgUrl,
				"pagename" : fUrl
			});
		}
		
		//2、获取新闻列表
		//加载本地缓存
		var newsCache = localStorage.getItem("newsCache");
		if (newsCache != undefined){
			this.comp("news").loadData(newsCache, false);
			this.comp("news").refreshData();
		}
		//请求服务器
//		this.pageNo = 1;
//		this.isloading.set(true);
//		this.getNews(false);
		
		//6.获取用户状态
		this.getUserStatus();
		//刷新用户
		if (this.username == "" || this.username == null){
			$("#span_name").text("请登录");
//			$("#label_username").text("请登录");
//			$("#image_usericon").attr('src', require.toUrl("./img/user.png" )); 
		}else{
			$("#span_name").text(this.realname);
//			$("#label_username").text(this.realname);
//			$("#image_usericon").attr('src', require.toUrl("./img/user_pic.png" )); 
		}
	};


	Model.prototype.getUserStatus = function(){
		this.realname = localStorage.getItem('realname');
		this.username = localStorage.getItem('username');
		this.userid = localStorage.getItem('userid');
		this.status = localStorage.getItem('status');
		
		if (this.userid == "undefined" || this.userid == undefined || this.userid == null || this.userid == ""){
			this.userid = 0;
			this.username = "";
			this.showLogin.set(true);
			this.showContent.set(false);	
			this.showCourse.set(false);//课程
			this.showClass.set(false);//培训班
			this.showExam.set(false);	//考试
		}else{
			this.showLogin.set(false);
			this.showContent.set(true);
			this.comp("buttonGroup_study").set({"selected" : "button1"});
			$(".content_study .buttonGroup_study a").removeClass("this");
			$(".content_study .buttonGroup_study a:first-child").addClass("this");
//			alert(this.comp("buttonGroup_study").selected);
			this.showCourse.set(true);//课程
			this.showClass.set(false);//培训班
			this.showExam.set(false);	//考试
		}
	};

	Model.prototype.button_gonggaoClick = function(event){
		this.channelId = 1;
		this.isloading.set(true);
		this.getNews(false);
	};

	Model.prototype.button_dongtaiClick = function(event){
		this.channelId = 2;
		this.isloading.set(true);
		this.getNews(false);
	};

	Model.prototype.button_zixunClick = function(event){
		this.channelId = 3;
		this.isloading.set(true);
		this.getNews(false);
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
//		var pageName = event.currentTarget.getAttribute('pagename');
//		if (pageName)
//			justep.Shell.showPage(require.toUrl(pageName));
		
		var forcusid = event.currentTarget.getAttribute('forcusid');
		if (forcusid){
			var url = require.toUrl("./newsContentActivity.w");
			var params = {
		        from : "mainActivity",
		        contentId : forcusid,
		        data : {
		            // 将data中的一行数据传给对话框
	//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
		        }
		    }
			justep.Shell.showPage(url, params);
		}
	};
	

	Model.prototype.content_homeActive = function(event){
		this.comp("titleBar").set({"title" : "干部教育"});
	};
	
	
	//学习激活
	Model.prototype.content_studyActive = function(event){
//	debugger;
		this.comp("titleBar").set({"title" : "学习广场"});
		
		if (this.status == 1){
			//加载本地缓存
			var study_course_cache = localStorage.getItem("study_course_cache");
			if (study_course_cache != undefined){
				this.comp("study_course").loadData(study_course_cache, false);
			}
			//加载本地缓存
			var study_courseGroup_cache = localStorage.getItem("study_courseGroup_cache");
			if (study_courseGroup_cache != undefined){
				this.comp("course_group").loadData(study_courseGroup_cache, false);
				this.comp("course_group").refreshData();
			}
			//3.获取课程
			this.pageNo_study = 1;
			this.getCourse(false);
			//4.获取课程分类
			this.getCourseGroup();
			
			this.shouldShowSearch.set(true);
		}else{
//			this.jumpToLogin();
		}
		
	};
	
	Model.prototype.content_studyInactive = function(event){
		this.shouldShowSearch.set(false);
	};
	
	Model.prototype.button_searchClick = function(event){
		var url = require.toUrl("./searchActivity.w");
		var params = {
	        from : "mainActivity",
	        userId : this.userid
	    }
		justep.Shell.showPage(url, params);
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
	        url: global.server + "/app/course-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"pageNo" : me.pageNo_study,
	        	"typeId" : me.typeId_study,
//	        	"shapeId" : 3	//3单视频
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
		        	var json={"@type" : "table","study_course" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :coursesObj };
		        	study_course.loadData(json, isApend);
		        	localStorage.setItem('study_course_cache',JSON.stringify(json));
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


	//获取课程分类
	Model.prototype.getCourseGroup = function (isApend){
		var course_group = this.comp("course_group");
		
		$.ajax({
	        type: "get",
	        "async" : true,
	        url: global.server + "/app/course-type-list.jspx",
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
//	        	alert(JSON.stringify(typesObj));
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	if (pageNoObj > 0){
		        	var json={"@type" : "table","course_group" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :typesObj };
		        	course_group.loadData(json, false);
		        	localStorage.setItem('study_courseGroup_cache',JSON.stringify(json));
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


	//弹出课程分类  弃用
	Model.prototype.button_studyMoreClick = function(event){
		var popOver_moreCourse = this.comp("popOver_moreCourse");
//		if (this.popshow == 0){
//			this.popshow = 1;
			popOver_moreCourse.show();
			$(".x-popOver-overlay").css("top",$(".content_study .studyMore .btn_more").height()+$(".studyMore").height);
			$(".x-popOver-content").css("top",$(".content_study .studyMore .btn_more").height()+$(".studyMore").height);
//		}else{
//			this.popshow = 0;
//			popOver_moreCourse.hide();
//		}
		
	};
	
	Model.prototype.content_commActive = function(event){
		this.comp("titleBar").set({"title" : "交流广场"});

		if (this.status == 1){
			//加载本地缓存
			var communicateCache = localStorage.getItem("communicateCache");
			if (communicateCache != undefined){
				this.comp("communicate").loadData(communicateCache, false);
			}
			//5.获取交流
			this.getCommunicate(false);
		}else{
//			this.jumpToLogin();
		}
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
	        url: global.server + "/app/content-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"channelId" : me.channelId,
	        	"typeId" : me.typeId,
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
		        	var json={"@type" : "table","news" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :contentsObj };
		        	news.loadData(json, isApend);
	//	        	alert(news.count());
		        	localStorage.setItem('newsCache',JSON.stringify(json));
		        	me.isloading.set(false);
	        	}
	        	
	        },
	         error:function (){  
	        	 me.isloading.set(false);
	        	 var msg = "获取数据失败";
//	        	 alert(msg);
	        	 if ( justep.Browser.isX5App ){
					window.plugins.toast.show(msg, "short", "bottom");
				}else{
					 justep.Util.hint(msg);
				}
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
		var me = this;
		var current = event.bindingContext.$object;//获得当前行
		var url = require.toUrl("./course_showActivity.w");
		var params = {
	        from : "mainActivity",
	        courseId : current.val("id"),
//	        userId : "53",
	        userId : me.userid,
	        data : {
	            // 将data中的一行数据传给对话框
//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
	        }
	    }
		justep.Shell.showPage(url, params);
	};
	


	//点击课程分类
	Model.prototype.li_courseGroupClick = function(event){
		var current = event.bindingContext.$object;//获得当前行
		this.typeId_study = current.val("id");	//分类id
		this.pageNo_study = 1;
		this.getCourse(false);		
		this.comp("popOver_moreCourse").hide();
		$("#blackbg").hide();
	};
	
	//交流页，获取课程评论
	Model.prototype.getCommunicate = function (isApend){
		var me = this;
		var communicate = this.comp("communicate");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/course-experience-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
//	        	"shapeId" : 3,  //单视频的评论
	        	"pageNo" : this.pageNo_communicate
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
	        	var experiencesObj = resultData.experiences;
	        	var pageNoObj = resultData.pageNo;
	        	var totalPageObj = resultData.totalPage;
	        	
	        	me.pageNo_communicate = pageNoObj;
	        	me.totalPage_communicate = totalPageObj;
//	        	alert(me.totalPage_study);
//	        	alert(experiencesObj);
	        	        	
//	        	$.each(resultData,function(name,value) { 
//	        		alert(name); 
//	        		alert(value); 
//	        		}
//	        	);
	        	
	        	var json={"@type" : "table","communicate" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :experiencesObj };
	        	
        		communicate.loadData(json, isApend);
	        	localStorage.setItem('communicateCache',JSON.stringify(json));
	        	
//	        	alert("评论数据" + comment.count());
	        	
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

	//点击交流页的一条评论
	Model.prototype.li_commClick = function(event){
		var current = event.bindingContext.$object;//获得当前行
		var url = require.toUrl("./course_showActivity.w");
		var params = {
	        from : "mainActivity",
	        courseId : current.val("courseId"),
	        userId : this.userid,
	        data : {
	            // 将data中的一行数据传给对话框
//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
	        }
	    }
		justep.Shell.showPage(url, params);
	};

	//下拉交流页
	Model.prototype.scrollView_commPullDown = function(event){
		this.getCommunicate(false);
	};

	//上拉交流页
	Model.prototype.scrollView_commPullUp = function(event){	
		if (this.pageNo_communicate < this.totalPage_communicate){
			this.pageNo_communicate++;
			this.getCommunicate(true);
		}
	};


	//点击登录
	Model.prototype.div_userClick = function(event){
//		alert(this.username + this.userid + this.status);
		if (this.username != ""  && this.userid != "" && this.status =="1"){
//			$("label_username").val(this.username);
//			justep.Shell.setIsSinglePage(true);
			var url = require.toUrl("./personalActivity.w");
			var params = {
		        from : "mainActivity",
		        username : this.username,
		        userid : this.userid,
		        status : this.status
		    }
			justep.Shell.showPage(url, params);
		}else{
//			$("label_username").val("请登录");
			this.jumpToLogin();
		}
	};

	//
	Model.prototype.jumpToLogin = function(){
//		justep.Shell.setIsSinglePage(true);
		var url = require.toUrl("./loginActivity.w");
		var params = {
	        from : "mainActivity",
	        userId : this.userid
	    }
		justep.Shell.showPage(url, params);
	};

	//我的课程
	Model.prototype.div_projectClick = function(event){
		if (this.status == 1){
			var url = require.toUrl("./myCoursesActivity.w");
			var params = {
		        from : "mainActivity",
		        userId : this.userid
		    };
			justep.Shell.showPage(url, params);
		}else{
			this.jumpToLogin();
		}
		
	};
	
	
	//考试列表
	Model.prototype.div_banjiClick = function(event){
		if (this.status == 1){
			var url = require.toUrl("./examActivity.w");
			var params = {
		        from : "mainActivity",
		        userId : this.userid
		    }
			justep.Shell.showPage(url, params);
		}else{
			this.jumpToLogin();
		}
		
	};


	//我的培训计划
	Model.prototype.div_peixunClick = function(event){
		if (this.status == 1){
			var url = require.toUrl("./peixunActivity.w");
			var params = {
		        from : "mainActivity",
		        userId : this.userid
		    }
			justep.Shell.showPage(url, params);
		}else{
			this.jumpToLogin();
		}
		
	};




	//咨询答疑
	Model.prototype.div_dayiClick = function(event){
		var url = require.toUrl("./helpIndexActivity.w");
			var params = {
		        from : "mainActivity",
		    }
			justep.Shell.showPage(url, params);
	};

	//学习档案
	Model.prototype.div_danganClick = function(event){
		if (this.status == 1){
			var url = require.toUrl("./xuexidanganActivity.w");
			var params = {
		        from : "mainActivity",
		        userId : this.userid
		    }
			justep.Shell.showPage(url, params);
		}else{
			this.jumpToLogin();
		}
		
	};


	Model.prototype.div_xinxiClick = function(event){
		var url = require.toUrl("./editUserActivity.w");
		var params = {
	        from : "mainActivity",
	        userId : this.userid
	    }
		justep.Shell.showPage(url, params);
	};

	Model.prototype.div_mimaClick = function(event){
		var url = require.toUrl("./editMimaActivity.w");
		var params = {
	        from : "mainActivity",
	        userId : this.userid
	    }
		justep.Shell.showPage(url, params);
	};

	Model.prototype.button_exitClick = function(event){
		this.comp("messageDialog_exit").show();
	};

	Model.prototype.messageDialog_exitOK = function(event){
		localStorage.setItem('realname',""); 
		localStorage.setItem('username',""); 
		localStorage.setItem('userid',""); 
		localStorage.setItem('password',"");
		localStorage.setItem('status',""); 
		this.userid = "";
		
		this.getUserStatus();
		this.comp("content_me").update();
		
		
		var me = this;
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/logout.jspx",
//	        url: "http://192.168.1.22:8080/app/logout.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : me.userid
//	        	"userId" : 2982
	        },
	        success: function(resultData) {
//	        	alert(resultData.result);
//	        	alert(resultData + "/" + JSON.stringify(resultData));
	        	
//	        	var statusObj = resultData.status;
	        	
//	        	alert("评论数据" + comment.count());
	        	
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

	Model.prototype.button_moreClick = function(event){
//		if (this.popshow == 0){
//			this.popshow = 1;
//			this.comp("popOver_moreCourse").show();
//		}else{
//			this.popshow = 0;
//			this.comp("popOver_moreCourse").hide();
//		}
		this.comp("popOver_moreCourse").show();
	};

	Model.prototype.modelLoad = function(event){
//		justep.Shell.setIsSinglePage(true);
		//添加事件
		justep.Shell.on("onRefreshUser", this.onRefreshUser, this);
	};

	Model.prototype.modelUnLoad = function(event){
		//卸载事件
		justep.Shell.off("onRefreshUser", this.onRefreshUser);
	};

	Model.prototype.onRefreshUser = function(event){
		this.getUserStatus();
//		alert(this.userid);
		
		//刷新用户
		if (this.username == "" || this.username == null){
			$("#span_name").text("请登录");
//			$("#label_username").text("请登录");
//			$("#image_usericon").attr('src', require.toUrl("./img/user.png" )); 
		}else{
			$("#span_name").text(this.realname);
//			$("#label_username").text(this.realname);
//			$("#image_usericon").attr('src', require.toUrl("./img/user_pic.png" )); 
		}
		
		if (this.status == 0){
			if (this.comp("contents1").getActiveXid() != "content_me")
			{
				//未登录，跳到首页只能看新闻
//				this.comp("contents1").to(0);
			}
		}else if (this.status == 1){
			//登录了
			
			//加载本地缓存
			var study_course_cache = localStorage.getItem("study_course_cache");
			if (study_course_cache != undefined){
				this.comp("study_course").loadData(study_course_cache, false);
			}
			//刷新课件
			this.getCourse(false);
			
			//加载本地缓存
			var study_courseGroup_cache = localStorage.getItem("study_courseGroup_cache");
			if (study_courseGroup_cache != undefined){
				this.comp("course_group").loadData(study_courseGroup_cache, false);
			}
			//刷新课件组
			this.getCourseGroup(false);
			
			//加载本地缓存
			var communicateCache = localStorage.getItem("communicateCache");
			if (communicateCache != undefined){
				this.comp("communicate").loadData(communicateCache, false);
			}
			//刷新评论
			this.getCommunicate(false);
		}else{
//			this.comp("contents1").to(0);
		}
		
	};




	Model.prototype.timer1Timer = function(event){
		var me = this;
//		alert(this.userid);
//		if(this.userid !="undefined"){
			$.ajax({
		        type: "get",
		        "async" : false,
		        url: global.server + "/app/online.jspx",
	//	        url: "http://192.168.1.22:8080/app/online.jspx",
		        contentType: "application/json; charset=utf-8",
		        dataType: "jsonp",
		        jsonp: "CallBack",
		        data: {
		        	"userId" : me.userid
	//	        	"userId" : 2982
		        },
		        success: function(resultData) {
	//	        	alert(resultData.result);
	//	        	alert(resultData + "/" + JSON.stringify(resultData));
		        	
	//	        	var statusObj = resultData.status;
		        	
	//	        	alert("评论数据" + comment.count());
		        	
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
//		}
		
		
	};

	//学习页课程 培训班 考试切换
	Model.prototype.button1Click = function(event){
		this.showCourse.set(true);//课程
		this.showClass.set(false);
		this.showExam.set(false);
		
		//加载本地缓存
		var study_course_cache = localStorage.getItem("study_course_cache");
		if (study_course_cache != undefined){
			this.comp("study_course").loadData(study_course_cache, false);
		}
		//加载本地缓存
		var study_courseGroup_cache = localStorage.getItem("study_courseGroup_cache");
		if (study_courseGroup_cache != undefined){
			this.comp("course_group").loadData(study_courseGroup_cache, false);
		}
		
		//3.获取课程
		this.pageNo_study = 1;
		this.getCourse(false);
		//4.获取课程分类
		this.getCourseGroup();
		
		this.shouldShowSearch.set(true);
	};
	
	Model.prototype.button2Click = function(event){
		this.showCourse.set(false);
		this.showClass.set(true);//培训班
		this.showExam.set(false);
		
		this.getPeixunban(false);
		
		this.shouldShowSearch.set(false);
	};

	Model.prototype.button3Click = function(event){
		this.showCourse.set(false);
		this.showClass.set(false);
		this.showExam.set(true);//考试
		
		this.getExam(false);
		
		this.shouldShowSearch.set(false);
	};
	
		//课程状态
	Model.prototype.setCourseStatus = function (status){
		switch (status){
			case -1: return "" ; //未加入
				break;
			case 0: return "已加入" ;
				break;
			case 1: return "学习中" ;
				break;
			case 2: return "已完成" ;
				break;
			default : return ""; 
		}

	};
	
	//
	Model.prototype.bindCourseStatusCSS = function( status ){
		switch (status){
			case 0: return "status2" ;//已开始
				break;
			case 1: return "status3" ;
				break;
			case 2: return "status4" ;
				break;
			default : return "status1"; 
		}

	};

	//显示培训班状态
	Model.prototype.setClassStatus = function (status){
//	debugger;
		var rtn;
		switch (status){
			case 0 : rtn = "已开始";
				break;
			case 1 : rtn = "进行中";
				break;
			case 2 : rtn = "已结束";
				break;
			default: rtn = "";
		}
		return rtn;
	};
	
	Model.prototype.bindClassStatusCSS = function( status ){
//	debugger;
		switch (status){
			case 0: return "status1" ;//蓝色
			case 1: return "status2" ;//蓝色
			case 2: return "status3" ; 	//绿色
			default : return "status3"; 
		}
	};
	
	Model.prototype.getPeixunban = function(isApend){
		var me = this;
		var peixun = this.comp("peixun");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/trainingclass-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
//	        	"pageNo" : me.pageNo_exam,
	        	"userId" : me.userid,
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
	        	
	        	var json={"@type" : "table","peixun" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :trainingclassusersObj };
	        	
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
	};
	
	//显示考试状态
	Model.prototype.setExamStatus = function (status){
		var rtn;
		switch (status){
			case 0 : rtn = "已开始";
				break;
			case 1 : rtn = "进行中";
				break;
			case 2 : rtn = "已结束";
				break;
			default: rtn = "";
		}
		return rtn;
	}
	
	Model.prototype.bindExamStatusCSS = function( status ){
//	debugger;
		switch (status){
			case 0: return "status0" ;
			case 1: return "status1" ;
			case 2: return "status2" ;
			default : return "status2"; 
		}

	};
	
	Model.prototype.getExam = function(isApend){
		var me = this;
		var exam = this.comp("exam");
		
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/exam-list.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
//	        	"pageNo" : me.pageNo_exam,
//	        	"userId" : me.userid
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
	        	
	        	var json={"@type" : "table","exam" : {"idColumnName" : "id","idColumnType" : "Integer", },"rows" :examuserssObj };
	        	
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
	};
	
	//点击培训班
	Model.prototype.li2Click = function(event){
//	debugger;
		var current = event.bindingContext.$object;//获得当前行
		if(current.val("status") == 0 || current.val("status") == 1){
			//0已加入 1学习中
			var url = require.toUrl("./myCoursesActivity.w");
			var params = {
		        from : "peixunActivity",
		        userId : this.userid,
		        trainingclassId : current.val("id"),
		        data : {
		            // 将data中的一行数据传给对话框
	//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
		        }
		    }
			justep.Shell.showPage(url, params);
		}else {
			var msg = "不能进入培训班";
        	 if ( justep.Browser.isX5App ){
				window.plugins.toast.show(msg, "short", "bottom");
			}else{
				 justep.Util.hint(msg);
			}
		}
	};
	
	//点击考试
		Model.prototype.li3Click = function(event){
		var current = event.bindingContext.$object;//获得当前行

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
	        	"userId" : me.userid,
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
//	        	debugger;
	        	//调试都可以进
//	        	me.startExam(examId);
	        	//--------
	        	
	        	var msg = "";
	        	if (statusObj == 1){
	        		//可以考试 考试中
	        		me.startExam(examId);
	        	}else if (statusObj == 2){
	        		//已完成 还是可以考试
	        		me.startExam(examId);
	        	}else if (statusObj == 3){
	        		//已完成 还有重试次数，还是可以考试，要弹框确认分出清零，再重考
	        		me.comp("messageDialog1").show({
	        			message : "您上次考试分数为"  + resultData.socre + "分，合格分数是" + resultData.passscore + "分，是否清空分数再考一次？",
	        			inputValue : examId
	        		});
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
	
	//确认分数清零重考
	Model.prototype.messageDialog1OK = function(event){
		var examId = event.source.inputValue;
		this.startExam(examId);
	};
	
	Model.prototype.startExam = function(examId){
		var me = this;
//		
//		var url = require.toUrl("./doExamActivity.w");
//					var params = {
//				        from : "examActivity",
//				        examId : examId,
//				        userId : me.userid,
//				        data : {
//				            // 将data中的一行数据传给对话框
//			//	            data_forum : this.comp("pre_forum_forum").getCurrentRow().toJson()
//				        }
//				    }
//					justep.Shell.showPage(url, params);
					
		$.ajax({
	        type: "get",
	        "async" : false,
	        url: global.server + "/app/exam/start.jspx",
	        contentType: "application/json; charset=utf-8",
	        dataType: "jsonp",
	        jsonp: "CallBack",
	        data: {
	        	"userId" : this.userid,
	        	"examId" : examId,
	        },
	        success: function(resultData) {
	        	if (resultData.status == 0){//可以考试
	        		var url = require.toUrl("./doExamActivity.w");
					var params = {
				        from : "examActivity",
				        examId : examId,
				        userId : me.userid,
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

	return Model;
});

$(function(){
	$(".content_home .home_nav a").click(function(){
		$(".content_home .home_nav a .this").removeClass("this");
		$(this).find("span").addClass("this");
	});

	// 首页头部导航切换

//	$(".x-panel-bottom a").click(function(){
//		$(".x-panel-bottom a .this").removeClass("this")
//		$(this).find("span").addClass("this");
//	})
//
//	// 底部导航切换
//
//	$(".x-panel-bottom a").click(function(){
//		$(".x-panel-bottom a .this").removeClass("this")
//		$(this).find("span").addClass("this");
//	})

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
	})	;

	$("#blackbg").click(function(){
		$("#blackbg").hide();
		$(".content_study .studyMore .moreCourse").hide();
	});

	// 更多课程弹窗

	$(".content_home .banner").height($(window).width()/1.84);
	$(".content_home .banner img").height($(window).width()/1.84);

	$(".content_study .buttonGroup_study a").click(function(){
		$(this).addClass("this").siblings(".this").removeClass("this");
	})

	// 学习页面顶部按钮切换

	$(".popOver_moreCourse .x-popOver-content").height($(window).height()-48);

});
