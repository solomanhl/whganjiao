<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/smartContainer/smartContainer" class="x-smartcontainer" xid="smartContainer1"></div><div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:110px;left:16px;" onModelConstruct="modelModelConstruct" onParamsReceive="modelParamsReceive" onunLoad="modelUnLoad" onLoad="modelLoad"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="course" idColumn="id"><column label="课程id" name="id" type="Integer" xid="xid1"></column>
  <column label="申请量" name="users" type="String" xid="xid2"></column>
  <column label="状态" name="status" type="String" xid="xid3"></column>
  <column label="评论数" name="speaks" type="String" xid="xid19"></column>
  <column label="讲师" name="teachers" type="String" xid="xid11"></column>
  <column label="课程介绍" name="absract" type="String" xid="xid12"></column>
  <column label="完成人数" name="completes" type="String" xid="xid13"></column>
  <column label="课程分类" name="typeName" type="String" xid="xid14"></column>
  <column label="课时（多少秒）" name="classhour" type="String" xid="xid15"></column>
  <column isCalculate="false" label="学时（学到多少秒）" name="times" type="String" xid="xid16"></column>
  <column label="课程名" name="name" type="String" xid="xid4"></column>
  <column label="点击量" name="clicks" type="String" xid="xid17"></column>
  <column label="学习人数" name="learns" type="String" xid="xid18"></column>
  <column label="课程图片" name="titleImg" type="String" xid="xid5"></column>
  <data xid="default1">[]</data>
  <rule xid="rule1"></rule>
  <column label="单视频路径" name="path" type="String" xid="xid20"></column>
  <column label="课程类型" name="shapeId" type="String" xid="xid21"></column>
  <column label="0手机，1电脑，2全部" name="platform" type="String" xid="xid22"></column>
  <column label="0仅ie，1全部" name="browser" type="String" xid="xid23"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="comment" idColumn="id"><column label="评论id" name="id" type="Integer" xid="xid6"></column>
  <column label="用户名" name="realname" type="String" xid="xid7"></column>
  <column label="用户头像" name="image" type="String" xid="xid8"></column>
  <column label="评论内容" name="content" type="String" xid="xid9"></column>
  <column label="评论时间" name="date" type="String" xid="xid10"></column>
  <data xid="default2">[]</data></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="课程详情"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="返回" class="btn btn-default" onClick="{operation:'window.close'}" xid="backBtn"> 
              <!-- <i class="icon-chevron-left"/>   -->
              <span>返回</span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">课程详情</div>  
          <div class="x-titlebar-right reverse comm_btn"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="" xid="button_comment" bind-click="button_commentClick">
          <span xid="span1"></span></a></div>
        </div> 
      </div>  
    <div class="x-panel-content x-scroll-view" xid="content1" supportpulldown="true" _xid="C73CE1C92490000121BD1EC6113012DE" style="bottom: 0px;">
  
  
  
  
  <div class="x-scroll userComment" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView_userComment" onPullDown="scrollView_userCommentPullDown" onPullUp="scrollView_userCommentPullUp">
   <div class="x-scroll-content" xid="div8">
    <div xid="div_img" class="comm_top" bind-visible="shouldShowImgTitle" bind-click="imgTitleClick"><img src="" alt="" xid="image_title" bind-visible="shouldShowImgTitle"></img></div><div class="comm_top" id="comm_top" xid="ckplayer" bind-visible="shouldShowCKplaer">
    	
    	<!-- <ins></ins> -->
    	<div id="a1"></div>
		<script type="text/javascript" src="/ckplayer/ckplayer.js" charset="utf-8"></script>
		<!-- <script type="text/javascript" src="$UI2/whganjiao/js/ckplayerDisableDrag.js" charset="utf-8"></script> -->
			
    </div>
    <span class="loading">  
                  <img src="$UI/whganjiao/img/loading.gif" alt="" xid="image_loading" bind-visible="isloading"></img>
                </span> 
                <div xid="div_device" class="device"><span xid="span2"><![CDATA[本课件支持：]]></span>
  <span xid="span3" class="pc" bind-visible=' $model.isShowPC( $model.course.val("platform"))'><![CDATA[电脑]]></span>
  <span xid="span5" class="phone" bind-visible=' $model.isShowMobile( $model.course.val("platform"))'><![CDATA[手机]]></span></div><span xid="span_title" bind-text='$model.course.val("name")' class="top_title"></span>    
    <div xid="div_info" class="div_info">
    <div xid="div_left" class="div_left"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit_teacher">
   <label class="x-label" xid="label_teacher"><![CDATA[课程教师：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit teacher" xid="output_teacher" bind-text=' $model.course.val("teachers")'></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit_classify">
   <label class="x-label" xid="label_classify"><![CDATA[课程分类：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_classify" bind-text=' $model.course.val("typeName")'></div></div>
   <div class="tip">
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 edit_time" xid="labelEdit_time">
   <label class="x-label" xid="label_time"><![CDATA[学时：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_time" bind-text=' $model.classhourToXueshi($model.course.val("classhour"))'></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 schedule" xid="labelEdit_schedule">
   <label class="x-label" xid="label_schedule"><![CDATA[进度：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_schedule" bind-text=' $model.calcTime($model.course.val("times"))'></div></div></div>
  </div>
  <div xid="div_right" class="div_right">
  
  
  <div xid="div_click" class="x-label-edit x-label30"><div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_click" bind-text=' $model.course.val("clicks")'></div><label xid="label_click"><span><![CDATA[点击]]></span></label></div>
  <div xid="div_comment" class="x-label-edit x-label30"><div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_comment" bind-text=' $model.course.val("speaks")'></div><label xid="label_comment"><span><![CDATA[评论]]></span></label></div>
  <div xid="div_ask" class="x-label-edit x-label30"><div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_ask" bind-text=' $model.course.val("users")'></div><label xid="label_ask"><span><![CDATA[申请]]></span></label></div>
  <div xid="div_xuexi" class="x-label-edit x-label30"><div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_xuexi" bind-text=' $model.course.val("learns")'></div><label xid="label_xuexi"><span><![CDATA[学习]]></span></label></div>
  <div xid="div_wanchen" class="x-label-edit x-label30"><div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_wanchen" bind-text=' $model.course.val("completes")'></div><label xid="label_wanchen"><span><![CDATA[完成]]></span></label></div>
  
  </div>
</div>
<div xid="div_courseInfo" class="courseInfo"><label xid="label_courseInfo"><![CDATA[课程简介]]></label>
  <div component="$UI/system/components/justep/output/output" class="x-output" xid="output_courseInfo" bind-ref='$model.course.ref("absract")'></div></div>
  <div xid="div_userComment" class=" x-scroll-view comm_title"><label xid="label_userComment"><![CDATA[学员评论]]></label>
  </div><div component="$UI/system/components/justep/list/list" class="x-list comm_list" xid="list_userComment" data="comment">
   <ul class="x-list-template" xid="listTemplateUl_userComment">
    <li xid="li_userComment"><div class="media" xid="media_userComment">
   <div class="media-left" xid="mediaLeft_userComment">
    <img src="$UI/whganjiao/img/user_pic.png" alt="" xid="image_userComment_icon"></img></div> 
   <div class="media-body" xid="mediaBody_userComment">
    <div xid="div_userComment_head" class="media_head"><div component="$UI/system/components/justep/output/output" class="x-output user" xid="output_comment_user" bind-ref='ref("realname")'></div>
  <div component="$UI/system/components/justep/output/output" class="x-output date" xid="output_comment_date" bind-ref='ref("date")' bind-text='"2016-03-10"'></div></div>
  </div> </div><div component="$UI/system/components/justep/output/output" class="x-output text" xid="output_comment_txt" bind-ref='ref("content")'></div></li></ul> </div>
</div>
   <div class="x-content-center x-pull-up" xid="div9">
    <span class="x-pull-up-label" xid="span4">加载更多...</span></div> </div></div>
  
  </div> 
  <resource xid="resource2"><require xid="require1" url="css!$UI/whganjiao/base"></require>
  <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"></require></resource>
</div>