<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:58px;left:159px;" onParamsReceive="modelParamsReceive" onLoad="modelLoad"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="themes" idColumn="themeId" isTree="true"><column label="题号" name="themeId" type="Integer" xid="xid1"></column>
  <column label="题目" name="name" type="String" xid="xid2"></column>
  <column label="选项" name="options" type="String" xid="xid3"></column>
  <treeOption xid="default1"></treeOption></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="options" limit="-1" idColumn="id"><column label="题目id" name="themeId" type="Integer" xid="xid4"></column>
  <column label="题目名字" name="name" type="String" xid="xid5"></column>
  <column label="选项id" name="optionId" type="Integer" xid="xid6"></column>
  <column label="选项内容" name="content" type="String" xid="xid7"></column>
  <column label="序号" name="id" type="Integer" xid="xid8"></column>
  <column label="选项排序" name="id2" type="Integer" xid="xid10"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="正在考试"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">正在考试</div>  
          <div class="x-titlebar-right reverse"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="交卷" xid="button_submit">
   <i xid="i3"></i>
   <span xid="span3">交卷</span></a></div>
        </div> 
      </div>  
    <div class="x-panel-content  x-scroll-view" xid="content1" _xid="C73474F241800001944419B01C1095D0" style="bottom: 0px;"><div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
   
   <div class="x-scroll-content" xid="div2"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list_theme" data="themes">
   <ul class="x-list-template" xid="listTemplateUl1">
    <li xid="li_theme"><div component="$UI/system/components/justep/output/output" class="x-output" xid="output_id" bind-ref='ref("themeId")'></div><div component="$UI/system/components/justep/output/output" class="x-output" xid="output_name" bind-ref='ref("name")'></div>
  
  <div component="$UI/system/components/justep/list/list" class="x-list" xid="list_option_single" data="$model.options" filter='($row.val("themeId") == val("themeId"))  &amp;&amp; ($row.val("id2") == 1) '>
   <ul class="x-list-template" xid="listTemplateUl2">
    <li xid="li_option_single"><span component="$UI/system/components/justep/select/radioGroup" class="x-radio-group x-radio-group-vertical" xid="radioGroup_single" bind-itemset="$model.options" bind-itemsetLabel='ref("content")' bind-itemsetValue='ref("optionId")' onChange="radioGroup_singleChange"></span></li></ul> </div>
  </li></ul> </div>
  
  </div>
   </div></div>
  <div class="x-panel-bottom" xid="bottom1"><div component="$UI/system/components/justep/button/buttonGroup" class="btn-group x-card btn-group-justified" tabbed="true" xid="buttonGroup1"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="上一题" xid="button_pre" onClick="button_preClick">
   <i xid="i1"></i>
   <span xid="span1">上一题</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="下一题" xid="button_next" onClick="button_nextClick">
   <i xid="i2"></i>
   <span xid="span2">下一题</span></a></div></div></div> 
</div>