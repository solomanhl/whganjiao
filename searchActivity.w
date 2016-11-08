<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;" onParamsReceive="modelParamsReceive" onLoad="modelLoad" onunLoad="modelUnLoad"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="study_course" limit="-1" idColumn="id"><column name="id" type="Integer" xid="xid1"></column>
  <column name="name" type="String" xid="xid2"></column>
  <column name="titleImg" type="String" xid="xid3"></column>
  <column name="teachers" type="String" xid="xid4"></column>
  <column name="users" type="String" xid="xid5"></column>
  <column name="cdate" type="String" xid="xid6"></column>
  <data xid="default1">[]</data></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar">
          <div class="x-titlebar-left flex1"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title flex5"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input1" placeHolder="试试输入课程名的一部分或者讲师姓名"></input></div>  
          <div class="x-titlebar-right flex1 reverse"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="搜索" xid="button1" onClick="button1Click">
   <i xid="i1"></i>
   <span xid="span1">搜索</span></a></div>
        </div> 
      </div>  
    <div class="x-panel-content  x-scroll-view" xid="content1" _xid="C74A53BD95D00001501675401E02ADB0" style="bottom: 0px;"><div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
      <div class="search_bg" xid="div_search" bind-visible="shouldShowSearch"><img src="img/search_bg.jpg" alt=""/></div>
   
   <div class="x-scroll-content" xid="div2"><div component="$UI/system/components/justep/list/list" class="x-list search_list" xid="list1" data="study_course">
   <ul class="x-list-template" xid="listTemplateUl1">
    <li xid="li1" bind-click="li1Click"><div class="media media_study" xid="media1">
   <div class="media-left" xid="mediaLeft1">
    <a href="#" xid="a1">
      <span xid="span12"/>
     <img class="media-object" src="" alt="" xid="image1" bind-attr-src=' $model.getServerImg(val("titleImg"))'></img></a> </div> 
   <div class="media-body" xid="mediaBody1">
    <div component="$UI/system/components/justep/output/output" class="x-output title" xid="output_title" bind-ref='ref("name")'></div>
  <div xid="div5" class="x-label-edit x-label30 courseTeacher"><label xid="label2" class="x-label"><![CDATA[讲师：]]></label>
  <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_teacher" bind-ref='ref("teachers")'></div></div>
  <div xid="div6" class="x-label-edit x-label30 count"><label xid="label3" class="x-label"><![CDATA[选课人数：]]></label>
  <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_count" bind-ref='ref("users")'></div></div></div> </div></li></ul> </div></div>
   </div></div>
  </div> 
</div>