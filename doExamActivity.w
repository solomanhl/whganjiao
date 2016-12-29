<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:58px;left:159px;" onParamsReceive="modelParamsReceive" onLoad="modelLoad"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="themes" idColumn="themeId" isTree="true"><column label="题号" name="themeId" type="Integer" xid="xid1"></column>
  <column label="题目" name="name" type="String" xid="xid2"></column>
  <column label="选项" name="options" type="String" xid="xid3"></column>
  <column label="0单选，1多选，2文本，" name="type" type="Integer" xid="xid12"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="options" limit="-1" idColumn="optionId" confirmRefresh="false"><column label="题目id" name="themeId" type="Integer" xid="xid4"></column>
  <column label="题目名字" name="name" type="String" xid="xid5"></column>
  <column label="选项id" name="optionId" type="Integer" xid="xid6"></column>
  <column label="选项内容" name="content" type="String" xid="xid7"></column>
  <column label="序号" name="id" type="Integer" xid="xid8"></column>
  <column label="选项排序" name="id2" type="Integer" xid="xid10"></column>
  <column label="0选项，1选项后有文本" name="type" type="Integer" xid="xid9"></column>
  <column label="文本" name="text" type="String" xid="xid11"></column>
  <column label="选中当前选项" name="checked" type="Boolean" xid="xid13"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full doExam" xid="panel1"> 
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
          <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="交卷" xid="button_submit" onClick="button_submitClick">
          <i xid="i3"></i>
          <span xid="span3">交卷</span></a></div>
        </div> 
      </div>  
    <div class="x-panel-content  x-scroll-view" xid="content1" _xid="C73474F241800001944419B01C1095D0" style="bottom: 0px;"><div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
   
   <div class="x-scroll-content" xid="div2"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list_theme" data="themes">
   <ul class="x-list-template" xid="listTemplateUl1">
    <li xid="li_theme"><div component="$UI/system/components/justep/output/output" class="x-output title" xid="output_id" bind-ref='ref("themeId")'></div><div component="$UI/system/components/justep/output/output" class="x-output head" xid="output_name" bind-ref='ref("name")'></div>
  
  <div component="$UI/system/components/justep/list/list" class="x-list" xid="list_option_single" data="options" autoLoad="true" bind-visible=" $model.showSingleGroup()">
   <ul class="x-list-template" xid="listTemplateUl2">
    <li xid="li_option_single" bind-click="li_option_singleClick"><span component="$UI/system/components/justep/button/radio" class="x-radio" xid="radio1" bind-value='ref("optionId")' checked="false" onChange="radio1Change" bind-label='ref("content")' name="single"></span>
  <input component="$UI/system/components/justep/input/input" class="form-control" xid="input1" bind-visible='$model.showSingleTXT( val("type"), val("checked")) ' onChange="input1Change" bind-ref='ref("text")' onBlur="input1Blur"></input>
  </li></ul> </div>
  <div component="$UI/system/components/justep/list/list" class="x-list" xid="list_option_multi" data="options" bind-visible=" $model.showMultiGroup()">
   <ul class="x-list-template" xid="listTemplateUl3">
    <li xid="li_option_multi"><span component="$UI/system/components/justep/button/checkbox" class="x-checkbox" xid="checkbox2" bind-label='ref("content")' bind-value='ref("optionId")' checked="false" name="multi" onChange="checkbox2Change"></span><input component="$UI/system/components/justep/input/input" class="form-control" xid="input2" bind-visible='$model.showSingleTXT( val("type"), val("checked")) ' bind-ref='ref("text")' onChange="input2Change"></input>
  </li></ul> </div>
  <div component="$UI/system/components/justep/list/list" class="x-list" xid="list_option_text" data="options">
   <ul class="x-list-template" xid="listTemplateUl4">
    <li xid="li2"><textarea component="$UI/system/components/justep/textarea/textarea" class="form-control" xid="textarea3" bind-ref='ref("text")' bind-visible=" $model.showTXTGroup()" onChange="textarea3Change"></textarea></li></ul> </div></li></ul> </div>
  
  </div>
   </div></div>
  <div class="x-panel-bottom" xid="bottom1"><div component="$UI/system/components/justep/button/buttonGroup" class="btn-group x-card btn-group-justified" tabbed="true" xid="buttonGroup1"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="上一题" xid="button_pre" onClick="button_preClick">
   <i xid="i1"></i>
   <span xid="span1">上一题</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="下一题" xid="button_next" onClick="button_nextClick">
   <i xid="i2"></i>
   <span xid="span2">下一题</span></a></div></div></div> 
   <resource xid="resource2">
    <require xid="require1" url="css!$UI/whganjiao/base"/>  
    <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"/>
  </resource>
<span component="$UI/system/components/justep/messageDialog/messageDialog" xid="messageDialog1" style="top:10px;left:43px;" title="提示" message="您正在交卷，点”确定“后完成考试，并且不能再次进入，如果需要修改，请点”取消“。" onOK="messageDialog1OK" type="OKCancel"></span></div>